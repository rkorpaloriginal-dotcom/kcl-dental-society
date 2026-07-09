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
    <RevealOnScroll>
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <h1 className="font-display text-5xl text-navy md:text-7xl">Our Sponsors</h1>
        <p className="mt-4 max-w-xl text-body">
          We host the largest Trade Fayre of any university dental society in the UK, with over
          400 student attendees — supported by industry partners who believe in KCL Dental
          Society.
        </p>
      </div>

      <div className="mt-12">
        <SponsorTile sponsor={diamond} />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 sm:grid-cols-3">
        {partners.map((sponsor) => (
          <SponsorTile key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-navy">Become a Sponsor</h2>
        <p className="mx-auto mt-2 max-w-xl text-body">
          We're happy to discuss any form of sponsorship — financial, product, or academic
          opportunity.
        </p>
        <a
          href="mailto:kingsdentalsociety@gmail.com?subject=Sponsorship%20Enquiry"
          className="mt-6 inline-block border-b-2 border-gold text-navy hover:text-gold"
        >
          Become a Sponsor
        </a>
      </div>
    </RevealOnScroll>
  );
}
