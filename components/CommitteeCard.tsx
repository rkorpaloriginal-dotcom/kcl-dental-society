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

export function CommitteeCard({ member }: { member: CommitteeMember }) {
  return (
    <div className="flex flex-col items-center text-center">
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-navy font-display text-lg text-white">
          {initials(member.name)}
        </div>
      )}
      <p className="mt-2 font-semibold text-navy">{member.name}</p>
      <p className="text-sm text-body">{member.role}</p>
    </div>
  );
}
