import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from './Timeline';

describe('Timeline', () => {
  it('renders the "Our Legacy" heading and every milestone year', () => {
    render(<Timeline />);
    expect(screen.getByRole('heading', { name: 'Our Legacy' })).toBeInTheDocument();
    ['1839', '1860', '1894', '1998', 'Present Day'].forEach((year) => {
      expect(screen.getByText(year)).toBeInTheDocument();
    });
  });

  it('closes with a real "Join the Society" CTA linking to /join', () => {
    render(<Timeline />);
    const cta = screen.getByRole('link', { name: /join the society/i });
    expect(cta).toHaveAttribute('href', '/join');
  });

  it('uses the brand navy background', () => {
    const { container } = render(<Timeline />);
    expect(container.querySelector('section')?.className).toContain('bg-navy');
  });
});
