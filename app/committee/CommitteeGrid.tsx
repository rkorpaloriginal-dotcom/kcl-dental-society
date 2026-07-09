import { COMMITTEE } from '@/data/committee';
import type { CommitteeGroup } from '@/data/types';
import { CommitteePortrait } from '@/components/CommitteePortrait';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const GROUP_ORDER: CommitteeGroup[] = [
  'Leadership',
  'Officers',
  'Events Team',
  'Year Representatives',
  'Affiliated',
];

export function CommitteeGrid() {
  return (
    <div className="space-y-20">
      {GROUP_ORDER.map((group) => {
        const members = COMMITTEE.filter((member) => member.group === group);
        if (members.length === 0) return null;
        return (
          <section key={group}>
            <h2 className="mb-6 font-display text-2xl text-navy">{group}</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {members.map((member, index) => (
                <RevealOnScroll
                  key={`${member.name}-${member.role}`}
                  variant="clip"
                  className={index % 5 === 0 ? 'sm:col-span-2' : ''}
                >
                  <CommitteePortrait member={member} />
                </RevealOnScroll>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
