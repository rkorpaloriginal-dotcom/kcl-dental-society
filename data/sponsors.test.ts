import { describe, it, expect } from 'vitest';
import { SPONSORS } from './sponsors';

describe('SPONSORS', () => {
  it('has exactly one diamond tier sponsor', () => {
    const diamonds = SPONSORS.filter((s) => s.tier === 'diamond');
    expect(diamonds).toHaveLength(1);
    expect(diamonds[0].name).toBe('MDDUS');
    expect(diamonds[0].description?.length).toBeGreaterThan(0);
  });

  it('has at least 6 partner tier sponsors', () => {
    const partners = SPONSORS.filter((s) => s.tier === 'partner');
    expect(partners.length).toBeGreaterThanOrEqual(6);
  });
});
