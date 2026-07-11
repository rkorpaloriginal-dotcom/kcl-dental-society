import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('has a real Join link, not a dead button', () => {
    render(<Home />);
    const joinLink = screen.getByRole('link', { name: 'Join' });
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

  it('introduces the Our Legacy timeline with real Society history and a Join the Society CTA', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'Our Legacy' })).toBeInTheDocument();
    expect(screen.getByText('1894')).toBeInTheDocument();
    const legacyCta = screen.getByRole('link', { name: /join the society/i });
    expect(legacyCta).toHaveAttribute('href', '/join');
  });

  it('features the headline membership and history stats', () => {
    render(<Home />);
    expect(screen.getByText('130+')).toBeInTheDocument();
    expect(screen.getByText(/years of society history/i)).toBeInTheDocument();
    expect(screen.getByText('1000+')).toBeInTheDocument();
    expect(screen.getByText(/members across the school/i)).toBeInTheDocument();
  });
});
