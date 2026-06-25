'use client';

import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * ReviewsCarousel — premium "card throw" testimonial carousel.
 *
 * Behaviour:
 *  - Active card sits center, full size, with a slow breathe-zoom.
 *  - Side cards are smaller, rotated, faded (a relaxed stack).
 *  - Auto-play every AUTOPLAY_MS: the outgoing card is "thrown" out with an
 *    arc + rotation + shrink + fade (like flicking a playing card); the next
 *    card springs into the center with a soft bounce.
 *  - Pauses on hover / touch. Manual arrows + swipe supported.
 *  - Respects prefers-reduced-motion (static, no auto-play).
 */

export type Review = {
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  trip: string;
};

const AUTOPLAY_MS = 4500;

// Spring tuned for a premium, heavy-but-smooth settle.
const ENTER_SPRING = { type: 'spring' as const, stiffness: 260, damping: 26, mass: 0.9 };
const THROW_TRANS = { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const };

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + reviews.length) % reviews.length);
  }, [reviews.length]);

  // Auto-play
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, go]);

  // Swipe (touch)
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const current = reviews[active];

  // Throw variants — outgoing card flies out in an arc with rotation.
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 340 : -340,
      rotate: dir > 0 ? 12 : -12,
      scale: 0.8,
      opacity: 0,
    }),
    center: {
      x: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: ENTER_SPRING,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -380 : 380,
      y: -40,
      rotate: dir > 0 ? -14 : 14,
      scale: 0.7,
      opacity: 0,
      transition: THROW_TRANS,
    }),
  };

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { setPaused(true); onTouchStart(e); }}
      onTouchEnd={(e) => { onTouchEnd(e); setTimeout(() => setPaused(false), 600); }}
    >
      {/* Stage — center active card + peek of prev/next */}
      <div className="relative w-full h-[360px] sm:h-[340px] flex items-center justify-center [perspective:1400px]">

        {/* Prev peek (desktop only) */}
        {!reduce && (
          <div className="hidden md:block absolute left-0 lg:left-8 top-1/2 -translate-y-1/2 w-[320px] opacity-35 scale-[0.82] blur-[1px] pointer-events-none select-none -rotate-2 origin-right">
            <ReviewCard review={reviews[(active - 1 + reviews.length) % reviews.length]} reduce compact />
          </div>
        )}

        {/* Next peek (desktop only) */}
        {!reduce && (
          <div className="hidden md:block absolute right-0 lg:right-8 top-1/2 -translate-y-1/2 w-[320px] opacity-35 scale-[0.82] blur-[1px] pointer-events-none select-none rotate-2 origin-left">
            <ReviewCard review={reviews[(active + 1) % reviews.length]} reduce compact />
          </div>
        )}

        {/* Active card (throw effect) */}
        <div className="relative z-10 w-full max-w-[420px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={active}
              custom={direction}
              variants={reduce ? undefined : variants}
              initial={reduce ? false : 'enter'}
              animate={reduce ? undefined : 'center'}
              exit={reduce ? undefined : 'exit'}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Breathe-zoom wrapper (only while resting in center) */}
              <motion.div
                animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
                transition={reduce ? undefined : { duration: AUTOPLAY_MS / 1000, ease: 'easeInOut', times: [0, 0.5, 1] }}
              >
                <ReviewCard review={current} reduce={!!reduce} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5 mt-8">
        <button
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-[#F7941D]/50 hover:bg-white/5 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
              aria-label={`Go to review ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 26 : 8,
                backgroundColor: i === active ? '#F7941D' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next review"
          className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-[#F7941D]/50 hover:bg-white/5 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/* ── Single review card ──────────────────────────────────────────── */
function ReviewCard({ review, reduce, compact = false }: { review: Review; reduce: boolean; compact?: boolean }) {
  return (
    <div
      className="bg-[#1A1A1A] rounded-[2rem] p-6 sm:p-7 flex flex-col gap-4 border border-[#F7941D]/25"
      style={{ boxShadow: compact ? 'none' : '0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(247,148,29,0.10)' }}
    >
      {/* Stars (draw in one-by-one) + Quote */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, j) => (
            <motion.span
              key={j}
              initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -30 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.25 + j * 0.08, type: 'spring', stiffness: 400, damping: 18 }}
            >
              <Star className="w-4 h-4 fill-[#F7941D] text-[#F7941D]" />
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={reduce ? undefined : { opacity: 0.25, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Quote className="w-6 h-6 text-[#F7941D]" />
        </motion.div>
      </div>

      {/* Body */}
      <p
        className="text-white/75 text-sm leading-relaxed"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '6.5em',
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Trip tag */}
      <span className="inline-flex w-fit items-center bg-[#1A1209] text-[#F7941D] text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
        {review.trip}
      </span>

      {/* Reviewer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <p className="font-extrabold text-white text-sm tracking-tight">{review.name}</p>
          <p className="text-white/60 text-xs font-light mt-0.5">{review.location} · {review.date}</p>
        </div>
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-label="Google review">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </div>
    </div>
  );
}
