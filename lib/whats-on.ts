import type { WhatsOnEvent } from '@/data/types';

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseEventDate(event: WhatsOnEvent): Date {
  const [year, month, day] = event.startDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function sortByDate(events: WhatsOnEvent[]): WhatsOnEvent[] {
  return [...events].sort((a, b) => parseEventDate(a).getTime() - parseEventDate(b).getTime());
}

export function upcomingEvents(events: WhatsOnEvent[], from: Date = new Date()): WhatsOnEvent[] {
  const today = startOfDay(from);
  return sortByDate(events).filter((event) => parseEventDate(event) >= today);
}

export function pastEvents(events: WhatsOnEvent[], from: Date = new Date()): WhatsOnEvent[] {
  const today = startOfDay(from);
  return sortByDate(events).filter((event) => parseEventDate(event) < today);
}

export function nextFeaturedEvent(
  events: WhatsOnEvent[],
  from: Date = new Date()
): WhatsOnEvent | null {
  const upcoming = upcomingEvents(events, from);
  const featured = upcoming.find((event) => event.featured);
  return featured ?? upcoming[0] ?? null;
}

export function daysUntil(event: WhatsOnEvent, from: Date = new Date()): number {
  const today = startOfDay(from);
  const target = parseEventDate(event);
  return Math.round((target.getTime() - today.getTime()) / DAY_MS);
}

const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

export interface WeekDay {
  label: (typeof WEEKDAY_LABELS)[number];
  date: Date;
  isToday: boolean;
  events: WhatsOnEvent[];
}

export function getWeekDays(events: WhatsOnEvent[], from: Date = new Date()): WeekDay[] {
  const today = startOfDay(from);
  const isoWeekday = (today.getDay() + 6) % 7; // 0 = Monday
  const monday = new Date(today.getTime() - isoWeekday * DAY_MS);

  return WEEKDAY_LABELS.map((label, index) => {
    const date = new Date(monday.getTime() + index * DAY_MS);
    return {
      label,
      date,
      isToday: isSameDay(date, today),
      events: events.filter((event) => isSameDay(parseEventDate(event), date)),
    };
  });
}

export function groupByMonth(events: WhatsOnEvent[]): { month: string; events: WhatsOnEvent[] }[] {
  const groups = new Map<string, WhatsOnEvent[]>();
  for (const event of sortByDate(events)) {
    const date = parseEventDate(event);
    const key = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(event);
  }
  return Array.from(groups.entries()).map(([month, monthEvents]) => ({ month, events: monthEvents }));
}

export interface CalendarDay {
  date: Date;
  inCurrentMonth: boolean;
  events: WhatsOnEvent[];
}

export function getMonthGrid(monthDate: Date, events: WhatsOnEvent[]): CalendarDay[] {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first grid
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart.getTime() + index * DAY_MS);
    return {
      date,
      inCurrentMonth: date.getMonth() === month,
      events: events.filter((event) => isSameDay(parseEventDate(event), date)),
    };
  });
}

export function formatEventDate(event: WhatsOnEvent): string {
  return parseEventDate(event).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function buildIcsUrl(event: WhatsOnEvent): string {
  const date = parseEventDate(event);
  const [hours = 0, minutes = 0] = (event.time ?? '00:00').split(':').map(Number);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const stamp = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}Z$/, 'Z');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `UID:${event.id}@kclDentalSociety`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
    `LOCATION:${event.location ?? ''}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;
}
