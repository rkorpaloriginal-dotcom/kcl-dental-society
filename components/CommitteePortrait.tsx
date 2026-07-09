import type { CommitteeMember } from '@/data/types';

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function CommitteePortrait({ member }: { member: CommitteeMember }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden bg-navy">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover object-bottom"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-2xl text-cream">
            {initials(member.name)}
          </div>
        )}
      </div>
      <figcaption className="mt-3">
        <p className="font-display text-lg italic text-navy">{member.name}</p>
        <p className="text-xs uppercase tracking-[0.15em] text-body">{member.role}</p>
      </figcaption>
    </figure>
  );
}
