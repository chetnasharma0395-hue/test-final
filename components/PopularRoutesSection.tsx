import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, MapPin, Car } from 'lucide-react';
import { PRICING_DATA, formatPrice } from '@/lib/priceData';
import { Stagger, StaggerItem } from './motion';

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

        {/* Route Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <StaggerItem key={`${route.from}-${route.to}`}>
            <div
              className="group bg-[#1A1A1A] rounded-[2rem] overflow-hidden border border-white/8 hover:border-[#F7941D]/25 hover:shadow-[0_20px_50px_rgba(247,148,29,0.08)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 h-full"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={route.image}
                  alt={`${route.from} to ${route.to} taxi`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={82}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className={`absolute top-4 left-4 ${route.tagColor} text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full`}>
                  {route.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Route */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-black text-white text-base">{route.from}</span>
                  <ArrowRight className="w-4 h-4 text-[#F7941D] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="font-black text-white text-base">{route.to}</span>
                </div>

                {/* Meta chips */}
                <div className="flex gap-3 mb-6">
                  <span className="flex items-center gap-1.5 bg-[#1A1A1A] border border-white/8 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                    <MapPin className="w-3 h-3" /> {route.distance}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#1A1A1A] border border-white/8 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                    <Clock className="w-3 h-3" /> {route.duration}
                  </span>
                </div>

                {/* Fares */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#1A1A1A] rounded-xl p-3 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-1">Sedan</p>
                    <p className="text-xl font-black text-white">{route.sedanFare}</p>
                  </div>
                  <div className="bg-[#1A1209] rounded-xl p-3 text-center border border-[#F7941D]/20">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#F7941D] mb-1">SUV</p>
                    <p className="text-xl font-black text-[#F7941D]">{route.suvFare}</p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/919258912169?text=${encodeURIComponent(route.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-colors"
                >
                  <Car className="w-3.5 h-3.5" /> Book This Route
                </a>
              </div>
            </div>
            </StaggerItem>
          ))}
        </Stagger>

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
