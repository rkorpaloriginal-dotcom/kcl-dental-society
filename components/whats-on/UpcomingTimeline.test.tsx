import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UpcomingTimeline } from './UpcomingTimeline';
import { WHATS_ON_EVENTS } from '@/data/whats-on';

describe('UpcomingTimeline', () => {
  it('renders a month marker and every event title', () => {
    render(<UpcomingTimeline events={WHATS_ON_EVENTS} onSelectEvent={() => {}} />);
    expect(screen.getByText('Winter Ball')).toBeInTheDocument();
    expect(screen.getByText('December 2026')).toBeInTheDocument();
    expect(screen.getByText('Now')).toBeInTheDocument();
  });

  it('calls onSelectEvent when a card is clicked', () => {
    const onSelectEvent = vi.fn();
    render(<UpcomingTimeline events={WHATS_ON_EVENTS} onSelectEvent={onSelectEvent} />);
    fireEvent.click(screen.getByText('Winter Ball'));
    expect(onSelectEvent).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'winter-ball' })
    );
  });

  it('shows an empty state when there are no events', () => {
    render(<UpcomingTimeline events={[]} onSelectEvent={() => {}} />);
    expect(screen.getByText(/no events match this filter/i)).toBeInTheDocument();
  });
});
