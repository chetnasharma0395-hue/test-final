import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PopularRoutesDraggable } from './PopularRoutesDraggable';

export function PopularRoutesSection() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'rgba(247,148,29,0.055)', filter: 'blur(110px)' }} />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[280px] rounded-full pointer-events-none"
        style={{ background: 'rgba(247,148,29,0.038)', filter: 'blur(90px)' }} />

      <div className="relative max-w-page mx-auto px-6 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[#F7941D] text-xs font-semibold uppercase tracking-widest mb-4">
              Fixed · Transparent · Guaranteed
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
              Popular Routes <br className="hidden md:block" />
              &amp; Fares
            </h2>
          </div>
          <p className="text-white/45 text-sm font-light max-w-xs leading-relaxed">
            Drag cards to explore. Tap any card to reveal fares.
            All prices include fuel, toll &amp; driver charges.
          </p>
        </div>

        {/* Draggable scattered canvas */}
        <PopularRoutesDraggable />

        {/* View all */}
        <div className="mt-16 text-center">
          <Link
            href="/taxi-rates"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/12 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white/5 hover:border-white/25 transition-all"
          >
            View All Routes &amp; Rates 2026 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
