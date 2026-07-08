// components/VideoHero.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoHero } from './VideoHero';

describe('VideoHero', () => {
  it('renders a muted, autoplaying video without native controls', () => {
    const { container } = render(<VideoHero />);
    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('muted');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video).not.toHaveAttribute('controls');
  });

  it('renders the brand tagline over the video', () => {
    render(<VideoHero />);
    expect(screen.getByText('Community · Careers · Culture')).toBeInTheDocument();
  });

  it('renders a custom mute/unmute toggle button, not native controls', () => {
    render(<VideoHero />);
    expect(screen.getByRole('button', { name: /unmute|mute/i })).toBeInTheDocument();
  });
});
