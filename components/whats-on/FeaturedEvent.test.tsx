import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeaturedEvent } from './FeaturedEvent';
import { WHATS_ON_EVENTS } from '@/data/whats-on';

const boatParty = WHATS_ON_EVENTS.find((e) => e.id === 'boat-party')!;

describe('FeaturedEvent', () => {
  it('shows the event title, category, date, and location', () => {
    render(<FeaturedEvent event={boatParty} onViewDetails={() => {}} />);
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
    expect(screen.getByText('Thames Party Boat, Embankment Pier')).toBeInTheDocument();
  });

  it('links the reserve button to the registration URL', () => {
    render(<FeaturedEvent event={boatParty} onViewDetails={() => {}} />);
    expect(screen.getByRole('link', { name: 'Reserve Your Place' })).toHaveAttribute(
      'href',
      boatParty.registrationUrl
    );
  });

  it('calls onViewDetails when "Full details" is clicked', () => {
    const onViewDetails = vi.fn();
    render(<FeaturedEvent event={boatParty} onViewDetails={onViewDetails} />);
    fireEvent.click(screen.getByRole('button', { name: 'Full details' }));
    expect(onViewDetails).toHaveBeenCalledWith(boatParty);
  });
});
