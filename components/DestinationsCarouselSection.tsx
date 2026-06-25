'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { CardCarousel } from './CardCarousel';

export interface DestinationItem {
  name: string;
  tagline: string;
  image: string;
  distance: string;
  time: string;
  fare: string;
  link: string;
  category: string;
}

export function DestinationsCarouselSection({ destinations }: { destinations: DestinationItem[] }) {
  return (
    <CardCarousel
      items={destinations}
      getKey={(dest) => dest.name}
      cardWidth={340}
      cardGap={20}
      ariaLabel="Destinations carousel — use arrow keys to navigate"
      renderCard={(dest, isActive) => (
        <Link
          href={dest.link}
          onClick={(e) => { if (!isActive) e.preventDefault(); }}
          className="group flex flex-col h-full bg-[#1A1A1A] rounded-[2rem] border border-white/10 overflow-hidden relative"
          style={{
            boxShadow: isActive ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(247,148,29,0.10)' : 'none',
            borderColor: isActive ? 'rgba(247,148,29,0.25)' : 'rgba(255,255,255,0.08)',
            minHeight: 500,
          }}
        >
          {/* Image Section */}
          <div className="relative overflow-hidden h-56 shrink-0 m-2 rounded-[1.5rem]">
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              sizes="340px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute top-3 right-3">
              <span className="bg-[#121212]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                {dest.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-1">
            <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2">{dest.tagline}</p>
            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-4 transition-colors group-hover:text-[#F7941D]">{dest.name}</h3>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-white/70 text-sm font-medium">
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#F7941D]" />
                </div>
                <span>{dest.distance}</span>
              </div>
              {dest.time !== '-' && (
                <div className="flex items-center gap-3 text-white/70 text-sm font-medium">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#F7941D]" />
                  </div>
                  <span>{dest.time}</span>
                </div>
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-white font-black text-lg">{dest.fare}</span>
              <span className="text-[10px] font-black text-white uppercase tracking-widest transition-colors flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full group-hover:text-[#F7941D]">
                View <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      )}
    />
  );
}
