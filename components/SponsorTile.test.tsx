import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SponsorTile } from './SponsorTile';

describe('SponsorTile', () => {
  it('renders a diamond sponsor with its description and a real link', () => {
    render(
      <SponsorTile
        sponsor={{
          name: 'MDDUS',
          tier: 'diamond',
          description: 'Medico-legal support.',
          link: 'mailto:kingsdentalsociety@gmail.com',
        }}
      />
    );
    expect(screen.getByText('MDDUS')).toBeInTheDocument();
    expect(screen.getByText('Diamond Sponsor')).toBeInTheDocument();
    expect(screen.getByText('Medico-legal support.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /MDDUS/i })).toHaveAttribute(
      'href',
      'mailto:kingsdentalsociety@gmail.com'
    );
  });

  it('renders a partner tile with just a name when no description exists', () => {
    render(<SponsorTile sponsor={{ name: 'Oralieve', tier: 'partner' }} />);
    expect(screen.getByText('Oralieve')).toBeInTheDocument();
  });
});
