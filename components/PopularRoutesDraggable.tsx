'use client';

/**
 * PopularRoutesDraggable
 * ──────────────────────
 * Scattered, draggable "collage" of route fare cards — inspired by the
 * Pixelflakes Sketch Studies layout.
 *
 * - position: absolute scatter (no grid/flexbox for card placement)
 * - Framer Motion drag + dragTransition (inertia/momentum on release)
 * - Z-index brought to front on drag start
 * - Click (no drag) toggles fare details expand/collapse
 * - SVG map-topology background at low opacity
 * - Glassmorphism cards
 * - Mobile: vertical scroll list (drag on tiny screens is bad UX)
 */

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, Clock, X, MessageCircle, ArrowRight, Navigation } from 'lucide-react';
import { PRICING_DATA, formatPrice } from '@/lib/priceData';

/* ── Card data ─────────────────────────────────────────────────── */
interface CardCfg {
  priceKey: keyof typeof PRICING_DATA;
  toLabelOverride?: string;
  image: string;
  tag: string;
  orange: boolean;
  /** Initial scatter position & tilt for the absolute canvas */
  x: number; y: number; rot: number;
}

const CARDS: CardCfg[] = [
  { priceKey:'dehradun-mussoorie',    image:'/assets/images/dest-mussoorie.jpg',         tag:'Most Popular',     orange:true,  x:24,   y:32,  rot:-2.5 },
  { priceKey:'dehradun-rishikesh',    image:'/assets/images/dest-rishikesh.jpg',          tag:'Adventure Hub',    orange:false, x:294,  y:62,  rot: 2.0 },
  { priceKey:'dehradun-kedarnath',    image:'/assets/images/dest-char-dham.jpg',          tag:'Char Dham Yatra',  orange:true,  x:568,  y:22,  rot:-1.5, toLabelOverride:'Kedarnath' },
  { priceKey:'jolly-grant-mussoorie', image:'/assets/images/dest-rishikesh-airport.jpg',  tag:'Airport Pick-up',  orange:false, x:844,  y:68,  rot: 3.0 },
  { priceKey:'dehradun-haridwar',     image:'/assets/images/dest-haridwar-rishikesh.jpg', tag:'Ganga Ghat',       orange:false, x:1088, y:38,  rot:-2.0 },
  { priceKey:'dehradun-nainital',     image:'/assets/images/dest-corbett.jpg',            tag:'Lakes & Wildlife', orange:true,  x:42,   y:318, rot: 1.5 },
  { priceKey:'haridwar-kedarnath',    image:'/assets/images/dest-char-dham.jpg',          tag:'Pilgrim Route',    orange:false, x:328,  y:288, rot:-2.5, toLabelOverride:'Kedarnath' },
  { priceKey:'haridwar-rishikesh',    image:'/assets/images/dest-haridwar-rishikesh.jpg', tag:'Temple Circuit',   orange:false, x:614,  y:342, rot: 2.0 },
  { priceKey:'rishikesh-kedarnath',   image:'/assets/images/dest-char-dham.jpg',          tag:'Yatra Route',      orange:true,  x:904,  y:298, rot:-1.0, toLabelOverride:'Kedarnath' },
  { priceKey:'delhi-dehradun',        image:'/assets/images/dest-mussoorie.jpg',          tag:'Delhi Gateway',    orange:false, x:152,  y:542, rot: 2.5 },
  { priceKey:'dehradun-badrinath',    image:'/assets/images/dest-char-dham.jpg',          tag:'Badrinath Yatra',  orange:true,  x:448,  y:508, rot:-2.0, toLabelOverride:'Badrinath' },
  { priceKey:'kathgodam-nainital',    image:'/assets/images/dest-corbett.jpg',            tag:'Station Pick-up',  orange:false, x:738,  y:524, rot: 1.5 },
];

/* ── Resolve fare data ─────────────────────────────────────────── */
const ROUTES = CARDS.map((c) => {
  const d = PRICING_DATA[c.priceKey];
  const to = c.toLabelOverride ?? d.to;
  return {
    ...c,
    from: d.from, to,
    distance: `${d.distance} km`,
    duration: d.duration.replace('hours','hrs').replace('minutes','mins'),
    sedan: formatPrice(d.sedan),
    suv: formatPrice(d.suv),
    wa: `Hi, I want to book a taxi from ${d.from} to ${to}.`,
  };
});

/* ═══════════════════════════════════════════════════════════════
   MAP BACKGROUND — abstract topology / GPS line art
═══════════════════════════════════════════════════════════════ */
function MapBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        {/* Dot grid pattern */}
        <pattern id="routeDots" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="rgba(255,255,255,0.18)" />
        </pattern>
        {/* Orange glow */}
        <filter id="oglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Orange route gradient */}
        <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(247,148,29,0)" />
          <stop offset="40%" stopColor="rgba(247,148,29,0.55)" />
          <stop offset="100%" stopColor="rgba(247,148,29,0)" />
        </linearGradient>
        <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Dot grid */}
      <rect width="100%" height="100%" fill="url(#routeDots)" />

      {/* ── Route path curves ── */}
      {/* Top arc — orange, dashed */}
      <path
        d="M 50 160 C 220 60, 430 240, 600 110 S 870 280, 1050 160 S 1260 80, 1380 140"
        stroke="url(#rg1)" strokeWidth="1.5" fill="none" strokeDasharray="9 14"
        opacity="0.9"
      />
      {/* Mid arc — white */}
      <path
        d="M 0 380 C 180 320, 380 460, 560 360 S 800 440, 1020 340 S 1220 420, 1400 360"
        stroke="url(#rg2)" strokeWidth="1" fill="none" strokeDasharray="5 18"
      />
      {/* Bottom arc — orange */}
      <path
        d="M 80 600 C 260 530, 480 670, 680 555 S 940 630, 1150 545 S 1320 600, 1400 570"
        stroke="url(#rg1)" strokeWidth="1.5" fill="none" strokeDasharray="10 12"
        opacity="0.7"
      />
      {/* Diagonal whisper */}
      <path
        d="M 0 200 L 1400 500"
        stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none"
      />
      <path
        d="M 0 500 L 1400 200"
        stroke="rgba(247,148,29,0.04)" strokeWidth="1" fill="none"
      />

      {/* ── Location node dots ── */}
      {[
        [50,160],[250,100],[600,110],[880,200],[1050,160],
        [40,380],[330,360],[600,400],[900,340],[1150,380],
        [150,580],[470,545],[760,570],[1100,540],
      ].map(([cx,cy],i) => (
        <g key={i} filter="url(#oglow)">
          <circle cx={cx} cy={cy} r="3.5" fill="rgba(247,148,29,0.55)" />
          <circle cx={cx} cy={cy} r="8"   fill="none" stroke="rgba(247,148,29,0.25)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="14"  fill="none" stroke="rgba(247,148,29,0.10)" strokeWidth="1" />
        </g>
      ))}

      {/* ── Connecting whisker lines (from nodes to each other) ── */}
      {[
        'M 50 160 L 250 100','M 250 100 L 600 110','M 600 110 L 880 200',
        'M 40 380 L 330 360','M 330 360 L 600 400','M 600 400 L 900 340',
        'M 150 580 L 470 545','M 470 545 L 760 570',
        'M 250 100 L 40 380','M 880 200 L 900 340','M 470 545 L 330 360',
      ].map((d,i) => (
        <path key={i} d={d} stroke="rgba(247,148,29,0.12)" strokeWidth="0.8" fill="none" />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DRAGGABLE ROUTE CARD
═══════════════════════════════════════════════════════════════ */
interface CardProps {
  route: (typeof ROUTES)[number];
  id: number;
  zIndex: number;
  onBringToFront: (id: number) => void;
  expanded: boolean;
  onToggle: (id: number) => void;
}

function DraggableCard({ route, id, zIndex, onBringToFront, expanded, onToggle }: CardProps) {
  const reduce = useReducedMotion();
  /** Track whether the pointer moved enough to count as a drag */
  const dragged = useRef(false);

  return (
    <motion.div
      drag
      dragMomentum
      dragElastic={0.08}
      dragTransition={{ power: 0.18, timeConstant: 360 }}
      /* ── Initial scatter entrance ── */
      initial={{ opacity: 0, scale: 0.82, rotate: route.rot }}
      animate={{ opacity: 1, scale: 1, rotate: reduce ? 0 : route.rot,
        transition: { delay: id * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
      /* ── Drag feel ── */
      whileDrag={{ rotate: 0, scale: 1.06, cursor: 'grabbing', zIndex: 9999 }}
      style={{
        position: 'absolute',
        left: route.x,
        top: route.y,
        width: 230,
        zIndex,
        cursor: 'grab',
        willChange: 'transform',
      }}
      /* ── Bring to front on drag start ── */
      onDragStart={() => {
        dragged.current = false;
        onBringToFront(id);
      }}
      onDrag={() => { dragged.current = true; }}
      /* ── Click = toggle expand (only if not dragged) ── */
      onPointerUp={() => {
        if (!dragged.current) onToggle(id);
        // reset for next interaction
        setTimeout(() => { dragged.current = false; }, 80);
      }}
    >
      {/* ── CARD SHELL ── */}
      <div
        className="rounded-[1.5rem] overflow-hidden border transition-all duration-300 select-none"
        style={{
          background: 'rgba(18,18,18,0.82)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderColor: expanded ? 'rgba(247,148,29,0.55)' : 'rgba(255,255,255,0.09)',
          boxShadow: expanded
            ? '0 28px 72px rgba(0,0,0,0.75), 0 0 0 1px rgba(247,148,29,0.18), 0 0 40px -8px rgba(247,148,29,0.25)'
            : '0 16px 48px rgba(0,0,0,0.6)',
        }}
      >
        {/* ── Image ── */}
        <div className="relative h-32 overflow-hidden">
          <Image
            src={route.image}
            alt={`${route.from} to ${route.to}`}
            fill sizes="230px" quality={80}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Orange glow on expanded */}
          {expanded && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(247,148,29,0.2) 0%, transparent 65%)' }} />
          )}

          {/* Tag pill */}
          <span className={`absolute top-2.5 left-2.5 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white ${
            route.orange ? 'bg-[#F7941D]' : 'bg-black/50 border border-white/15 backdrop-blur-md'
          }`}>
            {route.tag}
          </span>

          {/* Route name on image */}
          <div className="absolute bottom-2.5 left-3 right-3">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-xs leading-tight drop-shadow-lg">{route.from}</span>
              <ArrowRight className="w-3 h-3 text-[#F7941D] shrink-0" />
              <span className="font-black text-white text-xs leading-tight drop-shadow-lg">{route.to}</span>
            </div>
          </div>
        </div>

        {/* ── Collapsed state: minimal meta ── */}
        {!expanded && (
          <div className="px-3.5 py-2.5 flex items-center justify-between">
            <div className="flex gap-3">
              <span className="flex items-center gap-1 text-white/45 text-[9px]">
                <MapPin className="w-2.5 h-2.5" />{route.distance}
              </span>
              <span className="flex items-center gap-1 text-white/45 text-[9px]">
                <Clock className="w-2.5 h-2.5" />{route.duration}
              </span>
            </div>
            <span className="text-[#F7941D]/60 text-[8px] font-black uppercase tracking-widest">Tap →</span>
          </div>
        )}

        {/* ── Expanded state: full fares + CTA ── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-3.5 pt-3 pb-3.5 space-y-2.5">
                {/* Distance + duration */}
                <div className="flex gap-2.5">
                  <span className="flex items-center gap-1 text-white/55 text-[9px]">
                    <MapPin className="w-2.5 h-2.5 text-[#F7941D]" />{route.distance}
                  </span>
                  <span className="flex items-center gap-1 text-white/55 text-[9px]">
                    <Clock className="w-2.5 h-2.5 text-[#F7941D]" />{route.duration}
                  </span>
                </div>

                {/* Fare tiles */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="rounded-xl p-2.5 text-center"
                    style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-[7px] font-black uppercase tracking-wider text-white/40 mb-0.5">Sedan</p>
                    <p className="font-black text-white text-base leading-none">{route.sedan}</p>
                  </div>
                  <div className="rounded-xl p-2.5 text-center"
                    style={{ background:'rgba(247,148,29,0.09)', border:'1px solid rgba(247,148,29,0.22)' }}>
                    <p className="text-[7px] font-black uppercase tracking-wider text-[#F7941D]/70 mb-0.5">SUV</p>
                    <p className="font-black text-[#F7941D] text-base leading-none">{route.suv}</p>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/919258912169?text=${encodeURIComponent(route.wa)}`}
                  target="_blank" rel="noopener noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#F7941D] hover:bg-[#D97E10] text-white font-black text-[8px] uppercase tracking-widest rounded-xl transition-colors"
                >
                  <MessageCircle className="w-3 h-3" /> Book This Route
                </a>

                {/* Close hint */}
                <button
                  className="w-full text-center text-[7px] text-white/25 uppercase tracking-widest pt-0.5"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onToggle(id); }}
                >
                  ✕ close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */
export function PopularRoutesDraggable() {
  const zCounter = useRef(ROUTES.length + 10);
  const [zIndexes, setZIndexes] = useState<Record<number, number>>(() =>
    Object.fromEntries(ROUTES.map((_, i) => [i, i + 1]))
  );
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const bringToFront = (id: number) => {
    zCounter.current += 1;
    setZIndexes((prev) => ({ ...prev, [id]: zCounter.current }));
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
    bringToFront(id);
  };

  return (
    <>
      {/* ── DESKTOP CANVAS ───────────────────────────────────────── */}
      <div
        className="relative hidden md:block w-full overflow-visible"
        style={{ minHeight: 760 }}
        aria-label="Draggable route cards — drag to explore, tap to see fares"
      >
        {/* Map background */}
        <MapBackground />

        {/* Usage hint */}
        <div className="absolute top-3 right-4 z-10 pointer-events-none">
          <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/25">
            <Navigation className="w-2.5 h-2.5" /> Drag · Tap for fares
          </span>
        </div>

        {/* Scattered cards */}
        {ROUTES.map((route, i) => (
          <DraggableCard
            key={i}
            id={i}
            route={route}
            zIndex={zIndexes[i] ?? i + 1}
            onBringToFront={bringToFront}
            expanded={expandedId === i}
            onToggle={toggleExpand}
          />
        ))}
      </div>

      {/* ── MOBILE — vertical scroll list ────────────────────────── */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        {ROUTES.map((route, i) => {
          const isExp = expandedId === i;
          return (
            <motion.div
              key={i}
              className={i === 2 ? 'col-span-2' : ''}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Simplified static card for mobile */}
              <div
                className="rounded-[1.5rem] overflow-hidden border cursor-pointer transition-all duration-300"
                style={{
                  background:'rgba(18,18,18,0.9)',
                  borderColor: isExp ? 'rgba(247,148,29,0.55)' : 'rgba(255,255,255,0.09)',
                  boxShadow: isExp ? '0 20px 56px rgba(0,0,0,0.6)' : '0 8px 28px rgba(0,0,0,0.5)',
                }}
                onClick={() => setExpandedId((p) => p === i ? null : i)}
              >
                <div className="relative h-28 overflow-hidden">
                  <Image src={route.image} alt={`${route.from} to ${route.to}`} fill sizes="50vw" quality={75} className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className={`absolute top-2 left-2 text-[7px] font-black uppercase tracking-widest px-2 py-1 rounded-full text-white ${route.orange ? 'bg-[#F7941D]' : 'bg-black/50 border border-white/15'}`}>{route.tag}</span>
                  <div className="absolute bottom-2 left-2.5 right-2">
                    <div className="flex items-center gap-1">
                      <span className="font-black text-white text-[10px] leading-tight">{route.from}</span>
                      <ArrowRight className="w-2.5 h-2.5 text-[#F7941D] shrink-0" />
                      <span className="font-black text-white text-[10px] leading-tight">{route.to}</span>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {isExp ? (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} className="overflow-hidden">
                      <div className="p-3 space-y-2">
                        <div className="grid grid-cols-2 gap-1.5">
                          <div className="rounded-lg p-2 text-center" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                            <p className="text-[7px] font-black uppercase text-white/40">Sedan</p>
                            <p className="font-black text-white text-sm">{route.sedan}</p>
                          </div>
                          <div className="rounded-lg p-2 text-center" style={{ background:'rgba(247,148,29,0.09)', border:'1px solid rgba(247,148,29,0.22)' }}>
                            <p className="text-[7px] font-black uppercase text-[#F7941D]/70">SUV</p>
                            <p className="font-black text-[#F7941D] text-sm">{route.suv}</p>
                          </div>
                        </div>
                        <a href={`https://wa.me/919258912169?text=${encodeURIComponent(route.wa)}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center justify-center gap-1 w-full py-2 bg-[#F7941D] text-white font-black text-[8px] uppercase tracking-widest rounded-xl">
                          <MessageCircle className="w-2.5 h-2.5" /> Book
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="px-3 py-2 flex items-center justify-between">
                      <span className="text-white/40 text-[8px]">Tap for fares</span>
                      <span className="text-[#F7941D]/60 text-[8px] font-black">→</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
