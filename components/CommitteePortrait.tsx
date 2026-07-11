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
    <div
      tabIndex={0}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-neutral-950 transition-all duration-500 ease-expo-out hover:-translate-y-1 hover:shadow-xl focus-visible:-translate-y-1 focus-visible:shadow-xl focus-visible:outline-none"
    >
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-[800ms] ease-expo-out group-hover:scale-105 group-focus-visible:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-2xl text-cream">
          {initials(member.name)}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/30 to-transparent p-8 pt-16 transition-colors duration-500 ease-expo-out group-hover:from-black/80 group-focus-visible:from-black/80">
        <p className="translate-y-2 font-display text-lg font-semibold text-white opacity-85 transition-all duration-500 ease-expo-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {member.name}
        </p>
        <p className="mt-1 translate-y-2 text-sm text-white/70 opacity-85 transition-all duration-500 ease-expo-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {member.role}
        </p>
      </div>
    </div>
  );
}
