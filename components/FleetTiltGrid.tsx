'use client';

import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowRight, Car, Users, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  car: Car,
  users: Users,
};

export interface FleetOptionData {
  name: string;
  models: string;
  capacity: string;
  iconName: string;
  best: string;
  accent: boolean;
}

const CARD_WIDTH = 340;
const CARD_GAP = 20;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;

// Velocity sample window — only use touches in the last N ms for velocity
const VELOCITY_WINDOW_MS = 80;
// Minimum flick velocity (px/ms) to advance a card regardless of distance
const FLICK_VELOCITY = 0.22;
// Snap if dragged more than this fraction of CARD_STRIDE
const SNAP_DISTANCE_RATIO = 0.35;

interface TouchSample {
  x: number;
  t: number;
}

export function FleetTiltGrid({ fleet }: { fleet: FleetOptionData[] }) {
  const [active, setActive] = useState(Math.floor(fleet.length / 2));

  // Live drag offset in pixels — applied on top of the snap position during drag
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  // Refs so event handlers always read latest values without stale closure issues
  const activeRef = useRef(active);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchSamples = useRef<TouchSample[]>([]);
  const isScrollLocked = useRef<boolean | null>(null); // null = undecided, true = horizontal locked

  // Sync activeRef with state
  useEffect(() => { activeRef.current = active; }, [active]);

  // ── Keyboard navigation ─────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);

  const snapTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(fleet.length - 1, index));
    setIsSnapping(true);
    setDragOffset(0);
    setIsDragging(false);
    setActive(clamped);
    // Remove snapping flag after transition completes
    const t = setTimeout(() => setIsSnapping(false), 500);
    return () => clearTimeout(t);
  }, [fleet.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); snapTo(activeRef.current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); snapTo(activeRef.current + 1); }
      if (e.key === 'Home')       { e.preventDefault(); snapTo(0); }
      if (e.key === 'End')        { e.preventDefault(); snapTo(fleet.length - 1); }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [snapTo, fleet.length]);

  const prev = () => snapTo(activeRef.current - 1);
  const next = () => snapTo(activeRef.current + 1);

  // ── Mouse drag (desktop) ────────────────────────────────────────────
  const mouseStartX = useRef<number | null>(null);
  const mouseSamples = useRef<TouchSample[]>([]);
  const mouseMoved = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    mouseSamples.current = [{ x: e.clientX, t: performance.now() }];
    mouseMoved.current = false;
    setIsSnapping(false);
  };

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    if (Math.abs(dx) > 6) {
      mouseMoved.current = true;
      setIsDragging(true);
      setDragOffset(dx * 0.85); // slight resistance
    }
    mouseSamples.current.push({ x: e.clientX, t: performance.now() });
    // Trim old samples
    const cutoff = performance.now() - VELOCITY_WINDOW_MS;
    mouseSamples.current = mouseSamples.current.filter((s) => s.t >= cutoff);
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    const velocity = computeVelocity(mouseSamples.current);
    resolveGesture(dx, velocity);
    mouseStartX.current = null;
    mouseSamples.current = [];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onMouseLeave = useCallback(() => {
    if (mouseStartX.current !== null) {
      snapTo(activeRef.current); // rubber-band back if cursor leaves mid-drag
      mouseStartX.current = null;
    }
  }, [snapTo]);

  // ── Touch (mobile) ──────────────────────────────────────────────────
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

    // Decide axis lock on first significant movement
    if (isScrollLocked.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      isScrollLocked.current = Math.abs(dx) >= Math.abs(dy);
    }

    if (!isScrollLocked.current) return; // vertical scroll — let browser handle it

    // Prevent page scroll when swiping horizontally
    e.preventDefault();

    setIsDragging(true);
    // Rubber-band resistance at the ends
    const atStart = activeRef.current === 0 && dx > 0;
    const atEnd = activeRef.current === fleet.length - 1 && dx < 0;
    const resistance = atStart || atEnd ? 0.3 : 0.85;
    setDragOffset(dx * resistance);

    touchSamples.current.push({ x: touch.clientX, t: performance.now() });
    const cutoff = performance.now() - VELOCITY_WINDOW_MS;
    touchSamples.current = touchSamples.current.filter((s) => s.t >= cutoff);
  }, [fleet.length]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX.current;
    const velocity = computeVelocity(touchSamples.current);

    if (isScrollLocked.current) {
      resolveGesture(dx, velocity);
    } else {
      // Was a tap or vertical scroll — reset
      setDragOffset(0);
      setIsDragging(false);
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchSamples.current = [];
    isScrollLocked.current = null;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Gesture resolution ──────────────────────────────────────────────
  function computeVelocity(samples: TouchSample[]): number {
    if (samples.length < 2) return 0;
    const first = samples[0];
    const last = samples[samples.length - 1];
    const dt = last.t - first.t;
    if (dt === 0) return 0;
    return (last.x - first.x) / dt; // px/ms, positive = swipe right
  }

  function resolveGesture(dx: number, velocity: number) {
    const cur = activeRef.current;
    let target = cur;

    const isFlick = Math.abs(velocity) > FLICK_VELOCITY;
    const isFarEnough = Math.abs(dx) > CARD_STRIDE * SNAP_DISTANCE_RATIO;

    if (isFlick || isFarEnough) {
      if (velocity < 0 || dx < 0) target = cur + 1; // swipe left → next
      else target = cur - 1;                          // swipe right → prev
    }

    snapTo(target);
  }

  // ── Track transform ─────────────────────────────────────────────────
  const snapOffset = -(active * CARD_STRIDE);
  const totalOffset = snapOffset + dragOffset;

  // Spring transition: elastic on snap, instant during drag
  const trackTransition = isDragging
    ? 'none'
    : isSnapping
    ? 'transform 0.48s cubic-bezier(0.25, 1.35, 0.40, 1)' // elastic overshoot
    : 'transform 0.48s cubic-bezier(0.25, 1.35, 0.40, 1)';

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Fleet carousel — use arrow keys to navigate"
      className="w-full select-none outline-none"
      style={{ scrollMarginTop: 80 }}
      onFocus={(e) => { (e.currentTarget as HTMLDivElement).dataset.kbFocus = 'true'; }}
      onBlur={(e) => { delete (e.currentTarget as HTMLDivElement).dataset.kbFocus; }}
    >
      {/* ── Track wrapper ─────────────────────────── */}
      <div className="relative overflow-hidden w-full" style={{ paddingBottom: 8 }}>
        {/* Edge fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none z-10"
          style={{ width: 88, background: 'linear-gradient(to right, #0a0a0a, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none z-10"
          style={{ width: 88, background: 'linear-gradient(to left, #0a0a0a, transparent)' }}
        />

        {/* Gesture capture layer */}
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
          {/* Scrolling track — centered on active card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: CARD_GAP,
              paddingTop: 12,
              paddingBottom: 28,
              willChange: 'transform',
              transform: `translateX(calc(50% - ${CARD_WIDTH / 2}px + ${totalOffset}px))`,
              transition: trackTransition,
            }}
          >
            {fleet.map((v, i) => {
              const Icon = ICONS[v.iconName] ?? Car;
              const diff = i - active;
              const isActiveCard = diff === 0;
              const isAdjacent = Math.abs(diff) === 1;

              // Depth layering
              const scale   = isActiveCard ? 1 : isAdjacent ? 0.88 : 0.78;
              const opacity = isActiveCard ? 1 : isAdjacent ? 0.45 : 0.18;
              const blur    = isActiveCard ? 0 : isAdjacent ? 1.5  : 3;
              const cardY   = isActiveCard ? 0 : isAdjacent ? 18   : 32;

              return (
                <div
                  key={v.name}
                  onClick={() => { if (!isDragging && Math.abs(dragOffset) < 6) snapTo(i); }}
                  style={{
                    width: CARD_WIDTH,
                    flexShrink: 0,
                    borderRadius: 24,
                    padding: '36px 32px 32px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: isActiveCard ? 'default' : 'pointer',
                    transform: `scale(${scale}) translateY(${cardY}px)`,
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                    transition: isDragging
                      ? 'opacity 0.15s ease, filter 0.15s ease'
                      : 'transform 0.48s cubic-bezier(0.25,1.35,0.40,1), opacity 0.4s ease, filter 0.4s ease, box-shadow 0.35s ease',
                    background: isActiveCard
                      ? v.accent
                        ? 'linear-gradient(160deg, rgba(247,148,29,0.13) 0%, rgba(17,17,17,0.98) 60%)'
                        : 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(17,17,17,0.98) 60%)'
                      : 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: isActiveCard
                      ? v.accent ? '1px solid rgba(247,148,29,0.30)' : '1px solid rgba(255,255,255,0.11)'
                      : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: isActiveCard
                      ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(247,148,29,0.10)'
                      : 'none',
                    zIndex: isActiveCard ? 2 : 1,
                  }}
                >
                  {/* Top accent line */}
                  {isActiveCard && (
                    <div style={{
                      position: 'absolute', top: 0, left: 28, right: 28, height: 2,
                      background: 'linear-gradient(90deg, transparent, #F7941D, transparent)',
                      borderRadius: 999,
                    }} />
                  )}

                  {/* Tag badge */}
                  {isActiveCard && (
                    <div style={{
                      position: 'absolute', top: 18, right: 18,
                      background: v.accent ? 'linear-gradient(135deg, #F7941D, #D97E10)' : 'rgba(247,148,29,0.10)',
                      border: v.accent ? 'none' : '1px solid rgba(247,148,29,0.28)',
                      color: v.accent ? 'white' : '#F7941D',
                      padding: '4px 11px', borderRadius: 999,
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      {v.accent ? 'Top Pick' : 'Popular'}
                    </div>
                  )}

                  {/* Icon */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: 'rgba(247,148,29,0.10)',
                    border: '1px solid rgba(247,148,29,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 22,
                  }}>
                    <Icon className="w-6 h-6" style={{ color: '#F7941D' }} />
                  </div>

                  <h3
                    className="font-heading font-black text-2xl uppercase tracking-tighter leading-none mb-1"
                    style={{ color: isActiveCard ? 'white' : 'rgba(255,255,255,0.6)' }}
                  >
                    {v.name}
                  </h3>
                  <p className="text-sm font-black mb-1" style={{ color: '#F7941D' }}>{v.models}</p>
                  <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {v.capacity}
                  </p>

                  <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 16 }} />

                  <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span className="font-black" style={{ color: 'rgba(255,255,255,0.85)' }}>Best for: </span>
                    {v.best}
                  </p>

                  {isActiveCard && (
                    <Link
                      href="/fleet"
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group/link w-fit"
                      style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#F7941D')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)')}
                    >
                      View Fleet
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Navigation row ────────────────────────── */}
      <div className="flex items-center justify-center gap-6 mt-2">
        {/* Prev arrow */}
        <NavArrow
          direction="prev"
          disabled={active === 0}
          onClick={prev}
          label="Previous vehicle"
        />

        {/* Dot indicators */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Fleet carousel position">
          {fleet.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              onClick={() => snapTo(i)}
              aria-label={`Go to vehicle ${i + 1}`}
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

        {/* Next arrow */}
        <NavArrow
          direction="next"
          disabled={active === fleet.length - 1}
          onClick={next}
          label="Next vehicle"
        />
      </div>

      {/* Contextual hint */}
      <p
        className="text-center mt-4 text-[10px] font-medium uppercase tracking-widest"
        style={{ color: 'rgba(255,255,255,0.18)' }}
      >
        <span className="hidden sm:inline">Drag · click · or use ← → arrow keys</span>
        <span className="sm:hidden">Swipe to explore vehicles</span>
      </p>
    </div>
  );
}

// ── NavArrow sub-component ───────────────────────────────────────────────────
function NavArrow({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
  label: string;
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
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: hovered && !disabled ? 'rgba(247,148,29,0.14)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hovered && !disabled ? 'rgba(247,148,29,0.38)' : 'rgba(255,255,255,0.10)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
