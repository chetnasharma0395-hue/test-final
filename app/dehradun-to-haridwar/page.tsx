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
  title: 'Dehradun to Haridwar Taxi Fare 2026 | Fixed Price, 24/7',
  description: 'Book a taxi from Dehradun to Haridwar. Fixed 2026 fare ₹2,000 Sedan, ₹2,700 SUV. 55 km via NH334, 1.5 hours. Airport pickup available. Uttarakhand Cab 24/7.',
  alternates: { canonical: 'https://uttarakhand.cab/dehradun-to-haridwar' },
  openGraph: {
    title: 'Dehradun to Haridwar Taxi Fare 2026 | Fixed Price, 24/7',
    description: 'Book a taxi from Dehradun to Haridwar. Fixed 2026 fare ₹2,000 Sedan, ₹2,700 SUV. 55 km via NH334, 1.5 hours. Airport pickup available. Uttarakhand Cab 24/7.',
    url: 'https://uttarakhand.cab/dehradun-to-haridwar',
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/assets/images/og-main.jpg', width: 1200, height: 630, alt: 'Dehradun to Haridwar Taxi Service' }],
  },
};

const pageFAQs = [
  { question: 'What is the taxi fare from Dehradun to Haridwar?', answer: 'The fixed one-way taxi fare from Dehradun to Haridwar is ₹2,000 for a Sedan and ₹3,000 for an SUV with Uttarakhand Cab 24/7. The fare covers the 55 km journey via NH334 and takes approximately 1.5 hours. Pickup available from Railway Station, ISBT, or Jolly Grant Airport.' },
  { question: 'How long does it take to travel from Dehradun to Haridwar?', answer: 'The Dehradun to Haridwar journey covers 55 km and takes approximately 1.5 hours under normal traffic conditions. During peak pilgrim season (April–June) and weekends, the drive may take up to 2 hours due to traffic near Rishikesh junction.' },
  { question: 'Can I get a taxi from Jolly Grant Airport to Haridwar?', answer: 'Yes. Jolly Grant Airport is located between Dehradun and Haridwar — just 35 km from Haridwar. The airport-to-Haridwar taxi fare is ₹1,700 for a Sedan and takes approximately 45–60 minutes. Uttarakhand Cab 24/7 provides flight-tracked pickups with no waiting charge for delays.' },
  { question: 'What time should I leave Dehradun for evening Ganga Aarti?', answer: 'Leave Dehradun by 4:00 PM to reach Har Ki Pauri comfortably by 5:30 PM. Evening Ganga Aarti at Haridwar begins at approximately 6:00–6:30 PM (sunset time varies by season). Uttarakhand Cab 24/7 can also arrange early 4:00 AM pickups for the sunrise Aarti.' },
  { question: 'Is a round-trip taxi available from Dehradun to Haridwar?', answer: 'Yes. Round-trip taxi from Dehradun to Haridwar with driver waiting starts at ₹3,000 for a Sedan. This covers pickup, drop at Haridwar, driver waiting time of up to 4 hours, and return to Dehradun. Ideal for same-day Ganga Aarti visits. Book via WhatsApp: +91 92589 12169.' },
];

const routeStops = [
  { name: 'Dehradun City', desc: 'Pickup from Railway Station, ISBT, or any Dehradun hotel.', dist: 'Starting point' },
  { name: 'Doiwala', desc: 'A small town midway — last major fuel and refreshment stop before Haridwar.', dist: '20 km from Dehradun' },
  { name: 'Raiwala', desc: 'Junction town where the river Ganga becomes visible. Many pilgrims pause here.', dist: '40 km from Dehradun' },
  { name: 'Har Ki Pauri, Haridwar', desc: 'The sacred ghat on the Ganges — the final destination for most pilgrims.', dist: '55 km from Dehradun' },
];

const driverTips = [
  'For the Ganga Aarti (sunset ceremony at Har Ki Pauri), leave Dehradun by 4:00 PM to arrive comfortably by 5:30 PM. Evening Aarti starts at approximately 6:00-6:30 PM.',
  'For early morning Ganga Aarti (sunrise), Uttarakhand Cab 24/7 offers 4:00 AM pickups from Dehradun — reaching Haridwar well before 6:00 AM.',
  'If starting your Char Dham Yatra from Haridwar, ensure your Yatra registration is completed online before departure at registrationandtouristcare.uk.gov.in.',
  'Haridwar has restricted vehicle zones near Har Ki Pauri. Our drivers know all designated drop-off and waiting points.',
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
      <Script id="faq-schema-dehradun-to-haridwar" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="speakable-schema-dehradun-to-haridwar" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema('https://uttarakhand.cab/dehradun-to-haridwar')) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/images/dest-haridwar-rishikesh.jpg" alt="Dehradun to Haridwar Taxi Service" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-40 z-[1]" />
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Dehradun to Haridwar</span>
            </nav>
            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Fixed-Fare Route</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Dehradun to <br/><span className="text-[#F7941D]">Haridwar Taxi</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">The fastest, most reliable taxi from Dehradun to Haridwar. Fixed fares, experienced local drivers, and 24/7 availability for temple visits, Ganga Aarti, and Char Dham departures.</p>
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
            destination="Haridwar"
            distance="55 km"
            travelTime="1.5 hours"
            taxiFareRange="₹2,000 - ₹3,000 (One Way)"
            bestTime="Year-round (4 AM pickups for Ganga Aarti)"
            idealMode="Sedan (Swift Dzire / Honda Amaze)"
          />
        </div>
      </section>

      {/* 3. GEO ANSWER BOX — visually hidden, AI-crawlable */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="What is the taxi fare from Dehradun to Haridwar in 2026?"
            answer="The fixed one-way taxi fare from Dehradun to Haridwar in 2026 is ₹2,000 for a Sedan and ₹3,000 for an SUV with Uttarakhand Cab 24/7. The 55 km journey via NH334 takes approximately 1.5 hours. From Jolly Grant Airport to Haridwar is just 35 km — ₹1,700 for a Sedan in 45 minutes. All fares are fixed with no surge pricing. Book 24/7 via WhatsApp: +91 92589 12169."
            facts={[
              { label: 'Sedan Fare', value: '₹2,000' },
              { label: 'SUV Fare', value: '₹3,000' },
              { label: 'Distance', value: '55 km' },
              { label: 'Travel Time', value: '~1.5 hrs' },
            ]}
            source="Uttarakhand Cab 24/7 · Fares updated May 2026 · +91 92589 12169"
          />
        </div>
      </section>

      {/* 4. MAIN CONTENT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="mb-12">
            <RouteInfoBox from="Dehradun" to="Haridwar" distance="55 km" time="1.5 hrs" fare="₹2,000" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">The Drive from Dehradun to Haridwar</h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">The Dehradun to Haridwar route is one of the most frequently travelled in Uttarakhand — connecting the state capital to the gateway of the Garhwal Himalayas. The 55 km drive via NH334 takes approximately 1.5 hours under normal traffic conditions. With Uttarakhand Cab 24/7, pickups are available from Dehradun Railway Station, ISBT Bus Stand, Jolly Grant Airport, or any hotel in the city.</p>
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
                <p className="text-white/70 font-light leading-relaxed text-lg">For the Dehradun–Haridwar route, a Sedan (Swift Dzire or Honda Amaze) is perfectly comfortable and the most economical choice. The 55 km flat highway drive does not require an SUV unless you are carrying heavy luggage or 5+ passengers, in which case an Ertiga or Innova Crysta is recommended.</p>
              </div>
              <BookingCTA destination="Haridwar" fare="₹2,000" />
              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm">
                <FAQSection faqs={pageFAQs} title="Dehradun to Haridwar FAQs" />
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
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹2,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">SUV (One Way)</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹3,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/80 font-light">Round Trip</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹3,800</span>
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
                    <Link href="/dehradun-to-rishikesh" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Dehradun to Rishikesh</span>
                    </Link>
                  </li>
                  <li key="1" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                    <Link href="/mussoorie" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Dehradun to Mussoorie</span>
                    </Link>
                  </li>
                  <li key="2" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                    <Link href="/haridwar-to-kedarnath" className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">Haridwar to Kedarnath</span>
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
          <StrategicCTA heading="Book Your Haridwar Taxi Now" subtext="Fixed fare, zero surprises. Pickup from anywhere in Dehradun — Railway Station, Airport, or hotel." />
        </div>
      </section>
    </div>
  );
}
