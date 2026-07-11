import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WeekStrip } from './WeekStrip';
import type { WhatsOnEvent } from '@/data/types';

const REFERENCE_DATE = new Date(2026, 6, 11); // Saturday 11 July 2026

const events: WhatsOnEvent[] = [
  {
    id: 'sat-event',
    title: 'Clinical Skills Workshop',
    description: 'desc',
    category: 'academic',
    startDate: '2026-07-11',
    time: '18:00',
    coverImage: '/images/events/workshops.jpg',
    status: 'upcoming',
  },
];

describe('WeekStrip', () => {
  it('renders all seven days with today highlighted', () => {
    render(<WeekStrip events={events} onSelectEvent={() => {}} now={REFERENCE_DATE} />);
    expect(screen.getAllByText('SAT')[0]).toBeInTheDocument();
    expect(screen.getByText('· Today')).toBeInTheDocument();
  });

  it('places an event under its matching day', () => {
    render(<WeekStrip events={events} onSelectEvent={() => {}} now={REFERENCE_DATE} />);
    expect(screen.getByText('Clinical Skills Workshop')).toBeInTheDocument();
  });

  it('calls onSelectEvent when an event is clicked', () => {
    const onSelectEvent = vi.fn();
    render(<WeekStrip events={events} onSelectEvent={onSelectEvent} now={REFERENCE_DATE} />);
    fireEvent.click(screen.getByText('Clinical Skills Workshop'));
    expect(onSelectEvent).toHaveBeenCalledWith(events[0]);
  });
});
