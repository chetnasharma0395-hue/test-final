import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, CheckCircle2 } from 'lucide-react';
import routes from '@/data/routes.json';
import { getRelatedServiceLinks } from '@/lib/relatedRoutes';
import { getBlogCrossLink } from '@/lib/blogCrossLinks';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';
import { taxiServiceSchema, breadcrumbSchema, faqPageSchema, extractFromTo, speakableSchema } from '@/lib/schema';

// Import your custom Pillar Pages here!
import DehradunToDelhiContent from '@/components/DehradunToDelhiContent';
import JollyGrantToMussoorieContent from '@/components/JollyGrantToMussoorieContent';
import DehradunToChandigarhContent from '@/components/DehradunToChandigarhContent';
import DehradunToDhanaultiContent from '@/components/DehradunToDhanaultiContent';
import DehradunToRishikeshContent from '@/components/DehradunToRishikeshContent';
import DehradunToNainitalCorbettContent from '@/components/DehradunToNainitalCorbettContent';
import DehradunToKedarnathContent from '@/components/DehradunToKedarnathContent';
import DehradunToBadrinathContent from '@/components/DehradunToBadrinathContent';
import DelhiToKedarnathContent from '@/components/DelhiToKedarnathContent';
import DelhiToKumaonCircuitContent from '@/components/DelhiToKumaonCircuitContent';


interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return routes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const resolvedParams = await params;
  const route = routes.find((r) => r.slug === resolvedParams.slug);
  
  if (!route) return { title: 'Service Not Found' };

  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: `https://uttarakhand.cab/services/${resolvedParams.slug}` },
    openGraph: {
      title: route.title,
      description: route.description,
      url: `https://uttarakhand.cab/services/${resolvedParams.slug}`,
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
}

// Branded hero configuration per route — image, tagline, and trust badges
// for the navy hero section. Falls back to a generic mountain road image
// and generic badges if a slug isn't listed here.
const heroConfigMap: Record<string, { image: string; tagline: string; badge1: string; badge2: string }> = {
  'chandigarh-taxi-service': {
    image: '/assets/images/dest-chandigarh.jpeg',
    tagline: 'City Beautiful, Direct from Dehradun',
    badge1: 'PGI Medical Travel Specialists',
    badge2: 'Pre-Cleared Inter-State Permits',
  },
  'dhanaulti-taxi-service': {
    image: '/assets/images/dest-high-himalayas.jpg',
    tagline: 'Pine Forests & Misty Ridges',
    badge1: 'Hill-Certified Drivers',
    badge2: 'Mussoorie & Dhanaulti Combo',
  },
};

const defaultHero = {
  image: '/assets/images/hero-mountain-road.jpg',
  tagline: 'Reliable Taxi Service Across Uttarakhand',
  badge1: 'Local Mountain Experts',
  badge2: 'Zero Hidden Charges',
};

export default async function ServicePage({ params }: RouteProps) {
  const resolvedParams = await params;
  const route = routes.find((r) => r.slug === resolvedParams.slug);

  if (!route) notFound();

  const pageUrl = `https://uttarakhand.cab/services/${resolvedParams.slug}`;
  const { from, to } = extractFromTo(route.h1 || route.title);
  const rawPrice = route.price || route.basePrice;

  // 1. TaxiService with Offer + AggregateRating on provider
  const jsonLd = taxiServiceSchema({
    name: route.h1 || route.title,
    description: route.description || '',
    url: pageUrl,
    price: typeof rawPrice === 'string' ? rawPrice : String(rawPrice ?? ''),
    from,
    to,
  });

  // 2. BreadcrumbList: Home → Services → This Route
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Services', url: '/services' },
    { name: route.h1 || route.title, url: `/services/${resolvedParams.slug}` },
  ]);

  const hero = heroConfigMap[route.slug] || defaultHero;

  // Dynamic related links — auto-generated from routes.json, no manual map needed
  const relatedLinks = getRelatedServiceLinks(route.slug);
  const blogCrossLink = getBlogCrossLink(route.slug);
  const speakableLd = speakableSchema(pageUrl);

  // Auto-generate FAQPage schema if route has faq entries (q/a shape from routes.json)
  const routeFaqs: { q: string; a: string }[] = (route as any).faq || [];
  const faqLd =
    routeFaqs.length > 0
      ? faqPageSchema(routeFaqs.map((item) => ({ question: item.q, answer: item.a })))
      : null;

  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden text-left">
        <div className="absolute inset-0 opacity-40">
          <Image src={hero.image} alt={route.h1 || route.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />

        <div className="max-w-page mx-auto relative z-10">
          <div className="max-w-4xl">
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 text-white/80 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <Link href="/services" className="hover:text-[#F7941D] transition-colors">Services</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">{route.category || 'Route'}</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">{hero.tagline}</p>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white uppercase leading-[0.95] tracking-tighter mb-6">
              {route.h1 || route.title}
            </h1>
            {route.description && (
              <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
                {route.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="tel:+919258912169" className="px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_20px_-5px_#F7941D] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Phone className="w-4 h-4 shrink-0" /> Call Now
              </a>
              <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Quote
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> {hero.badge1}</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> {hero.badge2}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="relative z-20 px-4 sm:px-6 lg:px-8 pt-12 pb-12">
      <div className="max-w-6xl mx-auto">
        {route.category && (
          <span className="sr-only">
            {route.category} Service
          </span>
        )}

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          
          {/* LEFT COLUMN: Content Injection */}
          <div className="lg:col-span-2 space-y-8">
            
                                           {/* The Magic Switch: Inject the massive articles based on the URL slug */}
            {route.slug === 'dehradun-to-delhi-taxi-service' ? (
              <DehradunToDelhiContent />
            ) : route.slug === 'jolly-grant-airport-taxi-service' ? (
              <JollyGrantToMussoorieContent />
            ) : route.slug === 'chandigarh-taxi-service' ? (
              <DehradunToChandigarhContent />
            ) : route.slug === 'dhanaulti-taxi-service' ? (
              <DehradunToDhanaultiContent />
            ) : route.slug === 'rishikesh-taxi-service' ? (
              <DehradunToRishikeshContent />
            ) : route.slug === 'nainital-taxi-service' ? (
              <DehradunToNainitalCorbettContent />
            ) : route.slug === 'badrinath-taxi-service' ? (
              <DehradunToBadrinathContent />
            ) : route.slug === 'delhi-to-kedarnath-taxi-service' ? (
              <DelhiToKedarnathContent />
            ) : route.slug === 'delhi-to-kumaon-circuit-taxi' ? (
              <DelhiToKumaonCircuitContent />
            ) : (
              <>

                {/* GEO — Direct Answer Block, visually hidden */}
              <section className="sr-only">
                <GEOAnswerBox
                  question={`${route.h1 || route.title} — Taxi Service 2026`}
                  answer={route.description || `Book a reliable taxi for ${route.h1 || route.title} with Uttarakhand Cab 24/7. Fixed fares, verified mountain drivers, and 24/7 availability. Call or WhatsApp +91 92589 12169 for an instant quote.`}
                  facts={[
                    ...(route.distance ? [{ label: 'Distance', value: route.distance }] : []),
                    ...((route as any).duration ? [{ label: 'Travel Time', value: (route as any).duration }] : []),
                    ...((route.price || route.basePrice) ? [{ label: 'Starting Fare', value: String(route.price || route.basePrice) }] : []),
                    { label: 'Provider', value: 'Uttarakhand Cab 24/7' },
                    { label: 'Availability', value: '24/7' },
                  ]}
                  source="Uttarakhand Cab 24/7 — Verified 2026"
                />
              </section>

                {route.description && (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {route.description}
                  </p>
                )}
                {/* ... (keep the rest of your default fallback code here) ... */}

                
                {route.localSecrets && route.localSecrets.length > 0 && (
                  <section className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                    <h2 className="text-xl font-bold mb-3">Local Insights for this Route</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {route.localSecrets.map((tip: string, index: number) => (
                        <li key={index} className="text-gray-800">{tip}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {route.uniquePoint && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <h3 className="font-bold text-blue-800 mb-2">💡 Why choose us for this route?</h3>
                    <p className="text-blue-900 italic">
                      &quot;{route.uniquePoint}&quot; <br />
                      <span className="block mt-2 font-semibold not-italic text-sm">Sahi safar sahi service aur vo safar hamari zimmedaari.</span>
                    </p>
                  </div>
                )}

                {routeFaqs.length > 0 && (
                  <section className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
                    <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-6">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {routeFaqs.map((faq, i) => (
                        <details key={i} className="group border border-white/10 rounded-xl overflow-hidden">
                          <summary className="geo-faq-question flex justify-between items-center p-5 cursor-pointer font-black text-white text-sm tracking-tight list-none hover:bg-[#1A1A1A] transition-colors">
                            {faq.q}
                            <span className="ml-4 shrink-0 text-[#F7941D] group-open:rotate-45 transition-transform">+</span>
                          </summary>
                          <p className="geo-faq-answer px-5 pb-5 text-white/70 font-light text-sm leading-relaxed">
                            {faq.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>

          {/* RIGHT COLUMN: Sticky Pricing & CTA Card (Always Visible!) */}
          <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/10 shadow-xl sticky top-6">
            <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-4">Route Details</h3>
            
            <ul className="space-y-4 mb-8">
              {route.distance && (
                <li className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Approx Distance:</span>
                  <span className="font-medium">{route.distance}</span>
                </li>
              )}
              {route.duration && (
                <li className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Est. Duration:</span>
                  <span className="font-medium">{route.duration}</span>
                </li>
              )}
              {(route.price || route.basePrice) && (
                <li className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Pricing:</span>
                  <span className="font-medium text-green-600">
                    {String(route.price || route.basePrice).startsWith('₹') ? (route.price || route.basePrice) : `₹${route.price || route.basePrice}`}
                  </span>
                </li>
              )}
            </ul>

            <div className="space-y-3">
              <a 
                href="https://wa.me/919258912169" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full text-center bg-[#25D366] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-[#128C7E] transition"
              >
                WhatsApp Booking
              </a>
              <a 
                href="tel:+919258912169" 
                className="block w-full text-center bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-[#D97E10] transition"
              >
                Call Now
              </a>
            </div>

            {/* Related Pages — contextual internal links per route */}
            {relatedLinks.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Related Routes</h4>
                <ul className="space-y-2">
                  {relatedLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="flex items-center gap-2 text-sm text-white hover:text-[#F7941D] font-semibold transition-colors">
                        <span className="text-[#F7941D]">›</span> {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {blogCrossLink && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Travel Guide</h4>
                <a
                  href={blogCrossLink.href}
                  className="flex items-start gap-3 group"
                >
                  <span className="text-[#F7941D] font-black text-lg leading-none mt-0.5">✦</span>
                  <span className="text-sm text-white group-hover:text-[#F7941D] font-semibold transition-colors leading-snug">
                    {blogCrossLink.title}
                  </span>
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
      </main>
    </div>
  );
}
