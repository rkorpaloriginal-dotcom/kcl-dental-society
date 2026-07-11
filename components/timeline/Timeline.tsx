'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { TIMELINE_MILESTONES } from '@/data/timeline';
import { TimelineBackground } from './TimelineBackground';
import { TimelineLine } from './TimelineLine';
import { TimelineItem } from './TimelineItem';

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy px-6 py-32 md:px-12">
      <TimelineBackground />
      <div className="relative mx-auto max-w-5xl">
        <h2 className="text-center font-display text-4xl text-cream md:text-6xl">Our Legacy</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base text-cream/70">
          More than 130 years of dental excellence at King&apos;s.
        </p>

        <div className="relative mt-20">
          <TimelineLine progress={lineProgress} reducedMotion={!!reducedMotion} />
          {TIMELINE_MILESTONES.map((milestone, index) => (
            <TimelineItem key={milestone.year} milestone={milestone} index={index} />
          ))}
        </div>

        <div className="relative mx-auto mt-24 max-w-lg text-center">
          <h3 className="font-display text-3xl text-cream md:text-4xl">The Next Chapter</h3>
          <p className="mt-4 text-base leading-relaxed text-cream/80">
            Every student who joins the King&apos;s College London Dental Society becomes part of
            a legacy spanning more than a century. The next chapter has yet to be written.
          </p>
          <Link
            href="/join"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-4 text-base font-medium text-navy transition-colors duration-300 ease-expo-out hover:bg-cream"
          >
            Join the Society
          </Link>
        </div>
      </div>
    </section>
  );
}
