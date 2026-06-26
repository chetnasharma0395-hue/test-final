import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRICING_DATA, formatPrice } from '@/lib/priceData';
import { PopularRoutesScattered } from './PopularRoutesScattered';

interface FeaturedRoute {
  priceKey: keyof typeof PRICING_DATA;
  toLabelOverride?: string;
  image: string;
  link: string;
  tag: string;
  tagColor: string;
}

const FEATURED: FeaturedRoute[] = [
  {
    priceKey: 'dehradun-mussoorie',
    image: '/assets/images/dest-mussoorie.jpg',
    link: '/services/dehradun-to-mussoorie-taxi',
    tag: 'Most Popular',
    tagColor: 'bg-[#F7941D]',
  },
  {
    priceKey: 'dehradun-rishikesh',
    image: '/assets/images/dest-rishikesh.jpg',
    link: '/services/rishikesh-taxi-service',
    tag: 'Adventure Hub',
    tagColor: 'bg-[#121212]',
  },
  {
    priceKey: 'jolly-grant-mussoorie',
    image: '/assets/images/dest-rishikesh-airport.jpg',
    link: '/jolly-grant-airport-to-mussoorie',
    tag: 'Airport Pick-up',
    tagColor: 'bg-[#2A2A2A]',
  },
  {
    priceKey: 'dehradun-kedarnath',
    toLabelOverride: 'Kedarnath',
    image: '/assets/images/dest-char-dham.jpg',
    link: '/taxi/dehradun-to-kedarnath',
    tag: 'Char Dham Yatra',
    tagColor: 'bg-[#F7941D]',
  },
  {
    priceKey: 'dehradun-nainital',
    image: '/assets/images/dest-corbett.jpg',
    link: '/services/nainital-taxi-service',
    tag: 'Lakes & Wildlife',
    tagColor: 'bg-[#121212]',
  },
  {
    priceKey: 'haridwar-rishikesh',
    image: '/assets/images/dest-haridwar-rishikesh.jpg',
    link: '/services/haridwar-to-rishikesh-taxi',
    tag: 'Temple Circuit',
    tagColor: 'bg-[#2A2A2A]',
  },
];

export function PopularRoutesSection() {
  const routes = FEATURED.map((f) => {
    const r = PRICING_DATA[f.priceKey];
    const to = f.toLabelOverride ?? r.to;
    return {
      from: r.from,
      to,
      distance: `${r.distance} km`,
      duration: r.duration.replace('hours', 'hrs').replace('minutes', 'mins'),
      sedanFare: formatPrice(r.sedan),
      suvFare: formatPrice(r.suv),
      image: f.image,
      link: f.link,
      tag: f.tag,
      tagColor: f.tagColor,
      waText: `Hi, I want to book a taxi from ${r.from} to ${to}.`,
    };
  });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#0a0a0a' }}>

      {/* Ambient orange glow — top left */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(247,148,29,0.06)', filter: 'blur(100px)' }} />
      {/* Ambient glow — bottom right */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(247,148,29,0.04)', filter: 'blur(80px)' }} />

      <div className="relative max-w-page mx-auto px-6 sm:px-8 lg:px-10">

        {/* ── Heading ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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

        {/* ── Scattered route cards ────────────────────────────── */}
        <PopularRoutesScattered routes={routes} />

        {/* ── View all ─────────────────────────────────────────── */}
        <div className="mt-16 md:mt-24 text-center">
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
