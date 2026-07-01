import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Phone, AlertCircle, Clock, CreditCard, FileWarning, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description: 'Clear cancellation and credit note policy for all taxi bookings. Transparent and fair terms. Call +91 92589 12169.',
  alternates: { canonical: 'https://uttarakhand.cab/cancellation-policy' },
  openGraph: {
    title: 'Cancellation Policy | Uttarakhand Cab 24/7',
    description: 'Clear cancellation and credit note policy for all taxi bookings. Transparent and fair terms. Call +91 92589 12169.',
    url: 'https://uttarakhand.cab/cancellation-policy',
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

const policies = [
  {
    timing: '24+ hours before pickup',
    charge: 'Full Credit Note',
    description: 'Eligible for a credit note of your advance amount. This credit note is valid for 2 months and is fully usable for any future bookings with us.',
    color: 'green',
  },
  {
    timing: '12–24 hours before pickup',
    charge: 'Partial Credit',
    description: 'A partial credit note may be issued. Deductions will be applied based on the specific booking type, vehicle reserved, and the route.',
    color: 'amber',
  },
  {
    timing: 'Within 12 hours of pickup',
    charge: 'No Credit',
    description: 'No refund or credit note will be issued. At this stage, the driver and vehicle have already been locked in and allocated for your specific trip.',
    color: 'red',
  },
  {
    timing: 'No-show / Not reachable',
    charge: 'Full Charge',
    description: 'The full booking amount will be considered consumed. No refund or credit note is applicable under any circumstances for no-shows.',
    color: 'red',
  },
];

export default function CancellationPolicy() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      
      {/* 1. HERO SECTION: Clean & Authoritative */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[#121212] border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F7941D] opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-left">
          {/* Glass Navigation Pill */}
          <nav className="inline-flex items-center gap-2 bg-[#1A1A1A] backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 shadow-sm text-white/70 text-xs font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#F7941D]">Cancellation Policy</span>
          </nav>

          <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Legal Information</p>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
            Cancellation Policy
          </h1>
          <p className="text-white/70 text-lg max-w-2xl font-light leading-relaxed">
            Our cancellation policy is designed to be completely transparent and fair to both our customers and our hardworking mountain drivers.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Important Notice */}
          <div className="bg-[#2D1515] border border-[#FCA5A5] p-6 md:p-8 rounded-[2rem] shadow-sm flex flex-col sm:flex-row items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="font-black text-red-400 uppercase tracking-widest text-sm mb-2">Strict No-Refund Policy</h3>
              <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
                No cash refunds will be provided under any circumstances. Cancellations are only eligible to receive Credit Notes as outlined in the specific timelines below.
              </p>
            </div>
          </div>

          {/* Charges Timeline (Bento Layout) */}
          <div className="bg-[#1A1A1A] p-8 md:p-10 border border-white/10 shadow-sm rounded-[2.5rem] hover:shadow-xl transition-shadow duration-300">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-8 flex items-center justify-start gap-3 border-b border-white/10 pb-6">
              <Clock className="w-6 h-6 text-[#F7941D] shrink-0" />
              Cancellation Timeline
            </h2>

            <div className="space-y-4">
              {policies.map((p) => (
                <div key={p.timing} className={`p-6 rounded-[1.5rem] border transition-colors duration-300 group ${
                  p.color === 'green'
                    ? 'border-green-500/20 bg-green-500/5 hover:border-green-500/40 hover:bg-green-500/10'
                    : p.color === 'amber'
                    ? 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40 hover:bg-amber-500/10'
                    : 'border-red-500/20 bg-red-500/5 hover:border-red-500/40 hover:bg-red-500/10'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-white text-lg mb-2 uppercase tracking-tight">{p.timing}</p>
                      <p className="text-white/70 text-sm font-light leading-relaxed max-w-xl">{p.description}</p>
                    </div>
                    <span className={`font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest shrink-0 shadow-sm ${
                      p.color === 'green'
                        ? 'bg-green-500/15 text-green-400'
                        : p.color === 'amber'
                        ? 'bg-amber-500/15 text-amber-400'
                        : 'bg-red-500/15 text-red-400'
                    }`}>
                      {p.charge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Note Terms */}
          <div className="bg-[#1A1A1A] p-8 md:p-10 border border-white/10 shadow-sm rounded-[2.5rem] hover:shadow-xl hover:border-[#F7941D]/20 transition-all duration-300">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-6 flex items-center justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-[#F7941D]" />
              </div>
              Credit Note Terms
            </h2>
            <ul className="space-y-4 text-white/70 font-light list-none ml-0">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#F7941D] shrink-0 mt-0.5" />
                <span>Credit notes are valid for strictly <strong className="text-white font-bold">2 months</strong> from the date of issue.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#F7941D] shrink-0 mt-0.5" />
                <span>They can be applied toward the balance of any future booking with Uttarakhand Cab 24/7.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#F7941D] shrink-0 mt-0.5" />
                <span>Credit notes are non-transferable to other parties and cannot be converted or exchanged for cash.</span>
              </li>
            </ul>
          </div>

          {/* Additional Terms */}
          <div className="bg-[#1A1A1A] p-8 md:p-10 border border-white/10 shadow-sm rounded-[2.5rem] hover:shadow-xl hover:border-[#F7941D]/20 transition-all duration-300">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-6 flex items-center justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center shrink-0">
                <FileWarning className="w-5 h-5 text-[#F7941D]" />
              </div>
              Important Conditions
            </h2>
            <ul className="space-y-4 text-white/70 font-light list-none ml-0">
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <span>The company reserves the right to substitute the allocated driver or vehicle if required due to mechanical issues or emergencies prior to pickup.</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <span>Trip delays or cancellations forced by extreme mountain weather, landslides, traffic gridlocks, or government/police restrictions are entirely beyond our control and are not our responsibility.</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <span>Failure to pay the required token advance will result in automatic cancellation of your unconfirmed booking without notice.</span>
              </li>
            </ul>
          </div>

          {/* Contact / CTA (Deep Space Box) */}
          <div className="bg-[#1A1A1A] text-white p-8 md:p-12 rounded-[3rem] shadow-2xl mt-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#F7941D] rounded-full opacity-10 blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-tighter mb-4 text-left">
                How to Cancel <br className="hidden sm:block"/> or Reschedule
              </h2>
              <p className="text-white/70 font-light leading-relaxed mb-8 text-left max-w-xl">
                To process a cancellation or request a date change, you must contact our booking desk immediately with your travel details. We process all requests promptly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919258912169" className="px-8 py-4 bg-[#1A1A1A] text-white font-black rounded-xl hover:bg-[#F7941D] hover:text-white transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                  <Phone className="w-4 h-4 shrink-0" /> Call: +91 92589 12169
                </a>
                <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-black rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                  <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
