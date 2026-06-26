'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';

export interface RouteCardData {
  from: string;
  to: string;
  distance: string;
  duration: string;
  sedanFare: string;
  suvFare: string;
  image: string;
  link: string;
  tag: string;
  tagColor: string;
  waText: string;
}

/**
 * Scatter layout config — desktop only.
 * col: 0=left 1=center 2=right (each ~33% wide)
 * yOff: vertical offset in px from section top
 * rot: card tilt in degrees
 * big: featured/hero card (larger, higher z-index)
 */
const SCATTER = [
  { col: 0, yOff: 10,  rot: -2,   big: false }, // Mussoorie
  { col: 2, yOff: 90,  rot:  2.5, big: false }, // Rishikesh
  { col: 0, yOff: 390, rot: -1.5, big: false }, // Airport
  { col: 1, yOff: -10, rot:  1,   big: true  }, // Kedarnath HERO
  { col: 2, yOff: 370, rot: -2,   big: false }, // Nainital
  { col: 1, yOff: 390, rot:  2,   big: false }, // Haridwar–Rishikesh
];

const COL_LEFTS = ['1%', '35%', '68%'];

export function PopularRoutesScattered({ routes }: { routes: RouteCardData[] }) {
  const reduce = useReducedMotion();

  return (
    <>
      {/* ── DESKTOP — absolute scatter canvas ─────────────────── */}
      <div
        className="relative hidden md:block"
        style={{ minHeight: 860 }}
      >
        {routes.map((route, i) => {
          const { col, yOff, rot, big } = SCATTER[i] ?? { col: i % 3, yOff: i * 60, rot: 0, big: false };

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: COL_LEFTS[col],
                top: yOff + 40,
                width: big ? 340 : 276,
                zIndex: big ? 3 : 1,
              }}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: reduce ? 0 : rot,
              }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                delay: i * 0.09,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                rotate: 0,
                scale: 1.04,
                zIndex: 20,
                transition: { duration: 0.22, ease: 'easeOut' },
              }}
            >
              <ScatterCard route={route} big={big} />
            </motion.div>
          );
        })}
      </div>

      {/* ── MOBILE — 2-col staggered grid (no rotations) ─────── */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {routes.map((route, i) => (
          <motion.div
            key={i}
            className={i === 3 ? 'col-span-2' : ''}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScatterCard route={route} big={i === 3} />
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ── Single scatter card ──────────────────────────────────────── */
function ScatterCard({ route, big = false }: { route: RouteCardData; big?: boolean }) {
  const isOrange = route.tagColor === 'bg-[#F7941D]';

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/8 hover:border-[#F7941D]/40 transition-all duration-300"
      style={{
        background: 'linear-gradient(160deg, #161616 0%, #0f0f0f 100%)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      }}
    >
      {/* ── Image ─────────────────────────────────────────────── */}
      <div className={`relative overflow-hidden ${big ? 'h-60' : 'h-48'}`}>
        <Image
          src={route.image}
          alt={`${route.from} to ${route.to} taxi`}
          fill
          sizes="(max-width: 768px) 50vw, 340px"
          quality={85}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Orange glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(247,148,29,0.18) 0%, transparent 65%)' }} />

        {/* Tag */}
        <span
          className={`absolute top-3 left-3 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
            isOrange
              ? 'bg-[#F7941D]'
              : 'bg-black/50 backdrop-blur-md border border-white/15'
          }`}
        >
          {route.tag}
        </span>

        {/* Route name overlaid on image bottom */}
        <div className="absolute bottom-0 inset-x-0 p-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-black text-white text-sm leading-tight drop-shadow-lg">
              {route.from}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F7941D] shrink-0 drop-shadow-lg" />
            <span className="font-black text-white text-sm leading-tight drop-shadow-lg">
              {route.to}
            </span>
          </div>
          {/* Distance + Duration inline */}
          <div className="flex gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-white/60 text-[10px]">
              <MapPin className="w-2.5 h-2.5" />{route.distance}
            </span>
            <span className="flex items-center gap-1 text-white/60 text-[10px]">
              <Clock className="w-2.5 h-2.5" />{route.duration}
            </span>
          </div>
        </div>
      </div>

      {/* ── Card body ─────────────────────────────────────────── */}
      <div className="p-4 space-y-3">
        {/* Fares */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-[8px] font-black uppercase tracking-wider text-white/40 mb-0.5">Sedan</p>
            <p className={`font-black text-white ${big ? 'text-xl' : 'text-base'}`}>{route.sedanFare}</p>
          </div>
          <div className="rounded-xl p-3 text-center"
            style={{ background: 'rgba(247,148,29,0.08)', border: '1px solid rgba(247,148,29,0.2)' }}>
            <p className="text-[8px] font-black uppercase tracking-wider text-[#F7941D]/70 mb-0.5">SUV</p>
            <p className={`font-black text-[#F7941D] ${big ? 'text-xl' : 'text-base'}`}>{route.suvFare}</p>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/919258912169?text=${encodeURIComponent(route.waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest text-white transition-all duration-200"
          style={{ background: 'rgba(247,148,29,0.15)', border: '1px solid rgba(247,148,29,0.25)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#F7941D';
            (e.currentTarget as HTMLAnchorElement).style.border = '1px solid #F7941D';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(247,148,29,0.15)';
            (e.currentTarget as HTMLAnchorElement).style.border = '1px solid rgba(247,148,29,0.25)';
          }}
        >
          <MessageCircle className="w-3 h-3" />
          Book This Route
        </a>
      </div>
    </div>
  );
}
