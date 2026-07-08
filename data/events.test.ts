import { describe, it, expect } from 'vitest';
import { EVENT_CATEGORIES } from './events';

describe('EVENT_CATEGORIES', () => {
  it('has exactly 8 event categories', () => {
    expect(EVENT_CATEGORIES).toHaveLength(8);
  });

  it('every category has a non-empty name, description, image, and unique slug', () => {
    const slugs = new Set<string>();
    for (const category of EVENT_CATEGORIES) {
      expect(category.name.length).toBeGreaterThan(0);
      expect(category.description.length).toBeGreaterThan(0);
      expect(category.image.length).toBeGreaterThan(0);
      expect(slugs.has(category.slug)).toBe(false);
      slugs.add(category.slug);
    }
  });

  it('includes the Boat Party and Talks categories from the current site', () => {
    const names = EVENT_CATEGORIES.map((c) => c.name);
    expect(names).toContain('Boat Party');
    expect(names).toContain('Talks');
  });
});
