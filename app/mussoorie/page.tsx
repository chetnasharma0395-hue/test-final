import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageCircle, CheckCircle2, Plane, Train, Mountain, Car, Info, Map } from 'lucide-react';
import { BookingCTA, DriverIntelligenceBox, RouteInfoBox, TransportComparison, TrustBanner } from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import Script from 'next/script';
import { speakableSchema } from '@/lib/schema';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { QuickTravelSummary } from '@/components/QuickTravelSummary';
import { mussoorieFAQs } from './data';
import { getRoute, formatPrice, getRouteDisplay } from '@/lib/priceData';

const route = getRoute('dehradun-mussoorie');
const priceDisplay = `Sedan ${formatPrice(route.sedan)}, SUV ${formatPrice(route.suv)}`;
const metaDescription = `Book reliable Mussoorie taxi from Dehradun Railway Station or Jolly Grant Airport. Fixed prices: ${priceDisplay}. Local mountain drivers, 24/7 service.`;

export const metadata: Metadata = {
  title: 'Mussoorie Taxi Service | Dehradun & Airport Cab Booking',
  description: metaDescription,
  alternates: { canonical: 'https://uttarakhand.cab/mussoorie' },
  openGraph: {
    title: 'Mussoorie Taxi Service | Dehradun & Airport Cab Booking',
    description: metaDescription,
    url: 'https://uttarakhand.cab/mussoorie',
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
const attractions = [
  { name: 'Mall Road', description: 'The 2 km heart of Mussoorie with colonial architecture, shops, and cafes. Perfect for evening strolls.', time: '2-3 hours', tip: 'Visit after 5 PM when the weather cools down and the lights come on.' },
  { name: 'Gun Hill', description: 'The second highest point in Mussoorie (2,024m) offering 360-degree Himalayan views. Accessible by cable car.', time: '1-2 hours', tip: 'Best views are before 10 AM when the mountain skies are crystal clear.' },
  { name: 'Kempty Falls', description: 'A massive 40-foot cascading waterfall located 15 km from town. Great for photography and wading.', time: '2-3 hours', tip: 'Go early (before 10 AM) to avoid the massive tour bus crowds.' },
  { name: 'Lal Tibba', description: 'The highest point in Mussoorie (2,275m) featuring telescope views of the Badrinath and Kedarnath peaks.', time: '1-2 hours', tip: 'Clear early mornings offer the absolute best visibility of the snowline.' },
  { name: "Company Garden", description: 'A beautifully maintained municipal garden with vibrant flowers, a small amusement park, and a boating lake.', time: '2 hours', tip: 'Best visited in the morning when the flowers are fresh.' },
  { name: "Camel's Back Road", description: 'A scenic 3 km walking trail shaped like a camel\'s hump. Famous for stunning sunrise and sunset views.', time: '1-2 hours', tip: 'Start from Library Chowk. Best walking time is 6-7 AM or 5-6 PM.' },
];

const outstationRoutes = [
  { dest: 'Dhanaulti', desc: 'A serene, less-crowded hill station famous for its Eco Park and winter snowfall.', fare: 'From ₹3,000', time: '2.5 Hours' },
  { dest: 'Jolly Grant Airport', desc: 'Direct, punctual drop-offs from your Mussoorie hotel down to the airport.', fare: 'From ₹3,000', time: '2.5 Hours' },
  { dest: 'Rishikesh', desc: 'Descend from the hills straight to the Yoga Capital for the evening Ganga Aarti.', fare: 'From ₹3,300', time: '2.5 Hours' },
];

const driverTips = [
  'Start your journey before 7 AM from Dehradun to beat the morning traffic on Rajpur Road—it easily saves you 45-60 minutes of sitting in traffic.',
  'If Kempty Falls is on your itinerary, go there first thing in the morning. After 11 AM, the narrow road gets packed with heavy tour buses.',
  'Do not try to see everything in one day. Mussoorie traffic moves slowly. Pick 2 or 3 spots per day to explore properly without rushing.',
  'Mall Road gets incredibly crowded on weekends (Saturday/Sunday). If visiting on a weekend, maintain a flexible return time to Dehradun.',
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: mussoorieFAQs.map((faq) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Mussoorie Taxi Service', item: 'https://uttarakhand.cab/mussoorie' },
  ],
};

export default function Mussoorie() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* 1. HERO SECTION */}
            {/* Speakable schema — GEO: marks citable sections for AI models */}
      <Script
        id="speakable-schema-mussoorie"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema('https://uttarakhand.cab/mussoorie')) }}
      />
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/images/dest-mussoorie.jpg" alt="Mussoorie Taxi Service" fill className="object-cover" sizes="100vw" priority />
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
              <span className="text-[#F7941D]">Mussoorie</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">The Queen of Hills</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Mussoorie <br/>
              <span className="text-[#F7941D]">Taxi Service</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              Dehradun to Mussoorie fixed fare from ₹2,000. Reliable airport pickups, railway station transfers, and local mountain sightseeing with verified local drivers.
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
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Safe Mountain Drivers</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><Train className="w-4 h-4 text-[#F7941D]" /> Airport & Station Pickups</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SUMMARY (Floating Implementation) */}
      <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-page mx-auto">
          <QuickTravelSummary
            destination="Mussoorie"
            distance="35 km from Dehradun"
            travelTime="1.5 - 2.5 hours (varies by traffic)"
            taxiFareRange="₹2,000 - ₹3,000"
            bestTime="March-June, September-November"
            idealMode="Private Taxi (Avoids extreme parking stress on Mall Road)"
          />
        </div>
      </section>

      {/* GEO — Direct Answer Block for AI citation, visually hidden */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="What is the taxi fare from Dehradun to Mussoorie in 2026?"
            answer="The fixed taxi fare from Dehradun to Mussoorie in 2026 is ₹2,000 for a Sedan and ₹3,000 for an SUV, one-way. The 35 km journey via Rajpur Road takes approximately 1.5 hours. Uttarakhand Cab 24/7 offers transparent fixed pricing from Dehradun Railway Station, ISBT, or Jolly Grant Airport — with no surge charges, no waiting fees, and 24/7 availability for early morning and late-night departures."
            facts={[
              { label: 'Sedan Fare', value: '₹2,000' },
              { label: 'SUV Fare', value: '₹3,000' },
              { label: 'Distance', value: '35 km' },
              { label: 'Travel Time', value: '~1.5 hrs' },
            ]}
            source="Uttarakhand Cab 24/7 · Mussoorie fares updated May 2026 · +91 92589 12169"
          />
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          
          <div className="mb-12">
            <RouteInfoBox from="Dehradun" to="Mussoorie" distance="35 km" time="1.5 hrs" fare="₹2,000" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left/Main Column: Article Content */}
            <div className="lg:col-span-2 space-y-12">
              
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Mussoorie: The Queen of Hills
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  Perched at 2,005 meters above sea level in the Garhwal Himalayas, Mussoorie is Uttarakhand&apos;s most beloved hill station. Located just 35 km uphill from Dehradun, it offers sweeping views of the Doon Valley, charming colonial architecture, and a cool climate that makes it the perfect year-round mountain escape.
                </p>
                <TrustBanner />
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Dehradun Airport & Railway Station to Mussoorie
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg">
                  If you are traveling from outside Uttarakhand, you will likely arrive at <strong className="font-bold text-white">Jolly Grant Airport</strong> or the <strong className="font-bold text-white">Dehradun Railway Station</strong>. Our verified drivers will track your arrival time, meet you directly at the exit, and safely navigate the steep 60 km (airport) or 35 km (railway) mountain climb to drop you directly at your Mussoorie hotel.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Top Attractions in Mussoorie
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  Booking an 8-hour local sightseeing taxi is the best way to explore Mussoorie&apos;s steep, winding roads without exhausting yourself. Here are the must-see spots:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attractions.map((a) => (
                    <div key={a.name} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all group flex flex-col h-full">
                      <h3 className="font-black text-white text-xl tracking-tight mb-3">{a.name}</h3>
                      <p className="text-white/70 font-light text-sm leading-relaxed mb-6 flex-1">{a.description}</p>
                      
                      <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
                        <Clock className="w-4 h-4 text-[#F7941D] shrink-0" />
                        <span>{a.time} required</span>
                      </div>
                      
                      <div className="bg-[#1A1A1A] px-4 py-3 rounded-xl text-xs font-bold text-white flex items-start gap-2 shadow-sm border border-white/10">
                        <span className="text-[#F7941D] shrink-0">💡 Tip:</span> 
                        <span className="font-light leading-relaxed">{a.tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DriverIntelligenceBox tips={driverTips} />

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Popular Routes from Mussoorie
                </h2>
                
                <div className="space-y-4">
                  {outstationRoutes.map((route) => (
                    <div key={route.dest} className="bg-[#1A1A1A] border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                      <div>
                        <h3 className="font-black text-xl text-white mb-2 flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#F7941D]" /> Mussoorie to {route.dest}
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

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Transport Options: Dehradun to Mussoorie
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  While local buses are available, navigating Mussoorie with luggage on public transport requires heavy uphill walking. A private taxi is the safest and most comfortable option.
                </p>

                <TransportComparison
                  route="Dehradun to Mussoorie"
                  busFare="₹150 - ₹250"
                  busTime="2.5 - 3 hours"
                  taxiFare="₹2,000 - ₹3,000"
                  taxiTime="1.5 - 2 hours"
                />
              </div>

              <BookingCTA destination="Mussoorie" fare="₹2,000" />

              {/* Fleet cross-link */}
              <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm p-8 md:p-10 mt-12">
                <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tighter mb-2">Which Vehicle for Mussoorie?</h3>
                <p className="text-white/70 font-light text-sm mb-6">A Sedan covers Mussoorie comfortably for up to 4. Traveling with family? The Ertiga offers more room.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/fleet/sedan" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Sedan</span>
                  </Link>
                  <Link href="/fleet/ertiga" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                    <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Ertiga</span>
                  </Link>
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-12">
                <FAQSection faqs={mussoorieFAQs} title="Mussoorie Taxi FAQs" />
              </div>

            </div>

            {/* Right Column: Sticky Sidebar / Instant Booking Widget */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Deep Space Booking Widget */}
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Book Mussoorie Taxi
                </h4>
                
                <div className="space-y-4 text-sm font-medium mb-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Dehradun to Mussoorie</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹2,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Airport to Mussoorie</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹3,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">SUV Upgrade</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹3,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/80 font-light">Local Sightseeing (8 Hrs)</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹3,000</span>
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
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">Fixed pricing • Verified mountain drivers</p>
                </div>
              </div>

              {/* Related Routes Widget */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Related Routes</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Rishikesh', dist: '75 km', icon: Map, link: '/rishikesh', fare: '₹2,300' },
                    { name: 'Dehradun City', dist: '35 km', icon: MapPin, link: '/dehradun', fare: '₹2,000' },
                    { name: 'Dhanaulti', dist: '60 km', icon: Mountain, link: '/services/dhanaulti-taxi-service', fare: '₹3,000' },
                    { name: 'Jolly Grant Airport', dist: '60 km', icon: Plane, link: '/jolly-grant-airport-to-mussoorie', fare: '₹3,000' },
                  ].map((d, i) => (
                    <li key={i} className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                      <Link href={d.link} className="flex flex-col w-full">
                        <div className="flex items-center gap-3 mb-1">
                          <d.icon className="w-4 h-4 text-[#F7941D] shrink-0" />
                          <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">{d.name}</span>
                        </div>
                        <span className="text-white/70 font-bold text-[10px] uppercase tracking-widest pl-7">{d.dist}</span>
                      </Link>
                      <span className="text-[#F7941D] font-black text-sm shrink-0">{d.fare}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* From Our Blog */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">From Our Blog</h4>
                <ul className="space-y-3">
                  {[
                    { title: 'Taxi Fare Guide 2026', href: '/blog/dehradun-to-mussoorie-taxi-fare' },
                    { title: 'Winter Taxi Restrictions', href: '/blog/mussoorie-winter-line-and-taxi-restrictions' },
                    { title: 'Best Time to Visit Mussoorie', href: '/blog/best-time-to-visit-mussoorie' },
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
  );
}
