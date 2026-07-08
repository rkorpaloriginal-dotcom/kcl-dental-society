import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventCard } from './EventCard';

const category = {
  slug: 'boat-party',
  name: 'Boat Party',
  description: 'Set sail on the Thames.',
  image: '/images/events/boat-party.jpg',
};

describe('EventCard', () => {
  it('renders the category name, description, and an image with matching alt text', () => {
    render(<EventCard category={category} />);
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
    expect(screen.getByText('Set sail on the Thames.')).toBeInTheDocument();
    expect(screen.getByAltText('Boat Party')).toBeInTheDocument();
  });
});
