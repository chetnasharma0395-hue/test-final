'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, Car, Users, type LucideIcon } from 'lucide-react';

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

/**
 * FleetGrid
 * ─────────
 * Static 3-column grid showcasing fleet categories with a 3D tilt-on-hover
 * effect (mouse-tracked, smooth, GPU-accelerated). No carousel — every card
 * is visible at once on desktop. Stacks vertically on mobile.
 */
export function FleetGrid({ fleet }: { fleet: FleetOptionData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {fleet.map((v) => (
        <TiltCard key={v.name} v={v} />
      ))}
    </div>
  );
}

function TiltCard({ v }: { v: FleetOptionData }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICONS[v.iconName] ?? Car;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
    const y = (e.clientY - rect.top) / rect.height;   // 0 → 1
    // Tilt range: ±8 degrees
    const rotY = (x - 0.5) * 16;  // left ↔ right
    const rotX = (0.5 - y) * 12;  // top  ↔ bottom
    el.style.setProperty('--rx', `${rotX}deg`);
    el.style.setProperty('--ry', `${rotY}deg`);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
  };

  return (
    <div
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={ref}
        className="relative overflow-hidden h-full"
        style={{
          padding: '36px 32px 32px',
          borderRadius: 24,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease',
          background: v.accent
            ? 'linear-gradient(160deg, rgba(247,148,29,0.13) 0%, rgba(17,17,17,0.98) 60%)'
            : 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(17,17,17,0.98) 60%)',
          border: v.accent ? '1px solid rgba(247,148,29,0.30)' : '1px solid rgba(255,255,255,0.11)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(247,148,29,0.06)',
          willChange: 'transform',
        }}
      >
        {/* Specular highlight following cursor */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(247,148,29,0.10), transparent 60%)',
            transition: 'opacity 0.3s ease',
            borderRadius: 'inherit',
          }}
        />

        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 28, right: 28, height: 2,
          background: 'linear-gradient(90deg, transparent, #F7941D, transparent)',
          borderRadius: 999,
        }} />

        {/* Tag badge */}
        <div style={{
          position: 'absolute', top: 18, right: 18,
          background: v.accent ? 'linear-gradient(135deg, #F7941D, #D97E10)' : 'rgba(247,148,29,0.10)',
          border: v.accent ? 'none' : '1px solid rgba(247,148,29,0.28)',
          color: v.accent ? 'white' : '#F7941D',
          padding: '4px 11px', borderRadius: 999,
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          transform: 'translateZ(30px)',
        }}>
          {v.accent ? 'Top Pick' : 'Popular'}
        </div>

        {/* Icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: 'rgba(247,148,29,0.10)',
          border: '1px solid rgba(247,148,29,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 22,
          transform: 'translateZ(40px)',
        }}>
          <Icon className="w-6 h-6" style={{ color: '#F7941D' }} />
        </div>

        <h3
          className="font-heading font-black text-2xl uppercase tracking-tighter leading-none mb-1"
          style={{ color: 'white', transform: 'translateZ(30px)' }}
        >
          {v.name}
        </h3>
        <p className="text-sm font-black mb-1" style={{ color: '#F7941D', transform: 'translateZ(25px)' }}>{v.models}</p>
        <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {v.capacity}
        </p>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 16 }} />

        <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <span className="font-black" style={{ color: 'rgba(255,255,255,0.85)' }}>Best for: </span>
          {v.best}
        </p>

        <Link
          href="/fleet"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest group/link w-fit text-white/60 hover:text-[#F7941D] transition-colors"
          style={{ transform: 'translateZ(35px)' }}
        >
          View Fleet
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
