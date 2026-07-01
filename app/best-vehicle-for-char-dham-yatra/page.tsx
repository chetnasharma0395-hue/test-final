import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import Link from 'next/link';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, MapPin, Mountain, Users, Briefcase } from 'lucide-react';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { TrustBanner } from '@/components/CTABoxes';
import FleetImage from '@/components/FleetImage';
import { innovaImages, ertigaImages, travellerImages, urbaniaImages } from '@/lib/fleet-images';
import { getVehicle } from '@/lib/vehicleData';
import { getPackage, getRoute, formatPrice } from '@/lib/priceData';
import { faqPageSchema, speakableSchema } from '@/lib/schema';

const PAGE_URL = 'https://uttarakhand.cab/best-vehicle-for-char-dham-yatra';
const charDham = getPackage('char-dham');
const innova = getVehicle('innova-crysta');
const ertiga = getVehicle('ertiga');
const traveller = getVehicle('tempo-traveller');
const urbania = getVehicle('force-urbania');

export const metadata: Metadata = {
  title: 'Best Vehicle for Char Dham Yatra 2026 | Innova, Ertiga, Tempo Traveller',
  description: `Which vehicle should you book for Char Dham Yatra? Compare Innova Crysta, Ertiga, Tempo Traveller, and Force Urbania for Kedarnath, Badrinath, Yamunotri, and Gangotri. Packages from ${formatPrice(charDham.sedanMin)}.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Best Vehicle for Char Dham Yatra | Uttarakhand Cab 24/7',
    description: 'Which vehicle should you book for Char Dham Yatra? A complete guide comparing Innova Crysta, Ertiga, Tempo Traveller, and Force Urbania.',
    url: PAGE_URL,
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: 'Best Vehicle for Char Dham Yatra' }],
  },
};

const faqs = [
  { question: 'What is the best vehicle for Char Dham Yatra?', answer: 'The Toyota Innova Crysta is the most recommended vehicle for Char Dham Yatra for individuals, couples, and families up to 7 people, due to its high ground clearance and ability to handle steep mountain roads. For larger pilgrimage groups, a Tempo Traveller or Force Urbania is recommended so everyone can travel together.' },
  { question: 'Can I do Char Dham Yatra in a Sedan?', answer: 'A Sedan is not recommended for the full Char Dham circuit. While it can handle plain-road sections, the steep, narrow mountain roads to Kedarnath, Badrinath, Yamunotri, and Gangotri require higher ground clearance, which an Ertiga or Innova Crysta provides.' },
  { question: 'Is the Ertiga good enough for Char Dham Yatra?', answer: 'The Ertiga can handle Char Dham Yatra, especially for smaller, lighter-luggage groups, but the Innova Crysta is generally preferred for the steepest sections of the route due to better ground clearance and a more powerful engine for long mountain climbs.' },
  { question: 'What is the cost of a Char Dham Yatra taxi package?', answer: `A complete ${charDham.minDays}-${charDham.maxDays} day Char Dham Yatra package covering all four dhams starts from ${formatPrice(charDham.sedanMin)} for a Sedan and ${formatPrice(charDham.suvMin)} for an SUV. Exact pricing depends on vehicle type, number of night halts, and itinerary.` },
  { question: 'How many people can travel together for Char Dham Yatra?', answer: 'An Innova Crysta seats up to 7, an Ertiga seats up to 6, and a Tempo Traveller or Force Urbania seats 12-17 passengers — suitable for larger pilgrimage groups who want to travel together in one vehicle.' },
  { question: 'Which vehicle is best for senior citizens on Char Dham Yatra?', answer: 'The Innova Crysta is generally the most comfortable choice for senior citizens on Char Dham Yatra due to its smoother ride on mountain roads and easier entry and exit compared to lower vehicles. For groups including senior citizens, a Tempo Traveller or Force Urbania also offers more room to rest during the long journey.' },
  { question: 'Do I need a different vehicle for each dham?', answer: 'No. The same vehicle typically covers the entire Char Dham circuit — Yamunotri, Gangotri, Kedarnath, and Badrinath — as part of one continuous multi-day package, though some pilgrims choose to do Do Dham (two dhams) or Ek Dham (one dham) as shorter trips.' },
];

export default function BestVehicleForCharDhamPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script id="faq-schema-chardham-guide" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }} />
      <script id="speakable-schema-chardham-guide" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema(PAGE_URL)) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#1E1F20] opacity-95" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-50" />
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <BreadcrumbNav items={[{ name: 'Best Vehicle for Char Dham Yatra', url: '/best-vehicle-for-char-dham-yatra' }]} dark />

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Vehicle Selection Guide</p>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white uppercase leading-[0.95] tracking-tighter mb-6">
              Best Vehicle for <br /> <span className="text-[#F7941D]">Char Dham Yatra</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              Choosing the right vehicle matters more for Char Dham Yatra than almost any other trip in Uttarakhand. Here&apos;s how to pick between Innova Crysta, Ertiga, Tempo Traveller, and Force Urbania based on your group size, comfort needs, and budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Call to Plan Your Yatra
              </a>
              <a href="https://wa.me/919258912169?text=Hi%2C%20I%20need%20help%20planning%20Char%20Dham%20Yatra." target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp for a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GEO Answer Block */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question="What is the best vehicle for Char Dham Yatra?"
            answer={`The Toyota Innova Crysta is the most recommended vehicle for Char Dham Yatra for individuals, couples, and families up to 7 people, due to its high ground clearance and ability to handle steep mountain roads to Kedarnath and Badrinath. For larger pilgrimage groups, a Tempo Traveller or Force Urbania (12-17 seats) is recommended. Complete Char Dham packages start from ${formatPrice(charDham.sedanMin)}.`}
            facts={[
              { label: 'Recommended Vehicle (Small Groups)', value: 'Innova Crysta' },
              { label: 'Recommended Vehicle (Large Groups)', value: 'Tempo Traveller / Force Urbania' },
              { label: 'Char Dham Package (Sedan)', value: formatPrice(charDham.sedanMin) },
              { label: 'Char Dham Package (SUV)', value: formatPrice(charDham.suvMin) },
              { label: 'Trip Duration', value: `${charDham.minDays}-${charDham.maxDays} Days` },
            ]}
            source="Uttarakhand Cab 24/7 · Fleet data updated June 2026 · +91 92589 12169"
          />
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">

          {/* Why vehicle choice matters */}
          <div className="bg-[#1A1A1A] p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-sm mb-12">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-5 flex items-center gap-3">
              <Mountain className="w-6 h-6 text-[#F7941D]" /> Why Vehicle Choice Matters for Char Dham
            </h2>
            <p className="text-white/70 font-light leading-relaxed text-lg">
              The Char Dham circuit covers Yamunotri, Gangotri, Kedarnath, and Badrinath across {charDham.minDays}-{charDham.maxDays} days of steep, winding Himalayan roads with sharp hairpin bends and significant altitude gain. Unlike a city trip, the wrong vehicle here means a genuinely harder, less comfortable pilgrimage — lower ground clearance struggles on broken mountain stretches, and cramped seating becomes a real problem over multiple long travel days. Getting this choice right at the start makes the entire Yatra smoother.
            </p>
          </div>

          {/* Decision guide by group size */}
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-8">
            Choose by Group Size
          </h2>
          <div className="space-y-6 mb-16">

            {/* Innova */}
            <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="aspect-[4/3] md:aspect-auto bg-[#1A1A1A]">
                  <FleetImage images={innovaImages} fallbackAlt="Innova Crysta for Char Dham Yatra" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-2 p-8">
                  <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Recommended Default</p>
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-3">1-7 People: Innova Crysta</h3>
                  <p className="text-white/70 font-light leading-relaxed mb-4">The Innova Crysta is the vehicle our own drivers recommend most often for Char Dham. High ground clearance, strong mountain performance, and room for 7 with full luggage make it the safest default choice for solo travelers, couples, and families.</p>
                  <Link href="/fleet/innova-crysta" className="inline-flex items-center gap-2 text-[#F7941D] font-black text-sm hover:gap-3 transition-all">
                    View Innova Crysta Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Ertiga */}
            <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="aspect-[4/3] md:aspect-auto bg-[#1A1A1A]">
                  <FleetImage images={ertigaImages} fallbackAlt="Ertiga for Char Dham Yatra" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-2 p-8">
                  <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Budget-Conscious Option</p>
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-3">1-6 People, Lighter Luggage: Ertiga</h3>
                  <p className="text-white/70 font-light leading-relaxed mb-4">For smaller groups traveling light who want to manage costs, the Ertiga can complete the Char Dham circuit at a lower per-km rate than the Innova Crysta. It\u2019s a reasonable trade-off as long as your group is 6 or fewer with moderate luggage.</p>
                  <Link href="/fleet/ertiga" className="inline-flex items-center gap-2 text-[#F7941D] font-black text-sm hover:gap-3 transition-all">
                    View Ertiga Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Tempo Traveller */}
            <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="aspect-[4/3] md:aspect-auto bg-[#1A1A1A]">
                  <FleetImage images={travellerImages} fallbackAlt="Tempo Traveller for Char Dham Yatra Groups" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-2 p-8">
                  <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Pilgrimage Groups</p>
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-3">8+ People: Tempo Traveller</h3>
                  <p className="text-white/70 font-light leading-relaxed mb-4">For larger pilgrimage parties and joint families, the Tempo Traveller keeps everyone together in one vehicle across the full {charDham.minDays}-{charDham.maxDays} day journey, with a dedicated luggage compartment for the whole group&apos;s belongings.</p>
                  <Link href="/fleet/tempo-traveller" className="inline-flex items-center gap-2 text-[#F7941D] font-black text-sm hover:gap-3 transition-all">
                    View Tempo Traveller Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Force Urbania */}
            <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="aspect-[4/3] md:aspect-auto bg-[#1A1A1A]">
                  <FleetImage images={urbaniaImages} fallbackAlt="Force Urbania for Premium Char Dham Yatra Groups" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-2 p-8">
                  <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Premium Group Option</p>
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-3">8+ People, Extra Comfort: Force Urbania</h3>
                  <p className="text-white/70 font-light leading-relaxed mb-4">For groups who want the same 12-17 seat capacity as a Tempo Traveller but with a more premium cabin experience for the long multi-day journey, the Force Urbania is the upgrade option — popular with corporate groups and premium pilgrimage packages.</p>
                  <Link href="/fleet/force-urbania" className="inline-flex items-center gap-2 text-[#F7941D] font-black text-sm hover:gap-3 transition-all">
                    View Force Urbania Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison snapshot */}
          <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm overflow-x-auto mb-16">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">Vehicle</th>
                  <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">Seats</th>
                  <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">Mountain Suitability</th>
                  <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">Pricing</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { v: innova, suit: 'Excellent', highlight: true },
                  { v: ertiga, suit: 'Good (moderate sections)', highlight: false },
                  { v: traveller, suit: 'Good (group travel)', highlight: false },
                  { v: urbania, suit: 'Good (premium group travel)', highlight: false },
                ].map((row, i) => (
                  <tr key={row.v.slug} className={i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#121212]'}>
                    <td className="p-5 font-black text-white">
                      <Link href={`/fleet/${row.v.slug}`} className="hover:text-[#F7941D] transition-colors">{row.v.shortName}</Link>
                    </td>
                    <td className="p-5 text-white/70 font-light">{row.v.seatingLabel}</td>
                    <td className={`p-5 font-light ${row.highlight ? 'font-bold text-white' : 'text-white/70'}`}>{row.suit}</td>
                    <td className="p-5 font-bold text-[#F7941D]">{row.v.pricing.quoteOnRequest ? 'On Request' : `${row.v.pricing.perKmRate}/km`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Char Dham package pricing */}
          <div className="bg-[#1A1A1A] text-white p-8 md:p-12 rounded-[3rem] border border-[#333537] relative overflow-hidden mb-16">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none" />
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tighter mb-6">Char Dham Yatra Package Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Sedan Package</p>
                <p className="text-[#F7941D] font-black text-3xl">{formatPrice(charDham.sedanMin)}</p>
                <p className="text-white/50 text-xs font-light mt-1">{charDham.minDays}-{charDham.maxDays} days, all four dhams</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">SUV Package</p>
                <p className="text-[#F7941D] font-black text-3xl">{formatPrice(charDham.suvMin)}</p>
                <p className="text-white/50 text-xs font-light mt-1">{charDham.minDays}-{charDham.maxDays} days, all four dhams</p>
              </div>
            </div>
            <p className="text-white/70 font-light text-sm leading-relaxed mb-6">Tempo Traveller and Force Urbania group packages are quoted separately based on group size and itinerary. Pricing above is synced to our <Link href="/char-dham" className="text-[#F7941D] font-bold hover:underline">Char Dham Yatra</Link> page — the source of truth for all package pricing.</p>
            <a href="https://wa.me/919258912169?text=Hi%2C%20I%20need%20a%20Char%20Dham%20Yatra%20quote." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all">
              <MessageCircle className="w-4 h-4" /> Get Your Char Dham Quote
            </a>
          </div>

          <TrustBanner />

          {/* Route cross-links */}
          <div className="my-16">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#F7941D]" /> Char Dham Routes &amp; Destinations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Char Dham Yatra', href: '/char-dham' },
                { name: 'Kedarnath', href: '/kedarnath' },
                { name: 'Badrinath', href: '/badrinath' },
                { name: 'Haridwar to Kedarnath', href: '/haridwar-to-kedarnath' },
                { name: 'Rishikesh to Kedarnath', href: '/rishikesh-to-kedarnath' },
                { name: 'Valley of Flowers', href: '/valley-of-flowers' },
              ].map((d, i) => (
                <Link key={i} href={d.href} className="bg-[#1A1A1A] border border-white/10 p-5 rounded-2xl flex items-center gap-2 hover:border-[#F7941D]/30 hover:shadow-md transition-all group">
                  <span className="font-black text-sm text-white group-hover:text-[#F7941D] transition-colors">{d.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Compare CTA */}
          <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-[#F7941D] shrink-0" />
              <div>
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-2">Still Deciding Between Two Vehicles?</h3>
                <p className="text-white/70 font-light text-sm">See our direct Innova Crysta vs Ertiga comparison for a side-by-side breakdown.</p>
              </div>
            </div>
            <Link href="/compare/innova-crysta-vs-ertiga" className="px-6 py-3 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center gap-2 shrink-0">
              Compare Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm">
            <FAQSection faqs={faqs} title="Char Dham Vehicle FAQs" />
          </div>

        </div>
      </section>
    </div>
  );
}
