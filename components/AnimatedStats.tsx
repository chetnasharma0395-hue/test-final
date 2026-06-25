'use client';

import { useEffect, useRef, useState } from 'react';
import { AuroraGlow } from './motion';

const stats = [
  { value: 20000, suffix: '+', label: 'Happy Customers', description: 'Served across Uttarakhand' },
  { value: 12, suffix: '+', label: 'Years of Excellence', description: 'Trusted since 2012' },
  { value: 4.9, suffix: '★', label: 'Google Rating', description: 'Based on 2,000+ reviews', isDecimal: true },
  { value: 24, suffix: '/7', label: 'Availability', description: 'Always here when you need us' },
];

function useCountUp(target: number, duration: number = 3500, isDecimal: boolean = false, isActive: boolean = false, delay: number = 0) {
  // SSR renders target value — Google crawlers see real numbers
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!isActive) return;

    // Reset to 0 right as animation begins (user has scrolled to section)
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
          setCount(target); // Land exactly on target value
        }
      };
      raf = requestAnimationFrame(update);
    }, delay);

    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [isActive, target, duration, isDecimal, delay]);

  return count;
}

function StatCard({ stat, isActive, delay }: { stat: typeof stats[0]; isActive: boolean; delay: number }) {
  const count = useCountUp(stat.value, 3500, stat.isDecimal, isActive, delay);
  const display = stat.isDecimal ? count.toFixed(1) : count.toLocaleString('en-IN');

  return (
    <div className="flex flex-col items-center text-center px-4 py-5 group">
      <div className="mb-3 relative">
        <span className="text-4xl md:text-5xl font-black text-white leading-none tabular-nums">
          {display}
        </span>
        <span className="text-2xl md:text-3xl font-black text-[#F7941D]">{stat.suffix}</span>
      </div>
      <p className="text-white font-black uppercase text-sm tracking-widest mb-1">{stat.label}</p>
      <p className="text-white/60 text-xs font-medium tracking-wide">{stat.description}</p>
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
    <section ref={ref} className="bg-[#121212] relative overflow-hidden">
      {/* Animated ambient glow */}
      <AuroraGlow className="opacity-50" />

      <div className="max-w-page mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} isActive={isVisible} delay={[0, 350, 150, 500][i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
