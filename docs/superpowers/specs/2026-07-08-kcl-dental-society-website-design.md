# KCL Dental Society Website — Design Spec

## Purpose

Rebuild kingsdentalsociety.com from scratch. The current site (KCL Dental Society, a student society at King's College London's dental school) is functional but visually generic. This is a full redesign with an upgraded tech stack, not a content overhaul — real content from the live site is carried over.

## Goals

- Modern, premium/editorial ("magazine") visual identity — bold headings, generous whitespace, scroll-reveal storytelling, refined typography-led hierarchy over heavy graphics.
- Emphasize the society's active social/event calendar (the current site undersells this).
- Keep the existing information architecture members already know: Home, Our Events, What's On, Committee, Sponsors.
- Easy for a future student committee to maintain/hand off.

## Non-goals

- No backend/CMS/database — static-first site, no dynamic data source.
- No fabricated event dates or committee photos — gaps are shown as clean placeholders, not invented data.
- Not scoped to reuse patterns/components from any other project.

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

**Gaps (launch with clean placeholders, not fabricated data)**:
- No real event dates exist yet → "What's On" ships as a styled timeline template with no fake entries
- No committee photos exist yet → monogram/initials avatars per person until real photos are supplied

## Pages

### Home
Hero (Community · Careers · Culture), mission narrative section, teaser strips linking into Events / Committee / Sponsors, footer CTA (Join via KCLSU external link, Society App external link).

### Our Events
The 8 category cards above, laid out as an asymmetric bento/gallery (not a plain uniform grid) to visually emphasize how active the society is. Each card: photo, category name, description copy.

### What's On
Styled "event timeline" shell/template. No fake dates. Structured so real events can be dropped in later without a redesign.

### Committee
Full ~38-person roster grouped by the categories above (Leadership → Officers → Events team → Year Representatives → Affiliated). Placeholder monogram avatars, name, role.

### Sponsors
Diamond tier (MDDUS) featured prominently at top, Partners row below, trade-fayre stat callout, sponsorship-enquiry CTA to the society email.

## Visual language

Premium editorial/magazine style: bold serif or display headings, generous whitespace, scroll-reveal animations on section entry, typography-led hierarchy rather than heavy graphic treatment. Accent color palette to be proposed during implementation — dental/medical-appropriate without defaulting to clinical blue.

## Testing / verification

Standard for a static marketing site: production build succeeds, all 5 routes render, responsive check (mobile/tablet/desktop), and a manual pass through each page in a browser before calling it done.
