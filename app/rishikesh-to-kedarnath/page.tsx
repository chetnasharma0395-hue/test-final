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
  title: 'Rishikesh to Kedarnath Taxi Fare 2026 | Yatra Cab Service',
  description: 'Book a taxi from Rishikesh to Kedarnath (Gaurikund). Fixed 2026 fare ₹7,000 Sedan, ₹9,500 SUV. 210 km, 7-8 hours. Mountain-certified Yatra drivers. Uttarakhand Cab 24/7.',
  alternates: { canonical: 'https://uttarakhand.cab/rishikesh-to-kedarnath' },
  openGraph: {
    title: 'Rishikesh to Kedarnath Taxi Fare 2026 | Yatra Cab Service',
    description: 'Book a taxi from Rishikesh to Kedarnath (Gaurikund). Fixed 2026 fare ₹7,000 Sedan, ₹9,500 SUV. 210 km, 7-8 hours. Mountain-certified Yatra drivers. Uttarakhand Cab 24/7.',
    url: 'https://uttarakhand.cab/rishikesh-to-kedarnath',
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/assets/images/og-main.jpg', width: 1200, height: 630, alt: 'Rishikesh to Kedarnath Taxi Yatra Service' }],
  },
};

const pageFAQs = [
  { question: 'What is the taxi fare from Rishikesh to Kedarnath?', answer: 'The fixed one-way taxi fare from Rishikesh to Gaurikund (Kedarnath base camp) is ₹7,000, SUV ₹9,500 for an SUV with Uttarakhand Cab 24/7. The 210 km drive takes 7-8 hours via Devprayag and Rudraprayag.' },
  { question: 'Can a taxi go directly to Kedarnath temple?', answer: 'No. Private vehicles cannot drive beyond Sonprayag or Gaurikund. Our taxi will drop you at Gaurikund (the designated end point). From Gaurikund, you must complete the 16 km trek to Kedarnath temple on foot, by pony/palki, or via pre-booked helicopter from Phata or Guptkashi.' },
  { question: 'How long is the drive from Rishikesh to Kedarnath?', answer: 'The drive from Rishikesh to Gaurikund (Kedarnath base) covers 210 km and takes 7-8 hours. We recommend leaving by 4:00-5:00 AM from Rishikesh to reach Gaurikund by noon with enough daylight for the Kedarnath trek.' },
  { question: 'Is registration mandatory for Kedarnath Yatra from Rishikesh?', answer: 'Yes. Mandatory biometric Yatra registration is required before entering the Kedarnath route. Register at registrationandtouristcare.uk.gov.in before your journey. Carry your registration slip, government ID, and a medical certificate if above 50 years. Your Uttarakhand Cab 24/7 driver will guide you through all checkposts.' },
  { question: 'Can I book a round-trip taxi from Rishikesh to Kedarnath with driver waiting?', answer: 'Yes. Uttarakhand Cab 24/7 offers round-trip Kedarnath packages from Rishikesh with driver waiting at Gaurikund for 1-3 days while you complete the trek. Round-trip fare starts at ₹13,000 for a Sedan. WhatsApp +91 92589 12169 for custom packages.' },
];

const routeStops = [
  { name: 'Devprayag', desc: 'The sacred confluence of the Alaknanda and Bhagirathi rivers — where the Ganges officially begins. A must-see stop.', dist: '70 km from Rishikesh' },
  { name: 'Srinagar (Garhwal)', desc: 'The largest town on the route. Ideal for lunch, refueling, and ATM withdrawal.', dist: '105 km from Rishikesh' },
  { name: 'Rudraprayag', desc: 'Confluence of Alaknanda and Mandakini rivers. The road splits here — left for Kedarnath, right for Badrinath.', dist: '140 km from Rishikesh' },
  { name: 'Guptkashi', desc: 'Major pilgrim hub with helicopter booking counters for Kedarnath. Many Yatris stay overnight here.', dist: '185 km from Rishikesh' },
  { name: 'Sonprayag / Gaurikund', desc: 'The final motorable points. Private taxis drop here — trek or helicopter completes the journey to the temple.', dist: '210 km from Rishikesh' },
];

const driverTips = [
  'Leave Rishikesh by 4:00-5:00 AM to reach Gaurikund by noon. This gives you ample daylight for the 16 km trek — never start the Kedarnath trek after 2:00 PM.',
  'Mandatory Yatra registration must be completed before departure. Register at registrationandtouristcare.uk.gov.in. Carry printed registration slip, government ID, and medical certificate (if above 50 years).',
  'Withdraw cash in Rishikesh or Srinagar — ATMs become unreliable after Rudraprayag. You will need cash for ponies, palki, food, and accommodation on the trek.',
  'Book your helicopter from Guptkashi in advance if you cannot trek. Phata, Sitapur, and Guptkashi are the main helicopter base locations.',
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
      <Script id="faq-schema-rishikesh-to-kedarnath" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="speakable-schema-rishikesh-to-kedarnath" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema('https://uttarakhand.cab/rishikesh-to-kedarnath')) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/images/dest-kedarnath.jpg" alt="Rishikesh to Kedarnath Taxi Yatra Service" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-40 z-[1]" />
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Rishikesh to Kedarnath</span>
            </nav>
            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Char Dham Yatra Route</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Rishikesh to <br/><span className="text-[#F7941D]">Kedarnath Taxi</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">Safe and reliable taxi from Rishikesh to Gaurikund (Kedarnath base camp). 210 km of Himalayan highway with experienced mountain-certified drivers who know every checkpost and weather condition.</p>
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
            destination="Gaurikund (Kedarnath Base)"
            distance="210 km"
            travelTime="7-8 hours"
            taxiFareRange="₹7,000, SUV ₹9,500 (One Way)"
            bestTime="May-June & September-October"
            idealMode="SUV — Innova Crysta or Ertiga (Recommended)"
          />
        </div>
      </section>

      {/* 3. GEO ANSWER BOX — visually hidden, AI-crawlable */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="What is the taxi fare from Rishikesh to Kedarnath in 2026?"
            answer="The fixed one-way taxi fare from Rishikesh to Kedarnath (Gaurikund, the trek base camp) in 2026 is ₹7,000, SUV ₹9,500 for an SUV with Uttarakhand Cab 24/7. The 210 km journey via Devprayag and Rudraprayag takes 7–8 hours. From Gaurikund, a 16 km trek (or helicopter) reaches the Kedarnath temple at 3,583 m altitude. All fares are fixed with no hidden charges. Book 24/7 via WhatsApp: +91 92589 12169."
            facts={[
              { label: 'Sedan Fare', value: '₹7,000' },
              { label: 'SUV Fare', value: '₹9,500' },
              { label: 'Distance', value: '210 km' },
              { label: 'Travel Time', value: '7-8 hrs' },
            ]}
            source="Uttarakhand Cab 24/7 · Fares updated May 2026 · +91 92589 12169"
          />
        </div>
      </section>

      {/* 4. MAIN CONTENT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="mb-12">
            <RouteInfoBox from="Rishikesh" to="Gaurikund (Kedarnath Base)" distance="210 km" time="7-8 hrs" fare="₹7,000" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">The Journey from Rishikesh to Kedarnath</h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">The Rishikesh to Kedarnath route is one of the holiest and most scenic drives in India — following the sacred Ganga and Mandakini rivers through the heart of the Garhwal Himalayas. Covering 210 km and taking 7-8 hours, the journey passes through four sacred river confluences (Prayags) before reaching Gaurikund, the last motorable point before the Kedarnath temple. Our Yatra drivers have made this journey hundreds of times and know every checkpost, landslide-prone section, and safe stopping point.</p>
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
                <p className="text-white/70 font-light leading-relaxed text-lg">For the Rishikesh–Kedarnath route, we strongly recommend an SUV (Innova Crysta or Ertiga). The 210 km mountain drive involves steep climbs, sharp bends, and stretches of rough road near Gaurikund. SUVs provide significantly better ground clearance, more luggage space for yatra gear, and far more comfort for a 7-8 hour mountain journey. Sedans are available but not recommended for groups of 3 or more.</p>
              </div>
              <BookingCTA destination="Gaurikund (Kedarnath Base)" fare="₹7,000" />

              {/* Fleet cross-link */}
              <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm p-8 md:p-10 mt-12">
                <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tighter mb-2">Which Vehicle for This Route?</h3>
                <p className="text-white/70 font-light text-sm mb-6">We strongly recommend an SUV for the 220 km Rishikesh–Gaurikund drive. The Innova Crysta handles the mountain terrain best. Large yatra groups should book the Tempo Traveller.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link href="/fleet/innova-crysta" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Innova Crysta</span>
                  </Link>
                  <Link href="/fleet/tempo-traveller" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Tempo Traveller</span>
                  </Link>
                  <Link href="/best-vehicle-for-char-dham-yatra" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">Full Vehicle Guide</span>
                  </Link>
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm">
                <FAQSection faqs={pageFAQs} title="Rishikesh to Kedarnath FAQs" />
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
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹7,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">SUV (One Way)</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹9,500</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/80 font-light">Round Trip</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹14,000</span>
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
                    <Link href="/haridwar-to-kedarnath" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Haridwar to Kedarnath</span>
                    </Link>
                  </li>
                  <li key="1" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                    <Link href="/kedarnath" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Dehradun to Kedarnath</span>
                    </Link>
                  </li>
                  <li key="2" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                    <Link href="/rishikesh" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Rishikesh to Haridwar</span>
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
          <StrategicCTA heading="Book Your Kedarnath Yatra Taxi" subtext="Mountain-certified drivers. Fixed transparent fares. Pickup from anywhere in Rishikesh." />
        </div>
      </section>
    </div>
  );
}
