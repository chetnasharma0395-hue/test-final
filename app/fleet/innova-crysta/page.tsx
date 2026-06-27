import type { Metadata } from 'next';
import { AuroraGlow, AnimatedSection } from '@/components/motion';
import Link from 'next/link';
import { Phone, MessageCircle, Users, Briefcase, Snowflake, CheckCircle2, XCircle, MapPin, Car, Info, ArrowRight } from 'lucide-react';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { BookingCTA, TrustBanner } from '@/components/CTABoxes';
import FleetImage from '@/components/FleetImage';
import { innovaImages } from '@/lib/fleet-images';
import { getVehicle, getOtherVehicles } from '@/lib/vehicleData';
import { getRoute, formatPrice } from '@/lib/priceData';
import { vehicleSchema, itemPageSchema, faqPageSchema, speakableSchema } from '@/lib/schema';

const vehicle = getVehicle('innova-crysta');
const PAGE_URL = 'https://uttarakhand.cab/fleet/innova-crysta';

export const metadata: Metadata = {
  title: 'Innova Crysta Taxi Dehradun | 7-Seater for Char Dham Yatra',
  description: vehicle.metaDescription,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Innova Crysta Taxi Dehradun | 7-Seater for Char Dham Yatra',
    description: vehicle.metaDescription,
    url: PAGE_URL,
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: 'Innova Crysta Taxi - Uttarakhand Cab 24/7' }],
  },
};

const faqs = [
  { question: 'Why is the Innova Crysta recommended for Char Dham Yatra?', answer: 'The Innova Crysta has high ground clearance for steep mountain roads, a powerful engine for long climbs to Kedarnath and Badrinath, and seating for 7 with enough luggage room for a 10-12 day pilgrimage. Our drivers report it as the most reliable vehicle for the full Char Dham circuit, especially in groups of 4 or more.' },
  { question: 'How many people and how much luggage fits in an Innova Crysta?', answer: 'The Innova Crysta comfortably seats 7 passengers across three rows and holds approximately 4 large bags plus 2 cabin bags in the rear, with additional space if the third row is folded for extra luggage.' },
  { question: 'What is the fare for an Innova Crysta from Dehradun to Kedarnath?', answer: `An Innova Crysta from Dehradun to Gaurikund (Kedarnath base) costs ${formatPrice(getRoute('dehradun-kedarnath').suv)} one-way for the 250 km, 8-9 hour journey. Multi-day Char Dham packages with night halts are quoted separately based on itinerary.` },
  { question: 'Is the Innova Crysta better than the Ertiga for mountain routes?', answer: 'For long, steep mountain routes like Kedarnath, Badrinath, and Valley of Flowers, the Innova Crysta is generally preferred over the Ertiga due to its higher ground clearance, larger engine, and extra seat. The Ertiga remains a strong, more economical choice for shorter hill routes like Mussoorie or Nainital. See our full comparison at /compare/innova-crysta-vs-ertiga.' },
  { question: 'Can I book an Innova Crysta for local sightseeing in Dehradun or Mussoorie?', answer: 'Yes. The Innova Crysta is available for 8-hour / 80 km local sightseeing packages in addition to outstation and Char Dham routes. Contact us on WhatsApp for the current local package rate.' },
];

const recommendedRoutes = vehicle.bestRoutes.map((key) => {
  const r = getRoute(key);
  return { name: r.name, href: routeHref(key), fare: formatPrice(r.suv), distance: `${r.distance} km` };
});

function routeHref(key: string): string {
  const map: Record<string, string> = {
    'dehradun-kedarnath': '/kedarnath',
    'dehradun-badrinath': '/badrinath',
    'haridwar-kedarnath': '/haridwar-to-kedarnath',
    'rishikesh-kedarnath': '/rishikesh-to-kedarnath',
    'dehradun-govindghat': '/valley-of-flowers',
    'dehradun-nainital': '/dehradun-to-nainital',
  };
  return map[key] ?? '/taxi-rates';
}

const otherVehicles = getOtherVehicles('innova-crysta', 3);

export default function InnovaCrystaPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script id="vehicle-schema-innova" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema({ name: vehicle.name, description: vehicle.description, url: PAGE_URL, seatingCapacity: vehicle.seating, vehicleType: vehicle.category })) }} />
      <script id="itempage-schema-innova" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemPageSchema({ name: vehicle.name, description: vehicle.metaDescription, url: PAGE_URL })) }} />
      <script id="faq-schema-innova" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }} />
      <script id="speakable-schema-innova" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema(PAGE_URL)) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#1E1F20] opacity-95" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-50" />
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <BreadcrumbNav items={[{ name: 'Fleet', url: '/fleet' }, { name: 'Innova Crysta', url: '/fleet/innova-crysta' }]} dark />

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Recommended for Char Dham Yatra</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Toyota Innova <br />
              <span className="text-[#F7941D]">Crysta Taxi</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              {vehicle.tagline}. 7 seats, dual-zone AC, and the highest ground clearance in our SUV lineup — built for Kedarnath, Badrinath, and every steep Himalayan road in between.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Call to Book
              </a>
              <a href="https://wa.me/919258912169?text=Hi%2C%20I%27d%20like%20to%20book%20an%20Innova%20Crysta." target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Quote
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#F7941D]" /> {vehicle.seatingLabel}</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#F7941D]" /> {vehicle.luggage}</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><Snowflake className="w-4 h-4 text-[#F7941D]" /> {vehicle.acType}</span>
            </div>
          </div>
        </div>
      </section>

      {/* GEO Answer Block */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="What is the best vehicle for Char Dham Yatra and what does an Innova Crysta cost?"
            answer={`The Toyota Innova Crysta is the recommended vehicle for Char Dham Yatra due to its high ground clearance, 7-passenger seating, and ability to handle steep Himalayan roads. An Innova Crysta from Dehradun to Kedarnath (Gaurikund) costs ${formatPrice(getRoute('dehradun-kedarnath').suv)} one-way, with multi-day Char Dham packages starting from ${formatPrice(55000)}.`}
            facts={[
              { label: 'Seating', value: '7 Passengers' },
              { label: 'Luggage', value: '4 Large + 2 Cabin Bags' },
              { label: 'Dehradun to Kedarnath Fare', value: formatPrice(getRoute('dehradun-kedarnath').suv) },
              { label: 'Per-KM Outstation Rate', value: vehicle.pricing.perKmRate ?? 'On request' },
            ]}
            source="Uttarakhand Cab 24/7 · Fleet data updated June 2026 · +91 92589 12169"
          />
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left: Article content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Photo */}
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl aspect-[3/2] bg-gray-100">
                <FleetImage images={innovaImages} fallbackAlt="Toyota Innova Crysta Taxi Uttarakhand Cab 24/7" className="w-full h-full object-cover" />
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Why the Innova Crysta Leads Our Fleet
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  {vehicle.description}
                </p>
                <TrustBanner />
              </div>

              {/* Specs Grid */}
              <div>
                <AnimatedSection>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Seating', value: vehicle.seatingLabel },
                    { label: 'Luggage', value: vehicle.luggage },
                    { label: 'AC', value: vehicle.acType },
                    { label: 'Models', value: vehicle.models.join(', ') },
                  ].map((s, i) => (
                    <div key={i} className="bg-[#1A1A1A] p-5 rounded-2xl shadow-sm text-center border border-white/10">
                      <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mb-1">{s.label}</p>
                      <p className="font-black text-sm text-white leading-tight">{s.value}</p>
                    </div>
                  ))}
                </div>
                </AnimatedSection>
              </div>

              {/* Ideal / Not Ideal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm">
                  <h3 className="font-black text-white text-xl tracking-tight mb-5 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Best For
                  </h3>
                  <ul className="space-y-3">
                    {vehicle.idealFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 font-light text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#F7941D] shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {vehicle.notIdealFor && (
                  <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm">
                    <h3 className="font-black text-white text-xl tracking-tight mb-5 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-gray-300" /> Consider Instead If
                    </h3>
                    <ul className="space-y-3">
                      {vehicle.notIdealFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70 font-light text-sm leading-relaxed">
                          <XCircle className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Recommended Routes */}
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Best Routes for the Innova Crysta
                </h2>
                <div className="space-y-4">
                  {recommendedRoutes.map((r, i) => (
                    <Link key={i} href={r.href} className="bg-[#1A1A1A] border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                      <div>
                        <h3 className="font-black text-xl text-white mb-2 flex items-center gap-3 group-hover:text-[#F7941D] transition-colors">
                          <MapPin className="w-5 h-5 text-[#F7941D]" /> {r.name}
                        </h3>
                        <p className="text-sm font-light text-white/70">{r.distance}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 bg-[#1A1A1A] p-4 rounded-xl">
                        <p className="text-[#F7941D] font-black text-xl">{r.fare}</p>
                        <ArrowRight className="w-4 h-4 text-[#F7941D] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Innova Crysta Pricing
                </h2>
                <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70 font-bold text-sm uppercase tracking-widest">Outstation Per-KM</span>
                    <span className="text-[#F7941D] font-black text-lg">{vehicle.pricing.perKmRate}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/70 font-bold text-sm uppercase tracking-widest">Local Sightseeing (8 Hrs)</span>
                    <span className="text-[#F7941D] font-black text-lg">{vehicle.pricing.localPackageRate}</span>
                  </div>
                  <p className="text-white/70 text-xs font-light pt-2">Fixed route fares for popular destinations are shown above and on our <Link href="/taxi-rates" className="text-[#F7941D] font-bold hover:underline">Taxi Rates</Link> page — all prices are synced to the same source of truth sitewide.</p>
                </div>
              </div>

              <BookingCTA destination="Innova Crysta" fare={formatPrice(getRoute('dehradun-mussoorie').suv)} />

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-12">
                <FAQSection faqs={faqs} title="Innova Crysta FAQs" />
              </div>

            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Book Innova Crysta
                </h4>
                <div className="space-y-4 text-sm font-medium mb-10">
                  {recommendedRoutes.slice(0, 4).map((r, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-white/80 font-light">{r.name}</span>
                      <span className="text-[#F7941D] font-black text-lg tracking-tight">{r.fare}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 relative z-10">
                  <a href="tel:+919258912169" className="w-full px-6 py-4 bg-[#F7941D] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_20px_-5px_#F7941D]">
                    <Phone className="w-4 h-4 shrink-0" /> Call: +91 92589 12169
                  </a>
                  <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="w-full px-6 py-4 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3 hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)]">
                    <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Us
                  </a>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mt-6 flex items-start gap-2">
                  <Info className="w-4 h-4 text-white/50 shrink-0" />
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">Fixed pricing • Verified mountain drivers</p>
                </div>
              </div>

              {/* Compare CTA */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-4">Not Sure Which Vehicle?</h4>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6">Compare the Innova Crysta against the Ertiga side-by-side, or read our full Char Dham vehicle guide.</p>
                <div className="space-y-3">
                  <Link href="/compare/innova-crysta-vs-ertiga" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">Innova Crysta vs Ertiga</span>
                    <ArrowRight className="w-4 h-4 text-[#F7941D]" />
                  </Link>
                  <Link href="/best-vehicle-for-char-dham-yatra" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">Best Vehicle for Char Dham</span>
                    <ArrowRight className="w-4 h-4 text-[#F7941D]" />
                  </Link>
                </div>
              </div>

              {/* Other vehicles */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Other Vehicles</h4>
                <ul className="space-y-4">
                  {otherVehicles.map((v) => (
                    <li key={v.slug}>
                      <Link href={`/fleet/${v.slug}`} className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                        <div>
                          <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors block">{v.shortName}</span>
                          <span className="text-white/70 text-[10px] uppercase tracking-widest font-bold">{v.seatingLabel}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#F7941D]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
