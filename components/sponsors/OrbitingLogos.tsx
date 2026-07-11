'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Sponsor } from '@/data/types';

const RADIUS = 220;

export function OrbitingLogos({ sponsors }: { sponsors: Sponsor[] }) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : sponsors[activeIndex];

  function activate(index: number) {
    setActiveIndex(index);
  }
  function deactivate(index: number) {
    setActiveIndex((current) => (current === index ? null : current));
  }

  return (
    <div className="relative mx-auto hidden h-[300px] w-[300px] md:block md:h-[340px] md:w-[340px]">
      <div
        className={`group absolute inset-0 ${
          reducedMotion
            ? ''
            : 'animate-[orbit-spin_60s_linear_infinite] hover:[animation-play-state:paused]'
        }`}
      >
        {sponsors.map((sponsor, index) => {
          const angle = (360 / sponsors.length) * index;
          return (
            <div
              key={sponsor.name}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${angle}deg) translateX(${RADIUS}px)` }}
            >
              <div
                className={`-translate-x-1/2 -translate-y-1/2 ${
                  reducedMotion
                    ? ''
                    : 'animate-[orbit-counter-spin_60s_linear_infinite] group-hover:[animation-play-state:paused]'
                }`}
              >
                <button
                  type="button"
                  onMouseEnter={() => activate(index)}
                  onMouseLeave={() => deactivate(index)}
                  onFocus={() => activate(index)}
                  onBlur={() => deactivate(index)}
                  aria-label={sponsor.name}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-cream p-3 shadow-md transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:scale-[1.08] hover:shadow-lg focus-visible:-translate-y-1 focus-visible:scale-[1.08] focus-visible:shadow-lg"
                >
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt=""
                      className="h-8 w-auto max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-display text-xs text-navy">{sponsor.name}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-56 -translate-x-1/2 rounded-xl border border-navy/10 bg-cream p-4 text-center shadow-xl"
          >
            <p className="font-display text-base text-navy">{active.name}</p>
            {active.description && (
              <p className="mt-1 text-xs text-body">{active.description}</p>
            )}
            {active.link && (
              <a
                href={active.link}
                className="pointer-events-auto mt-2 inline-block text-xs text-gold underline"
              >
                Visit website
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
