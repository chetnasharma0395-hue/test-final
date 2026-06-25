import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck, HeartHandshake, CheckCircle2, Car,
  Compass, XCircle, Phone, MessageCircle, Star,
} from 'lucide-react';
import { StrategicCTA, TrustBanner } from '@/components/CTABoxes';
import { TiltCard } from '@/components/TiltCard';

/* ─── Metadata ───────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'About Uttarakhand Cab 24/7 | Trusted Taxi Service In Uttarakhand',
  description:
    'Learn about Uttarakhand Cab 24/7, a trusted Dehradun-based taxi service providing airport transfers, Char Dham Yatra taxis, hill station tours, and outstation cab services across Uttarakhand.',
  alternates: { canonical: 'https://uttarakhand.cab/about' },
  openGraph: {
    title: 'About Uttarakhand Cab 24/7 | Trusted Taxi Service In Uttarakhand',
    description:
      'Trusted taxi service in Uttarakhand offering airport transfers, Char Dham Yatra taxis and outstation cab services.',
    url: 'https://uttarakhand.cab/about',
    siteName: 'Uttarakhand Cab 24/7',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: 'Uttarakhand Cab 24/7' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Uttarakhand Cab 24/7',
    description: 'Trusted taxi service in Uttarakhand for airport transfers, Char Dham Yatra and hill station tours.',
  },
};

/* ─── Page ───────────────────────────────────────────────────────── */

export default function AboutPage() {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://uttarakhand.cab/about/#webpage',
        url: 'https://uttarakhand.cab/about',
        name: 'About Uttarakhand Cab 24/7 | Trusted Taxi Service In Uttarakhand',
        description: 'Learn about Uttarakhand Cab 24/7, a trusted Dehradun-based taxi service providing airport transfers, Char Dham Yatra taxis, hill station tours, and outstation cab services across Uttarakhand.',
        inLanguage: 'en-IN',
        mainEntity: { '@id': 'https://uttarakhand.cab/#organization' },
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://uttarakhand.cab/#logo',
        url: 'https://uttarakhand.cab/logo.png',
      },
      {
        '@type': 'TaxiService',
        '@id': 'https://uttarakhand.cab/#organization',
        name: 'Uttarakhand Cab 24/7',
        url: 'https://uttarakhand.cab',
        logo: { '@id': 'https://uttarakhand.cab/#logo' },
        image: 'https://uttarakhand.cab/logo.png',
        email: 'uttarakhandcab247@gmail.com',
        telephone: ['+919258912169', '+919675212169'],
        description: 'A trusted local taxi service based in Dehradun offering airport transfers, Char Dham Yatra tours, and outstation cabs across Uttarakhand.',
        sameAs: ['https://uttarakhandcab.in'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dehradun',
          addressRegion: 'Uttarakhand',
          addressCountry: 'IN',
        },
        geo: { '@type': 'GeoCoordinates', latitude: '30.3165', longitude: '78.0322' },
        areaServed: [
          { '@type': 'State', name: 'Uttarakhand' },
          { '@type': 'City', name: 'Dehradun' },
          { '@type': 'City', name: 'Mussoorie' },
          { '@type': 'City', name: 'Rishikesh' },
          { '@type': 'City', name: 'Haridwar' },
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        priceRange: '₹₹',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uttarakhand.cab' },
          { '@type': 'ListItem', position: 2, name: 'About', item: 'https://uttarakhand.cab/about' },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-[#1A1A1A] selection:bg-[#F7941D]/30">

        {/* ── 1. HERO ──────────────────────────────────────────── */}
        <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 bg-[#121212] border-b border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F7941D] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-page mx-auto relative z-10">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="inline-flex items-center gap-2 bg-[#1A1A1A] backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 shadow-sm text-white/70 text-xs font-bold uppercase tracking-widest">
                <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
                <span className="opacity-30">/</span>
                <span className="text-[#F7941D]">About Us</span>
              </nav>

              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4" /> Hey There — Glad You Found Us
              </p>
              <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-8">
                Born in the <br />
                <span className="text-[#F7941D]">Mountains.</span>
              </h1>
              <p className="text-white/70 text-lg md:text-2xl max-w-2xl font-light leading-relaxed mb-10">
                Uttarakhand Cab 24/7 is a trusted taxi service based in Dehradun, providing{' '}
                <Link href="/dehradun-airport-taxi" className="text-[#F7941D] hover:underline font-medium">airport transfers</Link>,{' '}
                <Link href="/char-dham" className="text-[#F7941D] hover:underline font-medium">Char Dham Yatra taxis</Link>,
                hill station tours, and outstation cab services across Uttarakhand.
              </p>
              <p className="text-white/70 text-lg font-light leading-relaxed max-w-2xl">
                Whether you&apos;re arriving for a family holiday, a spiritual journey, a mountain adventure, or simply a weekend escape — we&apos;re happy you&apos;re here.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. TRUST NUMBERS ─────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A] border-b border-white/10">
          <div className="max-w-page mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { stat: '10+', label: 'Years Experience' },
                { stat: '24×7', label: 'Availability' },
                { stat: '20,000+', label: 'Travellers Served' },
                { stat: 'All', label: 'Major Destinations' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p className="text-4xl md:text-5xl font-black text-[#F7941D] tracking-tighter">{stat}</p>
                  <p className="text-white/70 font-light mt-2">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. THE STORY ─────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              <div className="order-2 lg:order-1">
                <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">More Than Just a Taxi Service</p>
                <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-8 leading-none">
                  The Himalayan <br className="hidden md:block" /> Difference
                </h2>
                <div className="space-y-5 text-white/70 text-lg font-light leading-relaxed">
                  <p>Every year, thousands of travellers arrive in Uttarakhand for different reasons.</p>
                  <p>
                    Some come to watch the sunrise from{' '}
                    <Link href="/mussoorie" className="text-[#F7941D] hover:underline font-medium">Mussoorie</Link>.
                    Some come seeking peace along the Ganga in{' '}
                    <Link href="/rishikesh" className="text-[#F7941D] hover:underline font-medium">Rishikesh</Link>.
                    Some arrive with a lifelong dream of visiting{' '}
                    <Link href="/kedarnath" className="text-[#F7941D] hover:underline font-medium">Kedarnath</Link> and{' '}
                    <Link href="/badrinath" className="text-[#F7941D] hover:underline font-medium">Badrinath</Link>.
                    Others simply want time with family in the mountains.
                  </p>
                  <p>We consider it a privilege to be a small part of those journeys.</p>
                  <p className="font-bold text-white border-l-4 border-[#F7941D] pl-6 py-3 bg-[#1A1A1A]/50 rounded-r-2xl pr-4">
                    At Uttarakhand Cab 24/7, transportation is only one part of what we do. Our real responsibility is helping people travel with confidence, comfort, and peace of mind.
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div className="relative aspect-square lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
                  <Image
                    src="/assets/images/dest-mussoorie.jpg"
                    alt="Safe mountain driving in Uttarakhand"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1F20]/80 via-[#1E1F20]/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-[#121212]/90 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 shadow-lg transform transition-transform group-hover:-translate-y-2">
                      <div className="bg-[#1A1A1A] p-3 rounded-xl shrink-0">
                        <ShieldCheck className="w-6 h-6 text-[#F7941D]" />
                      </div>
                      <p className="text-white text-xs font-black uppercase tracking-widest">Mountain Certified Drivers</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. WHY WE STARTED ────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
          <div className="max-w-page mx-auto">
            <div className="max-w-3xl">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Our Origin</p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-8 leading-none">
                Why We Started
              </h2>
              <div className="space-y-5 text-white/70 text-lg font-light leading-relaxed mb-10">
                <p>Finding transportation in the mountains isn&apos;t always easy.</p>
                <p>Travellers often face changing prices, confusing information, unreliable vehicles, and drivers unfamiliar with Himalayan roads.</p>
                <p>We created Uttarakhand Cab 24/7 with a simple goal:</p>
                <p className="text-white font-bold text-xl">
                  To provide dependable transportation backed by local knowledge, honest communication, and genuine hospitality.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  'No complicated booking process.',
                  'No unnecessary surprises.',
                  'Just reliable travel across Uttarakhand.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                    <CheckCircle2 className="w-5 h-5 text-[#F7941D] shrink-0 mt-0.5" />
                    <p className="text-white font-light text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. CORE VALUES ───────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-3">What We Believe</p>
                <h2 className="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                  Why Choose <br className="hidden md:block" /> a Local Operator?
                </h2>
              </div>
              <p className="text-white/70 text-lg font-light max-w-md">
                We don&apos;t rely on call centers. We rely on ground-level expertise and a relentless focus on passenger safety.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Car,
                  title: 'Travel Should Feel Easy',
                  text: 'Planning a trip shouldn\'t be stressful. We aim to make every journey smooth from the first call to the final drop.',
                },
                {
                  icon: HeartHandshake,
                  title: 'People Matter',
                  text: 'Behind every booking is a family, a traveller, a pilgrim, or a dream journey. We never forget that.',
                },
                {
                  icon: Compass,
                  title: 'Local Knowledge Matters',
                  text: 'Technology is helpful, but local experience, route knowledge, and human support still make the biggest difference.',
                },
              ].map((value) => (
                <TiltCard key={value.title} className="bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-white/10 shadow-sm" intensityX={8} intensityY={10}>
                  <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] flex items-center justify-center mb-8" style={{ transform: 'translateZ(30px)' }}>
                    <value.icon className="w-8 h-8 text-[#F7941D]" />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-4" style={{ transform: 'translateZ(25px)' }}>{value.title}</h3>
                  <p className="text-white/70 font-light leading-relaxed">{value.text}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. WE CALL THESE MOUNTAINS HOME ─────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <div className="max-w-3xl">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Our Home</p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-8 leading-none">
                We Call These<br />Mountains Home
              </h2>
              <div className="space-y-5 text-white/70 text-lg font-light leading-relaxed">
                <p>Dehradun is where our journey began.</p>
                <p>
                  From here, we&apos;ve spent years helping travellers discover the places that make Uttarakhand special — from bustling pilgrimage towns and peaceful hill stations to remote Himalayan valleys and hidden gems.
                </p>
                <p>These roads are part of our everyday life. The weather, the seasons, the mountain routes, and the destinations that visitors travel hundreds of kilometres to experience — they&apos;re all part of the place we proudly call home.</p>
                <p className="font-bold text-white">That local connection helps us serve every traveller with confidence.</p>
                <p>
                  Today we regularly serve travellers visiting{' '}
                  <Link href="/mussoorie" className="text-[#F7941D] hover:underline font-medium">Mussoorie</Link>,{' '}
                  <Link href="/rishikesh" className="text-[#F7941D] hover:underline font-medium">Rishikesh</Link>,{' '}
                  <Link href="/haridwar" className="text-[#F7941D] hover:underline font-medium">Haridwar</Link>,{' '}
                  <Link href="/nainital" className="text-[#F7941D] hover:underline font-medium">Nainital</Link>,{' '}
                  Auli, Chopta,{' '}
                  <Link href="/kedarnath" className="text-[#F7941D] hover:underline font-medium">Kedarnath</Link>,{' '}
                  <Link href="/badrinath" className="text-[#F7941D] hover:underline font-medium">Badrinath</Link>,{' '}
                  Gangotri, Yamunotri,{' '}
                  <Link href="/jim-corbett" className="text-[#F7941D] hover:underline font-medium">Jim Corbett</Link>{' '}
                  and destinations across Uttarakhand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. JOURNEYS WE NEVER FORGET ──────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Real Moments</p>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-12 leading-none">
              The Journeys We<br />Never Forget
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { emoji: '🙏', text: 'A family completing their first Char Dham Yatra together.', link: '/char-dham', linkText: 'Char Dham Yatra' },
                { emoji: '❄️', text: 'A couple experiencing snowfall in Mussoorie for the first time.', link: '/mussoorie', linkText: 'Mussoorie' },
                { emoji: '🏔️', text: 'Friends trekking to Tungnath and Chopta.', link: null, linkText: null },
                { emoji: '✈️', text: 'Parents arriving safely at the airport after a long journey.', link: '/dehradun-airport-taxi', linkText: 'Airport Transfer' },
                { emoji: '🏢', text: 'A group of colleagues exploring Uttarakhand on their annual retreat.', link: null, linkText: null },
                { emoji: '⭐', text: 'Every traveller who trusted us with a journey that mattered to them.', link: null, linkText: null },
              ].map(({ emoji, text, link }) => (
                <div key={text} className="bg-[#1A1A1A] rounded-[1.5rem] p-7 border border-white/10 shadow-sm hover:border-[#F7941D]/20 hover:shadow-md transition-all">
                  <span className="text-3xl mb-4 block">{emoji}</span>
                  <p className="text-white/70 font-light leading-relaxed text-sm">
                    {link ? (
                      <>
                        {text.split(' ').slice(0, -3).join(' ')}{' '}
                        <Link href={link} className="text-[#F7941D] hover:underline font-medium">
                          {text.split(' ').slice(-3).join(' ')}
                        </Link>
                      </>
                    ) : text}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-bold text-white text-lg mt-10 max-w-2xl">
              These moments remind us that every booking represents a real story, a real experience, and memories that last long after the journey ends.
            </p>
          </div>
        </section>

        {/* ── 8. COMPARISON TABLE ──────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Transparent Comparison</p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-4">
                Us vs. The Big Apps
              </h2>
              <div className="w-20 h-1.5 bg-[#F7941D] mx-auto" />
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse bg-[#1A1A1A] whitespace-nowrap md:whitespace-normal">
                  <thead>
                    <tr className="bg-[#1A1A1A] text-white uppercase tracking-[0.15em] text-[10px] font-black">
                      <th className="p-6 md:p-8 border-r border-white/5 w-1/3">The Standard</th>
                      <th className="p-6 md:p-8 border-r border-white/5 w-1/3 bg-[#F7941D] text-white">Uttarakhand Cab 24/7</th>
                      <th className="p-6 md:p-8 w-1/3 text-white/50">Corporate Apps</th>
                    </tr>
                  </thead>
                  <tbody className="text-white text-sm md:text-base">
                    {[
                      { feature: 'Driver Expertise', us: 'Verified Local Hill Drivers', them: 'Randomly assigned drivers' },
                      { feature: 'Pricing', us: '100% Fixed & Transparent', them: 'Surge pricing & hidden taxes' },
                      { feature: 'Customer Support', us: 'Direct WhatsApp to Dispatch', them: 'Automated chatbots' },
                      { feature: 'Vehicle Quality', us: 'Pre-Inspected & Deep Cleaned', them: 'No guarantee of condition' },
                      { feature: 'Char Dham Expertise', us: 'Specialised Yatra Drivers', them: 'Not available' },
                      { feature: 'Night Travel', us: '24×7 Including Emergencies', them: 'Limited & unpredictable' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-[#1A1A1A]/30 transition-colors group">
                        <td className="p-6 md:p-8 font-black uppercase tracking-tighter border-r border-gray-50 bg-[#1A1A1A]/50">{row.feature}</td>
                        <td className="p-6 md:p-8 border-r border-gray-50 bg-[#F7941D]/5 font-bold text-white">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#F7941D] shrink-0 transition-transform group-hover:scale-110" />
                            {row.us}
                          </div>
                        </td>
                        <td className="p-6 md:p-8 text-white/70 font-light">
                          <div className="flex items-center gap-3">
                            <XCircle className="w-5 h-5 text-gray-300 shrink-0" />
                            {row.them}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. TRUST BANNER ──────────────────────────────────── */}
        <section className="px-4 py-12 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <TrustBanner />
          </div>
        </section>

        {/* ── 10. THANK YOU + FINAL CTA ────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F7941D] opacity-[0.06] blur-[120px] pointer-events-none" />
          <div className="max-w-page mx-auto relative z-10">
            <div className="max-w-2xl mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Thank You</p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-6 leading-none">
                Thank You for<br />Stopping By
              </h2>
              <p className="text-white/60 text-lg font-light leading-relaxed mb-4">
                Whether you&apos;ve already travelled with us or you&apos;re discovering us for the first time, thank you for considering Uttarakhand Cab 24/7.
              </p>
              <p className="text-white font-bold text-lg">
                We look forward to being part of your next journey through Devbhoomi Uttarakhand.
              </p>
            </div>

            {/* Inline CTA */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Ready to Explore?</p>
              <h3 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-4 leading-none">
                Ready to Explore Uttarakhand?
              </h3>
              <p className="text-white/60 font-light mb-8 max-w-xl leading-relaxed">
                Whether you need an airport transfer, a{' '}
                <Link href="/char-dham" className="text-[#F7941D] hover:underline">Char Dham Yatra taxi</Link>,
                a family tour vehicle, or an outstation cab — we&apos;re here 24 hours a day, 7 days a week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919258912169"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all">
                  <Phone className="w-4 h-4" /> +91 92589 12169
                </a>
                <a href="tel:+919675212169"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all">
                  <Phone className="w-4 h-4" /> +91 96752 12169
                </a>
                <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </div>
              <p className="text-white/30 text-xs font-light mt-6">Available 24 hours · 7 days a week · All Uttarakhand destinations</p>
            </div>
          </div>
        </section>

        {/* ── 11. STRATEGIC CTA ────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 pb-32 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <StrategicCTA
              heading="Ready to Travel Safely?"
              subtext="Experience the difference of travelling with a dedicated local team. Get an instant quote for your trip today."
            />
          </div>
        </section>

      </main>
    </>
  );
}
