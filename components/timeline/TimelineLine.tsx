'use client';

import { motion, useMotionTemplate, type MotionValue } from 'framer-motion';

export function TimelineLine({
  progress,
  reducedMotion,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  // Binding `scaleY` directly (a plain number for the reduced-motion case) does not
  // synchronously produce a `transform` style string in this framer-motion version —
  // it only does for MotionValues. Templating it explicitly keeps both the reduced-
  // and non-reduced-motion cases on the same, verifiably synchronous code path.
  const scaleY = useMotionTemplate`scaleY(${reducedMotion ? 1 : progress})`;

  return (
    <div
      className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gold/15"
      aria-hidden="true"
      data-testid="timeline-line-track"
    >
      <motion.div
        className="w-full origin-top rounded-full bg-gold shadow-[0_0_12px_2px_rgba(201,153,46,0.6)]"
        style={{ height: '100%', transform: scaleY }}
        data-testid="timeline-line-fill"
      />
    </div>
  );
}
