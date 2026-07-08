import { describe, it, expect } from 'vitest';
import { COMMITTEE } from './committee';

describe('COMMITTEE', () => {
  it('has at least 35 members', () => {
    expect(COMMITTEE.length).toBeGreaterThanOrEqual(35);
  });

  it('every member has a name, role, and valid group', () => {
    const validGroups = new Set([
      'Leadership',
      'Officers',
      'Events Team',
      'Year Representatives',
      'Affiliated',
    ]);
    for (const member of COMMITTEE) {
      expect(member.name.length).toBeGreaterThan(0);
      expect(member.role.length).toBeGreaterThan(0);
      expect(validGroups.has(member.group)).toBe(true);
    }
  });

  it('includes the President and Staff President', () => {
    const roles = COMMITTEE.map((m) => m.role);
    expect(roles).toContain('President');
    expect(roles).toContain('Staff President');
  });
});
