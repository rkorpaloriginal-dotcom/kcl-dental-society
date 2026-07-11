import { describe, it, expect } from 'vitest';
import { CATEGORY_META, WHATS_ON_EVENTS, ANNUAL_TRADITIONS, PAST_HIGHLIGHTS } from './whats-on';

describe('CATEGORY_META', () => {
  it('defines all six categories with labels and accents', () => {
    expect(CATEGORY_META).toHaveLength(6);
    for (const category of CATEGORY_META) {
      expect(category.label.length).toBeGreaterThan(0);
      expect(category.accent.length).toBeGreaterThan(0);
    }
  });
});

describe('WHATS_ON_EVENTS', () => {
  it('every event has required fields and a unique id', () => {
    const ids = new Set<string>();
    for (const event of WHATS_ON_EVENTS) {
      expect(event.title.length).toBeGreaterThan(0);
      expect(event.description.length).toBeGreaterThan(0);
      expect(event.coverImage.length).toBeGreaterThan(0);
      expect(/^\d{4}-\d{2}-\d{2}$/.test(event.startDate)).toBe(true);
      expect(ids.has(event.id)).toBe(false);
      ids.add(event.id);
    }
  });

  it('references only known category slugs', () => {
    const slugs = new Set(CATEGORY_META.map((c) => c.slug));
    for (const event of WHATS_ON_EVENTS) {
      expect(slugs.has(event.category)).toBe(true);
    }
  });

  it('has exactly one featured event', () => {
    const featured = WHATS_ON_EVENTS.filter((event) => event.featured);
    expect(featured).toHaveLength(1);
  });
});

describe('ANNUAL_TRADITIONS', () => {
  it('has six recurring traditions with unique slugs', () => {
    expect(ANNUAL_TRADITIONS).toHaveLength(6);
    const slugs = new Set(ANNUAL_TRADITIONS.map((t) => t.slug));
    expect(slugs.size).toBe(6);
  });
});

describe('PAST_HIGHLIGHTS', () => {
  it('every highlight has at least one statistic', () => {
    for (const highlight of PAST_HIGHLIGHTS) {
      expect(highlight.stats.length).toBeGreaterThan(0);
    }
  });
});
