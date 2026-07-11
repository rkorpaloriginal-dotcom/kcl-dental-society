'use client';

import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion, motion } from 'framer-motion';
import type { WhatsOnEvent } from '@/data/types';
import { groupByMonth } from '@/lib/whats-on';
import { TimelineLine } from '@/components/timeline/TimelineLine';
import { TimelineNode } from '@/components/timeline/TimelineNode';
import { UpcomingEventCard } from './UpcomingEventCard';

export function UpcomingTimeline({
  events,
  onSelectEvent,
}: {
  events: WhatsOnEvent[];
  onSelectEvent: (event: WhatsOnEvent) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const months = groupByMonth(events);

  let cardIndex = -1;

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-4xl px-6 py-24">
      <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-navy/50">
        Upcoming Timeline
      </p>
      <h2 className="mt-3 text-center font-display text-3xl text-navy md:text-5xl">
        What&apos;s Coming Next
      </h2>

      {events.length === 0 ? (
        <p className="mt-12 text-center text-body">No events match this filter yet — check back soon.</p>
      ) : (
      <div className="relative mt-16">
        <TimelineLine progress={lineProgress} reducedMotion={!!reducedMotion} />
        <div className="relative flex justify-center pb-12">
          <span className="rounded-full bg-navy px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
            Now
          </span>
        </div>

        {months.map((group) => (
          <div key={group.month} className="relative">
            <div className="relative flex justify-center py-6">
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60">
                {group.month}
              </span>
            </div>
            {group.events.map((event) => {
              cardIndex += 1;
              const isRightAligned = cardIndex % 2 === 1;
              return (
                <div
                  key={event.id}
                  className={`relative flex w-full items-start gap-6 py-8 md:gap-0 ${
                    isRightAligned ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  <div className="flex w-8 flex-none justify-center pt-6 md:w-1/2 md:justify-center">
                    <TimelineNode reducedMotion={!!reducedMotion} />
                  </div>
                  <motion.div
                    className={`flex-1 md:w-1/2 ${isRightAligned ? 'md:pr-10' : 'md:pl-10'}`}
                    initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <UpcomingEventCard event={event} onSelect={onSelectEvent} />
                  </motion.div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      )}
    </section>
  );
}
