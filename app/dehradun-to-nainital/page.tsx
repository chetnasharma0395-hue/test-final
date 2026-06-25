import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageCircle, CheckCircle2, ShieldCheck, Car, Coffee, Info } from 'lucide-react';
import { BookingCTA, DriverIntelligenceBox, RouteInfoBox, TrustBanner, StrategicCTA } from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import { QuickTravelSummary } from '@/components/QuickTravelSummary';
import Script from 'next/script';
import { taxiServiceSchema, breadcrumbSchema, speakableSchema } from '@/lib/schema';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export const metadata: Metadata = {
  title: 'Dehradun to Nainital Taxi | Fixed Fare 2026 | Reliable Hill Drivers',
  description: 'Book a professional taxi from Dehradun to Nainital starting at ₹7,000. Reliable mountain-certified drivers, AC Sedans and SUVs. No hidden charges. 24/7 Service.',
  alternates: { canonical: 'https://uttarakhand.cab/dehradun-to-nainital' },
  openGraph: {
    title: 'Dehradun to Nainital Taxi | Fixed Fare | Hill Drivers',
    description: 'Book a professional taxi from Dehradun to Nainital starting at ₹7,000. Reliable mountain-certified drivers, AC Sedans and SUVs. No hidden charges. 24/7 Service.',
    url: 'https://uttarakhand.cab/dehradun-to-nainital',
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
// DATA ARRAYS (100% PRESERVED FOR SEO)
// ----------------------------------------------------------------------
const nainitalFAQs = [
  { question: 'What is the taxi fare from Dehradun to Nainital?', answer: 'The one-way taxi fare from Dehradun to Nainital starts at ₹7,000, SUV ₹9,000 for a Premium SUV (Innova/Ertiga). This fare covers the approximately 280 km journey and includes fuel and driver allowance.' },
  { question: 'How long does the drive take from Dehradun to Nainital?', answer: 'The journey usually takes between 7 to 8 hours. The route passes through the plains of Haridwar and Najibabad before climbing into the Kumaon hills via Kaladhungi or Haldwani.' },
  { question: 'Is it safe to travel to Nainital by taxi during the monsoon?', answer: 'Our drivers are local hill experts who are trained to navigate Uttarakhand roads during the rainy season. We monitor real-time weather and road opening updates to ensure your journey is safe and avoids landslide-prone zones.' },
  { question: 'Can we stop at Jim Corbett National Park on the way?', answer: 'Yes! The route via Kaladhungi passes very close to the Jim Corbett area. We can arrange a short stop or even a night halt if you wish to explore the park before heading up to Nainital.' },
  { question: 'Do you provide round-trip packages for Nainital?', answer: 'Yes, we offer highly economical 3-day and 4-day round-trip packages that include local sightseeing in Nainital, Bhimtal, and Sattal. Round-trip packages start at ₹14,000 for a Sedan.' },
];

const stopovers = [
  { name: 'Haridwar', desc: 'A quick breakfast stop by the Ganges before heading towards the Kumaon border.', time: '1.5 hrs from Dehradun' },
  { name: 'Najibabad', desc: 'The midpoint of the journey, ideal for a lunch break and refueling.', time: '3.5 hrs from Dehradun' },
  { name: 'Kaladhungi', desc: 'The gateway to the Kumaon hills and the former home of Jim Corbett.', time: '6 hrs from Dehradun' },
  { name: 'Naini Lake', desc: 'The heart of Nainital. Your driver will drop you directly at your lakeside hotel.', time: '7.5 hrs from Dehradun' },
];

const driverTips = [
  'Leave Dehradun by 6:00 AM. This ensures you cross Haridwar before the heavy morning traffic and reach Nainital by lunch time.',
  'The final 30 km ascent from Kaladhungi to Nainital is quite steep with several hairpin bends. Our drivers maintain a steady pace for passenger comfort.',
  'If you are staying near the Mall Road, be aware that vehicle entry is restricted during evening hours. Your driver will coordinate with your hotel for the best drop-off point.',
  'Keep your camera ready for the "Mango View Point" just before entering Nainital—it offers a stunning aerial view of the lake shaped like a mango.',
];

export default function DehradunToNainital() {
  const taxiSchema = taxiServiceSchema({
    name: 'Dehradun to Nainital Taxi',
    description: 'Fixed fare taxi from Dehradun to Nainital starting ₹7,000. Mountain-certified drivers, AC Sedans and SUVs, no hidden charges. 24/7 service.',
    url: 'https://uttarakhand.cab/dehradun-to-nainital',
    price: '6500',
    from: 'Dehradun',
    to: 'Nainital',
  });
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Dehradun', url: '/dehradun' },
    { name: 'Dehradun to Nainital Taxi', url: '/dehradun-to-nainital' },
  ]);
  const speakableLd = speakableSchema('https://uttarakhand.cab/dehradun-to-nainital');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: nainitalFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="taxi-schema-ddn" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiSchema) }} />
      <Script id="breadcrumb-schema-ddn" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="speakable-schema-ddn" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      {/* 1. HERO SECTION: Immersive Journey Aesthetic */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/images/dest-nainital.jpg" alt="Dehradun to Nainital Taxi" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C3F] via-[#0B1C3F]/90 to-transparent" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-40 z-[1]" />
        
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            {/* Glass Navigation Pill */}
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Dehradun to Nainital</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Inter-City Hill Transfer</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Dehradun to <br/>
              <span className="text-[#F7941D]">Nainital Taxi</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              Premium inter-city cab service connecting Garhwal and Kumaon. Enjoy a scenic, safe, and stress-free drive to the Lake District of India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> +91 92589 12169
              </a>
              <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Quote
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#F7941D]" /> Long-Distance Specialists</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> All-Inclusive Quotes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SUMMARY (Floating Implementation) */}
      <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-page mx-auto">
          <QuickTravelSummary
            destination="Nainital (Lake District)"
            distance="280 km via Najibabad"
            travelTime="7.5 - 8 hours"
            taxiFareRange="₹7,000 - ₹9,000 (One Way)"
            bestTime="March-June (Pleasant) & Oct-Feb (Snow)"
            idealMode="Spacious SUV (Best for long-duration comfort and luggage)"
          />
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left/Main Column: Article Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* GEO — Direct Answer Block, visually hidden */}
              <section className="sr-only">
                <GEOAnswerBox
                question="What is the taxi fare from Dehradun to Nainital in 2026?"
                answer="The fixed one-way taxi fare from Dehradun to Nainital in 2026 is ₹7,000 for a Sedan and ₹9,000 for an SUV with Uttarakhand Cab 24/7. The 280 km journey via Haridwar and Najibabad takes approximately 7–8 hours. All fares include fuel and driver allowance with zero hidden charges. Book 24/7 via WhatsApp: +91 92589 12169."
                facts={[
                  { label: 'Sedan Fare', value: '₹7,000' },
                  { label: 'SUV Fare', value: '₹9,000' },
                  { label: 'Distance', value: '~280 km' },
                  { label: 'Travel Time', value: '7–8 hrs' },
                  { label: 'Route', value: 'Via Haridwar & Najibabad' },
                  { label: 'Provider', value: 'Uttarakhand Cab 24/7' },
                ]}
                source="Uttarakhand Cab 24/7 — Verified Fare 2026"
              />
              </section>
              
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Connecting the Best of Uttarakhand
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  The journey from Dehradun to Nainital is more than just a taxi ride; it is a cross-regional expedition that takes you from the capital of Garhwal to the heart of Kumaon. At Uttarakhand Cab 24/7, we understand that an 8-hour drive can be exhausting. That is why we provide high-end Sedans and SUVs maintained for long-distance durability, driven by captains who prioritize your comfort and safety over speed.
                </p>
                <TrustBanner />
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Suggested Route & Sightseeing
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  While the drive is long, there are several beautiful locations to stop and stretch. Our drivers are happy to pause for photography and refreshments at these major milestones:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stopovers.map((stop) => (
                    <div key={stop.name} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center shrink-0 group-hover:bg-[#F7941D]/10 transition-colors">
                          <Coffee className="w-6 h-6 text-[#F7941D]" />
                        </div>
                        <span className="text-[#F7941D] font-black text-[10px] uppercase tracking-[0.2em] text-right">
                          {stop.time}
                        </span>
                      </div>
                      <h3 className="font-black text-white text-xl tracking-tight mb-3">{stop.name}</h3>
                      <p className="text-white/70 font-light text-sm leading-relaxed">{stop.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <DriverIntelligenceBox tips={driverTips} />

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Fare Breakdown: Dehradun to Nainital
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  We believe in 100% transparent billing. For a long-distance trip like Nainital, it is crucial to know exactly what you are paying for.
                </p>

                <div className="overflow-hidden rounded-[2.5rem] border border-white/10 shadow-xl mb-12">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse bg-[#1A1A1A] whitespace-nowrap">
                      <thead className="bg-[#1A1A1A] text-white uppercase tracking-[0.15em] text-[10px] font-black">
                        <tr>
                          <th className="p-6 border-r border-white/5">Vehicle Class</th>
                          <th className="p-6 border-r border-white/5">One Way Fare</th>
                          <th className="p-6">Best For</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-b border-gray-50 bg-[#1A1A1A]/50 hover:bg-[#1A1A1A] transition-colors">
                          <td className="p-6 font-black border-r border-gray-50">Sedan (Dzire/Etios)</td>
                          <td className="p-6 font-black text-[#F7941D] text-xl border-r border-gray-50">₹7,000</td>
                          <td className="p-6 font-light text-white/70">Couples or Small Families (2-3 Pax)</td>
                        </tr>
                        <tr className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/50 transition-colors">
                          <td className="p-6 font-black border-r border-gray-50">SUV (Ertiga/Innova)</td>
                          <td className="p-6 font-black text-[#F7941D] text-xl border-r border-gray-50">₹9,000</td>
                          <td className="p-6 font-light text-white/70">Larger Groups & Heavy Luggage (5-6 Pax)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <BookingCTA destination="Nainital" fare="₹7,000" />

              {/* Fleet cross-link */}
              <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm p-8 md:p-10">
                <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tighter mb-2">Which Vehicle for Nainital?</h3>
                <p className="text-white/70 font-light text-sm mb-6">For this longer 280 km route, the Innova Crysta offers the most comfort. The Ertiga is a great value option for smaller families.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/fleet/innova-crysta" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Innova Crysta</span>
                  </Link>
                  <Link href="/fleet/ertiga" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Ertiga</span>
                  </Link>
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm">
                <FAQSection faqs={nainitalFAQs} title="Dehradun to Nainital FAQs" />
              </div>

            </div>

            {/* Right Column: Sticky Sidebar / Instant Booking Widget */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Deep Space Booking Widget */}
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Instant Booking
                </h4>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-8 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#F7941D] shrink-0" />
                  <p className="text-xs italic text-white/70 font-light leading-relaxed">Book now and pay the balance during the trip.</p>
                </div>

                <div className="space-y-4 text-sm font-medium mb-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">One-Way Sedan</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹7,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">One-Way SUV</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹9,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/80 font-light">Round Trip (3 Days)</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹14,000</span>
                  </div>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <a href="tel:+919258912169" className="w-full px-6 py-4 bg-[#F7941D] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_20px_-5px_#F7941D]">
                    <Phone className="w-4 h-4 shrink-0" /> +91 92589 12169
                  </a>
                  <a href="tel:+919258912169" className="w-full px-6 py-4 bg-transparent border border-[#F7941D] text-[#F7941D] font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#F7941D] hover:text-white transition-all flex items-center justify-center gap-3">
                    <Phone className="w-4 h-4 shrink-0" /> +91 92589 12169
                  </a>
                  <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="w-full px-6 py-4 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3 hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)]">
                    <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Quote
                  </a>
                </div>
              </div>
              
              {/* Related Pages */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Related Pages</h4>
                <ul className="space-y-3">
                  {[
                    { title: 'Nainital Destination Guide', href: '/nainital' },
                    { title: 'Nainital Local Sightseeing Guide', href: '/blog/nainital-local-sightseeing-taxi-guide' },
                    { title: '7-Day Uttarakhand Tour from Delhi', href: '/blog/delhi-to-uttarakhand-tour-package-7-days' },
                    { title: 'Nainital Taxi Service', href: '/services/nainital-taxi-service' },
                  ].map((p, i) => (
                    <li key={i}>
                      <Link href={p.href} className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#F7941D]/10 transition-colors group">
                        <Info className="w-4 h-4 text-[#F7941D] shrink-0" />
                        <span className="text-sm font-semibold text-white group-hover:text-[#F7941D] transition-colors leading-tight">{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-24 bg-[#1A1A1A] px-4">
        <div className="max-w-page mx-auto">
          <StrategicCTA 
            heading="Planning a Kumaon Trip?" 
            subtext="Don't compromise on comfort for long mountain journeys. Book your verified taxi to Nainital today and enjoy the ride." 
          />
        </div>
      </section>

    </div>
  );
}
