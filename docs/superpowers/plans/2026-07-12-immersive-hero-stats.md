# Immersive Hero + Animated Stats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage hero (`components/VideoHero.tsx`) into an immersive experience with mouse-reactive ambient lighting, floating glassmorphic animated stat cards, and a scroll indicator — then remove the now-redundant static stats band from `app/page.tsx`.

**Architecture:** A new typed `data/stats.ts` module feeds a new `StatCounter` component (glass card + count-up animation) that's composed into `VideoHero`. `VideoHero` gains a ref-driven mouse-tracked glow layer and a scroll-linked fading chevron, both gated on `prefers-reduced-motion`. `app/page.tsx` loses its static stats band since the hero now owns that content.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion `^12.42.2` (already installed — no new dependencies), Vitest + React Testing Library.

## Global Constraints

- No new npm runtime dependencies — use only `framer-motion` (already installed) and Tailwind.
- All new motion must respect `prefers-reduced-motion` via Framer Motion's `useReducedMotion()` hook (matches `OrbitingLogos.tsx`, `Footer.tsx`).
- Follow existing data-layer convention: typed `UPPER_SNAKE_CASE` exported array/const in `data/*.ts`, paired `data/*.test.ts` (see `data/timeline.ts` / `data/timeline.test.ts`).
- Match existing glassmorphism styling: `rounded-2xl border border-gold/30 bg-cream/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md` (from `TimelineCard.tsx`).
- Colour tokens (from `tailwind.config.ts`): `navy: #1B2A56`, `gold: #C9992E`, `cream: #F7F3EC`.
- No new video/image assets — reuse `/video/welcome.mp4` and `/images/events/boat-party.jpg`.
- Trophy Cabinet, interactive campus map, and editorial testimonials are explicitly out of scope — do not add them.

---

### Task 1: Stats data module

**Files:**
- Create: `data/stats.ts`
- Test: `data/stats.test.ts`

**Interfaces:**
- Consumes: `SPONSORS` from `data/sponsors.ts` (existing, `Sponsor[]`, already imported elsewhere via `import { SPONSORS } from '@/data/sponsors'`).
- Produces: `export interface Stat { value: number; suffix: string; label: string; }` and `export const STATS: Stat[]` (4 entries) — consumed by Task 2 and Task 3.

- [ ] **Step 1: Write the failing test**

Create `data/stats.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { STATS } from './stats';
import { SPONSORS } from './sponsors';

describe('STATS', () => {
  it('has exactly 4 stat cards', () => {
    expect(STATS).toHaveLength(4);
  });

  it('every stat has a positive value and a non-empty label', () => {
    STATS.forEach((stat) => {
      expect(stat.value).toBeGreaterThan(0);
      expect(stat.label.length).toBeGreaterThan(0);
    });
  });

  it('includes the headline history and membership figures', () => {
    expect(STATS.find((s) => s.label === 'Years of Society History')?.value).toBe(130);
    expect(STATS.find((s) => s.label === 'Members Across the School')?.value).toBe(1000);
  });

  it('derives the sponsor count from the sponsors data module', () => {
    const sponsorStat = STATS.find((s) => s.label === 'Industry Sponsors');
    expect(sponsorStat?.value).toBe(SPONSORS.length);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run data/stats.test.ts`
Expected: FAIL with "Cannot find module './stats'" (or similar — `data/stats.ts` doesn't exist yet).

- [ ] **Step 3: Write minimal implementation**

Create `data/stats.ts`:

```ts
import { SPONSORS } from './sponsors';

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 130, suffix: '+', label: 'Years of Society History' },
  { value: 1000, suffix: '+', label: 'Members Across the School' },
  { value: 40, suffix: '+', label: 'Annual Events' },
  { value: SPONSORS.length, suffix: '', label: 'Industry Sponsors' },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run data/stats.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add data/stats.ts data/stats.test.ts
git commit -m "feat: add typed stats data module for hero stat cards"
```

---

### Task 2: StatCounter component

**Files:**
- Create: `components/StatCounter.tsx`
- Test: `components/StatCounter.test.tsx`

**Interfaces:**
- Consumes: `Stat` type from `data/stats.ts` (Task 1) — props are `{ value: number; suffix: string; label: string }` (spread from a `Stat`).
- Produces: `export function StatCounter(props: Stat): JSX.Element` — consumed by Task 3 (`VideoHero.tsx`).

**Design notes for the implementer:** The card's *initial* rendered number must equal the *final* value (not `0`). This is not a cosmetic choice — in test environments (and for users with JS disabled or before hydration), the count-up animation never runs, so if the initial state were `0` the number would be stuck at `0` forever in those cases. The count-up is a progressive-enhancement flourish: on first scroll into view (via `useInView`), the displayed number is briefly reset and animated from `0` up to `value`. Under reduced motion, the animation effect must not run at all, so the number stays at its initial (final) value throughout.

- [ ] **Step 1: Write the failing test**

Create `components/StatCounter.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCounter } from './StatCounter';

describe('StatCounter', () => {
  it('renders the final value and label immediately', () => {
    render(<StatCounter value={130} suffix="+" label="Years of Society History" />);
    expect(screen.getByText('130+')).toBeInTheDocument();
    expect(screen.getByText('Years of Society History')).toBeInTheDocument();
  });

  it('exposes a single accessible group label combining value and description', () => {
    render(<StatCounter value={1000} suffix="+" label="Members Across the School" />);
    expect(
      screen.getByRole('group', { name: '1000+ Members Across the School' })
    ).toBeInTheDocument();
  });

  it('renders a stat with no suffix cleanly', () => {
    render(<StatCounter value={7} suffix="" label="Industry Sponsors" />);
    expect(screen.getByRole('group', { name: '7 Industry Sponsors' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/StatCounter.test.tsx`
Expected: FAIL with "Cannot find module './StatCounter'"

- [ ] **Step 3: Write minimal implementation**

Create `components/StatCounter.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import type { Stat } from '@/data/stats';

export function StatCounter({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, reducedMotion, value]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={`${value}${suffix} ${label}`}
      className="rounded-2xl border border-gold/30 bg-cream/10 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md"
    >
      <p aria-hidden="true" className="font-display text-4xl leading-none text-cream md:text-5xl">
        {display}
        {suffix}
      </p>
      <p
        aria-hidden="true"
        className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70"
      >
        {label}
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/StatCounter.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/StatCounter.tsx components/StatCounter.test.tsx
git commit -m "feat: add StatCounter glass card with viewport-triggered count-up"
```

---

### Task 3: Rebuild VideoHero with glow, stat cards, and scroll indicator

**Files:**
- Modify: `components/VideoHero.tsx`
- Modify: `components/VideoHero.test.tsx`

**Interfaces:**
- Consumes: `STATS` from `data/stats.ts` (Task 1), `StatCounter` from `components/StatCounter.tsx` (Task 2), existing `StaggeredHeadline` from `components/StaggeredHeadline.tsx` (unchanged).
- Produces: `export function VideoHero(): JSX.Element` (same export signature as before — no consumers outside `app/page.tsx` need to change their import).

- [ ] **Step 1: Write the failing tests**

Add to `components/VideoHero.test.tsx` (append inside the existing `describe('VideoHero', ...)` block, after the current three tests):

```tsx
  it('renders all four stat cards with accessible group labels', () => {
    render(<VideoHero />);
    expect(
      screen.getByRole('group', { name: /130\+ years of society history/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: /1000\+ members across the school/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /40\+ annual events/i })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /industry sponsors/i })).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/VideoHero.test.tsx`
Expected: FAIL — no elements with role `group` exist yet in `VideoHero`.

- [ ] **Step 3: Write the implementation**

Replace the full contents of `components/VideoHero.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { StaggeredHeadline } from '@/components/StaggeredHeadline';
import { StatCounter } from '@/components/StatCounter';
import { STATS } from '@/data/stats';

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    function handleMouseMove(event: MouseEvent) {
      const rect = hero!.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      glow!.style.setProperty('--glow-x', `${x}%`);
      glow!.style.setProperty('--glow-y', `${y}%`);
    }

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  const glowStyle: CSSProperties & Record<'--glow-x' | '--glow-y', string> = {
    '--glow-x': '33%',
    '--glow-y': '33%',
    background:
      'radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(201,153,46,0.18), transparent 70%)',
  };

  return (
    <div ref={heroRef} className="relative h-[85dvh] w-full overflow-hidden bg-navy">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/welcome.mp4"
        poster="/images/events/boat-party.jpg"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
      />
      <div className="absolute inset-0 bg-navy/60" />
      <div ref={glowRef} aria-hidden="true" className="pointer-events-none absolute inset-0" style={glowStyle} />
      <div className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
        <StaggeredHeadline
          text="King's College London Dental Society"
          className="font-display text-5xl leading-[0.95] tracking-tight text-cream md:text-8xl"
          as="h1"
        />
        <p className="mt-6 text-lg uppercase tracking-[0.2em] text-gold">
          Community · Careers · Culture
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-6">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: indicatorOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="text-cream/70"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      )}
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-6 right-6 rounded-full border border-cream/60 px-4 py-2 text-sm text-cream transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
      >
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/VideoHero.test.tsx`
Expected: PASS (4 tests — the 3 original plus the new stat-cards test)

- [ ] **Step 5: Commit**

```bash
git add components/VideoHero.tsx components/VideoHero.test.tsx
git commit -m "feat: rebuild VideoHero with mouse-reactive glow, stat cards, and scroll indicator"
```

---

### Task 4: Remove the redundant static stats band from the homepage

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/page.test.tsx`

**Interfaces:**
- Consumes: `VideoHero` from `components/VideoHero.tsx` (Task 3, already imported in `app/page.tsx`, unchanged import).
- Produces: none (leaf task — `Home` page component signature is unchanged).

- [ ] **Step 1: Update the test to match the new, de-duplicated content**

In `app/page.test.tsx`, delete this test (its assertions now live in `components/VideoHero.test.tsx`, added in Task 3):

```tsx
  it('features the headline membership and history stats', () => {
    render(<Home />);
    expect(screen.getByText('130+')).toBeInTheDocument();
    expect(screen.getByText(/years of society history/i)).toBeInTheDocument();
    expect(screen.getByText('1000+')).toBeInTheDocument();
    expect(screen.getByText(/members across the school/i)).toBeInTheDocument();
  });
```

The resulting `app/page.test.tsx` should have 4 `it(...)` blocks (Join link, Events/Committee/Sponsors links, no scaffold branding, Our Legacy timeline) instead of 5.

- [ ] **Step 2: Run the full test file to confirm it's green before touching page.tsx**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS (4 tests) — removing an assertion doesn't require `page.tsx` changes yet, this just confirms no other test relied on the stats band.

- [ ] **Step 3: Remove the static stats band from `app/page.tsx`**

In `app/page.tsx`, delete this block (the second `<RevealOnScroll>` element, currently between the intro copy block and `<Timeline />`):

```tsx
      <RevealOnScroll className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid overflow-hidden border-y-2 border-navy bg-cream text-navy md:grid-cols-[1fr_1fr_auto]">
          <div className="px-6 py-8 md:border-r-2 md:border-navy md:px-10 md:py-10">
            <p className="font-display text-5xl leading-none md:text-7xl">130+</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-body/60">
              Years of society history
            </p>
          </div>
          <div className="border-t-2 border-navy px-6 py-8 md:border-r-2 md:border-t-0 md:px-10 md:py-10">
            <p className="font-display text-5xl leading-none md:text-7xl">1000+</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-body/60">
              Members across the school
            </p>
          </div>
          <div className="border-t-2 border-navy px-6 py-6 md:border-t-0 md:px-8 md:py-10">
            <p className="max-w-xs text-sm leading-relaxed text-body">
              A student-led network connecting generations of King's dental students through
              academic, professional, and social life.
            </p>
          </div>
        </div>
      </RevealOnScroll>

```

Leave everything else in `app/page.tsx` unchanged (the `VideoHero`, the intro `RevealOnScroll` copy block, `<Timeline />`, and the bottom link grid all stay exactly as they are).

- [ ] **Step 4: Run the full test suite to verify everything passes**

Run: `npx vitest run`
Expected: PASS — all suites green, including `app/page.test.tsx` (4 tests), `components/VideoHero.test.tsx` (4 tests), `components/StatCounter.test.tsx` (3 tests), `data/stats.test.ts` (4 tests).

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "refactor: remove static homepage stats band, now owned by the hero"
```

---

### Task 5: Manual verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite one more time**

Run: `npx vitest run`
Expected: PASS, all suites green.

- [ ] **Step 2: Run the linter and type checker if configured**

Run: `npm run lint` (if a `lint` script exists in `package.json`)
Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Start the dev server and visually check the hero in a browser**

Run: `npm run dev`, open the homepage. Confirm:
- The video hero plays, headline and tagline render as before.
- Four glass stat cards appear below the tagline, numbers count up once scrolled fully into view (they're already in view on load for most viewports, so a quick 0→value count-up should be visible on first paint too since `useInView` fires immediately for in-viewport elements).
- Moving the mouse over the hero shifts a soft gold glow toward the cursor.
- A small bouncing chevron sits bottom-center and fades out as you start scrolling.
- The old static "130+ / 1000+" band below the hero is gone; the page flows straight from the intro copy into the Timeline section.
- Toggle OS/browser "reduce motion" setting: glow should sit static at center-ish, chevron should not render, stat numbers should show final values with no count-up.

- [ ] **Step 4: Stop the dev server**

No commit for this task — it's a verification-only pass.
