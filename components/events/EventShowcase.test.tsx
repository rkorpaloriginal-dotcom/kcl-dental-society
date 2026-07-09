import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { EventShowcase } from './EventShowcase';
import { EVENT_CATEGORIES } from '@/data/events';

describe('EventShowcase', () => {
  it('shows all 8 event categories immediately', () => {
    render(<EventShowcase categories={EVENT_CATEGORIES} />);
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
    expect(screen.getByText('Formals')).toBeInTheDocument();
    expect(screen.getByText('Talks')).toBeInTheDocument();
  });

  it('opens a detail dialog with the full description when a tile is clicked', () => {
    render(<EventShowcase categories={EVENT_CATEGORIES} />);
    fireEvent.click(screen.getByRole('button', { name: 'View details for Boat Party' }));
    const dialog = screen.getByRole('dialog', { name: 'Boat Party' });
    expect(within(dialog).getByText(/set sail on the thames/i)).toBeInTheDocument();
  });

  it('closes the detail dialog when the close button is clicked', () => {
    render(<EventShowcase categories={EVENT_CATEGORIES} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    return waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
