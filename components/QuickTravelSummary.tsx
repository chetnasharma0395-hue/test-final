import { MapPin, Clock, Banknote, Calendar, Car, Phone, ShieldCheck } from 'lucide-react';

interface QuickTravelSummaryProps {
  destination: string;
  from?: string;
  distance: string;
  travelTime: string;
  taxiFareRange: string;
  bestTime: string;
  idealMode: string;
}

export function QuickTravelSummary({
  destination,
  from = 'Dehradun',
  distance,
  travelTime,
  taxiFareRange,
  bestTime,
  idealMode,
}: QuickTravelSummaryProps) {
  return (
    <div className="bg-[#1A1A1A] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-8 md:p-10 my-12 relative overflow-hidden group">
      {/* Subtle Background Orange Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7941D]/5 rounded-full blur-3xl -z-10 group-hover:bg-[#F7941D]/10 transition-colors duration-700" />

      {/* Header */}
      <div className="mb-8">
        <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
          <MapPin className="w-3 h-3" /> Route Summary
        </p>
        <h3 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tighter leading-none">
          {from} <span className="text-gray-300 mx-1 md:mx-2 font-light">to</span> {destination}
        </h3>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: MapPin, label: 'Distance', value: distance },
          { icon: Clock, label: 'Travel Time', value: travelTime },
          { icon: Banknote, label: 'Taxi Fare', value: taxiFareRange, highlight: true },
          { icon: Calendar, label: 'Best Time', value: bestTime },
          { icon: Car, label: 'Ideal Mode', value: idealMode, colSpan: 'col-span-2 md:col-span-1' },
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className={`bg-[#1A1A1A] p-5 rounded-2xl flex flex-col justify-center border border-transparent hover:border-[#F7941D]/30 transition-colors ${stat.colSpan || ''}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${stat.highlight ? 'bg-[#F7941D]/20' : 'bg-[#1A1A1A] shadow-sm'}`}>
                <stat.icon className={`w-4 h-4 ${stat.highlight ? 'text-[#F7941D]' : 'text-white'}`} />
              </div>
              <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className={`font-black text-lg leading-tight ${stat.highlight ? 'text-[#F7941D]' : 'text-white'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Trust & CTA Pill */}
      <div className="bg-[#1A1A1A] p-6 md:p-8 rounded-[2rem] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl border border-[#333537]">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex items-center gap-2 text-[#F7941D] mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-widest">Why Book With Us?</span>
          </div>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
            10k+ Happy Customers &bull; Local Drivers &bull; No Hidden Fees
          </p>
        </div>
        <a 
          href="tel:+919258912169" 
          className="w-full lg:w-auto px-8 py-4 bg-[#F7941D] text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 hover:bg-[#D97E10] transition-all hover:shadow-[0_0_20px_-5px_#F7941D]"
        >
          Call to Book <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
