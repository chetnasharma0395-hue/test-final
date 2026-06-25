'use client';

import Link from 'next/link';
import { ArrowRight, Car, Users, type LucideIcon } from 'lucide-react';
import { TiltCard, Stagger, StaggerItem } from './motion/MotionKit';

// Icon names are passed as strings (serializable), resolved here on the client.
const ICONS: Record<string, LucideIcon> = {
  car: Car,
  users: Users,
};

export interface FleetOptionData {
  name: string;
  models: string;
  capacity: string;
  iconName: string;
  best: string;
  accent: boolean;
}

export function FleetTiltGrid({ fleet }: { fleet: FleetOptionData[] }) {
  return (
    <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {fleet.map((v) => {
        const Icon = ICONS[v.iconName] ?? Car;
        return (
          <StaggerItem key={v.name}>
            <TiltCard
              intensity={9}
              className={`group h-full rounded-[2.5rem] p-10 border transition-shadow duration-300 hover:shadow-[0_30px_60px_-20px_rgba(11,28,63,0.3)] ${
                v.accent
                  ? 'bg-[#121212] border-[#1a2e5a] text-white'
                  : 'bg-[#1A1A1A] border-white/10 hover:border-[#F7941D]/20'
              }`}
            >
              <div style={{ transform: 'translateZ(40px)' }}>
                <Icon className="w-12 h-12 mb-6 text-[#F7941D]" />
              </div>
              <h3
                style={{ transform: 'translateZ(30px)' }}
                className={`text-2xl font-black uppercase mb-2 tracking-tighter ${
                  v.accent ? 'text-white' : 'text-white'
                }`}
              >
                {v.name}
              </h3>
              <p className="text-sm font-black mb-1 text-[#F7941D]">{v.models}</p>
              <p
                className={`text-xs font-bold uppercase tracking-widest mb-6 ${
                  v.accent ? 'text-white/60' : 'text-white/70'
                }`}
              >
                {v.capacity}
              </p>
              <p
                className={`text-sm font-light mb-8 leading-relaxed ${
                  v.accent ? 'text-white/60' : 'text-white/70'
                }`}
              >
                <span className={`font-black ${v.accent ? 'text-white/80' : 'text-white'}`}>
                  Best for:{' '}
                </span>
                {v.best}
              </p>
              <Link
                href="/fleet"
                style={{ transform: 'translateZ(20px)' }}
                className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 group/link ${
                  v.accent ? 'text-white/60 hover:text-white' : 'text-white hover:text-[#F7941D]'
                } transition-colors`}
              >
                View Fleet{' '}
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </TiltCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
