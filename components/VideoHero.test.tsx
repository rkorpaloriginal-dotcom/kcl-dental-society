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

  it('renders all four stat cards with accessible group labels', () => {
    render(<VideoHero />);
    expect(
      screen.getByRole('group', { name: /130\+ years of society history/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: /1000\+ members across the school/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /40\+ annual events/i })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /industry sponsors/i })).toBeInTheDocument();
  });
});
