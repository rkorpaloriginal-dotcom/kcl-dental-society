import { describe, it, expect } from 'vitest';
import type { WhatsOnEvent } from '@/data/types';
import {
  parseEventDate,
  upcomingEvents,
  pastEvents,
  nextFeaturedEvent,
  daysUntil,
  getWeekDays,
  groupByMonth,
  getMonthGrid,
  formatEventDate,
} from './whats-on';

function makeEvent(overrides: Partial<WhatsOnEvent>): WhatsOnEvent {
  return {
    id: 'test-event',
    title: 'Test Event',
    description: 'A test event.',
    category: 'social',
    startDate: '2026-07-15',
    coverImage: '/images/events/formals.jpg',
    status: 'upcoming',
    ...overrides,
  };
}

const REFERENCE_DATE = new Date(2026, 6, 11); // Saturday 11 July 2026

describe('parseEventDate', () => {
  it('parses the ISO date as a local date, not UTC-shifted', () => {
    const date = parseEventDate(makeEvent({ startDate: '2026-12-12' }));
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(11);
    expect(date.getDate()).toBe(12);
  });
});

describe('upcomingEvents / pastEvents', () => {
  const events = [
    makeEvent({ id: 'past', startDate: '2026-01-01' }),
    makeEvent({ id: 'today', startDate: '2026-07-11' }),
    makeEvent({ id: 'future', startDate: '2026-12-12' }),
  ];

  it('splits events relative to the reference date, keeping today as upcoming', () => {
    const upcoming = upcomingEvents(events, REFERENCE_DATE).map((e) => e.id);
    const past = pastEvents(events, REFERENCE_DATE).map((e) => e.id);
    expect(upcoming).toEqual(['today', 'future']);
    expect(past).toEqual(['past']);
  });
});

describe('nextFeaturedEvent', () => {
  it('prefers the featured event over the soonest event', () => {
    const events = [
      makeEvent({ id: 'soonest', startDate: '2026-07-12' }),
      makeEvent({ id: 'featured', startDate: '2026-12-12', featured: true }),
    ];
    expect(nextFeaturedEvent(events, REFERENCE_DATE)?.id).toBe('featured');
  });

  it('falls back to the soonest upcoming event when nothing is featured', () => {
    const events = [
      makeEvent({ id: 'soonest', startDate: '2026-07-12' }),
      makeEvent({ id: 'later', startDate: '2026-12-12' }),
    ];
    expect(nextFeaturedEvent(events, REFERENCE_DATE)?.id).toBe('soonest');
  });

  it('returns null when there are no upcoming events', () => {
    const events = [makeEvent({ id: 'past', startDate: '2026-01-01' })];
    expect(nextFeaturedEvent(events, REFERENCE_DATE)).toBeNull();
  });
});

describe('daysUntil', () => {
  it('counts whole days between today and the event', () => {
    const event = makeEvent({ startDate: '2026-07-14' });
    expect(daysUntil(event, REFERENCE_DATE)).toBe(3);
  });
});

describe('getWeekDays', () => {
  it('returns Monday through Sunday with today flagged', () => {
    const days = getWeekDays([], REFERENCE_DATE);
    expect(days.map((d) => d.label)).toEqual(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']);
    expect(days.filter((d) => d.isToday)).toHaveLength(1);
    expect(days.find((d) => d.isToday)?.label).toBe('SAT');
  });

  it('buckets events onto their matching day', () => {
    const events = [makeEvent({ id: 'sat-event', startDate: '2026-07-11' })];
    const days = getWeekDays(events, REFERENCE_DATE);
    const saturday = days.find((d) => d.label === 'SAT');
    expect(saturday?.events.map((e) => e.id)).toEqual(['sat-event']);
  });
});

describe('groupByMonth', () => {
  it('groups events under a human-readable month/year key in chronological order', () => {
    const events = [
      makeEvent({ id: 'dec', startDate: '2026-12-12' }),
      makeEvent({ id: 'sep', startDate: '2026-09-21' }),
    ];
    const groups = groupByMonth(events);
    expect(groups.map((g) => g.month)).toEqual(['September 2026', 'December 2026']);
  });
});

describe('getMonthGrid', () => {
  it('produces a 42-cell Monday-first grid covering the requested month', () => {
    const grid = getMonthGrid(new Date(2026, 10, 1), []);
    expect(grid).toHaveLength(42);
    const novemberDays = grid.filter((day) => day.inCurrentMonth);
    expect(novemberDays).toHaveLength(30);
  });

  it('marks the cell matching an event date as having that event', () => {
    const events = [makeEvent({ id: 'nov-event', startDate: '2026-11-15' })];
    const grid = getMonthGrid(new Date(2026, 10, 1), events);
    const matching = grid.filter((day) => day.events.length > 0);
    expect(matching).toHaveLength(1);
    expect(matching[0].date.getDate()).toBe(15);
  });
});

describe('formatEventDate', () => {
  it('formats as weekday, day, month', () => {
    const event = makeEvent({ startDate: '2026-12-12' });
    expect(formatEventDate(event)).toBe('Saturday 12 December');
  });
});
