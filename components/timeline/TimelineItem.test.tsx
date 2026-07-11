import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimelineItem } from './TimelineItem';
import type { TimelineMilestone } from '@/data/timeline';

const milestone: TimelineMilestone = {
  year: '1894',
  title: "King's College London Dental Society founded",
  body: 'The Society is formally established.',
};

describe('TimelineItem', () => {
  it('renders the milestone content in the DOM regardless of animation/inView state', () => {
    render(<TimelineItem milestone={milestone} index={0} />);
    expect(screen.getByText('1894')).toBeInTheDocument();
    expect(screen.getByText("King's College London Dental Society founded")).toBeInTheDocument();
  });

  it('reverses layout for odd-indexed items so cards alternate sides on desktop', () => {
    const { container: leftContainer } = render(<TimelineItem milestone={milestone} index={0} />);
    const { container: rightContainer } = render(<TimelineItem milestone={milestone} index={1} />);
    expect(leftContainer.firstElementChild?.className).not.toContain('md:flex-row-reverse');
    expect(rightContainer.firstElementChild?.className).toContain('md:flex-row-reverse');
  });
});
