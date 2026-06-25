import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Phone, MapPin, Clock, MessageCircle, CheckCircle2, ShieldCheck, Car, Mountain, Info } from 'lucide-react';
import { BookingCTA, DriverIntelligenceBox, RouteInfoBox, TrustBanner, StrategicCTA } from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import { QuickTravelSummary } from '@/components/QuickTravelSummary';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { speakableSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Delhi to Dehradun Taxi Fare 2026 | Expressway Cab Service',
  description: 'Book a taxi from Delhi to Dehradun. Fixed 2026 fare ₹4,000 Sedan, ₹5,000 SUV. 300 km via Delhi-Dehradun Expressway, 4-5 hours. Uttarakhand Cab 24/7.',
  alternates: { canonical: 'https://uttarakhand.cab/delhi-to-dehradun' },
  openGraph: {
    title: 'Delhi to Dehradun Taxi Fare 2026 | Expressway Cab Service',
    description: 'Book a taxi from Delhi to Dehradun. Fixed 2026 fare ₹4,000 Sedan, ₹5,000 SUV. 300 km via Delhi-Dehradun Expressway, 4-5 hours. Uttarakhand Cab 24/7.',
    url: 'https://uttarakhand.cab/delhi-to-dehradun',
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/assets/images/og-main.jpg', width: 1200, height: 630, alt: 'Delhi to Dehradun Taxi via Expressway' }],
  },
};

const pageFAQs = [
  { question: 'What is the taxi fare from Delhi to Dehradun in 2026?', answer: 'The fixed one-way taxi fare from Delhi to Dehradun in 2026 is ₹4,000 for a Sedan and ₹5,000 for an SUV with Uttarakhand Cab 24/7. The fare includes pickup from anywhere in Delhi and drop anywhere in Dehradun. Toll charges (approximately ₹500-800) are additional and borne by the passenger.' },
  { question: 'How long does Delhi to Dehradun take via the new Expressway?', answer: 'Via the new Delhi-Dehradun Economic Corridor Expressway (NH334B), the 300 km journey takes approximately 4-5 hours under normal traffic conditions. This is significantly faster than the old NH58 route via Meerut and Haridwar which took 6-7 hours.' },
  { question: 'Can I book a taxi from IGI Airport Delhi to Dehradun?', answer: 'Yes. Uttarakhand Cab 24/7 provides direct taxi service from Indira Gandhi International Airport (IGI, Terminal 1, 2, or 3) to Dehradun. The fare is ₹4,000 for a Sedan. Drivers track your flight and wait at the arrivals exit — no extra charge for flight delays.' },
  { question: 'What is the route from Delhi to Dehradun via Expressway?', answer: 'The route follows: Delhi → Delhi-Meerut Expressway → Delhi-Dehradun Economic Corridor (NH334B) → Saharanpur Bypass → Rajaji National Park Tunnel (12 km) → Dehradun. This is the fastest and most scenic route, avoiding Meerut, Muzaffarnagar, and Roorkee city traffic entirely.' },
  { question: 'Can Delhi to Dehradun taxi continue to Mussoorie or Rishikesh?', answer: 'Yes. Many passengers book Delhi to Dehradun taxi and continue directly to Mussoorie (+₹1,500), Rishikesh (+₹1,500), or Haridwar (+₹1,500) without stopping in Dehradun. Uttarakhand Cab 24/7 offers combined packages — WhatsApp +91 92589 12169 for a custom multi-destination quote.' },
];

const routeStops = [
  { name: 'Delhi / IGI Airport', desc: 'Pickup from home, hotel, IGI Airport Terminal 1, 2, or 3, or anywhere in Delhi NCR.', dist: 'Starting point' },
  { name: 'Delhi-Meerut Expressway Merge', desc: 'The journey starts on the Delhi-Meerut Expressway before joining the Dehradun corridor.', dist: '~30 km from Delhi' },
  { name: 'Saharanpur Bypass', desc: 'The expressway bypasses Saharanpur city — no more city traffic delays.', dist: '~180 km from Delhi' },
  { name: 'Rajaji Tunnel (12 km)', desc: "India's longest wildlife tunnel under the Rajaji National Park — a unique expressway experience.", dist: '~250 km from Delhi' },
  { name: 'Dehradun City / Jolly Grant Airport', desc: 'Drop anywhere in Dehradun — city centre, Railway Station, or Jolly Grant Airport.', dist: '300 km' },
];

const driverTips = [
  'Leave Delhi between 5:00-7:00 AM to avoid Delhi morning rush hour on the expressway approach roads. This ensures arrival in Dehradun by 10:00-11:00 AM.',
  'The 12 km Rajaji wildlife tunnel has no phone signal. Inform family members before entering — you will be unreachable for approximately 10-15 minutes.',
  'Avoid travelling on long weekends (Diwali, Holi, Independence Day) — the Delhi-Dehradun Expressway sees heavy holiday traffic from hill-bound tourists.',
  'Toll charges on the expressway are separate from the taxi fare and will be borne by the passenger. Keep approximately ₹500-800 for tolls each way.',
];

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <Script id="faq-schema-delhi-to-dehradun" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="speakable-schema-delhi-to-dehradun" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema('https://uttarakhand.cab/delhi-to-dehradun')) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/images/dest-high-himalayas.jpg" alt="Delhi to Dehradun Taxi via Expressway" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C3F] via-[#0B1C3F]/90 to-transparent" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-40 z-[1]" />
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Delhi to Dehradun</span>
            </nav>
            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Expressway Route 2026</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Delhi to <br/><span className="text-[#F7941D]">Dehradun Taxi</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">The fastest Delhi to Dehradun taxi via the new Delhi-Dehradun Expressway. What used to take 6-7 hours now takes just 4-5 hours. Fixed fares, professional drivers, door-to-door service.</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Call to Book
              </a>
              <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Quote
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#F7941D]" /> Hill-Certified Drivers</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Zero Hidden Charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SUMMARY */}
      <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-page mx-auto">
          <QuickTravelSummary
            destination="Dehradun"
            distance="300 km"
            travelTime="4-5 hours"
            taxiFareRange="₹4,000 - ₹5,000 (One Way)"
            bestTime="Year-round (avoid long weekends)"
            idealMode="Sedan or SUV (both comfortable on expressway)"
          />
        </div>
      </section>

      {/* 3. GEO ANSWER BOX — visually hidden, AI-crawlable */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="What is the taxi fare from Delhi to Dehradun in 2026?"
            answer="The fixed one-way taxi fare from Delhi to Dehradun in 2026 is ₹4,000 for a Sedan and ₹5,000 for an SUV with Uttarakhand Cab 24/7. The 300 km journey via the new Delhi-Dehradun Expressway (NH334B) takes approximately 4-5 hours — significantly faster than the old Meerut-Haridwar route. Pickup available from anywhere in Delhi including IGI Airport, Connaught Place, or any residential area. Book 24/7 via WhatsApp: +91 92589 12169."
            facts={[
              { label: 'Sedan Fare', value: '₹4,000' },
              { label: 'SUV Fare', value: '₹5,000' },
              { label: 'Distance', value: '300 km' },
              { label: 'Travel Time', value: '4-5 hrs' },
            ]}
            source="Uttarakhand Cab 24/7 · Fares updated May 2026 · +91 92589 12169"
          />
        </div>
      </section>

      {/* 4. MAIN CONTENT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="mb-12">
            <RouteInfoBox from="Delhi" to="Dehradun" distance="300 km" time="4-5 hrs" fare="₹4,000" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">Delhi to Dehradun via the New Expressway</h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">The Delhi to Dehradun route was transformed in 2024 with the full opening of the Delhi-Dehradun Economic Corridor (NH334B) — a 213 km, 6-lane expressway that slashed travel time from 6-7 hours to just 4-5 hours. The expressway passes through a 12 km wildlife tunnel under the Rajaji National Park, making it the most scenic and fastest Delhi-Dehradun route ever built. Uttarakhand Cab 24/7 operates this route daily with pickup available from anywhere in Delhi.</p>
                <TrustBanner />
              </div>
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">Route Breakdown & Key Stops</h2>
                <div className="space-y-6 my-10 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-[#F7941D] before:via-gray-200 before:to-transparent">
                  {routeStops.map((stop, index) => (
                    <div key={stop.name} className="relative flex items-start justify-start gap-6 md:justify-between md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1A1A1A] border-4 border-white text-[#F7941D] font-black text-sm shrink-0 z-10 shadow-md group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="bg-[#1A1A1A] p-6 md:p-8 border border-white/10 rounded-[2rem] w-full md:w-[calc(50%-4rem)] text-left shadow-sm hover:shadow-xl hover:border-[#F7941D]/30 transition-all">
                        <h3 className="font-black text-white text-xl tracking-tight mb-2">{stop.name}</h3>
                        <p className="text-[#F7941D] font-black text-[10px] uppercase tracking-widest mb-3">{stop.dist}</p>
                        <p className="text-white/70 font-light text-sm leading-relaxed">{stop.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DriverIntelligenceBox tips={driverTips} />
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">Sedan vs SUV — Which to Choose?</h2>
                <p className="text-white/70 font-light leading-relaxed text-lg">For the Delhi–Dehradun route, both Sedan and SUV are excellent choices on the 6-lane expressway. A Sedan (Swift Dzire, Honda Amaze) is the most economical for 1-3 passengers. An SUV (Innova Crysta, Ertiga) is recommended for families with luggage or groups of 4-6 planning to continue to Mussoorie, Rishikesh, or Kedarnath directly from Dehradun.</p>
              </div>
              <BookingCTA destination="Dehradun" fare="₹4,000" />
              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm">
                <FAQSection faqs={pageFAQs} title="Delhi to Dehradun FAQs" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Route Fares
                </h4>
                <div className="space-y-4 text-sm font-medium mb-8">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Sedan (One Way)</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹5,500</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">SUV (One Way)</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹8,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/80 font-light">Round Trip</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹11,000</span>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <a href="tel:+919258912169" className="w-full px-6 py-4 bg-[#F7941D] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center justify-center gap-3">
                    <Phone className="w-4 h-4 shrink-0" /> Call: +91 92589 12169
                  </a>
                  <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="w-full px-6 py-4 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3">
                    <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Us
                  </a>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mt-6 flex items-start gap-2">
                  <Info className="w-4 h-4 text-white/50 shrink-0" />
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">All fares are fixed and transparent. Tolls paid by passenger.</p>
                </div>
              </div>
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Related Routes</h4>
                <ul className="space-y-4">
                  <li key="0" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                    <Link href="/mussoorie" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Dehradun to Mussoorie</span>
                    </Link>
                  </li>
                  <li key="1" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                    <Link href="/dehradun-to-rishikesh" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Dehradun to Rishikesh</span>
                    </Link>
                  </li>
                  <li key="2" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                    <Link href="/dehradun-to-haridwar" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Dehradun to Haridwar</span>
                    </Link>
                  </li>
                  <li key="3" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                    <Link href="/char-dham" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Full Char Dham Yatra</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 bg-[#1A1A1A] px-4">
        <div className="max-w-page mx-auto">
          <StrategicCTA heading="Book Your Delhi to Dehradun Taxi" subtext="Fixed fare, door-to-door service. Pickup from anywhere in Delhi — home, hotel, or IGI Airport." />
        </div>
      </section>
    </div>
  );
}
