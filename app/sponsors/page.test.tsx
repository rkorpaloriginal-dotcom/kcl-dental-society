import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SponsorsPage from './page';

describe('Sponsors page', () => {
  it('features MDDUS as the diamond sponsor with its logo and description', () => {
    render(<SponsorsPage />);
    expect(screen.getByAltText('MDDUS')).toBeInTheDocument();
    expect(screen.getByText(/medico-legal/i)).toBeInTheDocument();
  });

  it('lists partner sponsor logos', () => {
    render(<SponsorsPage />);
    expect(screen.getByAltText('Oralieve')).toBeInTheDocument();
    expect(screen.getByAltText('Curaden')).toBeInTheDocument();
  });

  it('includes the trade fayre stat callout', () => {
    render(<SponsorsPage />);
    expect(screen.getByText(/largest trade fayre/i)).toBeInTheDocument();
  });

  it('has a real Become a Sponsor CTA, not a bare email string', () => {
    render(<SponsorsPage />);
    const cta = screen.getByRole('link', { name: /become a sponsor/i });
    expect(cta).toHaveAttribute('href', expect.stringContaining('mailto:kingsdentalsociety@gmail.com'));
  });
});
