import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EventDrawer } from './EventDrawer';
import { WHATS_ON_EVENTS } from '@/data/whats-on';

const boatParty = WHATS_ON_EVENTS.find((e) => e.id === 'boat-party')!;

describe('EventDrawer', () => {
  it('renders nothing when there is no event', () => {
    render(<EventDrawer event={null} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows the event details when an event is provided', () => {
    render(<EventDrawer event={boatParty} onClose={() => {}} />);
    const dialog = screen.getByRole('dialog', { name: 'Boat Party' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Thames Party Boat, Embankment Pier')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get Tickets' })).toHaveAttribute(
      'href',
      boatParty.registrationUrl
    );
  });

  it('closes when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<EventDrawer event={boatParty} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on Escape key', () => {
    const onClose = vi.fn();
    render(<EventDrawer event={boatParty} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('closes when clicking the backdrop outside the panel', () => {
    const onClose = vi.fn();
    render(<EventDrawer event={boatParty} onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalled();
  });
});
