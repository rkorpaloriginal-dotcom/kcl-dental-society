import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from './FilterBar';

describe('FilterBar', () => {
  it('renders All plus every category as a tab', () => {
    render(<FilterBar active="all" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Academic' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Wellbeing' })).toBeInTheDocument();
  });

  it('marks the active filter as selected', () => {
    render(<FilterBar active="sports" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: 'Sports' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with the selected category slug', () => {
    const onChange = vi.fn();
    render(<FilterBar active="all" onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Charity' }));
    expect(onChange).toHaveBeenCalledWith('charity');
  });
});
