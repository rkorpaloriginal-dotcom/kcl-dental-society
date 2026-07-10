'use client';

import { motion } from 'framer-motion';
import type { Sponsor } from '@/data/types';

const TILE_LAYOUT = [
  'col-start-1 col-span-2 row-start-1 row-span-2',
  'col-start-3 col-span-1 row-start-1 row-span-1',
  'col-start-4 col-span-1 row-start-1 row-span-1',
  'col-start-3 col-span-2 row-start-2 row-span-1',
  'col-start-1 col-span-1 row-start-3 row-span-1',
  'col-start-2 col-span-1 row-start-3 row-span-1',
  'col-start-3 col-span-1 row-start-3 row-span-1',
];

export function LogoWall({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="grid h-[360px] grid-cols-4 grid-rows-3 gap-2 md:h-[480px]">
      {sponsors.slice(0, 7).map((sponsor, index) => (
        <motion.div
          key={sponsor.name}
          className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-cream ${
            index === 0 ? 'ring-1 ring-gold/40' : ''
          } ${TILE_LAYOUT[index]}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.15 + index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {sponsor.logo ? (
            <img
              src={sponsor.logo}
              alt=""
              className={`w-auto object-contain ${
                index === 0 ? 'h-10 max-w-[55%] md:h-14' : 'h-6 max-w-[65%] md:h-8'
              }`}
            />
          ) : (
            <span className="font-display text-sm text-navy">{sponsor.name}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
