'use client';

import { motion } from 'framer-motion';

export function TimelineNode() {
  return (
    <div className="relative flex h-4 w-4 items-center justify-center">
      <motion.div
        className="absolute h-4 w-4 rounded-full bg-gold"
        initial={{ scale: 1, opacity: 0.4 }}
        whileInView={{ scale: [1, 1.6, 1], opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute h-4 w-4 rounded-full bg-gold opacity-40 blur-md" aria-hidden="true" />
      <div className="relative h-1.5 w-1.5 rounded-full bg-cream" />
    </div>
  );
}
