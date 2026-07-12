import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from './FilterBar';

describe('FilterBar', () => {
  it('renders All plus every category as a button', () => {
    render(<FilterBar active="all" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Academic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Wellbeing' })).toBeInTheDocument();
  });

  it('marks the active filter as pressed', () => {
    render(<FilterBar active="sports" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Sports' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange with the selected category slug', () => {
    const onChange = vi.fn();
    render(<FilterBar active="all" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Charity' }));
    expect(onChange).toHaveBeenCalledWith('charity');
  });
});
