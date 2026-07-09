# Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the existing KCL Dental Society site from its current safe navy-header/white-body execution into a bold editorial/magazine aesthetic — new typography (Fraunces + Instrument Sans), a navy/cream/gold palette with different ratios (cream as the dominant background, gold used sparingly as a highlight rather than spread evenly), asymmetric layouts per page, and choreographed CSS-only motion with custom easing — while leaving every route, every piece of real content, and the data layer untouched.

**Architecture:** Same Next.js 14 App Router + Tailwind + Vitest project at `C:\Users\A\kcl-dental-society`. Design tokens (colors, fonts, easing curves) live in `tailwind.config.ts` and `app/globals.css`, changed once and inherited everywhere via existing utility class names (`bg-navy`, `text-body`, `font-display`, etc.) so most page/component files only need visual restyling, not a token rename. One component is retired (`CommitteeCard`, replaced by `CommitteeRow` for the new typographic committee index) and one is added (`StaggeredHeadline`, a pure-CSS word-by-word reveal for the homepage hero). No new npm dependencies.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3, Vitest, @testing-library/react, next/font (Fraunces + Instrument Sans)

## Global Constraints

- Navy `#1B2A56` and gold `#C9992E` stay the exact same hex values as the current build (real brand colors) — only their usage ratio changes. New tokens: cream `#F7F3EC` (replaces plain white as the page background) and a warm near-black body-text ink `#1A1613` (replaces `#444444`, replaces the `body` color token's value).
- No pure white (`#FFFFFF`) or pure black (`#000000`) anywhere in `app/globals.css`.
- No new npm dependencies — motion stays CSS/Tailwind, extending the existing `IntersectionObserver`-based `RevealOnScroll`.
- Every easing curve must be a custom cubic-bezier (`ease-expo-out` = `cubic-bezier(0.16, 1, 0.3, 1)`, `ease-quart-out` = `cubic-bezier(0.25, 1, 0.5, 1)`) — never Tailwind's default `ease`, `ease-in`, `ease-out`, or `linear`.
- `prefers-reduced-motion: reduce` must disable all animation/transition duration site-wide via a single global CSS rule — content must always be reachable without motion.
- No content, route, or data-layer changes: `data/events.ts`, `data/committee.ts`, `data/sponsors.ts`, `data/types.ts` stay as-is (one doc-comment update allowed, no data value changes). Every existing real link/href/copy string stays unless a task explicitly says otherwise.
- Committee: every row uses the identical typographic treatment — no per-person special-casing, no carousel/pagination, full ~39-person roster visible on one page.
- Existing tests that assert on real content/links/behavior (not exact class names) must still pass unmodified — a test only needs updating if the design change removes the exact literal content it as
serted on (e.g. deleting `CommitteeCard`, or the hex colors in `globals.test.ts`).

---

## Task 1: Design tokens — colors, fonts config, easing, reduced-motion

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/globals.test.ts`

**Interfaces:**
- Produces: Tailwind color tokens `navy` (`#1B2A56`, unchanged), `gold` (`#C9992E`, unchanged), `cream` (`#F7F3EC`, new), `body` (`#1A1613`, changed value — same token name, different hex, so every existing `text-body` usage across the codebase updates automatically). Tailwind timing-function utilities `ease-expo-out` and `ease-quart-out`. CSS keyframes `word-reveal` and `clip-reveal` in `app/globals.css`, consumed by Task 3's `StaggeredHeadline`.

- [ ] **Step 1: Write the failing test**

Replace the full contents of `app/globals.test.ts`:

```ts
// app/globals.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('globals.css', () => {
  const css = fs.readFileSync(path.resolve(__dirname, './globals.css'), 'utf-8');

  it('keeps the brand navy and gold as raw values, unchanged from the original build', () => {
    expect(css).toMatch(/#1b2a56/i);
    expect(css).toMatch(/#c9992e/i);
  });

  it('defines a warm cream background and warm ink text color, never pure white or pure black', () => {
    expect(css).toMatch(/#f7f3ec/i);
    expect(css).toMatch(/#1a1613/i);
    expect(css).not.toMatch(/#ffffff/i);
    expect(css).not.toMatch(/#000000/i);
  });

  it('defines custom easing curves, not left to default linear/ease', () => {
    expect(css).toMatch(/cubic-bezier\(\s*0\.16,\s*1,\s*0\.3,\s*1\s*\)/i);
  });

  it('disables animation and transition duration under prefers-reduced-motion', () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/i);
    expect(css).toMatch(/animation-duration:\s*0\.01ms/i);
  });

  it('balances headline text wrapping', () => {
    expect(css).toMatch(/text-wrap:\s*balance/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/globals.test.ts`
Expected: FAIL — current `globals.css` still has `#444444` and plain white body background, no cream/ink/easing/reduced-motion rules yet

- [ ] **Step 3: Update `tailwind.config.ts`**

Replace the full contents:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A56',
        gold: '#C9992E',
        cream: '#F7F3EC',
        body: '#1A1613',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-instrument)', 'Arial', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'quart-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Update `app/globals.css`**

Replace the full contents:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-navy: #1b2a56;
  --color-gold: #c9992e;
  --color-cream: #f7f3ec;
  --color-body: #1a1613;
  --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-quart-out: cubic-bezier(0.25, 1, 0.5, 1);
}

body {
  background-color: var(--color-cream);
  color: var(--color-body);
}

a {
  color: var(--color-navy);
}

a:hover {
  color: var(--color-gold);
}

h1,
h2,
h3 {
  text-wrap: balance;
}

@keyframes word-reveal {
  from {
    opacity: 0;
    transform: translateY(0.4em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes clip-reveal {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0 0 0% 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- app/globals.test.ts`
Expected: PASS

- [ ] **Step 6: Run the full suite to check for regressions from the token change**

Run: `npm test`
Expected: some failures are possible here if any component asserted on old literal hex values — none currently do (checked: no other test file reads `globals.css` or `tailwind.config.ts` directly), so expect PASS across all files. If anything fails, read the failure before assuming it's expected — do not silence a real regression.

- [ ] **Step 7: Verify the app still builds**

Run: `npm run build`
Expected: build succeeds (fonts aren't wired to new names yet until Task 2, so this just confirms the token/CSS change alone doesn't break the build)

- [ ] **Step 8: Commit**

```bash
git add tailwind.config.ts app/globals.css app/globals.test.ts
git commit -m "feat: editorial design tokens — cream background, warm ink, custom easing, reduced-motion"
```

---

## Task 2: Typography — Fraunces + Instrument Sans

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/layout.test.ts`

**Interfaces:**
- Consumes: `--ease-expo-out`/`cream`/`body` tokens from Task 1 (no direct dependency, but this task must not reintroduce the old fonts)
- Produces: `--font-fraunces` and `--font-instrument` CSS variables applied to `<html>`, matching the `fontFamily` targets already set in `tailwind.config.ts` (Task 1) — so `font-display`/`font-body` utility classes across the whole codebase pick up the new typefaces with no further changes required in any other file.

- [ ] **Step 1: Write the failing test**

```ts
// app/layout.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('layout.tsx typography', () => {
  const source = fs.readFileSync(path.resolve(__dirname, './layout.tsx'), 'utf-8');

  it('imports Fraunces and Instrument Sans', () => {
    expect(source).toMatch(/\bFraunces\b/);
    expect(source).toMatch(/\bInstrument_Sans\b/);
  });

  it('no longer imports the old Playfair Display / Inter pairing', () => {
    expect(source).not.toMatch(/\bPlayfair_Display\b/);
    expect(source).not.toMatch(/\bInter\b/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/layout.test.ts`
Expected: FAIL — `layout.tsx` still imports `Playfair_Display, Inter`

- [ ] **Step 3: Update `app/layout.tsx` font imports**

Find the current top of the file (font imports + font const declarations + `<html>` className), and replace just that portion:

```tsx
import type { Metadata } from 'next';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});
```

Then update the `<html>` tag's `className` (keep everything else in the file — metadata object, `<body>` contents — unchanged):

```tsx
<html lang="en" className={`${fraunces.variable} ${instrumentSans.variable}`}>
```

If `Instrument_Sans` is not exported by the installed `next/font/google` version (check by running the build in Step 5 — a missing export throws a build-time import error naming the unresolvable export), substitute `Manrope` instead: `import { Fraunces, Manrope } from 'next/font/google'`, `const instrumentSans = Manrope({ subsets: ['latin'], variable: '--font-instrument', display: 'swap' })` — keep the variable name `--font-instrument` and the local const name `instrumentSans` unchanged so nothing else in this task needs to change. If you substitute Manrope, update Step 1's test (`Instrument_Sans` → `Manrope` in both the positive and — remove the now-incorrect `Inter`-ban line reference, no change needed there since `Manrope` doesn't contain `Inter`) and note the substitution in your task report.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/layout.test.ts`
Expected: PASS

- [ ] **Step 5: Verify the app builds with the new fonts resolving correctly**

Run: `npm run build`
Expected: build succeeds. If it fails with an unresolvable `next/font/google` export name, apply the Manrope fallback from Step 3.

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: PASS, all files

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx app/layout.test.ts
git commit -m "feat: swap Playfair Display + Inter for Fraunces + Instrument Sans"
```

---

## Task 3: Motion primitives — custom easing on RevealOnScroll, new StaggeredHeadline

**Files:**
- Modify: `components/RevealOnScroll.tsx`
- Modify: `components/RevealOnScroll.test.tsx`
- Create: `components/StaggeredHeadline.tsx`
- Create: `components/StaggeredHeadline.test.tsx`

**Interfaces:**
- Consumes: `ease-expo-out` Tailwind utility (Task 1), `word-reveal`/`clip-reveal` keyframes in `app/globals.css` (Task 1)
- Produces: `<StaggeredHeadline text={string} className?: string />` — consumed by Task 5's `VideoHero`. `RevealOnScroll` gains an optional `variant?: 'fade' | 'clip'` prop (default `'fade'`, matching all current call sites exactly) — consumed with `variant="clip"` by Task 6's Events masonry images. Existing call sites that don't pass `variant` are unaffected.

- [ ] **Step 1: Update `components/RevealOnScroll.test.tsx`** — replace the full file:

```tsx
// components/RevealOnScroll.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RevealOnScroll } from './RevealOnScroll';

describe('RevealOnScroll', () => {
  it('renders children immediately, visible, before any intersection has occurred', () => {
    render(
      <RevealOnScroll>
        <p>Real content</p>
      </RevealOnScroll>
    );
    const content = screen.getByText('Real content');
    expect(content).toBeInTheDocument();
    const wrapper = content.parentElement;
    expect(wrapper?.className).toContain('opacity-100');
    expect(wrapper?.className).not.toContain('opacity-0');
  });

  it('uses a custom expo-out easing curve, never Tailwind default ease/linear', () => {
    render(
      <RevealOnScroll>
        <p>Real content</p>
      </RevealOnScroll>
    );
    const wrapper = screen.getByText('Real content').parentElement;
    expect(wrapper?.className).toContain('ease-expo-out');
  });

  it('defaults to the fade variant, unaffected by the new clip variant', () => {
    render(
      <RevealOnScroll>
        <p>Real content</p>
      </RevealOnScroll>
    );
    const wrapper = screen.getByText('Real content').parentElement;
    expect(wrapper?.className).toContain('opacity-100');
    expect(wrapper?.className).not.toContain('clip-path');
  });

  it('clip variant renders fully unclipped and visible before any intersection has occurred', () => {
    render(
      <RevealOnScroll variant="clip">
        <p>Real content</p>
      </RevealOnScroll>
    );
    const wrapper = screen.getByText('Real content').parentElement;
    expect(wrapper?.className).toContain('[clip-path:inset(0_0_0%_0)]');
    expect(wrapper?.className).not.toContain('opacity-0');
  });
});
```

- [ ] **Step 2: Run test to verify the new assertions fail**

Run: `npm test -- components/RevealOnScroll.test.tsx`
Expected: FAIL on the easing test and both variant tests — current component uses `ease-out`, has no `variant` prop at all

- [ ] **Step 3: Replace `components/RevealOnScroll.tsx`** — the visibility-safety invariant (start visible, only hide once the observer confirms off-screen) is unchanged; only the easing curve and the new `variant` branch are added:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export function RevealOnScroll({
  children,
  className = '',
  variant = 'fade',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade' | 'clip';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const fadeClass = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';
  const clipClass = visible
    ? '[clip-path:inset(0_0_0%_0)]'
    : '[clip-path:inset(0_0_100%_0)]';
  const visibilityClass = variant === 'clip' ? clipClass : fadeClass;
  const transitionClass =
    variant === 'clip'
      ? 'transition-[clip-path] duration-700 ease-expo-out'
      : 'transition-all duration-700 ease-expo-out';

  return (
    <div ref={ref} className={`${className} ${transitionClass} ${visibilityClass}`}>
      {children}
    </div>
  );
}
```

**Design note (corrected during implementation, 2026-07-09):** the draft above originally gated `transitionClass` behind a separate `animate` state flag that only became `true` after the IntersectionObserver's callback fired — meaning `ease-expo-out` never appeared in the rendered className under a test double that never fires the callback (and, more importantly, meant no element ever declared its transition timing function until the exact moment it needed one). The corrected version applies the transition class unconditionally and drops `animate` entirely. This is safe: CSS transitions never play on an element's first paint (there is no prior style to transition *from*), so declaring the transition up front causes no unwanted animation on load — it simply takes effect the first time `visible` changes.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/RevealOnScroll.test.tsx`
Expected: PASS, all four tests

- [ ] **Step 5: Write the failing test for the new StaggeredHeadline component**

```tsx
// components/StaggeredHeadline.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StaggeredHeadline } from './StaggeredHeadline';

describe('StaggeredHeadline', () => {
  it('renders every word of the text', () => {
    const { container } = render(<StaggeredHeadline text="King's College London" />);
    expect(container.textContent).toContain("King's");
    expect(container.textContent).toContain('College');
    expect(container.textContent).toContain('London');
  });

  it('applies an increasing animation-delay per word so the reveal is staggered, not simultaneous', () => {
    const { container } = render(<StaggeredHeadline text="One Two Three" />);
    const wordSpans = Array.from(container.querySelectorAll('span[style]')) as HTMLElement[];
    const delays = wordSpans.map((el) => el.style.animationDelay);
    expect(delays).toEqual(['0ms', '80ms', '160ms']);
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm test -- components/StaggeredHeadline.test.tsx`
Expected: FAIL — `StaggeredHeadline.tsx` does not exist yet

- [ ] **Step 7: Create `components/StaggeredHeadline.tsx`**

```tsx
export function StaggeredHeadline({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block animate-[word-reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm test -- components/StaggeredHeadline.test.tsx`
Expected: PASS, both tests

- [ ] **Step 9: Run the full suite**

Run: `npm test`
Expected: PASS, all files

- [ ] **Step 10: Commit**

```bash
git add components/RevealOnScroll.tsx components/RevealOnScroll.test.tsx components/StaggeredHeadline.tsx components/StaggeredHeadline.test.tsx
git commit -m "feat: custom expo-out easing on RevealOnScroll, new StaggeredHeadline word-reveal component"
```

---

## Task 4: NavBar & Footer — editorial masthead restyle

**Files:**
- Modify: `components/layout/NavBar.tsx`
- Modify: `components/layout/Footer.tsx`

**Interfaces:**
- No interface changes — same exported `<NavBar />` / `<Footer />` zero-prop components, same nav hrefs (`/`, `/events`, `/committee`, `/sponsors`, `/join`), same mobile-menu toggle behavior. This task is visual restyling only; the existing `components/layout/NavBar.test.tsx` and `components/layout/Footer.test.tsx` must pass unmodified.

- [ ] **Step 1: Replace `components/layout/NavBar.tsx`**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/committee', label: 'Committee' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/join', label: 'Join' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-navy/20 bg-cream text-navy">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-2xl tracking-tight text-navy">
          KCL Dental Society
        </Link>
        <ul className="hidden gap-8 text-sm font-semibold uppercase tracking-[0.15em] md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="border-b-2 border-transparent pb-1 text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="text-sm font-semibold uppercase tracking-[0.15em] text-navy md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul className="flex flex-col gap-4 border-t border-navy/20 px-6 pb-6 pt-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-semibold uppercase tracking-[0.15em] text-navy hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Replace `components/layout/Footer.tsx`**

```tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-2xl">KCL Dental Society</p>
          <a
            href="mailto:kingsdentalsociety@gmail.com"
            className="mt-2 inline-block text-sm text-cream/80 transition-colors duration-300 ease-expo-out hover:text-gold"
          >
            kingsdentalsociety@gmail.com
          </a>
        </div>
        <ul className="flex gap-8 text-sm font-semibold uppercase tracking-[0.15em]">
          <li>
            <Link href="/events" className="text-cream hover:text-gold">
              Events
            </Link>
          </li>
          <li>
            <Link href="/committee" className="text-cream hover:text-gold">
              Committee
            </Link>
          </li>
          <li>
            <Link href="/sponsors" className="text-cream hover:text-gold">
              Sponsors
            </Link>
          </li>
        </ul>
        <p className="text-sm text-cream/60">
          © {new Date().getFullYear()} King&apos;s College London Dental Society. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Run the existing NavBar/Footer tests to confirm no regression**

Run: `npm test -- components/layout`
Expected: PASS, both test files, unmodified

- [ ] **Step 4: Verify the app builds**

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 5: Commit**

```bash
git add components/layout/NavBar.tsx components/layout/Footer.tsx
git commit -m "feat: editorial masthead restyle for NavBar and Footer"
```

---

## Task 5: Home page — oversized hero headline, asymmetric mission and teaser layout

**Files:**
- Modify: `components/VideoHero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `StaggeredHeadline` (Task 3), `RevealOnScroll` (Task 3's easing update, existing component)
- No change to `app/page.test.tsx` or `components/VideoHero.test.tsx` — both must pass unmodified against this task's output (verified in Step 3 below); this task must preserve every existing tested link text/href/attribute.

- [ ] **Step 1: Replace `components/VideoHero.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { StaggeredHeadline } from '@/components/StaggeredHeadline';

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-navy">
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
      <div className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
        <StaggeredHeadline
          text="King's College London Dental Society"
          className="font-display text-5xl leading-[0.95] tracking-tight text-cream md:text-8xl"
        />
        <p className="mt-6 text-lg uppercase tracking-[0.2em] text-gold">
          Community · Careers · Culture
        </p>
      </div>
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

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import Link from 'next/link';
import { VideoHero } from '@/components/VideoHero';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function Home() {
  return (
    <>
      <VideoHero />

      <RevealOnScroll className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-[3fr_2fr]">
        <p className="font-display text-4xl leading-tight text-navy md:text-6xl">
          KCL Dental Society is a community built to make your time at dental school{' '}
          <span className="text-gold">unforgettable</span>.
        </p>
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

- [ ] **Step 3: Run the existing Home and VideoHero tests to confirm no regression**

Run: `npm test -- app/page.test.tsx components/VideoHero.test.tsx`
Expected: PASS, both files, unmodified. If either fails, compare the failing assertion's expected text/href against what Step 1/2 actually produced — every previously-tested link text (`Join`, `Explore Events →`, `Meet the Committee →`, `Our Sponsors →`), the tagline text (`Community · Careers · Culture`), and the video's `autoplay`/`muted`/`loop`/`playsinline`/no-`controls` attributes must be identical to before.

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: PASS, all files

- [ ] **Step 5: Verify the app builds**

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 6: Commit**

```bash
git add components/VideoHero.tsx app/page.tsx
git commit -m "feat: Home page editorial redesign — oversized staggered headline, asymmetric mission and teaser layout"
```

---

## Task 6: Events page — asymmetric masonry grid

**Files:**
- Modify: `components/EventCard.tsx`
- Modify: `app/events/EventsTabs.tsx`

**Interfaces:**
- Consumes: `EventCategory` type (unchanged, Task 3 of the original build), `RevealOnScroll`'s new `variant="clip"` prop (Task 3 of this plan)
- No change to `EventCard`'s props (`category: EventCategory`) or `EventsTabs`'s exported shape — `app/events/EventsTabs.test.tsx` must pass unmodified.

- [ ] **Step 1: Replace `components/EventCard.tsx`**

```tsx
import type { EventCategory } from '@/data/types';

export function EventCard({ category }: { category: EventCategory }) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-navy/10 bg-cream">
      <img src={category.image} alt={category.name} className="h-2/3 w-full flex-1 object-cover" />
      <div className="p-4">
        <h3 className="font-display text-xl text-navy">{category.name}</h3>
        <p className="mt-2 text-sm text-body">{category.description}</p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Add the `RevealOnScroll` import to `app/events/EventsTabs.tsx`**

Find:
```tsx
import { EVENT_CATEGORIES } from '@/data/events';
import { EventCard } from '@/components/EventCard';
```

Replace with:
```tsx
import { EVENT_CATEGORIES } from '@/data/events';
import { EventCard } from '@/components/EventCard';
import { RevealOnScroll } from '@/components/RevealOnScroll';
```

- [ ] **Step 3: Update the grid markup in `app/events/EventsTabs.tsx`**

Find the `'what-we-run'` grid rendering block:

```tsx
      {tab === 'what-we-run' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EVENT_CATEGORIES.map((category) => (
            <EventCard key={category.slug} category={category} />
          ))}
        </div>
      ) : (
```

Replace it with an asymmetric masonry-style grid (a repeating row-span pattern gives varied tile heights without any new dependency) where each tile's image reveals via the new `clip` variant on scroll:

```tsx
      {tab === 'what-we-run' ? (
        <div className="grid auto-rows-[14rem] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EVENT_CATEGORIES.map((category, index) => (
            <RevealOnScroll
              key={category.slug}
              variant="clip"
              className={`h-full ${index % 4 === 0 || index % 4 === 3 ? 'row-span-2' : ''}`}
            >
              <EventCard category={category} />
            </RevealOnScroll>
          ))}
        </div>
      ) : (
```

Leave everything else in the file (the tab buttons, the `'upcoming'` branch, the component's export) exactly as-is.

- [ ] **Step 4: Run the existing Events and EventCard tests to confirm no regression**

Run: `npm test -- app/events/EventsTabs.test.tsx components/EventCard.test.tsx`
Expected: PASS, both files, unmodified — the tests check for category names/descriptions/alt text and tab-switching behavior, none of which changed.

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: PASS, all files

- [ ] **Step 6: Verify the app builds**

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 7: Commit**

```bash
git add components/EventCard.tsx app/events/EventsTabs.tsx
git commit -m "feat: Events page asymmetric masonry grid with clip-path scroll reveals"
```

---

## Task 7: Committee page — editorial typographic index (retires CommitteeCard)

**Files:**
- Delete: `components/CommitteeCard.tsx`
- Delete: `components/CommitteeCard.test.tsx`
- Create: `components/CommitteeRow.tsx`
- Create: `components/CommitteeRow.test.tsx`
- Modify: `app/committee/CommitteeGrid.tsx`
- Modify: `data/types.ts`

**Interfaces:**
- Produces: `<CommitteeRow member={CommitteeMember} index={number} />` — consumed by `app/committee/CommitteeGrid.tsx`. `CommitteeMember` type is unchanged in shape (still has an optional `photo` field) but that field is no longer rendered by any component after this task — only its doc comment changes.
- `app/committee/CommitteeGrid.test.tsx` must pass unmodified — it asserts on member names being present, section headings present, and no carousel/pagination controls, none of which are tied to card-vs-row rendering.

- [ ] **Step 1: Write the failing test for the new component**

```tsx
// components/CommitteeRow.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommitteeRow } from './CommitteeRow';

describe('CommitteeRow', () => {
  it('renders name, role, and a numbered index, with no avatar image', () => {
    render(
      <ul>
        <CommitteeRow
          member={{ name: 'Aman Aziz', role: 'President', group: 'Leadership' }}
          index={0}
        />
      </ul>
    );
    expect(screen.getByText('Aman Aziz')).toBeInTheDocument();
    expect(screen.getByText('President')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('pads the index to two digits for indices past 9', () => {
    render(
      <ul>
        <CommitteeRow
          member={{ name: 'Hfsa Fahad', role: "Kings' Crown Chief Editor", group: 'Affiliated' }}
          index={12}
        />
      </ul>
    );
    expect(screen.getByText('13')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/CommitteeRow.test.tsx`
Expected: FAIL — `CommitteeRow.tsx` does not exist yet

- [ ] **Step 3: Create `components/CommitteeRow.tsx`**

```tsx
import type { CommitteeMember } from '@/data/types';

export function CommitteeRow({ member, index }: { member: CommitteeMember; index: number }) {
  return (
    <li className="flex items-baseline justify-between gap-4 border-b border-navy/15 py-3">
      <span className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-navy/50">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-display text-lg text-navy">{member.name}</span>
      </span>
      <span className="text-right text-sm uppercase tracking-[0.1em] text-body">
        {member.role}
      </span>
    </li>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/CommitteeRow.test.tsx`
Expected: PASS, both tests

- [ ] **Step 5: Update `app/committee/CommitteeGrid.tsx`**

Replace the full contents:

```tsx
import { COMMITTEE } from '@/data/committee';
import type { CommitteeGroup } from '@/data/types';
import { CommitteeRow } from '@/components/CommitteeRow';

const GROUP_ORDER: CommitteeGroup[] = [
  'Leadership',
  'Officers',
  'Events Team',
  'Year Representatives',
  'Affiliated',
];

export function CommitteeGrid() {
  return (
    <div className="space-y-16">
      {GROUP_ORDER.map((group) => {
        const members = COMMITTEE.filter((member) => member.group === group);
        if (members.length === 0) return null;
        return (
          <section key={group}>
            <h2 className="mb-4 font-display text-2xl text-navy">{group}</h2>
            <ul>
              {members.map((member, index) => (
                <CommitteeRow
                  key={`${member.name}-${member.role}`}
                  member={member}
                  index={index}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 6: Update the doc comment on `CommitteeMember.photo` in `data/types.ts`**

Find:

```ts
export interface CommitteeMember {
  name: string;
  role: string;
  group: CommitteeGroup;
  // A broken path here renders as a broken image, not a fallback avatar —
  // CommitteeCard's onError handling can't rescue an SSR'd <img> that fails
  // before hydration attaches the listener (see the NavBar logo fix in
  // this project's history for the same failure mode). Verify the file
  // exists in public/ before setting this.
  photo?: string;
}
```

Replace with:

```ts
export interface CommitteeMember {
  name: string;
  role: string;
  group: CommitteeGroup;
  // Not currently rendered — the editorial index layout (CommitteeRow)
  // is pure typography by design. If a future layout reintroduces
  // photos, avoid a bare onError-based fallback: an SSR'd <img> that
  // fails before hydration attaches the listener can't be rescued that
  // way (see the NavBar logo fix in this project's history for the same
  // failure mode).
  photo?: string;
}
```

- [ ] **Step 7: Delete the retired component and its test**

```bash
rm components/CommitteeCard.tsx components/CommitteeCard.test.tsx
```

- [ ] **Step 8: Run the Committee tests to confirm no regression**

Run: `npm test -- app/committee/CommitteeGrid.test.tsx components/CommitteeRow.test.tsx`
Expected: PASS, both files. `CommitteeGrid.test.tsx` must pass unmodified.

- [ ] **Step 9: Run the full suite**

Run: `npm test`
Expected: PASS, all files (confirms `CommitteeCard.test.tsx`'s removal didn't leave a dangling reference anywhere else)

- [ ] **Step 10: Verify the app builds**

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 11: Commit**

```bash
git add components/CommitteeRow.tsx components/CommitteeRow.test.tsx app/committee/CommitteeGrid.tsx data/types.ts
git rm components/CommitteeCard.tsx components/CommitteeCard.test.tsx
git commit -m "feat: Committee page as a typographic editorial index, retiring the avatar-card treatment"
```

---

## Task 8: Sponsors page — magazine supporters spread

**Files:**
- Modify: `components/SponsorTile.tsx`
- Modify: `app/sponsors/page.tsx`

**Interfaces:**
- No change to `SponsorTile`'s props (`sponsor: Sponsor`) — `components/SponsorTile.test.tsx` and `app/sponsors/page.test.tsx` must pass unmodified.

- [ ] **Step 1: Replace `components/SponsorTile.tsx`**

```tsx
import type { Sponsor } from '@/data/types';

export function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const isDiamond = sponsor.tier === 'diamond';

  if (isDiamond) {
    return (
      <div className="bg-navy px-8 py-12 text-cream md:px-16 md:py-20">
        {sponsor.link ? (
          <a
            href={sponsor.link}
            className="font-display text-4xl text-cream transition-colors duration-300 ease-expo-out hover:text-gold md:text-6xl"
          >
            {sponsor.name}
          </a>
        ) : (
          <span className="font-display text-4xl text-cream md:text-6xl">{sponsor.name}</span>
        )}
        {sponsor.description && (
          <p className="mt-4 max-w-xl text-cream/80">{sponsor.description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center border-t-2 border-navy py-8 text-center">
      {sponsor.link ? (
        <a href={sponsor.link} className="text-navy hover:text-gold">
          <span className="font-display text-lg">{sponsor.name}</span>
        </a>
      ) : (
        <span className="font-display text-lg text-navy">{sponsor.name}</span>
      )}
      {sponsor.description && <p className="mt-3 text-sm text-body">{sponsor.description}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Replace `app/sponsors/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { SponsorTile } from '@/components/SponsorTile';
import { SPONSORS } from '@/data/sponsors';

export const metadata: Metadata = {
  title: 'Sponsors',
  description:
    'MDDUS and our partners support the largest dental society trade fayre in the UK.',
};

export default function SponsorsPage() {
  const diamond = SPONSORS.find((s) => s.tier === 'diamond')!;
  const partners = SPONSORS.filter((s) => s.tier === 'partner');

  return (
    <RevealOnScroll>
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <h1 className="font-display text-5xl text-navy md:text-7xl">Our Sponsors</h1>
        <p className="mt-4 max-w-xl text-body">
          We host the largest Trade Fayre of any university dental society in the UK, with over
          400 student attendees — supported by industry partners who believe in KCL Dental
          Society.
        </p>
      </div>

      <div className="mt-12">
        <SponsorTile sponsor={diamond} />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 sm:grid-cols-3">
        {partners.map((sponsor) => (
          <SponsorTile key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-navy">Become a Sponsor</h2>
        <p className="mx-auto mt-2 max-w-xl text-body">
          We're happy to discuss any form of sponsorship — financial, product, or academic
          opportunity.
        </p>
        <a
          href="mailto:kingsdentalsociety@gmail.com?subject=Sponsorship%20Enquiry"
          className="mt-6 inline-block border-b-2 border-gold text-navy hover:text-gold"
        >
          Become a Sponsor
        </a>
      </div>
    </RevealOnScroll>
  );
}
```

- [ ] **Step 3: Run the existing Sponsors tests to confirm no regression**

Run: `npm test -- components/SponsorTile.test.tsx app/sponsors/page.test.tsx`
Expected: PASS, both files, unmodified.

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: PASS, all files

- [ ] **Step 5: Verify the app builds**

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 6: Commit**

```bash
git add components/SponsorTile.tsx app/sponsors/page.tsx
git commit -m "feat: Sponsors page as a magazine supporters spread"
```

---

## Task 9: Join page — whitespace-focused restyle

**Files:**
- Modify: `app/join/page.tsx`

**Interfaces:**
- No change — `app/join/page.test.tsx` must pass unmodified (asserts exact hrefs for the KCLSU and Society App links).

- [ ] **Step 1: Replace `app/join/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Join',
  description: 'Join KCL Dental Society through the KCLSU portal and get the Society App.',
};

export default function JoinPage() {
  return (
    <RevealOnScroll className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-display text-5xl text-navy md:text-7xl">Join KCL Dental Society</h1>
      <p className="mt-6 max-w-md text-body">
        Membership gets you into every event on this site — boat parties, formals, workshops,
        talks, and more — plus career mentorship and a community that lasts well beyond
        university.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="https://www.kclsu.org/groups/activities/join/group/kcl_dental_society/"
          className="rounded-full bg-navy px-8 py-3 text-cream transition-colors duration-300 ease-expo-out hover:bg-gold"
        >
          Sign up via KCLSU
        </a>
        <a
          href="https://go.link2app.co/QlZx6wiDP0b"
          className="rounded-full border border-navy px-8 py-3 text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
        >
          Get the Society App
        </a>
      </div>
    </RevealOnScroll>
  );
}
```

- [ ] **Step 2: Run the existing Join test to confirm no regression**

Run: `npm test -- app/join/page.test.tsx`
Expected: PASS, unmodified

- [ ] **Step 3: Run the full suite**

Run: `npm test`
Expected: PASS, all files

- [ ] **Step 4: Verify the app builds**

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 5: Commit**

```bash
git add app/join/page.tsx
git commit -m "feat: Join page whitespace-focused restyle"
```

---

## Task 10: Final verification

**Files:**
- None created — this task verifies the whole redesign.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS — every test file across `data/`, `components/`, and `app/` green, including the new/updated `globals.test.ts`, `layout.test.ts`, `RevealOnScroll.test.tsx`, `StaggeredHeadline.test.tsx`, `CommitteeRow.test.tsx`, and the unmodified pre-existing tests for NavBar, Footer, Home, Events, Committee, Sponsors, Join.

- [ ] **Step 2: Run a full production build**

Run: `npm run build`
Expected: build succeeds with no warnings; `out/` contains `index.html`, `events/index.html`, `committee/index.html`, `sponsors/index.html`, `join/index.html`

- [ ] **Step 3: Serve the static export locally and manually check every route**

Run: `npx serve out` (or any static file server), then open in a browser:
- `/` — cream background (not white), navy ink headline overlapping the video hero, staggered word-by-word reveal plays on load, gold used only as a sparing highlight (the word "unforgettable", underlines, hover states) — not as a large fill anywhere
- `/events` — masonry grid with varied tile heights, not a uniform 4-column grid
- `/committee` — typographic index list (numbered rows), no circular avatars, no carousel, full ~39-person roster visible on one scroll
- `/sponsors` — MDDUS full-bleed navy block, partner tiles below it, "Become a Sponsor" mailto CTA works
- `/join` — generous whitespace, both external links resolve correctly
- Every route: nav masthead (cream, navy text) at top, navy footer at bottom, mobile menu toggle works at narrow widths

- [ ] **Step 4: Check color contrast against the new palette**

Verify with a contrast checker (or browser devtools' accessibility panel) that:
- Navy text (`#1B2A56`) on cream background (`#F7F3EC`) meets WCAG AA (should be well over, both are far from mid-gray)
- Ink body text (`#1A1613`) on cream (`#F7F3EC`) meets WCAG AA
- Cream text (`#F7F3EC`) on navy (`#1B2A56`) meets WCAG AA
- Gold (`#C9992E`) is never used as body-text-sized text on cream without sufficient contrast — check every `text-gold` usage introduced in this redesign (hover states are fine since they're not the resting state; the `unforgettable` highlight word and the tagline `Community · Careers · Culture` on navy background are the two static gold-text usages to check)

- [ ] **Step 5: Verify `prefers-reduced-motion` disables motion**

In Chrome DevTools, open the Rendering tab, set "Emulate CSS media feature prefers-reduced-motion" to "reduce", then reload each route. Expected: the homepage headline appears immediately with no staggered word animation, and `RevealOnScroll` sections are immediately visible with no transition delay — content must never be hidden or delayed by more than the reduced ~0.01ms duration.

- [ ] **Step 6: Confirm no leftover references to retired components**

Run: `grep -rn "CommitteeCard" app/ components/ 2>&1 || echo "clean"`
Expected: no matches (or only the `grep` command's own output showing "clean") — confirms `CommitteeCard` was fully retired in Task 7 with no dangling imports.

- [ ] **Step 7: Final commit**

```bash
git add -A
git status
```

Expected: working tree clean (everything already committed in prior tasks) — if anything is unstaged, review it, then:

```bash
git commit -m "chore: editorial redesign final verification pass complete"
```

(Skip this commit if `git status` shows nothing to commit.)
