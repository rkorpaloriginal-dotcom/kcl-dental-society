import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnnualEvents } from './AnnualEvents';

describe('AnnualEvents', () => {
  it('renders every recurring tradition with its month', () => {
    render(<AnnualEvents />);
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
    expect(screen.getByText(/September/)).toBeInTheDocument();
    expect(screen.getByText('Graduation & Formals')).toBeInTheDocument();
    expect(screen.getAllByText(/June/).length).toBeGreaterThan(0);
  });
});
