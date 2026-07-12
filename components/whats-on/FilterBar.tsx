'use client';

import { motion } from 'framer-motion';
import type { WhatsOnCategorySlug } from '@/data/types';
import { CATEGORY_META } from '@/data/whats-on';

export type FilterValue = WhatsOnCategorySlug | 'all';

export function FilterBar({
  active,
  onChange,
}: {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  const options: { slug: FilterValue; label: string }[] = [
    { slug: 'all', label: 'All' },
    ...CATEGORY_META.map((category) => ({ slug: category.slug, label: category.label })),
  ];

  return (
    <div className="sticky top-0 z-30 border-b border-navy/10 bg-cream/90 backdrop-blur-sm">
      <div
        role="group"
        aria-label="Filter events by category"
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4"
      >
        {options.map((option) => {
          const isActive = option.slug === active;
          return (
            <button
              key={option.slug}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.slug)}
              className="relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-300 ease-expo-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill-background"
                  className="absolute inset-0 rounded-full bg-navy"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className={`relative ${isActive ? 'text-cream' : 'text-navy/70 hover:text-navy'}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
