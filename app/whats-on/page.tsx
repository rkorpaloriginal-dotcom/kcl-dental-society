import type { Metadata } from 'next';
import { WhatsOnHero } from '@/components/whats-on/WhatsOnHero';
import { WhatsOnExperience } from '@/components/whats-on/WhatsOnExperience';
import { AnnualEvents } from '@/components/whats-on/AnnualEvents';
import { PastHighlights } from '@/components/whats-on/PastHighlights';
import { WhatsOnCTA } from '@/components/whats-on/WhatsOnCTA';

export const metadata: Metadata = {
  title: "What's On",
  description:
    'Lectures, socials, careers evenings, charity events, sports tournaments and everything happening across KCL Dental Society.',
};

export default function WhatsOnPage() {
  return (
    <>
      <WhatsOnHero />
      <WhatsOnExperience />
      <AnnualEvents />
      <PastHighlights />
      <WhatsOnCTA />
    </>
  );
}
