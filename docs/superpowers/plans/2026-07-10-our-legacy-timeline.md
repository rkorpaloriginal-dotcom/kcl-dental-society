# "Our Legacy" Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the "Our Legacy" homepage section — a scroll-synced, self-drawing vertical timeline of five real historical milestones, presented in a deliberately darker/layered "archive" visual treatment, closing with a "Next Chapter" CTA into `/join`.

**Architecture:** A `data/timeline.ts` config file drives everything (no milestone hardcoded in JSX). Six presentational/behavioral components under `components/timeline/` compose into one `Timeline` section component, which owns the scroll-progress calculation (`useScroll`/`useTransform` from `framer-motion`, already a project dependency) and passes a derived progress value down to the line. Each `TimelineItem` and `TimelineNode` self-manage their own reveal-on-scroll via `framer-motion`'s `whileInView` (the same pattern already used in `components/events/EventShowcase.tsx`), rather than the parent driving every node's active state — this keeps each component independently testable and matches existing codebase convention. `components/timeline/` (lowercase) is used instead of the spec's literal `components/Timeline/` casing, to match the existing `components/events/` folder convention.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, `framer-motion` (already in `package.json`, not newly added — the spec's "adds framer-motion" line is already satisfied by the existing dependency), Vitest + Testing Library.

## Global Constraints

- No fabricated content: only the five verified historical facts in this plan's data task may be used — no invented alumni, photos, or events (per spec's Content section).
- No scroll-jacking, no pinned sections, no forced scrolling — all motion reacts to natural scroll position (per spec's Scroll Behavior section).
- All milestone content must exist in the DOM and be fully readable with JavaScript disabled and with `prefers-reduced-motion: reduce` enabled — animation is decorative only (per spec's Accessibility section).
- Spring easing only for entrance animations; never linear, never bounce/overshoot/elastic (per spec's Animation Sequence and Motion Philosophy sections).
- Favor `transform`/`opacity` for animated properties; no continuously-animated `filter`/blur (per spec's Performance section).
- New section lives on the homepage only — no new route, no nav item (per spec's Placement section).
- Timeline data must be entirely configuration-driven — adding a milestone means adding one object to `data/timeline.ts`, no component code changes (per spec's Data model section).
- Existing full test suite must keep passing; production build must stay clean.

---

### Task 1: Timeline data model

**Files:**
- Create: `data/timeline.ts`
- Test: `data/timeline.test.ts`

**Interfaces:**
- Produces: `TimelineMilestone` interface and `TIMELINE_MILESTONES: TimelineMilestone[]` (5 entries), both exported from `data/timeline.ts`. Every later task that renders milestone content imports these two exports.

- [ ] **Step 1: Write the failing test**

```typescript
// data/timeline.test.ts
import { describe, it, expect } from 'vitest';
import { TIMELINE_MILESTONES } from './timeline';

describe('TIMELINE_MILESTONES', () => {
  it('has exactly 5 real historical milestones, in chronological order', () => {
    expect(TIMELINE_MILESTONES).toHaveLength(5);
    expect(TIMELINE_MILESTONES.map((m) => m.year)).toEqual([
      '1839',
      '1860',
      '1894',
      '1998',
      'Present Day',
    ]);
  });

  it('every milestone has a non-empty title and body', () => {
    TIMELINE_MILESTONES.forEach((milestone) => {
      expect(milestone.title.length).toBeGreaterThan(0);
      expect(milestone.body.length).toBeGreaterThan(0);
    });
  });

  it("the founding milestone matches the Society's real founding year", () => {
    const founding = TIMELINE_MILESTONES.find((m) => m.year === '1894');
    expect(founding?.title).toMatch(/dental society founded/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run data/timeline.test.ts`
Expected: FAIL with "Failed to resolve import "./timeline"" or similar module-not-found error.

- [ ] **Step 3: Write the implementation**

```typescript
// data/timeline.ts
export interface TimelineMilestone {
  year: string;
  title: string;
  body: string;
  // Optional fields for future archival content — unused today, rendered
  // conditionally by TimelineCard so adding one later needs no component changes.
  image?: string;
  quote?: string;
  statistic?: string;
  externalLink?: string;
  documentLink?: string;
  gallery?: string[];
  video?: string;
  featured?: boolean;
  accentColor?: string;
  backgroundIllustration?: string;
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '1839',
    title: "King's College Hospital Dental Department established",
    body: 'Root of the clinical lineage the Society continues today.',
  },
  {
    year: '1860',
    title: 'First UK Professor of Dental Surgery appointed',
    body: "King's College London becomes the first UK institution to hold the post.",
  },
  {
    year: '1894',
    title: "King's College London Dental Society founded",
    body: 'The Society is formally established.',
  },
  {
    year: '1998',
    title: "Guy's, St Thomas' and King's schools unified",
    body: "The three dental schools merge into the United Medical and Dental Schools (UMDS), later integrated into King's College London.",
  },
  {
    year: 'Present Day',
    title: "Europe's largest university dental society",
    body: '1,000+ students and faculty, with partnerships across leading dental academics and industry.',
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run data/timeline.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add data/timeline.ts data/timeline.test.ts
git commit -m "feat: add Our Legacy timeline data model"
```

---

### Task 2: TimelineCard component

**Files:**
- Create: `components/timeline/TimelineCard.tsx`
- Test: `components/timeline/TimelineCard.test.tsx`

**Interfaces:**
- Consumes: `TimelineMilestone` type from `@/data/timeline` (Task 1).
- Produces: `TimelineCard({ milestone }: { milestone: TimelineMilestone })`, a presentational component with no framer-motion/animation of its own. `TimelineItem` (Task 6) renders this inside its own motion wrapper.

- [ ] **Step 1: Write the failing test**

```tsx
// components/timeline/TimelineCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimelineCard } from './TimelineCard';
import type { TimelineMilestone } from '@/data/timeline';

const baseMilestone: TimelineMilestone = {
  year: '1894',
  title: "King's College London Dental Society founded",
  body: 'The Society is formally established.',
};

describe('TimelineCard', () => {
  it('renders the year, title, and body', () => {
    render(<TimelineCard milestone={baseMilestone} />);
    expect(screen.getByText('1894')).toBeInTheDocument();
    expect(screen.getByText("King's College London Dental Society founded")).toBeInTheDocument();
    expect(screen.getByText('The Society is formally established.')).toBeInTheDocument();
  });

  it('does not render optional-field UI when those fields are absent', () => {
    const { container } = render(<TimelineCard milestone={baseMilestone} />);
    expect(container.querySelector('blockquote')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders a statistic when provided', () => {
    render(<TimelineCard milestone={{ ...baseMilestone, statistic: '1,000+ members' }} />);
    expect(screen.getByText('1,000+ members')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/timeline/TimelineCard.test.tsx`
Expected: FAIL with module-not-found for `./TimelineCard`.

- [ ] **Step 3: Write the implementation**

```tsx
// components/timeline/TimelineCard.tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/timeline/TimelineCard.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/timeline/TimelineCard.tsx components/timeline/TimelineCard.test.tsx
git commit -m "feat: add TimelineCard component"
```

---

### Task 3: TimelineNode component

**Files:**
- Create: `components/timeline/TimelineNode.tsx`
- Test: `components/timeline/TimelineNode.test.tsx`

**Interfaces:**
- Consumes: `motion` from `framer-motion`.
- Produces: `TimelineNode()` — a self-contained node with its own `whileInView` pulse-once reveal (no props). `TimelineItem` (Task 6) renders one per milestone.

- [ ] **Step 1: Write the failing test**

```tsx
// components/timeline/TimelineNode.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TimelineNode } from './TimelineNode';

describe('TimelineNode', () => {
  it('renders a gold node with a blurred glow layer and a cream inner highlight', () => {
    const { container } = render(<TimelineNode />);
    expect(container.querySelector('.blur-md')).toBeInTheDocument();
    expect(container.querySelector('.bg-cream')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/timeline/TimelineNode.test.tsx`
Expected: FAIL with module-not-found for `./TimelineNode`.

- [ ] **Step 3: Write the implementation**

```tsx
// components/timeline/TimelineNode.tsx
'use client';

import { motion } from 'framer-motion';

export function TimelineNode() {
  return (
    <div className="relative flex h-4 w-4 items-center justify-center">
      <motion.div
        className="absolute h-4 w-4 rounded-full bg-gold"
        initial={{ scale: 1, opacity: 0.4 }}
        whileInView={{ scale: [1, 1.6, 1], opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute h-4 w-4 rounded-full bg-gold opacity-40 blur-md" aria-hidden="true" />
      <div className="relative h-1.5 w-1.5 rounded-full bg-cream" />
    </div>
  );
}
```

Note: `whileInView`'s keyframe scale animation is a `framer-motion`-driven JS animation, not a CSS `animation`/`transition`, so it is not automatically neutralized by the global `prefers-reduced-motion` CSS block in `app/globals.css`. Reduced-motion handling for this pulse is applied one level up, in `TimelineItem` (Task 6), which is where `useReducedMotion` is introduced — see that task's note.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/timeline/TimelineNode.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add components/timeline/TimelineNode.tsx components/timeline/TimelineNode.test.tsx
git commit -m "feat: add TimelineNode component"
```

---

### Task 4: TimelineBackground component + grain/glow keyframes

**Files:**
- Create: `components/timeline/TimelineBackground.tsx`
- Test: `components/timeline/TimelineBackground.test.tsx`
- Modify: `app/globals.css` (append two new `@keyframes` blocks)

**Interfaces:**
- Produces: `TimelineBackground()` — a purely decorative, `aria-hidden="true"`, absolutely-positioned layer stack. `Timeline` (Task 7) renders this as the first child of the section.

- [ ] **Step 1: Write the failing test**

```tsx
// components/timeline/TimelineBackground.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TimelineBackground } from './TimelineBackground';

describe('TimelineBackground', () => {
  it('is purely decorative: hidden from assistive tech and inert to pointer events', () => {
    const { container } = render(<TimelineBackground />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root?.className).toContain('pointer-events-none');
  });

  it('renders the layered gradient, grain, and blueprint-illustration layers', () => {
    const { container } = render(<TimelineBackground />);
    expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/timeline/TimelineBackground.test.tsx`
Expected: FAIL with module-not-found for `./TimelineBackground`.

- [ ] **Step 3: Add the keyframes to globals.css**

Append to `app/globals.css` (after the existing `@keyframes clip-reveal` block, before the `@media (prefers-reduced-motion: reduce)` block):

```css
@keyframes grain-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-2%, 2%);
  }
}

@keyframes ambient-glow-drift {
  0%,
  100% {
    transform: translate(-10%, -10%);
    opacity: 0.5;
  }
  50% {
    transform: translate(10%, 5%);
    opacity: 0.8;
  }
}
```

These are plain CSS `animation`s, so they're already covered by the existing global `prefers-reduced-motion: reduce` block in the same file, which zeroes all `animation-duration`s — no extra reduced-motion handling needed for this component.

- [ ] **Step 4: Write the implementation**

```tsx
// components/timeline/TimelineBackground.tsx
export function TimelineBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Radial gradient glow behind the timeline */}
      <div className="absolute left-1/2 top-1/3 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,153,46,0.12)_0%,rgba(201,153,46,0)_70%)]" />

      {/* Subtle animated film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04] animate-[grain-drift_18s_cubic-bezier(0.45,0,0.55,1)_infinite]">
        <filter id="timeline-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#timeline-grain)" />
      </svg>

      {/* Low-opacity dentistry-inspired line art */}
      <svg
        className="absolute -left-16 top-24 h-64 w-64 opacity-5"
        viewBox="0 0 200 200"
        fill="none"
        stroke="#F7F3EC"
        strokeWidth="1.5"
      >
        <path d="M100 20c-30 0-45 25-45 55 0 35 15 70 25 90 5 10 10 15 20 15s15-5 20-15c10-20 25-55 25-90 0-30-15-55-45-55z" />
        <path d="M70 60c10-10 50-10 60 0" />
      </svg>
      <svg
        className="absolute -right-10 bottom-32 h-72 w-72 opacity-5"
        viewBox="0 0 200 200"
        fill="none"
        stroke="#F7F3EC"
        strokeWidth="1.5"
      >
        <circle cx="100" cy="100" r="70" />
        <path d="M60 70c15 20 65 20 80 0" />
        <path d="M60 130c15-20 65-20 80 0" />
        <path d="M100 30v140" />
      </svg>

      {/* Ambient drifting glow */}
      <div className="absolute inset-0 animate-[ambient-glow-drift_24s_cubic-bezier(0.45,0,0.55,1)_infinite] bg-[radial-gradient(circle_at_30%_40%,rgba(201,153,46,0.08)_0%,rgba(201,153,46,0)_60%)]" />
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run components/timeline/TimelineBackground.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add components/timeline/TimelineBackground.tsx components/timeline/TimelineBackground.test.tsx app/globals.css
git commit -m "feat: add TimelineBackground layered archive background"
```

---

### Task 5: TimelineLine component

**Files:**
- Create: `components/timeline/TimelineLine.tsx`
- Test: `components/timeline/TimelineLine.test.tsx`

**Interfaces:**
- Consumes: `MotionValue<number>` type and `motion` from `framer-motion`.
- Produces: `TimelineLine({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean })`. `Timeline` (Task 7) creates the `progress` value via `useScroll`/`useTransform` and passes it in along with the result of its own `useReducedMotion()` call.

- [ ] **Step 1: Write the failing test**

```tsx
// components/timeline/TimelineLine.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { useMotionValue } from 'framer-motion';
import { TimelineLine } from './TimelineLine';

function Harness({ reducedMotion }: { reducedMotion: boolean }) {
  const progress = useMotionValue(0.5);
  return <TimelineLine progress={progress} reducedMotion={reducedMotion} />;
}

describe('TimelineLine', () => {
  it('renders a track and a fill element', () => {
    const { getByTestId } = render(<Harness reducedMotion={false} />);
    expect(getByTestId('timeline-line-track')).toBeInTheDocument();
    expect(getByTestId('timeline-line-fill')).toBeInTheDocument();
  });

  it('renders fully drawn (scaleY 1) when reduced motion is requested, ignoring scroll progress', () => {
    const { getByTestId } = render(<Harness reducedMotion={true} />);
    const fill = getByTestId('timeline-line-fill');
    expect(fill.style.transform).toContain('scaleY(1)');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/timeline/TimelineLine.test.tsx`
Expected: FAIL with module-not-found for `./TimelineLine`.

- [ ] **Step 3: Write the implementation**

```tsx
// components/timeline/TimelineLine.tsx
'use client';

import { motion, useMotionTemplate, type MotionValue } from 'framer-motion';

export function TimelineLine({
  progress,
  reducedMotion,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  // Binding `scaleY` directly (a plain number for the reduced-motion case) does not
  // synchronously produce a `transform` style string in this framer-motion version —
  // it only does for MotionValues. Templating it explicitly keeps both the reduced-
  // and non-reduced-motion cases on the same, verifiably synchronous code path.
  const scaleY = useMotionTemplate`scaleY(${reducedMotion ? 1 : progress})`;

  return (
    <div
      className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gold/15"
      aria-hidden="true"
      data-testid="timeline-line-track"
    >
      <motion.div
        className="w-full origin-top rounded-full bg-gold shadow-[0_0_12px_2px_rgba(201,153,46,0.6)]"
        style={{ height: '100%', transform: scaleY }}
        data-testid="timeline-line-fill"
      />
    </div>
  );
}
```

Correction (found during implementation): the original draft of this task specified binding `scaleY` directly in the `style` prop. That does not synchronously produce a `transform` style string for a plain number in this `framer-motion` version — it only does so for genuine `MotionValue`s — so the required test (`fill.style.transform` containing `'scaleY(1)'` under reduced motion) fails against that binding. Verified directly by running both versions against the test above. The `useMotionTemplate` version shown here is correct and is what actually ships.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/timeline/TimelineLine.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/timeline/TimelineLine.tsx components/timeline/TimelineLine.test.tsx
git commit -m "feat: add scroll-synced TimelineLine component"
```

---

### Task 6: TimelineItem component + matchMedia test polyfill

**Files:**
- Create: `components/timeline/TimelineItem.tsx`
- Test: `components/timeline/TimelineItem.test.tsx`
- Modify: `vitest.setup.ts` (add a `window.matchMedia` mock)

**Interfaces:**
- Consumes: `TimelineMilestone` from `@/data/timeline` (Task 1), `TimelineNode` (Task 3), `TimelineCard` (Task 2), `useReducedMotion`/`motion` from `framer-motion`.
- Produces: `TimelineItem({ milestone, index }: { milestone: TimelineMilestone; index: number })`. `Timeline` (Task 7) renders one per entry in `TIMELINE_MILESTONES`, passing the array index for left/right alternation.

`framer-motion`'s `useReducedMotion()` reads `window.matchMedia('(prefers-reduced-motion: reduce)')`, which jsdom does not implement by default (calling it throws "not implemented"). This task is the first to use the hook, so it adds the mock to the shared test setup file — every subsequent test run benefits from it.

- [ ] **Step 1: Add the matchMedia mock to vitest.setup.ts**

Insert into `vitest.setup.ts`, directly after the existing `ResizeObserverMock` block (after line 21, before the `import '@testing-library/jest-dom/vitest';` line):

```typescript
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
```

- [ ] **Step 2: Write the failing test**

```tsx
// components/timeline/TimelineItem.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimelineItem } from './TimelineItem';
import type { TimelineMilestone } from '@/data/timeline';

const milestone: TimelineMilestone = {
  year: '1894',
  title: "King's College London Dental Society founded",
  body: 'The Society is formally established.',
};

describe('TimelineItem', () => {
  it('renders the milestone content in the DOM regardless of animation/inView state', () => {
    render(<TimelineItem milestone={milestone} index={0} />);
    expect(screen.getByText('1894')).toBeInTheDocument();
    expect(screen.getByText("King's College London Dental Society founded")).toBeInTheDocument();
  });

  it('reverses layout for odd-indexed items so cards alternate sides on desktop', () => {
    const { container: leftContainer } = render(<TimelineItem milestone={milestone} index={0} />);
    const { container: rightContainer } = render(<TimelineItem milestone={milestone} index={1} />);
    expect(leftContainer.firstElementChild?.className).not.toContain('md:flex-row-reverse');
    expect(rightContainer.firstElementChild?.className).toContain('md:flex-row-reverse');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run components/timeline/TimelineItem.test.tsx`
Expected: FAIL with module-not-found for `./TimelineItem`.

- [ ] **Step 4: Write the implementation**

```tsx
// components/timeline/TimelineItem.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { TimelineMilestone } from '@/data/timeline';
import { TimelineNode } from './TimelineNode';
import { TimelineCard } from './TimelineCard';

export function TimelineItem({
  milestone,
  index,
}: {
  milestone: TimelineMilestone;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const isRightAligned = index % 2 === 1;

  return (
    <div
      className={`relative flex w-full items-start gap-6 py-12 md:gap-0 ${
        isRightAligned ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="flex w-8 flex-none justify-center pt-2 md:w-1/2 md:justify-center">
        <TimelineNode />
      </div>
      <motion.div
        className={`flex-1 md:w-1/2 ${isRightAligned ? 'md:pr-12' : 'md:pl-12'}`}
        initial={reducedMotion ? false : { opacity: 0, y: 32 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', stiffness: 210, damping: 30 }}
      >
        <TimelineCard milestone={milestone} />
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run components/timeline/TimelineItem.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 6: Run the full suite to confirm the matchMedia mock didn't break anything else**

Run: `npx vitest run`
Expected: all previously-passing tests still pass; no new failures introduced by the `matchMedia` mock.

- [ ] **Step 7: Commit**

```bash
git add components/timeline/TimelineItem.tsx components/timeline/TimelineItem.test.tsx vitest.setup.ts
git commit -m "feat: add TimelineItem with reduced-motion-aware reveal"
```

---

### Task 7: Timeline section component

**Files:**
- Create: `components/timeline/Timeline.tsx`
- Test: `components/timeline/Timeline.test.tsx`

**Interfaces:**
- Consumes: `TIMELINE_MILESTONES` from `@/data/timeline` (Task 1), `TimelineBackground` (Task 4), `TimelineLine` (Task 5), `TimelineItem` (Task 6), `useScroll`/`useTransform`/`useReducedMotion` from `framer-motion`, `Link` from `next/link`.
- Produces: `Timeline()` — the full section, no props, ready to drop into `app/page.tsx`. This is the only export `app/page.tsx` (Task 8) needs.

- [ ] **Step 1: Write the failing test**

```tsx
// components/timeline/Timeline.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from './Timeline';

describe('Timeline', () => {
  it('renders the "Our Legacy" heading and every milestone year', () => {
    render(<Timeline />);
    expect(screen.getByRole('heading', { name: 'Our Legacy' })).toBeInTheDocument();
    ['1839', '1860', '1894', '1998', 'Present Day'].forEach((year) => {
      expect(screen.getByText(year)).toBeInTheDocument();
    });
  });

  it('closes with a real "Join the Society" CTA linking to /join', () => {
    render(<Timeline />);
    const cta = screen.getByRole('link', { name: /join the society/i });
    expect(cta).toHaveAttribute('href', '/join');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/timeline/Timeline.test.tsx`
Expected: FAIL with module-not-found for `./Timeline`.

- [ ] **Step 3: Write the implementation**

```tsx
// components/timeline/Timeline.tsx
'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { TIMELINE_MILESTONES } from '@/data/timeline';
import { TimelineBackground } from './TimelineBackground';
import { TimelineLine } from './TimelineLine';
import { TimelineItem } from './TimelineItem';

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#08121D] px-6 py-32 md:px-12">
      <TimelineBackground />
      <div className="relative mx-auto max-w-5xl">
        <h2 className="text-center font-display text-4xl text-cream md:text-6xl">Our Legacy</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base text-cream/70">
          More than 130 years of dental excellence at King&apos;s.
        </p>

        <div className="relative mt-20">
          <TimelineLine progress={lineProgress} reducedMotion={!!reducedMotion} />
          {TIMELINE_MILESTONES.map((milestone, index) => (
            <TimelineItem key={milestone.year} milestone={milestone} index={index} />
          ))}
        </div>

        <div className="relative mx-auto mt-24 max-w-lg text-center">
          <h3 className="font-display text-3xl text-cream md:text-4xl">The Next Chapter</h3>
          <p className="mt-4 text-base leading-relaxed text-cream/80">
            Every student who joins the King&apos;s College London Dental Society becomes part of
            a legacy spanning more than a century. The next chapter has yet to be written.
          </p>
          <Link
            href="/join"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-4 text-base font-medium text-navy transition-colors duration-300 ease-expo-out hover:bg-cream"
          >
            Join the Society
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/timeline/Timeline.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/timeline/Timeline.tsx components/timeline/Timeline.test.tsx
git commit -m "feat: compose Timeline section component"
```

---

### Task 8: Wire Timeline into the homepage

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/page.test.tsx`

**Interfaces:**
- Consumes: `Timeline` from `@/components/timeline/Timeline` (Task 7).

Adding a second real link whose accessible name contains "Join" (the new "Join the Society" CTA) makes the existing test's `getByRole('link', { name: /join/i })` query ambiguous (it will match both the hero "Join" button and the new CTA, and `getByRole` throws on multiple matches). This task tightens that one query to an exact match on `'Join'` — the assertion's intent (real, non-dead Join link) is unchanged.

- [ ] **Step 1: Write the failing test**

Modify `app/page.test.tsx`:

```tsx
// app/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('has a real Join link, not a dead button', () => {
    render(<Home />);
    const joinLink = screen.getByRole('link', { name: 'Join' });
    expect(joinLink.getAttribute('href')).not.toBe('#');
    expect(joinLink.getAttribute('href')).toBeTruthy();
  });

  it('teases the Events, Committee, and Sponsors pages with real links', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /explore events/i })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('link', { name: /meet the committee/i })).toHaveAttribute('href', '/committee');
    expect(screen.getByRole('link', { name: /our sponsors/i })).toHaveAttribute('href', '/sponsors');
  });

  it('does not contain leftover scaffold branding text', () => {
    render(<Home />);
    expect(screen.queryByText(/lovable/i)).not.toBeInTheDocument();
  });

  it('introduces the Our Legacy timeline with real Society history and a Join the Society CTA', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'Our Legacy' })).toBeInTheDocument();
    expect(screen.getByText('1894')).toBeInTheDocument();
    const legacyCta = screen.getByRole('link', { name: /join the society/i });
    expect(legacyCta).toHaveAttribute('href', '/join');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/page.test.tsx`
Expected: FAIL — the new "Our Legacy" heading assertion fails because `Timeline` isn't rendered on the page yet.

- [ ] **Step 3: Insert Timeline into the page**

Modify `app/page.tsx` — add the import and insert `<Timeline />` between the mission block (ends `</RevealOnScroll>` after the Join/Society App buttons) and the teaser grid (`<RevealOnScroll className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">`):

```tsx
import Link from 'next/link';
import { VideoHero } from '@/components/VideoHero';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Timeline } from '@/components/timeline/Timeline';

export default function Home() {
  return (
    <>
      <VideoHero />

      <RevealOnScroll className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-[3fr_2fr]">
        <h2 className="font-display text-4xl leading-tight text-navy md:text-6xl">
          KCL Dental Society is a community built to make your time at dental school{' '}
          <span className="text-navy underline decoration-gold decoration-4 underline-offset-4">
            unforgettable
          </span>
          .
        </h2>
        <p className="self-end text-base leading-relaxed text-body">
          Creating lasting connections among students from diverse backgrounds and delivering
          the best London has to offer — academically, socially, and professionally.
        </p>
        <div className="flex flex-wrap gap-4 md:col-span-2">
          <Link
            href="/join"
            className="rounded-full bg-navy px-6 py-3 text-cream transition-colors duration-300 ease-expo-out hover:bg-gold"
          >
            Join
          </Link>
          <a
            href="https://go.link2app.co/QlZx6wiDP0b"
            className="rounded-full border border-navy px-6 py-3 text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
          >
            Society App
          </a>
        </div>
      </RevealOnScroll>

      <Timeline />

      <RevealOnScroll className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
        <div className="border-t-2 border-navy pt-6 md:col-span-2 md:row-span-2">
          <h3 className="font-display text-3xl text-navy">What We Run</h3>
          <p className="mt-3 max-w-md text-sm text-body">
            Boat parties, formals, workshops, and more.
          </p>
          <Link
            href="/events"
            className="mt-6 inline-block border-b-2 border-gold text-navy hover:text-gold"
          >
            Explore Events →
          </Link>
        </div>
        <div className="border-t-2 border-navy pt-6">
          <h3 className="font-display text-xl text-navy">Your Committee</h3>
          <p className="mt-2 text-sm text-body">The people making it all happen.</p>
          <Link
            href="/committee"
            className="mt-4 inline-block border-b-2 border-gold text-navy hover:text-gold"
          >
            Meet the Committee →
          </Link>
        </div>
        <div className="border-t-2 border-navy pt-6">
          <h3 className="font-display text-xl text-navy">Our Partners</h3>
          <p className="mt-2 text-sm text-body">
            Industry support for the largest trade fayre in the UK.
          </p>
          <Link
            href="/sponsors"
            className="mt-4 inline-block border-b-2 border-gold text-navy hover:text-gold"
          >
            Our Sponsors →
          </Link>
        </div>
      </RevealOnScroll>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Run the full test suite**

Run: `npx vitest run`
Expected: all tests pass (pre-existing unrelated failures, if any, are out of scope for this plan — see note below).

Note: at the time this plan was written, `components/RevealOnScroll.test.tsx` had 3 pre-existing failures unrelated to this feature (the component's `visible` state never becomes `true` under the mocked `IntersectionObserver`, so its fade/clip assertions fail). This is not caused by and not in scope for this plan — do not fix it as part of these tasks. If it blocks a clean full-suite run, note it explicitly when reporting results rather than silently patching it.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: insert Our Legacy timeline into the homepage"
```

---

### Task 9: Production build and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Run a production build**

Run: `npm run build`
Expected: build completes with no errors or type errors.

- [ ] **Step 2: Start the dev server and view the homepage**

Run: `npm run dev`, then open `http://localhost:3000` in a browser.

Verify:
- Scrolling from the mission section into "Our Legacy" shows the background darken into the archive treatment (no abrupt color jump).
- The gold line progressively draws as you scroll through the section; it does not jump or lag noticeably.
- Each milestone card slides/fades in as it enters view, alternating sides on desktop.
- The section ends with "The Next Chapter" copy and a working "Join the Society" button that navigates to `/join`.
- Resize to a mobile width (375px): the line and all cards stack in a single centered column, no horizontal scrolling appears anywhere.

- [ ] **Step 3: Verify reduced motion**

In Chrome DevTools, open the Rendering tab and set "Emulate CSS media feature prefers-reduced-motion" to "reduce", then reload the homepage.

Verify:
- The timeline line renders fully drawn immediately (no progressive draw-in as you scroll).
- All milestone cards and nodes are fully visible immediately, with no slide/fade/pulse animation.
- All milestone text (years, titles, bodies) and the "Join the Society" CTA are present and readable.

- [ ] **Step 4: Verify contrast**

Check the cream/cream-70%/gold text against the `#08121D` background (and against the radial-gradient/glow overlays at their brightest point) meets WCAG AA (4.5:1 for body text, 3:1 for large text) using a browser contrast checker or DevTools' accessibility panel on the section.

- [ ] **Step 5: Report results**

Summarize: build status, manual pass results, reduced-motion pass results, contrast check results, and the pre-existing `RevealOnScroll` test status noted in Task 8.
