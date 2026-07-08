import type { Sponsor } from '@/data/types';

export function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const isDiamond = sponsor.tier === 'diamond';

  return (
    <div
      className={
        isDiamond
          ? 'rounded-lg border-2 border-gold bg-navy p-8 text-white'
          : 'flex items-center justify-center rounded-lg border border-navy/10 p-6'
      }
    >
      {sponsor.link ? (
        <a href={sponsor.link} className={isDiamond ? 'text-white hover:text-gold' : 'text-navy hover:text-gold'}>
          <span className="font-display text-lg">{sponsor.name}</span>
        </a>
      ) : (
        <span className={isDiamond ? 'font-display text-lg text-white' : 'font-display text-lg text-navy'}>
          {sponsor.name}
        </span>
      )}
      {sponsor.description && <p className="mt-3 text-sm text-white/90">{sponsor.description}</p>}
    </div>
  );
}
