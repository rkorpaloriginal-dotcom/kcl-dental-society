import { COMMITTEE } from '@/data/committee';
import type { CommitteeGroup } from '@/data/types';
import { CommitteeRow } from '@/components/CommitteeRow';

const GROUP_ORDER: CommitteeGroup[] = [
  'Leadership',
  'Officers',
  'Events Team',
  'Year Representatives',
  'Affiliated',
];

export function CommitteeGrid() {
  return (
    <div className="space-y-16">
      {GROUP_ORDER.map((group) => {
        const members = COMMITTEE.filter((member) => member.group === group);
        if (members.length === 0) return null;
        return (
          <section key={group}>
            <h2 className="mb-4 font-display text-2xl text-navy">{group}</h2>
            <ul>
              {members.map((member, index) => (
                <CommitteeRow
                  key={`${member.name}-${member.role}`}
                  member={member}
                  index={index}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
