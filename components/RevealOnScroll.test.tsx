import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RevealOnScroll } from './RevealOnScroll';

describe('RevealOnScroll', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it('uses a custom expo-out easing curve, never Tailwind default ease/linear', () => {
    render(
      <RevealOnScroll>
        <p>Real content</p>
      </RevealOnScroll>
    );
    const wrapper = screen.getByText('Real content').parentElement;
    expect(wrapper?.className).toContain('ease-expo-out');
  });

  it('defaults to the fade variant, unaffected by the new clip variant', () => {
    render(
      <RevealOnScroll>
        <p>Real content</p>
      </RevealOnScroll>
    );
    const wrapper = screen.getByText('Real content').parentElement;
    expect(wrapper?.className).toContain('opacity-100');
    expect(wrapper?.className).not.toContain('clip-path');
  });

  it('clip variant renders fully unclipped and visible before any intersection has occurred', () => {
    render(
      <RevealOnScroll variant="clip">
        <p>Real content</p>
      </RevealOnScroll>
    );
    const wrapper = screen.getByText('Real content').parentElement;
    expect(wrapper?.className).toContain('[clip-path:inset(0_0_0%_0)]');
    expect(wrapper?.className).not.toContain('opacity-0');
  });

  it('does not hide already-rendered content after a non-intersecting observer callback', () => {
    let callback: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();

    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((cb: IntersectionObserverCallback) => {
        callback = cb;
        return {
          observe,
          unobserve: vi.fn(),
          disconnect,
          takeRecords: () => [],
          root: null,
          rootMargin: '',
          thresholds: [],
        };
      })
    );

    render(
      <RevealOnScroll>
        <p>Real content</p>
      </RevealOnScroll>
    );

    callback?.(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    const wrapper = screen.getByText('Real content').parentElement;
    expect(wrapper?.className).toContain('opacity-100');
    expect(wrapper?.className).not.toContain('opacity-0');
    expect(disconnect).not.toHaveBeenCalled();
  });
});
