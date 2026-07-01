'use client';

/**
 * MotionKit — central animation system for Uttarakhand Cab 24/7.
 * Reusable, performance-conscious motion primitives built on Framer Motion.
 * Every component respects prefers-reduced-motion.
 *
 * Usage:
 *   <Reveal>...</Reveal>                 // scroll-triggered fade + rise
 *   <Reveal delay={0.1} direction="left">
 *   <Stagger><Reveal/><Reveal/></Stagger> // sequence children
 *   <TiltCard>...</TiltCard>             // 3D tilt on hover
 *   <MagneticButton>Book Now</MagneticButton>
 *   <CountUp to={20000} suffix="+" />
 *   <Aurora />                           // ambient gradient glow background
 */

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { useRef, useEffect, useState, type ReactNode, type MouseEvent } from 'react';

/* ─────────────────────────────────────────────
   1. REVEAL — scroll-triggered entrance
   ───────────────────────────────────────────── */
type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

/* ─────────────────────────────────────────────
   FADE-IN-UP — reduced-motion-aware replacement for the
   `const fadeInUp = {...}` pattern duplicated across several page files.
   Usage: const fadeInUp = useFadeInUp(); <motion.div {...fadeInUp}>
   ───────────────────────────────────────────── */
export function useFadeInUp() {
  const reduce = useReducedMotion();
  return {
    initial: { opacity: 0, y: reduce ? 0 : 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: reduce ? 0 : 0.7, ease: 'easeOut' as const },
  };
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const o = reduce ? offset.none : offset[direction];

  // SSR + pre-hydration: render fully visible plain div so content is never
  // hidden for crawlers, no-JS users, or if animation fails to trigger.
  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  // whileInView reliably handles elements already in the viewport at mount
  // (unlike a manual useInView gate that can leave content stuck invisible).
  return (
    <motion.div
      className={className}
      style={{ maxWidth: '100%' }}
      initial={{ opacity: 0, x: o.x, y: o.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.05, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   2. STAGGER — animate a group of children in sequence
   ───────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Stagger({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // SSR + pre-hydration: plain visible container so content is never hidden.
  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // SSR-safe: plain visible div until mounted; once mounted it picks up the
  // parent Stagger's variant context for the entrance animation.
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   3. TILT CARD — 3D perspective tilt on hover
   ───────────────────────────────────────────── */
export function TiltCard({
  children,
  className = '',
  intensity = 12,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 200,
    damping: 18,
  });
  const glareBg = useTransform(
    [mvX, mvY],
    (latest: number[]) => {
      const x = (latest[0] + 0.5) * 100;
      const y = (latest[1] + 0.5) * 100;
      return `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18), transparent 60%)`;
    }
  );

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.3 } }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   4. MAGNETIC BUTTON — cursor attraction
   ───────────────────────────────────────────── */
export function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  as = 'button',
  href,
  target,
  rel,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15 });
  const sy = useSpring(y, { stiffness: 250, damping: 15 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {as === 'a' ? (
        <a href={href} target={target} rel={rel} className={className} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button type="button" className={className} onClick={onClick}>
          {children}
        </button>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   5. COUNT UP — animate numbers on scroll into view
   ───────────────────────────────────────────── */
export function CountUp({
  to,
  from = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   6. AURORA — ambient animated gradient glow
   ───────────────────────────────────────────── */
export function Aurora({ className = '' }: { className?: string }) {
  // Pure CSS animation (compositor thread) — no JS animation loop,
  // so it contributes zero Total Blocking Time. Respects reduced-motion
  // automatically via the global media query in CSS.
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute -top-1/3 left-1/4 h-[460px] w-[460px] rounded-full blur-[80px] motion-safe:animate-aurora-1"
        style={{ background: 'rgba(247,148,29,0.20)', willChange: 'transform' }}
      />
      <div
        className="absolute top-1/4 right-1/4 h-[380px] w-[380px] rounded-full blur-[80px] motion-safe:animate-aurora-2"
        style={{ background: 'rgba(247,148,29,0.10)', willChange: 'transform' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   7. FLOAT — gentle infinite floating (for badges/icons)
   ───────────────────────────────────────────── */
export function Float({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  // CSS-based float (compositor thread) — no main-thread JS loop.
  return <div className={`motion-safe:animate-float ${className}`}>{children}</div>;
}

/* ─────────────────────────────────────────────
   8. WORD REVEAL — hero text animates word-by-word
   ───────────────────────────────────────────── */
export function WordReveal({
  text,
  className = '',
  delay = 0,
  highlightWords = [],
  highlightClassName = '',
}: {
  text: string;
  className?: string;
  delay?: number;
  /** words (case-insensitive) to wrap in highlightClassName */
  highlightWords?: string[];
  highlightClassName?: string;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const words = text.split(' ');
  const highlightSet = new Set(highlightWords.map((w) => w.toLowerCase()));

  // SSR + reduced-motion: render plain text so it's always visible/crawlable.
  if (!mounted || reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => {
          const hl = highlightSet.has(w.toLowerCase());
          return (
            <span key={i} className={hl ? highlightClassName : undefined}>
              {w}{i < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      style={{ display: 'inline' }}
    >
      {words.map((w, i) => {
        const hl = highlightSet.has(w.toLowerCase());
        return (
          <motion.span
            key={i}
            className={hl ? highlightClassName : undefined}
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={{
              hidden: { opacity: 0, y: '0.4em', filter: 'blur(6px)' },
              show: {
                opacity: 1,
                y: '0em',
                filter: 'blur(0px)',
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {w}{i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   9. PRESSABLE — adds hover-lift + tap-press to any block
   (wrap cards, chips, list items — no layout change)
   ───────────────────────────────────────────── */
export function Pressable({
  children,
  className = '',
  lift = 4,
}: {
  children: ReactNode;
  className?: string;
  /** px to lift on hover */
  lift?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -lift }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
