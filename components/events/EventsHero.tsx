import { StaggeredHeadline } from '@/components/StaggeredHeadline';
import { EventCollage } from '@/components/events/EventCollage';
import { EVENT_CATEGORIES } from '@/data/events';

export function EventsHero() {
  return (
    <section className="bg-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:items-center md:py-28">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Events</p>
          <StaggeredHeadline
            text="Every kind of night, all year round."
            className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-cream md:text-6xl"
            as="h1"
          />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-cream/70">
            From formal dinners to Thames boat parties, hands-on clinics to inter-uni
            competitions — this is how the dental school shows up for each other.
          </p>
          <div className="mt-8 flex items-center gap-6 border-t border-cream/15 pt-6">
            <div>
              <p className="font-display text-2xl text-cream">8</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">
                Event series
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-cream">30+</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">
                Nights a year
              </p>
            </div>
            <a
              href="https://go.link2app.co/QlZx6wiDP0b"
              className="ml-auto border-b-2 border-gold pb-0.5 text-sm text-cream transition-colors duration-300 ease-expo-out hover:text-gold"
            >
              Get notified →
            </a>
          </div>
        </div>
        <div className="md:col-span-7">
          <EventCollage categories={EVENT_CATEGORIES} />
        </div>
      </div>
    </section>
  );
}
