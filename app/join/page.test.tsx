import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import JoinPage from './page';

describe('Join page', () => {
  it('links out to the real KCLSU membership signup', () => {
    render(<JoinPage />);
    const link = screen.getByRole('link', { name: /kclsu/i });
    expect(link).toHaveAttribute(
      'href',
      'https://www.kclsu.org/groups/activities/join/group/kcl_dental_society/'
    );
  });

  it('links out to the Society App', () => {
    render(<JoinPage />);
    expect(screen.getByRole('link', { name: /society app/i })).toHaveAttribute(
      'href',
      'https://go.link2app.co/QlZx6wiDP0b'
    );
  });
});
