'use client';

import { motion } from 'framer-motion';
import type { EventCategory } from '@/data/types';

const TILE_LAYOUT = [
  'md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-3',
  'md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-2',
  'md:col-start-4 md:col-span-1 md:row-start-1 md:row-span-2',
  'md:col-start-3 md:col-span-2 md:row-start-3 md:row-span-1',
  'md:col-start-1 md:col-span-1 md:row-start-4 md:row-span-1',
  'md:col-start-2 md:col-span-1 md:row-start-4 md:row-span-1',
  'md:col-start-3 md:col-span-1 md:row-start-4 md:row-span-1',
  'md:col-start-4 md:col-span-1 md:row-start-4 md:row-span-1',
];

export function EventCollage({ categories }: { categories: EventCategory[] }) {
  return (
    <div className="grid h-[360px] grid-cols-2 grid-rows-4 gap-2 md:h-[560px] md:grid-cols-4">
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
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/10" />
        </motion.div>
      ))}
    </div>
  );
}
