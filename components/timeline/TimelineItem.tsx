'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { TimelineMilestone } from '@/data/timeline';
import { TimelineNode } from './TimelineNode';
import { TimelineCard } from './TimelineCard';

export function TimelineItem({
  milestone,
  index,
}: {
  milestone: TimelineMilestone;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const isRightAligned = index % 2 === 1;

  return (
    <div
      className={`relative flex w-full items-start gap-6 py-12 md:gap-0 ${
        isRightAligned ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="flex w-8 flex-none justify-center pt-2 md:w-1/2 md:justify-center">
        <TimelineNode reducedMotion={!!reducedMotion} />
      </div>
      <motion.div
        className={`flex-1 md:w-1/2 ${isRightAligned ? 'md:pr-12' : 'md:pl-12'}`}
        initial={reducedMotion ? false : { opacity: 0, y: 32 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', stiffness: 210, damping: 30 }}
      >
        <TimelineCard milestone={milestone} />
      </motion.div>
    </div>
  );
}
