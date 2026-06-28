'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star, Shield, Zap } from 'lucide-react';

/**
 * HeroHeading — animated hero copy block.
 *
 * LCP-SAFE: Every element starts at opacity:1 / y:0 (fully visible on first
 * paint). Animations play as enhancement overlays, never hiding content.
 * No useState/useEffect mount gate — eliminates the hydration flash that was
 * causing the 2,530ms "element render delay" in PageSpeed.
 */

const HEAD_LINES = [
  { text: "Uttarakhand's", className: 'text-white' },
  { text: 'Most Trusted', className: 'text-[#F7941D]' },
  { text: 'Cab Service', className: 'text-white' },
];

export function HeroHeading() {
  const reduce = useReducedMotion();

  return (
    <div className="min-w-0 text-left">
      {/* Trust pill — starts visible, subtle lift-in on load */}
      <motion.div
        className="inline-flex items-center gap-2 bg-white/8 border border-white/12 px-4 py-2 rounded-full mb-8"
        initial={{ opacity: 1, y: reduce ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      >
        <span className="text-[#F7941D] text-xs font-black">+</span>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/80">
          Trusted Since 2011 · 10,000+ Rides
        </p>
      </motion.div>

      {/* H1 — starts fully visible. Stagger is a gentle enhancement only. */}
      <h1 className="font-heading font-black uppercase leading-[0.92] tracking-tight mb-8 break-words">
        {HEAD_LINES.map((line, i) => (
          <motion.span
            key={line.text}
            className={`block text-[2.5rem] sm:text-6xl md:text-7xl xl:text-8xl ${line.className}`}
            initial={{ opacity: 1, y: reduce ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 + i * 0.08 }}
          >
            {line.text}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle — LCP element. Plain HTML, always painted immediately. */}
      <p className="text-white/65 text-base md:text-lg max-w-lg mb-10 font-light leading-relaxed">
        Fixed fares. Local drivers. 24/7 availability across
        Uttarakhand — from Dehradun to Kedarnath, Char Dham,
        Mussoorie &amp; beyond.
      </p>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-3">
        {[
          { icon: <Star className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />, label: '4.9 / 5 Rating' },
          { icon: <Shield className="w-3.5 h-3.5 text-[#F7941D]" />, label: 'Zero Hidden Fees' },
          { icon: <Zap className="w-3.5 h-3.5 text-[#F7941D]" />, label: '15-Min Confirmation' },
        ].map((badge, i) => (
          <motion.span
            key={badge.label}
            className="flex items-center gap-2 bg-white/6 border border-white/10 text-white text-[11px] font-bold px-4 py-2.5 rounded-full cursor-default"
            initial={{ opacity: 1, y: reduce ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.3 + i * 0.07 }}
            whileHover={reduce ? undefined : { y: -3, backgroundColor: 'rgba(247,148,29,0.12)', borderColor: 'rgba(247,148,29,0.35)' }}
          >
            {badge.icon}
            {badge.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
