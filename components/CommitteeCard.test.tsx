import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommitteeCard } from './CommitteeCard';

describe('CommitteeCard', () => {
  it('renders name and role when a photo is provided', () => {
    render(<CommitteeCard member={{ name: 'Aman Aziz', role: 'President', group: 'Leadership', photo: '/images/committee/aman-aziz.jpg' }} />);
    expect(screen.getByText('Aman Aziz')).toBeInTheDocument();
    expect(screen.getByText('President')).toBeInTheDocument();
    expect(screen.getByAltText('Aman Aziz')).toBeInTheDocument();
  });

  it('renders a uniform initials placeholder when no photo is provided, not a mixed graphic', () => {
    render(<CommitteeCard member={{ name: 'Raveena Dheer', role: 'Vice-President', group: 'Leadership' }} />);
    expect(screen.getByText('Raveena Dheer')).toBeInTheDocument();
    expect(screen.getByText('RD')).toBeInTheDocument();
  });
});
