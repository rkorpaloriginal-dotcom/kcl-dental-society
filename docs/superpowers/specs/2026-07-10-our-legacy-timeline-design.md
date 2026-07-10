# "Our Legacy" — Immersive Timeline Section Design Spec

## Objective

Create a premium, narrative-driven timeline section on the homepage that transforms a standard landing-page scroll into an immersive storytelling moment. The goal is not to display historical milestones as a list — it's to create an emotional transition from the modern homepage into the society's history, communicating prestige, heritage, and longevity, before returning the visitor to the present day and a call to join.

The section should read as a museum exhibit or Apple-style product reveal, not a conventional timeline component.

This is a deliberate, scoped exception to the flat editorial visual system established in `2026-07-09-editorial-redesign-design.md` (no gradients/glassmorphism/new JS animation deps). That system remains the default for the rest of the site; this one section earns a heavier, more immersive treatment because it's a distinct "chapter" the user enters and leaves.

## Scope

This spec covers the "Our Legacy" section only. It does not cover the hero redesign, scroll-story mechanics for other sections, the academic-year journey, living stats elsewhere on the page, event showcase, committee/sponsor treatments, trophy cabinet, campus map, testimonials, or footer redesign — those are separate, later sub-projects from the same broader creative brief and are out of scope here.

## Placement

Homepage only. No new route, no navigation item. Inserted into the existing section order in `app/page.tsx`, between the mission block (lines 10–36, the "unforgettable" pull-quote + Join/Society App buttons) and the teaser grid (lines 38–73, What We Run / Your Committee / Our Partners):

```
Hero (VideoHero)
↓
Mission / About block (existing)
↓
Our Legacy (NEW)
↓
Teaser grid: Events / Committee / Sponsors (existing)
↓
Footer
```

## User journey & atmosphere

As the user scrolls into the section, the bright cream homepage gradually darkens into an archive environment over roughly 300–500px of scroll — no abrupt color cut. Visual inspiration: museum exhibition, historical archive, premium editorial site, Apple keynote, Awwwards storytelling page. Keywords: elegant, historic, premium, immersive, calm, confident. Explicitly not futuristic, not corporate, not playful.

## Background

Layered, not flat:

1. **Base**: deep navy, darker than the site's existing `#1B2A56` token — approx `#08121D` — establishing the "archive" environment.
2. **Radial gradient**: large, soft, centered behind the timeline for depth.
3. **Grain texture**: very subtle animated film-grain overlay for warmth/texture, not sterile flatness.
4. **Blueprint illustrations**: low-opacity (<5%) dentistry-inspired line art in the background — tooth anatomy, dental instruments, molar outlines, enamel cross-sections. Subliminal, not a focal element.
5. **Ambient glow**: soft light that drifts slowly over time — extremely subtle, not distracting.

## Timeline layout

Single vertical timeline, sitting slightly left of center.

- **Desktop**: cards alternate left/right of the line (card / line / card / line / card).
- **Mobile**: line moves to a centered/left position, all cards stack vertically below each other, full width. No horizontal scrolling at any breakpoint.

## Timeline line

The hero element of the section.

- 2px wide, soft gold, subtle outer glow, rounded ends.
- Progressively draws itself as the user scrolls, exactly matching scroll progress through the section (not autoplay, not time-based).
- Implementation: Framer Motion `useScroll` + `useTransform`, driving either SVG `stroke-dashoffset` or a height/scaleY transform on the line element, mapped to the section's scroll progress.

## Timeline nodes

Each milestone has a node on the line:

- Glowing circular node with a small inner highlight.
- On becoming active (entering view): gentle scale-up, glow increase, a single pulse expansion — not continuous/looping animation.

## Milestone cards

- Frosted glass: `backdrop-blur`, soft border, subtle transparency, thin gold accent line, rounded corners, generous internal padding.
- Soft, diffused shadow — cards read as floating above the layered background.

## Typography

- Each milestone leads with an oversized year: 72–96px desktop, 48–64px mobile. The year is a compositional element, not metadata — set in Fraunces per the site's existing display-type system.
- Below the year: milestone title, then a supporting paragraph in Instrument Sans (existing body font).

## Content

Real, verified historical facts only — no fabricated names, alumni, photos, or events. Initial milestone set:

| Year | Title | Body |
|---|---|---|
| 1839 | King's College Hospital Dental Department established | Root of the clinical lineage the Society continues today. |
| 1860 | First UK Professor of Dental Surgery appointed | King's College London becomes the first UK institution to hold the post. |
| 1894 | King's College London Dental Society founded | The Society is formally established. |
| 1998 | Guy's, St Thomas' and King's schools unified | The three dental schools merge into the United Medical and Dental Schools (UMDS), later integrated into KCL. |
| Present Day | Europe's largest university dental society | 1,000+ students and faculty, with partnerships across leading dental academics and industry. |

Exact body copy to be finalized against the wording the user supplied; no additional facts, dates, or names beyond what's been verified are to be added.

## Data model & component architecture

Timeline content is entirely configuration-driven — no milestone hardcoded in JSX. Adding a milestone means adding one object to the data file.

```
components/
  Timeline/
    Timeline.tsx           — section wrapper, background layers, scroll-progress context
    TimelineItem.tsx        — one milestone: positions node + card, handles enter animation
    TimelineLine.tsx        — the self-drawing SVG/line element
    TimelineNode.tsx        — circular node + glow/pulse
    TimelineCard.tsx        — glass card: year, title, body, optional extras
    TimelineBackground.tsx  — layered background (gradient, grain, blueprint art, glow)
data/
  timeline.ts               — milestone data + TypeScript types
```

`data/timeline.ts` milestone type supports optional future fields without changing component architecture: `image`, `quote`, `statistic`, `externalLink`, `documentLink`, `gallery`, `video`, `featured`, `accentColor`, `backgroundIllustration`. Unused fields stay empty/undefined initially and components render conditionally around their absence.

## Animation sequence

Per milestone, as it enters view:

1. Timeline drawing reaches the node
2. Node glows
3. Card slides upward
4. Opacity increases
5. Year subtly scales
6. Body text fades in

Total duration ~500–700ms, spring easing (never linear, never bounce/overshoot/elastic). Motion philosophy: should feel "expensive" — calm and intentional, in the register of Apple / Linear / Vercel marketing sites. Avoid fast fades and heavy parallax.

## Scroll behavior

No scroll-jacking, no pinned sections, no forced/hijacked scrolling. Everything is driven by natural browser scroll position via Framer Motion's scroll-progress hooks — the animation reacts to where the user already is, it doesn't take control of scrolling.

## Final chapter (section close)

The timeline doesn't end abruptly at "Present Day":

- The gold line continues ~150–200px past the last milestone, then gradually fades to light (visually signaling transition back toward the site's normal cream/navy palette).
- A heading appears: **"The Next Chapter"**
- Supporting copy: *"Every student who joins the King's College London Dental Society becomes part of a legacy spanning more than a century. The next chapter has yet to be written."*
- A large, premium CTA button: **"Join the Society"** → links to `/join` (existing real route).

This closes the section as a narrative beat, not a hard stop, and hands off into the (existing) teaser grid below it.

## Accessibility

- All milestone content exists in the DOM regardless of JS/animation state — nothing is gated behind scroll or hover.
- All animation is decorative enhancement only.
- `prefers-reduced-motion: reduce`: timeline line renders fully drawn immediately, all cards fully visible immediately, no drawing animation, no fades, no node pulses.
- Keyboard and screen-reader navigation follows normal document order (top to bottom, left card/node/right card per row collapses to a single linear order in the DOM regardless of the visual alternating layout).
- Text/background contrast on the dark layered background must meet WCAG AA (checked against the deep-navy base + any gradient/glow overlays, not just the base color).

## Performance

- Favor `transform` and `opacity` for animated properties; avoid animating `filter`/blur continuously.
- Avoid continuous/looping expensive repaints (grain and ambient glow must be cheap — CSS-driven or very low-cost canvas/SVG, not per-frame JS).
- Lazy-render milestones if the dataset grows significantly beyond the initial 5.
- Target 60fps on modern devices; scroll-linked transforms must not jank on scroll.

## Dependencies

Adds `framer-motion` as a new runtime dependency — the first animation library in this codebase, superseding the "no new animation dependencies" non-goal from the 2026-07-09 spec for this section specifically. Later phases of the broader creative brief (hero, other immersive sections) are expected to reuse it rather than introducing additional libraries.

## What does not change

- All other homepage sections, all other routes, the data layer for events/committee/sponsors, and the flat editorial visual system elsewhere on the site are untouched by this work.
- `RevealOnScroll` and the existing CSS-based motion system remain in place for the rest of the site; Framer Motion is scoped to this new Timeline component tree.

## Definition of done

- The section is visually and atmospherically distinct from the rest of the homepage (darker, layered, museum/archive feel).
- The transition from the bright homepage into the section, and back out, is smooth and gradual, not abrupt.
- The timeline line progressively draws in sync with scroll position.
- Milestones animate in with the specified sequence and spring easing.
- The section is fully usable and fully readable with JavaScript disabled and with `prefers-reduced-motion` enabled.
- Code is modular, configuration-driven (single data file), and a new milestone can be added without touching component code.
- The "Next Chapter" CTA provides a satisfying close and links to the real `/join` route.
- Full existing test suite still passes; new components have test coverage consistent with the rest of the codebase's testing conventions.
- Production build is clean; manual pass at desktop and mobile widths; contrast-checked.
