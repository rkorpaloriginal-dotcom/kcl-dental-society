import { RevealOnScroll } from '@/components/RevealOnScroll';

export function UpcomingSection() {
  return (
    <RevealOnScroll className="border-t border-navy/15 bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-navy/50">Upcoming</p>
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto mt-6 text-navy/25"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9.5H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7.5 3V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16.5 3V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <h2 className="mt-6 font-display text-2xl text-navy md:text-3xl">
          Nothing on the calendar just yet
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-body">
          We post dates as soon as venues and tickets are confirmed. Turn on Society App
          notifications so you&apos;re first to know.
        </p>
        <a
          href="https://go.link2app.co/QlZx6wiDP0b"
          className="mt-8 inline-block rounded-full border border-navy px-6 py-3 text-sm text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
        >
          Get notified
        </a>
      </div>
    </RevealOnScroll>
  );
}
