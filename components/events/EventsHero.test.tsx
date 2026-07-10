import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventsHero } from './EventsHero';

describe('EventsHero', () => {
  it('uses professional programme language instead of informal night-led copy', () => {
    const { container } = render(<EventsHero />);
    const text = container.textContent?.replace(/\s+/g, ' ') ?? '';

    expect(text).toContain('A full programme, all year round.');
    expect(screen.getByText('Events a year')).toBeInTheDocument();
    expect(text).not.toMatch(/every kind of night/i);
    expect(text).not.toMatch(/nights a year/i);
  });
});
