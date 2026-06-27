import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  AlertCircle, MapPin, Clock, HelpCircle, 
  Shield, Car, CheckCircle2, TrendingUp 
} from 'lucide-react';
import { FAQSection } from '@/components/FAQ';
import { FareCalculator } from '@/components/FareCalculator';
import { getRoute, formatPrice } from '@/lib/priceData';
import { faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { TiltCard } from '@/components/TiltCard';

export const metadata: Metadata = {
  title: 'Taxi Rates 2026 | Uttarakhand Cab Fixed Fares',
  description: 'Transparent taxi rates for Dehradun, Mussoorie, Rishikesh, and Char Dham. No hidden fees, no surge pricing. Check our 2026 outstation and local fares.',
  alternates: { canonical: 'https://uttarakhand.cab/taxi-rates' },
  openGraph: {
    title: 'Taxi Rates 2026 | Uttarakhand Cab Fixed Fares',
    description: 'Transparent taxi rates for Dehradun, Mussoorie, Rishikesh, and Char Dham. No hidden fees, no surge pricing. Check our 2026 outstation and local fares.',
    url: 'https://uttarakhand.cab/taxi-rates',
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [
      {
        url: 'https://uttarakhand.cab/images/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Uttarakhand Cab 24/7 - Premium Taxi Service',
      },
    ],
  },
};

// ----------------------------------------------------------------------
// RATES TABLE — derived from lib/priceData.ts (single source of truth).
// Each row references a PRICING_DATA key so prices/distance/duration can never
// drift from the rest of the site. Display label overrides keep the copy intact.
// `EXTRA_ROUTES` holds routes not present in priceData (kept explicit).
// ----------------------------------------------------------------------
interface RateRow {
  from: string;
  to: string;
  distance: string;
  time: string;
  sedan: string;
  suv: string;
}

// priceData key -> optional display overrides for from/to labels
const RATE_ROWS: { key: string; from?: string; to?: string }[] = [
  { key: 'dehradun-mussoorie' },
  { key: 'dehradun-rishikesh' },
  { key: 'dehradun-haridwar' },
  { key: 'haridwar-rishikesh' },
  { key: 'dehradun-nainital' },
  { key: 'dehradun-kedarnath', to: 'Kedarnath (Gaurikund)' },
  { key: 'jolly-grant-mussoorie', from: 'Jolly Grant Airport' },
  { key: 'jolly-grant-dehradun', from: 'Jolly Grant Airport', to: 'Dehradun City' },
];

// Routes shown in the table but not (yet) in priceData. Keep explicit.
const EXTRA_ROUTES: RateRow[] = [
  { from: 'Haridwar', to: 'Badrinath', distance: '315 km', time: '10 hrs', sedan: '₹8,000', suv: '₹10,000' },
  { from: 'Jolly Grant Airport', to: 'Rishikesh', distance: '20 km', time: '45 min', sedan: '₹2,000', suv: '₹2,500' },
];

const derivedRoutes: RateRow[] = RATE_ROWS.map(({ key, from, to }) => {
  const r = getRoute(key);
  return {
    from: from ?? r.from,
    to: to ?? r.to,
    distance: `${r.distance} km`,
    time: r.duration,
    sedan: formatPrice(r.sedan),
    suv: formatPrice(r.suv),
  };
});

// Final ordered list: Dehradun + Haridwar routes, the Haridwar->Badrinath extra,
// then airport routes (matches the previous display order).
const routes: RateRow[] = [
  ...derivedRoutes.slice(0, 6),
  EXTRA_ROUTES[0],
  derivedRoutes[6],
  EXTRA_ROUTES[1],
  derivedRoutes[7],
];

const pricingFAQs = [
  {
    question: 'Are there any hidden charges in the quoted fixed fares?',
    answer: 'No, we guarantee transparent pricing. Our fixed route quotes strictly include fuel and driver charges. Please note that state border taxes (if crossing into UP/Delhi), highway tolls, and specific tourist parking fees are charged at actuals directly during the trip.'
  },
  {
    question: 'How does the night driving surcharge work?',
    answer: 'A standard night driving allowance (ranging from ₹200 to ₹500 depending on the vehicle and route) is applicable only if you require the driver to travel between 10:00 PM and 6:00 AM. This ensures the safety and well-being of our mountain drivers.'
  },
  {
    question: 'Do you charge extra for AC in mountain regions?',
    answer: 'AC is included in all our vehicles at no extra cost. However, for safety and optimal engine performance on steep Himalayan inclines (like the ascent to Mussoorie or Auli), the driver may temporarily switch off the AC. There are no separate AC vs. Non-AC billing tiers.'
  },
  {
    question: 'How is the per-kilometer outstation fare calculated?',
    answer: 'For long outstation tours, billing is calculated garage-to-garage (starting from our Dehradun base) with a minimum billable distance per calendar day (usually 250 km per day). A daily driver allowance (Bhatta) is also added to cover the driver\'s lodging and meals.'
  }
];

export default function TaxiRates() {
  const DOMAIN = 'https://uttarakhand.cab';

  // OfferCatalog — every rate row as a structured taxi Offer with PriceSpecification
  const offerCatalogLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${DOMAIN}/taxi-rates/#ratecard`,
    name: 'Uttarakhand Cab 24/7 — Taxi Rates 2026',
    itemListElement: routes.map((row, i) => ({
      '@type': 'Offer',
      position: i + 1,
      name: `${row.from} to ${row.to} Taxi`,
      areaServed: { '@type': 'State', name: 'Uttarakhand' },
      priceSpecification: [
        {
          '@type': 'PriceSpecification',
          name: 'Sedan',
          price: row.sedan.replace(/[^0-9]/g, ''),
          priceCurrency: 'INR',
        },
        {
          '@type': 'PriceSpecification',
          name: 'SUV',
          price: row.suv.replace(/[^0-9]/g, ''),
          priceCurrency: 'INR',
        },
      ],
      itemOffered: {
        '@type': 'Service',
        serviceType: 'Taxi Service',
        provider: { '@id': `${DOMAIN}/#business-dehradun` },
      },
    })),
  };

  const faqLd = faqPageSchema(pricingFAQs);

  const breadcrumbLd = breadcrumbSchema([
    { name: 'Taxi Rates 2026', url: '/taxi-rates' },
  ]);

  return (
    <main className="bg-[#1A1A1A] selection:bg-[#F7941D]/30">

      {/* JSON-LD: OfferCatalog (rate card) + FAQ + Breadcrumb */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      {/* 1. HERO SECTION: 100% SSR Glassmorphism & High-Contrast Typography */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-navy">
        <Image
          src="/assets/images/hero-mountain-road.jpg"
          alt="Uttarakhand Mountain Road"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />

        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            {/* Glass Navigation Pill */}
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Taxi Rates 2026</span>
            </nav>

            <h1 className="font-heading font-black text-5xl md:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-8">
              Transparent <br/>
              <span className="text-[#F7941D]">Pricing</span>
            </h1>
            
            <p className="text-white/70 text-lg md:text-2xl max-w-2xl font-light leading-relaxed mb-10">
              No hidden fees. No surge pricing. Explore our detailed fixed-fare list for the most popular Himalayan routes.
            </p>

            <div className="flex flex-wrap gap-6 text-white/50 text-xs font-black uppercase tracking-widest">
               <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#F7941D]" /> Fixed Guarantee</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> AC Included</span>
               <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#F7941D]" /> 2026 Rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FARE CALCULATOR: Floating Glass Widget */}
      <section className="relative z-20 -mt-12 px-4">
        <div className="max-w-5xl mx-auto bg-[#1A1A1A] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/10 p-8 md:p-12">
           <div className="mb-8 border-b border-white/10 pb-8 text-center md:text-left">
              <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">Estimate Your Fare</h2>
              <p className="text-white/70 font-light">Get an instant calculation for your specific route.</p>
           </div>
           {/* Client Component safely imported into Server Component */}
           <FareCalculator />
        </div>
      </section>

      {/* 3. RATES TABLE: Modernized Minimalism */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="mb-12">
            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-4">
              Fixed Route <br/> Fares
            </h2>
            <div className="w-20 h-1.5 bg-[#F7941D] mb-8"></div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm text-left whitespace-nowrap md:whitespace-normal">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white uppercase tracking-[0.2em] text-[10px] font-black">
                    <th className="p-6">Pickup & Drop Route</th>
                    <th className="p-6 hidden md:table-cell">Details</th>
                    <th className="p-6 text-[#F7941D]">Sedan</th>
                    <th className="p-6 text-right">SUV Premium</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {routes.map((route, index) => (
                    <tr key={index} className="group border-b border-white/10 hover:bg-[#1A1A1A]/50 transition-colors">
                      <td className="p-6 bg-[#1A1A1A]/30 group-hover:bg-transparent transition-colors">
                        <div className="flex items-start gap-4">
                          <MapPin className="w-5 h-5 text-[#F7941D] shrink-0 mt-1" />
                          <div>
                            <span className="block font-black text-lg uppercase tracking-tighter">{route.from}</span>
                            <span className="text-white/70 font-bold text-xs uppercase tracking-widest opacity-60">to {route.to}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 hidden md:table-cell">
                        <div className="flex flex-col gap-1">
                          <span className="text-white font-bold">{route.distance}</span>
                          <span className="text-white/70 text-xs font-light">Approx. {route.time}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-xl font-black text-white group-hover:text-[#F7941D] transition-colors">{route.sedan}</span>
                      </td>
                      <td className="p-6 text-right">
                        <span className="text-xl font-black text-white group-hover:text-[#F7941D] transition-colors">{route.suv}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-12 bg-[#1A1A1A] p-8 rounded-[2rem] border-l-8 border-[#F7941D]">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-[#F7941D] shrink-0" />
              <p className="text-sm text-white/70 leading-relaxed">
                <strong className="text-white uppercase tracking-widest text-xs block mb-2">Policy Notice:</strong>
                Fares above are base fixed rates. Inter-state border taxes, highway tolls, and tourist parking are paid separately at actuals. Peak season (May-June) may have slight variations based on demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CUSTOM PRICING: Bento Grid Layout */}
      <section className="py-24 bg-[#1A1A1A] text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-page mx-auto">
          <div className="mb-16">
            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Custom <br/> Billing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Per KM Rates Bento */}
            <TiltCard className="bg-[#121212] p-10 rounded-[2.5rem] border border-[#333537]" intensityX={6} intensityY={8}>
               <Car className="w-12 h-12 text-[#F7941D] mb-6" style={{ transform: 'translateZ(35px)' }} />
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 text-white" style={{ transform: 'translateZ(25px)' }}>Outstation Per-Km</h3>
               <div className="space-y-6">
                 {[
                   { v: 'Sedan (Dzire/Etios)', rate: '₹15 - ₹18' },
                   { v: 'SUV (Ertiga)', rate: '₹20 - ₹25' },
                   { v: 'SUV (Innova Crysta)', rate: '₹28 - ₹35' },
                   { v: 'Tempo Traveller / Force Urbania', rate: 'On Request' }
                 ].map((r, i) => (
                   <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                     <span className="text-white/60 text-sm font-bold uppercase tracking-widest">{r.v}</span>
                     <span className="text-[#F7941D] font-black text-xl">{r.rate}</span>
                   </div>
                 ))}
               </div>
               <p className="mt-8 text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">* Min. 250 km / Day billing applies</p>
            </TiltCard>

            {/* Local Packages Bento */}
            <TiltCard className="bg-[#121212] p-10 rounded-[2.5rem] border border-[#333537]" intensityX={6} intensityY={8}>
               <Clock className="w-12 h-12 text-[#F7941D] mb-6" style={{ transform: 'translateZ(35px)' }} />
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 text-white" style={{ transform: 'translateZ(25px)' }}>Local Sightseeing</h3>
               <div className="space-y-6">
                 {[
                   { v: 'Sedan (Dzire/Etios)', rate: '₹2,500' },
                   { v: 'SUV (Ertiga/Innova)', rate: '₹3,500' },
                   { v: 'Tempo Traveller', rate: '₹5,500' },
                   { v: 'Force Urbania', rate: 'On Request' }
                 ].map((r, i) => (
                   <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                     <span className="text-white/60 text-sm font-bold uppercase tracking-widest">{r.v}</span>
                     <span className="text-[#F7941D] font-black text-xl">{r.rate}</span>
                   </div>
                 ))}
               </div>
               <p className="mt-8 text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">* Based on 8 Hrs / 80 Km Package</p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Quick links: booking + destinations */}
      <section className="py-14 bg-[#1A1A1A] px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6 text-center">Book Your Taxi or Explore Destinations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: 'Book a Taxi Now', href: '/taxi' },
              { label: 'Mussoorie', href: '/mussoorie' },
              { label: 'Rishikesh', href: '/rishikesh' },
              { label: 'Nainital', href: '/nainital' },
              { label: 'Haridwar', href: '/haridwar' },
              { label: 'Kedarnath', href: '/kedarnath' },
              { label: 'Char Dham', href: '/char-dham' },
              { label: 'All Destinations', href: '/destinations' },
            ].map((d, i) => (
              <Link key={i} href={d.href} className="bg-[#1A1A1A] rounded-xl p-4 text-center text-sm font-bold text-white border border-white/10 hover:border-[#F7941D]/40 hover:text-[#F7941D] transition-all">
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQS & CTA: Advanced Minimalist Finisher */}
      <section className="py-24 bg-[#1A1A1A] px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 text-[#F7941D] mx-auto mb-4" />
            <h2 className="text-white text-4xl font-black tracking-tighter uppercase mb-4">Pricing Knowledge</h2>
            <p className="text-white/70 font-light">Clear answers on billing, AC, and night charges.</p>
          </div>
          <FAQSection faqs={pricingFAQs} />
        </div>
      </section>

      <section className="pb-32 px-4">
        <div className="max-w-page mx-auto">
          <div className="bg-navy rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl border border-[#333537]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F7941D] rounded-full opacity-5 blur-[120px] transition-opacity duration-700 group-hover:opacity-10"></div>
            
            <div className="relative z-10">
              <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                Lock In <br/> <span className="text-[#F7941D]">Your Fare</span>
              </h2>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                Call or WhatsApp our dispatch team. We will reply with a guaranteed fixed fare in under 15 minutes.
              </p>
              <div className="flex justify-center gap-4">
                <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="px-12 py-6 bg-[#F7941D] text-white font-black rounded-2xl hover:bg-[#D97E10] transition-all uppercase tracking-widest text-sm shadow-xl hover:-translate-y-1">
                   WhatsApp Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
