import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { SponsorTile } from '@/components/SponsorTile';
import { SponsorsHero } from '@/components/sponsors/SponsorsHero';
import { SponsorCTA } from '@/components/sponsors/SponsorCTA';
import { SPONSORS } from '@/data/sponsors';

export const metadata: Metadata = {
  title: 'Sponsors',
  description:
    'MDDUS and our partners support the largest dental society trade fayre in the UK.',
};

export default function SponsorsPage() {
  const diamond = SPONSORS.find((s) => s.tier === 'diamond')!;
  const partners = SPONSORS.filter((s) => s.tier === 'partner');

  return (
    <>
      <SponsorsHero sponsors={SPONSORS} partnerCount={partners.length} />

      <RevealOnScroll className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        <SponsorTile sponsor={diamond} />
      </RevealOnScroll>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-navy/15 pb-4">
          <h2 className="font-display text-3xl text-navy md:text-4xl">Our Partners</h2>
          <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-navy/50 md:block">
            {partners.length} organisations behind the fayre
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy/15 bg-navy/15 sm:grid-cols-3">
          {partners.map((sponsor, index) => (
            <RevealOnScroll key={sponsor.name} variant="clip" className="h-full">
              <SponsorTile sponsor={sponsor} index={index} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <SponsorCTA />
    </>
  );
}
