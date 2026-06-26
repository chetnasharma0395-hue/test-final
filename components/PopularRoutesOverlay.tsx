'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { PRICING_DATA, formatPrice } from '@/lib/priceData';

/**
 * PopularRoutesOverlay
 * ─────────────────────
 * Option A — Pixelflakes "Sketch Studies" style:
 *  • Section shows a teaser stack of 3 cards + "EXPLORE ROUTES" button
 *  • Click → fullscreen dark canvas opens with ALL routes scattered
 *  • Routes are absolutely positioned across a tall scrollable canvas
 *  • Click any card → it expands with full fare + WhatsApp CTA
 *  • X to close the overlay
 */

/* ── Route definitions ─────────────────────────────────────────── */
const ROUTES = [
  { key: 'dehradun-mussoorie',      image: '/assets/images/dest-mussoorie.jpg',          tag: 'Most Popular',      tagOrange: true  },
  { key: 'dehradun-rishikesh',      image: '/assets/images/dest-rishikesh.jpg',           tag: 'Adventure Hub',     tagOrange: false },
  { key: 'dehradun-kedarnath',      image: '/assets/images/dest-char-dham.jpg',           tag: 'Char Dham Yatra',   tagOrange: true, toLabelOverride: 'Kedarnath' },
  { key: 'jolly-grant-mussoorie',   image: '/assets/images/dest-rishikesh-airport.jpg',   tag: 'Airport Pick-up',   tagOrange: false },
  { key: 'dehradun-haridwar',       image: '/assets/images/dest-haridwar-rishikesh.jpg',  tag: 'Ganga Ghat',        tagOrange: false },
  { key: 'dehradun-nainital',       image: '/assets/images/dest-corbett.jpg',             tag: 'Lakes & Wildlife',  tagOrange: true  },
  { key: 'haridwar-kedarnath',      image: '/assets/images/dest-char-dham.jpg',           tag: 'Pilgrim Route',     tagOrange: false, toLabelOverride: 'Kedarnath' },
  { key: 'haridwar-rishikesh',      image: '/assets/images/dest-haridwar-rishikesh.jpg',  tag: 'Temple Circuit',    tagOrange: false },
  { key: 'rishikesh-kedarnath',     image: '/assets/images/dest-char-dham.jpg',           tag: 'Yatra Route',       tagOrange: true, toLabelOverride: 'Kedarnath' },
  { key: 'delhi-dehradun',          image: '/assets/images/dest-mussoorie.jpg',           tag: 'Delhi Gate',        tagOrange: false },
  { key: 'dehradun-badrinath',      image: '/assets/images/dest-char-dham.jpg',           tag: 'Badrinath Yatra',   tagOrange: true, toLabelOverride: 'Badrinath' },
  { key: 'dehradun-govindghat',     image: '/assets/images/dest-corbett.jpg',             tag: 'Valley of Flowers', tagOrange: false, toLabelOverride: 'Govindghat (VoF)' },
  { key: 'jolly-grant-dehradun',    image: '/assets/images/dest-rishikesh-airport.jpg',   tag: 'Airport Transfer',  tagOrange: false },
  { key: 'kathgodam-nainital',      image: '/assets/images/dest-corbett.jpg',             tag: 'Station Pick-up',   tagOrange: false },
  { key: 'dehradun-jim-corbett',    image: '/assets/images/dest-corbett.jpg',             tag: 'Wildlife Safari',   tagOrange: false, toLabelOverride: 'Jim Corbett' },
  { key: 'rishikesh-govindghat',    image: '/assets/images/dest-char-dham.jpg',           tag: 'VoF Route',         tagOrange: false, toLabelOverride: 'Govindghat (VoF)' },
] as const;

/* ── Scatter positions for each card on the canvas ─────────────── */
/* Canvas is 1600px wide × ~2400px tall on desktop (user scrolls) */
const SCATTER_POS = [
  /* col area, x,    y,    rot,   w    */
  { x:  30,   y:  60,  rot: -2.0, w: 300 }, // Mussoorie
  { x: 360,   y: 120,  rot:  2.5, w: 260 }, // Rishikesh
  { x: 700,   y:  40,  rot: -1.5, w: 340 }, // Kedarnath (HERO)
  { x: 1080,  y: 100,  rot:  2.0, w: 270 }, // Airport-Mussoorie
  { x: 1360,  y:  50,  rot: -2.5, w: 250 }, // Haridwar
  { x:  60,   y: 440,  rot:  1.5, w: 270 }, // Nainital
  { x: 400,   y: 500,  rot: -2.0, w: 290 }, // Haridwar-Kedarnath
  { x: 760,   y: 460,  rot:  2.5, w: 255 }, // Haridwar-Rishikesh
  { x: 1080,  y: 520,  rot: -1.0, w: 280 }, // Rishikesh-Kedarnath
  { x: 1380,  y: 480,  rot:  2.0, w: 250 }, // Delhi-Dehradun
  { x:  30,   y: 900,  rot: -1.5, w: 265 }, // Badrinath
  { x: 370,   y: 960,  rot:  2.0, w: 280 }, // Valley of Flowers
  { x: 720,   y: 920,  rot: -2.0, w: 260 }, // Airport-Dehradun
  { x: 1070,  y: 980,  rot:  1.5, w: 270 }, // Kathgodam-Nainital
  { x: 1360,  y: 940,  rot: -2.5, w: 255 }, // Jim Corbett
  { x: 200,   y: 1320, rot:  1.0, w: 270 }, // Rishikesh-Govindghat
];

/* Teaser — 3 stacked cards shown before overlay opens */
const TEASER_KEYS = [0, 3, 2]; // Mussoorie, Airport, Kedarnath

type RouteKey = typeof ROUTES[number]['key'];

export function PopularRoutesOverlay() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const reduce = useReducedMotion();

  /* Lock body scroll when overlay is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Escape key to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const close = useCallback(() => { setOpen(false); setExpanded(null); }, []);

  /* Resolve route data */
  const routes = ROUTES.map((r) => {
    const d = PRICING_DATA[r.key as keyof typeof PRICING_DATA];
    const to = r.toLabelOverride ?? d.to;
    return {
      ...r,
      from: d.from,
      to,
      distance: `${d.distance} km`,
      duration: d.duration.replace('hours', 'hrs').replace('minutes', 'mins'),
      sedanFare: formatPrice(d.sedan),
      suvFare: formatPrice(d.suv),
      waText: `Hi, I want to book a taxi from ${d.from} to ${to}.`,
    };
  });

  return (
    <>
      {/* ── TEASER SECTION ────────────────────────────────────── */}
      <div className="relative flex flex-col items-center justify-center min-h-[340px]">
        {/* Stacked card teasers */}
        <div className="relative w-[240px] h-[180px] mb-8">
          {TEASER_KEYS.map((ri, ti) => (
            <div
              key={ri}
              className="absolute rounded-[1.25rem] overflow-hidden border border-white/10"
              style={{
                inset: 0,
                transform: `rotate(${[-6, 0, 6][ti]}deg) translateY(${[12, 0, -12][ti]}px) scale(${[0.88, 1, 0.88][ti]})`,
                zIndex: [1, 3, 1][ti],
                boxShadow: ti === 1 ? '0 24px 60px rgba(0,0,0,0.7)' : 'none',
              }}
            >
              <Image
                src={routes[ri].image}
                alt={`${routes[ri].from} to ${routes[ri].to}`}
                fill
                sizes="240px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-black text-xs">{routes[ri].from}</span>
                  <ArrowRight className="w-3 h-3 text-[#F7941D]" />
                  <span className="text-white font-black text-xs">{routes[ri].to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => setOpen(true)}
          className="relative group flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all"
          style={{
            background: 'rgba(247,148,29,0.12)',
            border: '1px solid rgba(247,148,29,0.35)',
          }}
          whileHover={{ scale: 1.04, background: 'rgba(247,148,29,0.22)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#F7941D] animate-pulse" />
          Explore All {routes.length} Routes
          <ArrowRight className="w-4 h-4 text-[#F7941D] group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <p className="mt-4 text-white/35 text-[10px] uppercase tracking-widest">
          Tap to browse — all fares fixed &amp; transparent
        </p>
      </div>

      {/* ── FULLSCREEN OVERLAY CANVAS ─────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] overflow-auto"
            style={{ background: '#080808' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={() => setExpanded(null)}
          >
            {/* Ambient orange glow */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(247,148,29,0.08) 0%, transparent 70%)' }} />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(247,148,29,0.05) 0%, transparent 70%)' }} />

            {/* Close button */}
            <button
              onClick={close}
              className="fixed top-6 right-6 z-[210] w-12 h-12 rounded-2xl flex items-center justify-center text-white hover:text-[#F7941D] transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
              aria-label="Close routes canvas"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="fixed top-6 left-6 z-[210]">
              <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-widest mb-1">Scroll to explore</p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest">{routes.length} routes · Fixed fares · Click to book</p>
            </div>

            {/* ── Scatter canvas (desktop) ── */}
            <div
              className="relative hidden md:block"
              style={{ width: 1680, minHeight: 1700, margin: '0 auto', paddingTop: 90 }}
            >
              {routes.map((route, i) => {
                const pos = SCATTER_POS[i] ?? { x: (i % 4) * 380 + 40, y: Math.floor(i / 4) * 420 + 60, rot: 0, w: 260 };
                const isExp = expanded === i;

                return (
                  <motion.div
                    key={i}
                    className="absolute cursor-pointer"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      width: pos.w,
                      zIndex: isExp ? 50 : 1,
                    }}
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotate: reduce ? 0 : (isExp ? 0 : pos.rot),
                      scale: isExp ? 1.06 : 1,
                    }}
                    transition={{
                      delay: isExp ? 0 : i * 0.04,
                      duration: isExp ? 0.25 : 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={(e) => { e.stopPropagation(); setExpanded(isExp ? null : i); }}
                    whileHover={{ scale: isExp ? 1.06 : 1.035, rotate: 0, zIndex: 40 }}
                  >
                    <OverlayCard route={route} expanded={isExp} />
                  </motion.div>
                );
              })}
            </div>

            {/* ── Mobile: vertical scroll grid ── */}
            <div className="md:hidden px-5 pt-20 pb-10 grid grid-cols-2 gap-4">
              {routes.map((route, i) => (
                <motion.div
                  key={i}
                  className={i === 2 ? 'col-span-2' : ''}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => { e.stopPropagation(); setExpanded(expanded === i ? null : i); }}
                >
                  <OverlayCard route={route} expanded={expanded === i} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Individual card inside the overlay ─────────────────────────── */
function OverlayCard({ route, expanded }: {
  route: ReturnType<typeof buildRoute>;
  expanded: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-[1.5rem] border transition-all duration-300 select-none"
      style={{
        background: 'linear-gradient(160deg,#161616,#0f0f0f)',
        borderColor: expanded ? 'rgba(247,148,29,0.5)' : 'rgba(255,255,255,0.07)',
        boxShadow: expanded
          ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(247,148,29,0.15)'
          : '0 16px 48px rgba(0,0,0,0.55)',
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={route.image}
          alt={`${route.from} to ${route.to} taxi`}
          fill
          sizes="340px"
          quality={80}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Hover orange shimmer */}
        {expanded && (
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(247,148,29,0.15) 0%, transparent 60%)' }} />
        )}

        {/* Tag */}
        <span className={`absolute top-3 left-3 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white ${
          route.tagOrange ? 'bg-[#F7941D]' : 'bg-black/55 backdrop-blur-sm border border-white/12'
        }`}>
          {route.tag}
        </span>

        {/* Route name on image */}
        <div className="absolute bottom-0 inset-x-0 p-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-black text-white text-sm drop-shadow-lg leading-tight">{route.from}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F7941D] shrink-0" />
            <span className="font-black text-white text-sm drop-shadow-lg leading-tight">{route.to}</span>
          </div>
          <div className="flex gap-3 mt-1">
            <span className="flex items-center gap-1 text-white/55 text-[9px]"><MapPin className="w-2.5 h-2.5" />{route.distance}</span>
            <span className="flex items-center gap-1 text-white/55 text-[9px]"><Clock className="w-2.5 h-2.5" />{route.duration}</span>
          </div>
        </div>
      </div>

      {/* Expanded info */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {/* Fares */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-[8px] font-black uppercase tracking-wider text-white/40 mb-0.5">Sedan</p>
                  <p className="text-lg font-black text-white">{route.sedanFare}</p>
                </div>
                <div className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(247,148,29,0.08)', border: '1px solid rgba(247,148,29,0.2)' }}>
                  <p className="text-[8px] font-black uppercase tracking-wider text-[#F7941D]/70 mb-0.5">SUV</p>
                  <p className="text-lg font-black text-[#F7941D]">{route.suvFare}</p>
                </div>
              </div>
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/919258912169?text=${encodeURIComponent(route.waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#F7941D] text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Book This Route
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap hint when collapsed */}
      {!expanded && (
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-white/25 text-[8px] uppercase tracking-widest">Tap for fares</span>
          <span className="text-[#F7941D]/50 text-[8px] font-black">→</span>
        </div>
      )}
    </div>
  );
}

/* helper type */
type buildRoute = ReturnType<typeof Array.prototype.map>[number];
