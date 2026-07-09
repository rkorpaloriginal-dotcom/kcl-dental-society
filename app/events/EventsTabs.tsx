'use client';

import { useState } from 'react';
import { EVENT_CATEGORIES } from '@/data/events';
import { EventCard } from '@/components/EventCard';
import { RevealOnScroll } from '@/components/RevealOnScroll';

type Tab = 'what-we-run' | 'upcoming';

export function EventsTabs() {
  const [tab, setTab] = useState<Tab>('what-we-run');

  return (
    <div>
      <div role="tablist" className="mb-8 flex justify-center gap-4">
        <button
          role="tab"
          aria-selected={tab === 'what-we-run'}
          onClick={() => setTab('what-we-run')}
          className={`rounded-full px-5 py-2 ${
            tab === 'what-we-run' ? 'bg-navy text-white' : 'border border-navy text-navy'
          }`}
        >
          What We Run
        </button>
        <button
          role="tab"
          aria-selected={tab === 'upcoming'}
          onClick={() => setTab('upcoming')}
          className={`rounded-full px-5 py-2 ${
            tab === 'upcoming' ? 'bg-navy text-white' : 'border border-navy text-navy'
          }`}
        >
          Upcoming
        </button>
      </div>

      {tab === 'what-we-run' ? (
        <div className="grid auto-rows-[14rem] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EVENT_CATEGORIES.map((category, index) => (
            <RevealOnScroll
              key={category.slug}
              variant="clip"
              className={`h-full ${index % 4 === 0 || index % 4 === 3 ? 'row-span-2' : ''}`}
            >
              <EventCard category={category} />
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        <p className="mx-auto max-w-md text-center text-lg">
          No upcoming events yet — check back soon, or follow our Instagram for the latest
          announcements.
        </p>
      )}
    </div>
  );
}
