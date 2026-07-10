import { describe, it, expect } from 'vitest';
import { TIMELINE_MILESTONES } from './timeline';

describe('TIMELINE_MILESTONES', () => {
  it('has exactly 5 real historical milestones, in chronological order', () => {
    expect(TIMELINE_MILESTONES).toHaveLength(5);
    expect(TIMELINE_MILESTONES.map((m) => m.year)).toEqual([
      '1839',
      '1860',
      '1894',
      '1998',
      'Present Day',
    ]);
  });

  it('every milestone has a non-empty title and body', () => {
    TIMELINE_MILESTONES.forEach((milestone) => {
      expect(milestone.title.length).toBeGreaterThan(0);
      expect(milestone.body.length).toBeGreaterThan(0);
    });
  });

  it("the founding milestone matches the Society's real founding year", () => {
    const founding = TIMELINE_MILESTONES.find((m) => m.year === '1894');
    expect(founding?.title).toMatch(/dental society founded/i);
  });
});
