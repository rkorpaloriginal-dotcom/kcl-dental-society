import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCounter } from './StatCounter';

describe('StatCounter', () => {
  it('renders the final value and label immediately', () => {
    render(<StatCounter value={130} suffix="+" label="Years of Society History" />);
    expect(screen.getByText('130+')).toBeInTheDocument();
    expect(screen.getByText('Years of Society History')).toBeInTheDocument();
  });

  it('exposes a single accessible group label combining value and description', () => {
    render(<StatCounter value={1000} suffix="+" label="Members Across the School" />);
    expect(
      screen.getByRole('group', { name: '1000+ Members Across the School' })
    ).toBeInTheDocument();
  });

  it('renders a stat with no suffix cleanly', () => {
    render(<StatCounter value={7} suffix="" label="Industry Sponsors" />);
    expect(screen.getByRole('group', { name: '7 Industry Sponsors' })).toBeInTheDocument();
  });
});
