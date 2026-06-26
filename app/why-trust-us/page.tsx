import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck, Clock, MapPin, Phone, MessageCircle,
  CheckCircle2, Star, Users, Car, Navigation,
  Banknote, UserCheck, HeartHandshake, ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Travellers Trust Us | Verified Trust — Uttarakhand Cab 24/7',
  description: 'See exactly why thousands of families, pilgrims, and solo travellers trust Uttarakhand Cab 24/7 for safe, verified mountain travel across Uttarakhand.',
  alternates: { canonical: 'https://uttarakhand.cab/why-trust-us' },
  openGraph: {
    title: 'Why Travellers Trust Us | Uttarakhand Cab 24/7',
    description: 'Verified drivers, fixed pricing, local expertise. See why families choose us for Char Dham Yatra, airport transfers and mountain travel.',
    url: 'https://uttarakhand.cab/why-trust-us',
    type: 'website',
  },
};

/* ── WhatsApp chat mockup ─────────────────────────────────────── */
function WhatsAppMockup() {
  const msgs = [
    { from: 'us', text: 'Namaste! Your booking is confirmed. Dehradun → Kedarnath on 14 June.', time: '8:02 PM' },
    { from: 'us', text: '🚗 Driver: Ramesh Kumar\n📞 +91 98765 43210\n🚙 Innova Crysta — UK 07 AB 1234', time: '8:02 PM' },
    { from: 'us', text: 'He will pick you up at 4:30 AM from your hotel. Please save his number.', time: '8:03 PM' },
    { from: 'them', text: 'Thank you! Can we trust the driver for mountain roads?', time: '8:05 PM' },
    { from: 'us', text: "100% — Ramesh has been driving Kedarnath route for 8 years. You're in safe hands 🙏", time: '8:05 PM' },
  ];

  return (
    <div className="relative mx-auto max-w-sm select-none" style={{ filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.7))' }}>
      {/* Phone frame */}
      <div className="rounded-[2.5rem] overflow-hidden border-2 border-white/10" style={{ background: '#111' }}>
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 py-3 text-[10px] text-white/50" style={{ background: '#0a0a0a' }}>
          <span>9:41</span><span>●●● WiFi 🔋</span>
        </div>
        {/* WA header */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#075E54' }}>
          <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white font-black text-sm">UC</div>
          <div>
            <p className="text-white font-bold text-sm">Uttarakhand Cab 24/7</p>
            <p className="text-white/70 text-[10px]">✓ Verified Business · online</p>
          </div>
        </div>
        {/* Chat */}
        <div className="px-3 py-4 space-y-2" style={{ background: '#0f1011', minHeight: 280 }}>
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'us' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="rounded-2xl px-3 py-2 max-w-[78%] text-[11px] leading-relaxed"
                style={{
                  background: m.from === 'us' ? '#075E54' : '#1e1e1e',
                  color: 'rgba(255,255,255,0.9)',
                  borderRadius: m.from === 'us' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                  whiteSpace: 'pre-line',
                }}
              >
                {m.text}
                <span className="block text-right text-[8px] mt-0.5 opacity-50">{m.time} ✓✓</span>
              </div>
            </div>
          ))}
        </div>
        {/* Input bar */}
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex-1 rounded-full px-4 py-2 text-[10px] text-white/30" style={{ background: '#1e1e1e' }}>Type a message</div>
          <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function WhyTrustUsPage() {
  return (
    <main className="bg-[#0a0a0a] selection:bg-[#F7941D]/30">

      {/* ══ 1. HERO — Empathy Hook ════════════════════════════════ */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'rgba(247,148,29,0.07)', filter: 'blur(120px)' }} />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[10px] font-black uppercase tracking-widest text-white/60"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ShieldCheck className="w-3 h-3 text-[#F7941D]" /> Verified Trust · Since 2011
          </div>

          <h1 className="font-black text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter leading-none mb-6">
            Every journey begins<br />with one question:
          </h1>
          <p className="text-3xl md:text-5xl font-black tracking-tighter italic mb-8" style={{ color: '#F7941D' }}>
            "Can I trust this cab service?"
          </p>
          <p className="text-white/55 text-lg font-light max-w-xl mx-auto leading-relaxed mb-12">
            Booking a taxi in a new place shouldn't feel like a gamble. See exactly why thousands of families, pilgrims, and solo travellers choose Uttarakhand Cab 24/7.
          </p>

          {/* Trust numbers */}
          <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
            {[
              { n: '20,000+', l: 'Rides Completed' },
              { n: '4.9 ★', l: 'Google Rating' },
              { n: 'Since 2011', l: 'In Business' },
              { n: '24 × 7', l: 'Available' },
            ].map(({ n, l }) => (
              <div key={l} className="px-6 py-4 text-center" style={{ background: '#0f0f0f' }}>
                <p className="font-black text-xl text-white">{n}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. EMPATHY — "Be honest…" ════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0d0d0d' }}>
        <div className="max-w-page mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center mb-3" style={{ color: '#F7941D' }}>Be Honest…</p>
          <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter text-center leading-none mb-14">
            You've had this exact moment.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: '🤔', title: 'Reading reviews at midnight', text: '"Are these 5-star reviews even real? Anyone could write these on mountain roads."' },
              { emoji: '😰', title: 'When it actually matters', text: '"My parents are travelling alone to Kedarnath. I need someone I trust to tell me this is safe."' },
              { emoji: '💸', title: 'Fare anxiety', text: '"What if they change the price midway? Or add charges at the end for mountain tolls?"' },
              { emoji: '💭', title: 'The wish we all have', text: '"If only I knew ONE person who had used this cab service on Uttarakhand roads before…"' },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="text-3xl block mb-4">{c.emoji}</span>
                <p className="text-white font-black text-sm mb-2">{c.title}</p>
                <p className="text-white/50 text-sm font-light leading-relaxed italic">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-white/60 font-light text-lg">
            What if you never had to feel that way again?
          </p>
        </div>
      </section>

      {/* ══ 3. PROOF BAR ═════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-page mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/40">Before you book — here is what you get</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: UserCheck,    label: 'Real Driver Details', sub: 'Shared before pickup' },
              { icon: MessageCircle,label: 'Verified WhatsApp', sub: 'Direct communication' },
              { icon: Banknote,     label: 'Transparent Pricing', sub: 'No hidden charges' },
              { icon: MapPin,       label: 'Local Experts', sub: 'Uttarakhand born & bred' },
              { icon: Car,          label: 'Clean Vehicles', sub: 'Pre-inspected fleet' },
              { icon: Clock,        label: '24 × 7 Support', sub: 'Real humans, not bots' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center p-4 rounded-2xl gap-3"
                style={{ background: 'rgba(247,148,29,0.05)', border: '1px solid rgba(247,148,29,0.12)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(247,148,29,0.12)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#F7941D' }} />
                </div>
                <div>
                  <p className="text-white font-black text-xs leading-tight">{label}</p>
                  <p className="text-white/40 text-[9px] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SCENARIOS — "When it really matters" ══════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#0d0d0d' }}>
        <div className="max-w-page mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center mb-3" style={{ color: '#F7941D' }}>When It Really Matters</p>
          <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter text-center leading-none mb-4">
            Because some trips are too<br />important for guesswork.
          </h2>
          <p className="text-white/45 text-center font-light mb-14 max-w-lg mx-auto">
            There are moments in life when "probably fine" isn't good enough. Recognise your situation below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: '👨‍👩‍👧', label: 'Family', title: 'Parents travelling alone', text: "Your parents' first trip to Kedarnath. You can't be there. Our driver keeps you updated throughout — live." },
              { emoji: '✈️', label: 'Airport', title: 'Midnight airport arrivals', text: 'Landed at Jolly Grant at midnight. Driver was already waiting at arrivals — flight tracked automatically.' },
              { emoji: '🙏', label: 'Pilgrimage', title: 'Char Dham Yatra', text: 'A lifelong pilgrimage. You need a driver who knows every temple route, altitude change, and rest stop.' },
              { emoji: '👩', label: 'Solo Women', title: 'Solo women travellers', text: 'Verified driver details shared before pickup. Direct WhatsApp line. Professional conduct — always.' },
              { emoji: '🏥', label: 'Emergency', title: 'Urgent last-minute travel', text: 'Emergency at 4 AM. No time for reviews. We pick up in 15 minutes — because we are genuinely local.' },
              { emoji: '👴', label: 'Senior Citizens', title: 'Elderly passengers', text: 'Patient, courteous drivers. Comfortable vehicles. Stop whenever needed. We go at your pace.' },
            ].map((s) => (
              <div key={s.title} className="group rounded-2xl p-7 transition-all duration-300 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(247,148,29,0.3)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                <span className="text-3xl block mb-3">{s.emoji}</span>
                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full mb-3 inline-block"
                  style={{ background: 'rgba(247,148,29,0.1)', color: '#F7941D' }}>{s.label}</span>
                <h3 className="text-white font-black text-base mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. CUSTOMER STORIES ══════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'rgba(247,148,29,0.04)', filter: 'blur(100px)' }} />
        <div className="relative max-w-page mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: '#F7941D' }}>Real Customers. Real Journeys.</p>
          <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter leading-none mb-4">
            Not star ratings.<br />Actual stories.
          </h2>
          <p className="text-white/45 font-light mb-14 max-w-lg leading-relaxed">
            Every review here represents a real traveller, a real destination, and a journey completed with care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                story: '"Our parents were travelling to Kedarnath alone for the first time. The driver kept us updated throughout the journey with photos and messages. We felt at peace the whole time."',
                name: 'Rahul M.',
                route: 'Dehradun → Kedarnath',
                type: 'Family Yatra',
                stars: 5,
              },
              {
                story: '"Landed at Jolly Grant Airport at midnight. Was nervous about finding a cab that late. Driver was already waiting at the arrival gate before I even exited. Took all my stress away."',
                name: 'Sneha T.',
                route: 'Jolly Grant Airport → Mussoorie',
                type: 'Late Night Arrival',
                stars: 5,
              },
              {
                story: '"Roads were completely blocked near Joshimath due to landslide. Our driver knew an alternate mountain route immediately — no panic, no extra charge. Saved us almost 3 hours."',
                name: 'Amit R.',
                route: 'Rishikesh → Badrinath',
                type: 'Mountain Journey',
                stars: 5,
              },
            ].map((r) => (
              <div key={r.name} className="flex flex-col justify-between rounded-2xl p-7"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {/* Stars */}
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F7941D] text-[#F7941D]" />
                    ))}
                  </div>
                  <p className="text-white/80 font-light leading-relaxed text-sm italic mb-6">{r.story}</p>
                </div>
                {/* Meta */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <p className="text-white font-black text-sm">{r.name}</p>
                    <p className="text-white/40 text-[10px]">{r.route}</p>
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(247,148,29,0.1)', color: '#F7941D' }}>{r.type}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Google CTA */}
          <div className="mt-8 text-center">
            <a
              href="https://g.page/r/uttarakhandcab/review"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors"
            >
              <Star className="w-4 h-4 text-[#F7941D]" />
              View all 4.9★ reviews on Google
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ══ 6. BOOKING JOURNEY TIMELINE ══════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#0d0d0d' }}>
        <div className="max-w-page mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center mb-3" style={{ color: '#F7941D' }}>The Transparent Journey</p>
          <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter text-center leading-none mb-4">
            Exactly what happens<br />after you book.
          </h2>
          <p className="text-white/45 text-center font-light mb-16 max-w-md mx-auto">
            Fear of the unknown is the biggest reason people don't book. So here is everything, step by step.
          </p>

          {/* Timeline steps */}
          <div className="relative">
            {/* Connecting line — desktop */}
            <div className="absolute top-8 left-0 right-0 h-px hidden lg:block"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(247,148,29,0.3) 15%, rgba(247,148,29,0.3) 85%, transparent)' }} />

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4">
              {[
                { n: '01', icon: MessageCircle, title: 'Request Quote', text: 'WhatsApp or call us. Get a fixed transparent fare — no surge, no surprises.' },
                { n: '02', icon: CheckCircle2,  title: 'Confirm Booking', text: 'Share your travel details. Booking is confirmed in minutes.' },
                { n: '03', icon: UserCheck,     title: 'Driver Details', text: "Receive driver's name, photo, and vehicle number via WhatsApp." },
                { n: '04', icon: Navigation,    title: 'Live Pickup', text: 'Driver arrives on time. Tracks your flight or train if needed.' },
                { n: '05', icon: ShieldCheck,   title: 'Safe Journey', text: 'Expert local navigation. You sit back and enjoy Uttarakhand.' },
                { n: '06', icon: Star,          title: 'Share Experience', text: 'Tell us how it went. Your story helps the next traveller.' },
              ].map((step) => (
                <div key={step.n} className="flex flex-col items-center text-center gap-3 relative">
                  {/* Step circle */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(247,148,29,0.12)', border: '1px solid rgba(247,148,29,0.3)' }}>
                    <step.icon className="w-7 h-7" style={{ color: '#F7941D' }} />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: '#F7941D' }}>{step.n}</span>
                  <h3 className="text-white font-black text-sm">{step.title}</h3>
                  <p className="text-white/45 text-xs font-light leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. TRUST QUESTIONS ═══════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'rgba(247,148,29,0.04)', filter: 'blur(100px)' }} />
        <div className="relative max-w-page mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center mb-3" style={{ color: '#F7941D' }}>Verified Trust</p>
          <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter text-center leading-none mb-14">
            Every question. Answered.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                q: 'Can I trust the company?',
                icon: ShieldCheck,
                a: 'Uttarakhand Cab 24/7 has operated since 2011 with a verified Google Business profile, WhatsApp Business account, and a real Dehradun address. We are not an aggregator — we own our fleet.',
              },
              {
                q: 'Can I trust the driver?',
                icon: UserCheck,
                a: "Every driver is verified, experienced on Himalayan roads, and carries a valid commercial license. You receive their name, photo, and phone number before the journey — no surprises.",
              },
              {
                q: 'Can I trust the pricing?',
                icon: Banknote,
                a: 'Our fares are fixed and shared upfront. No surge pricing. No mountain-driving surcharges added later. What you see is exactly what you pay — always.',
              },
              {
                q: 'Can I trust the vehicle?',
                icon: Car,
                a: 'Our fleet is regularly inspected and deep-cleaned. We operate Innova Crysta, Ertiga, sedans, and Tempo Travellers — well-maintained and appropriate for Uttarakhand terrain.',
              },
              {
                q: 'Can I trust them with my family?',
                icon: HeartHandshake,
                a: 'Thousands of families have trusted us with their parents, children, and loved ones on Char Dham routes. We understand what safe family travel means in the mountains.',
              },
              {
                q: 'Can I trust them for late-night travel?',
                icon: Clock,
                a: 'We operate 24 hours a day, 7 days a week — including midnight airport arrivals and early morning Yatra departures. Real humans answer our phones, not automated systems.',
              },
            ].map(({ q, icon: Icon, a }) => (
              <div key={q} className="rounded-2xl p-7"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(247,148,29,0.1)', border: '1px solid rgba(247,148,29,0.2)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#F7941D' }} />
                </div>
                <h3 className="text-white font-black text-base mb-3">{q}</h3>
                <p className="text-white/55 text-sm font-light leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. WHATSAPP PROOF ════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#0d0d0d' }}>
        <div className="max-w-page mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Text */}
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: '#F7941D' }}>Verified Business</p>
              <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter leading-none mb-6">
                This is what trust<br />actually looks like.
              </h2>
              <p className="text-white/55 font-light leading-relaxed mb-8">
                Before every journey, we send your driver's complete details — name, photo, vehicle number, and a direct phone line. You know exactly who is picking you up, before they arrive.
              </p>
              <div className="space-y-3">
                {[
                  'Driver name + photo sent via WhatsApp',
                  'Vehicle registration number confirmed',
                  'Direct mobile number — call anytime',
                  'Verified WhatsApp Business account',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#F7941D' }} />
                    <p className="text-white/75 text-sm font-light">{item}</p>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/919258912169?text=Hi, I want to verify your WhatsApp Business and book a cab."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-black text-white text-xs uppercase tracking-widest transition-all"
                style={{ background: '#25D366' }}
              >
                <MessageCircle className="w-4 h-4" /> Open WhatsApp
              </a>
            </div>
            {/* Mockup */}
            <div className="w-full lg:w-auto lg:shrink-0">
              <WhatsAppMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. FINAL CTA ═════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'rgba(247,148,29,0.07)', filter: 'blur(130px)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#F7941D' }}>Ready When You Are</p>
          <h2 className="text-white font-black text-4xl md:text-6xl tracking-tighter leading-none mb-6">
            Plan your journey<br />with confidence.
          </h2>
          <p className="text-white/50 font-light text-lg mb-12 leading-relaxed">
            Verified drivers. Fixed fares. Local expertise. Available 24×7 across Uttarakhand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919258912169?text=Hi, I want to book a cab in Uttarakhand."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-white text-sm uppercase tracking-widest"
              style={{ background: '#25D366' }}>
              <MessageCircle className="w-4 h-4" /> Book via WhatsApp
            </a>
            <a href="tel:+919258912169"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-white text-sm uppercase tracking-widest"
              style={{ background: '#F7941D' }}>
              <Phone className="w-4 h-4" /> +91 92589 12169
            </a>
            <Link href="/taxi-rates"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-white text-sm uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              View All Fares <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="mt-8 text-white/25 text-xs">
            Uttarakhand Cab 24/7 · Dehradun · uttarakhand.cab
          </p>
        </div>
      </section>

    </main>
  );
}
