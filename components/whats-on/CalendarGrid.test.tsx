import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarGrid } from './CalendarGrid';
import type { WhatsOnEvent } from '@/data/types';

const NOW = new Date(2026, 10, 1); // 1 November 2026

const events: WhatsOnEvent[] = [
  {
    id: 'nov-event',
    title: 'Clinical Photography Workshop',
    description: 'desc',
    category: 'academic',
    startDate: '2026-11-15',
    coverImage: '/images/events/workshops.jpg',
    status: 'upcoming',
  },
];

describe('CalendarGrid', () => {
  it('shows the current month label', () => {
    render(<CalendarGrid events={events} onSelectEvent={() => {}} now={NOW} />);
    expect(screen.getByText('November 2026')).toBeInTheDocument();
  });

  it('navigates to the next month', () => {
    render(<CalendarGrid events={events} onSelectEvent={() => {}} now={NOW} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('December 2026')).toBeInTheDocument();
  });

  it('selecting a day with an event lists it below, and clicking it selects the event', () => {
    const onSelectEvent = vi.fn();
    render(<CalendarGrid events={events} onSelectEvent={onSelectEvent} now={NOW} />);
    fireEvent.click(screen.getByRole('button', { name: /Sun Nov 15 2026/ }));
    const link = screen.getByText('Clinical Photography Workshop');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(onSelectEvent).toHaveBeenCalledWith(events[0]);
  });

  it('shows an empty message for a day with nothing scheduled', () => {
    render(<CalendarGrid events={events} onSelectEvent={() => {}} now={NOW} />);
    fireEvent.click(screen.getByRole('button', { name: /Mon Nov 02 2026/ }));
    expect(screen.getByText(/nothing scheduled/i)).toBeInTheDocument();
  });
});
