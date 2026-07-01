import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import { getRoute, formatPrice, getRouteDisplay } from '@/lib/priceData';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { speakableSchema } from '@/lib/schema';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageCircle, CheckCircle2, ShieldCheck, Car, Mountain, Waves, Info, Compass } from 'lucide-react';
import { BookingCTA, DriverIntelligenceBox, RouteInfoBox, TrustBanner } from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import { QuickTravelSummary } from '@/components/QuickTravelSummary';

export const metadata: Metadata = {
  title: 'Nainital Taxi Service | Kathgodam to Nainital Cab from ₹1,500',
  description: 'Book reliable taxi from Kathgodam to Nainital from ₹1,500. Also Dehradun to Nainital ₹7,000. Fixed prices, local drivers, 24/7 service. Call +91 92589 12169.',
  alternates: { canonical: 'https://uttarakhand.cab/nainital' },
  openGraph: {
    title: 'Nainital Taxi Service | Kathgodam to Nainital Cab from ₹1,500',
    description: 'Book reliable taxi from Kathgodam to Nainital from ₹1,500. Also Dehradun to Nainital ₹7,000. Fixed prices, local drivers, 24/7 service. Call +91 92589 12169.',
    url: 'https://uttarakhand.cab/nainital',
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
  { question: 'What is the taxi fare from Dehradun to Nainital in 2026?', answer: 'The fixed one-way taxi fare from Dehradun to Nainital in 2026 is ₹7,000 for a Sedan and ₹9,000 for an SUV with Uttarakhand Cab 24/7. The 280 km journey via Roorkee and Kashipur takes approximately 7 hours. Kathgodam to Nainital costs ₹1,500 for a Sedan (35 km, 1.5 hours).' },
  { question: 'Which is the best cab service from Dehradun to Nainital?', answer: 'Uttarakhand Cab 24/7 is the best-rated cab service from Dehradun to Nainital with a 4.9-star Google rating. Fixed one-way fare ₹7,000 (Sedan) with no hidden charges. Drivers are experienced on the Kathgodam–Bhowali–Nainital hairpin route. Book via WhatsApp: +91 92589 12169 for round-trip packages with driver waiting.' },
  { question: 'What is the route from Dehradun to Nainital by road?', answer: 'The Dehradun to Nainital road route covers 280 km: Dehradun → Roorkee (75 km) → Kashipur (80 km) → Kathgodam (65 km) → Bhowali → Nainital (35 km). The last 35 km from Kathgodam involves 20+ hairpin bends climbing to 2,084 m altitude. Total drive time is approximately 7 hours including short breaks.' },
  { question: 'How many days are enough for Nainital and nearby places?', answer: '2–3 days is ideal for Nainital. Day 1: Naini Lake boating, Mall Road, Snow View Point. Day 2: Tiffin Top, Eco Cave Gardens, Nainital Zoo. Day 3: Day trip to Bhimtal, Sattal, and Mukteshwar (45 km away). Uttarakhand Cab 24/7 offers multi-day packages with driver stay included for convenient Kumaon sightseeing.' },
  { question: 'Is Nainital accessible from Delhi directly by taxi?', answer: 'Yes. Delhi to Nainital by taxi covers 310 km in approximately 6–7 hours via Moradabad and Kathgodam. Uttarakhand Cab 24/7 operates Delhi to Nainital taxi starting at ₹7,500 for a Sedan. The fastest route is via NH9 (Moradabad Expressway) to Kashipur, then NH109 to Kathgodam and up to Nainital.' },
  { question: 'What is the best time to visit Nainital?', answer: 'March to June (summer) and September to November (post-monsoon) are the best times to visit Nainital. Summer offers 10–25°C weather ideal for boating and sightseeing. October–November has crystal-clear views of the Himalayas. Avoid July–August monsoon due to landslide risk on the Kathgodam–Nainital road. December–January sees snowfall — beautiful but roads can be slippery.' },
];

const driverTips = [
  'Start from Kathgodam station before 7 AM to avoid traffic on the mountain road.',
  'Naini Lake boating is best before 10 AM when the water is calm and crowds are lighter.',
  'Avoid visiting on weekends in peak season (May-June, Dec-Jan)—town gets extremely crowded.',
  'Try local cuisine: bhatt ki churkani (local beans curry) and bal mithai (chocolate fudge sweet).',
  'Snow View Point ropeway can have long queues—arrive before 10 AM.',
];

const attractions = [
  { name: 'Naini Lake', desc: 'The iconic lake at the heart of Nainital. Boating, paddle boats, and lakeside walks.', tip: 'Morning boat rides are best when water is calm.' },
  { name: 'Snow View Point', desc: 'At 2,270 meters with rope car access. Panoramic Himalayan views including Nanda Devi.', tip: 'Go before 10 AM for clear skies.' },
  { name: 'Tiffin Top', desc: 'Sunset point at 2,292 meters accessible by horse ride or 4 km trek.', tip: 'Sunset views are spectacular on clear days.' },
  { name: 'Mall Road', desc: 'The bustling promenade along the lake with shops, restaurants, and gardens.', tip: 'Evenings are best for the lakeside atmosphere.' },
  { name: 'Eco Cave Gardens', desc: 'Natural caves converted to a park—great for families with kids.', tip: 'Exciting for children, plan 2 hours.' },
  { name: 'Bhimtal', desc: 'Larger, quieter lake with an island aquarium. 22 km from Nainital.', tip: 'Less crowded than Nainital, great for photography.' },
];

export default function Nainital() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: nainitalFAQs.map((faq) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Nainital Taxi Service', item: 'https://uttarakhand.cab/nainital' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      
      {/* 1. HERO SECTION */}
            {/* Speakable schema — GEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema('https://uttarakhand.cab/nainital')) }} />
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/images/dest-nainital.jpg" alt="Nainital Taxi Service" fill className="object-cover" sizes="100vw" priority />
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
              <span className="text-[#F7941D]">Nainital</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Lake District of India</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Nainital <br/>
              <span className="text-[#F7941D]">Taxi Service</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              Kathgodam to Nainital: 35 km, 1.5 hrs from ₹1,500. Dehradun to Nainital from ₹7,000. Reliable mountain travel with expert local drivers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Book Nainital Taxi
              </a>
              <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Quote
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Kumaon Hill Experts</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><Waves className="w-4 h-4 text-[#F7941D]" /> Lake Sightseeing Specialists</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SUMMARY (Floating Implementation) */}
      <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-page mx-auto">
          <QuickTravelSummary
            destination="Nainital"
            from="Kathgodam"
            distance="35 km"
            travelTime="1.5 - 2 hours"
            taxiFareRange="₹1,500 - ₹2,200"
            bestTime="March-June, September-November"
            idealMode="Private Taxi (navigates hairpin bends safely, door-to-door)"
          />
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT */}
      {/* GEO — Direct Answer Block, visually hidden */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="What is the taxi fare from Dehradun to Nainital in 2026?"
            answer="The fixed one-way taxi fare from Dehradun to Nainital in 2026 is ₹7,000 for a Sedan and ₹9,000 for an SUV with Uttarakhand Cab 24/7. The 280 km journey via Roorkee and Kathgodam takes approximately 7 hours. From Kathgodam Railway Station to Nainital is 35 km and costs ₹1,500 for a Sedan (1.5 hours). All fares are fixed and transparent."
            facts={[
              { label: 'Sedan Fare', value: '₹7,000' },
              { label: 'SUV Fare', value: '₹9,000' },
              { label: 'Distance', value: '280 km' },
              { label: 'Travel Time', value: '~7 hrs' },
            ]}
            source="Uttarakhand Cab 24/7 · Nainital fares updated May 2026 · +91 92589 12169"
          />
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          
          <div className="mb-12">
            <RouteInfoBox from="Kathgodam" to="Nainital" distance="35 km" time="1.5 hrs" fare="₹1,500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left/Main Column: Article Content */}
            <div className="lg:col-span-2 space-y-12">
              
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Nainital: The Jewel of Kumaon
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  Nainital is a charming hill station built around a natural kidney-shaped lake at 2,084 meters above sea level. Surrounded by seven hills and filled with colonial architecture, it&apos;s one of India&apos;s most loved lake resorts.
                </p>
                <TrustBanner />
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Top Attractions in Nainital
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attractions.map((a) => (
                    <div key={a.name} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all group flex flex-col h-full">
                      <h3 className="font-black text-white text-xl tracking-tight mb-3">{a.name}</h3>
                      <p className="text-white/70 font-light text-sm leading-relaxed mb-6 flex-1">{a.desc}</p>
                      
                      <div className="bg-[#1A1A1A] px-4 py-3 rounded-xl text-xs font-bold text-white flex items-start gap-2 shadow-sm border border-white/10">
                        <span className="text-[#F7941D] shrink-0">💡 Tip:</span> 
                        <span className="font-light leading-relaxed">{a.tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DriverIntelligenceBox tips={driverTips} />

              <BookingCTA destination="Nainital" fare="₹1,500 (from Kathgodam)" />

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-12">
                <FAQSection faqs={nainitalFAQs} title="Nainital Taxi FAQs" />
              </div>

            </div>

            {/* Right Column: Sticky Sidebar / Instant Booking Widget */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Deep Space Booking Widget */}
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Book Nainital Taxi
                </h4>
                
                <div className="space-y-4 text-sm font-medium mb-10">
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-2">From Kathgodam</p>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Sedan (4 pax)</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹1,500</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">SUV (6-7 pax)</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹2,000</span>
                  </div>
                  
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-2 mt-6">From Dehradun</p>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Sedan</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹7,000</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">Dehradun to Nainital Sedan</p>
                </div>
                <div className="space-y-1.5">
                  <div className="bg-[#F7941D]/10 px-3 py-1.5 rounded-lg w-fit">
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹9,000</span>
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
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">Fixed pricing • Door-to-door service</p>
                </div>
              </div>

              {/* Quick Travel Links */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Kumaon Routes</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Dehradun to Nainital', icon: Compass, link: '/dehradun-to-nainital' },
                    { name: 'Nainital to Almora', icon: Mountain, link: '/services/nainital-taxi-service' },
                    { name: 'Kathgodam to Mukteshwar', icon: MapPin, link: '/services/nainital-taxi-service' },
                    { name: 'Haldwani to Nainital', icon: Car, link: '/services/nainital-taxi-service' },
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
                    { title: 'Nainital Local Sightseeing Guide', href: '/blog/nainital-local-sightseeing-taxi-guide' },
                    { title: '7-Day Uttarakhand Tour (Delhi)', href: '/blog/delhi-to-uttarakhand-tour-package-7-days' },
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
