'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import type { Stat } from '@/data/stats';

export function StatCounter({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, reducedMotion, value]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={`${value}${suffix} ${label}`}
      className="rounded-2xl border border-gold/30 bg-cream/10 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md"
    >
      <p aria-hidden="true" className="font-display text-4xl leading-none text-cream md:text-5xl">
        {display}
        {suffix}
      </p>
      <p
        aria-hidden="true"
        className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70"
      >
        {label}
      </p>
    </div>
  );
}
