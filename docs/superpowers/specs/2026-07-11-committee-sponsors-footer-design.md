# Committee, Sponsors & Footer Redesign — Design Spec

## Objectives

Elevate the visual quality of the Committee, Sponsors, and Footer sections to the standard set by the rest of the site — closer to Apple/Stripe/Linear-style premium restraint than a typical student-society page.

- Increase perceived quality.
- Make committee members feel more human (without fabricating content they don't have).
- Give sponsors a memorable presentation.
- End every page with a premium "final chapter" footer.
- Reuse existing design language wherever possible (the flat editorial system for Committee/Sponsors; the Legacy timeline's dark layered-archive language for the Footer, per the earlier decision that the footer is a narrative bookend to the Legacy section).
- No new npm dependencies beyond `framer-motion`, already installed.

## Corrections from the working draft

Two details in the original draft would have introduced fabricated/broken content and are corrected here:

- **Footer navigation**: the site has no `/about` or standalone `/home` route (confirmed IA: Home, Events, Committee, Sponsors, Join — a constraint carried from the original build spec). The footer nav links to the four real non-home routes: Events, Committee, Sponsors, Join. The wordmark itself is not a link (footers on this site don't currently link the logo; not adding new behavior here).
- **Contact email**: the real, already-used address is `kingsdentalsociety@gmail.com` (used today in the Sponsors mailto CTA). The footer uses this exact address, not a placeholder `@kcl.ac.uk` address.

## Scope

Three independent pieces, described together because they're small and share some visual language, but each ships as its own set of commits:
1. `CommitteePortrait` hover-reveal redesign.
2. `OrbitingLogos` component + Sponsors page integration.
3. `Footer` redesign.

No changes to `data/committee.ts`, `data/sponsors.ts`, or `data/types.ts` — every field used in this spec already exists on `CommitteeMember`/`Sponsor`.

---

## Phase 1 — Committee Portrait Redesign

Keep everything about `CommitteeGrid.tsx` (grouped sections, sticky group label, numbered index, responsive grid) — only `CommitteePortrait.tsx` is redesigned.

**Structure**: a single `group`-hover card. No separate caption block below the image — name and role move inside the image as a bottom overlay.

- Card: `aspect-[3/4]`, `rounded-3xl`, `overflow-hidden`, background `bg-neutral-950` (fallback behind the photo / initials state).
- Image: `scale(1)` at rest → `scale(1.05)` on hover, `700–900ms`, `ease-expo-out` (existing token).
- Overlay: bottom-aligned (`absolute bottom-0 left-0 right-0`), `p-8`, gradient from transparent to `rgba(0,0,0,0.72)` (no harsh flat black scrim) — this gradient is present at rest at lower intensity so text is always legible, and deepens slightly on hover.
- Typography: name `18–20px`/`font-semibold`/white; role `14px`/`white/70`.
- Hover state: image scales to `1.05`; card lifts `translateY(-4px)` with `shadow-xl`; overlay gradient darkens slightly; text nudges `translateY(-8px)` and opacity `0.85 → 1`.
- The initials-fallback state (`member.photo` absent) keeps the same card/overlay treatment, initials centered where the image would be — this path is currently unused (every real member has a photo) but must not be deleted.
- **CSS-only**: Tailwind `group-hover:` + `transition`, no `framer-motion`, no JS. `:focus-visible` on the card gets the identical treatment as `:hover` (keyboard parity, not just mouse).
- `prefers-reduced-motion: reduce`: the existing global CSS block already zeroes `transition-duration`/`animation-duration` site-wide, so no extra handling is needed here — hover states will apply instantly instead of animating, which is correct (the end state is still reachable, just not animated).

## Phase 2 — OrbitingLogos component

New file `components/sponsors/OrbitingLogos.tsx`. Renders the 6 real `partner`-tier sponsors from `SPONSORS.filter(s => s.tier === 'partner')` (no new data, no duplication) arranged on a circular path.

- **Layout**: 6 logos evenly spaced (60° apart) around a circle. Desktop radius `220px`, tablet `170px`. The diamond sponsor tile is unchanged and unaffected — it stays as today's `DiamondTile`, rendered separately (typically as the visual center/above the orbit, not inside this component).
- **Animation**: the orbit container rotates `360deg` over `60s`, `linear`, `infinite`, via `framer-motion`. Each logo counter-rotates `-360deg` on the same duration so logos stay upright rather than spinning with the orbit.
- **Hover behavior**: hovering anywhere on the orbit pauses the rotation (both the orbit and the counter-rotation) via `animationPlayState`/framer-motion's play/pause control. Hovering an individual logo also scales it `1.08`, lifts `translateY(-4px)`, adds `shadow-lg`.
- **Detail card**: appears beside/near the hovered logo — a small panel showing only real data: sponsor name (always), `description` (if present), a link to `sponsor.link` labeled "Visit website" (if present). Nothing rendered for fields that don't exist (5 of 6 current partners have no description/link — the card for those shows name only, not a fabricated blurb). Entrance: `opacity 0→1`, `translateY 8px→0`, `200ms`.
- **Reduced motion**: `useReducedMotion()` (already used elsewhere in this codebase, e.g. `TimelineItem`) disables the continuous orbit rotation entirely — logos render in their static evenly-spaced positions with no animation loop. Hover-triggered scale/lift and the detail-card entrance are also skipped (final state shown immediately), consistent with how the Legacy timeline handles reduced motion.
- **Mobile**: below a defined breakpoint (matching the existing `md:` convention), the orbit layout is replaced by a simple 2-column grid of the same 6 logos (no orbit, no rotation) — avoids an unreadable/unusable circular layout at narrow widths and keeps this component's mobile behavior consistent with the rest of the site's `md:`-gated responsive patterns.

## Phase 3 — Sponsors page integration

On `app/sponsors/page.tsx`: the `DiamondTile` stays exactly as it is today. The existing `LogoWall` (the 7-tile animated collage, which currently includes the diamond sponsor as tile 0) is replaced by `OrbitingLogos` for the 6 partner sponsors, positioned after the diamond tile. The existing grayscale `PartnerTile` grid below stays as a secondary, always-visible/no-JS-required listing of the same 6 partners (useful for accessibility/no-motion users and so partner links/descriptions are reachable without hovering an orbit) — the orbit is a decorative/discoverable layer on top of, not a replacement for, real accessible content.

## Phase 4 — Footer Redesign

Full replacement of `components/layout/Footer.tsx`'s content and visual treatment. Dark "final chapter" aesthetic reusing the Legacy timeline's background language (deep navy-black base, soft radial gold glow, subtle grain) rather than inventing a new visual system — extract/reuse the relevant pieces of `TimelineBackground.tsx` rather than duplicating the SVG/keyframe definitions.

Structure, top to bottom:
1. **Wordmark**: "KCL Dental Society", large (`48–72px` responsive), `font-display`.
2. **Statement**: one short line, e.g. "Connecting King's dental students through education, community and opportunity." (real, generic, non-fabricated description consistent with existing site copy).
3. **Navigation**: real routes only — Events, Committee, Sponsors, Join.
4. **Sponsor strip**: one row of small monochrome logos (all 7 sponsors, real logos already in `public/images/sponsors/`), `opacity-60 → opacity-100` on hover.
5. **Contact**: `kingsdentalsociety@gmail.com` (real, existing address), `mailto:` link.
6. **CTA**: primary button, "Join the Next Generation of King's Dentists" → `/join`. Large, centered.
7. **Copyright**: `© {current year} KCL Dental Society. All rights reserved.` (dynamic year, matches existing behavior) plus a short line, e.g. "Designed for King's College London students."

**Motion**: sections fade up (`opacity 0→1`, `translateY 30px→0`) once, staggered, on scroll into view — using the existing `RevealOnScroll` component/pattern already used elsewhere on the site rather than introducing a new scroll-reveal mechanism, unless `RevealOnScroll`'s single-block API can't express per-section stagger, in which case a small `framer-motion` `whileInView` + `staggerChildren` container is used instead (consistent with the Legacy timeline's precedent of using `framer-motion` for effects `RevealOnScroll` can't do). `prefers-reduced-motion` disables the fade/stagger — content visible immediately, same rule as everywhere else on the site.

**No social icons row** — no real social URLs exist yet; nothing fabricated.

---

## Responsive behavior

- **Desktop**: orbit visible at full radius; Committee grid stays at its existing `md:`/`lg:` column counts; footer at full multi-section layout.
- **Tablet**: smaller orbit radius (`170px`); Committee grid steps down a column per its existing responsive classes (unchanged); footer padding reduced.
- **Mobile**: Committee single column (unchanged, existing behavior); Sponsors orbit replaced by the 2-column grid described in Phase 2; footer sections stack vertically.

## Accessibility

- Committee cards: `:focus-visible` gets the identical visual treatment as `:hover` — keyboard users reach the same overlay state.
- Sponsor logos (orbit and grid fallback): every logo with a `link` is a real, tabbable `<a>` with an `aria-label` of the sponsor's name; logos without a link are non-interactive (no fake `href="#"`).
- `prefers-reduced-motion: reduce` disables: Committee image zoom/lift animation (handled automatically by the existing global CSS rule), the orbit's continuous rotation, and the Footer's fade/stagger — in every case the end state renders immediately and fully, nothing is gated behind motion.

## Performance

- No `next/image` migration in this pass — the codebase currently uses plain `<img>` throughout (confirmed: no existing `next/image` usage to be consistent with), so Committee/Sponsor images stay as `<img>` for consistency; not introducing a mixed pattern.
- Orbit animation drives only `transform` (rotation/counter-rotation, scale, translateY) — no animated `filter`/blur, no layout-triggering properties.
- Footer background reuses `TimelineBackground`'s existing SVG/CSS-keyframe primitives rather than adding new duplicate assets or effects.

## Acceptance criteria

**Committee**: full-bleed portrait cards with integrated bottom overlay; CSS-only hover/focus-visible parity using existing easing tokens; no new dependencies; no fabricated content (name/role/photo only).

**Sponsors**: diamond sponsor tile unchanged; 6 partner logos orbit smoothly with counter-rotation and pause on hover; hover cards show only real, available sponsor metadata; existing grayscale partner grid remains as an always-accessible fallback listing; reduced motion replaces the orbit with static positions.

**Footer**: dark "final chapter" aesthetic reusing the Legacy timeline's visual language; wordmark, real navigation (Events/Committee/Sponsors/Join), sponsor logo strip, real contact email, CTA to `/join`, copyright; no social icons or placeholder content.

**Overall**: consistent visual language across all three; responsive at desktop/tablet/mobile; `prefers-reduced-motion` respected everywhere; full existing test suite continues to pass, with new/updated tests for each changed component.
