import type { Metadata } from 'next';
import { getRoute, formatPrice, getRouteDisplay } from '@/lib/priceData';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  Car,
  Info,
  Map,
  Mountain,
  Binoculars,
  TreePine,
  ShieldCheck,
} from 'lucide-react';
import {
  BookingCTA,
  DriverIntelligenceBox,
  TrustBanner,
} from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import Script from 'next/script';
import { speakableSchema } from '@/lib/schema';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { jimCorbettFAQs } from './data';

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Jim Corbett Taxi Service | Dehradun, Delhi, Rishikesh to Corbett Cab',
  description:
    'Book taxi to Jim Corbett National Park from Dehradun (₹4,000), Delhi (₹5,000), Rishikesh (₹3,500), Mussoorie (₹4,500). Fixed fares, experienced drivers, 24/7 service. WhatsApp: +91 92589 12169.',
  alternates: { canonical: 'https://uttarakhand.cab/jim-corbett' },
  openGraph: {
    title: 'Jim Corbett Taxi Service | Dehradun, Delhi, Rishikesh to Corbett Cab',
    description:
      'Book taxi to Jim Corbett National Park from Dehradun (₹4,000), Delhi (₹5,000), Rishikesh (₹3,500), Mussoorie (₹4,500). Fixed fares, 24/7 service.',
    url: 'https://uttarakhand.cab/jim-corbett',
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [
      {
        url: 'https://uttarakhand.cab/images/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Jim Corbett Taxi Service — Uttarakhand Cab 24/7',
      },
    ],
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const fareTable = [
  { from: 'Dehradun', to: 'Jim Corbett (Ramnagar)', sedan: '₹4,000', suv: '₹5,000', time: '5–6 hrs', km: '200 km' },
  { from: 'Delhi', to: 'Jim Corbett (Ramnagar)', sedan: '₹5,000', suv: '₹6,000', time: '6–7 hrs', km: '260 km' },
  { from: 'Rishikesh', to: 'Jim Corbett (Ramnagar)', sedan: '₹3,500', suv: '₹4,500', time: '4.5–5 hrs', km: '180 km' },
  { from: 'Mussoorie', to: 'Jim Corbett (Ramnagar)', sedan: '₹4,500', suv: '₹5,500', time: '5.5–6.5 hrs', km: '230 km' },
  { from: 'Haridwar', to: 'Jim Corbett (Ramnagar)', sedan: '₹3,300', suv: '₹4,300', time: '4–4.5 hrs', km: '165 km' },
  { from: 'Jolly Grant Airport', to: 'Jim Corbett (Ramnagar)', sedan: '₹4,000', suv: '₹5,000', time: '5–6 hrs', km: '200 km' },
];

const zones = [
  {
    name: 'Dhikala Zone',
    desc: 'The crown jewel of Corbett — vast grasslands (chaurs) along the Ramganga river offering the highest chance of tiger sightings. Requires overnight stay inside the park.',
    tip: 'Book Dhikala permits 45 days in advance — they sell out fast during peak season (Nov–June).',
    open: 'Nov 15 – Jun 15',
    icon: '🐯',
  },
  {
    name: 'Bijrani Zone',
    desc: 'Most popular day-safari zone with dense sal forests and open grasslands. Excellent for tigers, elephants, and leopards. Located 1 km from Ramnagar.',
    tip: 'Arrive at the gate 15 minutes before your safari slot — late arrivals are turned away.',
    open: 'Oct 15 – Jun 15',
    icon: '🐘',
  },
  {
    name: 'Jhirna Zone',
    desc: 'The only zone open year-round including monsoon. Southern mixed forest with good sloth bear, leopard, and sambar sightings. Less crowded than Bijrani.',
    tip: 'Best option if visiting July–October. Morning safaris (6–9 AM) have the highest wildlife activity.',
    open: 'Year Round',
    icon: '🦁',
  },
  {
    name: 'Durga Devi Zone',
    desc: 'Located in the northeastern part of the park near the Ramganga river. Excellent for birdwatching — over 600 species recorded. Also great for elephant herds.',
    tip: 'Carry binoculars — this zone is a paradise for birders with pied kingfishers, fish eagles, and great hornbills.',
    open: 'Oct 15 – Jun 15',
    icon: '🦅',
  },
  {
    name: 'Dhela Zone',
    desc: 'Newest zone in the buffer area. Open year-round with good leopard and wild elephant sightings. Less competitive for permits than Dhikala or Bijrani.',
    tip: 'Good backup option when Bijrani permits are sold out during peak holiday weekends.',
    open: 'Year Round',
    icon: '🌿',
  },
];

const driverTips = [
  'Start your journey from Dehradun before 5 AM if you want to reach Corbett in time for the morning safari slot (typically 6–6:30 AM gate opening). The 200 km drive takes 5 hours — plan accordingly.',
  'The Ramnagar town entry road narrows significantly near the forest checkpost. Our SUVs and Sedans are sized appropriately — avoid booking large tempo travellers for this route as they face restrictions.',
  'Delhi to Corbett via NH9 passes through Moradabad. Leave Delhi before 6 AM to avoid the notorious Moradabad bypass traffic that can add 1.5–2 hours to your journey on weekends.',
  'Most Corbett resorts are spread across the buffer zone — some up to 15 km from Ramnagar town. Share your exact resort name when booking so your driver plans the correct entry route.',
];

const trustPoints = [
  { icon: Clock, title: 'Early Morning Ready', desc: 'Safari gates open at 6 AM. We ensure on-time arrival for your morning slot.' },
  { icon: ShieldCheck, title: 'Fixed Fares', desc: 'Fare confirmed at booking. No surge pricing on busy safari weekends.' },
  { icon: Car, title: 'SUV Available', desc: 'Innova Crysta and Ertiga SUVs for families and rough forest approach roads.' },
  { icon: MapPin, title: 'All Gate Zones', desc: 'Drivers know Dhikala, Bijrani, Jhirna, Durga Devi, and Dhela entry routes.' },
  { icon: CheckCircle2, title: 'Resort Drop', desc: 'We drop you at your exact resort — even deep inside the buffer zone.' },
  { icon: Map, title: 'Multi-City Pickup', desc: 'Pickup from Dehradun, Delhi, Rishikesh, Mussoorie, Haridwar, or Airport.' },
];

// ─── Schema ───────────────────────────────────────────────────────────────────

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: jimCorbettFAQs.map((faq) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Jim Corbett Taxi', item: 'https://uttarakhand.cab/jim-corbett' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'TaxiService',
  name: 'Jim Corbett Taxi Service — Uttarakhand Cab 24/7',
  description:
    'Fixed-fare taxi service to Jim Corbett National Park from Dehradun, Delhi, Rishikesh, Mussoorie, and Haridwar. Experienced drivers, all safari zone gates covered, 24/7 availability.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Uttarakhand Cab 24/7',
    url: 'https://uttarakhand.cab',
    telephone: '+919258912169',
  },
  areaServed: {
    '@type': 'Place',
    name: 'Jim Corbett National Park, Ramnagar, Uttarakhand',
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    servicePhone: {
      '@type': 'ContactPoint',
      telephone: '+919258912169',
      contactType: 'reservations',
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JimCorbett() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">

      {/* Schema */}
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="speakable-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema('https://uttarakhand.cab/jim-corbett')) }} />

      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7941D]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 mb-8">
            <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/destinations" className="hover:text-[#F7941D] transition-colors">Destinations</Link>
            <span>/</span>
            <span className="text-white/60">Jim Corbett Taxi</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#F7941D]/10 border border-[#F7941D]/20 text-[#F7941D] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <TreePine className="w-3 h-3" /> Jim Corbett National Park · Ramnagar, Uttarakhand
            </div>

            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none mb-6">
              Jim Corbett<br />
              <span className="text-[#F7941D]">Taxi Service</span>
            </h1>

            <p className="text-white/70 font-light text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Fixed-fare cab to <strong className="text-white font-bold">Jim Corbett National Park</strong> from Dehradun, Delhi, Rishikesh, and Mussoorie. Early morning safari pickups, all zone gates covered, 24/7 available.
            </p>

            {/* Quick Fare Strip */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { label: 'From Dehradun', fare: '₹4,000' },
                { label: 'From Delhi', fare: '₹5,000' },
                { label: 'From Rishikesh', fare: '₹3,500' },
                { label: 'From Mussoorie', fare: '₹4,500' },
              ].map((f) => (
                <div key={f.label} className="bg-white/5 border border-white/10 px-5 py-3 rounded-xl">
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{f.label}</p>
                  <p className="text-[#F7941D] font-black text-xl">{f.fare}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+919258912169"
                className="inline-flex items-center gap-3 bg-[#F7941D] text-white font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#D97E10] transition-all hover:shadow-[0_0_30px_-5px_#F7941D]"
              >
                <Phone className="w-4 h-4" /> Call: +91 92589 12169
              </a>
              <a
                href="https://wa.me/919258912169?text=Hi%2C%20I%20need%20a%20taxi%20to%20Jim%20Corbett%20National%20Park.%20Travelling%20from%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#128C7E] transition-all"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp to Book
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GEO Answer Box */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <GEOAnswerBox
          question="What is the best taxi service to Jim Corbett National Park from Dehradun and Delhi?"
          answer="Uttarakhand Cab 24/7 provides fixed-fare taxi service to Jim Corbett National Park from Dehradun (₹4,000), Delhi (₹5,000), Rishikesh (₹3,500), and Mussoorie (₹4,500). Rated 4.9 stars on Google. Drivers are experienced on all Corbett routes, cover all safari zone gates, and are available for early morning safari pickups. Book on WhatsApp: +91 92589 12169."
        />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* About */}
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                Jim Corbett National Park — India's Oldest Tiger Reserve
              </h2>
              <p className="text-white/70 font-light leading-relaxed text-lg mb-6">
                Established in 1936, <strong className="font-bold text-white">Jim Corbett National Park</strong> is India's oldest and most celebrated national park. Located in the Nainital district of Uttarakhand, it spans 520 sq km of dense sal forests, riverine grasslands, and the Ramganga reservoir. It is home to over 230 tigers, 600+ bird species, Asian elephants, leopards, and gharials.
              </p>
              <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                The nearest railhead is <strong className="font-bold text-white">Ramnagar Railway Station</strong>, 1 km from the park entrance. Most travellers arrive from Dehradun, Delhi, Rishikesh, or Haridwar and rely on a private cab for the journey — public transport to the forest zone is unreliable and impractical with safari gear and luggage.
              </p>
              <TrustBanner />
            </div>

            {/* Trust Points */}
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                Why Book With Uttarakhand Cab 24/7
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trustPoints.map((t) => (
                  <div key={t.title} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all flex gap-5">
                    <div className="bg-[#F7941D]/10 p-3 rounded-xl h-fit">
                      <t.icon className="w-5 h-5 text-[#F7941D]" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-lg tracking-tight mb-2">{t.title}</h3>
                      <p className="text-white/70 font-light text-sm leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare Table */}
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                Jim Corbett Taxi Fare Chart 2026
              </h2>
              <p className="text-white/70 font-light text-lg mb-8">
                All fares are one-way, fixed, and inclusive of toll, driver allowance, and fuel. No hidden charges.
              </p>
              <div className="bg-[#1A1A1A] rounded-[2rem] border border-white/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#1A1A1A] text-white">
                      <tr>
                        <th className="text-left px-6 py-4 font-black text-[10px] uppercase tracking-widest">From</th>
                        <th className="text-left px-6 py-4 font-black text-[10px] uppercase tracking-widest">Sedan</th>
                        <th className="text-left px-6 py-4 font-black text-[10px] uppercase tracking-widest">SUV</th>
                        <th className="text-left px-6 py-4 font-black text-[10px] uppercase tracking-widest">Time</th>
                        <th className="text-left px-6 py-4 font-black text-[10px] uppercase tracking-widest">Distance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fareTable.map((row, i) => (
                        <tr key={row.from} className={`border-b border-white/10 hover:bg-[#1A1A1A] transition-colors ${i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#1A1A1A]/30'}`}>
                          <td className="px-6 py-4 font-bold text-white">{row.from}</td>
                          <td className="px-6 py-4 font-black text-[#F7941D]">{row.sedan}</td>
                          <td className="px-6 py-4 font-black text-[#F7941D]">{row.suv}</td>
                          <td className="px-6 py-4 font-light text-white/70">{row.time}</td>
                          <td className="px-6 py-4 font-light text-white/70">{row.km}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-[#1A1A1A] flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#F7941D] shrink-0 mt-0.5" />
                  <p className="text-xs text-white/70 font-light">All fares are one-way and fixed. Toll, driver allowance, and fuel included. Round-trip and multi-day packages available — WhatsApp for custom quote.</p>
                </div>
              </div>
            </div>

            {/* Safari Zones */}
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                Jim Corbett Safari Zones Guide
              </h2>
              <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                Jim Corbett is divided into 5 safari zones. Each has a different character, wildlife density, and permit availability. Tell us your zone when booking — our driver will plan the route to your exact gate.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {zones.map((z) => (
                  <div key={z.name} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{z.icon}</span>
                      <h3 className="font-black text-white text-xl tracking-tight">{z.name}</h3>
                    </div>
                    <p className="text-white/70 font-light text-sm leading-relaxed mb-4 flex-1">{z.desc}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/70 mb-4">
                      <Clock className="w-3 h-3 text-[#F7941D]" />
                      <span>Open: {z.open}</span>
                    </div>
                    <div className="bg-[#1A1A1A] px-4 py-3 rounded-xl text-xs font-bold text-white flex items-start gap-2 border border-white/10">
                      <span className="text-[#F7941D] shrink-0">💡 Tip:</span>
                      <span className="font-light leading-relaxed">{z.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DriverIntelligenceBox tips={driverTips} />

            {/* Best Time */}
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                Best Time to Visit Jim Corbett
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { season: 'Nov – Feb', label: 'Peak Wildlife Season', desc: 'Dry grasslands, animals near water, excellent tiger sightings. Cool and comfortable weather.', color: 'bg-green-50 border-green-200', badge: 'Best Season' },
                  { season: 'Mar – Jun', label: 'Hot but Rewarding', desc: 'Vegetation thins, animals visible near waterholes. April–May is best for tiger sightings. Hot days, cool mornings.', color: 'bg-yellow-50 border-yellow-200', badge: 'Good Season' },
                  { season: 'Jul – Oct', label: 'Monsoon Season', desc: 'Most zones close. Only Jhirna and Dhela zones open year-round. Dense greenery, fewer tourists.', color: 'bg-blue-50 border-blue-200', badge: 'Limited Access' },
                ].map((s) => (
                  <div key={s.season} className={`p-6 rounded-[2rem] border ${s.color} flex flex-col`}>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#F7941D] mb-2">{s.badge}</span>
                    <h3 className="font-black text-white text-xl mb-1">{s.season}</h3>
                    <p className="font-bold text-white text-sm mb-3">{s.label}</p>
                    <p className="text-white/70 font-light text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <BookingCTA destination="Jim Corbett National Park" fare="₹4,000" />

            {/* FAQ */}
            <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-12">
              <FAQSection faqs={jimCorbettFAQs} title="Jim Corbett Taxi FAQs" />
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">

            {/* Booking Widget */}
            <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />

              <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                <TreePine className="w-6 h-6 text-[#F7941D]" /> Book Corbett Taxi
              </h4>

              <div className="space-y-4 text-sm font-medium mb-10">
                {[
                  { label: 'Dehradun → Corbett', fare: '₹4,000' },
                  { label: 'Delhi → Corbett', fare: '₹5,000' },
                  { label: 'Rishikesh → Corbett', fare: '₹3,500' },
                  { label: 'Mussoorie → Corbett', fare: '₹4,500' },
                  { label: 'SUV Upgrade', fare: '+₹1,000' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">{item.label}</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">{item.fare}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 relative z-10">
                <a
                  href="tel:+919258912169"
                  className="w-full px-6 py-4 bg-[#F7941D] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_20px_-5px_#F7941D]"
                >
                  <Phone className="w-4 h-4 shrink-0" /> Call: +91 92589 12169
                </a>
                <a
                  href="https://wa.me/919258912169?text=Hi%2C%20I%20need%20a%20taxi%20to%20Jim%20Corbett%20National%20Park.%20Travelling%20from%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-4 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp to Book
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-lg mt-6 flex items-start gap-2">
                <Info className="w-4 h-4 text-white/50 shrink-0" />
                <p className="text-[10px] text-white/50 font-light leading-relaxed">
                  Fixed fares · All safari zones · Early morning pickup · Round-trip available
                </p>
              </div>
            </div>

            {/* Related Routes */}
            <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
              <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Related Routes</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Nainital', dist: '65 km', icon: Mountain, link: '/nainital', fare: '₹2,000' },
                  { name: 'Rishikesh', dist: '180 km', icon: Map, link: '/rishikesh', fare: '₹3,500' },
                  { name: 'Dehradun Airport', dist: '200 km', icon: MapPin, link: '/dehradun-airport-taxi', fare: '₹3,500' },
                  { name: 'Mussoorie', dist: '230 km', icon: Mountain, link: '/mussoorie', fare: '₹4,500' },
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

            {/* Blog Links */}
            <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
              <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Helpful Guides</h4>
              <ul className="space-y-3">
                {[
                  { title: 'Delhi to Jim Corbett Taxi Guide', href: '/blog/delhi-to-jim-corbett-taxi-trip-guide' },
                  { title: '7-Day Uttarakhand Tour from Delhi', href: '/blog/delhi-to-uttarakhand-tour-package-7-days' },
                  { title: 'Nainital Taxi Package', href: '/nainital' },
                ].map((p, i) => (
                  <li key={i}>
                    <Link
                      href={p.href}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#F7941D]/10 transition-colors group"
                    >
                      <Info className="w-4 h-4 text-[#F7941D] shrink-0" />
                      <span className="text-sm font-semibold text-white group-hover:text-[#F7941D] transition-colors leading-tight">
                        {p.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
