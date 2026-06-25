import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRICING_DATA, formatPrice } from '@/lib/priceData';
import { PopularRoutesCarousel } from './PopularRoutesCarousel';

/**
 * PopularRoutesSection
 * ────────────────────
 * Fare, distance, and duration are pulled from PRICING_DATA (the single source
 * of truth in lib/priceData.ts) via the `priceKey` reference below. Updating a
 * fare in priceData.ts automatically updates this homepage section — no manual
 * edits here. Only presentational metadata (image, marketing tag, landing link,
 * WhatsApp text) lives locally.
 *
 * To feature a different route: change the `priceKey` to any key in PRICING_DATA
 * and supply its display image + tag.
 */

interface FeaturedRoute {
  priceKey: keyof typeof PRICING_DATA;
  /** Optional label override (e.g. group a destination cluster) */
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
  // Resolve each featured card from the canonical pricing table at render time.
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
    <section className="py-24 md:py-32 bg-[#1A1A1A]">
      <div className="max-w-page mx-auto px-6 sm:px-8 lg:px-10">
        {/* Heading */}
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
          <div className="shrink-0">
            <p className="text-white/70 text-sm font-light max-w-xs leading-relaxed">
              All fares are fixed and inclusive of fuel, toll, and driver charges.
              No surprises at the end of the journey.
            </p>
          </div>
        </div>

        {/* Route Carousel */}
        <PopularRoutesCarousel routes={routes} />

        {/* View All */}
        <div className="mt-12 text-center">
          <Link
            href="/taxi-rates"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#333333] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#2A2A2A] hover:text-white transition-all"
          >
            View All Routes &amp; Rates 2026 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
