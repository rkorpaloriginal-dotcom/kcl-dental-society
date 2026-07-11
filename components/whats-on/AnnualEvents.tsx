import { RevealOnScroll } from '@/components/RevealOnScroll';
import { ANNUAL_TRADITIONS } from '@/data/whats-on';

export function AnnualEvents() {
  return (
    <RevealOnScroll className="border-t border-navy/15 bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Every Year
        </p>
        <h2 className="mt-3 text-center font-display text-3xl text-cream md:text-5xl">
          Our Annual Traditions
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base text-cream/70">
          The rhythm of the academic year, marked out by the events every dental student looks
          forward to.
        </p>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {ANNUAL_TRADITIONS.map((tradition, index) => (
            <li
              key={tradition.slug}
              className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-cream/5"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={tradition.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 ease-expo-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {String(index + 1).padStart(2, '0')} · {tradition.month}
                </span>
                <h3 className="mt-2 font-display text-xl text-cream">{tradition.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{tradition.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </RevealOnScroll>
  );
}
