import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, MessageCircle, MapPin, ArrowRight, CalendarClock, Car, CheckCircle2 } from 'lucide-react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { QuickTravelSummary } from '@/components/QuickTravelSummary';
import { FAQSection } from '@/components/FAQ';
import { BookingCTA, StrategicCTA } from '@/components/CTABoxes';
import {
  buildableRoutes,
  getRouteBySlug,
  originSiblings,
  destinationSiblings,
} from '@/lib/route-helpers';
import { getDestinationHub } from '@/data/hub-config';
import { getBlogCrossLink } from '@/lib/blogCrossLinks';
import type { ProgrammaticRoute } from '@/data/programmatic-routes';
import { getVehicle } from '@/lib/vehicleData';
import { formatPrice } from '@/lib/priceData';
import {
  taxiServiceSchema,
  breadcrumbSchema,
  faqPageSchema,
  speakableSchema,
} from '@/lib/schema';

interface RouteProps {
  params: Promise<{ slug: string }>;
}

// 1. generateStaticParams: only validated, non-excluded, de-duplicated routes.
export function generateStaticParams() {
  return buildableRoutes().map((r) => ({ slug: r.slug }));
}

const BASE = 'https://uttarakhand.cab';

function fareDisplay(v: number | null): string {
  return v !== null ? formatPrice(v) : 'Quote on WhatsApp';
}

function fareRange(r: ProgrammaticRoute): string {
  const lows = [r.fare.sedan, r.fare.suv, r.fare.tempo].filter(
    (x): x is number => x !== null,
  );
  if (lows.length === 0) return 'Quote on request';
  const min = Math.min(...lows);
  const max = Math.max(...lows);
  return min === max ? formatPrice(min) : `${formatPrice(min)} \u2013 ${formatPrice(max)}`;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return { title: 'Route Not Found' };

  const url = `${BASE}/taxi/${slug}`;
  const title = `${route.origin} to ${route.destination} Taxi | Fixed Fare 2026`;
  const description = `Book a fixed-fare taxi from ${route.origin} to ${route.destination} (${route.distanceKm} km, ${route.travelTime}). Fares ${fareRange(route)}. Doorstep pickup, verified hill drivers, 24/7.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${route.origin} to ${route.destination} Taxi | Fixed Fare`,
      description,
      url,
      siteName: 'Uttarakhand Cab 24/7',
      type: 'website',
      images: [
        {
          url: `${BASE}/images/og-main.jpg`,
          width: 1200,
          height: 630,
          alt: 'Uttarakhand Cab 24/7 - Premium Taxi Service',
        },
      ],
    },
  };
}

export default async function TaxiRoutePage({ params }: RouteProps) {
  const { slug } = await params;
  // getRouteBySlug only returns routes that passed isValidRoute() => thin
  // content can never render; invalid/excluded slugs 404.
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const url = `${BASE}/taxi/${slug}`;
  const vehicle = getVehicle(route.recommendedVehicle);
  const destHub = getDestinationHub(route.destinationKey);
  const origins = originSiblings(route);
  const dests = destinationSiblings(route);
  const blogCrossLink = getBlogCrossLink(route.slug);

  // ---- Schema (existing helpers only) ----
  const taxiLd = taxiServiceSchema({
    name: `${route.origin} to ${route.destination} Taxi`,
    description: `Fixed-fare taxi from ${route.origin} to ${route.destination}. ${route.distanceKm} km, ${route.travelTime}. Verified hill drivers, no hidden charges.`,
    url,
    price: route.fare.sedan ?? route.fare.suv ?? undefined,
    from: route.origin,
    to: route.destination,
  });
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Taxi Routes', url: '/taxi' },
    { name: `From ${route.origin}`, url: `/taxi/from/${route.originKey}` },
    { name: `${route.origin} to ${route.destination}`, url: `/taxi/${slug}` },
  ]);
  const faqLd = faqPageSchema(route.faqs);
  const speakableLd = speakableSchema(url);

  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-28 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F7941D] opacity-[0.06] blur-[120px] pointer-events-none" />
        <div className="max-w-page mx-auto relative z-10">
          <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link href="/taxi" className="hover:text-[#F7941D] transition-colors">Taxi Routes</Link>
            <span className="opacity-30">/</span>
            <Link href={`/taxi/from/${route.originKey}`} className="hover:text-[#F7941D] transition-colors">{route.origin}</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#F7941D]">{route.destination}</span>
          </nav>
          <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Fixed-Fare Outstation Taxi</p>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white uppercase leading-[0.95] tracking-tighter mb-6">
            {route.origin} to <br /><span className="text-[#F7941D]">{route.destination} Taxi</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
            {route.distanceKm} km \u00b7 {route.travelTime} \u00b7 fares {fareRange(route)}. Doorstep pickup in {route.origin}, verified hill-route drivers, and a fixed all-inclusive fare with no hidden charges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center justify-center gap-3">
              <Phone className="w-4 h-4" /> +91 92589 12169
            </a>
            <a href={`https://wa.me/919258912169?text=${encodeURIComponent(`Hi, I want to book a taxi from ${route.origin} to ${route.destination}.`)}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3">
              <MessageCircle className="w-4 h-4" /> WhatsApp Quote
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-page mx-auto">

          {/* 2. GEO ANSWER BOX (mandatory; machine-readable facts) */}
          <GEOAnswerBox
            question={`How much is a taxi from ${route.origin} to ${route.destination}?`}
            answer={`A taxi from ${route.origin} to ${route.destination} costs ${fareRange(route)} with Uttarakhand Cab 24/7. The route covers ${route.distanceKm} km in about ${route.travelTime}. The recommended vehicle is the ${vehicle.shortName}, and the best time to travel is ${route.bestTimeToTravel}. Fares are fixed and all-inclusive with no hidden charges.`}
            facts={[
              { label: 'Distance', value: `${route.distanceKm} km` },
              { label: 'Travel time', value: route.travelTime },
              { label: 'Sedan fare', value: fareDisplay(route.fare.sedan) },
              { label: 'SUV fare', value: fareDisplay(route.fare.suv) },
              { label: 'Tempo Traveller fare', value: fareDisplay(route.fare.tempo) },
              { label: 'Recommended vehicle', value: vehicle.shortName },
              { label: 'Best time to travel', value: route.bestTimeToTravel },
            ]}
            source="Uttarakhand Cab 24/7 \u2014 Updated 2026"
          />

          {/* 3. QUICK TRAVEL SUMMARY */}
          <QuickTravelSummary
            destination={route.destination}
            from={route.origin}
            distance={`${route.distanceKm} km`}
            travelTime={route.travelTime}
            taxiFareRange={fareRange(route)}
            bestTime={route.bestTimeToTravel}
            idealMode={`${vehicle.shortName} (${vehicle.seatingLabel})`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">

              {/* 4. ROUTE HIGHLIGHTS */}
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">Route Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {route.routeHighlights.map((h, i) => (
                    <div key={i} className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 shadow-sm flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#F7941D] shrink-0 mt-0.5" />
                      <p className="text-white/70 font-light text-sm leading-relaxed">{h}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. PICKUP INFORMATION */}
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">Pickup Information</h2>
                <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F7941D]/10 flex items-center justify-center shrink-0">
                    <Car className="w-6 h-6 text-[#F7941D]" />
                  </div>
                  <p className="text-white/70 font-light leading-relaxed">{route.pickupInfo}</p>
                </div>
              </div>

              {/* 6. FARE TABLE */}
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">Fare Breakdown: {route.origin} to {route.destination}</h2>
                <div className="overflow-hidden rounded-[2.5rem] border border-white/10 shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse bg-[#1A1A1A] whitespace-nowrap">
                      <thead className="bg-[#1A1A1A] text-white uppercase tracking-[0.15em] text-[10px] font-black">
                        <tr>
                          <th className="p-6 border-r border-white/5">Vehicle Class</th>
                          <th className="p-6 border-r border-white/5">One-Way Fare</th>
                          <th className="p-6">Best For</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-b border-white/10 bg-[#1A1A1A]/50">
                          <td className="p-6 font-black border-r border-white/10">Sedan (Dzire / Amaze)</td>
                          <td className="p-6 font-black text-[#F7941D] text-lg border-r border-white/10">{fareDisplay(route.fare.sedan)}</td>
                          <td className="p-6 font-light text-white/70">Couples & small families (2\u20133 pax)</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="p-6 font-black border-r border-white/10">SUV (Ertiga / Innova)</td>
                          <td className="p-6 font-black text-[#F7941D] text-lg border-r border-white/10">{fareDisplay(route.fare.suv)}</td>
                          <td className="p-6 font-light text-white/70">Families & hill comfort (5\u20137 pax)</td>
                        </tr>
                        <tr className="bg-[#1A1A1A]/50">
                          <td className="p-6 font-black border-r border-white/10">Tempo Traveller</td>
                          <td className="p-6 font-black text-[#F7941D] text-lg border-r border-white/10">{fareDisplay(route.fare.tempo)}</td>
                          <td className="p-6 font-light text-white/70">Groups & large families (10+ pax)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 7. SEASONAL BANNER (conditional) */}
              {route.seasonal && (
                <div className="bg-[#121212] text-white p-8 rounded-[2rem] border-l-[10px] border-[#F7941D] flex items-start gap-4">
                  <CalendarClock className="w-7 h-7 text-[#F7941D] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-sm text-[#F7941D] mb-2">Seasonal Route</h3>
                    <p className="text-white/80 font-light leading-relaxed">
                      {route.destination} is a seasonal destination, typically open <span className="font-bold text-white">{route.openWindow}</span>. This route stays available year-round for advance planning \u2014 pre-book now to lock in your vehicle and fare for the season.
                    </p>
                  </div>
                </div>
              )}

              {/* 8. FAQ SECTION */}
              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm">
                <FAQSection faqs={route.faqs} title={`${route.origin} to ${route.destination} FAQs`} />
              </div>

              <BookingCTA destination={`${route.origin} to ${route.destination}`} fare={fareRange(route)} />
            </div>

            {/* SIDEBAR: rule-based internal links + fleet recommendation */}
            <aside className="lg:col-span-1 space-y-8">

              {/* Fleet recommendation (derived from recommendedVehicle) */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-3">Recommended Vehicle</h3>
                <p className="text-white/70 font-light text-sm mb-5">{vehicle.tagline}</p>
                <Link href={`/fleet/${vehicle.slug}`} className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                  <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View {vehicle.shortName}</span>
                  <ArrowRight className="w-4 h-4 text-[#F7941D]" />
                </Link>
              </div>

              {/* 9. RELATED ROUTES \u2014 same origin */}
              {origins.length > 0 && (
                <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                  <h3 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">More Routes from {route.origin}</h3>
                  <ul className="space-y-3">
                    {origins.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/taxi/${r.slug}`} className="flex items-center gap-2 text-sm text-white hover:text-[#F7941D] font-semibold transition-colors">
                          <span className="text-[#F7941D]">\u203a</span> {r.origin} to {r.destination}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/taxi/from/${route.originKey}`} className="inline-flex items-center gap-2 mt-5 text-[#F7941D] font-black uppercase text-[10px] tracking-widest">
                    All {route.origin} routes <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* 10. DESTINATION LINKS \u2014 same destination + pillar */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Other Ways to Reach {route.destination}</h3>
                {dests.length > 0 ? (
                  <ul className="space-y-3 mb-5">
                    {dests.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/taxi/${r.slug}`} className="flex items-center gap-2 text-sm text-white hover:text-[#F7941D] font-semibold transition-colors">
                          <span className="text-[#F7941D]">\u203a</span> {r.origin} to {r.destination}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/70 font-light text-sm mb-5">Compare every route to {route.destination} on the destination hub.</p>
                )}
                <div className="space-y-2">
                  <Link href={`/taxi/to/${route.destinationKey}`} className="flex items-center gap-2 text-sm font-black text-white hover:text-[#F7941D] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> All routes to {route.destination}
                  </Link>
                  <Link href={destHub?.editorialParent ?? route.editorialParent} className="flex items-center gap-2 text-sm font-black text-white hover:text-[#F7941D] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> {route.destination} travel guide
                  </Link>
                  {blogCrossLink && (
                    <Link href={blogCrossLink.href} className="flex items-center gap-2 text-sm font-black text-white hover:text-[#F7941D] transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> {blogCrossLink.title}
                    </Link>
                  )}
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-16">
            <StrategicCTA heading={`Book Your ${route.destination} Taxi`} subtext={`Fixed ${fareRange(route)} fare from ${route.origin}. No hidden charges, verified hill drivers, available 24/7.`} />
          </div>
        </div>
      </section>
    </div>
  );
}
