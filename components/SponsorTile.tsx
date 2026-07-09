import type { Sponsor } from '@/data/types';

export function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const isDiamond = sponsor.tier === 'diamond';

  if (isDiamond) {
    return (
      <div className="bg-navy px-8 py-12 text-cream md:px-16 md:py-20">
        {sponsor.link ? (
          <a
            href={sponsor.link}
            className="font-display text-4xl text-cream transition-colors duration-300 ease-expo-out hover:text-gold md:text-6xl"
          >
            {sponsor.name}
          </a>
        ) : (
          <span className="font-display text-4xl text-cream md:text-6xl">{sponsor.name}</span>
        )}
        {sponsor.description && (
          <p className="mt-4 max-w-xl text-cream/80">{sponsor.description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center border-t-2 border-navy py-8 text-center">
      {sponsor.link ? (
        <a href={sponsor.link} className="text-navy hover:text-gold">
          <span className="font-display text-lg">{sponsor.name}</span>
        </a>
      ) : (
        <span className="font-display text-lg text-navy">{sponsor.name}</span>
      )}
      {sponsor.description && <p className="mt-3 text-sm text-body">{sponsor.description}</p>}
    </div>
  );
}
