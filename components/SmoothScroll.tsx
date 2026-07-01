'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect users who prefer reduced motion — skip smooth scroll entirely.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let lenis: Lenis | null = null;
    let rafId = 0;

    // Defer Lenis init until the browser is idle. On a fresh load the main
    // thread is busy hydrating ~9 client components; starting Lenis' rAF loop
    // immediately competes with that work and makes the first moments feel
    // janky / "stuck". Waiting for idle lets first interaction stay snappy.
    const start = () => {
      lenis = new Lenis({
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        // Mobile/touch scrolling was previously raw native scroll — Lenis'
        // smoothing only ever applied to desktop mouse wheel. syncTouch turns
        // touch input into the same lerp/momentum system as wheel scroll,
        // which is what actually gives the "app-style" glide feel on mobile.
        // (Lenis 1.x renamed the old `smoothTouch` option to `syncTouch`.)
        syncTouch: true,
        // Lower = smoother/slower catch-up as your finger drags (default 0.1).
        syncTouchLerp: 0.075,
        // Lower = each swipe moves less distance, i.e. a slower, more
        // deliberate scroll feel (default 2).
        touchMultiplier: 1.2,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const idle =
      typeof w.requestIdleCallback === 'function'
        ? w.requestIdleCallback(start, { timeout: 1500 })
        : window.setTimeout(start, 600);

    return () => {
      if (typeof w.requestIdleCallback === 'function') {
        (w as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback?.(idle as number);
      } else {
        clearTimeout(idle as number);
      }
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  // Render children directly — no wrapper div.
  // SSR output is identical to the raw HTML; Lenis is purely client-side.
  return <>{children}</>;
}
