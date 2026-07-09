import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommitteePortrait } from './CommitteePortrait';

describe('CommitteePortrait', () => {
  it('renders the photo with the member name as alt text, plus a visible name/role caption', () => {
    render(
      <CommitteePortrait
        member={{
          name: 'Aman Aziz',
          role: 'President',
          group: 'Leadership',
          photo: '/images/committee/aman-aziz.jpg',
        }}
      />
    );
    const img = screen.getByAltText('Aman Aziz');
    expect(img).toHaveAttribute('src', '/images/committee/aman-aziz.jpg');
    expect(screen.getByText('President')).toBeInTheDocument();
  });

  it('falls back to a uniform initials mark when no photo is set, never a broken image', () => {
    render(
      <CommitteePortrait
        member={{ name: 'Raveena Dheer', role: 'Vice-President', group: 'Leadership' }}
      />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('RD')).toBeInTheDocument();
    expect(screen.getByText('Raveena Dheer')).toBeInTheDocument();
  });
});
