import { COMMITTEE } from '@/data/committee';
import type { CommitteeGroup } from '@/data/types';
import { CommitteeCard } from '@/components/CommitteeCard';

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
            <h2 className="mb-6 text-center font-display text-2xl text-navy">{group}</h2>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {members.map((member) => (
                <CommitteeCard key={`${member.name}-${member.role}`} member={member} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
