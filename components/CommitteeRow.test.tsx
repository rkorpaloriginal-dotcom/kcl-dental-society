import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommitteeRow } from './CommitteeRow';

describe('CommitteeRow', () => {
  it('renders name, role, and a numbered index, with no avatar image', () => {
    render(
      <ul>
        <CommitteeRow
          member={{ name: 'Aman Aziz', role: 'President', group: 'Leadership' }}
          index={0}
        />
      </ul>
    );
    expect(screen.getByText('Aman Aziz')).toBeInTheDocument();
    expect(screen.getByText('President')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('pads the index to two digits for indices past 9', () => {
    render(
      <ul>
        <CommitteeRow
          member={{ name: 'Hfsa Fahad', role: "Kings' Crown Chief Editor", group: 'Affiliated' }}
          index={12}
        />
      </ul>
    );
    expect(screen.getByText('13')).toBeInTheDocument();
  });
});
