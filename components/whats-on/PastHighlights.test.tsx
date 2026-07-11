import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PastHighlights } from './PastHighlights';

describe('PastHighlights', () => {
  it('renders every highlight title', () => {
    render(<PastHighlights />);
    expect(screen.getByText('Sports Day')).toBeInTheDocument();
    expect(screen.getByText('Winter Ball')).toBeInTheDocument();
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
    expect(screen.getByText('Charity Week')).toBeInTheDocument();
  });

  it('shows the raised-funds statistic for Sports Day', () => {
    render(<PastHighlights />);
    expect(screen.getByText('£4,300')).toBeInTheDocument();
    expect(screen.getAllByText('Raised').length).toBeGreaterThan(0);
  });
});
