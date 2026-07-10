import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimelineCard } from './TimelineCard';
import type { TimelineMilestone } from '@/data/timeline';

const baseMilestone: TimelineMilestone = {
  year: '1894',
  title: "King's College London Dental Society founded",
  body: 'The Society is formally established.',
};

describe('TimelineCard', () => {
  it('renders the year, title, and body', () => {
    render(<TimelineCard milestone={baseMilestone} />);
    expect(screen.getByText('1894')).toBeInTheDocument();
    expect(screen.getByText("King's College London Dental Society founded")).toBeInTheDocument();
    expect(screen.getByText('The Society is formally established.')).toBeInTheDocument();
  });

  it('does not render optional-field UI when those fields are absent', () => {
    const { container } = render(<TimelineCard milestone={baseMilestone} />);
    expect(container.querySelector('blockquote')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders a statistic when provided', () => {
    render(<TimelineCard milestone={{ ...baseMilestone, statistic: '1,000+ members' }} />);
    expect(screen.getByText('1,000+ members')).toBeInTheDocument();
  });
});
