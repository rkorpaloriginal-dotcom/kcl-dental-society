import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TimelineBackground } from './TimelineBackground';

describe('TimelineBackground', () => {
  it('is purely decorative: hidden from assistive tech and inert to pointer events', () => {
    const { container } = render(<TimelineBackground />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root?.className).toContain('pointer-events-none');
  });

  it('renders the layered gradient, grain, and blueprint-illustration layers', () => {
    const { container } = render(<TimelineBackground />);
    expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(3);
  });
});
