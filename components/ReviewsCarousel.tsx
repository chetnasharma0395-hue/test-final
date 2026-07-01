'use client';

import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * ReviewsCarousel — slot-based "coverflow" testimonial carousel.
 *
 * Every review is rendered once and positioned by its offset from the active
 * index. When active changes, each card animates from its old slot to its new
 * slot (center / side-peek / off-stage) — so the outgoing card smoothly
 * becomes the previous-peek and the next-peek slides into center. No overlap.
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
const SPRING = { type: 'spring' as const, stiffness: 220, damping: 28, mass: 0.9 };

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const n = reviews.length;

  const go = useCallback((dir: number) => {
    setActive((prev) => (prev + dir + n) % n);
  }, [n]);

  const jumpTo = (i: number) => setActive(i);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, go]);

  // Pause only when the cursor settles (user is reading). If the mouse keeps
  // moving (just browsing past), auto-play stays running. After the pointer is
  // still for IDLE_MS, we treat it as "reading" and pause; any movement resumes.
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onPointerMove = useCallback(() => {
    if (paused) setPaused(false);              // moving → resume
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setPaused(true), 1000); // still 1s → pause
  }, [paused]);
  const onPointerLeave = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    setPaused(false);
    setHovered(null);
  };
  useEffect(() => () => { if (idleTimer.current) clearTimeout(idleTimer.current); }, []);

  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  // Signed shortest offset of card i from active (wrap-around aware).
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const slotStyle = (offset: number) => {
    const sidePx = 300;
    if (offset === 0)  return { x: 0,         y: 0,   scale: 1,    rotate: 0,  opacity: 1,   blur: 0, zIndex: 30 };
    if (offset === -1) return { x: -sidePx,   y: 0,   scale: 0.82, rotate: -3, opacity: 0.4, blur: 2, zIndex: 20 };
    if (offset === 1)  return { x: sidePx,    y: 0,   scale: 0.82, rotate: 3,  opacity: 0.4, blur: 2, zIndex: 20 };
    // Beyond one step on the LEFT → the card is being "thrown" away:
    // it flies further left, lifts up in an arc, rotates hard, and fades.
    if (offset < 0)    return { x: -(sidePx + 260), y: -120, scale: 0.6, rotate: -22, opacity: 0, blur: 4, zIndex: 40 };
    // Beyond one step on the RIGHT → waiting off-stage, ready to slide in.
    return { x: sidePx + 160, y: 0, scale: 0.7, rotate: 8, opacity: 0, blur: 3, zIndex: 10 };
  };

  return (
    <div
      data-lenis-prevent
      className="relative w-full flex flex-col items-center"
      onPointerMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      onTouchStart={(e) => { setPaused(true); onTouchStart(e); }}
      onTouchEnd={(e) => { onTouchEnd(e); setTimeout(() => setPaused(false), 600); }}
    >
      {/* Stage */}
      <div className="relative w-full md:h-[300px] flex items-center justify-center [perspective:1400px] overflow-visible md:overflow-hidden">
        {reviews.map((review, i) => {
          const offset = offsetOf(i);
          const s = slotStyle(offset);
          const isCenter = offset === 0;
          const hideOnMobile = offset !== 0;
          const isThrowing = offset < -1;
          // When a peek card is hovered, bring it to full clarity (no fade/blur)
          // and lift it slightly — without moving it to center.
          const isHoveredPeek = hovered === i && !isCenter && Math.abs(offset) === 1;

          return (
            <motion.div
              key={i}
              className={`w-[88vw] max-w-[400px] ${
                isCenter ? 'relative md:absolute' : 'absolute'
              } ${hideOnMobile ? 'hidden md:block' : ''} ${Math.abs(offset) === 1 ? 'cursor-pointer' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onClick={() => { if (Math.abs(offset) === 1) jumpTo(i); }}
              style={{
                zIndex: isHoveredPeek ? 25 : s.zIndex,
                willChange: 'transform, opacity',
                filter: `blur(${isHoveredPeek ? 0 : s.blur}px)`,
              }}
              animate={reduce
                ? { opacity: isCenter ? 1 : 0 }
                : {
                    x: s.x,
                    y: isHoveredPeek ? -10 : s.y,
                    scale: isHoveredPeek ? 0.9 : s.scale,
                    rotate: isHoveredPeek ? 0 : s.rotate,
                    opacity: isHoveredPeek ? 0.95 : s.opacity,
                  }}
              transition={reduce
                ? { duration: 0.2 }
                : isThrowing
                  ? { duration: 0.5, ease: [0.36, 0, 0.66, -0.2] }
                  : SPRING}
              aria-hidden={!isCenter}
            >
              <motion.div
                animate={!reduce && isCenter ? { scale: [1, 1.025, 1] } : { scale: 1 }}
                transition={!reduce && isCenter
                  ? { duration: AUTOPLAY_MS / 1000, ease: 'easeInOut', times: [0, 0.5, 1] }
                  : { duration: 0.3 }}
              >
                <ReviewCard review={review} reduce={!!reduce} dim={!isCenter} animateStars={isCenter} />
              </motion.div>
            </motion.div>
          );
        })}
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

        <div className="flex items-center gap-2">
          {reviews.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className="h-2 rounded-full overflow-hidden relative transition-all duration-300"
                style={{
                  width: isActive ? 32 : 8,
                  backgroundColor: isActive ? 'rgba(247,148,29,0.25)' : 'rgba(255,255,255,0.2)',
                }}
              >
                {/* Timer fill — CSS-driven so it genuinely pauses (freezes in
                    place) when the user is reading, and resumes on movement. */}
                {isActive && !reduce && (
                  <span
                    key={`fill-${active}`}
                    className="review-timer-fill absolute inset-y-0 left-0 rounded-full bg-[#F7941D]"
                    style={{
                      animationDuration: `${AUTOPLAY_MS}ms`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                )}
                {/* Static fill for reduced-motion */}
                {isActive && reduce && (
                  <span className="absolute inset-0 rounded-full bg-[#F7941D]" />
                )}
              </button>
            );
          })}
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
function ReviewCard({
  review,
  reduce,
  dim = false,
  animateStars = true,
}: {
  review: Review;
  reduce: boolean;
  dim?: boolean;
  animateStars?: boolean;
}) {
  return (
    <div
      className="bg-[#1A1A1A] rounded-[2rem] p-6 sm:p-7 flex flex-col gap-4 border border-[#F7941D]/25"
      style={{ boxShadow: dim ? 'none' : '0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(247,148,29,0.10)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, j) => (
            <motion.span
              key={j}
              initial={reduce || !animateStars ? false : { opacity: 0, scale: 0.4, rotate: -30 }}
              animate={reduce || !animateStars ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.25 + j * 0.08, type: 'spring', stiffness: 400, damping: 18 }}
            >
              <Star className="w-4 h-4 fill-[#F7941D] text-[#F7941D]" />
            </motion.span>
          ))}
        </div>
        <Quote className="w-6 h-6 text-[#F7941D] opacity-25" />
      </div>

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

      <span className="inline-flex w-fit items-center bg-[#1A1209] text-[#F7941D] text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
        {review.trip}
      </span>

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
