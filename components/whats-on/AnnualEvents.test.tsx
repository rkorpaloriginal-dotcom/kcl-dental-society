import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnnualEvents } from './AnnualEvents';

describe('AnnualEvents', () => {
  it('renders every recurring tradition with its month', () => {
    render(<AnnualEvents />);
    expect(screen.getByText('Freshers\' Week')).toBeInTheDocument();
    expect(screen.getByText(/September/)).toBeInTheDocument();
    expect(screen.getByText('Summer Ball')).toBeInTheDocument();
    expect(screen.getByText(/June/)).toBeInTheDocument();
  });
});
