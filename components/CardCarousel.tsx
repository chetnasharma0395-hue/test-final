'use client';

import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';

const VELOCITY_WINDOW_MS = 80;
const FLICK_VELOCITY = 0.22;
const SNAP_DISTANCE_RATIO = 0.35;

interface TouchSample {
  x: number;
  t: number;
}

/**
 * CardCarousel<T>
 * ───────────────
 * Generic, drag-and-snap carousel with center-focus depth effect.
 *
 *  • Mouse drag, touch swipe, keyboard ← → / Home / End
 *  • Active card is full scale; adjacent cards scale down + blur
 *  • Dot indicators + prev/next arrows
 *
 * Props:
 *   items        — array of T
 *   renderCard   — (item, isActive, index) => ReactNode  (the card body)
 *   getKey       — (item, index) => string | number  (unique key)
 *   cardWidth    — px width of one card (default 380)
 *   cardGap      — px gap between cards (default 24)
 *   edgeFadeBg   — solid bg color for left/right edge masks (matches section bg)
 *   initialIndex — starting active index (defaults to middle)
 *   ariaLabel    — accessibility label for the carousel
 */
export function CardCarousel<T>({
  items,
  renderCard,
  getKey,
  cardWidth = 380,
  cardGap = 24,
  edgeFadeBg = '#1A1A1A',
  initialIndex,
  ariaLabel = 'Carousel — use arrow keys to navigate',
}: {
  items: T[];
  renderCard: (item: T, isActive: boolean, index: number) => ReactNode;
  getKey: (item: T, index: number) => string | number;
  cardWidth?: number;
  cardGap?: number;
  edgeFadeBg?: string;
  initialIndex?: number;
  ariaLabel?: string;
}) {
  const [active, setActive] = useState(initialIndex ?? Math.floor(items.length / 2));
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  // Responsive card width — on small screens, cap card to viewport minus
  // padding so the active card never touches the screen edges. Falls back
  // to the provided cardWidth on larger screens.
  const [responsiveWidth, setResponsiveWidth] = useState(cardWidth);
  useEffect(() => {
    const computeWidth = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        // leave 48px total breathing room (24px each side)
        setResponsiveWidth(Math.min(cardWidth, vw - 48));
      } else {
        setResponsiveWidth(cardWidth);
      }
    };
    computeWidth();
    window.addEventListener('resize', computeWidth);
    return () => window.removeEventListener('resize', computeWidth);
  }, [cardWidth]);

  const CARD_STRIDE = responsiveWidth + cardGap;

  const activeRef = useRef(active);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchSamples = useRef<TouchSample[]>([]);
  const isScrollLocked = useRef<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  const snapTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    setIsSnapping(true);
    setDragOffset(0);
    setIsDragging(false);
    setActive(clamped);
    const t = setTimeout(() => setIsSnapping(false), 500);
    return () => clearTimeout(t);
  }, [items.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); snapTo(activeRef.current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); snapTo(activeRef.current + 1); }
      if (e.key === 'Home')       { e.preventDefault(); snapTo(0); }
      if (e.key === 'End')        { e.preventDefault(); snapTo(items.length - 1); }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [snapTo, items.length]);

  const prev = () => snapTo(activeRef.current - 1);
  const next = () => snapTo(activeRef.current + 1);

  const mouseStartX = useRef<number | null>(null);
  const mouseSamples = useRef<TouchSample[]>([]);

  const onMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    mouseSamples.current = [{ x: e.clientX, t: performance.now() }];
    setIsSnapping(false);
  };

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    if (Math.abs(dx) > 6) {
      setIsDragging(true);
      setDragOffset(dx * 0.85);
    }
    mouseSamples.current.push({ x: e.clientX, t: performance.now() });
    const cutoff = performance.now() - VELOCITY_WINDOW_MS;
    mouseSamples.current = mouseSamples.current.filter((s) => s.t >= cutoff);
  }, []);

  const computeVelocity = (samples: TouchSample[]): number => {
    if (samples.length < 2) return 0;
    const first = samples[0];
    const last = samples[samples.length - 1];
    const dt = last.t - first.t;
    if (dt === 0) return 0;
    return (last.x - first.x) / dt;
  };

  const resolveGesture = useCallback((dx: number, velocity: number) => {
    const cur = activeRef.current;
    let target = cur;
    const isFlick = Math.abs(velocity) > FLICK_VELOCITY;
    const isFarEnough = Math.abs(dx) > CARD_STRIDE * SNAP_DISTANCE_RATIO;
    if (isFlick || isFarEnough) {
      if (velocity < 0 || dx < 0) target = cur + 1;
      else target = cur - 1;
    }
    snapTo(target);
  }, [CARD_STRIDE, snapTo]);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    const velocity = computeVelocity(mouseSamples.current);
    resolveGesture(dx, velocity);
    mouseStartX.current = null;
    mouseSamples.current = [];
  }, [resolveGesture]);

  const onMouseLeave = useCallback(() => {
    if (mouseStartX.current !== null) {
      snapTo(activeRef.current);
      mouseStartX.current = null;
    }
  }, [snapTo]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchSamples.current = [{ x: touch.clientX, t: performance.now() }];
    isScrollLocked.current = null;
    setIsSnapping(false);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;
    if (isScrollLocked.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      isScrollLocked.current = Math.abs(dx) >= Math.abs(dy);
    }
    if (!isScrollLocked.current) return;
    e.preventDefault();
    setIsDragging(true);
    const atStart = activeRef.current === 0 && dx > 0;
    const atEnd = activeRef.current === items.length - 1 && dx < 0;
    const resistance = atStart || atEnd ? 0.3 : 0.85;
    setDragOffset(dx * resistance);
    touchSamples.current.push({ x: touch.clientX, t: performance.now() });
    const cutoff = performance.now() - VELOCITY_WINDOW_MS;
    touchSamples.current = touchSamples.current.filter((s) => s.t >= cutoff);
  }, [items.length]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX.current;
    const velocity = computeVelocity(touchSamples.current);
    if (isScrollLocked.current) {
      resolveGesture(dx, velocity);
    } else {
      setDragOffset(0);
      setIsDragging(false);
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchSamples.current = [];
    isScrollLocked.current = null;
  }, [resolveGesture]);

  const snapOffset = -(active * CARD_STRIDE);
  const totalOffset = snapOffset + dragOffset;

  const trackTransition = isDragging
    ? 'none'
    : 'transform 0.48s cubic-bezier(0.25, 1.35, 0.40, 1)';

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
      className="w-full select-none outline-none"
    >
      <div className="relative overflow-hidden w-full" style={{ paddingBottom: 8 }}>
        <div className="absolute left-0 top-0 bottom-0 pointer-events-none z-10 w-6 sm:w-[88px]"
          style={{ background: `linear-gradient(to right, ${edgeFadeBg}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none z-10 w-6 sm:w-[88px]"
          style={{ background: `linear-gradient(to left, ${edgeFadeBg}, transparent)` }} />

        <div
          style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: cardGap,
              paddingTop: 12,
              paddingBottom: 28,
              willChange: 'transform',
              transform: `translateX(calc(50% - ${responsiveWidth / 2}px + ${totalOffset}px))`,
              transition: trackTransition,
            }}
          >
            {items.map((item, i) => {
              const diff = i - active;
              const isActiveCard = diff === 0;
              const isAdjacent = Math.abs(diff) === 1;
              const scale   = isActiveCard ? 1 : isAdjacent ? 0.90 : 0.80;
              const opacity = isActiveCard ? 1 : isAdjacent ? 0.50 : 0.20;
              const blur    = isActiveCard ? 0 : isAdjacent ? 1.5  : 3;
              const cardY   = isActiveCard ? 0 : isAdjacent ? 14   : 28;

              return (
                <div
                  key={getKey(item, i)}
                  onClick={() => { if (!isDragging && Math.abs(dragOffset) < 6) snapTo(i); }}
                  style={{
                    width: responsiveWidth,
                    flexShrink: 0,
                    cursor: isActiveCard ? 'default' : 'pointer',
                    transform: `scale(${scale}) translateY(${cardY}px)`,
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                    transition: isDragging
                      ? 'opacity 0.15s ease, filter 0.15s ease'
                      : 'transform 0.48s cubic-bezier(0.25,1.35,0.40,1), opacity 0.4s ease, filter 0.4s ease',
                    zIndex: isActiveCard ? 2 : 1,
                  }}
                >
                  {renderCard(item, isActiveCard, i)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation row */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <NavArrow direction="prev" disabled={active === 0} onClick={prev} label="Previous" />
        <div className="flex items-center gap-2" role="tablist">
          {items.map((item, i) => (
            <button
              key={getKey(item, i)}
              role="tab"
              aria-selected={i === active}
              onClick={() => snapTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                height: 6,
                width: i === active ? 22 : 6,
                borderRadius: 999,
                background: i === active ? '#F7941D' : 'rgba(255,255,255,0.2)',
                boxShadow: i === active ? '0 0 10px rgba(247,148,29,0.45)' : 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            />
          ))}
        </div>
        <NavArrow direction="next" disabled={active === items.length - 1} onClick={next} label="Next" />
      </div>

      <p className="text-center mt-4 text-[10px] font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.18)' }}>
        <span className="hidden sm:inline">Drag · click · or use ← → arrow keys</span>
        <span className="sm:hidden">Swipe to explore</span>
      </p>
    </div>
  );
}

function NavArrow({ direction, disabled, onClick, label }: {
  direction: 'prev' | 'next'; disabled: boolean; onClick: () => void; label: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44, borderRadius: '50%',
        background: hovered && !disabled ? 'rgba(247,148,29,0.14)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hovered && !disabled ? 'rgba(247,148,29,0.38)' : 'rgba(255,255,255,0.10)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.22 : 1,
        color: hovered && !disabled ? '#F7941D' : 'white',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        {direction === 'prev'
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}
