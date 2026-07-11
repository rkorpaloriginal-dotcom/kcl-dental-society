import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeaturedEvent } from './FeaturedEvent';
import { WHATS_ON_EVENTS } from '@/data/whats-on';

const winterBall = WHATS_ON_EVENTS.find((e) => e.id === 'winter-ball')!;

describe('FeaturedEvent', () => {
  it('shows the event title, category, date, and location', () => {
    render(<FeaturedEvent event={winterBall} onViewDetails={() => {}} />);
    expect(screen.getByText('Winter Ball')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
    expect(screen.getByText('Royal Lancaster Hotel')).toBeInTheDocument();
  });

  it('links the reserve button to the registration URL', () => {
    render(<FeaturedEvent event={winterBall} onViewDetails={() => {}} />);
    expect(screen.getByRole('link', { name: 'Reserve Your Place' })).toHaveAttribute(
      'href',
      winterBall.registrationUrl
    );
  });

  it('calls onViewDetails when "Full details" is clicked', () => {
    const onViewDetails = vi.fn();
    render(<FeaturedEvent event={winterBall} onViewDetails={onViewDetails} />);
    fireEvent.click(screen.getByRole('button', { name: 'Full details' }));
    expect(onViewDetails).toHaveBeenCalledWith(winterBall);
  });
});
