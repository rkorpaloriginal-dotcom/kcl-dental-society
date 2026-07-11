# Committee, Sponsors & Footer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `CommitteePortrait` into a hover-reveal panel, add a new `OrbitingLogos` sponsor component, and rebuild `Footer` as a dark "final chapter" section reusing the Legacy timeline's background — all using only real, existing data.

**Architecture:** Three independent, small changes sharing this plan for convenience (per the user's request to batch "a couple of the simple ones"), each still landing as its own commit(s):
1. `CommitteePortrait.tsx` — CSS-only hover/focus redesign, no new dependency.
2. New `components/sponsors/OrbitingLogos.tsx` — continuous rotation via plain CSS `@keyframes` + `animation-play-state` (not `framer-motion`, for a documented reason — see Task 2), with `framer-motion` used only for the discrete hover/focus detail-card entrance (`AnimatePresence`), consistent with the codebase's existing `EventShowcase.tsx` dialog pattern. Wired into `SponsorsHero.tsx`, replacing its existing `LogoWall` usage.
3. `Footer.tsx` — full rebuild, reusing `TimelineBackground` directly (it already accepts no props and is purely decorative — no refactor needed) for its dark layered background, with `framer-motion` `staggerChildren` for the section reveal (since `RevealOnScroll` can't express a per-section stagger).

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, `framer-motion` (already installed), Vitest + Testing Library.

## Global Constraints

- No fabricated content anywhere: Committee uses only `name`/`role`/`photo`; Sponsors detail cards show only `description`/`link` when actually present on the data, nothing invented; Footer nav links only to real routes (`/events`, `/committee`, `/sponsors`, `/join`) and the real email `kingsdentalsociety@gmail.com` — no `/about`, no placeholder `@kcl.ac.uk` address, no social icon links.
- No new npm dependencies (`framer-motion` is already installed and is the only animation library used).
- `prefers-reduced-motion: reduce` must disable: Committee's hover scale/lift is CSS-only and already covered by the existing global reduced-motion CSS block in `app/globals.css` (no extra work needed); the orbit's continuous rotation and the detail-card entrance in `OrbitingLogos`; the stagger/fade in `Footer`. In every case, content must be fully visible immediately, never gated behind animation.
- Keyboard parity: every hover-triggered visual state (Committee overlay, Sponsor orbit detail card) must also trigger on `:focus-visible`/`onFocus`, not mouse-only.
- Animate only `transform`/`opacity` — no continuously-animated `filter`/blur.
- Existing full test suite must keep passing; production build must stay clean.

---

### Task 1: CommitteePortrait hover-reveal redesign

**Files:**
- Modify: `components/CommitteePortrait.tsx`
- Modify: `components/CommitteePortrait.test.tsx` (add tests; do not remove or weaken the two existing tests)

**Interfaces:**
- No signature change: `CommitteePortrait({ member }: { member: CommitteeMember })` — same as today. `CommitteeGrid.tsx` (unchanged) keeps working without modification.

The two existing tests must keep passing unmodified:
```tsx
// components/CommitteePortrait.test.tsx (existing, unchanged)
it('renders the photo with the member name as alt text, plus a visible name/role caption', () => { /* ... */ });
it('falls back to a uniform initials mark when no photo is set, never a broken image', () => { /* ... */ });
```
Both existing tests query `screen.getByText(...)` for name/role/initials with no interaction — the new design must keep this content in the DOM and visually present (not `opacity-0`/`display:none`) at rest, per the design spec's "legible at rest, deepens on hover" requirement.

- [ ] **Step 1: Write the new failing tests**

Add to `components/CommitteePortrait.test.tsx` (keep the existing two tests above them, unchanged):

```tsx
it('is keyboard-focusable so the hover reveal has a keyboard equivalent', () => {
  render(
    <CommitteePortrait
      member={{ name: 'Aman Aziz', role: 'President', group: 'Leadership' }}
    />
  );
  const card = screen.getByText('Aman Aziz').closest('[tabindex]');
  expect(card).toHaveAttribute('tabindex', '0');
});

it('scales the image on hover via a CSS class, not JavaScript', () => {
  render(
    <CommitteePortrait
      member={{
        name: 'Raveena Dheer',
        role: 'Vice-President',
        group: 'Leadership',
        photo: '/images/committee/raveena-dheer.jpg',
      }}
    />
  );
  const img = screen.getByAltText('Raveena Dheer');
  expect(img.className).toContain('group-hover:scale-105');
});
```

- [ ] **Step 2: Run the new tests to verify they fail**

Run: `npx vitest run components/CommitteePortrait.test.tsx`
Expected: the two new tests FAIL (no `tabindex`, no `group-hover:scale-105` class in the current implementation); the two pre-existing tests still PASS.

- [ ] **Step 3: Write the implementation**

Replace the full contents of `components/CommitteePortrait.tsx`:

```tsx
import type { CommitteeMember } from '@/data/types';

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function CommitteePortrait({ member }: { member: CommitteeMember }) {
  return (
    <div
      tabIndex={0}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-neutral-950 transition-all duration-500 ease-expo-out hover:-translate-y-1 hover:shadow-xl focus-visible:-translate-y-1 focus-visible:shadow-xl focus-visible:outline-none"
    >
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-[800ms] ease-expo-out group-hover:scale-105 group-focus-visible:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-2xl text-cream">
          {initials(member.name)}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/30 to-transparent p-8 pt-16 transition-colors duration-500 ease-expo-out group-hover:from-black/80 group-focus-visible:from-black/80">
        <p className="translate-y-2 font-display text-lg font-semibold text-white opacity-85 transition-all duration-500 ease-expo-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {member.name}
        </p>
        <p className="mt-1 translate-y-2 text-sm text-white/70 opacity-85 transition-all duration-500 ease-expo-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {member.role}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run all four tests to verify they pass**

Run: `npx vitest run components/CommitteePortrait.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Run the CommitteeGrid and Committee page tests to confirm no regression**

Run: `npx vitest run app/committee`
Expected: all pre-existing tests in this directory still pass unmodified (this component's external contract — props in, name/role/photo rendered — hasn't changed).

- [ ] **Step 6: Commit**

```bash
git add components/CommitteePortrait.tsx components/CommitteePortrait.test.tsx
git commit -m "feat: redesign CommitteePortrait as a hover-reveal panel"
```

---

### Task 2: OrbitingLogos component

**Files:**
- Create: `components/sponsors/OrbitingLogos.tsx`
- Test: `components/sponsors/OrbitingLogos.test.tsx`
- Modify: `app/globals.css` (append two new `@keyframes` blocks)

**Interfaces:**
- Consumes: `Sponsor` type from `@/data/types`.
- Produces: `OrbitingLogos({ sponsors }: { sponsors: Sponsor[] })`. Task 3 renders this with `SPONSORS.filter(s => s.tier === 'partner')` (6 real sponsors today).

**Why plain CSS `@keyframes` instead of `framer-motion` for the continuous rotation** (a deliberate implementation decision, not a deviation to flag in review): the orbit needs to (a) rotate forever, (b) pause on hover while holding its exact current angle, and (c) keep each logo counter-rotated so it stays upright. CSS `animation-play-state: paused` does (b) natively and exactly — it freezes at the current frame with no state tracking needed. Reproducing that with `framer-motion`'s declarative `animate` prop requires manually tracking elapsed rotation progress to resume from the right angle, which is exactly the kind of avoidable complexity the spec's Global Constraints warn against. `framer-motion` is still used, appropriately, for the discrete hover/focus detail-card entrance (mount/unmount animation via `AnimatePresence`), which is exactly the kind of thing `framer-motion` is already used for elsewhere in this codebase (`components/events/EventShowcase.tsx`'s detail dialog).

**The orbit positioning technique** (standard CSS trick, used because a single element can't have two independent `transform`s — one static angular position, one continuously animated counter-rotation): each logo is wrapped in two nested plain `div`s before the actual animated element:
1. Outer positioning `div` — static inline `style={{ transform: 'rotate(<angle>deg) translateX(<radius>px)' }}`, placing it at its fixed point around the circle. This entire circle of positioned divs sits inside the rotating orbit container, so as the container spins, every logo's positioned point travels around the circle with it.
2. Inner counter-rotation `div` — has its own CSS `@keyframes` animation spinning the opposite direction at the same speed, canceling the outer container's rotation locally so the logo image inside doesn't visually spin, only travels.

- [ ] **Step 1: Write the failing test**

```tsx
// components/sponsors/OrbitingLogos.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrbitingLogos } from './OrbitingLogos';
import type { Sponsor } from '@/data/types';

describe('OrbitingLogos', () => {
  it('renders a real, labeled, focusable control for every sponsor', () => {
    const partners: Sponsor[] = [
      { name: 'Oralieve', tier: 'partner', logo: '/images/sponsors/oralieve.png' },
      { name: 'Curaden', tier: 'partner', logo: '/images/sponsors/curaden.png' },
    ];
    render(<OrbitingLogos sponsors={partners} />);
    expect(screen.getByRole('button', { name: 'Oralieve' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Curaden' })).toBeInTheDocument();
  });

  it('shows a detail card with the sponsor name when a logo receives focus', () => {
    render(
      <OrbitingLogos
        sponsors={[{ name: 'Curaden', tier: 'partner', logo: '/images/sponsors/curaden.png' }]}
      />
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Curaden' }));
    expect(screen.getByText('Curaden')).toBeInTheDocument();
  });

  it('does not fabricate a description or link when none exist on the sponsor', () => {
    render(
      <OrbitingLogos
        sponsors={[{ name: 'Curaden', tier: 'partner', logo: '/images/sponsors/curaden.png' }]}
      />
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Curaden' }));
    expect(screen.queryByText(/visit website/i)).not.toBeInTheDocument();
  });

  it('shows the real description and website link when they exist on the sponsor', () => {
    render(
      <OrbitingLogos
        sponsors={[
          {
            name: 'MDDUS',
            tier: 'partner',
            logo: '/images/sponsors/mddus.png',
            description: 'Medico-legal support.',
            link: 'https://example.com',
          },
        ]}
      />
    );
    fireEvent.focus(screen.getByRole('button', { name: 'MDDUS' }));
    expect(screen.getByText('Medico-legal support.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit website/i })).toHaveAttribute(
      'href',
      'https://example.com'
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sponsors/OrbitingLogos.test.tsx`
Expected: FAIL with module-not-found for `./OrbitingLogos`.

- [ ] **Step 3: Add the keyframes to globals.css**

Append to `app/globals.css` (after the existing `@keyframes ambient-glow-drift` block, before the `@media (prefers-reduced-motion: reduce)` block):

```css
@keyframes orbit-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-counter-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
```

- [ ] **Step 4: Write the implementation**

```tsx
// components/sponsors/OrbitingLogos.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Sponsor } from '@/data/types';

const RADIUS = 220;

export function OrbitingLogos({ sponsors }: { sponsors: Sponsor[] }) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : sponsors[activeIndex];

  function activate(index: number) {
    setActiveIndex(index);
  }
  function deactivate(index: number) {
    setActiveIndex((current) => (current === index ? null : current));
  }

  return (
    <div className="relative mx-auto hidden h-[300px] w-[300px] md:block md:h-[340px] md:w-[340px]">
      <div
        className={`group absolute inset-0 ${
          reducedMotion
            ? ''
            : 'animate-[orbit-spin_60s_linear_infinite] hover:[animation-play-state:paused]'
        }`}
      >
        {sponsors.map((sponsor, index) => {
          const angle = (360 / sponsors.length) * index;
          return (
            <div
              key={sponsor.name}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${angle}deg) translateX(${RADIUS}px)` }}
            >
              <div
                className={`-translate-x-1/2 -translate-y-1/2 ${
                  reducedMotion
                    ? ''
                    : 'animate-[orbit-counter-spin_60s_linear_infinite] group-hover:[animation-play-state:paused]'
                }`}
              >
                <button
                  type="button"
                  onMouseEnter={() => activate(index)}
                  onMouseLeave={() => deactivate(index)}
                  onFocus={() => activate(index)}
                  onBlur={() => deactivate(index)}
                  aria-label={sponsor.name}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-cream p-3 shadow-md transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:scale-[1.08] hover:shadow-lg focus-visible:-translate-y-1 focus-visible:scale-[1.08] focus-visible:shadow-lg"
                >
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt=""
                      className="h-8 w-auto max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-display text-xs text-navy">{sponsor.name}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-56 -translate-x-1/2 rounded-xl border border-navy/10 bg-cream p-4 text-center shadow-xl"
          >
            <p className="font-display text-base text-navy">{active.name}</p>
            {active.description && (
              <p className="mt-1 text-xs text-body">{active.description}</p>
            )}
            {active.link && (
              <a
                href={active.link}
                className="pointer-events-auto mt-2 inline-block text-xs text-gold underline"
              >
                Visit website
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run components/sponsors/OrbitingLogos.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add components/sponsors/OrbitingLogos.tsx components/sponsors/OrbitingLogos.test.tsx app/globals.css
git commit -m "feat: add OrbitingLogos sponsor component"
```

---

### Task 3: Wire OrbitingLogos into SponsorsHero, retire LogoWall

**Files:**
- Modify: `components/sponsors/SponsorsHero.tsx`
- Delete: `components/sponsors/LogoWall.tsx`
- Delete: `components/sponsors/LogoWall.test.tsx` (if it exists — check first)

**Interfaces:**
- Consumes: `OrbitingLogos` from `./OrbitingLogos` (Task 2).

`LogoWall` (the existing 7-tile animated collage, which includes the diamond sponsor as tile 0) is currently rendered inside `SponsorsHero.tsx`'s right-hand column (`md:col-span-7`). This task replaces that one usage with `OrbitingLogos`, passing only the `partner`-tier sponsors (the diamond sponsor already gets its own full treatment via `DiamondTile`, rendered separately below the hero on the Sponsors page — it does not need to also appear in the orbit).

- [ ] **Step 1: Check whether a LogoWall test file exists**

Run: `ls components/sponsors/LogoWall.test.tsx 2>/dev/null && echo EXISTS || echo NONE`

- [ ] **Step 2: Update the failing/changing test**

`app/sponsors/page.test.tsx` and any existing `SponsorsHero.test.tsx` should not need content changes (they assert on diamond logo/description, partner logos in the grid below, the trade-fayre stat, and the CTA — none of which come from `LogoWall`/`OrbitingLogos`). Run the existing suite first to confirm current baseline:

Run: `npx vitest run app/sponsors`
Expected: PASS (current baseline, before this task's change)

- [ ] **Step 3: Modify SponsorsHero.tsx**

Replace the `LogoWall` import and usage in `components/sponsors/SponsorsHero.tsx`:

```tsx
import { StaggeredHeadline } from '@/components/StaggeredHeadline';
import { OrbitingLogos } from '@/components/sponsors/OrbitingLogos';
import type { Sponsor } from '@/data/types';

export function SponsorsHero({
  sponsors,
  partnerCount,
}: {
  sponsors: Sponsor[];
  partnerCount: number;
}) {
  const partners = sponsors.filter((sponsor) => sponsor.tier === 'partner');

  return (
    <section className="bg-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:items-center md:py-28">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Sponsors &amp; Partners
          </p>
          <StaggeredHeadline
            text="Backed by the best in dentistry."
            className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-cream md:text-6xl"
            as="h1"
          />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-cream/70">
            We host the largest Trade Fayre of any university dental society in the UK,
            bringing 400+ students together with industry leaders for careers insight,
            professional networking, and sponsor engagement.
          </p>
          <div className="mt-8 flex items-center gap-6 border-t border-cream/15 pt-6">
            <div>
              <p className="font-display text-2xl text-cream">400+</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">
                Students attending
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-cream">{partnerCount}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">
                Industry partners
              </p>
            </div>
            <a
              href="#become-a-sponsor"
              className="ml-auto border-b-2 border-gold pb-0.5 text-sm text-cream transition-colors duration-300 ease-expo-out hover:text-gold"
            >
              Partner with us -&gt;
            </a>
          </div>
        </div>
        <div className="md:col-span-7">
          <OrbitingLogos sponsors={partners} />
        </div>
      </div>
    </section>
  );
}
```

The only change from the current file: the import swaps from `LogoWall` to `OrbitingLogos`, and the render swaps `<LogoWall sponsors={sponsors} />` for `<OrbitingLogos sponsors={partners} />` (filtered to partner tier — `OrbitingLogos` itself has no tier-filtering logic, that's the caller's job, matching how `Timeline`'s caller passes it pre-filtered data). Every other line is unchanged.

- [ ] **Step 4: Run the sponsors test suite to verify no regression**

Run: `npx vitest run app/sponsors components/sponsors`
Expected: PASS, same test count as the Step 2 baseline plus Task 2's new `OrbitingLogos.test.tsx` tests.

- [ ] **Step 5: Delete the now-unused LogoWall files**

```bash
git rm components/sponsors/LogoWall.tsx
git rm components/sponsors/LogoWall.test.tsx 2>/dev/null || true
```

- [ ] **Step 6: Run the full suite to confirm nothing else imports LogoWall**

Run: `npx vitest run`
Expected: PASS, no module-not-found errors (would indicate something else still imports the deleted file).

- [ ] **Step 7: Commit**

```bash
git add components/sponsors/SponsorsHero.tsx
git commit -m "feat: replace LogoWall with OrbitingLogos in SponsorsHero"
```

(The `git rm` in Step 5 already stages the deletions — this commit picks them up together with the `SponsorsHero.tsx` change.)

---

### Task 4: Footer redesign

**Files:**
- Modify: `components/layout/Footer.tsx`
- Modify: `components/layout/Footer.test.tsx` (add tests; do not remove or weaken the three existing tests)

**Interfaces:**
- Consumes: `TimelineBackground` from `@/components/timeline/TimelineBackground` (already exists, no props, purely decorative — reused as-is), `SPONSORS` from `@/data/sponsors`, `useReducedMotion`/`motion` from `framer-motion`.
- No signature change: `Footer()` — same as today. `app/layout.tsx` (unchanged) keeps working without modification.

The three existing tests must keep passing unmodified:
```tsx
// components/layout/Footer.test.tsx (existing, unchanged)
it('shows a real contact email, not a placeholder', () => { /* ... */ });
it('repeats the main nav links', () => { /* ... */ }); // checks exact-name links Events/Committee/Sponsors → /events, /committee, /sponsors
it('does not contain leftover scaffold branding text', () => { /* ... */ });
```

- [ ] **Step 1: Write the new failing tests**

Add to `components/layout/Footer.test.tsx` (keep the existing three tests above them, unchanged):

```tsx
it('adds a Join nav link alongside the existing three', () => {
  render(<Footer />);
  expect(screen.getByRole('link', { name: 'Join' })).toHaveAttribute('href', '/join');
});

it('has a real closing CTA into /join, not a placeholder', () => {
  render(<Footer />);
  const cta = screen.getByRole('link', {
    name: /join the next generation of king's dentists/i,
  });
  expect(cta).toHaveAttribute('href', '/join');
});

it('displays real sponsor logos, not fabricated ones', () => {
  render(<Footer />);
  expect(screen.getByAltText('MDDUS')).toBeInTheDocument();
  expect(screen.getByAltText('Oralieve')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the new tests to verify they fail**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: the three new tests FAIL (current footer has no Join link, no CTA, no sponsor logos); the three pre-existing tests still PASS.

- [ ] **Step 3: Write the implementation**

Replace the full contents of `components/layout/Footer.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { TimelineBackground } from '@/components/timeline/TimelineBackground';
import { SPONSORS } from '@/data/sponsors';

const NAV_LINKS = [
  { href: '/events', label: 'Events' },
  { href: '/committee', label: 'Committee' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/join', label: 'Join' },
];

export function Footer() {
  const reducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.12 },
    },
  };
  const item = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <footer className="relative overflow-hidden bg-[#08121D] px-6 py-24 text-cream md:px-12">
      <TimelineBackground />
      <motion.div
        className="relative mx-auto flex max-w-4xl flex-col items-center gap-10 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.p variants={item} className="font-display text-5xl md:text-7xl">
          KCL Dental Society
        </motion.p>

        <motion.p variants={item} className="max-w-md text-base text-cream/70">
          Connecting King&apos;s dental students through education, community and opportunity.
        </motion.p>

        <motion.ul
          variants={item}
          className="flex flex-wrap justify-center gap-8 text-sm font-semibold uppercase tracking-[0.15em]"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-cream transition-colors duration-300 ease-expo-out hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-8">
          {SPONSORS.map((sponsor) =>
            sponsor.logo ? (
              <img
                key={sponsor.name}
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-6 w-auto max-w-[80px] object-contain opacity-60 grayscale transition-opacity duration-300 ease-expo-out hover:opacity-100"
              />
            ) : null
          )}
        </motion.div>

        <motion.a
          variants={item}
          href="mailto:kingsdentalsociety@gmail.com"
          className="text-sm text-cream/80 transition-colors duration-300 ease-expo-out hover:text-gold"
        >
          kingsdentalsociety@gmail.com
        </motion.a>

        <motion.div variants={item}>
          <Link
            href="/join"
            className="inline-block rounded-full bg-gold px-8 py-4 text-base font-medium text-navy transition-colors duration-300 ease-expo-out hover:bg-cream"
          >
            Join the Next Generation of King&apos;s Dentists
          </Link>
        </motion.div>

        <motion.div variants={item} className="text-xs text-cream/50">
          <p>
            © {new Date().getFullYear()} King&apos;s College London Dental Society. All rights
            reserved.
          </p>
          <p className="mt-1">Designed for King&apos;s College London students.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
```

- [ ] **Step 4: Run all six tests to verify they pass**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: PASS (6 tests)

- [ ] **Step 5: Run the full suite**

Run: `npx vitest run`
Expected: PASS, every test in the suite (this is the last code task in the plan — a clean full run here means the whole feature is done).

- [ ] **Step 6: Commit**

```bash
git add components/layout/Footer.tsx components/layout/Footer.test.tsx
git commit -m "feat: rebuild Footer as a dark final-chapter section"
```

---

### Task 5: Production build and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Run a production build**

Run: `npm run build`
Expected: build completes with no errors or type errors. (Note: if another `next dev` process is running concurrently against this same repo, the page-data-collection step may fail non-deterministically on an unrelated page — this was a known environment issue during the Legacy timeline work, not a code defect. Compilation and type-checking succeeding is the meaningful signal; re-run once if the first attempt fails oddly.)

- [ ] **Step 2: Start the dev server and view the Committee page**

Run: `npm run dev` (on a free port if 3000 is already in use by another process), open `/committee`.

Verify:
- Portraits render full-bleed with name/role visible (lower-opacity) at rest.
- Hovering a portrait: image scales up slightly, card lifts with a shadow, name/role become fully opaque and settle into place.
- Tab-focusing a portrait (keyboard) produces the identical visual state as hovering it.
- The member(s) without a photo (if any in current data) still show initials cleanly, no broken image icon.

- [ ] **Step 3: View the Sponsors page**

Verify:
- The hero's orbit shows all 6 partner logos evenly spaced in a circle, slowly rotating.
- Hovering anywhere on the orbit pauses the rotation; moving away resumes it.
- Hovering/focusing an individual logo scales it up and shows a small detail card with its name (and description/link only for sponsors that actually have one — today, none of the 6 partners do, so all 6 cards should show name only).
- The diamond sponsor tile below the hero is unchanged.
- The existing grayscale partner grid below still works as before (this is intentionally unchanged, serving as the accessible/mobile-safe listing).
- At a narrow width, the orbit is hidden (`hidden md:block`) — the page should not show an empty gap or broken layout in its place, just the hero text stacking above the (hidden) orbit slot.

- [ ] **Step 4: Scroll to the Footer on any page**

Verify:
- Background is the dark layered "archive" treatment (matches the Legacy section's visual language).
- Sections (wordmark, statement, nav, sponsor strip, email, CTA, copyright) fade/stagger into view once as the footer enters the viewport.
- The CTA button navigates to `/join`.
- Sponsor logos in the strip are legible (grayscale at rest, full color on hover).

- [ ] **Step 5: Verify reduced motion**

In Chrome DevTools' Rendering tab, set "Emulate CSS media feature prefers-reduced-motion" to "reduce", then reload each of the three pages/sections.

Verify:
- Committee: hover states apply instantly (no animated transition), but the visual end-state is still reachable on hover/focus.
- Sponsors: the orbit does not rotate at all (logos sit static and evenly spaced); hovering/focusing a logo still shows the detail card, but without the slide/fade entrance.
- Footer: all sections are fully visible immediately on load/scroll, no staggered fade-in.

- [ ] **Step 6: Report results**

Summarize: build status, manual pass results for all three areas, reduced-motion pass results, and anything unexpected found.
