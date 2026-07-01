import type { Metadata } from 'next';
import { AuroraGlow } from '@/components/motion';
import Link from 'next/link';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, MapPin, Scale } from 'lucide-react';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { TrustBanner } from '@/components/CTABoxes';
import FleetImage from '@/components/FleetImage';
import { innovaImages, ertigaImages } from '@/lib/fleet-images';
import { getVehicle } from '@/lib/vehicleData';
import { getComparison } from '@/lib/comparisonData';
import { faqPageSchema, speakableSchema } from '@/lib/schema';

const comparison = getComparison('innova-crysta-vs-ertiga');
const [slugA, slugB] = comparison.vehicles;
const vehicleA = getVehicle(slugA); // Innova Crysta
const vehicleB = getVehicle(slugB); // Ertiga
const PAGE_URL = `https://uttarakhand.cab/compare/${comparison.slug}`;

const imageMap = { 'innova-crysta': innovaImages, ertiga: ertigaImages } as const;

export const metadata: Metadata = {
  title: comparison.metaTitle,
  description: comparison.metaDescription,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    url: PAGE_URL,
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: comparison.title }],
  },
};

export default function InnovaVsErtigaPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script id="faq-schema-compare" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(comparison.faqs)) }} />
      <script id="speakable-schema-compare" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema(PAGE_URL)) }} />

      {/* 1. HERO */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#1E1F20] opacity-95" />
        {/* Ambient aurora glow */}
        <AuroraGlow className="opacity-50" />
        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <BreadcrumbNav items={[{ name: 'Compare', url: '/fleet' }, { name: comparison.title, url: `/compare/${comparison.slug}` }]} dark />

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Vehicle Comparison</p>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white uppercase leading-[0.95] tracking-tighter mb-6">
              {vehicleA.shortName} <span className="text-[#F7941D]">vs</span> {vehicleB.shortName}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              {comparison.intro}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Call to Book
              </a>
              <a href="https://wa.me/919258912169?text=Hi%2C%20I%20need%20help%20choosing%20between%20Innova%20Crysta%20and%20Ertiga." target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> Ask Us to Recommend
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GEO Answer Block */}
      <section className="sr-only">
        <div className="max-w-4xl mx-auto">
          <GEOAnswerBox
            question={`${vehicleA.shortName} vs ${vehicleB.shortName} — which should I book?`}
            answer={comparison.verdict}
            facts={comparison.dimensions.slice(0, 4).map((d) => ({ label: d.label, value: `${vehicleA.shortName}: ${d.values[0]} | ${vehicleB.shortName}: ${d.values[1]}` }))}
            source="Uttarakhand Cab 24/7 · Fleet data updated June 2026 · +91 92589 12169"
          />
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-page mx-auto">

          {/* Side-by-side photo cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[vehicleA, vehicleB].map((v) => (
              <Link key={v.slug} href={`/fleet/${v.slug}`} className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                <div className="aspect-[16/10] bg-[#1A1A1A] overflow-hidden">
                  <FleetImage images={imageMap[v.slug as 'innova-crysta' | 'ertiga']} fallbackAlt={`${v.name} - Uttarakhand Cab 24/7`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-black text-xl text-white uppercase tracking-tighter group-hover:text-[#F7941D] transition-colors">{v.shortName}</h3>
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">{v.seatingLabel}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#F7941D] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Dimension-by-dimension table */}
          <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm overflow-x-auto mb-12">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs w-1/3">Dimension</th>
                  <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">{vehicleA.shortName}</th>
                  <th className="text-left p-5 font-black text-white uppercase tracking-widest text-xs">{vehicleB.shortName}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.dimensions.map((d, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#121212]'}>
                    <td className="p-5 font-bold text-white">{d.label}</td>
                    <td className={`p-5 font-light text-white/70 ${d.winner === 0 ? 'bg-[#F7941D]/5 font-bold text-white' : ''}`}>
                      <span className="flex items-center gap-2">{d.winner === 0 && <CheckCircle2 className="w-4 h-4 text-[#F7941D] shrink-0" />} {d.values[0]}</span>
                    </td>
                    <td className={`p-5 font-light text-white/70 ${d.winner === 1 ? 'bg-[#F7941D]/5 font-bold text-white' : ''}`}>
                      <span className="flex items-center gap-2">{d.winner === 1 && <CheckCircle2 className="w-4 h-4 text-[#F7941D] shrink-0" />} {d.values[1]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verdict */}
          <div className="bg-[#1A1A1A] text-white p-8 md:p-12 rounded-[3rem] border border-[#333537] relative overflow-hidden mb-12">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none" />
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tighter mb-5 flex items-center gap-3">
              <Scale className="w-6 h-6 text-[#F7941D]" /> Our Verdict
            </h2>
            <p className="text-white/80 font-light leading-relaxed text-lg mb-8">{comparison.verdict}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href={`/fleet/${vehicleA.slug}`} className="flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-[#F7941D]/10 hover:border-[#F7941D]/30 transition-colors group">
                <span className="text-sm font-black">Book {vehicleA.shortName}</span>
                <ArrowRight className="w-4 h-4 text-[#F7941D] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href={`/fleet/${vehicleB.slug}`} className="flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-[#F7941D]/10 hover:border-[#F7941D]/30 transition-colors group">
                <span className="text-sm font-black">Book {vehicleB.shortName}</span>
                <ArrowRight className="w-4 h-4 text-[#F7941D] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <TrustBanner />

          {/* Cross-link to Char Dham guide */}
          <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/10 shadow-sm p-8 md:p-10 my-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-2">Planning Char Dham Yatra?</h3>
              <p className="text-white/70 font-light text-sm">Read our complete vehicle selection guide for the full pilgrimage circuit.</p>
            </div>
            <Link href="/best-vehicle-for-char-dham-yatra" className="px-6 py-3 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center gap-2 shrink-0">
              Read the Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Destination cross-links */}
          <div className="mb-12">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#F7941D]" /> Where These Vehicles Travel
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Kedarnath', href: '/kedarnath' },
                { name: 'Mussoorie', href: '/mussoorie' },
                { name: 'Rishikesh', href: '/rishikesh' },
                { name: 'Nainital', href: '/dehradun-to-nainital' },
              ].map((d, i) => (
                <Link key={i} href={d.href} className="bg-[#1A1A1A] border border-white/10 p-5 rounded-2xl flex items-center gap-2 hover:border-[#F7941D]/30 hover:shadow-md transition-all group">
                  <span className="font-black text-sm text-white group-hover:text-[#F7941D] transition-colors">{d.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm">
            <FAQSection faqs={comparison.faqs} title={`${comparison.title} FAQs`} />
          </div>

        </div>
      </section>
    </div>
  );
}
