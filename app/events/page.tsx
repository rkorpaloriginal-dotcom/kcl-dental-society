import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { EventsTabs } from './EventsTabs';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Boat parties, formals, workshops, and more — see what KCL Dental Society runs all year round.',
};

export default function EventsPage() {
  return (
    <RevealOnScroll className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-center font-display text-4xl text-navy">Events</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center">
        From boat parties to clinical workshops, this is how the dental school comes together.
      </p>
      <div className="mt-12">
        <EventsTabs />
      </div>
    </RevealOnScroll>
  );
}
