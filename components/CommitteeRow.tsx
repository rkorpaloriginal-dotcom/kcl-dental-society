import type { CommitteeMember } from '@/data/types';

export function CommitteeRow({ member, index }: { member: CommitteeMember; index: number }) {
  return (
    <li className="flex items-baseline justify-between gap-4 border-b border-navy/15 py-3">
      <span className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-navy/50">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-display text-lg text-navy">{member.name}</span>
      </span>
      <span className="text-right text-sm uppercase tracking-[0.1em] text-body">
        {member.role}
      </span>
    </li>
  );
}
