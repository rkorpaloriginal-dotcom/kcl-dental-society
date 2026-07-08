import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RevealOnScroll } from './RevealOnScroll';

describe('RevealOnScroll', () => {
  it('renders children immediately, visible, before any intersection has occurred', () => {
    render(
      <RevealOnScroll>
        <p>Real content</p>
      </RevealOnScroll>
    );
    const content = screen.getByText('Real content');
    expect(content).toBeInTheDocument();
    const wrapper = content.parentElement;
    expect(wrapper?.className).toContain('opacity-100');
    expect(wrapper?.className).not.toContain('opacity-0');
  });
});
