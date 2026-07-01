import { Phone, MessageCircle, Car, MapPin, Clock, Banknote, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';
import { AuroraGlow } from './motion';

// ----------------------------------------------------------------------
// 1. STANDARD BOOKING CTA (Modern Dark Slate Card)
// ----------------------------------------------------------------------
interface BookingCTAProps {
  destination?: string;
  fare?: string;
}

export function BookingCTA({ destination = 'your trip', fare }: BookingCTAProps) {
  return (
    <div className="bg-[#1A1A1A] text-white p-8 lg:p-10 my-10 rounded-[2.5rem] relative overflow-hidden group shadow-xl border border-[#F7941D]/15">
      {/* Ambient aurora glow */}
      <AuroraGlow className="opacity-40" />
      {/* Orange Glow Effect */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#F7941D] opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity" />
      
      <div className="relative z-10">
        <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
          <Shield className="w-3 h-3" /> Secure Booking
        </p>
        <h3 className="font-heading font-black text-3xl md:text-4xl uppercase mb-4 tracking-tighter leading-none">
          Book Your <br className="hidden md:block" /> {destination} Taxi
        </h3>
        <p className="text-white/60 mb-6 font-light">Fixed pricing, no hidden charges. Local drivers guaranteed.</p>
        
        {fare && (
          <div className="mb-8">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Starting Fare</p>
            <p className="text-4xl font-black text-[#F7941D]">{fare}</p>
          </div>
        )}
        
        <a href="tel:+919258912169" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#F7941D] text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#D97E10] hover:shadow-[0_0_25px_-5px_#F7941D] transition-all transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
          <Phone className="w-4 h-4" /> Call: +91 92589 12169
        </a>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. DRIVER INTELLIGENCE (High-Contrast Charcoal)
// ----------------------------------------------------------------------
export function DriverIntelligenceBox({ tips }: { tips: string[] }) {
  return (
    <div className="bg-[#2A2A2A] text-white p-8 md:p-10 my-12 rounded-[2rem] border-l-[10px] border-[#F7941D] shadow-2xl relative overflow-hidden">
      <Car className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 rotate-[-15deg]" />
      
      <div className="font-black text-[#F7941D] uppercase tracking-widest mb-6 flex items-center gap-3 text-sm">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
           <AlertTriangle className="w-5 h-5" />
        </div>
        Driver&apos;s Insider Tips
      </div>
      
      <ul className="space-y-4 relative z-10">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-4 text-white/80 font-light leading-relaxed">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F7941D]/20 text-[#F7941D] font-black text-xs shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. ROUTE INFO BOX (Bento Card Style)
// ----------------------------------------------------------------------
interface RouteInfoProps {
  from: string;
  to: string;
  distance: string;
  time: string;
  fare: string;
}

export function RouteInfoBox({ from, to, distance, time, fare }: RouteInfoProps) {
  return (
    <div className="bg-[#1A1A1A] border border-white/8 rounded-[2.5rem] p-8 md:p-10 my-10 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-[#F7941D]/20 group">
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="w-6 h-6 text-[#F7941D]" />
        <h4 className="font-heading font-black text-2xl uppercase text-white tracking-tighter leading-none">
          {from} to {to}
        </h4>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: MapPin, label: 'Distance', value: distance },
          { icon: Clock, label: 'Est. Time', value: time },
          { icon: Banknote, label: 'Taxi Fare', value: fare, highlight: true }
        ].map((stat, i) => (
          <div key={i} className="bg-[#1A1A1A] p-5 rounded-2xl shadow-sm text-center border border-white/10 flex flex-col items-center justify-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${stat.highlight ? 'bg-[#F7941D]/10' : 'bg-[#1A1A1A]'}`}>
              <stat.icon className={`w-5 h-5 ${stat.highlight ? 'text-[#F7941D]' : 'text-white'}`} />
            </div>
            <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`font-black text-lg ${stat.highlight ? 'text-[#F7941D]' : 'text-white'}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      
      <a href={`https://wa.me/919258912169?text=${encodeURIComponent(`Hi, I want to book a taxi from ${from} to ${to}.`)}`} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-[#2A2A2A] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 hover:bg-[#1A1A1A] transition-colors">
        Book This Route <Car className="w-4 h-4" />
      </a>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. TRANSPORT COMPARISON (Modern SaaS Pricing Table)
// ----------------------------------------------------------------------
interface TransportCompareProps {
  route: string;
  busFare: string;
  busTime: string;
  taxiFare: string;
  taxiTime: string;
}

export function TransportComparison({ route, busFare, busTime, taxiFare, taxiTime }: TransportCompareProps) {
  return (
    <div className="my-12">
      <h4 className="font-heading font-black text-2xl uppercase mb-6 text-white tracking-tighter">
        {route}: How to Travel
      </h4>
      <div className="overflow-hidden rounded-[2rem] border border-white/8 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left bg-[#1A1A1A]">
            <thead>
              <tr className="bg-[#1A1A1A] text-white uppercase tracking-[0.15em] text-[10px] font-black">
                <th className="p-6">Transport Option</th>
                <th className="p-6 text-center">Est. Fare</th>
                <th className="p-6 text-center">Time</th>
                <th className="p-6 text-center hidden sm:table-cell">Best For</th>
              </tr>
            </thead>
            <tbody>
              {/* Bus Option (De-emphasized) */}
              <tr className="border-b border-white/10 text-white/70">
                <td className="p-6 font-bold flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-300" /> Shared Bus
                </td>
                <td className="p-6 text-center font-medium">{busFare}</td>
                <td className="p-6 text-center font-medium">{busTime}</td>
                <td className="p-6 text-center hidden sm:table-cell text-xs">Solo Budget</td>
              </tr>
              {/* Taxi Option (Highlighted) */}
              <tr className="bg-[#F7941D]/5 relative">
                {/* Active Indicator Line */}
                <td className="absolute left-0 top-0 bottom-0 w-1 bg-[#F7941D]" />
                <td className="p-6 font-black text-white flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#F7941D]" /> Private Taxi
                </td>
                <td className="p-6 text-center font-black text-[#F7941D] text-lg">{taxiFare}</td>
                <td className="p-6 text-center font-bold text-white">{taxiTime}</td>
                <td className="p-6 text-center hidden sm:table-cell text-xs font-bold text-white">Families & Comfort</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 5. STRATEGIC CTA (Massive Deep-Space Aesthetic)
// ----------------------------------------------------------------------
interface StrategicCTAProps {
  heading?: string;
  subtext?: string;
}

export function StrategicCTA({ heading = 'Ready to Book Your Taxi?', subtext = 'Fixed pricing, no hidden charges. Available 24/7.' }: StrategicCTAProps) {
  return (
    <div className="bg-[#121212] rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden group shadow-[0_30px_60px_-15px_rgba(11,28,63,0.5)] my-12">
      {/* Ambient aurora glow */}
      <AuroraGlow />
      {/* Abstract Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#F7941D] rounded-full opacity-5 blur-[100px] group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"></div>
      
      <div className="relative z-10">
        <h3 className="font-heading font-black text-4xl md:text-6xl text-white uppercase tracking-tighter leading-[0.9] mb-6">
          {heading}
        </h3>
        <p className="text-white/60 md:text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+919258912169" className="px-8 py-4 bg-[#1A1A1A] text-white font-black rounded-xl hover:bg-[#F7941D] hover:text-white transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a
            href="https://wa.me/919258912169"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] text-white font-black rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 6. TRUST BANNER (Glassmorphism Pill)
// ----------------------------------------------------------------------
export function TrustBanner() {
  return (
    <div className="w-full bg-[#1A1A1A] text-white py-5 px-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#F7941D]/15 my-8">
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/70">
        <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#F7941D]" /> 10k+ Happy Customers</span>
        <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-[#F7941D]" /> Verified Local Drivers</span>
        <span className="flex items-center gap-2 hidden lg:flex"><Banknote className="w-3.5 h-3.5 text-[#F7941D]" /> Zero Hidden Fees</span>
      </div>
      <a href="tel:+919258912169" className="flex items-center gap-2 text-[#F7941D] font-black hover:text-white transition-colors text-sm tracking-wider bg-white/5 px-4 py-2 rounded-lg">
        <Phone className="w-3 h-3" /> +91 92589 12169
      </a>
    </div>
  );
}
