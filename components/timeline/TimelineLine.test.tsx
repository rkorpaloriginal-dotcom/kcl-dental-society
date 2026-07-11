import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { useMotionValue } from 'framer-motion';
import { TimelineLine } from './TimelineLine';

function Harness({ reducedMotion }: { reducedMotion: boolean }) {
  const progress = useMotionValue(0.5);
  return <TimelineLine progress={progress} reducedMotion={reducedMotion} />;
}

describe('TimelineLine', () => {
  it('renders a track and a fill element', () => {
    const { getByTestId } = render(<Harness reducedMotion={false} />);
    expect(getByTestId('timeline-line-track')).toBeInTheDocument();
    expect(getByTestId('timeline-line-fill')).toBeInTheDocument();
  });

  it('renders fully drawn (scaleY 1) when reduced motion is requested, ignoring scroll progress', () => {
    const { getByTestId } = render(<Harness reducedMotion={true} />);
    const fill = getByTestId('timeline-line-fill');
    expect(fill.style.transform).toContain('scaleY(1)');
  });
});
