import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventsTabs } from './EventsTabs';

describe('EventsTabs', () => {
  it('shows all 8 event categories immediately under "What We Run"', () => {
    render(<EventsTabs />);
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
    expect(screen.getByText('Formals')).toBeInTheDocument();
    expect(screen.getByText('Talks')).toBeInTheDocument();
  });

  it('switches to a real "no upcoming events yet" message on the Upcoming tab, never a blank page', () => {
    render(<EventsTabs />);
    fireEvent.click(screen.getByRole('tab', { name: 'Upcoming' }));
    expect(screen.getByText(/no upcoming events/i)).toBeInTheDocument();
    expect(screen.queryByText('Boat Party')).not.toBeInTheDocument();
  });

  it('switches back to What We Run', () => {
    render(<EventsTabs />);
    fireEvent.click(screen.getByRole('tab', { name: 'Upcoming' }));
    fireEvent.click(screen.getByRole('tab', { name: 'What We Run' }));
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
  });
});
