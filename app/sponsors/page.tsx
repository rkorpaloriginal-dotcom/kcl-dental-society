import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { SponsorTile } from '@/components/SponsorTile';
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
    <RevealOnScroll className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-center font-display text-4xl text-navy">Our Sponsors</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center">
        We host the largest Trade Fayre of any university dental society in the UK, with over
        400 student attendees — supported by industry partners who believe in KCL Dental
        Society.
      </p>

      <div className="mx-auto mt-12 max-w-xl">
        <SponsorTile sponsor={diamond} />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {partners.map((sponsor) => (
          <SponsorTile key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="font-display text-2xl text-navy">Become a Sponsor</h2>
        <p className="mx-auto mt-2 max-w-xl">
          We're happy to discuss any form of sponsorship — financial, product, or academic
          opportunity.
        </p>
        <a
          href="mailto:kingsdentalsociety@gmail.com?subject=Sponsorship%20Enquiry"
          className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-white hover:bg-gold"
        >
          Become a Sponsor
        </a>
      </div>
    </RevealOnScroll>
  );
}
