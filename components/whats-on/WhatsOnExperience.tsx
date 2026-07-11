'use client';

import { useMemo, useState } from 'react';
import type { WhatsOnEvent } from '@/data/types';
import { WHATS_ON_EVENTS } from '@/data/whats-on';
import { upcomingEvents, nextFeaturedEvent } from '@/lib/whats-on';
import { FilterBar, type FilterValue } from './FilterBar';
import { FeaturedEvent } from './FeaturedEvent';
import { WeekStrip } from './WeekStrip';
import { UpcomingTimeline } from './UpcomingTimeline';
import { CalendarGrid } from './CalendarGrid';
import { EventDrawer } from './EventDrawer';

export function WhatsOnExperience() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const [selectedEvent, setSelectedEvent] = useState<WhatsOnEvent | null>(null);

  const upcoming = useMemo(() => upcomingEvents(WHATS_ON_EVENTS), []);
  const featured = useMemo(() => nextFeaturedEvent(WHATS_ON_EVENTS), []);
  const filteredUpcoming = useMemo(
    () => (filter === 'all' ? upcoming : upcoming.filter((event) => event.category === filter)),
    [upcoming, filter]
  );

  return (
    <>
      {featured && <FeaturedEvent event={featured} onViewDetails={setSelectedEvent} />}
      <FilterBar active={filter} onChange={setFilter} />
      <WeekStrip events={filteredUpcoming} onSelectEvent={setSelectedEvent} />
      <UpcomingTimeline events={filteredUpcoming} onSelectEvent={setSelectedEvent} />
      <CalendarGrid events={filteredUpcoming} onSelectEvent={setSelectedEvent} />
      <EventDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}
