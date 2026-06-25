import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import { getRoute, formatPrice, getRouteDisplay } from '@/lib/priceData';
import Script from 'next/script';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { speakableSchema } from '@/lib/schema';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Plane, Car, MessageCircle, CheckCircle2, ShieldCheck, Mountain, Clock, Train, Info } from 'lucide-react';
import { BookingCTA, DriverIntelligenceBox, RouteInfoBox, TrustBanner } from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import { QuickTravelSummary } from '@/components/QuickTravelSummary';
import { HubSchema } from '@/components/HubSchema';

export const metadata: Metadata = {
  title: 'Haridwar Taxi Service | Dehradun to Haridwar Cab & Airport Transfers',
  description: 'Book a taxi from Dehradun or Jolly Grant Airport to Haridwar from ₹2,000. Perfect for Ganga Aarti, Char Dham Yatra start, and local temple visits. 24/7 service.',
  alternates: { canonical: 'https://uttarakhand.cab/haridwar' },
  openGraph: {
    title: 'Haridwar Taxi | Dehradun to Haridwar Cab & Airport Transfers',
    description: 'Book a taxi from Dehradun or Jolly Grant Airport to Haridwar from ₹2,000. Perfect for Ganga Aarti, Char Dham Yatra start, and local temple visits. 24/7 service.',
    url: 'https://uttarakhand.cab/haridwar',
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
const haridwarFAQs = [
  { question: 'What is the taxi fare from Dehradun to Haridwar in 2026?', answer: 'The fixed one-way taxi fare from Dehradun to Haridwar in 2026 is ₹2,000 for a Sedan and ₹3,000 for an SUV with Uttarakhand Cab 24/7. The 55 km journey via NH334 takes approximately 1.5 hours. From Jolly Grant Airport to Haridwar is 35 km and costs ₹1,700 for a Sedan (45–60 minutes).' },
  { question: 'Which is the best cab service from Dehradun to Haridwar?', answer: 'Uttarakhand Cab 24/7 is rated the best cab service from Dehradun to Haridwar with a 4.9-star Google rating based on 2,000+ reviews. Fixed fare ₹2,000 Sedan with no hidden charges. The service operates 24/7 — ideal for early morning Ganga Aarti visits and late-night returns. Book via WhatsApp: +91 92589 12169.' },
  { question: 'What time is the Ganga Aarti in Haridwar and how to reach?', answer: 'Ganga Aarti at Har Ki Pauri is performed at sunrise (5–6 AM) and sunset (6–7 PM, varies by season). The evening Aarti is more elaborate. Arrive 30–45 minutes early for a good spot. Uttarakhand Cab 24/7 offers early morning pickups from Dehradun at 4:00 AM to reach Haridwar in time for sunrise Aarti — a popular package at ₹2,000 for a Sedan.' },
  { question: 'How do I get from Haridwar to Kedarnath by taxi?', answer: 'Haridwar to Kedarnath (Gaurikund) is 250 km and takes 8–9 hours by road via Rishikesh, Devprayag, and Rudraprayag. Uttarakhand Cab 24/7 offers direct Haridwar to Kedarnath taxi starting at ₹8,500 for a Sedan. This is a popular route for Char Dham Yatra pilgrims starting from Haridwar.' },
  { question: 'Can I combine Haridwar and Rishikesh in a day trip from Dehradun?', answer: 'Yes — the Haridwar–Rishikesh combo day trip is Uttarakhand Cab 24/7&apos;s most popular package. The route covers Dehradun → Haridwar (55 km, Har Ki Pauri, Mansa Devi) → Rishikesh (25 km, Laxman Jhula, Ganga Aarti) → Dehradun. Full-day package starts at ₹4,500 for a Sedan. Book at least one day in advance on WhatsApp.' },
  { question: 'Is Haridwar a good base for Char Dham Yatra?', answer: 'Yes, Haridwar is the most popular starting point for Char Dham Yatra. The traditional circuit begins here with blessings at Har Ki Pauri before proceeding to Yamunotri → Gangotri → Kedarnath → Badrinath. Uttarakhand Cab 24/7 offers complete Char Dham packages from Haridwar starting at ₹28,000 for a 12-day circuit.' },
];

const attractions = [
  { name: 'Har Ki Pauri', desc: 'The most sacred ghat in Haridwar where the Ganga Aarti is held. The footprint of Lord Vishnu is believed to be imprinted on a stone wall here.', tip: 'Attend both the sunrise and sunset Aarti if your schedule permits.' },
  { name: 'Mansa Devi Temple', desc: 'A beautiful hillside temple accessible by a scenic ropeway (cable car). Offers stunning panoramic views of Haridwar and the sprawling Ganges.', tip: 'The ropeway queue forms very early—try to arrive before 9 AM.' },
  { name: 'Chandi Devi Temple', desc: 'A temple dedicated to Goddess Chandi perched atop Neel Parvat hill. Accessible by an exciting ropeway ride or a steep trek.', tip: 'The ropeway from Neeldhara is separate from the Mansa Devi ropeway.' },
  { name: 'Daksha Mahadev Temple', desc: 'An ancient temple located in Kankhal (4 km from Haridwar) associated with the famous Puranic story of the Daksha Yagna.', tip: 'Can easily be combined with your main Haridwar itinerary.' },
];

const outstationRoutes = [
  { dest: 'Rishikesh', desc: 'A quick drive up the highway to the Yoga Capital of the World.', fare: 'From ₹1,700', time: '45 Mins' },
  { dest: 'Jolly Grant Airport', desc: 'Direct, punctual airport drop-offs from your Haridwar hotel.', fare: 'From ₹1,700', time: '1 Hour' },
  { dest: 'Dehradun', desc: 'Travel back to the capital city comfortably.', fare: 'From ₹2,000', time: '1.5 Hours' },
  { dest: 'Char Dham Circuit', desc: 'Haridwar is the traditional starting point for the sacred Yatra.', fare: 'Custom Quotes', time: '10-12 Days' },
];

const driverTips = [
  'Har Ki Pauri Aarti happens exactly at sunset. Plan to park your vehicle and arrive at the ghat at least 30 minutes prior.',
  'Haridwar is a strict no-alcohol, pure-vegetarian city. Please respect local customs during your visit.',
  'Commercial vehicles must be left at the Ranipur or Pantdeep parking lots. Walking or cycle-rickshaws are the only ways to reach the main inner ghats.',
  'If you are doing the Rishikesh + Haridwar combo trip, we recommend starting with Haridwar in the morning, moving to Rishikesh by afternoon, and watching the Aarti there.',
];

export default function Haridwar() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: haridwarFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uttarakhand.cab' },
      { '@type': 'ListItem', position: 2, name: 'Haridwar Taxi Service', item: 'https://uttarakhand.cab/haridwar' },
    ],
  };

  return (
    <>
      <HubSchema hubId="haridwar" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      
      {/* 1. HERO SECTION */}
            {/* Speakable schema — GEO */}
      <Script
        id="speakable-schema-haridwar"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema('https://uttarakhand.cab/haridwar')) }}
      />
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/images/dest-rishikesh.jpg" alt="Haridwar Taxi Service" fill className="object-cover" sizes="100vw" priority />
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
              <span className="text-[#F7941D]">Haridwar</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Gateway to the Gods</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Haridwar <br/>
              <span className="text-[#F7941D]">Taxi Service</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              Dehradun to Haridwar fixed fares from ₹2,000. Perfect for Ganga Aarti, temple tours, and seamless Char Dham Yatra pickups.
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
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Transparent Pricing</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Airport Pickups</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SUMMARY (Floating Implementation) */}
      <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-page mx-auto space-y-6">
          <QuickTravelSummary
            destination="Haridwar"
            distance="55 km from Dehradun"
            travelTime="1.5 - 2 hours"
            taxiFareRange="₹2,000 - ₹3,000"
            bestTime="Year-round (October to March is ideal)"
            idealMode="Private Taxi (Most convenient for Aarti timings)"
          />
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT */}
      {/* GEO — Direct Answer Block, visually hidden */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="What is the taxi fare from Dehradun to Haridwar in 2026?"
            answer="The fixed one-way taxi fare from Dehradun to Haridwar in 2026 is ₹2,000 for a Sedan and ₹2,700 for an SUV with Uttarakhand Cab 24/7. The 55 km route via NH334 takes 1.5 hours. From Jolly Grant Airport, the fare is ₹1,700 for a Sedan covering 35 km in 45–60 minutes. Available 24/7 — including 4 AM pickups for sunrise Ganga Aarti."
            facts={[
              { label: 'Sedan Fare', value: '₹2,000' },
              { label: 'SUV Fare', value: '₹2,700' },
              { label: 'Distance', value: '55 km' },
              { label: 'Airport Fare', value: '₹1,700' },
            ]}
            source="Uttarakhand Cab 24/7 · Haridwar fares updated May 2026 · +91 92589 12169"
          />
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          
          <div className="mb-12">
            <RouteInfoBox from="Dehradun" to="Haridwar" distance="55 km" time="1.5 hrs" fare="₹2,000" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left/Main Column: Article Content */}
            <div className="lg:col-span-2 space-y-12">
              
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Haridwar: Where the Ganges Meets the Plains
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  Haridwar is one of the seven holiest cities in Hinduism, marking the exact point where the sacred Ganges river descends from the rugged Himalayas into the North Indian plains. The evening Ganga Aarti at Har Ki Pauri is one of the most moving spiritual experiences in the country—thousands of floating diyas (lamps) on the river create an unforgettable, deeply spiritual atmosphere.
                </p>
                <TrustBanner />
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Airport & Railway Station Transfers
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg">
                  If you are arriving in Uttarakhand to begin your pilgrimage, <strong className="font-bold text-white">Jolly Grant Airport (Dehradun)</strong> is the closest flight hub to Haridwar (just 35 km away). We provide 24/7 direct airport-to-Haridwar transfers. We also offer reliable pickups directly from the <strong className="font-bold text-white">Haridwar Railway Station</strong> to transport you to your hotel or immediately forward to Rishikesh.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Top Attractions in Haridwar
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attractions.map((a) => (
                    <div key={a.name} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                      <h3 className="font-black text-white text-xl tracking-tight mb-3">{a.name}</h3>
                      <p className="text-white/70 font-light text-sm leading-relaxed mb-6">{a.desc}</p>
                      
                      <div className="bg-[#1A1A1A] px-4 py-3 rounded-xl text-xs font-bold text-white flex items-start gap-2 shadow-sm border border-white/10">
                        <span className="text-[#F7941D] shrink-0">💡 Tip:</span> 
                        <span className="font-light">{a.tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Popular Routes from Haridwar
                </h2>
                
                <div className="space-y-4">
                  {outstationRoutes.map((route) => (
                    <div key={route.dest} className="bg-[#1A1A1A] border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                      <div>
                        <h3 className="font-black text-xl text-white mb-2 flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#F7941D]" /> Haridwar to {route.dest}
                        </h3>
                        <p className="text-sm font-light text-white/70">{route.desc}</p>
                      </div>
                      <div className="flex flex-col md:items-end shrink-0 bg-[#1A1A1A] p-4 rounded-xl">
                        <p className="text-[#F7941D] font-black text-xl">{route.fare}</p>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                          <Clock className="w-3 h-3" /> {route.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DriverIntelligenceBox tips={driverTips} />

              <BookingCTA destination="Haridwar" fare="₹2,000" />

              {/* Fleet cross-link */}
              <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm p-8 md:p-10 mt-12">
                <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tighter mb-2">Which Vehicle for Haridwar?</h3>
                <p className="text-white/70 font-light text-sm mb-6">A Sedan is ideal for solo travellers or couples. Coming for Kumbh or a large group pilgrimage? The Innova Crysta or Ertiga handles the luggage and crowd better.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link href="/fleet/sedan" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Sedan</span>
                  </Link>
                  <Link href="/fleet/innova-crysta" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Innova Crysta</span>
                  </Link>
                  <Link href="/fleet" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Full Fleet</span>
                  </Link>
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-12">
                <FAQSection faqs={haridwarFAQs} title="Haridwar Taxi FAQs" />
              </div>

            </div>

            {/* Right Column: Sticky Sidebar / Instant Booking Widget */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Deep Space Booking Widget */}
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Haridwar Taxi Rates
                </h4>
                
                <div className="space-y-4 text-sm font-medium mb-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Dehradun to Haridwar</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹2,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Airport to Haridwar</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹1,700</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Haridwar to Rishikesh</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹1,700</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/80 font-light">Haridwar + Rishikesh Tour</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹3,500</span>
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
              </div>

              {/* Related Destinations Widget */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Related Destinations</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Rishikesh', dist: '25 km', icon: MapPin, link: '/rishikesh' },
                    { name: 'Dehradun', dist: '55 km', icon: MapPin, link: '/dehradun' },
                    { name: 'Char Dham Yatra', dist: 'Spiritual', icon: Mountain, link: '/char-dham' },
                    { name: 'Jolly Grant Airport', dist: '35 km', icon: Plane, link: '/services/jolly-grant-airport-taxi-service' },
                  ].map((d, i) => (
                    <li key={i} className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                      <Link href={d.link} className="flex items-center gap-3 w-full">
                        <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm">
                           <d.icon className="w-4 h-4 text-[#F7941D]" />
                        </div>
                        <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">{d.name}</span>
                      </Link>
                      <span className="text-white/70 font-bold text-[10px] uppercase tracking-widest whitespace-nowrap">{d.dist}</span>
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
                    { title: 'Haridwar to Rishikesh Taxi & Ashram Guide', href: '/blog/haridwar-to-rishikesh-taxi-fare-ashram-drop-guide' },
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

    </div>
    </>
  );
}
