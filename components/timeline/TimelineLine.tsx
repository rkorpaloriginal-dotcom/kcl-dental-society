'use client';

import { motion, type MotionValue } from 'framer-motion';

export function TimelineLine({
  progress,
  reducedMotion,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  return (
    <div
      className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gold/15"
      aria-hidden="true"
      data-testid="timeline-line-track"
    >
      <motion.div
        className="w-full origin-top rounded-full bg-gold shadow-[0_0_12px_2px_rgba(201,153,46,0.6)]"
        style={{ height: '100%', scaleY: reducedMotion ? 1 : progress }}
        data-testid="timeline-line-fill"
      />
    </div>
  );
}
