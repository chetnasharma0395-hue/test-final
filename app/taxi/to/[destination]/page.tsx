import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight, CalendarClock } from 'lucide-react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { FAQSection } from '@/components/FAQ';
import { StrategicCTA } from '@/components/CTABoxes';
import { DESTINATION_HUBS, getDestinationHub } from '@/data/hub-config';
import { routesToDestination } from '@/lib/route-helpers';
import { formatPrice } from '@/lib/priceData';
import { breadcrumbSchema, faqPageSchema, speakableSchema } from '@/lib/schema';

interface DestProps {
  params: Promise<{ destination: string }>;
}

export function generateStaticParams() {
  return DESTINATION_HUBS.map((h) => ({ destination: h.key }));
}

export async function generateMetadata({ params }: DestProps): Promise<Metadata> {
  const { destination } = await params;
  const hub = getDestinationHub(destination);
  if (!hub) return { title: 'Destination Not Found' };
  const url = `https://uttarakhand.cab/taxi/to/${destination}`;
  return {
    title: `Taxi to ${hub.name} | Compare Fares & Routes from Delhi NCR & Uttarakhand`,
    description: `Every way to reach ${hub.name} by taxi. Compare fixed fares, distances and travel times from Delhi NCR and the Uttarakhand gateway hubs. Book a verified hill driver 24/7.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Taxi to ${hub.name} | Compare Routes & Fares`,
      description: `Compare every taxi route to ${hub.name} with fixed, all-inclusive fares.`,
      url,
      siteName: 'Uttarakhand Cab 24/7',
      type: 'website',
      images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: 'Uttarakhand Cab 24/7' }],
    },
  };
}

export default async function DestinationHubPage({ params }: DestProps) {
  const { destination } = await params;
  const hub = getDestinationHub(destination);
  if (!hub) notFound();

  const url = `https://uttarakhand.cab/taxi/to/${destination}`;
  const routes = routesToDestination(destination);

  const breadcrumbLd = breadcrumbSchema([
    { name: 'Taxi Routes', url: '/taxi' },
    { name: `To ${hub.name}`, url: `/taxi/to/${destination}` },
  ]);
  const speakableLd = speakableSchema(url);

  const hubFaqs = [
    {
      question: `How can I reach ${hub.name} by taxi?`,
      answer: `You can reach ${hub.name} by fixed-fare taxi from Delhi NCR (Delhi, Noida, Gurugram, Ghaziabad, Faridabad) and from the Uttarakhand gateway hubs of Dehradun, Rishikesh and Haridwar. Compare the routes below for distance, time and fare.`,
    },
    {
      question: `What is the best vehicle for a trip to ${hub.name}?`,
      answer: hub.seasonal
        ? `${hub.name} involves high-altitude mountain driving, so a 7-seater Innova Crysta is the recommended vehicle for comfort, ground clearance and luggage. Sedans and Ertiga SUVs suit smaller groups in good weather.`
        : `For ${hub.name}, a Sedan suits 2\u20133 passengers, an Ertiga suits families of 5\u20136, and an Innova Crysta is best for longer hill routes and heavier luggage.`,
    },
    {
      question: `Are taxi fares to ${hub.name} fixed?`,
      answer: `Yes. Every route to ${hub.name} is quoted as a fixed, all-inclusive fare with no hidden charges.`,
    },
    {
      question: hub.seasonal
        ? `When is the best time to travel to ${hub.name}?`
        : `Do you offer round-trip packages to ${hub.name}?`,
      answer: hub.seasonal
        ? `${hub.name} is best visited during its open season (${hub.openWindow}). Routes stay listed year-round so you can plan and pre-book in advance.`
        : `Yes, round-trip and multi-day packages to ${hub.name} are available and are usually more economical per kilometre than one-way drops.`,
    },
  ];
  const faqLd = faqPageSchema(hubFaqs);

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Taxi routes to ${hub.name}`,
    itemListElement: routes.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${r.origin} to ${r.destination} Taxi`,
      url: `https://uttarakhand.cab/taxi/${r.slug}`,
    })),
  };

  const cheapestSedan = routes
    .map((r) => r.fare.sedan)
    .filter((v): v is number => v !== null)
    .sort((a, b) => a - b)[0];

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
            <span className="text-[#F7941D]">To {hub.name}</span>
          </nav>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white uppercase leading-[0.95] tracking-tighter mb-6">
            Taxi to <span className="text-[#F7941D]">{hub.name}</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-8">{hub.intro}</p>
          {hub.seasonal && (
            <div className="inline-flex items-center gap-3 bg-white/5 border border-[#F7941D]/30 px-5 py-3 rounded-xl mb-8">
              <CalendarClock className="w-5 h-5 text-[#F7941D] shrink-0" />
              <p className="text-white/80 text-sm font-light"><span className="font-bold text-[#F7941D]">Seasonal destination.</span> Open window: {hub.openWindow}. Pre-booking open year-round.</p>
            </div>
          )}
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
            question={`How do I reach ${hub.name} by taxi, and how much does it cost?`}
            answer={`${hub.name} can be reached by fixed-fare taxi from Delhi NCR and the Uttarakhand gateway hubs (Dehradun, Rishikesh, Haridwar).${cheapestSedan ? ` Fares start from around ${formatPrice(cheapestSedan)} for a sedan` : ' Fares are quoted on request'}. All fares are all-inclusive with verified hill-route drivers.${hub.seasonal ? ` ${hub.name} is a seasonal destination (open ${hub.openWindow}); routes stay listed year-round for pre-booking.` : ''}`}
            facts={[
              { label: 'Destination', value: hub.name },
              { label: 'Origins served', value: 'Delhi NCR + Dehradun, Rishikesh, Haridwar' },
              ...(cheapestSedan ? [{ label: 'Fares from', value: formatPrice(cheapestSedan) }] : []),
              ...(hub.seasonal ? [{ label: 'Open window', value: hub.openWindow ?? 'Seasonal' }] : []),
            ]}
            source="Uttarakhand Cab 24/7 \u2014 Updated 2026"
          />

          <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-8">Ways to Reach {hub.name}</h2>

          {routes.length > 0 ? (
            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 shadow-xl mb-16">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse bg-[#1A1A1A] whitespace-nowrap">
                  <thead className="bg-[#1A1A1A] text-white uppercase tracking-[0.15em] text-[10px] font-black">
                    <tr>
                      <th className="p-6 border-r border-white/5">From</th>
                      <th className="p-6 border-r border-white/5">Distance</th>
                      <th className="p-6 border-r border-white/5">Time</th>
                      <th className="p-6 border-r border-white/5">Sedan Fare</th>
                      <th className="p-6">Route</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {routes.map((r) => (
                      <tr key={r.slug} className="border-b border-white/10 hover:bg-[#1A1A1A]/60 transition-colors">
                        <td className="p-6 font-black border-r border-white/10">{r.origin}</td>
                        <td className="p-6 font-light border-r border-white/10">{r.distanceKm} km</td>
                        <td className="p-6 font-light border-r border-white/10">{r.travelTime}</td>
                        <td className="p-6 font-black text-[#F7941D] border-r border-white/10">{r.fare.sedan !== null ? formatPrice(r.fare.sedan) : 'On request'}</td>
                        <td className="p-6">
                          <Link href={`/taxi/${r.slug}`} className="inline-flex items-center gap-2 text-white font-bold hover:text-[#F7941D] transition-colors">
                            View <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm mb-16">
              <p className="text-white/70 font-light leading-relaxed">
                Published fixed-fare routes to {hub.name} are being added. We already serve {hub.name} from all major origins on request \u2014 call or WhatsApp <a href="tel:+919258912169" className="text-[#F7941D] font-bold">+91 92589 12169</a> with your pickup city for an instant fixed quote.
              </p>
            </div>
          )}

          <div className="bg-[#1A1A1A] p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-sm mb-16">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-4">About {hub.name}</h2>
            <p className="text-white/70 font-light leading-relaxed mb-6">{hub.intro}</p>
            <Link href={hub.editorialParent} className="inline-flex items-center gap-2 text-[#F7941D] font-black uppercase text-xs tracking-widest hover:gap-3 transition-all">
              Read the full {hub.name} guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-sm mb-16">
            <FAQSection faqs={hubFaqs} title={`Taxi to ${hub.name} FAQs`} />
          </div>

          <StrategicCTA heading={`Book Your Taxi to ${hub.name}`} subtext="Compare routes, then book a fixed-fare cab with a verified hill driver. Available 24/7." />
        </div>
      </section>
    </div>
  );
}
