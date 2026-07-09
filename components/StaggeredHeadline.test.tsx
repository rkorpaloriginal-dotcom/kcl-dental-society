// components/StaggeredHeadline.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StaggeredHeadline } from './StaggeredHeadline';

describe('StaggeredHeadline', () => {
  it('renders every word of the text', () => {
    const { container } = render(<StaggeredHeadline text="King's College London" />);
    expect(container.textContent).toContain("King's");
    expect(container.textContent).toContain('College');
    expect(container.textContent).toContain('London');
  });

  it('applies an increasing animation-delay per word so the reveal is staggered, not simultaneous', () => {
    const { container } = render(<StaggeredHeadline text="One Two Three" />);
    const wordSpans = Array.from(container.querySelectorAll('span[style]')) as HTMLElement[];
    const delays = wordSpans.map((el) => el.style.animationDelay);
    expect(delays).toEqual(['0ms', '80ms', '160ms']);
  });

  it('renders as the tag specified by the "as" prop, defaulting to span', () => {
    const { container } = render(<StaggeredHeadline text="Hello" />);
    expect(container.querySelector('span')).toBeInTheDocument();
    expect(container.querySelector('h1')).not.toBeInTheDocument();

    const { container: container2 } = render(<StaggeredHeadline text="Hello" as="h1" />);
    expect(container2.querySelector('h1')).toBeInTheDocument();
  });
});
