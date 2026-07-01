'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useFadeInUp } from '@/components/motion/MotionKit';
import { Phone, MapPin, Plane, Mountain, Car, MessageCircle, CheckCircle2, Train, Clock, ArrowRight } from 'lucide-react';

import { BookingCTA, DriverIntelligenceBox, TrustBanner } from '@/components/CTABoxes';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { dehradunFAQs } from './data';

// ----------------------------------------------------------------------
// DATA ARRAYS (100% PRESERVED FOR SEO)
// ----------------------------------------------------------------------
const attractions = [
  { name: "Robber's Cave (Guchhupani)", desc: "A mesmerizing natural cave river formation. You can walk through the ankle-deep cold water inside the dark cave.", tip: "Wear sandals and carry a towel." },
  { name: "Forest Research Institute (FRI)", desc: "A colonial-era architectural marvel spread over a lush 450-hectare campus. Featured in many Bollywood movies.", tip: "Carry a valid ID for entry. Museum open 9 AM–5 PM." },
  { name: "Sahastradhara", desc: "Meaning 'Thousand Fold Spring', famous for its sulphur water pools which are believed to have medicinal properties.", tip: "Visit on weekdays to avoid heavy local crowds." },
  { name: "Mindrolling Monastery", desc: "One of the largest Buddhist centers in India, featuring a spectacular 58-meter tall Stupa and beautiful gardens.", tip: "Maintain silence and observe dress code etiquette." },
];

const outstationRoutes = [
  { dest: 'Mussoorie', desc: 'The Queen of Hills is just a scenic 35 km drive up the winding mountain roads.', fare: 'From ₹2,000', time: '1.5 Hours' },
  { dest: 'Rishikesh', desc: 'The Yoga Capital of the World, easily accessible via the beautiful forest highway.', fare: 'From ₹2,300', time: '1.5 Hours' },
  { dest: 'Haridwar', desc: 'Attend the evening Ganga Aarti in this sacred city, just down the highway from Dehradun.', fare: 'From ₹2,000', time: '1.5 Hours' },
  { dest: 'Char Dham Yatra', desc: 'Dehradun serves as the perfect starting point for your spiritual journey to the four shrines.', fare: 'Custom Quotes', time: '10-12 Days' },
];

const driverTips = [
  'Jolly Grant Airport is 30 km from city center—always allow a full hour for airport transfers.',
  'Traffic on Rajpur Road and Clock Tower can be very heavy between 9-10 AM and 5-7 PM. Plan sightseeing accordingly.',
  'If heading to Mussoorie on a weekend, start your journey before 9 AM to beat the massive traffic jams at the diversion.',
  'Sahastradhara road gets narrow near the end—an SUV is highly recommended for larger groups.',
];

const services = [
  { service: 'Airport Transfer', desc: 'Jolly Grant pickup/drop. Flight tracking.', price: '₹1,300 - ₹2,000', icon: Plane },
  { service: 'Railway Station', desc: 'Dehradun station to hotel or Mussoorie transfers.', price: 'From ₹500', icon: Train },
  { service: 'Local Sightseeing', desc: "8-hour packages for Robber's Cave, FRI, etc.", price: '₹3,000/day', icon: Mountain },
];

export default function DehradunClient() {
  const fadeInUp = useFadeInUp();
  return (
    <div className="bg-[#1A1A1A] selection:bg-[#F7941D]/30">

      {/* 1. HERO SECTION: Massive Typographic Impact */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="/assets/images/dest-dehradun.jpg" alt="Dehradun Taxi Service" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        <div className="max-w-page mx-auto relative z-10">
          <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">

            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Dehradun</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Gateway to the Himalayas</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-8">
              Dehradun <br/>
              <span className="text-[#F7941D]">Taxi Service</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              Premium cab service for Jolly Grant Airport, Dehradun Railway Station, local sightseeing, and outstation trips to Mussoorie & Rishikesh.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center gap-3">
                <Phone className="w-4 h-4" /> Call to Book
              </a>
              <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center gap-3">
                <MessageCircle className="w-4 h-4" /> WhatsApp Quote
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-white/60 text-xs font-black uppercase tracking-widest">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Transparent Pricing</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Airport & Station Pickups</span>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES GRID: Bento Box Layout */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-[#F7941D] text-sm font-black uppercase tracking-[0.3em] mb-3">How We Can Help</p>
            <h2 className="font-heading font-black text-4xl text-white uppercase tracking-tighter">Our Dehradun Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div key={s.service} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all duration-300 group text-center">
                <div className="w-20 h-20 bg-[#1A1A1A] rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-[#F7941D]/10 transition-all duration-300">
                  <s.icon className="w-10 h-10 text-[#F7941D]" />
                </div>
                <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-4">{s.service}</h3>
                <p className="text-white/70 font-light leading-relaxed mb-8">{s.desc}</p>
                <div className="inline-block bg-[#1A1A1A] px-6 py-3 rounded-full text-white font-black text-lg">
                  {s.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT & SIDEBAR */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Left: Article Content */}
            <div className="lg:col-span-2 space-y-12 text-white/70 font-light leading-relaxed text-lg">

              {/* GEO — Direct Answer Block, visually hidden */}
              <section className="sr-only">
                <GEOAnswerBox
                question="What taxi services are available in Dehradun in 2026?"
                answer="Uttarakhand Cab 24/7 provides reliable taxi services across Dehradun including Jolly Grant Airport transfers, Mussoorie trips (₹2,000 Sedan), Rishikesh transfers (₹2,300 Sedan), Haridwar drops (₹2,000), and outstation packages. All vehicles are AC-equipped with local drivers available 24/7. Char Dham Yatra packages also depart from Dehradun. Book via WhatsApp: +91 92589 12169."
                facts={[
                  { label: 'Dehradun–Mussoorie', value: '₹2,000 (Sedan)' },
                  { label: 'Dehradun–Rishikesh', value: '₹2,300 (Sedan)' },
                  { label: 'Dehradun–Haridwar', value: '₹2,000 (Sedan)' },
                  { label: 'Airport Transfer', value: 'Jolly Grant — 24/7' },
                  { label: 'Char Dham Yatra', value: 'Packages from Dehradun' },
                  { label: 'Availability', value: '24/7, Fixed Fares' },
                ]}
                source="Uttarakhand Cab 24/7 — Dehradun Taxi Fares 2026"
              />
              </section>

              <motion.div {...fadeInUp}>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">Welcome to Dehradun: The Doon Valley</h2>
                <p>
                  Nestled in the rolling foothills of the Himalayas, Dehradun is not just the capital city of Uttarakhand, but the central hub for all major mountain travel in the state. Whether you are flying into <strong className="text-white font-bold">Jolly Grant Airport</strong>, arriving at the <strong className="text-white font-bold">Dehradun Railway Station</strong>, or planning to explore the local sights, Uttarakhand Cab 24/7 provides the most reliable transportation in the city.
                </p>
              </motion.div>

              <TrustBanner />

              <motion.div {...fadeInUp}>
                <h2 className="font-heading font-black text-3xl text-white uppercase tracking-tighter mb-6">Airport & Railway Station Transfers</h2>
                <p>
                  Navigating a new city after a long flight or train ride can be exhausting. Our verified local drivers ensure a smooth, hassle-free pickup. We actively track flights arriving at Jolly Grant Airport to ensure your cab is waiting for you the moment you land, even if your flight is delayed. From the airport or railway station, we provide direct drops to your hotel in Dehradun, or direct transfers to Mussoorie, Rishikesh, and beyond.
                </p>
              </motion.div>

              <motion.div {...fadeInUp}>
                <h2 className="font-heading font-black text-3xl text-white uppercase tracking-tighter mb-6">Top Attractions for Local Sightseeing</h2>
                <p className="mb-8">
                  Book our full-day (8 hours / 80 km) local sightseeing taxi package starting at just ₹3,000 to comfortably explore Dehradun&apos;s famous landmarks:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {attractions.map((a) => (
                    <div key={a.name} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 hover:border-[#F7941D]/30 transition-colors">
                      <h3 className="font-black text-xl text-white mb-3">{a.name}</h3>
                      <p className="text-sm mb-6">{a.desc}</p>
                      <div className="bg-[#1A1A1A] px-4 py-3 rounded-xl border border-white/10 text-xs font-bold text-white flex items-start gap-2 shadow-sm">
                        <span className="text-[#F7941D] shrink-0">💡 Tip:</span>
                        <span>{a.tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeInUp}>
                <h2 className="font-heading font-black text-3xl text-white uppercase tracking-tighter mb-6 mt-12">Popular Outstation Routes from Dehradun</h2>
                <div className="space-y-4">
                  {outstationRoutes.map((route) => (
                    <div key={route.dest} className="bg-[#1A1A1A] border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                      <div>
                        <h3 className="font-black text-xl text-white mb-2 flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#F7941D]" /> Dehradun to {route.dest}
                        </h3>
                        <p className="text-sm font-light">{route.desc}</p>
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
              </motion.div>

              <DriverIntelligenceBox tips={driverTips} />

              <BookingCTA destination="Dehradun" fare="₹3,000/day" />

              <FAQSection faqs={dehradunFAQs} title="Dehradun Taxi FAQs" />
            </div>

            {/* Right: Sticky Sidebar Widgets */}
            <div className="lg:col-span-1 space-y-8">

              {/* Dark Mode Pricing Widget */}
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />

                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Dehradun Taxi Rates
                </h4>

                <div className="space-y-4 text-sm font-medium mb-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70">Airport to City</span><span className="text-[#F7941D] font-black text-lg">₹1,300</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70">Airport to Mussoorie</span><span className="text-[#F7941D] font-black text-lg">₹3,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70">Full Day Sightseeing</span><span className="text-[#F7941D] font-black text-lg">₹3,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70">City to Mussoorie</span><span className="text-[#F7941D] font-black text-lg">₹2,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/70">City to Rishikesh</span><span className="text-[#F7941D] font-black text-lg">₹2,300</span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <a href="tel:+919258912169" className="w-full px-6 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_20px_-5px_#F7941D]">
                    <Phone className="w-4 h-4" /> Call: +91 92589 12169
                  </a>
                  <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="w-full px-6 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3 hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)]">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Nearby Destinations Widget */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Day Trips from Dehradun</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Mussoorie', dist: '35 km', fare: '₹2,000', link: '/mussoorie' },
                    { name: 'Rishikesh', dist: '50 km', fare: '₹2,300', link: '/rishikesh' },
                    { name: 'Haridwar', dist: '55 km', fare: '₹2,000', link: '/haridwar' },
                    { name: 'Dhanaulti', dist: '70 km', fare: '₹2,500', link: '/services/dhanaulti-taxi-service' },
                  ].map((d) => (
                    <li key={d.name} className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-[#F7941D]/30 transition-colors group">
                      <Link href={d.link} className="flex flex-col">
                        <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors">{d.name}</span>
                        <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">Distance: {d.dist}</span>
                      </Link>
                      <div className="text-right">
                        <span className="text-[#F7941D] font-black text-sm">{d.fare}</span>
                        <ArrowRight className="w-3 h-3 text-gray-300 ml-auto mt-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* From Our Blog */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">From Our Blog</h4>
                <ul className="space-y-3">
                  {[
                    { title: 'Delhi to Dehradun Expressway Guide', href: '/blog/delhi-to-dehradun-taxi-route-toll-guide' },
                    { title: 'Dehradun Local Sightseeing 2026', href: '/blog/dehradun-local-sightseeing-taxi-guide-2026' },
                  ].map((p, i) => (
                    <li key={i}>
                      <Link href={p.href} className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-[#F7941D]/30 transition-colors group">
                        <span className="text-sm font-semibold text-white group-hover:text-[#F7941D] transition-colors">{p.title}</span>
                        <ArrowRight className="w-4 h-4 text-[#F7941D] shrink-0 group-hover:translate-x-1 transition-transform" />
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
