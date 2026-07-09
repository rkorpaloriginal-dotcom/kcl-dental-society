# KCL Dental Society — Editorial Redesign Design Spec

## Purpose

Redesign the visual identity of the existing KCL Dental Society site (built 2026-07-08) from its current safe, generic-student-society execution into a bold editorial/magazine aesthetic — while keeping every route, every piece of real content (event photos, committee roster, sponsor list, copy), and the underlying data layer untouched. This is a visual-identity pass, not a content or information-architecture change.

## Goals

- Typography that commands attention (10:1+ scale contrast between display and body), replacing the current safe Playfair Display + Inter pairing.
- Asymmetric, magazine-style composition — bleeding images, off-grid layouts, varied density — replacing the current uniform-grid, centered-everything execution.
- Choreographed, custom-eased motion replacing the current simple fade/slide reveal.
- A navy/cream/gold palette that reads as confidently "invented for this project" rather than "navy header bar on white body" — same three colors as before, different ratios and application.
- Every global constraint from the original build spec (`docs/superpowers/specs/2026-07-08-kcl-dental-society-website-design.md`) still holds: real links only, no empty pages, no content gated behind animation, one consistent committee card treatment, real per-page metadata.

## Non-goals

- No content changes: event categories, committee roster, sponsor list, and all copy stay exactly as they are.
- No new routes, no IA changes — still Home, Events (What We Run / Upcoming), Committee, Sponsors, Join.
- No new runtime dependencies (no Framer Motion, no GSAP, no Lenis) — motion stays CSS/Tailwind + the existing `IntersectionObserver`-based `RevealOnScroll` pattern, extended rather than replaced with a new library.
- No custom cursor (opt-in only per the top-design skill's ethical boundary; not requested here).
- No backend/CMS — still a static export.

## Typography system

- **Display**: Fraunces (variable serif, via `next/font/google`), used for all headlines. Tight negative tracking (`-0.02em` to `-0.04em`) at large sizes. Oversized — homepage headline should approach viewport width, other page H1s scaled down from that but still dramatically larger than body text.
- **Body/UI**: Instrument Sans (via `next/font/google`), replacing Inter. Used for paragraph copy, nav, buttons, labels.
- Minimum scale ratio between hero display text and body text: 10:1 (e.g. a ~120px+ homepage headline against ~16px body).
- Every headline gets manual line-break control where it improves the shape of the text block (not just wherever it naturally wraps).
- `text-wrap: balance` on headlines where supported.

## Color system

Same three brand colors as the current build, different roles and ratios:

| Token | Value | Old usage | New usage |
|---|---|---|---|
| Navy | `#1B2A56` | Header/footer background bars, all headings | Primary "ink" color — large-scale text on cream, occasional full-navy sections for contrast/pacing, footer |
| Cream | `#F7F3EC` (new) | N/A (was plain white `#FFFFFF`) | Primary page background — replaces white everywhere |
| Gold | `#C9992E` | Tagline text, hover states, sparse CTA color | Single sharp accent — one underline, one highlighted word per headline, CTA fills, hover states. Used more sparingly and more deliberately than before, never as a background fill for large areas |
| Body text | `#1A1613` (new, warm near-black) | `#444444` gray on white | Body copy on cream backgrounds where full navy would be too heavy |

No new hues introduced. No pure white, no pure black anywhere (constraint carried from top-design skill).

## Layout per page

**Home**: Oversized cropped Fraunces headline overlapping the hero video/photo rather than centered text floating on top of a dimmed overlay. Mission section becomes an asymmetric two-column editorial spread (pull-quote style large text + narrower supporting copy) instead of a centered single column. Teaser grid becomes 3 asymmetric-height blocks instead of 3 equal cards (the "no generic 3-equal-card row" rule).

**Events**: "What We Run" tab becomes an asymmetric masonry of the 8 category photos (varied image aspect ratios/sizes) instead of a uniform 4-column grid. "Upcoming" tab keeps its real placeholder message, restyled to match (still never fake dates, still never blank).

**Committee**: Reframed as an editorial "index" — a dense, typographic list grouped by section heading (Leadership, Officers, Events Team, Year Representatives, Affiliated), with name/role set in a magazine-masthead-credits style rather than a wall of circular avatar cards. The initials-avatar treatment is removed entirely in favor of pure typography (numbered or rule-separated rows, navy name / gold-on-hover role, no circular marks) — this is cleaner at the "index" density this layout targets and avoids 39 repeated circles competing with the typographic system. Still shows the full ~39-person roster on one page, still no carousel/pagination (global constraint carried over); "one consistent treatment for everyone" still holds — every row uses the identical typographic pattern, no per-person special-casing.

**Sponsors**: Reframed as a magazine "supporters" spread — MDDUS diamond tier gets a full-bleed editorial treatment (large, on a navy background block), partner grid becomes an asymmetric arrangement rather than a uniform tile grid. "Become a Sponsor" CTA keeps its real `mailto:` link, restyled.

**Join**: Stays simple/intimate by design contrast (per the "dense vs. breathing room" pacing principle) — this page gets more white space, not less, as a deliberate rhythm break after denser pages.

**Nav/Footer**: Nav bar simplifies visually (less "corporate top bar," more editorial masthead treatment) but keeps its existing responsive mobile-menu behavior from the current build (already fixed for 375px overflow) and every existing real link/route.

## Motion system

- No new npm dependencies.
- Custom cubic-bezier easing only — ban `ease`, `ease-in`, `ease-out`, `linear`. Use expo-out (`cubic-bezier(0.16, 1, 0.3, 1)`) or quart-out (`cubic-bezier(0.25, 1, 0.5, 1)`) via CSS custom properties.
- Homepage headline gets a staggered word-by-word reveal on load (CSS `animation-delay` cascade, not JS-driven).
- Extend the existing `RevealOnScroll` component (already correctly avoids gating visibility behind JS — see `2026-07-08` spec's documented fix) with the new easing curves; do not change its core visibility-safety behavior.
- Image reveals on scroll use `clip-path` transitions rather than plain opacity fades, for a more considered feel.
- `prefers-reduced-motion: reduce` must disable all non-essential motion (word stagger, clip-path reveals) — content must be immediately fully visible in that case, consistent with the original build's "animation never gates visibility" rule.

## What does not change

- Data layer (`data/events.ts`, `data/committee.ts`, `data/sponsors.ts`, `data/types.ts`) — untouched.
- Routes and information architecture.
- Real links/hrefs, metadata, accessibility requirements (alt text, contrast — recalculate contrast for the new cream/navy/gold combinations, must still meet WCAG AA).
- Test suite intent: existing 38 tests assert content/behavior, not visual styling, so they should mostly continue to pass; any test asserting a specific className tied to the old visual system will need updating as part of implementation, not a content or behavior change.

## Testing / verification

Same bar as the original build: full test suite passing, production build clean, manual browser pass on all 5 routes at desktop and mobile widths, contrast-checked against the new palette, `prefers-reduced-motion` verified.
