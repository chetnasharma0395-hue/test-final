'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star, Shield, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * HeroHeading — premium animated hero copy block.
 *
 * SSR-safe: renders full static markup until mounted, so the H1 text is
 * always present for crawlers and no-JS users. Once mounted, lines reveal
 * with a staggered blur-up entrance.
 *
 * Pure motion layer — no layout/structure change vs the static version.
 */

const HEAD_LINES = [
  { text: "Uttarakhand's", className: 'text-white' },
  { text: 'Most Trusted', className: 'text-[#F7941D]' },
  { text: 'Cab Service', className: 'text-white' },
];

const lineVariants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroHeading() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const animate = mounted && !reduce;

  return (
    <div className="min-w-0 text-left">
      {/* Trust pill */}
      <motion.div
        className="inline-flex items-center gap-2 bg-white/8 border border-white/12 px-4 py-2 rounded-full mb-8"
        initial={animate ? { opacity: 0, y: 12 } : false}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[#F7941D] text-xs font-black">+</span>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/80">
          Trusted Since 2012 · 20,000+ Rides
        </p>
      </motion.div>

      {/* Main heading — staggered line reveal */}
      <motion.h1
        className="font-heading font-black uppercase leading-[0.92] tracking-tight mb-8 break-words"
        initial={animate ? 'hidden' : false}
        animate={animate ? 'show' : undefined}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
        }}
      >
        {HEAD_LINES.map((line) => (
          <motion.span
            key={line.text}
            className={`block text-[2.5rem] sm:text-6xl md:text-7xl xl:text-8xl ${line.className}`}
            variants={animate ? lineVariants : undefined}
            style={{ willChange: 'transform, filter' }}
          >
            {line.text}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-white/65 text-base md:text-lg max-w-lg mb-10 font-light leading-relaxed"
        initial={animate ? { opacity: 0, y: 16 } : false}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        Fixed fares. Local drivers. 24/7 availability across
        Uttarakhand — from Dehradun to Kedarnath, Char Dham,
        Mussoorie &amp; beyond.
      </motion.p>

      {/* Trust badges — stagger in, then hover-lift */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={animate ? 'hidden' : false}
        animate={animate ? 'show' : undefined}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.75 } },
        }}
      >
        {[
          { icon: <Star className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />, label: '4.9 / 5 Rating' },
          { icon: <Shield className="w-3.5 h-3.5 text-[#F7941D]" />, label: 'Zero Hidden Fees' },
          { icon: <Zap className="w-3.5 h-3.5 text-[#F7941D]" />, label: '15-Min Confirmation' },
        ].map((badge) => (
          <motion.span
            key={badge.label}
            className="flex items-center gap-2 bg-white/6 border border-white/10 text-white text-[11px] font-bold px-4 py-2.5 rounded-full cursor-default"
            variants={animate ? { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } } : undefined}
            whileHover={reduce ? undefined : { y: -3, backgroundColor: 'rgba(247,148,29,0.12)', borderColor: 'rgba(247,148,29,0.35)' }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          >
            {badge.icon}
            {badge.label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
