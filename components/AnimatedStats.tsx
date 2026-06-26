'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 10000, suffix: '+', label: 'Happy Customers', description: 'Served across Uttarakhand' },
  { value: 12, suffix: '+', label: 'Years of Excellence', description: 'Trusted since 2012' },
  { value: 4.9, suffix: '★', label: 'Google Rating', description: 'Based on Most Genuine reviews', isDecimal: true },
  { value: 24, suffix: '/7', label: 'Availability', description: 'Always here when you need us' },
];

function useCountUp(
  target: number,
  duration: number = 3500,
  isDecimal: boolean = false,
  isActive: boolean = false,
  delay: number = 0
) {
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!isActive) return;
    setCount(0);

    let raf: number;
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
        if (progress < 1) {
          raf = requestAnimationFrame(update);
        } else {
          setCount(target);
        }
      };
      raf = requestAnimationFrame(update);
    }, delay);

    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [isActive, target, duration, isDecimal, delay]);

  return count;
}

function StatCard({
  stat,
  isActive,
  delay,
  isLast,
}: {
  stat: typeof stats[0];
  isActive: boolean;
  delay: number;
  isLast: boolean;
}) {
  const count = useCountUp(stat.value, 3500, stat.isDecimal, isActive, delay);
  const display = stat.isDecimal ? count.toFixed(1) : count.toLocaleString('en-IN');

  return (
    <div
      className="flex flex-col items-center text-center px-6 py-6 animate-shimmer relative"
      style={{
        borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Subtle orange glow on hover */}
      <div className="mb-3">
        <span
          className="font-heading font-black leading-none tabular-nums"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: '#F7941D',
            letterSpacing: '-0.02em',
          }}
        >
          {display}
        </span>
        <span
          className="font-black"
          style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            color: 'rgba(247,148,29,0.7)',
          }}
        >
          {stat.suffix}
        </span>
      </div>
      <p
        className="font-black uppercase tracking-widest mb-1"
        style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.14em' }}
      >
        {stat.label}
      </p>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
        {stat.description}
      </p>
    </div>
  );
}

export function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ background: '#0a0a0a' }}
    >
      {/* Gradient divider at top */}
      <div className="section-divider" />

      <div className="max-w-page mx-auto">
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            margin: '0 24px',
            overflow: 'hidden',
          }}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              isActive={isVisible}
              delay={[0, 350, 150, 500][i]}
              isLast={i === stats.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Gradient divider at bottom */}
      <div className="section-divider mt-0" style={{ marginTop: 0 }} />
    </section>
  );
}
