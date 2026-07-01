import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, Clock, Car, CheckCircle2, Users, 
  MessageCircle, Phone, Map, ArrowRight, Star 
} from 'lucide-react';
import { StrategicCTA, TrustBanner } from '@/components/CTABoxes';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { TiltCard } from '@/components/TiltCard';

export const metadata: Metadata = {
  title: 'Uttarakhand Tour Packages 2026 | Char Dham, Nainital, Mussoorie',
  description: 'Expertly curated multi-day taxi tours in Uttarakhand. Private vehicles, hill-certified drivers, and custom itineraries for Char Dham, Nainital, and Mussoorie.',
  alternates: { canonical: 'https://uttarakhand.cab/tour-packages' },
  openGraph: {
    title: 'Uttarakhand Tour Packages 2026 | Char Dham & Nainital',
    description: 'Expertly curated multi-day taxi tours in Uttarakhand. Private vehicles, hill-certified drivers, and custom itineraries for Char Dham, Nainital, and Mussoorie.',
    url: 'https://uttarakhand.cab/tour-packages',
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
const packages = [
  {
    id: 'char-dham',
    title: 'Char Dham Yatra',
    subtitle: 'Delhi to Delhi Full Circuit',
    duration: '10–12 Days',
    route: 'Delhi → Yamunotri → Gangotri → Kedarnath → Badrinath → Rishikesh',
    vehicle: 'Innova Crysta Premium',
    cost: 'Sedan ₹40,000 · SUV ₹75,000–80,000',
    bestFor: 'Pilgrimage Groups',
    image: '/assets/images/dest-char-dham.jpg',
    featured: true,
  },
  {
    id: 'do-dham',
    title: 'Do Dham Yatra',
    duration: '6–7 Days',
    route: 'Guptkashi → Kedarnath → Badrinath → Rishikesh',
    vehicle: 'SUV / Sedan',
    cost: 'Sedan ₹28,000 · SUV ₹45,000',
    bestFor: 'Religious Trips',
    image: '/assets/images/dest-kedarnath.jpg',
  },
  {
    id: 'nainital-corbett',
    title: 'Lakes & Wildlife',
    duration: '3–5 Days',
    route: 'Nainital → Jim Corbett → Return',
    vehicle: 'Sedan / SUV',
    cost: '₹20,000 – ₹30,000',
    bestFor: 'Families & Honeymoons',
    image: '/assets/images/dest-nainital.jpg',
  },
  {
    id: 'mussoorie-dhanaulti',
    title: 'Queen of Hills',
    duration: '2–3 Days',
    route: 'Mussoorie → Dhanaulti Getaway',
    vehicle: 'Sedan / SUV',
    cost: '₹14,000 – ₹18,500',
    bestFor: 'Weekend Trips',
    image: '/assets/images/dest-mussoorie.jpg',
  },
  {
    id: 'rishikesh-haridwar',
    title: 'Spiritual Escape',
    duration: '2–3 Days',
    route: 'Haridwar → Rishikesh Spiritual Tour',
    vehicle: 'Sedan (Dzire / Etios)',
    cost: 'Starts at ₹12,000',
    bestFor: 'Adventure Trips',
    image: '/assets/images/dest-rishikesh.jpg',
  },
];

const packageFAQs = [
  {
    question: 'Are hotel accommodations and meals included in these packages?',
    answer: 'No. These are dedicated "Taxi-Only" tour packages. We provide the vehicle, fuel, and an expert local driver for the entire duration of your trip. You have the complete freedom to book your own preferred hotels and meals.'
  },
  {
    question: 'Can I customize the route or add extra days to the package?',
    answer: 'Absolutely! Our packages are fully flexible. If you want to spend an extra day in Mussoorie or add Auli to your Do Dham trip, simply message us on WhatsApp and we will recalculate a custom fixed fare for you.'
  },
  {
    question: 'How do I pay for a multi-day package?',
    answer: 'We require a token advance payment (usually 10-20%) to confirm your booking and lock in the vehicle for those specific dates. The remaining balance can be paid directly to the driver in installments during your trip.'
  },
  {
    question: 'Do the prices include toll taxes and parking?',
    answer: 'For massive routes like the 12-Day Char Dham Yatra, we offer options to include or exclude tolls and parking based on your preference. For standard outstation tours, tolls, state taxes, and parking are generally paid at actuals during the trip.'
  }
];

export default function TourPackages() {
  return (
    <main className="bg-[#1A1A1A] selection:bg-[#F7941D]/30">
      {/* GEO — Direct Answer Block, visually hidden */}
      <section className="sr-only">
        <GEOAnswerBox
          question="What taxi tour packages does Uttarakhand Cab 24/7 offer?"
          answer="Uttarakhand Cab 24/7 offers private multi-day taxi tour packages including: Char Dham Yatra (10–12 days, Sedan from ₹40,000 / SUV ₹75,000–80,000), Do Dham Kedarnath-Badrinath (5–6 days, Sedan from ₹28,000 / SUV ₹45,000), Do Dham Yamunotri-Gangotri (4–5 days, from ₹12,000), Ek Dham single pilgrimage (2–3 days, from ₹7,500), Nainital-Kumaon circuit (3–4 days, from ₹14,000), and Mussoorie-Dhanaulti (1–2 days, from ₹3,500). All packages include a private vehicle, experienced hill driver, and flexible itineraries."
          facts={[
            { label: 'Char Dham Yatra', value: '10–12 days · Sedan ₹40,000 · SUV ₹75,000–80,000' },
            { label: 'Do Dham (Kedarnath+Badrinath)', value: '5–6 days · Sedan ₹28,000 · SUV ₹45,000' },
            { label: 'Do Dham (Yamunotri+Gangotri)', value: '4–5 days · From ₹12,000' },
            { label: 'Ek Dham (Single Pilgrimage)', value: '2–3 days · From ₹7,500' },
            { label: 'Nainital–Kumaon Circuit', value: '3–4 days · From ₹14,000' },
            { label: 'Vehicle Type', value: 'Private AC Sedan or SUV' },
          ]}
          source="Uttarakhand Cab 24/7 — Tour Packages 2026"
        />
      </section>
      
      {/* 1. HERO SECTION: 100% SSR Glassmorphism & Depth */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-navy">
        <Image
          src="/assets/images/hero-mountain-road.jpg"
          alt="Mountain Road"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-transparent" />
        
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-3xl">
            {/* Glass Navigation Pill */}
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Tour Packages</span>
            </nav>

            <h1 className="font-heading font-black text-5xl md:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-8">
              Explore <br/>
              <span className="text-[#F7941D]">Uttarakhand</span>
            </h1>
            
            <p className="text-white/70 text-lg md:text-2xl max-w-2xl font-light leading-relaxed mb-10">
              Expertly curated multi-day taxi tours. Private vehicles, hill-certified drivers, and absolute freedom to explore at your own pace.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="tel:+919258912169" className="px-10 py-5 bg-[#F7941D] text-white font-black rounded-2xl hover:shadow-[0_0_30px_-5px_#f7941d] transition-all transform hover:-translate-y-1 uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                <Phone className="w-4 h-4 shrink-0" /> Call for Custom Plan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PACKAGES: Advanced Bento Grid Layout */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="mb-16">
            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-4">
              Curated <br/> Itineraries
            </h2>
            <p className="text-white/70 text-lg font-light max-w-2xl">Every tour is 100% private. Your vehicle, your schedule, our mountain expertise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
            {packages.map((pkg) => (
              <TiltCard
                key={pkg.id}
                wrapperClassName={pkg.featured ? 'md:col-span-2 md:row-span-2' : ''}
                className="overflow-hidden rounded-[2.5rem] bg-[#1A1A1A] border border-white/10 shadow-sm group"
                intensityX={6} intensityY={8}
                showGlow={false}
              >
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                />

                {/* 2026 Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1F20] via-[#1E1F20]/40 to-transparent" />

                <div className="absolute top-6 left-6 flex gap-2" style={{ transform: 'translateZ(40px)' }}>
                   <span className="bg-[#F7941D] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {pkg.duration}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-3.5 h-3.5 fill-[#F7941D] text-[#F7941D]" />
                    <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em]">{pkg.bestFor}</p>
                  </div>

                  <h3 className={`${pkg.featured ? 'text-3xl md:text-5xl' : 'text-2xl'} font-black text-white uppercase tracking-tighter leading-tight mb-4`}>
                    {pkg.title}
                  </h3>

                  <div className="flex flex-col gap-1 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-white/80 text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[#F7941D] shrink-0" /> <span className="line-clamp-1">{pkg.route}</span>
                    </p>
                    <p className="text-white font-black text-lg mt-1">{pkg.cost}</p>
                  </div>

                  <a
                    href={`https://wa.me/919258912169?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.title} package.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors group-hover:text-[#F7941D]"
                  >
                    Get Quote <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FAQS: Modern Typography & Charcoal palette */}
      <section className="py-24 bg-[#1A1A1A] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-white text-4xl font-black tracking-tighter uppercase mb-2">Tour Knowledge</h2>
            <p className="text-white/70 font-light italic">Clear answers for a peaceful journey.</p>
          </div>
          <FAQSection faqs={packageFAQs} />
        </div>
      </section>

      {/* Contextual Links: blog + destinations */}
      <section className="py-16 bg-[#1A1A1A] px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-8 text-center">Plan Your Trip — Useful Guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: '7-Day Uttarakhand Tour from Delhi', href: '/blog/delhi-to-uttarakhand-tour-package-7-days', tag: 'Tour Package' },
              { title: 'Char Dham Yatra Package Guide', href: '/blog/char-dham-yatra-taxi-package-guide', tag: 'Pilgrimage' },
              { title: 'Delhi to Jim Corbett Trip Guide', href: '/blog/delhi-to-jim-corbett-taxi-trip-guide', tag: 'Wildlife' },
              { title: 'Dehradun to Auli Trip Guide', href: '/blog/dehradun-to-auli-taxi-trip-guide', tag: 'Adventure' },
              { title: 'Mussoorie Destination Guide', href: '/mussoorie', tag: 'Hill Station' },
              { title: 'All Destinations', href: '/destinations', tag: 'Explore' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/10 hover:border-[#F7941D]/40 hover:shadow-md transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F7941D] mb-2 block">{item.tag}</span>
                <span className="text-sm font-bold text-white group-hover:text-[#F7941D] transition-colors leading-tight">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA: Bold Advanced Minimalism */}
      <section className="py-32 bg-[#1A1A1A] px-4">
        <div className="max-w-page mx-auto">
           <div className="bg-[#1A1A1A] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl border border-[#333537]">
              {/* Subtle Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F7941D] rounded-full opacity-10 blur-[120px] transition-opacity duration-700 group-hover:opacity-20"></div>
              
              <div className="relative z-10">
                <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                  Custom <br/> <span className="text-[#F7941D]">Itinerary?</span>
                </h2>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  Don&apos;t see exactly what you want? Our dispatch team can create a custom plan specifically for your dates and group size.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="tel:+919258912169" className="px-12 py-6 bg-[#F7941D] text-white font-black rounded-2xl hover:scale-105 hover:bg-[#D97E10] transition-all uppercase tracking-widest text-sm shadow-xl flex items-center gap-3">
                    <Phone className="w-5 h-5 shrink-0" /> Call 24/7 Support
                  </a>
                </div>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
