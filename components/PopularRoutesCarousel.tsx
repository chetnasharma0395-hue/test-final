'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowRight, Clock, MapPin, Car } from 'lucide-react';

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

const CARD_WIDTH = 380;
const CARD_GAP = 24;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;

const VELOCITY_WINDOW_MS = 80;
const FLICK_VELOCITY = 0.22;
const SNAP_DISTANCE_RATIO = 0.35;

interface TouchSample {
  x: number;
  t: number;
}

export function PopularRoutesCarousel({ routes }: { routes: RouteCardData[] }) {
  const [active, setActive] = useState(Math.floor(routes.length / 2));

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  const activeRef = useRef(active);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchSamples = useRef<TouchSample[]>([]);
  const isScrollLocked = useRef<boolean | null>(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  const containerRef = useRef<HTMLDivElement>(null);

  const snapTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(routes.length - 1, index));
    setIsSnapping(true);
    setDragOffset(0);
    setIsDragging(false);
    setActive(clamped);
    const t = setTimeout(() => setIsSnapping(false), 500);
    return () => clearTimeout(t);
  }, [routes.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); snapTo(activeRef.current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); snapTo(activeRef.current + 1); }
      if (e.key === 'Home')       { e.preventDefault(); snapTo(0); }
      if (e.key === 'End')        { e.preventDefault(); snapTo(routes.length - 1); }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [snapTo, routes.length]);

  const prev = () => snapTo(activeRef.current - 1);
  const next = () => snapTo(activeRef.current + 1);

  // ── Mouse drag ──
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
      setDragOffset(dx * 0.85);
    }
    mouseSamples.current.push({ x: e.clientX, t: performance.now() });
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
      snapTo(activeRef.current);
      mouseStartX.current = null;
    }
  }, [snapTo]);

  // ── Touch ──
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
    const atEnd = activeRef.current === routes.length - 1 && dx < 0;
    const resistance = atStart || atEnd ? 0.3 : 0.85;
    setDragOffset(dx * resistance);

    touchSamples.current.push({ x: touch.clientX, t: performance.now() });
    const cutoff = performance.now() - VELOCITY_WINDOW_MS;
    touchSamples.current = touchSamples.current.filter((s) => s.t >= cutoff);
  }, [routes.length]);

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function computeVelocity(samples: TouchSample[]): number {
    if (samples.length < 2) return 0;
    const first = samples[0];
    const last = samples[samples.length - 1];
    const dt = last.t - first.t;
    if (dt === 0) return 0;
    return (last.x - first.x) / dt;
  }

  function resolveGesture(dx: number, velocity: number) {
    const cur = activeRef.current;
    let target = cur;
    const isFlick = Math.abs(velocity) > FLICK_VELOCITY;
    const isFarEnough = Math.abs(dx) > CARD_STRIDE * SNAP_DISTANCE_RATIO;
    if (isFlick || isFarEnough) {
      if (velocity < 0 || dx < 0) target = cur + 1;
      else target = cur - 1;
    }
    snapTo(target);
  }

  const snapOffset = -(active * CARD_STRIDE);
  const totalOffset = snapOffset + dragOffset;

  const trackTransition = isDragging
    ? 'none'
    : isSnapping
    ? 'transform 0.48s cubic-bezier(0.25, 1.35, 0.40, 1)'
    : 'transform 0.48s cubic-bezier(0.25, 1.35, 0.40, 1)';

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Popular routes carousel — use arrow keys to navigate"
      className="w-full select-none outline-none"
    >
      <div className="relative overflow-hidden w-full" style={{ paddingBottom: 8 }}>
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 pointer-events-none z-10"
          style={{ width: 88, background: 'linear-gradient(to right, #1A1A1A, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none z-10"
          style={{ width: 88, background: 'linear-gradient(to left, #1A1A1A, transparent)' }} />

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
              gap: CARD_GAP,
              paddingTop: 12,
              paddingBottom: 28,
              willChange: 'transform',
              transform: `translateX(calc(50% - ${CARD_WIDTH / 2}px + ${totalOffset}px))`,
              transition: trackTransition,
            }}
          >
            {routes.map((route, i) => {
              const diff = i - active;
              const isActiveCard = diff === 0;
              const isAdjacent = Math.abs(diff) === 1;

              const scale   = isActiveCard ? 1 : isAdjacent ? 0.90 : 0.80;
              const opacity = isActiveCard ? 1 : isAdjacent ? 0.50 : 0.20;
              const blur    = isActiveCard ? 0 : isAdjacent ? 1.5  : 3;
              const cardY   = isActiveCard ? 0 : isAdjacent ? 14   : 28;

              return (
                <div
                  key={`${route.from}-${route.to}`}
                  onClick={() => { if (!isDragging && Math.abs(dragOffset) < 6) snapTo(i); }}
                  className="group bg-[#1A1A1A] rounded-[2rem] overflow-hidden border border-white/8"
                  style={{
                    width: CARD_WIDTH,
                    flexShrink: 0,
                    cursor: isActiveCard ? 'default' : 'pointer',
                    transform: `scale(${scale}) translateY(${cardY}px)`,
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                    transition: isDragging
                      ? 'opacity 0.15s ease, filter 0.15s ease'
                      : 'transform 0.48s cubic-bezier(0.25,1.35,0.40,1), opacity 0.4s ease, filter 0.4s ease, box-shadow 0.35s ease, border-color 0.3s ease',
                    boxShadow: isActiveCard
                      ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(247,148,29,0.10)'
                      : 'none',
                    borderColor: isActiveCard ? 'rgba(247,148,29,0.25)' : 'rgba(255,255,255,0.08)',
                    zIndex: isActiveCard ? 2 : 1,
                  }}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={route.image}
                      alt={`${route.from} to ${route.to} taxi`}
                      fill
                      sizes="380px"
                      quality={82}
                      className="object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className={`absolute top-4 left-4 ${route.tagColor} text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full`}>
                      {route.tag}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="font-black text-white text-base">{route.from}</span>
                      <ArrowRight className="w-4 h-4 text-[#F7941D] shrink-0" />
                      <span className="font-black text-white text-base">{route.to}</span>
                    </div>

                    <div className="flex gap-3 mb-6">
                      <span className="flex items-center gap-1.5 bg-[#1A1A1A] border border-white/8 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                        <MapPin className="w-3 h-3" /> {route.distance}
                      </span>
                      <span className="flex items-center gap-1.5 bg-[#1A1A1A] border border-white/8 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                        <Clock className="w-3 h-3" /> {route.duration}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-[#1A1A1A] rounded-xl p-3 text-center border border-white/8">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-1">Sedan</p>
                        <p className="text-xl font-black text-white">{route.sedanFare}</p>
                      </div>
                      <div className="bg-[#1A1209] rounded-xl p-3 text-center border border-[#F7941D]/20">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#F7941D] mb-1">SUV</p>
                        <p className="text-xl font-black text-[#F7941D]">{route.suvFare}</p>
                      </div>
                    </div>

                    {isActiveCard && (
                      <a
                        href={`https://wa.me/919258912169?text=${encodeURIComponent(route.waText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-colors"
                      >
                        <Car className="w-3.5 h-3.5" /> Book This Route
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation row */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <NavArrow direction="prev" disabled={active === 0} onClick={prev} label="Previous route" />

        <div className="flex items-center gap-2" role="tablist" aria-label="Routes carousel position">
          {routes.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              onClick={() => snapTo(i)}
              aria-label={`Go to route ${i + 1}`}
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

        <NavArrow direction="next" disabled={active === routes.length - 1} onClick={next} label="Next route" />
      </div>

      <p className="text-center mt-4 text-[10px] font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.18)' }}>
        <span className="hidden sm:inline">Drag · click · or use ← → arrow keys</span>
        <span className="sm:hidden">Swipe to explore routes</span>
      </p>
    </div>
  );
}

function NavArrow({
  direction, disabled, onClick, label,
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
