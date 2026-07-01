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
        // NOTE: syncTouch (touch-driven smooth scroll) was tried here to give
        // mobile the same "app-style" glide as desktop wheel scroll, but it
        // caused two real regressions: (1) fighting custom touch-drag
        // components — like carousels — for control of the same gesture, and
        // (2) breaking native "pull to refresh", which happens at the very
        // top of the page and can't be selectively excluded the way the
        // carousel conflict was (via data-lenis-prevent). Reverted — mobile
        // touch scroll is intentionally left 100% native/unmodified here.
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
