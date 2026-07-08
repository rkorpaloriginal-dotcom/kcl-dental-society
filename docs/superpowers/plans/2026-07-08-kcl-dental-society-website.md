# KCL Dental Society Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild kingsdentalsociety.com as a new Next.js + Tailwind static site with a correct navy/gold brand system, real content for all 8 event categories, a full committee grid, a sponsors page, and a working membership/join page — with every button linking somewhere real and no empty pages.

**Architecture:** Next.js 14 App Router + TypeScript, static export, Tailwind CSS for styling with brand tokens matching the current site's navy/gold identity, Vitest + React Testing Library for component/content tests. Content (events, committee, sponsors) lives in typed data modules under `data/`, consumed by page components under `app/`. Shared UI (nav, footer, cards, scroll-reveal wrapper, video player) lives under `components/`.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3, Vitest, @testing-library/react, next/font (Playfair Display + Inter)

## Global Constraints

- Primary navy: `#1B2A56`. Accent gold: `#C9992E`. No third competing accent color.
- Display headings use a serif (Playfair Display via `next/font/google`), body text uses a sans-serif (Inter via `next/font/google`).
- Body copy color must be at least 4.5:1 contrast against its background (use `#444` or darker on white, not light gray).
- Every link/button must resolve to a real destination. Never ship a button with `href="#"` or no `href`.
- No page may render empty — if a section has no real content yet (e.g. dated events), it must show a real placeholder message, not a blank area.
- Scroll/entrance animation must never be the only way content becomes visible. Content renders in the DOM and is visible by default; animation is a client-side enhancement layered on top after mount.
- Committee members get one consistent visual treatment each: a real photo if one is available and reusable, otherwise a uniform initials placeholder — never a mixed template graphic.
- Every route needs a real per-page `<title>` and meta description. No leftover scaffold/placeholder branding text anywhere.
- Nav structure: Home, Events (with "What We Run" and "Upcoming" tabs), Committee, Sponsors, Join.

---

## Task 1: Project scaffold and tooling

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `.gitignore`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `app/layout.tsx` (minimal placeholder, replaced in Task 6)
- Create: `app/page.tsx` (minimal placeholder, replaced in Task 10)

**Interfaces:**
- Produces: a buildable Next.js app (`npm run build`) and a runnable test command (`npm test`) that later tasks add real tests to.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "kcl-dental-society",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.4.8",
    "@testing-library/react": "16.0.0",
    "@types/node": "20.14.11",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "@vitejs/plugin-react": "4.3.1",
    "autoprefixer": "10.4.19",
    "jsdom": "24.1.1",
    "postcss": "8.4.40",
    "tailwindcss": "3.4.7",
    "typescript": "5.5.4",
    "vitest": "2.0.4"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create `postcss.config.mjs`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A56',
        gold: '#C9992E',
        body: '#444444',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Create `.gitignore`**

```
node_modules/
.next/
out/
*.tsbuildinfo
next-env.d.ts
.vercel/
```

- [ ] **Step 7: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

- [ ] **Step 8: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 9: Create placeholder `app/layout.tsx`**

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 10: Create placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return <main>KCL Dental Society</main>;
}
```

- [ ] **Step 11: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `node_modules/` and `package-lock.json`

- [ ] **Step 12: Verify the app builds**

Run: `npm run build`
Expected: build succeeds, `out/` directory created with static export

- [ ] **Step 13: Verify the test runner works**

Run: `npm test`
Expected: "No test files found" (no tests exist yet) — this confirms Vitest is wired up correctly, not a failure

- [ ] **Step 14: Commit**

```bash
git add package.json tsconfig.json next.config.mjs postcss.config.mjs tailwind.config.ts .gitignore vitest.config.ts vitest.setup.ts app/layout.tsx app/page.tsx package-lock.json
git commit -m "chore: scaffold Next.js + Tailwind + Vitest project"
```

---

## Task 2: Brand fonts and global styles

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/globals.css`
- Test: `app/globals.test.ts`

**Interfaces:**
- Consumes: `tailwind.config.ts` color/font tokens from Task 1
- Produces: `--font-playfair` and `--font-inter` CSS variables applied to `<html>`, imported globally via `app/globals.css`, so every later component can use `font-display` / `font-body` Tailwind classes.

- [ ] **Step 1: Write the failing test for global CSS tokens**

```ts
// app/globals.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('globals.css', () => {
  it('defines the brand navy and gold as raw values somewhere in the design system', () => {
    const css = fs.readFileSync(path.resolve(__dirname, './globals.css'), 'utf-8');
    expect(css).toMatch(/#1B2A56/i);
    expect(css).toMatch(/#C9992E/i);
  });

  it('sets a minimum body text contrast color, not light gray', () => {
    const css = fs.readFileSync(path.resolve(__dirname, './globals.css'), 'utf-8');
    expect(css).toMatch(/#444444/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/globals.test.ts`
Expected: FAIL — `app/globals.css` does not exist yet

- [ ] **Step 3: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-navy: #1b2a56;
  --color-gold: #c9992e;
  --color-body: #444444;
}

body {
  color: var(--color-body);
  background-color: #ffffff;
}

a {
  color: var(--color-navy);
}

a:hover {
  color: var(--color-gold);
}
```

- [ ] **Step 4: Wire fonts and globals into `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KCL Dental Society',
  description:
    "King's College London Dental Society — Community, Careers, Culture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body text-body">{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- app/globals.test.ts`
Expected: PASS

- [ ] **Step 6: Verify the app still builds**

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 7: Commit**

```bash
git add app/globals.css app/globals.test.ts app/layout.tsx
git commit -m "feat: brand fonts (Playfair Display + Inter) and navy/gold design tokens"
```

---

## Task 3: Content data modules (events, committee, sponsors)

**Files:**
- Create: `data/types.ts`
- Create: `data/events.ts`
- Create: `data/committee.ts`
- Create: `data/sponsors.ts`
- Test: `data/events.test.ts`
- Test: `data/committee.test.ts`
- Test: `data/sponsors.test.ts`

**Interfaces:**
- Produces:
  - `EventCategory { slug: string; name: string; description: string; image: string }` and `EVENT_CATEGORIES: EventCategory[]` (exactly 8 entries)
  - `CommitteeGroup = 'Leadership' | 'Officers' | 'Events Team' | 'Year Representatives' | 'Affiliated'`
  - `CommitteeMember { name: string; role: string; group: CommitteeGroup; photo?: string }` and `COMMITTEE: CommitteeMember[]`
  - `Sponsor { name: string; tier: 'diamond' | 'partner'; description?: string; link?: string }` and `SPONSORS: Sponsor[]`
- These are consumed by Task 8 (card components) and Tasks 11–13 (pages).

- [ ] **Step 1: Write the failing tests**

```ts
// data/types.ts
export type CommitteeGroup =
  | 'Leadership'
  | 'Officers'
  | 'Events Team'
  | 'Year Representatives'
  | 'Affiliated';

export interface EventCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface CommitteeMember {
  name: string;
  role: string;
  group: CommitteeGroup;
  photo?: string;
}

export interface Sponsor {
  name: string;
  tier: 'diamond' | 'partner';
  description?: string;
  link?: string;
}
```

```ts
// data/events.test.ts
import { describe, it, expect } from 'vitest';
import { EVENT_CATEGORIES } from './events';

describe('EVENT_CATEGORIES', () => {
  it('has exactly 8 event categories', () => {
    expect(EVENT_CATEGORIES).toHaveLength(8);
  });

  it('every category has a non-empty name, description, image, and unique slug', () => {
    const slugs = new Set<string>();
    for (const category of EVENT_CATEGORIES) {
      expect(category.name.length).toBeGreaterThan(0);
      expect(category.description.length).toBeGreaterThan(0);
      expect(category.image.length).toBeGreaterThan(0);
      expect(slugs.has(category.slug)).toBe(false);
      slugs.add(category.slug);
    }
  });

  it('includes the Boat Party and Talks categories from the current site', () => {
    const names = EVENT_CATEGORIES.map((c) => c.name);
    expect(names).toContain('Boat Party');
    expect(names).toContain('Talks');
  });
});
```

```ts
// data/committee.test.ts
import { describe, it, expect } from 'vitest';
import { COMMITTEE } from './committee';

describe('COMMITTEE', () => {
  it('has at least 35 members', () => {
    expect(COMMITTEE.length).toBeGreaterThanOrEqual(35);
  });

  it('every member has a name, role, and valid group', () => {
    const validGroups = new Set([
      'Leadership',
      'Officers',
      'Events Team',
      'Year Representatives',
      'Affiliated',
    ]);
    for (const member of COMMITTEE) {
      expect(member.name.length).toBeGreaterThan(0);
      expect(member.role.length).toBeGreaterThan(0);
      expect(validGroups.has(member.group)).toBe(true);
    }
  });

  it('includes the President and Staff President', () => {
    const roles = COMMITTEE.map((m) => m.role);
    expect(roles).toContain('President');
    expect(roles).toContain('Staff President');
  });
});
```

```ts
// data/sponsors.test.ts
import { describe, it, expect } from 'vitest';
import { SPONSORS } from './sponsors';

describe('SPONSORS', () => {
  it('has exactly one diamond tier sponsor', () => {
    const diamonds = SPONSORS.filter((s) => s.tier === 'diamond');
    expect(diamonds).toHaveLength(1);
    expect(diamonds[0].name).toBe('MDDUS');
    expect(diamonds[0].description?.length).toBeGreaterThan(0);
  });

  it('has at least 6 partner tier sponsors', () => {
    const partners = SPONSORS.filter((s) => s.tier === 'partner');
    expect(partners.length).toBeGreaterThanOrEqual(6);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- data`
Expected: FAIL — `data/events.ts`, `data/committee.ts`, `data/sponsors.ts` do not exist yet

- [ ] **Step 3: Create `data/events.ts`**

```ts
import type { EventCategory } from './types';

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    slug: 'boat-party',
    name: 'Boat Party',
    description:
      'Set sail on the Thames for a night of music, dancing, and unforgettable views with your dental family.',
    image: '/images/events/boat-party.jpg',
  },
  {
    slug: 'formals',
    name: 'Formals',
    description:
      'Elegant black-tie dinners celebrating milestones and bringing the dental school together in style.',
    image: '/images/events/formals.jpg',
  },
  {
    slug: 'workshops',
    name: 'Hands-on Workshops',
    description:
      'Practical sessions to sharpen your clinical skills with expert guidance and real-world techniques.',
    image: '/images/events/workshops.jpg',
  },
  {
    slug: 'charity',
    name: 'Charity & Wellbeing',
    description:
      "Fundraising events and wellbeing initiatives supporting causes close to the dental community's heart.",
    image: '/images/events/charity.jpg',
  },
  {
    slug: 'pulp-crawl',
    name: 'Pulp Crawl & T-shirt Party',
    description:
      'Our iconic themed socials — grab your custom tee and hit the town with the whole dental school.',
    image: '/images/events/pulp-crawl.jpg',
  },
  {
    slug: 'inter-uni',
    name: 'Inter-uni',
    description:
      'Compete and socialise with dental students from universities across the UK.',
    image: '/images/events/inter-uni.jpg',
  },
  {
    slug: 'year-group',
    name: 'Year Group',
    description:
      'Exclusive socials and bonding events tailored to each year group for closer connections.',
    image: '/images/events/year-group.jpg',
  },
  {
    slug: 'talks',
    name: 'Talks',
    description:
      'Inspiring lectures and panel discussions from leading dental professionals and specialists.',
    image: '/images/events/talks.jpg',
  },
];
```

- [ ] **Step 4: Create `data/committee.ts`**

```ts
import type { CommitteeMember } from './types';

export const COMMITTEE: CommitteeMember[] = [
  { name: 'Dr Claire McCarthy', role: 'Staff President', group: 'Leadership' },
  { name: 'Aman Aziz', role: 'President', group: 'Leadership' },
  { name: 'Raveena Dheer', role: 'Vice-President', group: 'Leadership' },
  { name: 'Nikhil Astagi', role: 'President-Elect', group: 'Leadership' },
  { name: 'Sarah Al Chalabi', role: 'Past President', group: 'Leadership' },

  { name: 'Nikita Malhotra', role: 'Sponsorship Officer', group: 'Officers' },
  { name: 'Arya Bhatt', role: 'Secretary', group: 'Officers' },
  { name: 'Nora Al Morhiby', role: 'Academic Events Coordinator', group: 'Officers' },
  { name: 'Yasmine Puchakayala', role: 'Treasurer', group: 'Officers' },
  { name: 'Sara Saliman', role: 'Wellbeing Officer', group: 'Officers' },
  { name: 'Ibrahim Jamroze', role: 'Charity Representative', group: 'Officers' },

  { name: 'Saffron Sandhu', role: 'Events Representative', group: 'Events Team' },
  { name: 'Selinay Ozgun', role: 'Events Representative', group: 'Events Team' },
  { name: 'Leeyah Rafiq', role: 'Events Representative (Non-Drinking)', group: 'Events Team' },
  { name: 'Shreya Pedda-Venkatagari', role: 'Social Media Representative', group: 'Events Team' },
  { name: 'Yasmin Abdullahi Ali', role: 'Web & Media Representative', group: 'Events Team' },
  { name: 'Aneeka Mayor', role: 'Junior Ball Representative', group: 'Events Team' },
  { name: 'Kishan Bouri', role: 'Senior Ball Representative', group: 'Events Team' },
  { name: 'Rohan Korpal', role: 'Junior BDSA Representative', group: 'Events Team' },
  { name: 'Abigail Cheong', role: 'Senior BDSA Representative', group: 'Events Team' },
  { name: 'Hadi Abbas', role: 'Sports Representative', group: 'Events Team' },

  { name: 'Kiran Johal', role: 'BDS1 Representative', group: 'Year Representatives' },
  { name: 'Yaman Entabi', role: 'BDS1 Representative', group: 'Year Representatives' },
  { name: 'Stella Yu', role: 'DTH1 Representative', group: 'Year Representatives' },
  { name: 'Hooriya Eman', role: 'BDS2 Representative', group: 'Year Representatives' },
  { name: 'Mohammad Jafari', role: 'BDS2 Representative', group: 'Year Representatives' },
  { name: 'Meryem Delen', role: 'DTH2 Representative', group: 'Year Representatives' },
  { name: 'Ella Song', role: 'BDS3 Representative', group: 'Year Representatives' },
  { name: 'Alex Wilcock', role: 'BDS3 Representative', group: 'Year Representatives' },
  { name: 'Samirah Ahmed', role: 'DTH3 Representative', group: 'Year Representatives' },
  { name: 'Jasmine Patel', role: 'BDS4 Representative', group: 'Year Representatives' },
  { name: 'Bilal Idris', role: 'BDS4 Representative', group: 'Year Representatives' },
  { name: 'Nicka Divsalar', role: 'BDS5 Representative', group: 'Year Representatives' },
  { name: 'Lima Noori', role: 'BDS5 Representative', group: 'Year Representatives' },
  { name: 'Ashneet Singh', role: 'GPEP Representative', group: 'Year Representatives' },
  { name: 'Noorie Dewan', role: 'International Representative', group: 'Year Representatives' },

  { name: 'Navreet Kaur', role: 'Smile Society Vice President', group: 'Affiliated' },
  { name: 'Riya Mann', role: 'Smile Society President', group: 'Affiliated' },
  { name: 'Hfsa Fahad', role: "Kings' Crown Chief Editor", group: 'Affiliated' },
];
```

- [ ] **Step 5: Create `data/sponsors.ts`**

```ts
import type { Sponsor } from './types';

export const SPONSORS: Sponsor[] = [
  {
    name: 'MDDUS',
    tier: 'diamond',
    description:
      'A mutual defence organisation offering medico-legal and dento-legal support to doctors and dentists across the UK — comprised of experienced dentists, doctors, lawyers, and risk specialists.',
    link: 'mailto:kingsdentalsociety@gmail.com',
  },
  { name: 'Oralieve', tier: 'partner' },
  { name: 'Albert Waeschle', tier: 'partner' },
  { name: 'MyDentist', tier: 'partner' },
  { name: 'DDU', tier: 'partner' },
  { name: 'Curaden', tier: 'partner' },
  { name: 'Dental Protection', tier: 'partner' },
];
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- data`
Expected: PASS — 3 test files, all green

- [ ] **Step 7: Commit**

```bash
git add data/
git commit -m "feat: typed content data for event categories, committee, and sponsors"
```

---

## Task 4: Source assets (images, video, logo)

**Files:**
- Create: `public/images/events/*.jpg` (8 files)
- Create: `public/video/welcome.mp4`
- Create: `public/images/logo.svg` (or `.png`)

**Interfaces:**
- Produces: static asset paths referenced by `data/events.ts` (`/images/events/*.jpg`), the Task 9 `VideoHero` component (`/video/welcome.mp4`), and the Task 5 `NavBar`/Task 6 layout (`/images/logo.svg`).

- [ ] **Step 1: Create the target directories**

Run: `mkdir -p public/images/events public/video`

- [ ] **Step 2: Download the 8 event category images from the current live site**

Run each of these (source URLs confirmed live on kingsdentalsociety.com as of 2026-07-08):

```bash
curl -sL "https://kingsdentalsociety.com/assets/boat-party-s5lwzWab.jpg" -o public/images/events/boat-party.jpg
curl -sL "https://kingsdentalsociety.com/assets/formals-Bh0h77O8.jpg" -o public/images/events/formals.jpg
curl -sL "https://kingsdentalsociety.com/assets/workshops-CBdNifwZ.jpg" -o public/images/events/workshops.jpg
curl -sL "https://kingsdentalsociety.com/assets/charity-B-OczZAi.jpg" -o public/images/events/charity.jpg
curl -sL "https://kingsdentalsociety.com/assets/pulp-crawl-UGK3J-Oa.jpg" -o public/images/events/pulp-crawl.jpg
curl -sL "https://kingsdentalsociety.com/assets/inter-uni-BKJ92qMv.jpg" -o public/images/events/inter-uni.jpg
curl -sL "https://kingsdentalsociety.com/assets/year-group-DZ44GDnq.jpg" -o public/images/events/year-group.jpg
curl -sL "https://kingsdentalsociety.com/assets/talks-BYBU8Uo7.jpg" -o public/images/events/talks.jpg
```

Expected: 8 files created under `public/images/events/`, each a non-zero-size JPEG. Verify with:

Run: `ls -la public/images/events/`
Expected: 8 files, none 0 bytes

If any URL 404s (asset filenames are content-hashed and may have changed since this plan was written), open `https://kingsdentalsociety.com/our-events` in a browser, inspect each event card image via devtools, copy the current `src` URL, and substitute it before re-running that `curl` command.

- [ ] **Step 3: Source the welcome video and logo**

These two assets could not be resolved to a direct downloadable URL from an automated fetch (the homepage is a JS-rendered SPA and the video/logo are loaded dynamically). Source them manually:

1. Open `https://kingsdentalsociety.com` in a browser.
2. Open DevTools → Network tab → filter by "Media" (for the video) and reload the page.
3. Find the `welcome.mp4` (or similarly named) request, right-click → Open in new tab → save as `public/video/welcome.mp4`.
4. Filter by "Img", find the crest/logo asset in the header, save as `public/images/logo.png` (rename to `.svg` instead if the recovered file is actually vector — check the response's `Content-Type` header).

Expected: `public/video/welcome.mp4` and `public/images/logo.png` both exist and are non-zero size.

If the video cannot be recovered (e.g. it was removed from the live site before this step), fall back to a static hero image using `public/images/events/boat-party.jpg` as a placeholder background in Task 9, and note this as a follow-up to source real hero footage later — do not block the rest of the build on this asset.

If the logo cannot be recovered, skip it — Task 5's `NavBar` falls back to the text wordmark when `public/images/logo.png` is absent, so this is not a blocker either.

- [ ] **Step 4: Create a shared Open Graph share image**

The current site's social-share preview still reads "Lovable Generated Project" — every route needs a real branded image instead. Reuse an existing photo rather than commissioning new art:

Run: `cp public/images/events/boat-party.jpg public/images/og-image.jpg`

Expected: `public/images/og-image.jpg` exists, non-zero size. (If `boat-party.jpg` failed to download in Step 2, substitute any other event image that did download successfully.)

- [ ] **Step 5: Commit**

```bash
git add public/images public/video
git commit -m "chore: add event photography, logo, and welcome video source assets"
```

---

## Task 5: NavBar and Footer components

**Files:**
- Create: `components/layout/NavBar.tsx`
- Create: `components/layout/Footer.tsx`
- Test: `components/layout/NavBar.test.tsx`
- Test: `components/layout/Footer.test.tsx`

**Interfaces:**
- Produces: `<NavBar />` and `<Footer />`, both zero-prop components, consumed by `app/layout.tsx` in Task 6.
- Nav links (exact hrefs, must match `app/*` routes created in Tasks 10–14): Home `/`, Events `/events`, Committee `/committee`, Sponsors `/sponsors`, Join `/join`.

- [ ] **Step 1: Write the failing tests**

```tsx
// components/layout/NavBar.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders a real href for every nav link — none are dead (# or empty)', () => {
    render(<NavBar />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(5);
    for (const link of links) {
      const href = link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });

  it('links to Home, Events, Committee, Sponsors, and Join', () => {
    render(<NavBar />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('link', { name: 'Committee' })).toHaveAttribute('href', '/committee');
    expect(screen.getByRole('link', { name: 'Sponsors' })).toHaveAttribute('href', '/sponsors');
    expect(screen.getByRole('link', { name: 'Join' })).toHaveAttribute('href', '/join');
  });
});
```

```tsx
// components/layout/Footer.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('shows a real contact email, not a placeholder', () => {
    render(<Footer />);
    expect(
      screen.getByRole('link', { name: /kingsdentalsociety@gmail\.com/i })
    ).toHaveAttribute('href', 'mailto:kingsdentalsociety@gmail.com');
  });

  it('repeats the main nav links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('link', { name: 'Committee' })).toHaveAttribute('href', '/committee');
    expect(screen.getByRole('link', { name: 'Sponsors' })).toHaveAttribute('href', '/sponsors');
  });

  it('does not contain leftover scaffold branding text', () => {
    render(<Footer />);
    expect(screen.queryByText(/lovable/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/layout`
Expected: FAIL — `NavBar.tsx` and `Footer.tsx` do not exist yet

- [ ] **Step 3: Create `components/layout/NavBar.tsx`**

```tsx
'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/committee', label: 'Committee' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/join', label: 'Join' },
];

export function NavBar() {
  return (
    <header className="bg-navy text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 font-display text-lg tracking-wide">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt=""
            className="h-8 w-8 object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          KCL Dental Society
        </Link>
        <ul className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white hover:text-gold">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Create `components/layout/Footer.tsx`**

```tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-lg">KCL Dental Society</p>
          <a href="mailto:kingsdentalsociety@gmail.com" className="text-white hover:text-gold">
            kingsdentalsociety@gmail.com
          </a>
        </div>
        <ul className="flex gap-6">
          <li>
            <Link href="/events" className="text-white hover:text-gold">
              Events
            </Link>
          </li>
          <li>
            <Link href="/committee" className="text-white hover:text-gold">
              Committee
            </Link>
          </li>
          <li>
            <Link href="/sponsors" className="text-white hover:text-gold">
              Sponsors
            </Link>
          </li>
        </ul>
        <p className="text-sm text-white/70">
          © {new Date().getFullYear()} King&apos;s College London Dental Society. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/layout`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/layout
git commit -m "feat: NavBar and Footer with real links to every route"
```

---

## Task 6: Root layout wiring

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `NavBar` and `Footer` from Task 5
- Produces: every page rendered inside `app/*/page.tsx` is wrapped with the nav and footer automatically — later page tasks do not re-render them.

- [ ] **Step 1: Update `app/layout.tsx` to include NavBar and Footer**

```tsx
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "KCL Dental Society — King's College London Dental Society",
    template: '%s | KCL Dental Society',
  },
  description:
    "King's College London Dental Society — Community, Careers, Culture. Events, committee, and sponsors for KCL dental students.",
  openGraph: {
    title: "KCL Dental Society",
    description:
      "King's College London Dental Society — Community, Careers, Culture.",
    images: ['/images/og-image.jpg'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-body text-body">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify the app still builds**

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 3: Run the full test suite to confirm nothing broke**

Run: `npm test`
Expected: PASS — all existing tests green

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire NavBar and Footer into root layout, set default page metadata"
```

---

## Task 7: RevealOnScroll component

**Files:**
- Create: `components/RevealOnScroll.tsx`
- Test: `components/RevealOnScroll.test.tsx`

**Interfaces:**
- Produces: `<RevealOnScroll className?: string>{children}</RevealOnScroll>` — consumed by Tasks 10–13 page components to wrap sections with entrance animation.
- Constraint: content must be present and visible (`opacity-100`) on first render, before any client-side JS runs — this satisfies the "animation never gates visibility" requirement.

- [ ] **Step 1: Write the failing test**

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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/RevealOnScroll.test.tsx`
Expected: FAIL — `RevealOnScroll.tsx` does not exist yet

- [ ] **Step 3: Create `components/RevealOnScroll.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export function RevealOnScroll({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visibilityClass = !ready || visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';
  const transitionClass = ready ? 'transition-all duration-700 ease-out' : '';

  return (
    <div ref={ref} className={`${className} ${transitionClass} ${visibilityClass}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/RevealOnScroll.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/RevealOnScroll.tsx components/RevealOnScroll.test.tsx
git commit -m "feat: RevealOnScroll — scroll entrance animation that never hides content pre-hydration"
```

---

## Task 8: EventCard, CommitteeCard, SponsorTile components

**Files:**
- Create: `components/EventCard.tsx`
- Create: `components/CommitteeCard.tsx`
- Create: `components/SponsorTile.tsx`
- Test: `components/EventCard.test.tsx`
- Test: `components/CommitteeCard.test.tsx`
- Test: `components/SponsorTile.test.tsx`

**Interfaces:**
- Consumes: `EventCategory`, `CommitteeMember`, `Sponsor` types from `data/types.ts` (Task 3)
- Produces: `<EventCard category={EventCategory} />`, `<CommitteeCard member={CommitteeMember} />`, `<SponsorTile sponsor={Sponsor} />` — consumed by Task 11 (Events page), Task 12 (Committee page), Task 13 (Sponsors page).

- [ ] **Step 1: Write the failing tests**

```tsx
// components/EventCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventCard } from './EventCard';

const category = {
  slug: 'boat-party',
  name: 'Boat Party',
  description: 'Set sail on the Thames.',
  image: '/images/events/boat-party.jpg',
};

describe('EventCard', () => {
  it('renders the category name, description, and an image with matching alt text', () => {
    render(<EventCard category={category} />);
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
    expect(screen.getByText('Set sail on the Thames.')).toBeInTheDocument();
    expect(screen.getByAltText('Boat Party')).toBeInTheDocument();
  });
});
```

```tsx
// components/CommitteeCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommitteeCard } from './CommitteeCard';

describe('CommitteeCard', () => {
  it('renders name and role when a photo is provided', () => {
    render(<CommitteeCard member={{ name: 'Aman Aziz', role: 'President', group: 'Leadership', photo: '/images/committee/aman-aziz.jpg' }} />);
    expect(screen.getByText('Aman Aziz')).toBeInTheDocument();
    expect(screen.getByText('President')).toBeInTheDocument();
    expect(screen.getByAltText('Aman Aziz')).toBeInTheDocument();
  });

  it('renders a uniform initials placeholder when no photo is provided, not a mixed graphic', () => {
    render(<CommitteeCard member={{ name: 'Raveena Dheer', role: 'Vice-President', group: 'Leadership' }} />);
    expect(screen.getByText('Raveena Dheer')).toBeInTheDocument();
    expect(screen.getByText('RD')).toBeInTheDocument();
  });
});
```

```tsx
// components/SponsorTile.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SponsorTile } from './SponsorTile';

describe('SponsorTile', () => {
  it('renders a diamond sponsor with its description and a real link', () => {
    render(
      <SponsorTile
        sponsor={{
          name: 'MDDUS',
          tier: 'diamond',
          description: 'Medico-legal support.',
          link: 'mailto:kingsdentalsociety@gmail.com',
        }}
      />
    );
    expect(screen.getByText('MDDUS')).toBeInTheDocument();
    expect(screen.getByText('Medico-legal support.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /MDDUS/i })).toHaveAttribute(
      'href',
      'mailto:kingsdentalsociety@gmail.com'
    );
  });

  it('renders a partner tile with just a name when no description exists', () => {
    render(<SponsorTile sponsor={{ name: 'Oralieve', tier: 'partner' }} />);
    expect(screen.getByText('Oralieve')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/EventCard.test.tsx components/CommitteeCard.test.tsx components/SponsorTile.test.tsx`
Expected: FAIL — none of the three components exist yet

- [ ] **Step 3: Create `components/EventCard.tsx`**

```tsx
import type { EventCategory } from '@/data/types';

export function EventCard({ category }: { category: EventCategory }) {
  return (
    <article className="overflow-hidden rounded-lg border border-navy/10 shadow-sm">
      <img src={category.image} alt={category.name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-display text-xl text-navy">{category.name}</h3>
        <p className="mt-2 text-body">{category.description}</p>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Create `components/CommitteeCard.tsx`**

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

export function CommitteeCard({ member }: { member: CommitteeMember }) {
  return (
    <div className="flex flex-col items-center text-center">
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-navy font-display text-lg text-white">
          {initials(member.name)}
        </div>
      )}
      <p className="mt-2 font-semibold text-navy">{member.name}</p>
      <p className="text-sm text-body">{member.role}</p>
    </div>
  );
}
```

- [ ] **Step 5: Create `components/SponsorTile.tsx`**

```tsx
import type { Sponsor } from '@/data/types';

export function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const isDiamond = sponsor.tier === 'diamond';

  return (
    <div
      className={
        isDiamond
          ? 'rounded-lg border-2 border-gold bg-navy p-8 text-white'
          : 'flex items-center justify-center rounded-lg border border-navy/10 p-6'
      }
    >
      {sponsor.link ? (
        <a href={sponsor.link} className={isDiamond ? 'text-white hover:text-gold' : 'text-navy hover:text-gold'}>
          <span className="font-display text-lg">{sponsor.name}</span>
        </a>
      ) : (
        <span className={isDiamond ? 'font-display text-lg text-white' : 'font-display text-lg text-navy'}>
          {sponsor.name}
        </span>
      )}
      {sponsor.description && <p className="mt-3 text-sm text-white/90">{sponsor.description}</p>}
    </div>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- components/EventCard.test.tsx components/CommitteeCard.test.tsx components/SponsorTile.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add components/EventCard.tsx components/CommitteeCard.tsx components/SponsorTile.tsx components/EventCard.test.tsx components/CommitteeCard.test.tsx components/SponsorTile.test.tsx
git commit -m "feat: EventCard, CommitteeCard, SponsorTile presentational components"
```

---

## Task 9: VideoHero component

**Files:**
- Create: `components/VideoHero.tsx`
- Test: `components/VideoHero.test.tsx`

**Interfaces:**
- Produces: `<VideoHero />` (zero props, reads the fixed asset path `/video/welcome.mp4`) — consumed by Task 10 (Home page).
- Constraint: no bare native browser controls — the current site's specific bug being fixed.

- [ ] **Step 1: Write the failing test**

```tsx
// components/VideoHero.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, container } from '@testing-library/react';
import { VideoHero } from './VideoHero';

describe('VideoHero', () => {
  it('renders a muted, autoplaying video without native controls', () => {
    const { container } = render(<VideoHero />);
    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('muted');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video).not.toHaveAttribute('controls');
  });

  it('renders the brand tagline over the video', () => {
    render(<VideoHero />);
    expect(screen.getByText('Community · Careers · Culture')).toBeInTheDocument();
  });

  it('renders a custom mute/unmute toggle button, not native controls', () => {
    render(<VideoHero />);
    expect(screen.getByRole('button', { name: /unmute|mute/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/VideoHero.test.tsx`
Expected: FAIL — `VideoHero.tsx` does not exist yet

- [ ] **Step 3: Create `components/VideoHero.tsx`**

```tsx
'use client';

import { useRef, useState } from 'react';

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-navy">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/welcome.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-navy/50" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="font-display text-4xl md:text-6xl">King&apos;s College London Dental Society</h1>
        <p className="mt-4 text-xl tracking-wide text-gold">Community · Careers · Culture</p>
      </div>
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-6 right-6 rounded-full border border-white/60 px-4 py-2 text-sm text-white hover:border-gold hover:text-gold"
      >
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/VideoHero.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/VideoHero.tsx components/VideoHero.test.tsx
git commit -m "feat: branded VideoHero player replacing bare native video controls"
```

---

## Task 10: Home page

**Files:**
- Modify: `app/page.tsx`
- Test: `app/page.test.tsx`

**Interfaces:**
- Consumes: `VideoHero` (Task 9), `RevealOnScroll` (Task 7), `EVENT_CATEGORIES` (Task 3)
- Produces: `/` route with a real "Join" CTA linking to `/join` and a real "Society App" link — no dead buttons.

- [ ] **Step 1: Write the failing test**

```tsx
// app/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('has a real Join link, not a dead button', () => {
    render(<Home />);
    const joinLink = screen.getByRole('link', { name: /join/i });
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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/page.test.tsx`
Expected: FAIL — current `app/page.tsx` is still the Task 1 placeholder with no Join link

- [ ] **Step 3: Replace `app/page.tsx`**

```tsx
import Link from 'next/link';
import { VideoHero } from '@/components/VideoHero';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function Home() {
  return (
    <>
      <VideoHero />

      <RevealOnScroll className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="font-display text-3xl text-navy">More than a society</h2>
        <p className="mt-4 text-lg">
          KCL Dental Society is a community built to make your time at dental school
          unforgettable — creating lasting connections among students from diverse backgrounds
          and delivering the best London has to offer academically, socially, and professionally.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/join"
            className="rounded-full bg-navy px-6 py-3 text-white hover:bg-gold"
          >
            Join
          </Link>
          <a
            href="https://go.link2app.co/QlZx6wiDP0b"
            className="rounded-full border border-navy px-6 py-3 text-navy hover:border-gold hover:text-gold"
          >
            Society App
          </a>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
        <div className="rounded-lg border border-navy/10 p-6 text-center">
          <h3 className="font-display text-xl text-navy">What We Run</h3>
          <p className="mt-2 text-sm">Boat parties, formals, workshops, and more.</p>
          <Link href="/events" className="mt-4 inline-block text-navy hover:text-gold">
            Explore Events →
          </Link>
        </div>
        <div className="rounded-lg border border-navy/10 p-6 text-center">
          <h3 className="font-display text-xl text-navy">Your Committee</h3>
          <p className="mt-2 text-sm">The people making it all happen.</p>
          <Link href="/committee" className="mt-4 inline-block text-navy hover:text-gold">
            Meet the Committee →
          </Link>
        </div>
        <div className="rounded-lg border border-navy/10 p-6 text-center">
          <h3 className="font-display text-xl text-navy">Our Partners</h3>
          <p className="mt-2 text-sm">Industry support for the largest trade fayre in the UK.</p>
          <Link href="/sponsors" className="mt-4 inline-block text-navy hover:text-gold">
            Our Sponsors →
          </Link>
        </div>
      </RevealOnScroll>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: Home page with video hero, mission copy, and real CTAs"
```

---

## Task 11: Events page (What We Run / Upcoming tabs)

**Files:**
- Create: `app/events/page.tsx`
- Create: `app/events/EventsTabs.tsx`
- Test: `app/events/EventsTabs.test.tsx`

**Interfaces:**
- Consumes: `EVENT_CATEGORIES` (Task 3), `EventCard` (Task 8), `RevealOnScroll` (Task 7)
- Produces: `/events` route. `EventsTabs` is a client component holding tab state (`'what-we-run' | 'upcoming'`), default `'what-we-run'`.

- [ ] **Step 1: Write the failing test**

```tsx
// app/events/EventsTabs.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventsTabs } from './EventsTabs';

describe('EventsTabs', () => {
  it('shows all 8 event categories immediately under "What We Run"', () => {
    render(<EventsTabs />);
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
    expect(screen.getByText('Formals')).toBeInTheDocument();
    expect(screen.getByText('Talks')).toBeInTheDocument();
  });

  it('switches to a real "no upcoming events yet" message on the Upcoming tab, never a blank page', () => {
    render(<EventsTabs />);
    fireEvent.click(screen.getByRole('tab', { name: 'Upcoming' }));
    expect(screen.getByText(/no upcoming events/i)).toBeInTheDocument();
    expect(screen.queryByText('Boat Party')).not.toBeInTheDocument();
  });

  it('switches back to What We Run', () => {
    render(<EventsTabs />);
    fireEvent.click(screen.getByRole('tab', { name: 'Upcoming' }));
    fireEvent.click(screen.getByRole('tab', { name: 'What We Run' }));
    expect(screen.getByText('Boat Party')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/events/EventsTabs.test.tsx`
Expected: FAIL — `EventsTabs.tsx` does not exist yet

- [ ] **Step 3: Create `app/events/EventsTabs.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { EVENT_CATEGORIES } from '@/data/events';
import { EventCard } from '@/components/EventCard';

type Tab = 'what-we-run' | 'upcoming';

export function EventsTabs() {
  const [tab, setTab] = useState<Tab>('what-we-run');

  return (
    <div>
      <div role="tablist" className="mb-8 flex justify-center gap-4">
        <button
          role="tab"
          aria-selected={tab === 'what-we-run'}
          onClick={() => setTab('what-we-run')}
          className={`rounded-full px-5 py-2 ${
            tab === 'what-we-run' ? 'bg-navy text-white' : 'border border-navy text-navy'
          }`}
        >
          What We Run
        </button>
        <button
          role="tab"
          aria-selected={tab === 'upcoming'}
          onClick={() => setTab('upcoming')}
          className={`rounded-full px-5 py-2 ${
            tab === 'upcoming' ? 'bg-navy text-white' : 'border border-navy text-navy'
          }`}
        >
          Upcoming
        </button>
      </div>

      {tab === 'what-we-run' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EVENT_CATEGORIES.map((category) => (
            <EventCard key={category.slug} category={category} />
          ))}
        </div>
      ) : (
        <p className="mx-auto max-w-md text-center text-lg">
          No upcoming events yet — check back soon, or follow our Instagram for the latest
          announcements.
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create `app/events/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { EventsTabs } from './EventsTabs';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Boat parties, formals, workshops, and more — see what KCL Dental Society runs all year round.',
};

export default function EventsPage() {
  return (
    <RevealOnScroll className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-center font-display text-4xl text-navy">Events</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center">
        From boat parties to clinical workshops, this is how the dental school comes together.
      </p>
      <div className="mt-12">
        <EventsTabs />
      </div>
    </RevealOnScroll>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- app/events/EventsTabs.test.tsx`
Expected: PASS

- [ ] **Step 6: Verify the app builds**

Run: `npm run build`
Expected: build succeeds, `/events` route present in output

- [ ] **Step 7: Commit**

```bash
git add app/events
git commit -m "feat: Events page with What We Run / Upcoming tabs, no empty states"
```

---

## Task 12: Committee page

**Files:**
- Create: `app/committee/page.tsx`
- Create: `app/committee/CommitteeGrid.tsx`
- Test: `app/committee/CommitteeGrid.test.tsx`

**Interfaces:**
- Consumes: `COMMITTEE` (Task 3), `CommitteeCard` (Task 8), `RevealOnScroll` (Task 7)
- Produces: `/committee` route, full roster in one responsive grid grouped by `CommitteeGroup`, no carousel/pagination.

- [ ] **Step 1: Write the failing test**

```tsx
// app/committee/CommitteeGrid.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommitteeGrid } from './CommitteeGrid';

describe('CommitteeGrid', () => {
  it('renders every committee member in one page, not paginated behind a carousel', () => {
    render(<CommitteeGrid />);
    expect(screen.getByText('Aman Aziz')).toBeInTheDocument();
    expect(screen.getByText('Hfsa Fahad')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
  });

  it('groups members under section headings', () => {
    render(<CommitteeGrid />);
    expect(screen.getByRole('heading', { name: 'Leadership' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Year Representatives' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/committee/CommitteeGrid.test.tsx`
Expected: FAIL — `CommitteeGrid.tsx` does not exist yet

- [ ] **Step 3: Create `app/committee/CommitteeGrid.tsx`**

```tsx
import { COMMITTEE } from '@/data/committee';
import type { CommitteeGroup } from '@/data/types';
import { CommitteeCard } from '@/components/CommitteeCard';

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
            <h2 className="mb-6 text-center font-display text-2xl text-navy">{group}</h2>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {members.map((member) => (
                <CommitteeCard key={`${member.name}-${member.role}`} member={member} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Create `app/committee/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { CommitteeGrid } from './CommitteeGrid';

export const metadata: Metadata = {
  title: 'Committee',
  description: "Meet the committee running KCL Dental Society — the people making it all happen.",
};

export default function CommitteePage() {
  return (
    <RevealOnScroll className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-center font-display text-4xl text-navy">Meet the Committee</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center">The people making it all happen.</p>
      <div className="mt-12">
        <CommitteeGrid />
      </div>
    </RevealOnScroll>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- app/committee/CommitteeGrid.test.tsx`
Expected: PASS

- [ ] **Step 6: Verify the app builds**

Run: `npm run build`
Expected: build succeeds, `/committee` route present

- [ ] **Step 7: Commit**

```bash
git add app/committee
git commit -m "feat: Committee page — full roster in one responsive grid, no carousel"
```

---

## Task 13: Sponsors page

**Files:**
- Create: `app/sponsors/page.tsx`
- Test: `app/sponsors/page.test.tsx`

**Interfaces:**
- Consumes: `SPONSORS` (Task 3), `SponsorTile` (Task 8), `RevealOnScroll` (Task 7)
- Produces: `/sponsors` route with the Diamond tier featured above the partner grid, and a real "Become a Sponsor" CTA (not a bare email string).

- [ ] **Step 1: Write the failing test**

```tsx
// app/sponsors/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SponsorsPage from './page';

describe('Sponsors page', () => {
  it('features MDDUS as the diamond sponsor with its description', () => {
    render(<SponsorsPage />);
    expect(screen.getByText('MDDUS')).toBeInTheDocument();
    expect(screen.getByText(/medico-legal/i)).toBeInTheDocument();
  });

  it('lists partner sponsors', () => {
    render(<SponsorsPage />);
    expect(screen.getByText('Oralieve')).toBeInTheDocument();
    expect(screen.getByText('Curaden')).toBeInTheDocument();
  });

  it('includes the trade fayre stat callout', () => {
    render(<SponsorsPage />);
    expect(screen.getByText(/largest trade fayre/i)).toBeInTheDocument();
  });

  it('has a real Become a Sponsor CTA, not a bare email string', () => {
    render(<SponsorsPage />);
    const cta = screen.getByRole('link', { name: /become a sponsor/i });
    expect(cta).toHaveAttribute('href', expect.stringContaining('mailto:kingsdentalsociety@gmail.com'));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/sponsors/page.test.tsx`
Expected: FAIL — `app/sponsors/page.tsx` does not exist yet

- [ ] **Step 3: Create `app/sponsors/page.tsx`**

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
    <RevealOnScroll className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-center font-display text-4xl text-navy">Our Sponsors</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center">
        We host the largest Trade Fayre of any university dental society in the UK, with over
        400 student attendees — supported by industry partners who believe in KCL Dental
        Society.
      </p>

      <div className="mx-auto mt-12 max-w-xl">
        <SponsorTile sponsor={diamond} />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {partners.map((sponsor) => (
          <SponsorTile key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="font-display text-2xl text-navy">Become a Sponsor</h2>
        <p className="mx-auto mt-2 max-w-xl">
          We're happy to discuss any form of sponsorship — financial, product, or academic
          opportunity.
        </p>
        <a
          href="mailto:kingsdentalsociety@gmail.com?subject=Sponsorship%20Enquiry"
          className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-white hover:bg-gold"
        >
          Become a Sponsor
        </a>
      </div>
    </RevealOnScroll>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/sponsors/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Verify the app builds**

Run: `npm run build`
Expected: build succeeds, `/sponsors` route present

- [ ] **Step 6: Commit**

```bash
git add app/sponsors
git commit -m "feat: Sponsors page with featured diamond tier and real sponsor CTA"
```

---

## Task 14: Join (Membership) page

**Files:**
- Create: `app/join/page.tsx`
- Test: `app/join/page.test.tsx`

**Interfaces:**
- Produces: `/join` route — the page that does not exist on the current site despite being the first homepage button.

- [ ] **Step 1: Write the failing test**

```tsx
// app/join/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import JoinPage from './page';

describe('Join page', () => {
  it('links out to the real KCLSU membership signup', () => {
    render(<JoinPage />);
    const link = screen.getByRole('link', { name: /kclsu/i });
    expect(link).toHaveAttribute(
      'href',
      'https://www.kclsu.org/groups/activities/join/group/kcl_dental_society/'
    );
  });

  it('links out to the Society App', () => {
    render(<JoinPage />);
    expect(screen.getByRole('link', { name: /society app/i })).toHaveAttribute(
      'href',
      'https://go.link2app.co/QlZx6wiDP0b'
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/join/page.test.tsx`
Expected: FAIL — `app/join/page.tsx` does not exist yet

- [ ] **Step 3: Create `app/join/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Join',
  description: 'Join KCL Dental Society through the KCLSU portal and get the Society App.',
};

export default function JoinPage() {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="font-display text-4xl text-navy">Join KCL Dental Society</h1>
      <p className="mt-4">
        Membership gets you into every event on this site — boat parties, formals, workshops,
        talks, and more — plus career mentorship and a community that lasts well beyond
        university.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <a
          href="https://www.kclsu.org/groups/activities/join/group/kcl_dental_society/"
          className="rounded-full bg-navy px-6 py-3 text-white hover:bg-gold"
        >
          Sign up via KCLSU
        </a>
        <a
          href="https://go.link2app.co/QlZx6wiDP0b"
          className="rounded-full border border-navy px-6 py-3 text-navy hover:border-gold hover:text-gold"
        >
          Get the Society App
        </a>
      </div>
    </RevealOnScroll>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/join/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Verify the app builds**

Run: `npm run build`
Expected: build succeeds, `/join` route present

- [ ] **Step 6: Commit**

```bash
git add app/join
git commit -m "feat: Join/Membership page — the button that previously went nowhere now works"
```

---

## Task 15: Final verification pass

**Files:**
- None created — this task verifies the whole build.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS — every test file across `data/`, `components/`, and `app/` green

- [ ] **Step 2: Run a full production build**

Run: `npm run build`
Expected: build succeeds; `out/` contains `index.html`, `events/index.html`, `committee/index.html`, `sponsors/index.html`, `join/index.html`

- [ ] **Step 3: Serve the static export locally and manually check every route**

Run: `npx serve out` (or any static file server), then open in a browser:
- `/` — video hero plays muted/looped, custom mute button works, Join and Society App buttons both navigate somewhere real
- `/events` — What We Run tab shows all 8 cards with real photos on load (not blank-then-fade); Upcoming tab shows the real placeholder message, never blank
- `/committee` — full roster visible in one scroll, grouped by section heading, no carousel/pagination controls
- `/sponsors` — MDDUS diamond tile at top, partner grid below, Become a Sponsor button opens a mail client
- `/join` — both buttons link out correctly

- [ ] **Step 4: Check responsive layout at the two breakpoints called out in the spec**

Using browser devtools device toolbar, check `/committee` and `/` at 375px and 768px widths.
Expected: no horizontal scroll, committee grid reflows to fewer columns, hero text remains readable and doesn't overflow.

- [ ] **Step 5: Check accessibility basics**

For each route, confirm every `<img>` has non-empty `alt` text (event photos use category name, committee photos use member name) and that body text color (`#444` on white) meets 4.5:1 contrast — this was already asserted by `globals.test.ts` in Task 2, but visually confirm here too.

- [ ] **Step 6: Confirm no leftover scaffold branding**

Run: `grep -ri "lovable" app/ components/ data/ public/`
Expected: no matches

- [ ] **Step 7: Confirm no dead links across the whole app**

Run: `npm test` (the NavBar, Footer, Home, Events, Committee, Sponsors, and Join tests all assert real, non-`#` hrefs — this is the regression guard for the current site's two dead buttons)
Expected: PASS

- [ ] **Step 8: Final commit**

```bash
git add -A
git status
```

Expected: working tree clean (everything already committed in prior tasks) — if anything is unstaged, review it, then:

```bash
git commit -m "chore: final verification pass complete"
```

(Skip this commit if `git status` shows nothing to commit.)
