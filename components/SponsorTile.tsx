import type { Sponsor } from '@/data/types';

function DiamondTile({ sponsor }: { sponsor: Sponsor }) {
  const content = (
    <div className="relative grid gap-10 overflow-hidden rounded-3xl bg-navy px-8 py-14 md:grid-cols-12 md:items-center md:px-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
      />
      <div className="relative md:col-span-5">
        <span className="inline-flex items-center justify-center rounded-2xl bg-cream px-10 py-6">
          {sponsor.logo ? (
            <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-auto md:h-16" />
          ) : (
            <span className="font-display text-4xl text-navy md:text-5xl">{sponsor.name}</span>
          )}
        </span>
      </div>
      <div className="relative md:col-span-7">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Headline Partner</p>
        {sponsor.description && (
          <>
            <span aria-hidden="true" className="mt-4 block font-display text-5xl leading-none text-gold/40">
              &ldquo;
            </span>
            <p className="-mt-3 max-w-xl font-display text-xl leading-snug text-cream md:text-2xl">
              {sponsor.description}
            </p>
          </>
        )}
      </div>
    </div>
  );

  return sponsor.link ? (
    <a
      href={sponsor.link}
      className="block transition-opacity duration-300 ease-expo-out hover:opacity-90"
    >
      {content}
    </a>
  ) : (
    content
  );
}

function PartnerTile({ sponsor, index }: { sponsor: Sponsor; index?: number }) {
  const logo = sponsor.logo ? (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      className="h-9 w-auto max-w-[70%] object-contain grayscale transition-all duration-500 ease-expo-out group-hover:grayscale-0"
    />
  ) : (
    <span className="font-display text-lg text-navy">{sponsor.name}</span>
  );

  const inner = (
    <div className="group relative flex h-full flex-col items-center justify-center gap-3 bg-cream px-6 py-12 text-center transition-colors duration-300 ease-expo-out hover:bg-white">
      {typeof index === 'number' && (
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/30"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      {logo}
      {sponsor.description && <p className="max-w-xs text-sm text-body">{sponsor.description}</p>}
    </div>
  );

  return sponsor.link ? (
    <a href={sponsor.link} aria-label={sponsor.name} className="block h-full">
      {inner}
    </a>
  ) : (
    inner
  );
}

export function SponsorTile({ sponsor, index }: { sponsor: Sponsor; index?: number }) {
  return sponsor.tier === 'diamond' ? (
    <DiamondTile sponsor={sponsor} />
  ) : (
    <PartnerTile sponsor={sponsor} index={index} />
  );
}
