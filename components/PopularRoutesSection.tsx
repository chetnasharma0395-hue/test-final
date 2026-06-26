import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PopularRoutesOverlay } from './PopularRoutesOverlay';

export function PopularRoutesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#0a0a0a' }}>

      {/* Ambient orange glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(247,148,29,0.06)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(247,148,29,0.04)', filter: 'blur(80px)' }} />

      <div className="relative max-w-page mx-auto px-6 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[#F7941D] text-xs font-semibold uppercase tracking-widest mb-4">
              Fixed, Transparent Pricing
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
              Popular Routes <br className="hidden md:block" />
              &amp; Fares
            </h2>
          </div>
          <p className="text-white/50 text-sm font-light max-w-xs leading-relaxed">
            All fares include fuel, toll &amp; driver charges.
            No surprises at the end of your journey.
          </p>
        </div>

        {/* Overlay canvas — teaser + fullscreen explore */}
        <PopularRoutesOverlay />

        {/* View all */}
        <div className="mt-14 text-center">
          <Link
            href="/taxi-rates"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white/5 hover:border-white/30 transition-all"
          >
            View All Routes &amp; Rates 2026 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
