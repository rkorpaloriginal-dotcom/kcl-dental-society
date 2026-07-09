import type { Sponsor } from '@/data/types';

export function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const isDiamond = sponsor.tier === 'diamond';

  if (isDiamond) {
    const content = (
      <>
        <span className="inline-flex items-center justify-center rounded-2xl bg-cream px-10 py-6">
          {sponsor.logo ? (
            <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-auto md:h-16" />
          ) : (
            <span className="font-display text-4xl text-navy md:text-6xl">{sponsor.name}</span>
          )}
        </span>
        {sponsor.description && (
          <p className="mt-6 max-w-xl text-cream/80">{sponsor.description}</p>
        )}
      </>
    );

    return (
      <div className="bg-navy px-8 py-12 text-cream md:px-16 md:py-20">
        {sponsor.link ? (
          <a href={sponsor.link} className="block transition-opacity duration-300 ease-expo-out hover:opacity-90">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    );
  }

  const logo = sponsor.logo ? (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      className="h-10 w-auto max-w-[70%] object-contain grayscale transition-all duration-500 ease-expo-out group-hover:grayscale-0"
    />
  ) : (
    <span className="font-display text-lg text-navy">{sponsor.name}</span>
  );

  return (
    <div className="group flex flex-col items-center justify-center gap-3 border-t-2 border-navy py-10 text-center">
      {sponsor.link ? (
        <a href={sponsor.link} aria-label={sponsor.name}>
          {logo}
        </a>
      ) : (
        logo
      )}
      {sponsor.description && <p className="max-w-xs text-sm text-body">{sponsor.description}</p>}
    </div>
  );
}
