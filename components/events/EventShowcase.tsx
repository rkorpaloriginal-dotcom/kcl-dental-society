'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { EventCategory } from '@/data/types';

export function EventShowcase({ categories }: { categories: EventCategory[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeIndex = categories.findIndex((category) => category.slug === activeSlug);
  const active = activeIndex === -1 ? null : categories[activeIndex];

  useEffect(() => {
    if (!active) return;

    document.body.style.overflow = 'hidden';
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveSlug(null);
    }
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);

  return (
    <div>
      <ul className="grid grid-flow-row-dense auto-rows-[15rem] grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category, index) => {
          const isFeatured = index % 4 === 0 || index % 4 === 3;
          return (
            <motion.li
              key={category.slug}
              layoutId={`card-${category.slug}`}
              className={isFeatured ? 'row-span-2' : ''}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.5,
                delay: (index % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <button
                type="button"
                onClick={() => setActiveSlug(category.slug)}
                aria-haspopup="dialog"
                aria-label={`View details for ${category.name}`}
                className="group relative flex h-full w-full flex-col overflow-hidden border border-navy/10 bg-cream text-left transition-colors duration-300 ease-expo-out hover:border-navy/30"
              >
                <span className="absolute left-3 top-3 z-10 border border-navy/10 bg-cream/90 px-1.5 py-0.5 font-mono text-[10px] text-navy/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-2/3 w-full flex-1 overflow-hidden">
                  <motion.img
                    layoutId={`image-${category.slug}`}
                    src={category.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 ease-expo-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-4">
                  <h3 className="font-display text-lg text-navy md:text-xl">{category.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-body">{category.description}</p>
                </div>
                <span className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center border border-navy/20 text-sm text-navy opacity-0 transition-opacity duration-300 ease-expo-out group-hover:opacity-100">
                  +
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveSlug(null)}
          >
            <motion.div
              layoutId={`card-${active.slug}`}
              onClick={(event) => event.stopPropagation()}
              className="grid max-h-[85vh] w-full max-w-3xl grid-rows-[16rem_1fr] overflow-hidden bg-cream md:grid-cols-2 md:grid-rows-1"
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            >
              <div className="overflow-hidden">
                <motion.img
                  layoutId={`image-${active.slug}`}
                  src={active.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative flex flex-col justify-center p-8 md:p-10">
                <button
                  type="button"
                  onClick={() => setActiveSlug(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-navy/20 text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
                >
                  ×
                </button>
                <span className="font-mono text-xs text-navy/50">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-3xl text-navy">{active.name}</h3>
                <p className="mt-4 text-base leading-relaxed text-body">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
