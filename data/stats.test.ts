import { describe, it, expect } from 'vitest';
import { STATS } from './stats';
import { SPONSORS } from './sponsors';

describe('STATS', () => {
  it('has exactly 4 stat cards', () => {
    expect(STATS).toHaveLength(4);
  });

  it('every stat has a positive value and a non-empty label', () => {
    STATS.forEach((stat) => {
      expect(stat.value).toBeGreaterThan(0);
      expect(stat.label.length).toBeGreaterThan(0);
    });
  });

  it('includes the headline history and membership figures', () => {
    expect(STATS.find((s) => s.label === 'Years of Society History')?.value).toBe(130);
    expect(STATS.find((s) => s.label === 'Members Across the School')?.value).toBe(1000);
  });

  it('derives the sponsor count from the sponsors data module', () => {
    const sponsorStat = STATS.find((s) => s.label === 'Industry Sponsors');
    expect(sponsorStat?.value).toBe(SPONSORS.length);
  });
});
