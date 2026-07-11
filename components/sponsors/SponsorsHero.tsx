import { StaggeredHeadline } from '@/components/StaggeredHeadline';
import { OrbitingLogos } from '@/components/sponsors/OrbitingLogos';
import type { Sponsor } from '@/data/types';

export function SponsorsHero({
  sponsors,
  partnerCount,
}: {
  sponsors: Sponsor[];
  partnerCount: number;
}) {
  const partners = sponsors.filter((sponsor) => sponsor.tier === 'partner');

  return (
    <section className="bg-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:items-center md:py-28">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Sponsors &amp; Partners
          </p>
          <StaggeredHeadline
            text="Backed by the best in dentistry."
            className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-cream md:text-6xl"
            as="h1"
          />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-cream/70">
            We host the largest Trade Fayre of any university dental society in the UK,
            bringing 400+ students together with industry leaders for careers insight,
            professional networking, and sponsor engagement.
          </p>
          <div className="mt-8 flex items-center gap-6 border-t border-cream/15 pt-6">
            <div>
              <p className="font-display text-2xl text-cream">400+</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">
                Students attending
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-cream">{partnerCount}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">
                Industry partners
              </p>
            </div>
            <a
              href="#become-a-sponsor"
              className="ml-auto border-b-2 border-gold pb-0.5 text-sm text-cream transition-colors duration-300 ease-expo-out hover:text-gold"
            >
              Partner with us -&gt;
            </a>
          </div>
        </div>
        <div className="md:col-span-7">
          <OrbitingLogos sponsors={partners} />
        </div>
      </div>
    </section>
  );
}
