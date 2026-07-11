# Immersive Hero + Animated Stats — Design

## Context

The immersive redesign brief (2026-07-10) called for a full-screen hero with mouse-reactive
lighting, floating glassmorphic stat cards, and animated viewport-triggered counters. Since then,
the Legacy Timeline, Committee, Sponsors, and Footer sections have all been rebuilt to this
standard. The Trophy Cabinet, interactive campus map, and editorial testimonials sections from the
original brief have been descoped and will not be built. This spec covers the last remaining
piece: the homepage hero and its stats.

The project already depends on `framer-motion` (`^12.42.2`), used by Timeline, Committee,
Sponsors, and Footer — no new runtime dependencies are needed here.

## Current state

- `components/VideoHero.tsx`: full-bleed `welcome.mp4` background video with a navy overlay,
  `StaggeredHeadline`, a tagline, and a mute/unmute button. No stat cards, no lighting effect, no
  scroll indicator.
- `app/page.tsx` (lines 39–60): a static bordered 2-column stats band directly below the hero
  intro copy (130+ Years, 1000+ Members, plus a description cell). Numbers are hardcoded JSX, not
  animated.
- Existing glassmorphism precedent: `components/timeline/TimelineCard.tsx` uses
  `rounded-2xl border border-gold/30 bg-cream/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]
  backdrop-blur-md`.
- Reduced-motion precedent: components check `useReducedMotion()` (Framer Motion hook) and
  disable/short-circuit motion accordingly (see `TimelineNode`, `OrbitingLogos`, `Footer`).

## Goals

1. Replace the static hero with an immersive version: mouse-reactive ambient lighting, floating
   glassmorphic stat cards, animated scroll indicator.
2. Replace the static homepage stats band with viewport-triggered animated counters, sourced from
   a typed data module.
3. Preserve full accessibility: `prefers-reduced-motion` support, keyboard/screen-reader safety,
   no layout shift.
4. Follow existing project conventions: typed `data/*.ts` + paired `.test.ts`, Framer Motion for
   motion, Tailwind for styling, no new dependencies.

## Non-goals

- Trophy Cabinet, campus map, testimonials — explicitly descoped.
- Changing the video asset, headline copy, or tagline.
- Changing any other homepage section (intro copy block, Timeline, bottom link grid).

## Data layer

New `data/stats.ts`:

```ts
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 130, suffix: '+', label: 'Years of History' },
  { value: 1000, suffix: '+', label: 'Members Across the School' },
  { value: 40, suffix: '+', label: 'Annual Events' },
  { value: 20, suffix: '+', label: 'Industry Sponsors' },
];
```

Exact figures for Annual Events / Industry Sponsors will be reconciled against
`data/events.ts` / `data/sponsors.ts` counts at implementation time if those modules expose
usable totals; otherwise the brief's illustrative figures above are used as placeholders sourced
from the original creative brief (40+ Events, Industry Sponsors were both named there).

Paired `data/stats.test.ts` validates shape (4 entries, positive values, non-empty labels) — same
pattern as `data/timeline.test.ts`.

## Component design

### `VideoHero.tsx`

Stays a client component. Adds:

- **Ambient glow layer**: an absolutely-positioned `div` with a radial-gradient background
  (gold/cream at low opacity fading to transparent). Position driven by CSS custom properties
  `--glow-x` / `--glow-y` (percentages), updated via a `mousemove` listener on the hero container
  that writes directly to the element's `style` via a ref — no React state, no re-render per mouse
  move. Listener is only attached when `!prefersReducedMotion`; otherwise the glow renders fixed
  at center (33%/33%) with no listener, matching the reduced-motion pattern used elsewhere.
- **Stat cards row**: renders `stats` from `data/stats.ts` as 4 `TimelineCard`-styled glass cards
  (`rounded-2xl border border-gold/30 bg-cream/10 backdrop-blur-md`, smaller padding than
  `TimelineCard` to fit inline), laid out in a `flex flex-wrap` row under the tagline — wraps to a
  2×2 grid on mobile via Tailwind breakpoints. Each card's number is a new `StatCounter`
  subcomponent.
- **Scroll indicator**: a small centered chevron pinned to the bottom of the hero, Framer Motion
  `animate={{ y: [0, 8, 0] }}` bounce loop, `opacity` driven by `useScroll`/`useTransform` so it
  fades out over the first ~10% of viewport height of scroll. Skipped entirely (not rendered) when
  `prefersReducedMotion`.
- Existing mute/unmute button stays at `bottom-6 right-6`; stat card row sits above it with enough
  bottom padding to avoid overlap on small screens.

### `StatCounter` (new, colocated in `components/VideoHero.tsx` or its own file if it grows)

- Takes `{ value, suffix, label }`.
- Uses Framer Motion `useInView` (`once: true`) to trigger a count-up `animate()` from 0 to
  `value` over ~1.2s when scrolled into view (mirrors the viewport-triggered pattern used for
  other reveals in the codebase).
- Under `prefersReducedMotion`, renders `value` immediately with no animation.
- Renders as `{count}{suffix}` above the label, matching the existing stat typography (`font-
  display text-5xl md:text-7xl` for the number, `font-mono text-[11px] uppercase tracking-[0.24em]`
  for the label) so removing the old band doesn't change the type scale users already see.

### `app/page.tsx`

Delete the static stats band block (current lines 39–60) entirely. No other changes to this file.

## Accessibility & performance

- All new motion respects `useReducedMotion()`; reduced-motion users get static final values, a
  centered glow, and no scroll indicator.
- Mouse glow updates via direct DOM style mutation (not `setState`) to avoid re-render cost on
  every `mousemove`.
- No new images/video — no additional network payload.
- Stat cards use semantic markup (`<dl>`/`<dt>`/`<dd>` or heading+paragraph) so counters remain
  meaningful to screen readers even before animation completes (announce final value via
  `aria-label` on the card, e.g. `aria-label="130+ Years of History"`).

## Testing

- `data/stats.test.ts`: validates the `stats` array shape and values (new file).
- `components/VideoHero.test.tsx` (existing, to be extended): verify all 4 stat labels render,
  verify reduced-motion disables the glow listener and scroll indicator, verify mute button still
  toggles.
- `app/page.test.tsx` (if it exists) or equivalent: verify the static stats band markup is gone
  and no duplicate stat numbers appear on the page.

## Open questions / assumptions

- Exact "Annual Events" and "Industry Sponsors" figures are placeholders pending a quick check of
  `data/events.ts` / `data/sponsors.ts` at implementation time — this does not change the design,
  only the literal numbers in `data/stats.ts`.
