'use client';

import { useState } from 'react';
import type { WhatsOnEvent } from '@/data/types';
import { getMonthGrid, isSameDay, formatEventDate } from '@/lib/whats-on';
import { CATEGORY_STYLES } from './categoryStyles';

const WEEKDAY_HEADERS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function CalendarGrid({
  events,
  onSelectEvent,
  now = new Date(),
}: {
  events: WhatsOnEvent[];
  onSelectEvent: (event: WhatsOnEvent) => void;
  now?: Date;
}) {
  const [monthDate, setMonthDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const grid = getMonthGrid(monthDate, events);
  const monthLabel = monthDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const selectedEvents = selectedDate
    ? events.filter((event) => {
        const [y, m, d] = event.startDate.split('-').map(Number);
        return isSameDay(new Date(y, m - 1, d), selectedDate);
      })
    : [];

  function changeMonth(delta: number) {
    setSelectedDate(null);
    setMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-navy/50">
        Monthly Calendar
      </p>
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
        >
          ‹
        </button>
        <h2 className="font-display text-2xl text-navy md:text-3xl">{monthLabel}</h2>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
        >
          ›
        </button>
      </div>

      <div className="mt-8 grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAY_HEADERS.map((label) => (
          <p key={label} className="font-mono text-[10px] uppercase tracking-[0.15em] text-navy/40">
            {label}
          </p>
        ))}
        {grid.map((day) => {
          const isSelected = selectedDate && isSameDay(day.date, selectedDate);
          return (
            <button
              key={day.date.toISOString()}
              type="button"
              disabled={!day.inCurrentMonth}
              onClick={() => setSelectedDate(day.date)}
              aria-pressed={!!isSelected}
              aria-label={day.date.toDateString()}
              className={`mx-auto flex h-10 w-10 flex-col items-center justify-center rounded-full text-sm transition-all duration-300 ease-expo-out ${
                !day.inCurrentMonth
                  ? 'text-navy/15'
                  : isSelected
                    ? 'bg-navy text-cream'
                    : 'text-navy hover:bg-navy/10'
              }`}
            >
              {day.date.getDate()}
              <span className="mt-0.5 flex gap-0.5" aria-hidden="true">
                {day.events.slice(0, 3).map((event) => (
                  <span
                    key={event.id}
                    className={`h-1 w-1 rounded-full ${
                      isSelected ? 'bg-cream' : CATEGORY_STYLES[event.category].dot
                    }`}
                  />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-8 border-t border-navy/10 pt-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-navy/50">
            {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          {selectedEvents.length === 0 ? (
            <p className="mt-3 text-sm text-navy/50">Nothing scheduled on this day yet.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-3">
              {selectedEvents.map((event) => (
                <li key={event.id}>
                  <button
                    type="button"
                    onClick={() => onSelectEvent(event)}
                    className="text-left text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold"
                  >
                    {event.title}
                  </button>
                  <span className="ml-2 text-sm text-navy/50">{formatEventDate(event)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
