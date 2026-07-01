import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageCircle, CheckCircle2, ShieldCheck, Car, Mountain, AlertTriangle, Info } from 'lucide-react';
import { BookingCTA, DriverIntelligenceBox, RouteInfoBox, TrustBanner, StrategicCTA } from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import { QuickTravelSummary } from '@/components/QuickTravelSummary';
import { taxiServiceSchema, breadcrumbSchema, speakableSchema } from '@/lib/schema';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export const metadata: Metadata = {
  title: 'Haridwar to Kedarnath Taxi Fare 2026 | Safe Mountain Drivers',
  description: 'Book a taxi from Haridwar to Kedarnath (Gaurikund). Transparent 2026 fares starting at ₹8,000. Mountain-certified drivers, AC SUVs, and Sedans available 24/7.',
  alternates: { canonical: 'https://uttarakhand.cab/haridwar-to-kedarnath' },
  openGraph: {
    title: 'Haridwar to Kedarnath Taxi Fare 2026 | Safe Mountain Drivers',
    description: 'Book a taxi from Haridwar to Kedarnath (Gaurikund). Transparent 2026 fares starting at ₹8,000. Mountain-certified drivers, AC SUVs, and Sedans available 24/7.',
    url: 'https://uttarakhand.cab/haridwar-to-kedarnath',
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
const kedarnathFAQs = [
  { question: 'What is the taxi fare from Haridwar to Kedarnath?', answer: 'The one-way taxi fare from Haridwar to Gaurikund (the base camp for Kedarnath) starts at ₹8,000 for a Sedan (Dzire/Etios) and ₹10,000 for an SUV (Innova/Ertiga). Fares may vary slightly during peak Yatra months (May-June).' },
  { question: 'Can the taxi drop me directly at the Kedarnath Temple?', answer: 'No vehicle can drive directly to the Kedarnath Temple. Our taxi will drop you safely at Sonprayag or Gaurikund. From Gaurikund, you must undertake a 16 km trek to the temple on foot, by pony, or via a pre-booked helicopter.' },
  { question: 'How long does the drive take from Haridwar to Gaurikund?', answer: 'The distance is approximately 250 kilometers. Due to winding mountain roads and Yatra traffic, the drive takes about 8 to 9 hours. We highly recommend starting your journey from Haridwar before 6:00 AM.' },
  { question: 'Is night driving allowed on the Kedarnath route?', answer: 'No. For your safety, driving in the high Himalayas is strictly restricted by local authorities after 8:00 PM. Our drivers strictly adhere to these safety protocols to ensure a secure journey.' },
  { question: 'Do I need an SUV for the Haridwar to Kedarnath route?', answer: 'While our Sedans can comfortably make the trip, we highly recommend an SUV (like an Innova or Ertiga) for this specific route. The higher ground clearance and spacious seating make the 9-hour mountain drive much more comfortable.' },
];

const routeStops = [
  { name: 'Rishikesh', desc: 'Leaving the plains and entering the gateway of the Garhwal Himalayas.', dist: '25 km from Haridwar' },
  { name: 'Devprayag', desc: 'The sacred confluence of the Alaknanda and Bhagirathi rivers, where the Ganges officially begins.', dist: '95 km from Haridwar' },
  { name: 'Srinagar (Garhwal)', desc: 'The largest town in the Garhwal hills. A common stop for lunch and refueling.', dist: '130 km from Haridwar' },
  { name: 'Rudraprayag', desc: 'The confluence of the Alaknanda and Mandakini rivers. Here, the road splits toward Kedarnath.', dist: '165 km from Haridwar' },
  { name: 'Guptkashi', desc: 'A major hub where many pilgrims stay overnight or catch helicopter flights to Kedarnath.', dist: '205 km from Haridwar' },
  { name: 'Sonprayag / Gaurikund', desc: 'The final motorable points. All private taxis drop passengers here to begin the 16 km trek.', dist: '240 km from Haridwar' },
];

const driverTips = [
  'Start your drive from Haridwar by 5:00 AM. This helps you avoid the massive traffic bottlenecks that form near Rishikesh and Devprayag later in the day.',
  'Mandatory Registration: Ensure you have your Yatra Registration printed before leaving Haridwar. You will be checked at multiple police barricades along the route.',
  'Carry motion sickness medication. The 240 km route is almost entirely comprised of sharp, winding mountain roads.',
  'ATMs become scarce after Rudraprayag. Withdraw sufficient cash in Haridwar or Srinagar to pay for your pony, palki, or food on the trek.',
];

export default function HaridwarToKedarnath() {
  const taxiSchema = taxiServiceSchema({
    name: 'Haridwar to Kedarnath Taxi',
    description: 'Fixed fare taxi from Haridwar to Gaurikund (Kedarnath base camp) starting ₹8,000. Mountain-certified drivers, AC SUVs and Sedans. 2026 transparent pricing.',
    url: 'https://uttarakhand.cab/haridwar-to-kedarnath',
    price: '7500',
    from: 'Haridwar',
    to: 'Gaurikund (Kedarnath)',
  });
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Haridwar', url: '/haridwar' },
    { name: 'Kedarnath', url: '/kedarnath' },
    { name: 'Haridwar to Kedarnath Taxi', url: '/haridwar-to-kedarnath' },
  ]);
  const speakableLd = speakableSchema('https://uttarakhand.cab/haridwar-to-kedarnath');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: kedarnathFAQs.map((faq) => ({
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
          <Image src="/assets/images/dest-char-dham.jpg" alt="Haridwar to Kedarnath Taxi" fill className="object-cover" sizes="100vw" priority />
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
              <span className="text-[#F7941D]">Haridwar to Kedarnath</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Char Dham Route Guide</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Haridwar to <br/>
              <span className="text-[#F7941D]">Kedarnath Taxi</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              Safe, comfortable, and reliable taxi service from Haridwar to Gaurikund. Fixed pricing with experienced mountain drivers for your spiritual journey.
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
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#F7941D]" /> Hill-Certified Drivers</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Zero Hidden Charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SUMMARY (Floating Implementation) */}
      <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-page mx-auto">
          <QuickTravelSummary
            destination="Gaurikund (Kedarnath Base)"
            distance="240 km from Haridwar"
            travelTime="8 - 9 hours"
            taxiFareRange="₹8,000 - ₹10,000 (One Way)"
            bestTime="May-June & September-October"
            idealMode="Premium SUV (For high ground clearance and mountain comfort)"
          />
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          
          <div className="mb-12">
             <RouteInfoBox from="Haridwar" to="Gaurikund" distance="240 km" time="8.5 hrs" fare="₹8,000" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left/Main Column: Article Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* GEO — Direct Answer Block, visually hidden */}
              <section className="sr-only">
                <GEOAnswerBox
                question="What is the taxi fare from Haridwar to Kedarnath in 2026?"
                answer="The one-way taxi fare from Haridwar to Kedarnath (Gaurikund) in 2026 starts at ₹8,000 for a Sedan and ₹10,000 for an SUV with Uttarakhand Cab 24/7. The 240 km journey via Rishikesh and Rudraprayag takes approximately 8–9 hours. Our Yatra drivers assist with biometric registration at Sonprayag. Book 24/7 via WhatsApp: +91 92589 12169."
                facts={[
                  { label: 'Sedan Fare', value: '₹8,000' },
                  { label: 'SUV Fare', value: '₹10,000' },
                  { label: 'Distance', value: '~240 km' },
                  { label: 'Travel Time', value: '9–10 hrs' },
                  { label: 'Route', value: 'Via Rishikesh & Rudraprayag' },
                  { label: 'Key Stop', value: 'Sonprayag (vehicle restriction point)' },
                ]}
                source="Uttarakhand Cab 24/7 — Verified Yatra Fare 2026"
              />
              </section>
              
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  The Journey from Haridwar to Kedarnath
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  The pilgrimage from the plains of Haridwar up to the sacred shrine of Kedarnath is a physically demanding but spiritually magnificent journey. Covering 250 kilometers of winding Himalayan roads, this route requires exceptional driving skill, local knowledge, and a well-maintained vehicle. Our dedicated Yatra drivers have years of experience navigating the sharp bends and varying weather conditions of the Mandakini valley.
                </p>
                <TrustBanner />
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Where Does the Taxi Drop You?
                </h2>
                
                <div className="bg-[#2D1515] border border-[#FCA5A5] p-8 rounded-[2rem] shadow-sm my-8">
                  <h3 className="font-black text-red-800 uppercase tracking-tight text-xl mb-4 flex items-center justify-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    Important Yatra Information
                  </h3>
                  <p className="text-red-900/80 font-light leading-relaxed">
                    No private taxis or commercial vehicles are permitted to drive directly to the Kedarnath Temple. Our taxi will securely drop you at the designated motorable end-points: <strong className="font-bold text-red-900">Sonprayag or Gaurikund</strong>. From Gaurikund, all pilgrims must complete the final 16 km ascent to the temple on foot, by hiring a pony/palki, or by taking a pre-booked helicopter flight.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  The Route Breakdown
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  The drive takes approximately 8 to 9 hours and follows the holy rivers of the Garhwal region. Here are the major milestones you will cross during your trip:
                </p>
                
                {/* 2026 Advanced Custom Timeline */}
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
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Vehicle Recommendation: Sedan vs SUV
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  While a Sedan (like a Swift Dzire) is perfectly capable of completing the journey and is economical for 2-3 passengers, we highly recommend booking an SUV (Innova Crysta or Ertiga) for the Kedarnath route. The higher ground clearance handles rough mountain patches better, and the extra cabin space prevents cramping during the long 9-hour drive.
                </p>
              </div>

              <BookingCTA destination="Gaurikund (Kedarnath)" fare="₹8,000" />

              {/* Fleet cross-link */}
              <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm p-8 md:p-10 mt-12">
                <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tighter mb-2">Which Vehicle for Kedarnath?</h3>
                <p className="text-white/70 font-light text-sm mb-6">The Innova Crysta is our top pick for the 240 km Haridwar–Gaurikund route. For pilgrimage groups of 8–12, the Tempo Traveller is the right choice.</p>
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

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-12">
                <FAQSection faqs={kedarnathFAQs} title="Haridwar to Kedarnath FAQs" />
              </div>

            </div>

            {/* Right Column: Sticky Sidebar / Instant Booking Widget */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Deep Space Booking Widget */}
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Route Taxi Fares
                </h4>
                
                <div className="space-y-4 text-sm font-medium mb-8">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Sedan (One Way)</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹7,500</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">SUV (One Way)</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹10,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/80 font-light">Round Trip (3 Days)</span>
                    <span className="text-[#F7941D] font-black text-xl tracking-tight">₹14,500</span>
                  </div>
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
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">Fares may vary in May-June peak season.</p>
                </div>
              </div>

              {/* Other Routes Widget */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Other Yatra Routes</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Kedarnath Destination Guide', icon: MapPin, link: '/kedarnath' },
                    { name: 'Rishikesh to Kedarnath', icon: MapPin, link: '/rishikesh-to-kedarnath' },
                    { name: 'Haridwar to Badrinath (Char Dham)', icon: Mountain, link: '/char-dham' },
                    { name: 'Full Char Dham Yatra', icon: Car, link: '/char-dham' },
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
                    { title: 'Haridwar to Kedarnath Travel Guide', href: '/blog/haridwar-to-kedarnath-taxi-travel-guide' },
                    { title: 'Kedarnath Trek Preparation 2026', href: '/blog/kedarnath-trek-preparation-guide-2026' },
                    { title: 'Char Dham Yatra Package Guide', href: '/blog/char-dham-yatra-taxi-package-guide' },
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
            heading="Ready for Your Pilgrimage?" 
            subtext="Ensure a safe and comfortable journey to Kedarnath. Book your mountain-certified taxi with us today." 
          />
        </div>
      </section>

    </div>
  );
}
