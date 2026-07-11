import { RevealOnScroll } from '@/components/RevealOnScroll';
import { PAST_HIGHLIGHTS } from '@/data/whats-on';

const SPAN_PATTERN = ['row-span-2', '', '', 'row-span-2'];

export function PastHighlights() {
  return (
    <RevealOnScroll className="border-t border-navy/15 bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-navy/50">Past Highlights</p>
        <h2 className="mt-3 font-display text-3xl text-navy md:text-5xl">Moments We&apos;re Proud Of</h2>

        <div className="mt-12 grid auto-rows-[13rem] grid-cols-2 gap-4 md:grid-cols-4">
          {PAST_HIGHLIGHTS.map((highlight, index) => (
            <div
              key={highlight.slug}
              className={`group relative overflow-hidden rounded-2xl ${SPAN_PATTERN[index % SPAN_PATTERN.length]}`}
            >
              <img
                src={highlight.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 ease-expo-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 ease-expo-out group-hover:bg-navy/70" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 ease-expo-out group-hover:opacity-100">
                <h3 className="font-display text-lg text-cream">{highlight.title}</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {highlight.year}
                </p>
                <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {highlight.stats.map((stat) => (
                    <div key={stat.label}>
                      <dd className="font-display text-base text-cream">{stat.value}</dd>
                      <dt className="text-[11px] text-cream/60">{stat.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}
