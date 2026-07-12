import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { WhatsOnExperience } from './WhatsOnExperience';

describe('WhatsOnExperience', () => {
  it('renders the featured event, filter bar, and upcoming timeline together', () => {
    render(<WhatsOnExperience />);
    expect(screen.getByText('Featured Event')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /filter events/i })).toBeInTheDocument();
    expect(screen.getByText("What's Coming Next")).toBeInTheDocument();
  });

  it('filtering to Sports hides non-sports events from the timeline', () => {
    render(<WhatsOnExperience />);
    const filterGroup = screen.getByRole('group', { name: /filter events/i });
    fireEvent.click(within(filterGroup).getByRole('button', { name: 'Sports' }));
    expect(screen.getByText('Sports Day')).toBeInTheDocument();
    expect(screen.queryByText('Freshers\' Fair')).not.toBeInTheDocument();
  });

  it('clicking an upcoming event card opens the drawer with its details', () => {
    render(<WhatsOnExperience />);
    fireEvent.click(screen.getByText('Sports Day'));
    expect(screen.getByRole('dialog', { name: 'Sports Day' })).toBeInTheDocument();
  });
});
