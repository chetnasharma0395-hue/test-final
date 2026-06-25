import type { Metadata } from 'next';
import { AuroraGlow, AnimatedSection } from '@/components/motion';
import Link from 'next/link';
import { Phone, MessageCircle, Users, Briefcase, Snowflake, CheckCircle2, XCircle, MapPin, Car, Info, ArrowRight } from 'lucide-react';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { TrustBanner } from '@/components/CTABoxes';
import FleetImage from '@/components/FleetImage';
import { travellerImages } from '@/lib/fleet-images';
import { getVehicle, getOtherVehicles } from '@/lib/vehicleData';
import { vehicleSchema, itemPageSchema, faqPageSchema, speakableSchema } from '@/lib/schema';

const vehicle = getVehicle('tempo-traveller');
const PAGE_URL = 'https://uttarakhand.cab/fleet/tempo-traveller';

export const metadata: Metadata = {
  title: 'Tempo Traveller Rental Dehradun | 12-17 Seater Group Taxi',
  description: vehicle.metaDescription,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Tempo Traveller Rental Dehradun | 12-17 Seater Group Taxi',
    description: vehicle.metaDescription,
    url: PAGE_URL,
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: 'Tempo Traveller - Uttarakhand Cab 24/7' }],
  },
};

const faqs = [
  { question: 'Who should book a Tempo Traveller?', answer: 'The Tempo Traveller is best for pilgrimage groups doing Char Dham Yatra, large joint families of 10 or more, and group sightseeing tours where everyone needs to travel together in one vehicle rather than splitting across multiple cars.' },
  { question: 'Who should not book a Tempo Traveller?', answer: 'Solo travelers, couples, or small families of 4 or fewer should book a Sedan, Ertiga, or Innova Crysta instead, as a Tempo Traveller is oversized and more expensive than necessary for small groups. It is also less practical on narrow village or ashram lanes with tight turning radius.' },
  { question: 'What are the best routes for a Tempo Traveller?', answer: 'Tempo Travellers are commonly booked for Dehradun to Kedarnath, Dehradun to Badrinath, and Dehradun to Nainital group trips, as well as multi-day Char Dham Yatra circuits covering all four dhams.' },
  { question: 'What Uttarakhand destinations is the Tempo Traveller best suited for?', answer: 'The Tempo Traveller suits Char Dham pilgrimage destinations (Kedarnath, Badrinath, Yamunotri, Gangotri) as well as Nainital and group tours across Uttarakhand where a single large vehicle keeps the whole group together.' },
  { question: 'How much does a Tempo Traveller cost?', answer: 'Tempo Traveller fares are quoted on request based on group size, route, number of days, and night halts. Message us on WhatsApp with your group size and itinerary for a fixed quote before you travel.' },
  { question: 'Is the Tempo Traveller good for families with children and senior citizens?', answer: 'Yes. The Tempo Traveller\u2019s bus-style seating with full air conditioning gives children room to move and senior citizens easier entry and exit than a sedan or SUV, making it a comfortable option for large multi-generational family trips.' },
  { question: 'How much luggage fits in a Tempo Traveller?', answer: 'The Tempo Traveller has a dedicated rear luggage compartment separate from the passenger cabin, generally accommodating one large bag per passenger comfortably — well suited to multi-day Char Dham Yatra packages.' },
  { question: 'Is the Tempo Traveller suitable for mountain roads?', answer: 'Yes, our Tempo Travellers are regularly used on Char Dham Yatra mountain routes including Kedarnath and Badrinath. Drivers are experienced with hairpin bends and high-altitude driving, though very narrow lanes in some towns may require a drop-off point slightly before the final destination.' },
  { question: 'How many people fit in a Tempo Traveller?', answer: 'Our Tempo Travellers are available in 12 to 17-seater configurations depending on the group size and itinerary you need.' },
];

const otherVehicles = getOtherVehicles('tempo-traveller', 3);

export default function TempoTravellerPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script id="vehicle-schema-traveller" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema({ name: vehicle.name, description: vehicle.description, url: PAGE_URL, seatingCapacity: vehicle.seating, vehicleType: vehicle.category })) }} />
      <script id="itempage-schema-traveller" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemPageSchema({ name: vehicle.name, description: vehicle.metaDescription, url: PAGE_URL })) }} />
      <script id="faq-schema-traveller" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }} />
      <script id="speakable-schema-traveller" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema(PAGE_URL)) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C3F] via-[#0B1C3F] to-[#1E1F20] opacity-95" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-50" />
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <BreadcrumbNav items={[{ name: 'Fleet', url: '/fleet' }, { name: 'Tempo Traveller', url: '/fleet/tempo-traveller' }]} dark />

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">For Groups &amp; Pilgrimage Parties</p>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
              Tempo Traveller <br />
              <span className="text-[#F7941D]">Rental</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              {vehicle.tagline}. 12-17 seats, full AC, and a dedicated luggage compartment — built for Char Dham Yatra groups and large families who want to travel together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Call for Quote
              </a>
              <a href="https://wa.me/919258912169?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20a%20Tempo%20Traveller." target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp for Quote
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#F7941D]" /> {vehicle.seatingLabel}</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#F7941D]" /> {vehicle.luggage}</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><Snowflake className="w-4 h-4 text-[#F7941D]" /> {vehicle.acType}</span>
            </div>
          </div>
        </div>
      </section>

      {/* GEO Answer Block */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="Who should book a Tempo Traveller and how much does it cost?"
            answer="The Tempo Traveller (12-17 seater) is best for Char Dham Yatra pilgrimage groups, large joint families, and group tours that need to travel together in one vehicle. Pricing is quoted on request based on group size, route, and number of night halts — contact Uttarakhand Cab 24/7 on WhatsApp for a fixed quote."
            facts={[
              { label: 'Seating', value: '12-17 Passengers' },
              { label: 'Luggage', value: 'Dedicated Rear Compartment' },
              { label: 'Pricing', value: 'Quote on Request' },
              { label: 'Best For', value: 'Char Dham Yatra Groups' },
            ]}
            source="Uttarakhand Cab 24/7 · Fleet data updated June 2026 · +91 92589 12169"
          />
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            <div className="lg:col-span-2 space-y-12">

              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl aspect-[3/2] bg-gray-100">
                <FleetImage images={travellerImages} fallbackAlt="Tempo Traveller Uttarakhand Cab 24/7" className="w-full h-full object-cover" />
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Built for Groups Who Travel Together
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
                  {vehicle.description}
                </p>
                <TrustBanner />
              </div>

              <div>
                <AnimatedSection>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Seating', value: vehicle.seatingLabel },
                    { label: 'Luggage', value: vehicle.luggage },
                    { label: 'AC', value: vehicle.acType },
                    { label: 'Models', value: vehicle.models.join(', ') },
                  ].map((s, i) => (
                    <div key={i} className="bg-[#1A1A1A] p-5 rounded-2xl shadow-sm text-center border border-gray-50">
                      <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mb-1">{s.label}</p>
                      <p className="font-black text-sm text-white leading-tight">{s.value}</p>
                    </div>
                  ))}
                </div>
                </AnimatedSection>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm">
                  <h3 className="font-black text-white text-xl tracking-tight mb-5 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Best For
                  </h3>
                  <ul className="space-y-3">
                    {vehicle.idealFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 font-light text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#F7941D] shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {vehicle.notIdealFor && (
                  <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm">
                    <h3 className="font-black text-white text-xl tracking-tight mb-5 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-gray-300" /> Consider Instead If
                    </h3>
                    <ul className="space-y-3">
                      {vehicle.notIdealFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70 font-light text-sm leading-relaxed">
                          <XCircle className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Common Group Routes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Char Dham Yatra (All 4 Dhams)', href: '/char-dham', desc: '10-12 day pilgrimage circuit' },
                    { name: 'Dehradun to Kedarnath', href: '/kedarnath', desc: 'Group pilgrimage transport' },
                    { name: 'Dehradun to Badrinath', href: '/badrinath', desc: 'Group pilgrimage transport' },
                    { name: 'Dehradun to Nainital', href: '/dehradun-to-nainital', desc: 'Large family & group tours' },
                  ].map((r, i) => (
                    <Link key={i} href={r.href} className="bg-[#1A1A1A] border border-white/10 p-6 rounded-[2rem] hover:shadow-xl hover:border-[#F7941D]/20 transition-all group flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-black text-base text-white mb-1 flex items-center gap-2 group-hover:text-[#F7941D] transition-colors">
                          <MapPin className="w-4 h-4 text-[#F7941D] shrink-0" /> {r.name}
                        </h3>
                        <p className="text-xs font-light text-white/70 pl-6">{r.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#F7941D] shrink-0 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pricing — Quote on Request */}
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-6">
                  Tempo Traveller Pricing
                </h2>
                <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] border border-[#333537] relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none" />
                  <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.2em] mb-3">Quote on Request</p>
                  <p className="text-white/80 font-light leading-relaxed mb-6">
                    Tempo Traveller fares depend on group size, route, number of travel days, and night halts. Message us on WhatsApp with your group size and itinerary for a fixed, transparent quote before you travel — no surge pricing, no hidden charges.
                  </p>
                  <a href="https://wa.me/919258912169?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20a%20Tempo%20Traveller." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all">
                    <MessageCircle className="w-4 h-4" /> Get a WhatsApp Quote
                  </a>
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mt-12">
                <FAQSection faqs={faqs} title="Tempo Traveller FAQs" />
              </div>

            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 border border-[#333537] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
                <h4 className="font-heading font-black text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <Car className="w-6 h-6 text-[#F7941D]" /> Get a Group Quote
                </h4>
                <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
                  Tell us your group size, route, and travel dates — we&apos;ll confirm a fixed Tempo Traveller fare before you book.
                </p>
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
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">No hidden charges • Drivers experienced with Yatra permits</p>
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-4">Premium Group Option</h4>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6">For corporate travel or a premium upgrade with the same seating capacity, see the Force Urbania.</p>
                <Link href="/fleet/force-urbania" className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#F7941D]/10 transition-colors group">
                  <span className="text-sm font-black text-white group-hover:text-[#F7941D] transition-colors">View Force Urbania</span>
                  <ArrowRight className="w-4 h-4 text-[#F7941D]" />
                </Link>
              </div>

              <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                <h4 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6">Other Vehicles</h4>
                <ul className="space-y-4">
                  {otherVehicles.map((v) => (
                    <li key={v.slug}>
                      <Link href={`/fleet/${v.slug}`} className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-transparent hover:border-[#F7941D]/30 transition-colors group">
                        <div>
                          <span className="text-white font-black text-sm group-hover:text-[#F7941D] transition-colors block">{v.shortName}</span>
                          <span className="text-white/70 text-[10px] uppercase tracking-widest font-bold">{v.seatingLabel}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#F7941D]" />
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
