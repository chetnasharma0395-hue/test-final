import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { StrategicCTA } from '@/components/CTABoxes';
import { ORIGIN_HUBS, getOriginHub } from '@/data/hub-config';
import { routesFromOrigin } from '@/lib/route-helpers';
import { formatPrice } from '@/lib/priceData';
import { breadcrumbSchema, faqPageSchema, speakableSchema } from '@/lib/schema';

interface OriginProps {
  params: Promise<{ origin: string }>;
}

export function generateStaticParams() {
  return ORIGIN_HUBS.map((h) => ({ origin: h.key }));
}

export async function generateMetadata({ params }: OriginProps): Promise<Metadata> {
  const { origin } = await params;
  const hub = getOriginHub(origin);
  if (!hub) return { title: 'Origin Not Found' };
  const url = `https://uttarakhand.cab/taxi/from/${origin}`;
  return {
    title: `Taxi Service from ${hub.name} to Uttarakhand | Fixed-Fare Outstation Cabs`,
    description: `Book a fixed-fare taxi from ${hub.name} to Mussoorie, Nainital, Jim Corbett, Rishikesh, Haridwar, Dehradun and more. Doorstep pickup, verified hill drivers, 24/7.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Taxi Service from ${hub.name} to Uttarakhand`,
      description: `Fixed-fare outstation taxis from ${hub.name} to the hills of Uttarakhand.`,
      url,
      siteName: 'Uttarakhand Cab 24/7',
      type: 'website',
      images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: 'Uttarakhand Cab 24/7' }],
    },
  };
}

function fareLabel(sedan: number | null): string {
  return sedan !== null ? `from ${formatPrice(sedan)}` : 'Quote on request';
}

export default async function OriginHubPage({ params }: OriginProps) {
  const { origin } = await params;
  const hub = getOriginHub(origin);
  if (!hub) notFound();

  const url = `https://uttarakhand.cab/taxi/from/${origin}`;
  const routes = routesFromOrigin(origin);

  const breadcrumbLd = breadcrumbSchema([
    { name: 'Taxi Routes', url: '/taxi' },
    { name: `From ${hub.name}`, url: `/taxi/from/${origin}` },
  ]);
  const speakableLd = speakableSchema(url);

  const hubFaqs = [
    {
      question: `How do I book a taxi from ${hub.name} to Uttarakhand?`,
      answer: `Call or WhatsApp us on +91 92589 12169 with your destination and travel date. We confirm a fixed all-inclusive fare and arrange doorstep pickup anywhere in ${hub.name}.`,
    },
    {
      question: `Are ${hub.name} to Uttarakhand taxi fares fixed?`,
      answer: `Yes. Every route from ${hub.name} is quoted as a fixed, all-inclusive fare covering fuel and driver allowance, with no meter and no hidden charges.`,
    },
    {
      question: `Do you offer one-way and round-trip cabs from ${hub.name}?`,
      answer: `Both. One-way drops and round-trip / multi-day hill packages are available; round trips are typically more economical per kilometre.`,
    },
    {
      question: `What vehicles are available from ${hub.name}?`,
      answer: `Sedans for couples and small families, Ertiga and Innova Crysta SUVs for larger families and hill routes, and Tempo Traveller or Force Urbania for groups.`,
    },
  ];
  const faqLd = faqPageSchema(hubFaqs);

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Taxi routes from ${hub.name}`,
    itemListElement: routes.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${r.origin} to ${r.destination} Taxi`,
      url: `https://uttarakhand.cab/taxi/${r.slug}`,
    })),
  };

  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      {routes.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      )}

      <section className="relative pt-40 pb-28 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F7941D] opacity-[0.06] blur-[120px] pointer-events-none" />
        <div className="max-w-page mx-auto relative z-10">
          <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link href="/taxi" className="hover:text-[#F7941D] transition-colors">Taxi Routes</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#F7941D]">From {hub.name}</span>
          </nav>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white uppercase leading-[0.95] tracking-tighter mb-6">
            Taxi Service from <br /><span className="text-[#F7941D]">{hub.name} to Uttarakhand</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">{hub.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all flex items-center justify-center gap-3">
              <Phone className="w-4 h-4" /> +91 92589 12169
            </a>
            <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3">
              <MessageCircle className="w-4 h-4" /> WhatsApp Quote
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-page mx-auto">
          <GEOAnswerBox
            question={`What taxi routes are available from ${hub.name} to Uttarakhand?`}
            answer={`Uttarakhand Cab 24/7 runs fixed-fare taxis from ${hub.name} to top Uttarakhand destinations including Mussoorie, Nainital, Jim Corbett, Rishikesh, Haridwar and Dehradun. Pickup is doorstep anywhere in ${hub.name}, fares are all-inclusive, and drivers are experienced on hill roads.`}
            facts={[
              { label: 'Origin', value: hub.name },
              { label: 'Pricing', value: 'Fixed all-inclusive fares' },
              { label: 'Pickup', value: `Doorstep across ${hub.name}` },
            ]}
            source="Uttarakhand Cab 24/7 \u2014 Updated 2026"
          />

          <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-8">Routes from {hub.name}</h2>

          {routes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {routes.map((r) => (
                <Link key={r.slug} href={`/taxi/${r.slug}`} className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 shadow-sm hover:border-[#F7941D]/30 hover:shadow-lg transition-all group flex items-center justify-between">
                  <div>
                    <p className="font-black text-white tracking-tight">{r.origin} to {r.destination}</p>
                    <p className="text-white/70 text-xs font-light mt-1">{r.distanceKm} km \u00b7 {r.travelTime} \u00b7 {fareLabel(r.fare.sedan)}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#F7941D] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm mb-16">
              <p className="text-white/70 font-light leading-relaxed">
                We are expanding our published fixed-fare routes from {hub.name}. In the meantime, we still serve every major Uttarakhand destination from {hub.name} on request \u2014 call or WhatsApp <a href="tel:+919258912169" className="text-[#F7941D] font-bold">+91 92589 12169</a> with your destination for an instant quote and doorstep pickup.
              </p>
            </div>
          )}

          <div className="bg-[#1A1A1A] p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-sm mb-16">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-4">Planning Your Trip from {hub.name}</h2>
            <p className="text-white/70 font-light leading-relaxed mb-4">
              {hub.name} sits in the Delhi NCR belt, a comfortable road journey from the Uttarakhand foothills. Garhwal-bound trips (Mussoorie, Rishikesh, Haridwar, Dehradun) typically route via Meerut and Roorkee, while Kumaon-bound trips (Nainital, Jim Corbett) take the Hapur\u2013Moradabad corridor. An early-morning departure beats NCR traffic and gets you to the hills by afternoon.
            </p>
            <p className="text-white/70 font-light leading-relaxed">
              For longer high-altitude routes we recommend a 7-seater Innova Crysta for comfort and luggage; shorter runs are well served by a Sedan or Ertiga.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mb-16">
            <FAQSection faqs={hubFaqs} title={`${hub.name} to Uttarakhand Taxi FAQs`} />
          </div>

          <StrategicCTA heading={`Book Your ${hub.name} Cab`} subtext="Fixed pricing, doorstep pickup, verified hill drivers. Call or WhatsApp for an instant quote." />
        </div>
      </section>
    </div>
  );
}
