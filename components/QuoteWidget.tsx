'use client';

import { useState } from 'react';
import { MessageCircle, Car } from 'lucide-react';

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

const selectStyles: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: 'white',
  width: '100%',
  borderRadius: '0.75rem',
  padding: '13px 16px',
  fontSize: 14,
  fontWeight: 600,
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: 'right 0.5rem center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '1.5em 1.5em',
  cursor: 'pointer',
  transition: 'all 0.2s',
  outline: 'none',
};

const labelStyles: React.CSSProperties = {
  display: 'block',
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: 7,
};

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

  const wrapper = compact
    ? {}
    : {
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative' as const,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
      };

  return (
    <div style={wrapper}>
      {/* Top accent line */}
      {!compact && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 32,
            right: 32,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #F7941D, transparent)',
            borderRadius: 999,
          }}
        />
      )}

      {/* HEADER */}
      {!compact && (
        <div
          className="px-8 py-7 flex flex-col md:flex-row md:items-center justify-between text-left relative overflow-hidden"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div
            className="absolute -right-8 -top-8 pointer-events-none"
            style={{
              width: 160,
              height: 160,
              background: 'radial-gradient(circle, rgba(247,148,29,0.15) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          <div className="relative z-10">
            <p
              className="text-[9px] font-black uppercase tracking-[0.2em] mb-1.5"
              style={{ color: '#F7941D' }}
            >
              Instant Fixed Fare
            </p>
            <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter leading-none">
              Request a Quote
            </h2>
          </div>
          <div className="text-left md:text-right mt-4 md:mt-0 relative z-10">
            <p
              className="text-[9px] font-bold uppercase tracking-widest mb-1"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Direct Booking
            </p>
            <a
              href="tel:+919258912169"
              className="font-black text-sm transition-colors flex items-center md:justify-end gap-2 truncate"
              style={{ color: 'white' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#F7941D')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'white')}
            >
              +91 92589 12169
            </a>
          </div>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className={compact ? '' : 'p-6 text-left'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          {/* From */}
          <div>
            <label htmlFor="quote-from" style={labelStyles}>Pickup Point</label>
            <select
              id="quote-from"
              name="from"
              value={form.from}
              onChange={handleChange}
              required
              style={selectStyles}
              onFocus={(e) => {
                (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(247,148,29,0.45)';
                (e.currentTarget as HTMLSelectElement).style.background = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLSelectElement).style.boxShadow = '0 0 0 3px rgba(247,148,29,0.08)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(255,255,255,0.09)';
                (e.currentTarget as HTMLSelectElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLSelectElement).style.boxShadow = 'none';
              }}
            >
              <option value="">Select location</option>
              {FROM_OPTIONS.map((o) => (<option key={o} value={o} style={{ background: '#111' }}>{o}</option>))}
            </select>
          </div>

          {/* To */}
          <div>
            <label htmlFor="quote-to" style={labelStyles}>Destination</label>
            <select
              id="quote-to"
              name="to"
              value={form.to}
              onChange={handleChange}
              required
              style={selectStyles}
              onFocus={(e) => {
                (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(247,148,29,0.45)';
                (e.currentTarget as HTMLSelectElement).style.background = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLSelectElement).style.boxShadow = '0 0 0 3px rgba(247,148,29,0.08)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(255,255,255,0.09)';
                (e.currentTarget as HTMLSelectElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLSelectElement).style.boxShadow = 'none';
              }}
            >
              <option value="">Select destination</option>
              {TO_OPTIONS.map((o) => (<option key={o} value={o} style={{ background: '#111' }}>{o}</option>))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="quote-date" style={labelStyles}>Travel Date</label>
            <input
              id="quote-date"
              type="date"
              name="date"
              value={form.date}
              min={today}
              onChange={handleChange}
              required
              style={selectStyles}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(247,148,29,0.45)';
                (e.currentTarget as HTMLInputElement).style.background = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(247,148,29,0.08)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.09)';
                (e.currentTarget as HTMLInputElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Passengers */}
          <div>
            <label htmlFor="quote-passengers" style={labelStyles}>Passengers</label>
            <select
              id="quote-passengers"
              name="passengers"
              value={form.passengers}
              onChange={handleChange}
              required
              style={selectStyles}
              onFocus={(e) => {
                (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(247,148,29,0.45)';
                (e.currentTarget as HTMLSelectElement).style.background = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLSelectElement).style.boxShadow = '0 0 0 3px rgba(247,148,29,0.08)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(255,255,255,0.09)';
                (e.currentTarget as HTMLSelectElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLSelectElement).style.boxShadow = 'none';
              }}
            >
              <option value="">Select size</option>
              {PAX_OPTIONS.map((o) => (<option key={o} value={o} style={{ background: '#111' }}>{o}</option>))}
            </select>
          </div>

          {/* Vehicle toggle — pill style */}
          <div className="sm:col-span-2 mt-1">
            <span style={labelStyles}>Vehicle Type</span>
            <div
              className="flex flex-wrap sm:flex-nowrap gap-2 p-1.5 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              role="group"
            >
              {VEHICLE_OPTIONS.map((v) => {
                const isActive = form.vehicle === v.value;
                return (
                  <button
                    key={v.value}
                    type="button"
                    onClick={() => {
                      setForm((p) => ({ ...p, vehicle: v.value }));
                      if (submitted) setSubmitted(false);
                    }}
                    className="flex-1 min-w-[30%] py-2.5 px-2 text-center rounded-lg transition-all duration-200"
                    style={{
                      background: isActive ? 'rgba(247,148,29,0.14)' : 'transparent',
                      border: isActive ? '1px solid rgba(247,148,29,0.35)' : '1px solid transparent',
                    }}
                  >
                    <p
                      className="text-[10px] sm:text-xs font-black uppercase tracking-widest whitespace-nowrap"
                      style={{ color: isActive ? '#F7941D' : 'rgba(255,255,255,0.6)' }}
                    >
                      {v.label}
                    </p>
                    <p
                      className="text-[8px] sm:text-[9px] font-bold mt-1 uppercase tracking-widest"
                      style={{ color: isActive ? 'rgba(247,148,29,0.7)' : 'rgba(255,255,255,0.35)' }}
                    >
                      {v.sub}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 mt-1">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300"
              style={
                isValid
                  ? {
                      background: 'linear-gradient(135deg, #25D366, #128C7E)',
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(37,211,102,0.2)',
                      cursor: 'pointer',
                    }
                  : {
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.25)',
                      cursor: 'not-allowed',
                    }
              }
              onMouseEnter={(e) => {
                if (isValid) {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(37,211,102,0.3)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (isValid) {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(37,211,102,0.2)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }
              }}
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>{submitted ? 'Opening WhatsApp…' : 'Get WhatsApp Quote'}</span>
            </button>
          </div>
        </div>

        {/* Trust markers */}
        <div
          className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest pt-5"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          <span className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" style={{ color: '#F7941D' }} /> Clean AC Vehicles
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>•</span>
          <span>Fixed Transparent Fares</span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>•</span>
          <span style={{ color: '#F7941D' }}>Reply in 15 mins</span>
        </div>
      </form>
    </div>
  );
}
