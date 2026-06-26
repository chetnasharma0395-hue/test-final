import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck, HeartHandshake, CheckCircle2, Car,
  Compass, XCircle, Phone, MessageCircle, Star, MapPin,
} from 'lucide-react';
import { StrategicCTA, TrustBanner } from '@/components/CTABoxes';
import { TiltCard } from '@/components/TiltCard';

export const metadata: Metadata = {
  title: 'About Uttarakhand Cab 24/7 | Trusted Taxi Service In Uttarakhand',
  description:
    'Learn about Uttarakhand Cab 24/7, a trusted Dehradun-based taxi service providing airport transfers, Char Dham Yatra taxis, hill station tours, and outstation cab services across Uttarakhand.',
  alternates: { canonical: 'https://uttarakhand.cab/about' },
  openGraph: {
    title: 'About Uttarakhand Cab 24/7 | Trusted Taxi Service In Uttarakhand',
    description: 'Trusted taxi service in Uttarakhand offering airport transfers, Char Dham Yatra taxis and outstation cab services.',
    url: 'https://uttarakhand.cab/about',
    siteName: 'Uttarakhand Cab 24/7',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630, alt: 'Uttarakhand Cab 24/7' }],
  },
};

/* ─── CSS-only device mockup sub-components ─────────────────────── */
function LaptopMockup() {
  return (
    <div className="relative select-none" style={{ filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.7))' }}>
      {/* Screen */}
      <div
        className="relative rounded-t-xl overflow-hidden border-2 border-white/15"
        style={{ width: 340, height: 220, background: '#111' }}
      >
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-3 h-7 border-b border-white/8" style={{ background: '#0a0a0a' }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <div className="flex-1 ml-2 h-3.5 rounded-full bg-white/8 flex items-center px-2">
            <span className="text-[7px] text-white/40 font-mono">uttarakhand.cab</span>
          </div>
        </div>
        {/* Page preview */}
        <div className="relative w-full" style={{ height: 193 }}>
          <Image
            src="/assets/images/hero-mountain-road.jpg"
            alt="Uttarakhand Cab website preview"
            fill className="object-cover object-top"
          />
          {/* UI overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80" />
          <div className="absolute top-4 left-4">
            <div className="text-[8px] font-black text-white uppercase tracking-widest opacity-90">
              Uttarakhand Cab <span style={{ color: '#F7941D' }}>24/7</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div
              className="rounded-lg px-2.5 py-1.5 text-[6px] font-black text-white uppercase tracking-widest"
              style={{ background: '#F7941D' }}
            >
              Book Now — Fixed Fares
            </div>
          </div>
        </div>
      </div>
      {/* Hinge */}
      <div className="h-1.5 rounded-none" style={{ width: 340, background: 'rgba(255,255,255,0.12)' }} />
      {/* Base */}
      <div
        className="rounded-b-xl flex items-center justify-center"
        style={{ width: 340, height: 12, background: 'rgba(255,255,255,0.08)' }}
      />
      <div
        className="mx-auto rounded-b-xl"
        style={{ width: 180, height: 6, background: 'rgba(255,255,255,0.06)' }}
      />
    </div>
  );
}

function PhoneMockup() {
  return (
    <div
      className="relative select-none"
      style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.7))' }}
    >
      <div
        className="relative rounded-[28px] overflow-hidden border-2 border-white/15"
        style={{ width: 120, height: 240, background: '#111' }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-10"
          style={{ width: 40, height: 12, background: '#0a0a0a' }}
        />
        {/* Screen content */}
        <Image
          src="/assets/images/dest-mussoorie.jpg"
          alt="Mobile preview"
          fill className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]/80" />
        <div className="absolute bottom-4 inset-x-2">
          <div
            className="rounded-xl p-2 text-center"
            style={{ background: 'rgba(247,148,29,0.15)', border: '1px solid rgba(247,148,29,0.3)' }}
          >
            <p className="text-[5px] font-black uppercase tracking-widest text-white">WhatsApp Book</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://uttarakhand.cab/about/#webpage',
        url: 'https://uttarakhand.cab/about',
        name: 'About Uttarakhand Cab 24/7',
        description: 'Uttarakhand Cab 24/7 is a trusted Dehradun-based taxi service providing airport transfers, Char Dham Yatra taxis, hill station tours, and outstation cab services.',
        inLanguage: 'en-IN',
        mainEntity: { '@id': 'https://uttarakhand.cab/#organization' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-[#0a0a0a] selection:bg-[#F7941D]/30">

        {/* ══ 1. HERO — device mockup (Asia Tube style) ══════════════ */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: '#0a0a0a' }}>
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
            style={{ background: 'rgba(247,148,29,0.07)', filter: 'blur(120px)' }} />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: 'rgba(247,148,29,0.04)', filter: 'blur(80px)' }} />

          <div className="relative max-w-page mx-auto">
            {/* Breadcrumb */}
            <nav className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 text-white/60 text-xs font-bold uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">About Us</span>
            </nav>

            {/* Device mockup cluster */}
            <div className="relative flex items-end justify-center gap-6 mb-12 md:mb-16">
              {/* Decorative ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="rounded-full"
                  style={{
                    width: 500, height: 500,
                    border: '1px solid rgba(247,148,29,0.06)',
                    background: 'radial-gradient(circle, rgba(247,148,29,0.03) 0%, transparent 70%)',
                  }}
                />
              </div>
              {/* Phone — left, slightly lower */}
              <div className="relative hidden sm:block" style={{ transform: 'translateY(20px) rotate(-3deg)' }}>
                <PhoneMockup />
              </div>
              {/* Laptop — center hero */}
              <div style={{ transform: 'rotate(0deg)' }}>
                <LaptopMockup />
              </div>
              {/* Phone — right, slightly higher */}
              <div className="relative hidden sm:block" style={{ transform: 'translateY(10px) rotate(4deg)' }}>
                <PhoneMockup />
              </div>
            </div>

            {/* Big orange heading — Asia Tube style */}
            <div className="text-center">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.35em] mb-3">
                Dehradun, Uttarakhand
              </p>
              <h1 className="font-heading font-black text-5xl md:text-7xl leading-none tracking-tighter" style={{ color: '#F7941D' }}>
                About<br />
                <span className="text-white">Uttarakhand Cab 24/7</span>
              </h1>
              <p className="mt-6 text-white/55 text-lg font-light max-w-xl mx-auto leading-relaxed">
                Trusted mountain travel since 2011 — serving over 20,000 travellers across Uttarakhand.
              </p>
            </div>
          </div>
        </section>

        {/* ══ 2. ABOUT — alternating image + text (Asia Tube style) ═══ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0f0f0f' }}>
          <div className="max-w-page mx-auto space-y-24">

            {/* Row 1 — image LEFT, text RIGHT */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Image */}
              <div className="w-full lg:w-[42%] shrink-0">
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3]"
                  style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Image
                    src="/assets/images/dest-kedarnath.jpg"
                    alt="Kedarnath mountain route — Uttarakhand Cab 24/7"
                    fill className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Floating badge */}
                  <div className="absolute bottom-5 left-5">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest"
                      style={{ background: 'rgba(247,148,29,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(247,148,29,0.3)' }}>
                      <MapPin className="w-3 h-3 text-[#F7941D]" />
                      Kedarnath, Uttarakhand
                    </div>
                  </div>
                </div>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Who We Are</p>
                <h2 className="text-white font-black text-4xl md:text-5xl tracking-tighter leading-none mb-6">
                  Born in the<br />
                  <span className="text-[#F7941D]">Mountains</span>
                </h2>
                <div className="space-y-4 text-white/65 font-light leading-relaxed">
                  <p>
                    Uttarakhand Cab 24/7 is a professional taxi and tour operator based in Dehradun, Uttarakhand. We specialize in{' '}
                    <Link href="/char-dham" className="text-[#F7941D] hover:underline font-medium">Char Dham Yatra circuits</Link>,{' '}
                    <Link href="/services/jolly-grant-airport-taxi-service" className="text-[#F7941D] hover:underline font-medium">airport transfers</Link>,
                    and mountain cab services across the Garhwal and Kumaon Himalayas.
                  </p>
                  <p>
                    With verified local drivers and fixed transparent pricing, every journey with us is backed by genuine mountain expertise — not a call center.
                  </p>
                </div>
                {/* Stats inline */}
                <div className="mt-8 flex gap-8">
                  {[['10+', 'Years'], ['20K+', 'Rides'], ['4.9★', 'Rating']].map(([val, label]) => (
                    <div key={label}>
                      <p className="text-2xl font-black text-[#F7941D]">{val}</p>
                      <p className="text-white/45 text-xs uppercase tracking-widest">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2 — text LEFT, image RIGHT */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              {/* Image */}
              <div className="w-full lg:w-[42%] shrink-0">
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3]"
                  style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Image
                    src="/assets/images/hero-mountain-road.jpg"
                    alt="Mountain roads of Uttarakhand"
                    fill className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest"
                      style={{ background: 'rgba(247,148,29,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(247,148,29,0.3)' }}>
                      <ShieldCheck className="w-3 h-3 text-[#F7941D]" />
                      Mountain Certified Drivers
                    </div>
                  </div>
                </div>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Why We Exist</p>
                <h2 className="text-white font-black text-4xl md:text-5xl tracking-tighter leading-none mb-6">
                  Simple goal.<br />
                  <span className="text-[#F7941D]">Real service.</span>
                </h2>
                <div className="space-y-4 text-white/65 font-light leading-relaxed">
                  <p>
                    Travellers in Uttarakhand often face changing prices, unreliable vehicles, and drivers unfamiliar with Himalayan roads.
                  </p>
                  <p>
                    We created Uttarakhand Cab 24/7 with one goal — to provide dependable transportation backed by local knowledge, honest communication, and genuine hospitality.
                  </p>
                </div>
                {/* 3 pills */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {['No hidden charges', 'Fixed fares guaranteed', '24/7 availability'].map((item) => (
                    <div key={item} className="flex items-center gap-2 px-4 py-2 rounded-full text-white/80 text-xs font-bold"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F7941D] shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 3. NUMBERS ════════════════════════════════════════════ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-page mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: '10+', label: 'Years Experience' },
              { stat: '24×7', label: 'Availability' },
              { stat: '10,000+', label: 'Travellers Served' },
              { stat: '4.9★', label: 'Google Rating' },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center md:text-left">
                <p className="text-4xl md:text-5xl font-black tracking-tighter" style={{ color: '#F7941D' }}>{stat}</p>
                <p className="text-white/50 font-light mt-1 text-sm uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 4. VALUES ═════════════════════════════════════════════ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#0f0f0f' }}>
          <div className="max-w-page mx-auto">
            <div className="mb-16 text-center">
              <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.3em] mb-3">What We Believe</p>
              <h2 className="text-white text-4xl md:text-5xl font-black tracking-tighter leading-none">
                The Himalayan Difference
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Car, title: 'Travel Should Feel Easy', text: "Planning a trip shouldn't be stressful. We make every journey smooth from the first call to the final drop." },
                { icon: HeartHandshake, title: 'People Matter', text: 'Behind every booking is a family, a pilgrim, or a dream journey. We never forget that.' },
                { icon: Compass, title: 'Local Knowledge Wins', text: 'Technology helps, but local experience and mountain route knowledge still make the biggest difference.' },
              ].map((v) => (
                <TiltCard key={v.title} className="p-8 rounded-[2rem]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  intensityX={8} intensityY={10}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(247,148,29,0.1)', border: '1px solid rgba(247,148,29,0.2)' }}>
                    <v.icon className="w-7 h-7" style={{ color: '#F7941D' }} />
                  </div>
                  <h3 className="text-white font-black text-xl tracking-tighter mb-3">{v.title}</h3>
                  <p className="text-white/55 font-light leading-relaxed text-sm">{v.text}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 6. COMPARISON TABLE ══════════════════════════════════ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#0f0f0f' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: '#F7941D' }}>Transparent Comparison</p>
              <h2 className="text-white font-black text-4xl md:text-5xl tracking-tighter">
                Us vs. The Big Apps
              </h2>
              <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: '#F7941D' }} />
            </div>
            <div className="overflow-hidden rounded-[2rem]" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr style={{ background: '#0a0a0a' }} className="text-white uppercase tracking-[0.15em] text-[10px] font-black">
                      <th className="p-6 md:p-8 w-1/3" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>The Standard</th>
                      <th className="p-6 md:p-8 w-1/3 text-white" style={{ background: '#F7941D', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Uttarakhand Cab 24/7</th>
                      <th className="p-6 md:p-8 w-1/3 text-white/40">Other Apps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Driver Expertise', us: 'Verified Local Hill Drivers', them: 'Randomly assigned drivers' },
                      { feature: 'Pricing', us: '100% Fixed & Transparent', them: 'Surge pricing & hidden taxes' },
                      { feature: 'Support', us: 'Direct WhatsApp to Dispatch', them: 'Automated chatbots' },
                      { feature: 'Vehicle Quality', us: 'Pre-Inspected & Deep Cleaned', them: 'No guarantee of condition' },
                      { feature: 'Char Dham Expertise', us: 'Specialised Yatra Drivers', them: 'Not available' },
                      { feature: 'Night Travel', us: '24×7 Including Emergencies', them: 'Limited & unpredictable' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? '#0a0a0a' : '#0d0d0d' }} className="group hover:bg-[#111] transition-colors">
                        <td className="p-6 md:p-8 text-white/80 font-black text-xs uppercase tracking-tighter" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>{row.feature}</td>
                        <td className="p-6 md:p-8 font-bold text-white" style={{ background: 'rgba(247,148,29,0.05)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#F7941D' }} />
                            {row.us}
                          </div>
                        </td>
                        <td className="p-6 md:p-8 text-white/45 font-light">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-white/20 shrink-0" />
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

        {/* ══ 7. TRUST + FINAL CTA ══════════════════════════════════ */}
        <section className="px-4 py-12" style={{ background: '#0a0a0a' }}>
          <div className="max-w-page mx-auto"><TrustBanner /></div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
            style={{ background: 'rgba(247,148,29,0.06)', filter: 'blur(120px)' }} />
          <div className="max-w-page mx-auto relative z-10">
            <div className="rounded-[2.5rem] p-10 md:p-14 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#F7941D' }}>Ready to Explore?</p>
              <h2 className="text-white font-black text-4xl md:text-5xl tracking-tighter mb-4 leading-none">
                Your Next Journey<br />Starts Here
              </h2>
              <p className="text-white/50 font-light mb-10 max-w-lg mx-auto leading-relaxed">
                Airport transfers, Char Dham Yatra, hill stations — we're here 24/7, every day of the year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+919258912169"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                  style={{ background: '#F7941D' }}>
                  <Phone className="w-4 h-4" /> +91 92589 12169
                </a>
                <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                  style={{ background: '#25D366' }}>
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-32" style={{ background: '#0a0a0a' }}>
          <div className="max-w-page mx-auto">
            <StrategicCTA heading="Ready to Travel Safely?" subtext="Experience the difference of travelling with a dedicated local team. Get an instant quote for your trip today." />
          </div>
        </section>

      </main>
    </>
  );
}
