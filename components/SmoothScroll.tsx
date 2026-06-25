'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis as a side-effect only — no DOM wrapper.
    // ReactLenis root added a physical <div> that caused Google's renderer
    // to capture the page during Lenis initialization (overflow:hidden applied
    // to the wrapper, clipping hero content in the screenshot).
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Render children directly — no wrapper div.
  // SSR output is identical to the raw HTML; Lenis is purely client-side.
  return <>{children}</>;
}
