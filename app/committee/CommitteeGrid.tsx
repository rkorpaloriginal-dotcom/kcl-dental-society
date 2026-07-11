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
    <div className="divide-y divide-navy/15">
      {GROUP_ORDER.map((group, groupIndex) => {
        const members = COMMITTEE.filter((member) => member.group === group);
        if (members.length === 0) return null;
        return (
          <section
            key={group}
            className="grid grid-cols-1 gap-8 py-14 md:grid-cols-[minmax(0,220px)_1fr] md:gap-12 first:pt-0"
          >
            <div className="md:sticky md:top-24 md:self-start">
              <span className="font-display text-sm italic text-gold">
                {String(groupIndex + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-1 font-display text-2xl text-navy">{group}</h2>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-body/60">
                {members.length} {members.length === 1 ? 'member' : 'members'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {members.map((member) => (
                <RevealOnScroll key={`${member.name}-${member.role}`} variant="clip">
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
