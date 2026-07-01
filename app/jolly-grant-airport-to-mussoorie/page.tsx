import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageCircle, Plane, ShieldCheck, Luggage, Car, Info } from 'lucide-react';
import { BookingCTA, DriverIntelligenceBox, RouteInfoBox, TrustBanner, StrategicCTA } from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import { QuickTravelSummary } from '@/components/QuickTravelSummary';
import { taxiServiceSchema, breadcrumbSchema, speakableSchema } from '@/lib/schema';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export const metadata: Metadata = {
  title: 'Jolly Grant Airport to Mussoorie Taxi | Fixed Fare & Flight Tracking',
  description: 'Book a direct taxi from Dehradun Airport (Jolly Grant) to Mussoorie starting at ₹3,000. Zero hidden fees, active flight tracking, and verified mountain drivers.',
  alternates: { canonical: 'https://uttarakhand.cab/jolly-grant-airport-to-mussoorie' },
  openGraph: {
    title: 'Jolly Grant Airport to Mussoorie Taxi | Fixed Fare',
    description: 'Book a direct taxi from Dehradun Airport (Jolly Grant) to Mussoorie starting at ₹3,000. Zero hidden fees, active flight tracking, and verified mountain drivers.',
    url: 'https://uttarakhand.cab/jolly-grant-airport-to-mussoorie',
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
const airportFAQs = [
  { question: 'How far is Mussoorie from Jolly Grant Airport?', answer: 'The distance from Dehradun Airport (Jolly Grant) to Mussoorie is approximately 60 kilometers. The drive usually takes between 2 to 2.5 hours, depending on traffic inside Dehradun city and on the Rajpur Road ascent.' },
  { question: 'What happens if my flight to Dehradun is delayed?', answer: 'We actively track your flight status! If your Indigo or Vistara flight is delayed, your assigned driver will adjust their arrival time and wait for you at the airport at no extra charge.' },
  { question: 'Is it better to book in advance or use the airport prepaid booth?', answer: 'While there is a taxi booth at the airport, wait times can exceed an hour during the peak summer tourist season or when multiple flights land at once. Pre-booking with us guarantees a driver is waiting for you outside the terminal the moment you land.' },
  { question: 'How much luggage can fit in the taxi?', answer: 'A Sedan (Dzire/Etios) comfortably holds 2 large suitcases and 1-2 small soft bags in the boot. If you are a group of 4+ or carrying heavy winter luggage, we highly recommend booking an SUV (Innova/Ertiga) which has a roof carrier.' },
  { question: 'Can we stop for food or sightseeing on the way to Mussoorie?', answer: 'Yes! Your driver can stop at popular points in Dehradun (like Rajpur Road cafes or the Malsi Deer Park) for a quick break. Just let us know your preferences when booking.' },
];

const driverTips = [
  'Turn on your phone as soon as you land. Your assigned driver will message you on WhatsApp with their exact parking location outside the terminal.',
  'If you suffer from motion sickness, ask the driver to stop for 5 minutes at the Maggi point in Shiv Mandir before the steep climb to Mussoorie begins.',
  'Mall Road in Mussoorie has strict vehicle entry restrictions. Your driver will drop you as close to your hotel as legally permitted, or directly at the hotel if they have private parking.',
];

export default function AirportToMussoorie() {
  const taxiSchema = taxiServiceSchema({
    name: 'Jolly Grant Airport to Mussoorie Taxi',
    description: 'Direct fixed fare taxi from Dehradun Airport (Jolly Grant) to Mussoorie starting ₹3,000. Active flight tracking, zero hidden fees, verified mountain drivers.',
    url: 'https://uttarakhand.cab/jolly-grant-airport-to-mussoorie',
    price: '2500',
    from: 'Jolly Grant Airport, Dehradun',
    to: 'Mussoorie',
  });
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Jolly Grant Airport', url: '/services/jolly-grant-airport-taxi-service' },
    { name: 'Mussoorie', url: '/mussoorie' },
    { name: 'Airport to Mussoorie Taxi', url: '/jolly-grant-airport-to-mussoorie' },
  ]);
  const speakableLd = speakableSchema('https://uttarakhand.cab/jolly-grant-airport-to-mussoorie');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: airportFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/images/dest-mussoorie.jpg" alt="Airport to Mussoorie Taxi" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-40 z-[1]" />
        
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            {/* Glass Navigation Pill */}
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Airport Pickups</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Direct Airport Transfer</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Jolly Grant to <br/>
              <span className="text-[#F7941D]">Mussoorie</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              Skip the prepaid taxi lines. Step off your flight and straight into a sanitized, pre-booked cab. Fixed fares to Mussoorie starting at ₹3,000.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Call to Book
              </a>
              <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Quote
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
              <span className="flex items-center gap-2"><Plane className="w-4 h-4 text-[#F7941D]" /> Free Flight Tracking</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#F7941D]" /> Zero Wait Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SUMMARY (Floating Implementation) */}
      <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-page mx-auto">
          <QuickTravelSummary
            destination="Mussoorie (Queen of Hills)"
            distance="60 km from Dehradun Airport"
            travelTime="2 - 2.5 hours"
            taxiFareRange="₹3,000 - ₹4,000"
            bestTime="Year-round (Snow in Dec-Jan)"
            idealMode="Private Taxi (Direct from arrival gate to your hotel)"
          />
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          
          <div className="mb-12">
             <RouteInfoBox from="Jolly Grant Airport" to="Mussoorie" distance="60 km" time="2 hrs" fare="₹3,000" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left/Main Column: Article Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* GEO — Direct Answer Block, visually hidden */}
              <section className="sr-only">
                <GEOAnswerBox
                question="What is the taxi fare from Jolly Grant Airport to Mussoorie?"
                answer="The taxi fare from Jolly Grant Airport (Dehradun) to Mussoorie is ₹3,000 for a Sedan and ₹4,000 for an SUV with Uttarakhand Cab 24/7. The 60 km journey takes approximately 2 hours via Rajpur Road. Our drivers wait at the arrival gate with a name board — no prepaid booth queues. Available 24/7 with flight-tracked pickups. Book via WhatsApp: +91 92589 12169."
                facts={[
                  { label: 'Sedan Fare', value: '₹3,000' },
                  { label: 'SUV Fare', value: '₹4,000' },
                  { label: 'Distance', value: '~60 km' },
                  { label: 'Travel Time', value: '~2 hrs' },
                  { label: 'Pickup', value: 'Meet & Greet at Arrival Gate' },
                  { label: 'Availability', value: '24/7, Flight-Tracked' },
                ]}
                source="Uttarakhand Cab 24/7 — Airport Transfer Fare 2026"
              />
              </section>
              
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Seamless Airport Transfers to Mussoorie
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  Dehradun&apos;s Jolly Grant Airport (DED) is the primary gateway to the Garhwal Himalayas. Landing here means you are just 60 kilometers away from the stunning colonial hill station of Mussoorie. However, relying on the airport prepaid booth during peak tourist season often results in long queues and delayed starts to your vacation. Booking a private taxi with Uttarakhand Cab 24/7 ensures a driver is waiting for you the exact moment you step out of the terminal.
                </p>
                <TrustBanner />
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Why Pre-Book Your Airport Taxi?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:bg-[#F7941D]/10 transition-colors">
                      <Plane className="w-6 h-6 text-[#F7941D]" />
                    </div>
                    <h3 className="font-black text-white text-xl tracking-tight mb-3">Active Flight Tracking</h3>
                    <p className="text-white/70 font-light text-sm leading-relaxed">
                      Flights get delayed. We monitor your flight&apos;s live status. If your arrival is pushed back, your driver will automatically adjust their schedule and wait for you.
                    </p>
                  </div>
                  
                  <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:bg-[#F7941D]/10 transition-colors">
                      <Luggage className="w-6 h-6 text-[#F7941D]" />
                    </div>
                    <h3 className="font-black text-white text-xl tracking-tight mb-3">Guaranteed Luggage Space</h3>
                    <p className="text-white/70 font-light text-sm leading-relaxed">
                      Don&apos;t risk getting a small hatchback at the prepaid counter. When you pre-book, we guarantee a spacious Sedan with an empty boot, or an SUV with a roof carrier.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  The Route to Mussoorie
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  The drive from Jolly Grant is beautiful. Your taxi will bypass the heavy city traffic by taking the Thano forest road or the standard highway into Dehradun city, cruising past the upscale cafes of Rajpur Road, before beginning the winding, scenic ascent up to Mussoorie. On a clear day, you can see the entire Doon Valley sprawling below as you climb.
                </p>
              </div>

              <DriverIntelligenceBox tips={driverTips} />

              <BookingCTA destination="Mussoorie" fare="₹3,000" />

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-12">
                <FAQSection faqs={airportFAQs} title="Airport Transfer FAQs" />
              </div>

            </div>

            {/* Right Column: Sticky Sidebar / Instant Booking Widget */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Deep Space Booking Widget */}
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Airport Taxi Fares
                </h4>
                
                <div className="space-y-4 text-sm font-medium mb-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Sedan (Dzire/Etios)</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹3,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">SUV (Innova/Ertiga)</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹3,500</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/80 font-light">Tempo Traveller</span>
                    <span className="text-[#F7941D] font-black text-sm tracking-tight uppercase tracking-widest">On Request</span>
                  </div>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <a href="tel:+919258912169" className="w-full px-6 py-4 bg-[#F7941D] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_20px_-5px_#F7941D]">
                    <Phone className="w-4 h-4 shrink-0" /> Call: +91 92589 12169
                  </a>
                  <a href="tel:+919258912169" className="w-full px-6 py-4 bg-transparent border border-[#F7941D] text-[#F7941D] font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#F7941D] hover:text-white transition-all flex items-center justify-center gap-3">
                    <Phone className="w-4 h-4 shrink-0" /> Call: +91 92589 12169
                  </a>
                  <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="w-full px-6 py-4 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3 hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)]">
                    <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Us
                  </a>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mt-6 flex items-start gap-2">
                  <Info className="w-4 h-4 text-white/50 shrink-0" />
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">Parking and airport entry fees included.</p>
                </div>
              </div>

              {/* Other Routes Widget */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Other Airport Routes</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Airport to Rishikesh', icon: MapPin, link: '/services/jolly-grant-airport-taxi-service' },
                    { name: 'Airport to Dehradun', icon: MapPin, link: '/dehradun' },
                    { name: 'Airport to Haridwar', icon: MapPin, link: '/haridwar' },
                  ].map((d, i) => (
                    <li key={i} className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                      <Link href={d.link} className="flex items-center gap-3 w-full">
                        <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                           <d.icon className="w-4 h-4 text-[#F7941D]" />
                        </div>
                        <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">{d.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* From Our Blog */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">From Our Blog</h4>
                <ul className="space-y-3">
                  {[
                    { title: 'Mussoorie Taxi Fare Guide', href: '/blog/dehradun-to-mussoorie-taxi-fare' },
                    { title: 'Best Time to Visit Mussoorie', href: '/blog/best-time-to-visit-mussoorie' },
                    { title: 'Airport to Rishikesh Taxi Fare', href: '/blog/dehradun-airport-to-rishikesh-taxi-fare' },
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
            heading="Landing Soon?" 
            subtext="Send us your flight details on WhatsApp. Your driver will be waiting at the arrivals gate with a clean taxi." 
          />
        </div>
      </section>

    </div>
  );
}
