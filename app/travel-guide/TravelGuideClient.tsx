'use client'; 

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Calendar, AlertTriangle, Check, Compass, ShieldCheck, Info, ThermometerSun, Users, Gauge } from 'lucide-react';
import { StrategicCTA } from '@/components/CTABoxes';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
} as const;

// ----------------------------------------------------------------------
// DATA ARRAYS (100% PRESERVED FOR SEO)
// ----------------------------------------------------------------------
const seasons = [
  { name: 'Spring (March-May)', weather: '10-25°C', best: 'Hill stations, Char Dham Yatra opening', crowds: 'Moderate to High', avoid: 'Nothing major', icon: '🌸' },
  { name: 'Summer (June)', weather: '20-35°C', best: 'Mussoorie, Rishikesh (start of rafting season)', crowds: 'Very High (school holidays)', avoid: 'Dehradun city (hot)', icon: '☀' },
  { name: 'Monsoon (July-August)', weather: '20-30°C', best: 'Lush green scenery, fewer crowds', crowds: 'Low', avoid: 'High mountain routes, Kedarnath, Badrinath', icon: '🌧' },
  { name: 'Autumn (Sept-Oct)', weather: '10-25°C', best: 'Best season overall — clear skies, good roads', crowds: 'Moderate', avoid: 'Nothing — ideal season', icon: '🍂' },
  { name: 'Winter (Nov-Feb)', weather: '-5 to 15°C', best: 'Snow at Mussoorie, Dhanaulti, Auli', crowds: 'Low to Moderate', avoid: 'Kedarnath/Badrinath (temples closed Nov-Apr)', icon: '❄' },
];

const tips = [
  { category: 'Documents', icon: Compass, items: ['Valid ID (Aadhar/Passport)', 'Char Dham registration slip', 'Medical certificate (if 50+, for pilgrimage)', 'Hotel booking confirmations', 'Emergency contact list'] },
  { category: 'Clothing', icon: ThermometerSun, items: ['Warm layers even in May (mountain evenings are cold)', 'Waterproof jacket for monsoon', 'Comfortable walking shoes', 'Sunglasses and sunscreen at altitude', 'Quick-dry clothing for rafting'] },
  { category: 'Health & Safety', icon: ShieldCheck, items: ['Altitude sickness medicine (Diamox) for 2,500+ meters', 'Water purification tablets or UV pen', 'First aid kit with bandages and antiseptic', 'Motion sickness medication for mountain roads', 'Personal prescription medicines with extra supply'] },
  { category: 'Money & Connectivity', icon: Gauge, items: ['Carry sufficient cash (ATMs scarce in remote areas)', 'Airtel/Jio SIM for best 4G coverage in Uttarakhand', 'Download offline maps before leaving cities', 'Emergency cash in a separate location', 'Travel insurance for pilgrimage and adventure activities'] },
];

export default function TravelGuideClient() {
  return (
    <div className="bg-[#1A1A1A] selection:bg-[#F7941D]/30">

      {/* 1. HERO SECTION: Clean & Editorial */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[#121212] border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F7941D] opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-page mx-auto relative z-10 text-left">
          {/* Glass Navigation Pill */}
          <nav className="inline-flex items-center gap-2 bg-[#1A1A1A] backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 shadow-sm text-white/70 text-xs font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#F7941D]">Travel Guide</span>
          </nav>

          <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Pro Tips for 2026</p>
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-8">
            Himalayan <br/>
            <span className="text-[#F7941D]">Travel Guide.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Everything you need to plan the perfect Uttarakhand trip — from the best seasons to road conditions and packing tips.
          </p>
        </div>
      </section>

      {/* 2. BEST TIME: High-Contrast Bento Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-4">
              Best Time to Visit <span className="text-[#F7941D]">Uttarakhand</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#F7941D]"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seasons.map((s, i) => (
              <motion.div key={s.name} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-white/10 hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{s.icon}</div>
                <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-6">{s.name}</h3>
                <div className="space-y-4 text-sm text-white/70 font-light">
                  <p className="flex items-start gap-2">
                    <span className="font-black uppercase text-[10px] tracking-widest text-white mt-1 shrink-0">Weather:</span>
                    {s.weather}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-black uppercase text-[10px] tracking-widest text-white mt-1 shrink-0">Best for:</span>
                    {s.best}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-black uppercase text-[10px] tracking-widest text-white mt-1 shrink-0">Crowds:</span>
                    {s.crowds}
                  </p>
                  <div className="pt-4 border-t border-white/10 mt-4">
                    <p className="text-red-600 font-bold flex items-center gap-2">
                       <AlertTriangle className="w-4 h-4" />
                       <span className="uppercase text-[10px] tracking-widest">Avoid:</span> {s.avoid}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PACKING TIPS: SaaS Grid Layout */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <motion.div {...fadeInUp} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter">
              Essential <span className="text-[#F7941D]">Packing</span> List
            </h2>
            <p className="text-white/70 font-light max-w-sm">Be prepared for the unpredictable Himalayan micro-climates.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tips.map((t, i) => (
              <motion.div key={t.category} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-white/10 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center shrink-0 group-hover:bg-[#F7941D]/10 transition-colors">
                      <t.icon className="w-6 h-6 text-[#F7941D]" />
                   </div>
                   <h3 className="font-heading font-black text-xl text-white uppercase tracking-tighter">{t.category}</h3>
                </div>
                <ul className="space-y-4">
                  {t.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/70 font-light text-base leading-relaxed">
                      <Check className="w-5 h-5 text-[#F7941D] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ROAD CONDITIONS: Modern SaaS Table */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-8">Road Conditions Guide</h2>

            <div className="bg-[#2D1515] border border-[#FCA5A5] p-8 rounded-[2rem] flex flex-col md:flex-row items-start gap-6 hover:shadow-md transition-shadow mb-12">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-black text-red-800 uppercase tracking-widest text-sm mb-2">Monsoon Warning (July-August)</p>
                <p className="text-red-900/70 font-light leading-relaxed">Mountain roads can close due to landslides during monsoon. Always check road status before starting. Our drivers monitor BRO (Border Roads Organisation) updates and will route around closures.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse bg-[#1A1A1A] whitespace-nowrap">
                  <thead>
                    <tr className="bg-[#1A1A1A] text-white uppercase tracking-[0.15em] text-[10px] font-black">
                      <th className="p-6 md:p-8 border-r border-white/5">Route</th>
                      <th className="p-6 md:p-8 border-r border-white/5 text-center">Condition</th>
                      <th className="p-6 md:p-8 border-r border-white/5 text-center">Hairpin Bends</th>
                      <th className="p-6 md:p-8">Monsoon Risk</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {[
                      { route: 'Dehradun → Mussoorie', cond: 'Good', bends: '25+', risk: 'Moderate (Rajpur Road)' },
                      { route: 'Dehradun → Rishikesh', cond: 'Excellent', bends: '0', risk: 'Low (highway)' },
                      { route: 'Kathgodam → Nainital', cond: 'Good', bends: '20+', risk: 'Moderate (landslide zones)' },
                      { route: 'Rishikesh → Kedarnath (Gaurikund)', cond: 'Fair to Good', bends: '50+', risk: 'High (known landslide areas)' },
                      { route: 'Joshimath → Badrinath', cond: 'Fair', bends: '30+', risk: 'High (BRO managed)' },
                    ].map((r, i) => (
                      <tr key={r.route} className={`border-b border-gray-50 hover:bg-[#1A1A1A]/50 transition-colors ${i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#121212]'}`}>
                        <td className="p-6 md:p-8 font-black uppercase tracking-tighter border-r border-white/10">{r.route}</td>
                        <td className="p-6 md:p-8 border-r border-white/10 text-center">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm ${
                            r.cond === 'Excellent' ? 'bg-green-100 text-green-800' :
                            r.cond === 'Good' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {r.cond}
                          </span>
                        </td>
                        <td className="p-6 md:p-8 border-r border-white/10 text-center font-bold text-lg tracking-tighter">{r.bends}</td>
                        <td className="p-6 md:p-8 text-white/70 font-light italic">{r.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-[#1A1A1A] p-6 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] flex items-center gap-3">
                <Info className="w-4 h-4 text-[#F7941D]" />
                * Real-time road updates provided by our drivers during transit.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. STRATEGIC CTA */}
      <section className="py-24 bg-[#1A1A1A] px-4">
        <div className="max-w-page mx-auto">
          <section className="py-16 px-4 bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-8">Destination Guides & Travel Blog</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Mussoorie Destination Guide', href: '/mussoorie', tag: 'Hill Station' },
              { title: 'Rishikesh Destination Guide', href: '/rishikesh', tag: 'Spiritual' },
              { title: 'Kedarnath Destination Guide', href: '/kedarnath', tag: 'Pilgrimage' },
              { title: 'Nainital Destination Guide', href: '/nainital', tag: 'Lakes' },
              { title: 'Char Dham Yatra Guide', href: '/char-dham', tag: 'Yatra' },
              { title: 'All Destinations', href: '/destinations', tag: 'Explore' },
              { title: '7-Day Uttarakhand Tour', href: '/blog/delhi-to-uttarakhand-tour-package-7-days', tag: 'Blog' },
              { title: 'Kedarnath Trek Prep 2026', href: '/blog/kedarnath-trek-preparation-guide-2026', tag: 'Blog' },
              { title: 'Best Time to Visit Mussoorie', href: '/blog/best-time-to-visit-mussoorie', tag: 'Blog' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/10 hover:border-[#F7941D]/40 hover:shadow-md transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F7941D] mb-2 block">{item.tag}</span>
                <span className="text-sm font-bold text-white group-hover:text-[#F7941D] transition-colors leading-tight">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StrategicCTA heading="Plan Your Uttarakhand Trip" subtext="Our local drivers double as expert guides. Fixed fares, no hidden charges." />
        </div>
      </section>

    </div>
  );
}
