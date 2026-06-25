'use client';

import { Star } from 'lucide-react';

const items = [
  { label: '4.9 / 5 on Google', accent: true },
  { label: '50,000+ Happy Customers' },
  { label: 'Verified Local Drivers' },
  { label: '12+ Years of Mountain Experience', accent: true },
  { label: '24 / 7 Availability' },
  { label: 'Fixed Transparent Fares' },
  { label: 'Char Dham Specialists Since 2012' },
  { label: 'Airport Transfers Available', accent: true },
  { label: 'Premium AC Vehicles' },
  { label: 'No Hidden Charges' },
  { label: 'WhatsApp Reply in 15 Minutes', accent: true },
  { label: 'Uttarakhand\'s Most Trusted Cab Service' },
];

const doubled = [...items, ...items];

export function MarqueeTicker() {
  return (
    <div className="relative overflow-hidden bg-[#F7941D] py-3.5 border-y border-[#E8860F]">
      {/* Gradient masks */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F7941D] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F7941D] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-0 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6 text-white"
          >
            {item.accent ? (
              <Star className="w-3 h-3 fill-white text-white shrink-0" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
            )}
            <span
              className={`text-[11px] font-black uppercase tracking-[0.18em] ${
                item.accent ? 'text-white' : 'text-white/80'
              }`}
            >
              {item.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
