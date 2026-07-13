export function TimelineBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Radial gradient glow behind the timeline */}
      <div className="absolute left-1/2 top-1/3 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,153,46,0.12)_0%,rgba(201,153,46,0)_70%)]" />

      {/* Ambient drifting glow */}
      <div className="absolute inset-0 motion-safe:animate-[ambient-glow-drift_24s_cubic-bezier(0.45,0,0.55,1)_infinite] bg-[radial-gradient(circle_at_30%_40%,rgba(201,153,46,0.08)_0%,rgba(201,153,46,0)_60%)]" />
    </div>
  );
}
