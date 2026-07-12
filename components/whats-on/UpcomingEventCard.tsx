'use client';

import type { WhatsOnEvent } from '@/data/types';
import { CATEGORY_META } from '@/data/whats-on';
import { formatEventDate } from '@/lib/whats-on';
import { CATEGORY_STYLES } from './categoryStyles';

export function UpcomingEventCard({
  event,
  onSelect,
}: {
  event: WhatsOnEvent;
  onSelect: (event: WhatsOnEvent) => void;
}) {
  const categoryLabel = CATEGORY_META.find((c) => c.slug === event.category)?.label ?? event.category;
  const styles = CATEGORY_STYLES[event.category];

  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className="group block w-full overflow-hidden rounded-2xl border border-navy/10 bg-cream text-left shadow-sm transition-all duration-300 ease-expo-out hover:-translate-y-1.5 hover:border-navy/25 hover:shadow-xl"
    >
      <div className="h-40 w-full overflow-hidden">
        <img
          src={event.coverImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-expo-out group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <span
          className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream ${styles.badge}`}
        >
          {categoryLabel}
        </span>
        <h3 className="mt-3 font-display text-xl text-navy">{event.title}</h3>
        <p className="mt-1 text-sm text-navy/60">{formatEventDate(event)}</p>
        {event.location && <p className="mt-0.5 text-sm text-navy/60">{event.location}</p>}
        <span className="mt-3 inline-block text-sm text-navy underline decoration-gold decoration-2 underline-offset-4 group-hover:text-gold">
          Reserve →
        </span>
      </div>
    </button>
  );
}
