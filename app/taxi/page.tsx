import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { QuoteWidget } from '@/components/QuoteWidget';
import { Shield, Clock, Check, Phone, MessageCircle, MapPin, CreditCard, HelpCircle, Car, CheckCircle2, Info } from 'lucide-react';
import { getRoute, formatPrice } from '@/lib/priceData';

export const metadata: Metadata = {
  title: 'Book Taxi Online in Uttarakhand | Fixed Fares & Local Drivers',
  description: 'Book your taxi in Dehradun, Mussoorie, Rishikesh, and Char Dham. Get instant WhatsApp quotes, fixed pricing with no hidden fees, and verified local drivers.',
  alternates: { canonical: 'https://uttarakhand.cab/taxi' },
  openGraph: {
    title: 'Book Taxi Online in Uttarakhand | Fixed Fares & Local Drivers',
    description: 'Book your taxi in Dehradun, Mussoorie, Rishikesh, and Char Dham. Get instant WhatsApp quotes, fixed pricing with no hidden fees, and verified local drivers.',
    url: 'https://uttarakhand.cab/taxi',
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
const popularFares = [
  { route: 'Dehradun to Mussoorie', sedan: formatPrice(getRoute('dehradun-mussoorie').sedan), suv: formatPrice(getRoute('dehradun-mussoorie').suv), time: getRoute('dehradun-mussoorie').duration },
  { route: 'Dehradun to Rishikesh', sedan: formatPrice(getRoute('dehradun-rishikesh').sedan), suv: formatPrice(getRoute('dehradun-rishikesh').suv), time: getRoute('dehradun-rishikesh').duration },
  { route: 'Jolly Grant Airport to Mussoorie', sedan: formatPrice(getRoute('jolly-grant-mussoorie').sedan), suv: formatPrice(getRoute('jolly-grant-mussoorie').suv), time: getRoute('jolly-grant-mussoorie').duration },
  { route: 'Haridwar to Rishikesh', sedan: formatPrice(getRoute('haridwar-rishikesh').sedan), suv: formatPrice(getRoute('haridwar-rishikesh').suv), time: getRoute('haridwar-rishikesh').duration },
  { route: 'Dehradun to Nainital', sedan: formatPrice(getRoute('dehradun-nainital').sedan), suv: formatPrice(getRoute('dehradun-nainital').suv), time: getRoute('dehradun-nainital').duration },
  { route: 'Dehradun to Kedarnath (Gaurikund)', sedan: formatPrice(getRoute('dehradun-kedarnath').sedan), suv: formatPrice(getRoute('dehradun-kedarnath').suv), time: getRoute('dehradun-kedarnath').duration },
];

const faqs = [
  {
    q: 'Are there any hidden charges in my taxi quote?',
    a: 'No, we believe in 100% transparent pricing. Your estimated quote includes fuel, state taxes, and toll charges. Note: A nominal night driving charge of ₹300 applies only if you travel between 10:00 PM and 6:00 AM.'
  },
  {
    q: 'Do I need to pay the full amount in advance?',
    a: 'Not at all. We only require a small token advance to confirm and lock in your vehicle. The remaining balance can be paid directly to your driver during the trip.'
  },
  {
    q: 'What is your cancellation policy?',
    a: 'We offer free cancellation up to 2 hours before your scheduled pickup time. Just drop us a WhatsApp message or call us, and we will process it immediately.'
  },
  {
    q: 'Are your drivers experienced in mountain driving?',
    a: 'Yes, absolutely. All our drivers are locals who have been driving in the Himalayan terrain for years. They know the safest routes, the best viewpoints, and are fully background-checked.'
  },
  {
    q: 'How fast will I get my booking confirmation?',
    a: 'Once you submit your request via our Quote form, our team will reply on WhatsApp in under 5 minutes with vehicle details and your confirmed booking.'
  }
];

export default function BookTaxiPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="bg-[#1A1A1A] selection:bg-[#F7941D]/30">
      <Script id="taxi-faq-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* 1. HERO SECTION: 100% SSR */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#121212] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/assets/images/hero-mountain-road.jpg" alt="Uttarakhand Mountain Road" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#F4F6F8]" />
        
        <div className="max-w-page mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-20 items-center">
            
            {/* Left Content */}
            <div className="flex-1 text-center xl:text-left">
              <div>
                <p className="text-[#F7941D] text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-4">
                  Fast & Secure Booking
                </p>
                <h1 className="font-heading font-black text-5xl sm:text-6xl xl:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-8">
                  Book Your Taxi <br />
                  <span className="text-[#F7941D]">In Uttarakhand</span>
                </h1>
                <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto xl:mx-0 font-light leading-relaxed">
                  Whether you need a quick airport drop, a weekend getaway to Mussoorie, or a complete Char Dham yatra package, get an instant, fixed-price quote right now.
                </p>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 max-w-md mx-auto xl:mx-0 text-left">
                  <div className="flex items-center gap-3 text-white/80 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-5 h-5 text-[#F7941D]" /> Local Drivers
                  </div>
                  <div className="flex items-center gap-3 text-white/80 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-5 h-5 text-[#F7941D]" /> Fixed Pricing
                  </div>
                  <div className="flex items-center gap-3 text-white/80 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-5 h-5 text-[#F7941D]" /> Deep Cleaned Cars
                  </div>
                  <div className="flex items-center gap-3 text-white/80 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-5 h-5 text-[#F7941D]" /> 24/7 Support
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Component (The Widget) */}
            <div className="w-full sm:w-[480px] xl:w-[520px] shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#F7941D] to-orange-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <QuoteWidget />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. POPULAR FARES: SaaS Style Table */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="text-center md:text-left mb-16">
            <p className="text-[#F7941D] text-sm font-black uppercase tracking-[0.3em] mb-3">Rate Card 2026</p>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-6">
              Transparent Pricing
            </h2>
            <p className="text-white/70 font-light text-lg max-w-2xl leading-relaxed">
              No haggling, no surprises. Here are our starting estimates for popular routes. Exact prices may vary slightly based on pickup location and season.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse bg-[#1A1A1A] whitespace-nowrap">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white uppercase tracking-[0.15em] text-[10px] font-black">
                    <th className="p-6 md:p-8 border-r border-white/5">Route</th>
                    <th className="p-6 md:p-8 border-r border-white/5">Est. Time</th>
                    <th className="p-6 md:p-8 border-r border-white/5 text-[#F7941D]">Sedan Fare</th>
                    <th className="p-6 md:p-8">SUV Fare</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {popularFares.map((fare, index) => (
                    <tr key={index} className="border-b border-gray-50 hover:bg-[#1A1A1A]/50 transition-colors group">
                      <td className="p-6 md:p-8 font-black uppercase tracking-tighter border-r border-gray-50 bg-[#1A1A1A]/30">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#F7941D]" />
                          {fare.route}
                        </div>
                      </td>
                      <td className="p-6 md:p-8 border-r border-gray-50 font-medium text-white/70">{fare.time}</td>
                      <td className="p-6 md:p-8 border-r border-gray-50 font-black text-xl text-[#F7941D] transition-transform group-hover:scale-105">{fare.sedan}</td>
                      <td className="p-6 md:p-8 font-black text-xl text-white transition-transform group-hover:scale-105">{fare.suv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#1A1A1A] p-6 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] flex items-center gap-3 border-t border-white/5">
              <Info className="w-4 h-4 text-[#F7941D]" />
              * Rates are indicative. Tempo Traveller prices available upon request via WhatsApp.
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOOKING PROCESS: Bento Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A] border-y border-gray-50">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MessageCircle, title: '1. Request Quote', text: 'Fill out the form above. It goes directly to our WhatsApp for immediate attention.' },
              { icon: Shield, title: '2. Confirm Booking', text: 'Review your fixed price and pay a small token advance to secure your vehicle.' },
              { icon: CreditCard, title: '3. Pay The Driver', text: 'Pay the remaining balance directly to your driver in cash or UPI during your trip.' }
            ].map((step, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-[#121212] border border-white/10 hover:shadow-xl hover:border-[#F7941D]/20 transition-all group">
                <div className="w-20 h-20 rounded-2xl bg-[#1A1A1A] shadow-sm flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#F7941D]">
                  <step.icon className="w-10 h-10 text-[#F7941D] transition-colors group-hover:text-white" />
                </div>
                <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-4">{step.title}</h3>
                <p className="text-white/70 font-light leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQs: High Contrast Accordion */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <div className="w-16 h-16 rounded-2xl bg-[#F7941D] flex items-center justify-center mb-6 shadow-lg shadow-[#F7941D]/20">
               <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter">
              Frequently <br /> <span className="text-[#F7941D]">Asked Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="font-black text-white text-lg mb-4 flex items-start gap-4 uppercase tracking-tight">
                  <span className="text-[#F7941D] font-heading text-xl">Q.</span> {faq.q}
                </h3>
                <div className="w-12 h-1 bg-[#F7941D]/10 mb-4 rounded-full transition-all duration-500 group-hover:w-20" />
                <p className="text-white/70 font-light pl-9 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA: Deep Space Glow */}
      {/* Helpful links */}
      <section className="py-14 bg-[#1A1A1A] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Where Would You Like to Go?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: 'View Fares', href: '/taxi-rates' },
              { label: 'Mussoorie', href: '/mussoorie' },
              { label: 'Rishikesh', href: '/rishikesh' },
              { label: 'Nainital', href: '/nainital' },
              { label: 'Haridwar', href: '/haridwar' },
              { label: 'Kedarnath', href: '/kedarnath' },
              { label: 'Tour Packages', href: '/tour-packages' },
              { label: 'All Destinations', href: '/destinations' },
            ].map((d, i) => (
              <Link key={i} href={d.href} className="bg-[#1A1A1A] rounded-xl p-4 text-center text-sm font-bold text-white border border-white/10 hover:border-[#F7941D]/40 hover:text-[#F7941D] transition-all">
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto bg-[#1A1A1A] rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-[#333537]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#F7941D] opacity-10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              Need Help <span className="text-[#F7941D]">Booking</span>?
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-12 max-w-xl mx-auto text-lg">
              Our support team is available 24/7 to assist you with custom itineraries or large group bookings.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+919258912169" className="bg-[#1A1A1A] text-white font-black py-4 px-10 rounded-xl uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-[#F7941D] hover:text-white">
                <Phone className="w-4 h-4" /> +91 92589 12169
              </a>
              <a href="tel:+919258912169" className="bg-transparent border border-white/20 text-white font-black py-4 px-10 rounded-xl uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-[#1A1A1A] hover:text-white">
                <Phone className="w-4 h-4" /> +91 92589 12169
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
