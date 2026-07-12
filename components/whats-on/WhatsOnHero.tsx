import { StaggeredHeadline } from '@/components/StaggeredHeadline';

export function WhatsOnHero() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">What&apos;s On</p>
        <StaggeredHeadline
          text="Everything happening, in one place."
          className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight text-cream md:text-6xl"
          as="h1"
        />
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70">
          Lectures, socials, careers evenings, charity events, and sports tournaments -
          filter, browse the calendar, or jump straight to what&apos;s next.
        </p>
      </div>
    </section>
  );
}
