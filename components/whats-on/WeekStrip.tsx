'use client';

import type { WhatsOnEvent } from '@/data/types';
import { getWeekDays } from '@/lib/whats-on';
import { CATEGORY_STYLES } from './categoryStyles';

export function WeekStrip({
  events,
  onSelectEvent,
  now = new Date(),
}: {
  events: WhatsOnEvent[];
  onSelectEvent: (event: WhatsOnEvent) => void;
  now?: Date;
}) {
  const days = getWeekDays(events, now);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-navy/50">This Week</p>
      <div className="mt-6 grid grid-cols-7 gap-2 overflow-x-auto md:gap-3">
        {days.map((day) => (
          <div
            key={day.label}
            className={`min-w-[6.5rem] rounded-xl border p-3 transition-colors duration-300 ease-expo-out ${
              day.isToday ? 'border-gold bg-navy text-cream' : 'border-navy/10 bg-cream text-navy'
            }`}
          >
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                day.isToday ? 'text-gold' : 'text-navy/50'
              }`}
            >
              {day.label}
              {day.isToday && <span className="ml-1">· Today</span>}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {day.events.length === 0 && (
                <p className={`text-xs ${day.isToday ? 'text-cream/40' : 'text-navy/30'}`}>—</p>
              )}
              {day.events.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onSelectEvent(event)}
                  className="group text-left"
                >
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${CATEGORY_STYLES[event.category].dot}`}
                    aria-hidden="true"
                  />
                  <span className="ml-1.5 line-clamp-2 text-xs leading-snug underline-offset-2 group-hover:underline">
                    {event.title}
                  </span>
                  {event.time && (
                    <span className={`block text-[10px] ${day.isToday ? 'text-cream/50' : 'text-navy/40'}`}>
                      {event.time}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
