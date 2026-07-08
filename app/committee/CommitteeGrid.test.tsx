import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommitteeGrid } from './CommitteeGrid';

describe('CommitteeGrid', () => {
  it('renders every committee member in one page, not paginated behind a carousel', () => {
    render(<CommitteeGrid />);
    expect(screen.getByText('Aman Aziz')).toBeInTheDocument();
    expect(screen.getByText('Hfsa Fahad')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
  });

  it('groups members under section headings', () => {
    render(<CommitteeGrid />);
    expect(screen.getByRole('heading', { name: 'Leadership' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Year Representatives' })).toBeInTheDocument();
  });
});
