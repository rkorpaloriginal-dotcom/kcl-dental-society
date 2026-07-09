'use client';

import { motion } from 'framer-motion';
import type { EventCategory } from '@/data/types';

const TILE_LAYOUT = [
  'col-start-1 col-span-2 row-start-1 row-span-3',
  'col-start-3 col-span-1 row-start-1 row-span-2',
  'col-start-4 col-span-1 row-start-1 row-span-2',
  'col-start-3 col-span-2 row-start-3 row-span-1',
  'col-start-1 col-span-1 row-start-4 row-span-1',
  'col-start-2 col-span-1 row-start-4 row-span-1',
  'col-start-3 col-span-1 row-start-4 row-span-1',
  'col-start-4 col-span-1 row-start-4 row-span-1',
];

export function EventCollage({ categories }: { categories: EventCategory[] }) {
  return (
    <div className="grid h-[420px] grid-cols-4 grid-rows-4 gap-2 md:h-[560px]">
      {categories.slice(0, 8).map((category, index) => (
        <motion.div
          key={category.slug}
          className={`relative overflow-hidden ${TILE_LAYOUT[index]}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.15 + index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <img
            src={category.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/10" />
        </motion.div>
      ))}
    </div>
  );
}
