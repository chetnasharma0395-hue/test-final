'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageCircle, CheckCircle2, Plane, Mountain, Car, Waves, Info, Compass, Star } from 'lucide-react';
import { BookingCTA, DriverIntelligenceBox, RouteInfoBox, TransportComparison, TrustBanner } from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import { QuickTravelSummary } from '@/components/QuickTravelSummary';
import { rishikeshFAQs } from './data';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
} as const;

// ----------------------------------------------------------------------
// DATA ARRAYS (100% PRESERVED FOR SEO)
// ----------------------------------------------------------------------
const activities = [
  { name: 'River Rafting', desc: 'World-class white-water rafting on the Ganges. Routes range from 9 km to 26 km.', fare: '₹450 - ₹1,500/pax', tip: 'Shivpuri (16 km) is best for beginners.' },
  { name: 'Ganga Aarti', desc: 'A deeply moving evening prayer ceremony at Parmarth Niketan or Triveni Ghat.', fare: 'Free Entry', tip: 'Arrive by 5:30 PM to get a place to sit.' },
  { name: 'Bungee Jumping', desc: 'Jumpin Heights offers India\'s highest fixed platform bungee jump (83 meters).', fare: '₹3,500 approx.', tip: 'Book weeks in advance online; walk-ins rarely get slots.' },
  { name: 'Beatles Ashram', desc: 'The abandoned ashram where The Beatles stayed in 1968. Now a beautiful forest art space.', fare: '₹150 Entry', tip: 'Great for photography. Wear comfortable walking shoes.' },
  { name: 'Yoga & Meditation', desc: 'Hundreds of certified ashrams offering drop-in classes or month-long retreats.', fare: '₹500 - ₹5,000', tip: 'Try a drop-in morning class at Parmarth Niketan.' },
  { name: 'Neer Garh Waterfall', desc: 'A stunning multi-tier waterfall accessible by a short, scenic hike.', fare: '₹30 Entry', tip: 'Go early morning for a quiet dip in the natural pools.' },
];

const outstationRoutes = [
  { dest: 'Shivpuri / Marine Drive', desc: 'The starting points for all major river rafting expeditions upstream.', fare: 'Local Rates Apply', time: '30-45 Mins' },
  { dest: 'Haridwar', desc: 'A quick drive down the highway to the sacred Har Ki Pauri ghat.', fare: 'From ₹1,700', time: '45 Mins' },
  { dest: 'Char Dham Circuit', desc: 'Rishikesh is the official "Gateway to the Garhwal Himalayas" for the Yatra.', fare: 'Custom Quotes', time: '10-12 Days' },
];

const driverTips = [
  'If you want to go river rafting, book through a certified operator. Avoid random touts on the street. Our drivers can recommend safe, licensed camps.',
  'Laxman Jhula bridge is currently closed for safety/renovation. You must use Ram Jhula or Janki Jhula to cross the Ganges on foot.',
  'Traffic inside Rishikesh (especially near Tapovan) can gridlock on weekends. Start your day trips by 6:00 AM to stay ahead of the massive crowds.',
  'Wear quick-dry sports clothing for rafting, and leave all your dry clothes and valuables securely locked in our taxi. Your driver will wait for you at the end point.',
];

export default function RishikeshClient() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/images/dest-rishikesh.jpg" alt="Rishikesh Taxi Service" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C3F] via-[#0B1C3F]/90 to-transparent" />

        <div className="max-w-page mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl">
            {/* Glass Navigation Pill */}
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Rishikesh</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4" /> Yoga Capital of the World
            </p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Rishikesh <br/>
              <span className="text-[#F7941D]">Taxi Service</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              Dehradun to Rishikesh fixed fares from ₹2,300. Perfect for river rafting, Ganga Aarti, airport transfers, and yoga retreats.
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
              <span className="flex items-center gap-2"><Plane className="w-4 h-4 text-[#F7941D]" /> Airport Pickups</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. QUICK SUMMARY (Floating Implementation) */}
      <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-page mx-auto">
          <QuickTravelSummary
            destination="Rishikesh"
            distance="50 km from Dehradun"
            travelTime="1.5 - 2 hours"
            taxiFareRange="₹2,300 - ₹3,300"
            bestTime="September - April (Ideal for Rafting)"
            idealMode="Private Taxi (Door-to-door convenience, taxi secures luggage while you raft)"
          />
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">

          <div className="mb-12">
            <RouteInfoBox from="Dehradun" to="Rishikesh" distance="50 km" time="1.5 hrs" fare="₹2,300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left/Main Column: Article Content */}
            <div className="lg:col-span-2 space-y-12">

              <motion.div {...fadeInUp}>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Rishikesh: Adventure Meets Spirituality
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  Sitting at the exact point where the Ganges River flows out of the Himalayas and into the plains, Rishikesh is a city of incredible contrasts. It is globally recognized as the &quot;Yoga Capital of the World,&quot; a deeply spiritual pilgrimage town, and India&apos;s premier hub for extreme adventure sports. Located just 50 km from Dehradun, it is our most frequently booked day-trip destination.
                </p>
                <TrustBanner />
              </motion.div>

              <motion.div {...fadeInUp}>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Dehradun Airport & Station to Rishikesh
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg">
                  <strong className="text-white font-bold">Jolly Grant Airport</strong> is highly convenient for Rishikesh visitors, located just 20 km away. Our verified drivers provide 24/7 direct airport-to-Rishikesh transfers, meaning you can step off your flight and be at your ashram or hotel in under 45 minutes. We also offer direct pickups from the <strong className="text-white font-bold">Dehradun Railway Station</strong> for those arriving by train.
                </p>
              </motion.div>

              <motion.div {...fadeInUp}>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Top Activities in Rishikesh
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  Whether you want to navigate class-IV rapids or sit silently by the Ganges, Rishikesh has something for everyone. Here are the most popular activities:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activities.map((a) => (
                    <div key={a.name} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all group flex flex-col h-full">
                      <h3 className="font-black text-white text-xl tracking-tight mb-3">{a.name}</h3>
                      <p className="text-white/70 font-light text-sm leading-relaxed mb-6 flex-1">{a.desc}</p>

                      <div className="flex items-center gap-2 text-white text-sm font-black uppercase tracking-widest mb-4 bg-[#1A1A1A] px-4 py-2 rounded-xl w-fit border border-white/10">
                        <span className="text-[#F7941D]">{a.fare}</span>
                      </div>

                      <div className="bg-[#1A1A1A] px-4 py-3 rounded-xl text-xs font-bold text-white flex items-start gap-2 shadow-sm border border-white/10">
                        <span className="text-[#F7941D] shrink-0">💡 Tip:</span>
                        <span className="font-light leading-relaxed">{a.tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <DriverIntelligenceBox tips={driverTips} />

              <motion.div {...fadeInUp}>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Popular Routes from Rishikesh
                </h2>

                <div className="space-y-4">
                  {outstationRoutes.map((route) => (
                    <div key={route.dest} className="bg-[#1A1A1A] border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                      <div>
                        <h3 className="font-black text-xl text-white mb-2 flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#F7941D]" /> Rishikesh to {route.dest}
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
              </motion.div>

              <motion.div {...fadeInUp}>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Transport Options: Dehradun to Rishikesh
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  While local buses run frequently, they are often overcrowded and drop you at the main bus stand, requiring you to negotiate with local auto-rickshaws to reach Tapovan or your ashram. A private taxi provides seamless, door-to-door comfort.
                </p>

                <TransportComparison
                  route="Dehradun to Rishikesh"
                  busFare="₹120 - ₹200"
                  busTime="2 - 2.5 hours"
                  taxiFare="₹2,300 - ₹3,300"
                  taxiTime="1.5 - 2 hours"
                />
              </motion.div>

              <BookingCTA destination="Rishikesh" fare="₹2,300" />

              {/* Fleet cross-link */}
              <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm p-8 md:p-10 mt-12">
                <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tighter mb-2">Which Vehicle for Rishikesh?</h3>
                <p className="text-white/70 font-light text-sm mb-6">For most travellers, a Sedan or Ertiga is perfect. Traveling as a yoga group or large family? The Innova Crysta offers more comfort on the NH7.</p>
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
                <FAQSection faqs={rishikeshFAQs} title="Rishikesh Taxi FAQs" />
              </div>

            </div>

            {/* Right Column: Sticky Sidebar / Instant Booking Widget */}
            <div className="lg:col-span-1 space-y-8">

              {/* Deep Space Booking Widget */}
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />

                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Book Rishikesh Taxi
                </h4>

                <div className="space-y-4 text-sm font-medium mb-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Dehradun to Rishikesh</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹2,300</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">Airport to Rishikesh</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹1,700</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80 font-light">SUV Upgrade</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹3,300</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/80 font-light">Round Trip (8 Hrs)</span>
                    <span className="text-[#F7941D] font-black text-lg tracking-tight">₹4,500</span>
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
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">Fixed pricing • Secure luggage storage</p>
                </div>
              </div>

              {/* Related Routes Widget */}
              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Related Routes</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Haridwar', dist: '25 km', icon: MapPin, link: '/haridwar', fare: '₹1,700' },
                    { name: 'Dehradun City', dist: '50 km', icon: MapPin, link: '/dehradun', fare: '₹2,300' },
                    { name: 'Shivpuri Rafting Base', dist: '16 km', icon: Waves, link: '/dehradun-to-rishikesh', fare: 'Local' },
                    { name: 'Jolly Grant Airport', dist: '20 km', icon: Plane, link: '/services/jolly-grant-airport-taxi-service', fare: '₹1,700' },
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
                    { title: '3-Day Rishikesh Itinerary', href: '/blog/things-to-do-in-rishikesh-3-day-itinerary' },
                    { title: 'Airport to Rishikesh Taxi Fare', href: '/blog/dehradun-airport-to-rishikesh-taxi-fare' },
                    { title: 'Haridwar to Rishikesh Guide', href: '/blog/haridwar-to-rishikesh-taxi-fare-ashram-drop-guide' },
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
