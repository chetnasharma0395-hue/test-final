import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, Clock, ArrowRight, Shield, Car, 
  CheckCircle2, HelpCircle, Phone, Compass 
} from 'lucide-react';
import { StrategicCTA } from '@/components/CTABoxes';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { CardCarousel } from '@/components/CardCarousel';

export const metadata: Metadata = {
  title: 'Uttarakhand Destinations | Hill Stations, Pilgrimage & Adventure',
  description: 'Explore every Uttarakhand destination we cover — Mussoorie, Rishikesh, Nainital, Kedarnath, Char Dham, Haridwar, Dehradun. Distances, fares, and travel times for each.',
  alternates: { canonical: 'https://uttarakhand.cab/destinations' },
  openGraph: {
    title: 'Uttarakhand Destinations | Hill Stations & Pilgrimage',
    description: 'Explore every Uttarakhand destination we cover — Mussoorie, Rishikesh, Nainital, Kedarnath, Char Dham, Haridwar, Dehradun. Distances, fares, and travel times for each.',
    url: 'https://uttarakhand.cab/destinations',
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
const allDestinations = [
  { name: 'Mussoorie', tagline: 'Queen of Hills', image: '/assets/images/dest-mussoorie.jpg', distance: '35 km from Dehradun', time: '1.5 hrs', fare: 'From ₹2,000', link: '/mussoorie', category: 'Hill Station' },
  { name: 'Rishikesh', tagline: 'Yoga Capital', image: '/assets/images/dest-rishikesh.jpg', distance: '50 km from Dehradun', time: '1.5 hrs', fare: 'From ₹2,300', link: '/rishikesh', category: 'Spiritual & Adventure' },
  { name: 'Nainital', tagline: 'Lake District', image: '/assets/images/dest-nainital.jpg', distance: '35 km from Kathgodam', time: '1.5 hrs', fare: 'From ₹1,500', link: '/nainital', category: 'Hill Station' },
  { name: 'Kedarnath', tagline: 'Sacred Jyotirlinga', image: '/assets/images/dest-kedarnath.jpg', distance: '250 km from Dehradun', time: '8-9 hrs', fare: 'From ₹8,500', link: '/kedarnath', category: 'Pilgrimage' },
  { name: 'Char Dham', tagline: 'Spiritual Circuit', image: '/assets/images/dest-char-dham.jpg', distance: '900+ km circuit', time: '10-12 days', fare: 'From ₹40,000', link: '/char-dham', category: 'Pilgrimage' },
  { name: 'Haridwar', tagline: 'Gateway to Gods', image: '/assets/images/dest-haridwar-rishikesh.jpg', distance: '55 km from Dehradun', time: '1.5 hrs', fare: 'From ₹2,000', link: '/haridwar', category: 'Spiritual' },
  { name: 'Dehradun', tagline: 'Capital City', image: '/assets/images/dest-dehradun.jpg', distance: 'Local', time: '-', fare: 'From ₹1,300', link: '/dehradun', category: 'City' },
];

const faqs = [
  {
    q: 'Can I book a custom multi-city tour?',
    a: 'Absolutely! We specialize in custom itineraries. Whether you want to cover Mussoorie and Rishikesh in one trip, or plan a 7-day Kumaon exploration, we provide dedicated cabs and experienced drivers for your entire journey.'
  },
  {
    q: 'Are your drivers familiar with these remote hill stations?',
    a: 'Yes. Navigating destinations like Kedarnath (Gaurikund) or upper Nainital requires specialized mountain driving experience. All our drivers are Uttarakhand locals who know these mountain roads, weather patterns, and shortcuts perfectly.'
  },
  {
    q: 'Do you cover offbeat destinations not listed here?',
    a: 'Yes, we provide taxi services to all offbeat locations across Uttarakhand including Chopta, Auli, Munsiyari, Chakrata, and Lansdowne. Just reach out via WhatsApp for a custom fixed-price quote.'
  }
];

export default function Destinations() {
  return (
    <main className="bg-[#1A1A1A] selection:bg-[#F7941D]/30">
      {/* GEO — Direct Answer Block, visually hidden */}
      <section className="sr-only">
        <GEOAnswerBox
          question="Which destinations does Uttarakhand Cab 24/7 cover?"
          answer="Uttarakhand Cab 24/7 provides taxi service to all major Uttarakhand destinations including Mussoorie (35 km, ₹2,000), Rishikesh (50 km, ₹2,300), Haridwar (55 km, ₹2,000), Nainital (280 km, ₹7,000), Kedarnath (250 km, ₹8,500), Badrinath (320 km, ₹9,000), Char Dham Yatra, Valley of Flowers, Auli, Jim Corbett, Chopta, Dhanaulti, and Chandigarh. All routes available 24/7 with fixed fares from Dehradun."
          facts={[
            { label: 'Dehradun–Mussoorie', value: '35 km / ₹2,000' },
            { label: 'Dehradun–Rishikesh', value: '50 km / ₹2,300' },
            { label: 'Dehradun–Haridwar', value: '55 km / ₹2,000' },
            { label: 'Dehradun–Nainital', value: '280 km / ₹7,000' },
            { label: 'Dehradun–Kedarnath', value: '250 km / ₹8,500' },
            { label: 'Dehradun–Badrinath', value: '320 km / ₹9,000' },
            { label: 'Char Dham Package', value: 'From ₹40,000' },
            { label: 'Availability', value: '24/7 Fixed Fares' },
          ]}
          source="Uttarakhand Cab 24/7 — Destinations 2026"
        />
      </section>
      
      {/* 1. HERO SECTION: 100% SSR Deep Contrast & Glass Navigation */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#121212]">
         <div className="absolute inset-0 opacity-20">
          <Image
            src="/assets/images/hero-mountain-road.jpg"
            alt="Mountain Road"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Advanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />

        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            {/* Glass Navigation Pill */}
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Destinations</span>
            </nav>

            <h1 className="font-heading font-black text-5xl md:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-8">
              Explore <br/>
              <span className="text-[#F7941D]">Devbhoomi</span>
            </h1>
            
            <p className="text-white/70 text-lg md:text-2xl max-w-2xl font-light leading-relaxed mb-10">
              From serene hill stations to sacred Himalayan shrines, we provide reliable, fixed-fare taxi services to every corner of Uttarakhand.
            </p>

            <div className="flex flex-wrap gap-6 text-white/50 text-xs font-black uppercase tracking-widest">
               <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#F7941D]" /> Verified Drivers</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Fixed Fares</span>
               <span className="flex items-center gap-2"><Car className="w-4 h-4 text-[#F7941D]" /> AC Vehicles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DESTINATIONS GRID: Modern App Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#1A1A1A]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[#F7941D] text-sm font-black uppercase tracking-[0.3em] mb-3 flex items-center justify-center md:justify-start gap-2">
                <Compass className="w-4 h-4" /> Choose Your Journey
              </p>
              <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                Popular <br className="hidden md:block" /> Destinations
              </h2>
            </div>
          </div>

          <CardCarousel
            items={allDestinations}
            getKey={(dest) => dest.name}
            cardWidth={340}
            cardGap={20}
            ariaLabel="Destinations carousel — use arrow keys to navigate"
            renderCard={(dest, isActive) => (
              <Link
                href={dest.link}
                onClick={(e) => { if (!isActive) e.preventDefault(); }}
                className="group flex flex-col h-full bg-[#1A1A1A] rounded-[2rem] border border-white/10 overflow-hidden relative"
                style={{
                  boxShadow: isActive ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(247,148,29,0.10)' : 'none',
                  borderColor: isActive ? 'rgba(247,148,29,0.25)' : 'rgba(255,255,255,0.08)',
                  minHeight: 500,
                }}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-56 shrink-0 m-2 rounded-[1.5rem]">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="340px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#121212]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {dest.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2">{dest.tagline}</p>
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-4 transition-colors group-hover:text-[#F7941D]">{dest.name}</h3>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-white/70 text-sm font-medium">
                      <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#F7941D]" />
                      </div>
                      <span>{dest.distance}</span>
                    </div>
                    {dest.time !== '-' && (
                      <div className="flex items-center gap-3 text-white/70 text-sm font-medium">
                        <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-[#F7941D]" />
                        </div>
                        <span>{dest.time}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-white font-black text-lg">{dest.fare}</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest transition-colors flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full group-hover:text-[#F7941D]">
                      View <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            )}
          />
        </div>
      </section>

      {/* 3. STRATEGIC CTA */}
      <section className="py-24 bg-[#1A1A1A] px-4">
        <div className="max-w-page mx-auto">
          <StrategicCTA 
            heading="Don't See Your Destination?" 
            subtext="We cover all of Uttarakhand, including offbeat locations like Chopta and Auli. WhatsApp us for a custom fixed-price quote." 
          />
        </div>
      </section>

      {/* 4. DESTINATIONS FAQ: Minimalist Charcoal Cards */}
      <section className="py-24 bg-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 text-[#F7941D] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
              Destinations FAQ
            </h2>
            <p className="text-white/50 font-light">Important info about our mountain travel policies.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-[#121212] p-8 md:p-10 border border-[#333537] rounded-[2rem] transition-colors hover:border-[#F7941D]/50"
              >
                <h3 className="font-black text-xl mb-4 flex items-start gap-4">
                  <span className="text-[#F7941D] shrink-0">Q.</span> {faq.q}
                </h3>
                <p className="text-white/60 font-light leading-relaxed pl-8 md:pl-10">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="tel:+919258912169" className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-sm transition-colors hover:text-[#F7941D]">
              <Phone className="w-5 h-5" /> Need specific route info? Call +91 92589 12169
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
