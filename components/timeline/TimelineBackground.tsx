export function TimelineBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Radial gradient glow behind the timeline */}
      <div className="absolute left-1/2 top-1/3 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,153,46,0.12)_0%,rgba(201,153,46,0)_70%)]" />

      {/* Subtle animated film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04] motion-safe:animate-[grain-drift_18s_cubic-bezier(0.45,0,0.55,1)_infinite]">
        <filter id="timeline-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#timeline-grain)" />
      </svg>

      {/* Low-opacity dentistry-inspired line art */}
      <svg
        className="absolute -left-16 top-24 h-64 w-64 stroke-cream opacity-5"
        viewBox="0 0 200 200"
        fill="none"
        strokeWidth="1.5"
      >
        <path d="M100 20c-30 0-45 25-45 55 0 35 15 70 25 90 5 10 10 15 20 15s15-5 20-15c10-20 25-55 25-90 0-30-15-55-45-55z" />
        <path d="M70 60c10-10 50-10 60 0" />
      </svg>
      <svg
        className="absolute -right-10 bottom-32 h-72 w-72 stroke-cream opacity-5"
        viewBox="0 0 200 200"
        fill="none"
        strokeWidth="1.5"
      >
        <circle cx="100" cy="100" r="70" />
        <path d="M60 70c15 20 65 20 80 0" />
        <path d="M60 130c15-20 65-20 80 0" />
        <path d="M100 30v140" />
      </svg>

      {/* Ambient drifting glow */}
      <div className="absolute inset-0 motion-safe:animate-[ambient-glow-drift_24s_cubic-bezier(0.45,0,0.55,1)_infinite] bg-[radial-gradient(circle_at_30%_40%,rgba(201,153,46,0.08)_0%,rgba(201,153,46,0)_60%)]" />
    </div>
  );
}
