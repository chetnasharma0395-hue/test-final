'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calculator, Car, MessageCircle, ShieldCheck } from 'lucide-react';
import { fareRates } from '@/data/fare-rates';

const LOCATIONS = Object.keys(fareRates);

export function FareCalculator() {
  const [from, setFrom] = useState(LOCATIONS[0]);
  
  // Get available destinations based on the selected 'From' location
  const availableDestinations = Object.keys(fareRates[from] || {});
  const [to, setTo] = useState(availableDestinations[0] ?? '');
  
  const [vehicle, setVehicle] = useState<'sedan' | 'suv'>('sedan');

  // Handle changing the 'From' location (reset 'To' to the first available option)
  const handleFromChange = (newFrom: string) => {
    setFrom(newFrom);
    setTo(Object.keys(fareRates[newFrom] || {})[0] ?? '');
  };

  // Calculate the current price based on selections
  const currentPrice = useMemo(() => {
    if (!fareRates[from] || !fareRates[from][to]) return null;
    return fareRates[from][to][vehicle];
  }, [from, to, vehicle]);

  // Build WhatsApp booking link
  const handleBookNow = () => {
    const text = encodeURIComponent(`Hi, I used the Fare Calculator on your website. I want to book a taxi.\n\nRoute: ${from} to ${to}\nVehicle: ${vehicle.toUpperCase()}\nEstimated Fare: ₹${currentPrice}\n\nPlease confirm availability.`);
    window.open(`https://wa.me/919258912169?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#1A1A1A] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden text-left max-w-4xl mx-auto flex flex-col">
      
      {/* HEADER: Gemini Slate & Orange Glow */}
      <div className="bg-[#1A1A1A] p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden shrink-0">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-15 blur-3xl pointer-events-none" />
        
        <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
          <Calculator className="w-8 h-8 text-[#F7941D]" />
        </div>
        
        <div className="relative z-10">
          <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2">No Hidden Fees</p>
          <h2 className="font-heading font-black text-3xl text-white uppercase tracking-tighter leading-none mb-3">
            Instant Fare Check
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xl font-light">
            Select your pickup and drop-off locations to get an instant, fixed-price estimate for your trip.
          </p>
        </div>
      </div>

      {/* CONTROLS: Modern Inputs & Pill Toggles */}
      <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-[#1A1A1A] flex-1">
        
        {/* Route Selection */}
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F7941D]" />
              <select 
                value={from}
                onChange={(e) => handleFromChange(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-[#1A1A1A] border border-transparent focus:border-[#F7941D] focus:bg-[#1A1A1A] focus:ring-4 focus:ring-[#F7941D]/10 outline-none text-white font-bold text-sm rounded-xl transition-all appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">
              Drop-off Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
              <select 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-[#1A1A1A] border border-transparent focus:border-[#F7941D] focus:bg-[#1A1A1A] focus:ring-4 focus:ring-[#F7941D]/10 outline-none text-white font-bold text-sm rounded-xl transition-all appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                {availableDestinations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle & Price Display */}
        <div className="space-y-6 flex flex-col justify-between">
          <div>
            <label className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">
              Vehicle Type
            </label>
            <div className="flex bg-[#1A1A1A] p-1.5 rounded-xl">
              <button
                onClick={() => setVehicle('sedan')}
                className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 ${vehicle === 'sedan' ? 'bg-[#1A1A1A] shadow-md border border-white/10' : 'text-white/70 hover:bg-white/5'}`}
              >
                <span className={`text-xs font-black uppercase tracking-widest ${vehicle === 'sedan' ? 'text-white' : 'text-white/70'}`}>Sedan</span>
                <span className={`text-[10px] font-bold mt-1 ${vehicle === 'sedan' ? 'text-[#F7941D]' : 'opacity-60'}`}>Dzire (4 Pax)</span>
              </button>
              <button
                onClick={() => setVehicle('suv')}
                className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 ${vehicle === 'suv' ? 'bg-[#1A1A1A] shadow-md border border-white/10' : 'text-white/70 hover:bg-white/5'}`}
              >
                <span className={`text-xs font-black uppercase tracking-widest ${vehicle === 'suv' ? 'text-white' : 'text-white/70'}`}>Premium SUV</span>
                <span className={`text-[10px] font-bold mt-1 ${vehicle === 'suv' ? 'text-[#F7941D]' : 'opacity-60'}`}>Ertiga (7 Pax)</span>
              </button>
            </div>
          </div>

          {/* Animated Result Box */}
          <div className="bg-[#1A1A1A] rounded-[1.5rem] p-6 shadow-xl border border-[#333537] relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#F7941D] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
            <p className="text-[10px] font-black text-[#F7941D] uppercase tracking-widest mb-2 relative z-10">Estimated Fare</p>
            
            {currentPrice ? (
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={currentPrice}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="font-heading font-black text-4xl text-white tracking-tighter"
                  >
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </motion.span>
                </AnimatePresence>
                
                <button 
                  onClick={handleBookNow}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all hover:shadow-[0_10px_20px_rgba(37,211,102,0.25)] hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0"
                >
                  <MessageCircle className="w-4 h-4" /> Book Now
                </button>
              </div>
            ) : (
              <span className="text-sm text-red-400 font-bold relative z-10">Route not available. Please call.</span>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER: Minimalist Trust Markers */}
      <div className="bg-[#1A1A1A] px-8 py-5 border-t border-white/10 flex flex-wrap items-center justify-center md:justify-start gap-6 text-[10px] font-black text-white/70 uppercase tracking-widest shrink-0">
        <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#F7941D]" /> Tolls & Tax Included</span>
        <span className="hidden sm:inline text-gray-300">&bull;</span>
        <span className="flex items-center gap-2"><Car className="w-4 h-4 text-[#F7941D]" /> AC Guaranteed</span>
      </div>
    </div>
  );
}
