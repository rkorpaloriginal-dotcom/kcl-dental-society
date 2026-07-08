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
});
