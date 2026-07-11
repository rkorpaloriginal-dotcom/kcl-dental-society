import type { Metadata } from 'next';
import { EventsHero } from '@/components/events/EventsHero';
import { EventShowcase } from '@/components/events/EventShowcase';
import { EVENT_CATEGORIES } from '@/data/events';
import { WhatsOnExperience } from '@/components/whats-on/WhatsOnExperience';
import { AnnualEvents } from '@/components/whats-on/AnnualEvents';
import { PastHighlights } from '@/components/whats-on/PastHighlights';
import { WhatsOnCTA } from '@/components/whats-on/WhatsOnCTA';

export const metadata: Metadata = {
  title: "What's On",
  description:
    'Lectures, socials, careers evenings, charity events, sports tournaments and everything happening across KCL Dental Society.',
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <WhatsOnExperience />
      <AnnualEvents />
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-navy/15 pb-4">
          <h2 className="font-display text-3xl text-navy md:text-4xl">What We Run</h2>
          <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-navy/50 md:block">
            Tap a tile for the full story
          </p>
        </div>
        <EventShowcase categories={EVENT_CATEGORIES} />
      </section>
      <PastHighlights />
      <WhatsOnCTA />
    </>
  );
}
