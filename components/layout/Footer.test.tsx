import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('shows a real contact email, not a placeholder', () => {
    render(<Footer />);
    expect(
      screen.getByRole('link', { name: /kingsdentalsociety@gmail\.com/i })
    ).toHaveAttribute('href', 'mailto:kingsdentalsociety@gmail.com');
  });

  it('repeats the main nav links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('link', { name: 'Committee' })).toHaveAttribute('href', '/committee');
    expect(screen.getByRole('link', { name: 'Sponsors' })).toHaveAttribute('href', '/sponsors');
  });

  it('does not contain leftover scaffold branding text', () => {
    render(<Footer />);
    expect(screen.queryByText(/lovable/i)).not.toBeInTheDocument();
  });

  it('adds a Join nav link alongside the existing three', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Join' })).toHaveAttribute('href', '/join');
  });

  it('has a real closing CTA into /join, not a placeholder', () => {
    render(<Footer />);
    const cta = screen.getByRole('link', {
      name: /join the next generation of king's dentists/i,
    });
    expect(cta).toHaveAttribute('href', '/join');
  });

  it('displays real sponsor logos, not fabricated ones', () => {
    render(<Footer />);
    expect(screen.getByAltText('MDDUS')).toBeInTheDocument();
    expect(screen.getByAltText('Oralieve')).toBeInTheDocument();
  });
});
