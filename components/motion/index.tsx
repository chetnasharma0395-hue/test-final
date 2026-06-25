'use client';

/**
 * Animated section wrappers — safe to import into server components.
 * These thin client wrappers let any page add scroll motion without
 * converting the whole page to a client component.
 */

import { Reveal, Stagger, StaggerItem, Aurora, TiltCard, MagneticButton, CountUp, Float } from './MotionKit';
import type { ReactNode } from 'react';

/** Wrap any block to fade + rise it on scroll into view. */
export function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}) {
  return (
    <Reveal delay={delay} direction={direction} className={className}>
      {children}
    </Reveal>
  );
}

/** Ambient aurora glow — drop inside any relative, overflow-hidden dark section. */
export function AuroraGlow({ className = '' }: { className?: string }) {
  return <Aurora className={className} />;
}

/** 3D tilt wrapper for cards. Add `group` to className for glare. */
export function TiltWrapper({
  children,
  className = '',
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  return (
    <TiltCard className={`group ${className}`} intensity={intensity}>
      {children}
    </TiltCard>
  );
}

/** Magnetic CTA — renders an anchor by default. */
export function MagneticCTA({
  children,
  href,
  className = '',
  target,
  rel,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <MagneticButton as="a" href={href} className={className} target={target} rel={rel}>
      {children}
    </MagneticButton>
  );
}

/** Animated count-up stat. */
export function StatCounter({
  to,
  prefix = '',
  suffix = '',
  className = '',
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return <CountUp to={to} prefix={prefix} suffix={suffix} className={className} />;
}

export { Stagger, StaggerItem, Float };
