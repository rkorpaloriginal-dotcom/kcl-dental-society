import type { TimelineMilestone } from '@/data/timeline';

export function TimelineCard({ milestone }: { milestone: TimelineMilestone }) {
  return (
    <div className="rounded-2xl border border-gold/30 bg-cream/10 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-10">
      <p className="font-display text-6xl leading-none text-gold md:text-8xl">{milestone.year}</p>
      <h3 className="mt-4 font-display text-2xl text-cream md:text-3xl">{milestone.title}</h3>
      <p className="mt-3 max-w-md text-base leading-relaxed text-cream/80">{milestone.body}</p>
      {milestone.statistic && (
        <p className="mt-4 font-display text-xl text-gold">{milestone.statistic}</p>
      )}
      {milestone.quote && (
        <blockquote className="mt-4 border-l-2 border-gold/50 pl-4 text-sm italic text-cream/70">
          &ldquo;{milestone.quote}&rdquo;
        </blockquote>
      )}
      {milestone.image && (
        <img src={milestone.image} alt="" className="mt-4 w-full rounded-lg object-cover" />
      )}
      {(milestone.externalLink || milestone.documentLink) && (
        <div className="mt-4 flex gap-4 text-sm text-gold">
          {milestone.externalLink && (
            <a href={milestone.externalLink} className="underline hover:text-cream">
              Learn more
            </a>
          )}
          {milestone.documentLink && (
            <a href={milestone.documentLink} className="underline hover:text-cream">
              View document
            </a>
          )}
        </div>
      )}
    </div>
  );
}
