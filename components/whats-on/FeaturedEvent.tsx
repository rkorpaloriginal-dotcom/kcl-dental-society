'use client';

import { motion } from 'framer-motion';
import type { WhatsOnEvent } from '@/data/types';
import { CATEGORY_META } from '@/data/whats-on';
import { daysUntil, formatEventDate } from '@/lib/whats-on';
import { CATEGORY_STYLES } from './categoryStyles';

export function FeaturedEvent({
  event,
  onViewDetails,
}: {
  event: WhatsOnEvent;
  onViewDetails: (event: WhatsOnEvent) => void;
}) {
  const categoryLabel = CATEGORY_META.find((c) => c.slug === event.category)?.label ?? event.category;
  const styles = CATEGORY_STYLES[event.category];
  const remaining = daysUntil(event);

  return (
    <section className="border-y border-navy/15 bg-navy">
      <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-2">
        <div className="relative h-72 overflow-hidden md:h-auto">
          <motion.img
            src={event.coverImage}
            alt=""
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 20, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 md:px-14">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream ${styles.badge}`}
            >
              {categoryLabel}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              Featured Event
            </span>
          </div>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] text-cream md:text-5xl">
            {event.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/70">
            {event.description}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-cream/80">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">Date</dt>
              <dd className="mt-1">{formatEventDate(event)}</dd>
            </div>
            {event.location && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  Location
                </dt>
                <dd className="mt-1">{event.location}</dd>
              </div>
            )}
            {remaining >= 0 && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  Countdown
                </dt>
                <dd className="mt-1 text-gold">
                  {remaining === 0 ? 'Today' : `${remaining} day${remaining === 1 ? '' : 's'} to go`}
                </dd>
              </div>
            )}
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                className="rounded-full bg-gold px-8 py-3 text-sm font-medium text-navy shadow-[0_0_0_0_rgba(201,153,46,0.5)] transition-all duration-300 ease-expo-out hover:shadow-[0_0_24px_4px_rgba(201,153,46,0.45)]"
              >
                Reserve Your Place
              </a>
            )}
            <button
              type="button"
              onClick={() => onViewDetails(event)}
              className="text-sm text-cream/70 underline decoration-cream/30 underline-offset-4 transition-colors duration-300 ease-expo-out hover:text-cream"
            >
              Full details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
