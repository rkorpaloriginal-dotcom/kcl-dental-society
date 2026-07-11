import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrbitingLogos } from './OrbitingLogos';
import type { Sponsor } from '@/data/types';

describe('OrbitingLogos', () => {
  it('renders a real, labeled, focusable control for every sponsor', () => {
    const partners: Sponsor[] = [
      { name: 'Oralieve', tier: 'partner', logo: '/images/sponsors/oralieve.png' },
      { name: 'Curaden', tier: 'partner', logo: '/images/sponsors/curaden.png' },
    ];
    render(<OrbitingLogos sponsors={partners} />);
    expect(screen.getByRole('button', { name: 'Oralieve' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Curaden' })).toBeInTheDocument();
  });

  it('shows a detail card with the sponsor name when a logo receives focus', () => {
    render(
      <OrbitingLogos
        sponsors={[{ name: 'Curaden', tier: 'partner', logo: '/images/sponsors/curaden.png' }]}
      />
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Curaden' }));
    expect(screen.getByText('Curaden')).toBeInTheDocument();
  });

  it('does not fabricate a description or link when none exist on the sponsor', () => {
    render(
      <OrbitingLogos
        sponsors={[{ name: 'Curaden', tier: 'partner', logo: '/images/sponsors/curaden.png' }]}
      />
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Curaden' }));
    expect(screen.queryByText(/visit website/i)).not.toBeInTheDocument();
  });

  it('shows the real description and website link when they exist on the sponsor', () => {
    render(
      <OrbitingLogos
        sponsors={[
          {
            name: 'MDDUS',
            tier: 'partner',
            logo: '/images/sponsors/mddus.png',
            description: 'Medico-legal support.',
            link: 'https://example.com',
          },
        ]}
      />
    );
    fireEvent.focus(screen.getByRole('button', { name: 'MDDUS' }));
    expect(screen.getByText('Medico-legal support.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit website/i })).toHaveAttribute(
      'href',
      'https://example.com'
    );
  });
});
