import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { MapPin, Shield, Check, Car, HelpCircle, Phone, Clock } from 'lucide-react';
import { StrategicCTA } from '@/components/CTABoxes';
import { FAQSection } from '@/components/FAQ';
import { faqPageSchema } from '@/lib/schema';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export const metadata: Metadata = {
  title: 'Uttarakhand Distance Guide 2026 | Road Distances & Travel Times',
  description: 'Road distances & travel times for 25+ Uttarakhand routes. Dehradun–Mussoorie 35 km, Dehradun–Kedarnath 250 km, Haridwar–Rishikesh 25 km. Plan your Char Dham or hill station trip.',
  alternates: { canonical: 'https://uttarakhand.cab/distance-guide' },
  openGraph: {
    title: 'Uttarakhand Distance Guide 2026 | Road Distances & Travel Times',
    description: 'Road distances & travel times for 25+ Uttarakhand routes. Dehradun–Mussoorie 35 km, Dehradun–Kedarnath 250 km, Haridwar–Rishikesh 25 km.',
    url: 'https://uttarakhand.cab/distance-guide',
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [
      {
        url: 'https://uttarakhand.cab/images/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Uttarakhand Road Distance Guide 2026',
      },
    ],
  },
};

const distances = [
  { from: 'Dehradun', slug: '/dehradun', destinations: [
    { to: 'Mussoorie', slug: '/mussoorie', km: 35, hrs: '1.5', road: 'Via Rajpur Road (NH507)' },
    { to: 'Rishikesh', slug: '/rishikesh', km: 50, hrs: '1.5', road: 'Via NH7' },
    { to: 'Haridwar', slug: '/haridwar', km: 55, hrs: '1.5', road: 'Via NH334' },
    { to: 'Dhanaulti', slug: null, km: 60, hrs: '2.5', road: 'Via Mussoorie / Suwakholi' },
    { to: 'Nainital', slug: '/nainital', km: 280, hrs: '7', road: 'Via Roorkee & Kashipur' },
    { to: 'Kedarnath (Gaurikund)', slug: '/kedarnath', km: 250, hrs: '8-9', road: 'Via Rishikesh, Rudraprayag' },
    { to: 'Badrinath', slug: '/char-dham', km: 300, hrs: '9-10', road: 'Via Rishikesh, Joshimath' },
    { to: 'Delhi (ISBT)', slug: null, km: 300, hrs: '5-6', road: 'Via Delhi-Dehradun Expressway' },
    { to: 'Jolly Grant Airport', slug: '/services/jolly-grant-airport-taxi-service', km: 30, hrs: '45 mins', road: 'Via NH7 (Rishikesh Road)', noUnit: true },
  ]},
  { from: 'Haridwar', slug: '/haridwar', destinations: [
    { to: 'Rishikesh', slug: '/rishikesh', km: 25, hrs: '1', road: 'Via Haridwar-Rishikesh Highway' },
    { to: 'Dehradun', slug: '/dehradun', km: 55, hrs: '1.5', road: 'Via NH334' },
    { to: 'Kedarnath (Gaurikund)', slug: '/kedarnath', km: 250, hrs: '8-9', road: 'Via Rudraprayag' },
    { to: 'Yamunotri (Janki Chatti)', slug: '/char-dham', km: 220, hrs: '7-8', road: 'Via Barkot' },
    { to: 'Gangotri', slug: '/char-dham', km: 260, hrs: '8-9', road: 'Via Uttarkashi' },
    { to: 'Badrinath', slug: '/char-dham', km: 320, hrs: '10', road: 'Via Joshimath' },
  ]},
  { from: 'Rishikesh', slug: '/rishikesh', destinations: [
    { to: 'Haridwar', slug: '/haridwar', km: 25, hrs: '1', road: 'Via Haridwar-Rishikesh Highway' },
    { to: 'Dehradun', slug: '/dehradun', km: 50, hrs: '1.5', road: 'Via NH7' },
    { to: 'Mussoorie', slug: '/mussoorie', km: 80, hrs: '2.5', road: 'Via Dehradun' },
    { to: 'Kedarnath (Gaurikund)', slug: '/kedarnath', km: 210, hrs: '7-8', road: 'Via Devprayag, Rudraprayag' },
    { to: 'Badrinath', slug: '/char-dham', km: 295, hrs: '9', road: 'Via Devprayag, Joshimath' },
    { to: 'Chopta', slug: null, km: 195, hrs: '6-7', road: 'Via Devprayag, Ukhimath' },
  ]},
  { from: 'Kathgodam', slug: null, destinations: [
    { to: 'Nainital', slug: '/nainital', km: 35, hrs: '1.5', road: 'Via Bhowali' },
    { to: 'Bhimtal', slug: null, km: 25, hrs: '1', road: 'Via Bhowali' },
    { to: 'Ranikhet', slug: null, km: 75, hrs: '2.5', road: 'Via Bhimtal' },
    { to: 'Mukteshwar', slug: null, km: 80, hrs: '2.5', road: 'Via Bhowali' },
    { to: 'Jim Corbett (Ramnagar)', slug: null, km: 65, hrs: '2', road: 'Via Kaladhungi' },
    { to: 'Almora', slug: null, km: 90, hrs: '3', road: 'Via Bhowali' },
  ]},
  { from: 'Delhi', slug: null, destinations: [
    { to: 'Dehradun', slug: '/dehradun', km: 300, hrs: '5-6', road: 'Via Delhi-Dehradun Expressway (NH58)' },
    { to: 'Haridwar', slug: '/haridwar', km: 220, hrs: '4-5', road: 'Via NH58 / Meerut Bypass' },
    { to: 'Rishikesh', slug: '/rishikesh', km: 240, hrs: '5', road: 'Via NH58 / Haridwar' },
    { to: 'Mussoorie', slug: '/mussoorie', km: 300, hrs: '6-7', road: 'Via Dehradun' },
    { to: 'Nainital', slug: '/nainital', km: 310, hrs: '6-7', road: 'Via Moradabad, Kathgodam' },
    { to: 'Jim Corbett (Ramnagar)', slug: null, km: 245, hrs: '5', road: 'Via Moradabad, Kashipur' },
  ]},
];

const roadFAQs = [
  { question: 'Why does a 50 km distance in Uttarakhand take so long to cover?', answer: 'In the Himalayan terrain, driving speeds are significantly reduced due to winding mountain roads, steep inclines, and sharp hairpin bends. An average safe driving speed in the hills is between 25–35 km/h. This is why a 100 km journey can easily take 3 to 4 hours.' },
  { question: 'What is the distance from Dehradun to Mussoorie?', answer: 'The road distance from Dehradun to Mussoorie is 35 km via Rajpur Road (NH507). It takes approximately 1.5 hours by taxi. The route involves a scenic climb through the Shivalik hills with multiple hairpin bends.' },
  { question: 'How far is Haridwar from Rishikesh by road?', answer: 'Haridwar to Rishikesh is 25 km by road and takes approximately 1 hour by taxi via the Haridwar-Rishikesh Highway. This is one of the most frequently travelled routes in Uttarakhand.' },
  { question: 'What is the road distance from Dehradun to Kedarnath?', answer: 'Dehradun to Kedarnath (Gaurikund, the trek base) is approximately 250 km and takes 8–9 hours by road via Rishikesh and Rudraprayag. From Gaurikund, a 16 km trek reaches the Kedarnath temple.' },
  { question: 'Are the roads open during the monsoon season?', answer: 'Major highways remain open, but mountain roads are susceptible to landslides during heavy monsoon rains (July–August). Our local drivers stay updated with live conditions and take alternate routes if necessary.' },
  { question: 'Are taxi fares calculated per kilometer or fixed?', answer: 'For common point-to-point transfers (like Dehradun to Mussoorie or Rishikesh), we offer transparent fixed-fare pricing with no hidden charges. For multi-day itineraries, pricing is based on a daily limit of 250 km.' },
];

export default function DistanceGuide() {
  const faqSchema = faqPageSchema(roadFAQs);

  return (
    <>
      {/* GEO — Direct Answer Block, visually hidden */}
      <section className="sr-only">
        <GEOAnswerBox
          question="What are the road distances between major Uttarakhand destinations?"
          answer="Key Uttarakhand road distances: Dehradun to Mussoorie 35 km (1.5 hrs), Dehradun to Rishikesh 50 km (1.5 hrs), Dehradun to Haridwar 55 km (1.5 hrs), Haridwar to Rishikesh 25 km (45 min), Dehradun to Nainital 280 km (7 hrs), Dehradun to Kedarnath 250 km (8–9 hrs), Dehradun to Badrinath 320 km (10–11 hrs), Rishikesh to Kedarnath 220 km (7.5 hrs), Haridwar to Kedarnath 240 km (8 hrs), Delhi to Dehradun 240 km (6–7 hrs)."
          facts={[
            { label: 'Dehradun–Mussoorie', value: '35 km · 1.5 hrs' },
            { label: 'Dehradun–Rishikesh', value: '50 km · 1.5 hrs' },
            { label: 'Dehradun–Haridwar', value: '55 km · 1.5 hrs' },
            { label: 'Haridwar–Rishikesh', value: '25 km · 45 min' },
            { label: 'Dehradun–Nainital', value: '280 km · 7 hrs' },
            { label: 'Dehradun–Kedarnath', value: '250 km · 8–9 hrs' },
            { label: 'Dehradun–Badrinath', value: '320 km · 10–11 hrs' },
            { label: 'Delhi–Dehradun', value: '240 km · 6–7 hrs' },
          ]}
          source="Uttarakhand Cab 24/7 — Distance Guide 2026"
        />
      </section>
    <>
      <Script
        id="distance-guide-faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <section className="relative bg-navy text-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/assets/images/hero-mountain-road.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container-wide relative z-10">
          <nav aria-label="Breadcrumb" className="text-white/80 text-sm mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-gold transition-colors font-medium">Home</Link>
            <span className="text-white/50">/</span>
            <span className="text-gold font-medium">Distance Guide</span>
          </nav>
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Travel Planning 2026</p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl uppercase mb-6 leading-tight">
            Uttarakhand Road <br />
            <span className="text-gold">Distance Guide</span>
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mb-8 leading-relaxed">
            Accurate road distances and travel times for 25+ routes across Uttarakhand —
            Dehradun, Haridwar, Rishikesh, Mussoorie, Kedarnath, Nainital and more.
          </p>
          <div className="flex flex-wrap gap-6 text-white/90 text-sm font-medium">
            <span className="flex items-center gap-1.5"><Shield className="w-5 h-5 text-gold" /> Safe Mountain Driving</span>
            <span className="flex items-center gap-1.5"><Check className="w-5 h-5 text-gold" /> Fixed Routes</span>
            <span className="flex items-center gap-1.5"><Car className="w-5 h-5 text-gold" /> Experienced Drivers</span>
          </div>
        </div>
      </section>

      {/* Information Block */}
      <section className="content-section bg-[#1A1A1A] pb-8">
        <div className="container-wide">
          <div className="bg-[#1A1A1A] p-6 md:p-8 border-l-4 border-gold shadow-sm">
            <h2 className="font-heading font-bold text-xl text-navy mb-3">Understanding Mountain Travel Times</h2>
            <p className="text-gray-700 leading-relaxed">
              Distance in kilometres does not translate directly to travel time on Uttarakhand&apos;s mountain roads.
              Winding routes, elevation changes, and traffic through hill towns mean average speeds of 25–35 km/h.
              All estimates below are based on our drivers&apos; real-world experience in normal weather conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Distance Tables */}
      <section className="content-section bg-[#1A1A1A] pt-4">
        <div className="container-wide space-y-12">
          {distances.map((section) => (
            <div key={section.from} className="bg-[#1A1A1A] shadow-sm border border-white/10 overflow-hidden rounded-sm">
              <div className="bg-navy p-5 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-gold" />
                <h2 className="font-heading font-bold text-xl text-white uppercase m-0">
                  {section.slug ? (
                    <Link href={section.slug} className="hover:text-gold transition-colors">
                      Distance from {section.from}
                    </Link>
                  ) : (
                    <>Distance from {section.from}</>
                  )}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-white/10 text-gray-600">
                      <th className="p-4 font-bold uppercase tracking-wider text-xs">Destination</th>
                      <th className="p-4 font-bold uppercase tracking-wider text-xs">Distance</th>
                      <th className="p-4 font-bold uppercase tracking-wider text-xs">Est. Time</th>
                      <th className="p-4 font-bold uppercase tracking-wider text-xs">Preferred Route</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {section.destinations.map((d, i) => (
                      <tr key={d.to} className={`border-b border-white/10 hover:bg-gold/5 transition-colors ${i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#1A1A1A]/30'}`}>
                        <td className="p-4 font-semibold text-navy">
                          {d.slug ? (
                            <Link href={d.slug} className="hover:text-gold transition-colors underline-offset-2 hover:underline">
                              {d.to}
                            </Link>
                          ) : d.to}
                        </td>
                        <td className="p-4 font-bold text-gold">{d.km} km</td>
                        <td className="p-4 text-gray-700">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-gray-400 shrink-0" /> {d.hrs}{(d as any).noUnit ? '' : ' hrs'}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600 text-xs">{d.road}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="content-section bg-[#1A1A1A] border-t border-white/10">
        <div className="container-wide max-w-4xl">
          <div className="mb-10">
            <HelpCircle className="w-10 h-10 text-gold mb-3" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy uppercase mb-4">
              Distance & Route FAQs
            </h2>
            <p className="text-gray-700">Common questions about road distances and travel times in Uttarakhand.</p>
          </div>

          <FAQSection faqs={roadFAQs} />

          <div className="mt-10 p-6 bg-[#1A1A1A] border border-white/10 rounded-sm">
            <h3 className="font-bold text-navy mb-2">Need a custom route calculation?</h3>
            <p className="text-gray-700 text-sm mb-4">
              If your destination isn&apos;t listed above, our team can provide an exact distance, travel time, and fixed fare quote.
            </p>
            <a href="tel:+919258912169" className="inline-flex items-center gap-2 text-navy font-bold hover:text-gold transition-colors">
              <Phone className="w-4 h-4" /> Call +91 92589 12169
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-[#1A1A1A]">
        <div className="container-wide">
          <StrategicCTA
            heading="Ready to Book Your Route?"
            subtext="Fixed fares, fully transparent pricing, and experienced mountain drivers. Contact us today to secure your vehicle."
          />
        </div>
      </section>
    </>
  
    </>
  );
}
