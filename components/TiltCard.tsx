'use client';

import { useRef, type ReactNode, type CSSProperties } from 'react';

/**
 * TiltCard
 * ────────
 * Generic wrapper that adds mouse-tracked 3D tilt + specular highlight to any
 * child element. Use it to wrap *any* card grid item without changing the
 * card's internal markup or layout.
 *
 * Example:
 *   <TiltCard>
 *     <div className="card …">…existing content…</div>
 *   </TiltCard>
 */
export function TiltCard({
  children,
  className = '',
  style,
  wrapperClassName = '',
  intensityY = 16, // horizontal tilt range (deg)
  intensityX = 12, // vertical tilt range (deg)
  glowColor = 'rgba(247,148,29,0.10)',
  showGlow = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  wrapperClassName?: string;
  intensityX?: number;
  intensityY?: number;
  glowColor?: string;
  showGlow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * intensityY;
    const rotX = (0.5 - y) * intensityX;
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
      className={wrapperClassName}
      style={{ perspective: '1200px', height: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={ref}
        className={`relative h-full ${className}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform',
          ...style,
        }}
      >
        {children}
        {showGlow && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${glowColor}, transparent 60%)`,
              borderRadius: 'inherit',
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
      </div>
    </div>
  );
}
