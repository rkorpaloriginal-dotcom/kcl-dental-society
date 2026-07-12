import type { Metadata } from 'next';
import { EventsHero } from '@/components/events/EventsHero';
import { EventShowcase } from '@/components/events/EventShowcase';
import { UpcomingSection } from '@/components/events/UpcomingSection';
import { EVENT_CATEGORIES } from '@/data/events';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Formals, workshops, careers events, competitions, and socials from KCL Dental Society.',
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-navy/15 pb-4">
          <h2 className="font-display text-3xl text-navy md:text-4xl">What We Run</h2>
          <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-navy/50 md:block">
            Tap a tile for the full story
          </p>
        </div>
        <EventShowcase categories={EVENT_CATEGORIES} />
      </section>
      <UpcomingSection />
    </>
  );
}
