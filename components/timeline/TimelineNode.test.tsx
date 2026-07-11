import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TimelineNode } from './TimelineNode';

describe('TimelineNode', () => {
  it('renders a gold node with a blurred glow layer and a cream inner highlight', () => {
    const { container } = render(<TimelineNode />);
    expect(container.querySelector('.blur-md')).toBeInTheDocument();
    expect(container.querySelector('.bg-cream')).toBeInTheDocument();
  });
});
