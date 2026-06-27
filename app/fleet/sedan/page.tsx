import type { Metadata } from 'next';
import { AuroraGlow, AnimatedSection } from '@/components/motion';
import Link from 'next/link';
import { Phone, MessageCircle, Users, Briefcase, Snowflake, CheckCircle2, XCircle, MapPin, Car, Info, ArrowRight } from 'lucide-react';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { BookingCTA, TrustBanner } from '@/components/CTABoxes';
import FleetImage from '@/components/FleetImage';
import { sedanImages } from '@/lib/fleet-images';
import { getVehicle, getOtherVehicles } from '@/lib/vehicleData';
import { getRoute, formatPrice } from '@/lib/priceData';
import { vehicleSchema, itemPageSchema, faqPageSchema, speakableSchema } from '@/lib/schema';

const vehicle = getVehicle('sedan');
const PAGE_URL = 'https://uttarakhand.cab/fleet/sedan';

export const metadata: Metadata = {
  title: 'Sedan Taxi Dehradun | Swift Dzire & Honda Amaze Cab Booking',
  description: vehicle.metaDescription,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Sedan Taxi Dehradun | Swift Dzire & Honda Amaze Cab Booking',
    description: vehicle.metaDescription,
    url: PAGE_URL,
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: 'Sedan Taxi - Uttarakhand Cab 24/7' }],
  },
};

const faqs = [
  { question: 'Who should book the Sedan taxi?', answer: 'The Sedan is best for solo travelers, couples, and small families of up to 4 people who want the most economical fixed-fare option for airport transfers, local sightseeing, and short outstation trips around Dehradun, Mussoorie, Rishikesh, and Haridwar.' },
  { question: 'Who should not book the Sedan?', answer: 'Groups larger than 4, travelers with heavy luggage, and anyone traveling the steep, high-altitude Char Dham circuit to Kedarnath or Badrinath should choose an Ertiga or Innova Crysta instead, since the Sedan has lower ground clearance and less cabin room.' },
  { question: 'What are the best routes for the Sedan?', answer: 'The Sedan is ideal for Dehradun to Mussoorie, Dehradun to Rishikesh, Dehradun to Haridwar, Haridwar to Rishikesh, and Jolly Grant Airport transfers — all routes with good road quality and moderate distances where its lower fixed fare offers the best value.' },
  { question: 'What Uttarakhand destinations is the Sedan best suited for?', answer: 'The Sedan works well for Dehradun, Mussoorie, Rishikesh, and Haridwar. For Char Dham pilgrimage routes to Kedarnath, Badrinath, or Valley of Flowers, an Innova Crysta or Ertiga is recommended due to steeper roads and longer travel times.' },
  { question: 'Is the Sedan good for family trips?', answer: 'The Sedan comfortably fits a small family of up to 4 with light luggage. For families of 5 or more, or those carrying significant luggage, the Ertiga offers more space at a modest price increase.' },
  { question: 'Is the Sedan comfortable for senior citizens?', answer: 'The Sedan is comfortable for senior citizens on shorter, plain-road routes like Dehradun city travel or airport transfers. For longer hill routes, the higher seating position of an Ertiga or Innova Crysta is generally easier on the joints during entry and exit.' },
  { question: 'How much luggage fits in a Sedan?', answer: 'A Sedan typically holds 2 medium bags plus 1 cabin bag in the boot. For more luggage, an Ertiga or Innova Crysta is recommended.' },
  { question: 'Is the Sedan suitable for mountain roads?', answer: 'The Sedan handles moderate hill roads like Mussoorie and Dhanaulti well. For longer, steeper Himalayan routes such as Kedarnath, Badrinath, or Valley of Flowers, an SUV like the Innova Crysta is the recommended choice for better ground clearance and stability.' },
  { question: 'What is the fare for a Sedan from Dehradun to Mussoorie?', answer: `A Sedan from Dehradun to Mussoorie costs ${formatPrice(getRoute('dehradun-mussoorie').sedan)} one-way for the 35 km, 1.5 hour journey via Rajpur Road.` },
];

const recommendedRoutes = vehicle.bestRoutes.map((key) => {
  const r = getRoute(key);
  return { name: r.name, href: routeHref(key), fare: formatPrice(r.sedan), distance: `${r.distance} km` };
});

function routeHref(key: string): string {
  const map: Record<string, string> = {
    'dehradun-mussoorie': '/mussoorie',
    'dehradun-rishikesh': '/rishikesh',
    'dehradun-haridwar': '/haridwar',
    'haridwar-rishikesh': '/rishikesh',
    'jolly-grant-dehradun': '/dehradun-airport-taxi',
  };
  return map[key] ?? '/taxi-rates';
}

const otherVehicles = getOtherVehicles('sedan', 3);

export default function SedanPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script id="vehicle-schema-sedan" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema({ name: vehicle.name, description: vehicle.description, url: PAGE_URL, seatingCapacity: vehicle.seating, vehicleType: vehicle.category })) }} />
      <script id="itempage-schema-sedan" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemPageSchema({ name: vehicle.name, description: vehicle.metaDescription, url: PAGE_URL })) }} />
      <script id="faq-schema-sedan" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }} />
      <script id="speakable-schema-sedan" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema(PAGE_URL)) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#1E1F20] opacity-95" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-50" />
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <BreadcrumbNav items={[{ name: 'Fleet', url: '/fleet' }, { name: 'Sedan', url: '/fleet/sedan' }]} dark />

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Most Booked &amp; Budget-Friendly</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Sedan Taxi <br />
              <span className="text-[#F7941D]">Dehradun</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              {vehicle.tagline}. Swift Dzire and Honda Amaze options with fixed fares starting from {formatPrice(getRoute('dehradun-mussoorie').sedan)} — the lowest cost way to travel across Uttarakhand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Call to Book
              </a>
              <a href="https://wa.me/919258912169?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Sedan%20taxi." target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
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
            question="Who should book a Sedan taxi and what does it cost?"
            answer={`The Sedan is the most economical option for solo travelers, couples, and small families of up to 4 on local and short outstation trips. A Dehradun to Mussoorie Sedan costs ${formatPrice(getRoute('dehradun-mussoorie').sedan)} one-way. For larger groups or steep Char Dham routes, the Ertiga or Innova Crysta are recommended instead.`}
            facts={[
              { label: 'Seating', value: '4 Passengers' },
              { label: 'Luggage', value: '2 Medium + 1 Cabin Bag' },
              { label: 'Dehradun to Mussoorie Fare', value: formatPrice(getRoute('dehradun-mussoorie').sedan) },
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

            <div className="lg:col-span-2 space-y-12">

              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl aspect-[3/2] bg-gray-100">
                <FleetImage images={sedanImages} fallbackAlt="Sedan Taxi Uttarakhand Cab 24/7" className="w-full h-full object-cover" />
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  The Smart Budget Choice
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  {vehicle.description}
                </p>
                <TrustBanner />
              </div>

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

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Best Routes for the Sedan
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

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Sedan Pricing
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

              <BookingCTA destination="Sedan" fare={formatPrice(getRoute('dehradun-mussoorie').sedan)} />

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-12">
                <FAQSection faqs={faqs} title="Sedan Taxi FAQs" />
              </div>

            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Book Sedan
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
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">Fixed pricing • Verified local drivers</p>
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-4">Traveling With More People?</h4>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6">For groups of 5 or more, or Char Dham Yatra, check out the Ertiga and Innova Crysta.</p>
                <div className="space-y-3">
                  <Link href="/fleet/ertiga" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Ertiga</span>
                    <ArrowRight className="w-4 h-4 text-[#F7941D]" />
                  </Link>
                  <Link href="/fleet/innova-crysta" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Innova Crysta</span>
                    <ArrowRight className="w-4 h-4 text-[#F7941D]" />
                  </Link>
                </div>
              </div>

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
