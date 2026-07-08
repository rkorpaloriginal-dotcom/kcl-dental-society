import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('has a real Join link, not a dead button', () => {
    render(<Home />);
    const joinLink = screen.getByRole('link', { name: /join/i });
    expect(joinLink.getAttribute('href')).not.toBe('#');
    expect(joinLink.getAttribute('href')).toBeTruthy();
  });

  it('teases the Events, Committee, and Sponsors pages with real links', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /explore events/i })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('link', { name: /meet the committee/i })).toHaveAttribute('href', '/committee');
    expect(screen.getByRole('link', { name: /our sponsors/i })).toHaveAttribute('href', '/sponsors');
  });

  it('does not contain leftover scaffold branding text', () => {
    render(<Home />);
    expect(screen.queryByText(/lovable/i)).not.toBeInTheDocument();
  });
});
