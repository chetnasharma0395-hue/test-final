'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CardCarousel } from './CardCarousel';

export interface TourPackageItem {
  name: string;
  image: string;
  tagline: string;
  link: string;
}

export function HomeTourPackagesCarousel({ packages }: { packages: TourPackageItem[] }) {
  return (
    <CardCarousel
      items={packages}
      getKey={(pkg) => pkg.name}
      cardWidth={360}
      cardGap={20}
      loop
      autoPlayMs={6000}
      ariaLabel="Tour packages carousel — use arrow keys to navigate"
      renderCard={(pkg, isActive) => (
        <Link
          href={pkg.link}
          onClick={(e) => { if (!isActive) e.preventDefault(); }}
          className="group relative rounded-[2.5rem] overflow-hidden bg-[#1A1A1A] h-[480px] block"
          style={{
            boxShadow: isActive ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(247,148,29,0.10)' : 'none',
          }}
        >
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            sizes="360px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-widest mb-2">{pkg.tagline}</p>
            <h3 className="text-white text-xl font-black uppercase mb-4 leading-tight tracking-tighter">{pkg.name}</h3>
            <span className="inline-flex items-center text-white/70 text-[10px] font-black uppercase tracking-widest gap-1.5 group-hover:text-white group-hover:gap-2.5 transition-all">
              View Itinerary <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </Link>
      )}
    />
  );
}
