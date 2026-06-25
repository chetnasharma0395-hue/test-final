import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import Link from 'next/link';
import { Phone, MessageCircle, Users, Briefcase, ArrowRight, MapPin } from 'lucide-react';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { TrustBanner } from '@/components/CTABoxes';
import FleetImage from '@/components/FleetImage';
import { innovaImages, ertigaImages, sedanImages, travellerImages, urbaniaImages } from '@/lib/fleet-images';
import { getAllVehicles } from '@/lib/vehicleData';
import { faqPageSchema, speakableSchema } from '@/lib/schema';

const PAGE_URL = 'https://uttarakhand.cab/fleet';
const vehicles = getAllVehicles();

const imageMap = {
  sedan: sedanImages,
  ertiga: ertigaImages,
  'innova-crysta': innovaImages,
  'tempo-traveller': travellerImages,
  'force-urbania': urbaniaImages,
} as const;

export const metadata: Metadata = {
  title: 'Our Fleet | Sedan, Ertiga, Innova Crysta, Tempo Traveller & Force Urbania',
  description: 'Browse our complete taxi fleet in Dehradun and across Uttarakhand: Sedan, Ertiga, Innova Crysta, Tempo Traveller, and Force Urbania. Compare seating, luggage, and fixed fares for every vehicle.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Our Fleet | Uttarakhand Cab 24/7',
    description: 'Browse our complete taxi fleet: Sedan, Ertiga, Innova Crysta, Tempo Traveller, and Force Urbania. Compare seating, luggage, and fixed fares.',
    url: PAGE_URL,
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: 'Uttarakhand Cab 24/7 Fleet' }],
  },
};

const faqs = [
  { question: 'What types of vehicles does Uttarakhand Cab 24/7 have?', answer: 'Our fleet includes Sedans (Swift Dzire, Honda Amaze) for budget and local travel, Ertiga for family trips, Innova Crysta for Char Dham Yatra and mountain routes, and Tempo Traveller and Force Urbania for group and pilgrimage travel of 12-17 passengers.' },
  { question: 'How do I choose the right vehicle for my trip?', answer: 'For solo travelers or couples, a Sedan is most economical. For families of 5-6 on moderate hill routes, the Ertiga offers the best value. For Char Dham Yatra or groups of 7 needing maximum ground clearance, the Innova Crysta is recommended. For groups larger than 7, a Tempo Traveller or Force Urbania keeps everyone together in one vehicle.' },
  { question: 'Which vehicle is best for Char Dham Yatra?', answer: 'The Innova Crysta is most commonly recommended for Char Dham Yatra due to its ground clearance and seating for 7. For pilgrimage groups, a Tempo Traveller or Force Urbania is better suited. See our full guide at /best-vehicle-for-char-dham-yatra.' },
  { question: 'Do all vehicles have fixed fares?', answer: 'Sedan, Ertiga, and Innova Crysta have fixed one-way fares for all popular routes, visible on our Taxi Rates page. Tempo Traveller and Force Urbania are quoted on request based on group size, route, and number of night halts.' },
];

export default function FleetPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script id="faq-schema-fleet" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }} />
      <script id="speakable-schema-fleet" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema(PAGE_URL)) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C3F] via-[#0B1C3F] to-[#1E1F20] opacity-95" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-50" />
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <BreadcrumbNav items={[{ name: 'Fleet', url: '/fleet' }]} dark />

            <p className="text-[#F7941D] text-xs font-semibold uppercase tracking-widest mb-4">5 Vehicles. Every Route in Uttarakhand.</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Our <span className="text-[#F7941D]">Fleet</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              From a budget Sedan for two to a 17-seater for a full pilgrimage group — find the right vehicle for your route, group size, and budget, with fixed fares and verified drivers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Call to Book
              </a>
              <a href="https://wa.me/919258912169?text=Hi%2C%20I%27d%20like%20help%20choosing%20a%20vehicle." target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> Ask Us to Recommend One
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GEO Answer Block */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="What vehicles does Uttarakhand Cab 24/7 offer and which one should I book?"
            answer="Uttarakhand Cab 24/7 operates 5 vehicle types: Sedan (4 seats, budget/local travel), Ertiga (6 seats, family travel), Innova Crysta (7 seats, recommended for Char Dham Yatra and mountain routes), Tempo Traveller (12-17 seats, pilgrimage groups), and Force Urbania (12-17 seats, premium group/corporate travel)."
            facts={[
              { label: 'Vehicle Types', value: '5' },
              { label: 'Smallest', value: 'Sedan (4 seats)' },
              { label: 'Largest', value: 'Tempo Traveller / Force Urbania (17 seats)' },
              { label: 'Recommended for Char Dham', value: 'Innova Crysta' },
            ]}
            source="Uttarakhand Cab 24/7 · Fleet data updated June 2026 · +91 92589 12169"
          />
        </div>
      </section>

      {/* 2. FLEET GRID */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {vehicles.map((v) => (
              <Link
                key={v.slug}
                href={`/fleet/${v.slug}`}
                className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-sm hover:border-[#F7941D]/20 overflow-hidden group flex flex-col"
              >
                <div className="aspect-[16/10] bg-[#1A1A1A] overflow-hidden">
                  <FleetImage
                    images={imageMap[v.slug]}
                    fallbackAlt={`${v.name} - Uttarakhand Cab 24/7`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2">{v.category}</p>
                  <h2 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight leading-none mb-3 group-hover:text-[#F7941D] transition-colors duration-300">
                    {v.shortName}
                  </h2>
                  <p className="text-white/70 font-light text-sm leading-relaxed mb-6 flex-1">{v.tagline}</p>
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/70 mb-6">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#F7941D]" /> {v.seating}</span>
                    <span className="text-gray-200">|</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-[#F7941D]" /> {v.luggage.split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/8">
                    <span className="font-black text-sm text-white">
                      {v.pricing.quoteOnRequest ? 'Quote on Request' : `From ${v.pricing.perKmRate}/km`}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#F7941D] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}

            {/* Comparison / guide tile to fill the grid */}
            <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-[#333537] p-8 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none" />
              <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-3">Still Deciding?</h2>
              <p className="text-white/70 font-light text-sm leading-relaxed mb-6">Compare vehicles directly or get our recommendation for Char Dham Yatra.</p>
              <div className="space-y-3">
                <Link href="/compare/innova-crysta-vs-ertiga" className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-[#F7941D]/10 hover:border-[#F7941D]/30 transition-colors group">
                  <span className="text-sm font-black text-white">Innova Crysta vs Ertiga</span>
                  <ArrowRight className="w-4 h-4 text-[#F7941D] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/best-vehicle-for-char-dham-yatra" className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-[#F7941D]/10 hover:border-[#F7941D]/30 transition-colors group">
                  <span className="text-sm font-black text-white">Best Vehicle for Char Dham</span>
                  <ArrowRight className="w-4 h-4 text-[#F7941D] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <TrustBanner />

          {/* Quick comparison table */}
          <div className="mt-16">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-8">
              Quick Comparison
            </h2>
            <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/8 overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">Vehicle</th>
                    <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">Seating</th>
                    <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">Best For</th>
                    <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">Pricing</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v, i) => (
                    <tr key={v.slug} className={i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#121212]'}>
                      <td className="p-5 font-black text-white">
                        <Link href={`/fleet/${v.slug}`} className="hover:text-[#F7941D] transition-colors">{v.shortName}</Link>
                      </td>
                      <td className="p-5 text-white/70 font-light">{v.seatingLabel}</td>
                      <td className="p-5 text-white/70 font-light">{v.idealFor[0]}</td>
                      <td className="p-5 font-bold text-[#F7941D]">
                        {v.pricing.quoteOnRequest ? 'On Request' : v.pricing.perKmRate + '/km'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Destinations cross-link */}
          <div className="mt-16">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-8">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Kedarnath', href: '/kedarnath' },
                { name: 'Badrinath', href: '/badrinath' },
                { name: 'Mussoorie', href: '/mussoorie' },
                { name: 'Rishikesh', href: '/rishikesh' },
                { name: 'Haridwar', href: '/haridwar' },
                { name: 'Nainital', href: '/dehradun-to-nainital' },
                { name: 'Char Dham Yatra', href: '/char-dham' },
                { name: 'Valley of Flowers', href: '/valley-of-flowers' },
              ].map((d, i) => (
                <Link key={i} href={d.href} className="bg-[#1A1A1A] border border-white/10 p-5 rounded-2xl flex items-center gap-2 hover:border-[#F7941D]/30 hover:shadow-md transition-all group">
                  <MapPin className="w-4 h-4 text-[#F7941D] shrink-0" />
                  <span className="font-black text-sm text-white group-hover:text-[#F7941D] transition-colors">{d.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-16">
            <FAQSection faqs={faqs} title="Fleet FAQs" />
          </div>
        </div>
      </section>
    </div>
  );
}
