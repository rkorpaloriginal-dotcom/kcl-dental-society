# KCL Dental Society Website — Design Spec

## Purpose

Rebuild kingsdentalsociety.com from scratch. The current site (KCL Dental Society, a student society at King's College London's dental school) was built on a scaffolding tool (Lovable) and has real structural and content gaps — dead buttons, an empty page, inconsistent committee imagery, leftover scaffold branding. This is a full rebuild of the code and structure on a proper stack, while carrying forward the existing photography, video, logo, and copy as source material.

## Goals

- Modern, premium/editorial ("magazine") visual identity built on the current site's existing navy/gold brand system — bold serif headings, generous whitespace, scroll-reveal storytelling as progressive enhancement (never a visibility gate).
- Emphasize the society's active social/event calendar via the "Our Events" pattern, which is already the strongest page on the current site.
- Fix every specific gap identified in the rebuild brief (see below) — no dead links, no empty pages, no leftover scaffold branding, no inconsistent committee imagery, no carousel-hidden content.
- Simplify the information architecture (merge the Events/What's On overlap) rather than carrying forward the current site's confusion.
- Easy for a future student committee to maintain/hand off.

## Non-goals

- No backend/CMS/database — static-first site, no dynamic data source.
- No fabricated event dates — "What's On" launches only once real dated content exists, or is folded into Events as an "Upcoming" tab.
- Not scoped to reuse patterns/components from any other project.

## Source material to reuse (per rebuild brief, 2026-07-08)

The current site's photography, event imagery, committee headshots (where real), logo, and welcome video (`welcome.mp4`) are good source material and should be pulled into the new build — the code/structure is what's being replaced, not the assets.

## Specific problems on the current site the rebuild must not repeat

1. Homepage "Membership" and "Society App" buttons don't link anywhere → every button/link must resolve to something real from day one (join form and/or the external KCLSU/app links captured above).
2. "What's On" is just a heading with no content → don't ship an empty page; only launch once real dated content exists, or fold "Upcoming" into the Events page as a tab.
3. Browser tab/meta still reads "Lovable App" / "Lovable Generated Project" from the scaffolding tool → set real per-page `<title>`, meta description, and a branded Open Graph image for every route.
4. Welcome video plays with bare native browser controls → build a branded custom player (or an autoplay/muted background treatment) consistent with the brand.
5. Our Events page content fades in late enough to look blank on first paint → render content in the DOM immediately; animation is a progressive enhancement, not a gate.
6. Committee page: roughly half the roster shows a generic template graphic (shared city-skyline background with the role title baked in) instead of a real photo, and the full roster is hidden behind carousel pagination → one consistent visual treatment for every member (real photo where it exists, uniform placeholder otherwise — never mixed), shown as a full responsive grid, not a carousel.
7. Sponsors page: only the Diamond tier (MDDUS) has real content; the rest is a bare logo grid with no benefits/pricing info and no sponsor-inquiry path beyond a plain email address → standardize tile treatment and add a real "Become a sponsor" CTA.

## Stack

- Next.js (App Router) + Tailwind CSS
- Deployed on Vercel
- Static export where possible
- New standalone project at `C:\Users\A\kcl-dental-society`, own git repo (already initialized)

## Content inventory (scraped from live site, to reuse verbatim/adapted)

**Nav / IA**: Home, Our Events, What's On, Committee, Sponsors, Membership (external → KCLSU group page), Society App (external link)

**Mission / brand copy**:
- Heading: "King's College London Dental Society"
- Tagline: "Community · Careers · Culture"
- Core message: "KCL Dental Society is more than a society; it's a community built to make your time at dental school unforgettable."
- About: creates lasting connections among students from diverse backgrounds; delivers premier London experiences academically, socially, and professionally; world-class teaching and career opportunities alongside social activities and industry partnerships.
- Contact: kingsdentalsociety@gmail.com
- Footer: "© 2026 King's College London Dental Society. All rights reserved."

**Event categories** (8, each with a real photo asset to be downloaded from the live site):
| Category | Copy | Image source |
|---|---|---|
| Boat Party | "Set sail on the Thames for a night of music, dancing, and unforgettable views with your dental family." | `/assets/boat-party-s5lwzWab.jpg` |
| Formals | "Elegant black-tie dinners celebrating milestones and bringing the dental school together in style." | `/assets/formals-Bh0h77O8.jpg` |
| Hands-on Workshops | "Practical sessions to sharpen your clinical skills with expert guidance and real-world techniques." | `/assets/workshops-CBdNifwZ.jpg` |
| Charity & Wellbeing | "Fundraising events and wellbeing initiatives supporting causes close to the dental community's heart." | `/assets/charity-B-OczZAi.jpg` |
| Pulp Crawl & T-shirt Party | "Our iconic themed socials — grab your custom tee and hit the town with the whole dental school." | `/assets/pulp-crawl-UGK3J-Oa.jpg` |
| Inter-uni | "Compete and socialise with dental students from universities across the UK." | `/assets/inter-uni-BKJ92qMv.jpg` |
| Year Group | "Exclusive socials and bonding events tailored to each year group for closer connections." | `/assets/year-group-DZ44GDnq.jpg` |
| Talks | "Inspiring lectures and panel discussions from leading dental professionals and specialists." | `/assets/talks-BYBU8Uo7.jpg` |

Source URLs are under `https://kingsdentalsociety.com/assets/...` — download into new project's `/public` during implementation.

**Committee** (~38 people, real names/roles, no photos/bios currently — see full list captured in conversation; grouping for the new grid):
- Leadership: Staff President, President, Vice-President, President-Elect, Past President
- Officers: Sponsorship Officer, Secretary, Academic Events Coordinator, Treasurer, Wellbeing Officer, Charity Representative
- Events team: Events Representative (×2), Events Representative (Non-Drinking), Social Media Representative, Web & Media Representative, Junior/Senior Ball Representative, Junior/Senior BDSA Representative, Sports Representative
- Year Representatives: BDS1–5 and DTH1–3 (two reps per year where applicable), GPEP Representative, International Representative
- Affiliated: Smile Society President/VP, Kings' Crown Chief Editor

**Sponsors**:
- Diamond: MDDUS — "medico-legal and dento-legal support to doctors and dentists across the UK," comprised of experienced dentists, doctors, lawyers, and risk specialists
- Partners: Oralieve, Albert Waeschle, MyDentist, DDU, Curaden, Dental Protection
- Proof point: "the largest Trade Fayre of any university dental society in the UK," 400+ student attendees
- Sponsorship CTA: contact kingsdentalsociety@gmail.com, open to financial, product, or academic-opportunity sponsorship

**Welcome video**: `welcome.mp4` — existing homepage intro video, currently played with bare native controls. Reuse the asset; rebuild needs a branded custom player (or muted autoplay background treatment).

**Gaps**:
- No real event dates exist yet → "What's On" does not ship as a standalone empty page; it either launches once real dated content exists, or is folded into the Events page as an "Upcoming" tab alongside the evergreen "What We Run" category grid (see Information Architecture below).
- Committee photos are inconsistent on the live site (some real headshots, some generic template graphics) → the rebuild uses one consistent treatment for every member: real photo where one already exists and is reusable, uniform placeholder (not a mixed template graphic) for everyone else.

## Information architecture

Current nav (Our Events, What's On, Committee, Sponsors) creates real overlap/confusion: "Our Events" is a static evergreen category grid that works well; "What's On" is meant to be a live dated timeline but is currently empty. The rebuild resolves this rather than carrying it forward as-is — going with:

**One Events page, two tabs**: "Upcoming" (chronological, launched only once real dated content exists) and "What We Run" (the evergreen 8-category grid) — one fewer top-level nav item than the current site.

Nav becomes: Home, Events (Upcoming / What We Run tabs), Committee, Sponsors, Join.

## Pages

### Home
Full-bleed hero using the welcome video (branded custom player, muted/autoplay background treatment) or a London-skyline still with crest logo, serif headline, tagline "Community · Careers · Culture," navy + gold palette. Mission narrative section. Teaser strips linking into Events / Committee / Sponsors. Real CTAs only — "Join" links to an actual Membership page (see below) or the KCLSU group page; "Society App" links to the actual app link — never a dead button.

### Events (Upcoming / What We Run tabs)
**What We Run** (default tab, launches at Phase 1): the 8 category cards, real photo per category, icon + title + one-line description, 4-column responsive grid — this is the strongest pattern on the current site and the template to generalize. Content renders immediately in the DOM; scroll/entrance animation layers on top rather than gating visibility.
**Upcoming** (launches only once real dated content exists): chronological listing of dated events.

### Committee
Full ~38-person roster grouped logically (Leadership → Officers → Events team → Year Representatives → Affiliated), shown as one responsive grid — no carousel/pagination. Every member gets the same visual treatment: real photo where a reusable one exists, uniform placeholder otherwise (never a mix, never the old template-graphic-with-baked-in-role-title). Optionally filterable by team.

### Sponsors
Diamond tier (MDDUS) featured prominently at top with description and a working sign-up/contact link. Partners row below with standardized tile treatment (consistent padding/sizing/background — not a bare logo grid). Trade-fayre stat callout ("largest Trade Fayre of any university dental society in the UK," 400+ students). Real "Become a sponsor" CTA beyond a bare email address — at minimum a mailto with a clear benefits blurb; a contact form is a Phase 4 stretch.

### Membership / Join
New page — does not exist on the current site despite being the first homepage button. States the value of joining, links out to the KCLSU group signup and the Society App.

## Visual language

Premium editorial/magazine style, carrying forward the current site's identity rather than replacing it:

| Token | Value | Usage |
|---|---|---|
| Primary / navy | `#1B2A56` | Dominant brand color — header, footer, hero overlay |
| Accent / gold | `#C9992E` | Single accent — CTAs, links, highlighted words in headings. No third competing accent color. |
| Display type | Serif (Playfair-style) | Headings; load as a proper web font with system-serif fallback; pairs with the crest logo |
| Body type | Sans-serif | Body copy at ≥4.5:1 contrast against white (e.g. `#444`, not light gray) |
| Imagery | Real photography | Events, sponsors, logo — reuse existing assets. One consistent style for committee headshots (not a mix of real photos and template cards). |
| Motion | Subtle scroll entrance | Never the only way content becomes visible — content renders in the DOM immediately, animation layers on top |

## Phased scope of work

1. **Foundation** — Home, Events ("What We Run" tab), Committee, Sponsors, built on current site's copy/photos/video as source assets. Real per-page `<title>`, meta description, and branded Open Graph image per route (replacing leftover "Lovable App" branding). Membership/Society App buttons get real destinations from day one.
2. **Information architecture** — Resolve Events/What's On overlap per the IA decision above (Upcoming tab, gated on real content). Build the Membership/Join page. Add a real contact path beyond a bare email address.
3. **Visual consistency** — Committee grid with one consistent card treatment, full responsive grid (no carousel), optional team filter. Branded custom video player for the welcome video. Standardized sponsor/partner tiles.
4. **Polish** — Photo/video gallery of past events. Sponsor tiers/benefits detail and "Become a sponsor" CTA/form. Mobile breakpoint testing (375px, 768px), especially committee grid and hero text. Accessibility pass on color contrast and image alt text.

## Testing / verification

Standard for a static marketing site: production build succeeds, all routes render, every link/button resolves to a real destination (no dead buttons), responsive check at 375px/768px/desktop, accessibility pass (contrast, alt text), and a manual pass through each page in a browser before calling it done.
