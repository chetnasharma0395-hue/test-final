'use client';

import { useState } from 'react';
import { MessageCircle, ArrowRight, Car } from 'lucide-react';

const FROM_OPTIONS = [
  'Dehradun',
  'Delhi / NCR',
  'Haridwar',
  'Rishikesh',
  'Jolly Grant Airport',
  'Mussoorie',
  'Nainital',
  'Other',
];

const TO_OPTIONS = [
  'Mussoorie',
  'Rishikesh',
  'Nainital',
  'Kedarnath (Gaurikund)',
  'Char Dham Circuit',
  'Haridwar',
  'Dehradun',
  'Jolly Grant Airport',
  'Badrinath',
  'Yamunotri',
  'Gangotri',
  'Auli',
  'Other',
];

const VEHICLE_OPTIONS = [
  { value: 'Sedan (Dzire / Etios)', label: 'Sedan', sub: 'Up to 4 pax' },
  { value: 'SUV (Ertiga / Innova)', label: 'SUV', sub: 'Up to 7 pax' },
  { value: 'Tempo Traveller', label: 'Tempo', sub: '12+ pax' }, 
];

const PAX_OPTIONS = ['1-2 passengers', '3-4 passengers', '5-6 passengers', '7-12 passengers'];

interface QuoteWidgetProps {
  compact?: boolean;
}

export function QuoteWidget({ compact = false }: QuoteWidgetProps) {
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '',
    vehicle: 'Sedan (Dzire / Etios)',
  });
  const [submitted, setSubmitted] = useState(false);

  const isValid = form.from && form.to && form.date && form.passengers;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (submitted) setSubmitted(false);
  }

  function buildWhatsAppMessage() {
    return encodeURIComponent(
      `Hi, I need a taxi quote:\n\nFrom: ${form.from}\nTo: ${form.to}\nDate: ${form.date}\nPassengers: ${form.passengers}\nVehicle: ${form.vehicle}\n\nPlease share availability and fixed fare.`
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    window.open(`https://wa.me/919258912169?text=${buildWhatsAppMessage()}`, '_blank');
  }

  return (
    <div className={compact ? 'w-full' : 'bg-[#1A1A1A] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/8 overflow-hidden w-full max-w-full'}>
      
      {/* HEADER: Gemini Slate & Orange Contrast */}
      {!compact && (
        <div className="bg-[#1A1A1A] px-8 py-8 flex flex-col md:flex-row md:items-center justify-between text-left relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F7941D] opacity-10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Instant Fixed Fare</p>
            <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter leading-none">
              Request a Quote
            </h2>
          </div>
          
          <div className="text-left md:text-right mt-4 md:mt-0 relative z-10">
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Direct Booking</p>
            <a href="tel:+919258912169" className="text-white font-black text-sm hover:text-[#F7941D] transition-colors flex items-center md:justify-end gap-2 truncate">
              +91 92589 12169
            </a>
          </div>
        </div>
      )}

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className={compact ? '' : 'p-6 text-left bg-[#1A1A1A]'}>
        {/* FIXED: Changed to a strict 2-column grid max, removing lg:grid-cols-3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          
          {/* From */}
          <div>
            <label htmlFor="quote-from" className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">Pickup Point</label>
            <select
              id="quote-from"
              name="from"
              value={form.from}
              onChange={handleChange}
              required
              className="w-full bg-[#1A1A1A] border border-white/8 focus:border-[#F7941D] focus:bg-[#1A1A1A] focus:ring-2 focus:ring-[#F7941D]/20 outline-none px-5 py-4 rounded-xl text-sm text-white font-bold transition-all duration-200 cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="">Select location</option>
              {FROM_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          </div>

          {/* To */}
          <div>
            <label htmlFor="quote-to" className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">Destination</label>
            <select
              id="quote-to"
              name="to"
              value={form.to}
              onChange={handleChange}
              required
              className="w-full bg-[#1A1A1A] border border-white/8 focus:border-[#F7941D] focus:bg-[#1A1A1A] focus:ring-2 focus:ring-[#F7941D]/20 outline-none px-5 py-4 rounded-xl text-sm text-white font-bold transition-all duration-200 cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="">Select destination</option>
              {TO_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="quote-date" className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">Travel Date</label>
            <input
              id="quote-date"
              type="date"
              name="date"
              value={form.date}
              min={today}
              onChange={handleChange}
              required
              className="w-full bg-[#1A1A1A] border border-white/8 focus:border-[#F7941D] focus:bg-[#1A1A1A] focus:ring-2 focus:ring-[#F7941D]/20 outline-none px-5 py-4 rounded-xl text-sm text-white font-bold transition-all duration-200"
            />
          </div>

          {/* Passengers */}
          <div>
            <label htmlFor="quote-passengers" className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">Passengers</label>
            <select
              id="quote-passengers"
              name="passengers"
              value={form.passengers}
              onChange={handleChange}
              required
              className="w-full bg-[#1A1A1A] border border-white/8 focus:border-[#F7941D] focus:bg-[#1A1A1A] focus:ring-2 focus:ring-[#F7941D]/20 outline-none px-5 py-4 rounded-xl text-sm text-white font-bold transition-all duration-200 cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="">Select size</option>
              {PAX_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          </div>

          {/* Vehicle (SaaS Pill Toggle) - FIXED: Spans full 2 columns so it never squishes */}
          <div className="sm:col-span-2 mt-2">
            <span className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">Vehicle Type</span>
            <div className="flex flex-wrap sm:flex-nowrap bg-[#1A1A1A] p-1.5 rounded-xl gap-1" role="group">
              {VEHICLE_OPTIONS.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => {
                    setForm((p) => ({ ...p, vehicle: v.value }));
                    if (submitted) setSubmitted(false);
                  }}
                  className={`flex-1 min-w-[30%] py-2.5 px-2 text-center rounded-lg transition-all duration-300 ${
                    form.vehicle === v.value
                      ? 'bg-[#1A1A1A] shadow-md text-[#F7941D] border border-white/10'
                      : 'text-white/70 hover:bg-gray-200/50 hover:text-white border border-transparent'
                  }`}
                >
                  <p className={`text-[10px] sm:text-xs font-black uppercase tracking-widest whitespace-nowrap ${form.vehicle === v.value ? 'text-white' : ''}`}>
                    {v.label}
                  </p>
                  <p className={`text-[8px] sm:text-[9px] font-bold mt-1 uppercase tracking-widest ${form.vehicle === v.value ? 'text-[#F7941D]' : 'opacity-60'}`}>
                    {v.sub}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button - FIXED: Spans full 2 columns */}
          <div className="sm:col-span-2 flex items-end mt-2">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 ${
                isValid 
                  ? 'bg-[#25D366] text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#128C7E] hover:shadow-[0_10px_25px_rgba(37,211,102,0.2)] hover:-translate-y-1' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>{submitted ? 'Opening WhatsApp...' : 'Get WhatsApp Quote'}</span>
            </button>
          </div>
        </div>

        {/* Footer Trust Markers */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[9px] sm:text-[10px] font-black text-white/70 uppercase tracking-widest border-t border-white/8 pt-6">
          <span className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5 text-[#F7941D]" /> Clean AC Vehicles</span>
          <span className="hidden sm:inline text-gray-300">&bull;</span>
          <span>Fixed Transparent Fares</span>
          <span className="hidden sm:inline text-gray-300">&bull;</span>
          <span className="text-[#F7941D]">Reply in 15 mins</span>
        </div>
      </form>
    </div>
  );
}
