import type {
  AnnualTradition,
  PastHighlight,
  WhatsOnCategoryMeta,
  WhatsOnEvent,
} from './types';

// Every date, venue, ticket link, and statistic below is illustrative placeholder
// content — the committee has not confirmed this year's calendar yet. Replace each
// entry with real dates/venues as they're confirmed; the components render whatever
// is in this file, so no code changes are needed to swap in real content.

export const CATEGORY_META: WhatsOnCategoryMeta[] = [
  { slug: 'academic', label: 'Academic', accent: 'category-academic' },
  { slug: 'social', label: 'Social', accent: 'category-social' },
  { slug: 'sports', label: 'Sports', accent: 'category-sports' },
  { slug: 'careers', label: 'Careers', accent: 'category-careers' },
  { slug: 'charity', label: 'Charity', accent: 'category-charity' },
  { slug: 'wellbeing', label: 'Wellbeing', accent: 'category-wellbeing' },
];

export const WHATS_ON_EVENTS: WhatsOnEvent[] = [
  {
    id: 'boat-party',
    title: 'Boat Party',
    description:
      'The Society sets sail on the Thames for the first big social of the year — music, drinks, and skyline views.',
    category: 'social',
    startDate: '2026-09-19',
    time: '19:00',
    location: 'Thames Party Boat, Embankment Pier',
    coverImage: '/images/events/boat-party.jpg',
    featured: true,
    registrationUrl: 'https://go.link2app.co/QlZx6wiDP0b',
    status: 'upcoming',
  },
  {
    id: 'pulp-crawl',
    title: 'Pulp Crawl',
    description:
      'Fancy dress descends on Borough for the Society\'s Halloween pub crawl — one of the year\'s biggest turnouts.',
    category: 'social',
    startDate: '2026-10-31',
    time: '20:00',
    location: 'Borough High Street',
    coverImage: '/images/events/pulp-crawl.jpg',
    status: 'upcoming',
  },
  {
    id: 'enigma',
    title: 'Enigma',
    description:
      'A masquerade-themed night out bringing the whole dental school together on the dancefloor.',
    category: 'social',
    startDate: '2026-11-14',
    time: '21:00',
    location: 'Egg London',
    coverImage: '/images/events/pulp-crawl.jpg',
    status: 'upcoming',
  },
  {
    id: 'dentsoc-christmas-dinner',
    title: 'Dentsoc Committee Christmas Dinner',
    description:
      'The committee closes out the autumn term with a festive dinner to thank everyone for the term\'s work.',
    category: 'social',
    startDate: '2026-12-10',
    time: '19:30',
    location: 'The Ivy, Tower Bridge',
    coverImage: '/images/events/formals.jpg',
    status: 'upcoming',
  },
  {
    id: 'halfway-ball',
    title: 'Halfway Ball',
    description:
      'A black-tie formal marking the halfway point of the year — dinner, dancing, and speeches.',
    category: 'social',
    startDate: '2027-01-16',
    time: '19:00',
    location: 'Royal Lancaster Hotel',
    coverImage: '/images/events/formals.jpg',
    status: 'upcoming',
  },
  {
    id: 'bdsa-conference',
    title: 'BDSA Conference',
    description:
      'The British Dental Students\' Association national conference, bringing dental students together from across the UK.',
    category: 'academic',
    startDate: '2027-02-13',
    time: '09:00',
    location: 'University of Birmingham',
    coverImage: '/images/events/talks.jpg',
    status: 'upcoming',
  },
  {
    id: 'barts-kings-tshirt-party',
    title: 'Bart\'s x Kings T-Shirt Party',
    description:
      'A joint social with Bart\'s dental school — dig out your rattiest club T-shirt and come and cause havoc.',
    category: 'social',
    startDate: '2027-02-20',
    time: '20:00',
    location: 'The Fridge, Brixton',
    coverImage: '/images/events/year-group.jpg',
    status: 'upcoming',
  },
  {
    id: 'sports-day',
    title: 'Sports Day',
    description:
      'Year groups face off across a full day of five-a-side, netball, and dodgeball, capped with an evening social.',
    category: 'sports',
    startDate: '2027-06-05',
    time: '10:00',
    location: 'Honor Oak Park Sports Grounds',
    coverImage: '/images/events/inter-uni.jpg',
    status: 'upcoming',
  },
  {
    id: 'graduation-formals',
    title: 'Graduation & Formals',
    description:
      'End-of-year formal dinners and celebrations honouring the graduating class.',
    category: 'social',
    startDate: '2027-06-18',
    time: '18:30',
    location: 'Guy\'s Campus, Great Hall',
    coverImage: '/images/events/formals.jpg',
    status: 'upcoming',
  },
  {
    id: 'bdsa-sports-day',
    title: 'BDSA Sports Day',
    description:
      'The national inter-dental-school sports day, closing out the year against teams from across the UK.',
    category: 'sports',
    startDate: '2027-06-26',
    time: '09:00',
    location: 'TBC',
    coverImage: '/images/events/inter-uni.jpg',
    status: 'upcoming',
  },
];

export const ANNUAL_TRADITIONS: AnnualTradition[] = [
  {
    slug: 'boat-party',
    name: 'Boat Party',
    month: 'September',
    description: 'The Society\'s opening social of the year, out on the water on the Thames.',
    image: '/images/events/boat-party.jpg',
  },
  {
    slug: 'pulp-crawl',
    name: 'Pulp Crawl',
    month: 'Halloween',
    description: 'A fancy-dress pub crawl and one of the most-loved socials of the calendar.',
    image: '/images/events/pulp-crawl.jpg',
  },
  {
    slug: 'enigma',
    name: 'Enigma',
    month: 'November',
    description: 'A themed night out bringing the whole dental school together.',
    image: '/images/events/pulp-crawl.jpg',
  },
  {
    slug: 'dentsoc-christmas-dinner',
    name: 'Dentsoc Committee Christmas Dinner',
    month: 'December',
    description: 'A festive dinner for the committee to close out the autumn term.',
    image: '/images/events/formals.jpg',
  },
  {
    slug: 'halfway-ball',
    name: 'Halfway Ball',
    month: 'January',
    description: 'A black-tie formal marking the halfway point of the year.',
    image: '/images/events/formals.jpg',
  },
  {
    slug: 'bdsa-conference',
    name: 'BDSA Conference',
    month: 'February',
    description: 'The national conference bringing dental students together from across the UK.',
    image: '/images/events/talks.jpg',
  },
  {
    slug: 'barts-kings-tshirt-party',
    name: 'Bart\'s x Kings T-Shirt Party',
    month: 'February',
    description: 'A joint social with Bart\'s dental school - come in your rattiest club T-shirt.',
    image: '/images/events/year-group.jpg',
  },
  {
    slug: 'sports-day-tradition',
    name: 'Sports Day',
    month: 'June',
    description: 'Year groups compete across a full day of sport, followed by an evening social.',
    image: '/images/events/inter-uni.jpg',
  },
  {
    slug: 'bdsa-sports-day',
    name: 'BDSA Sports Day',
    month: 'End of June',
    description: 'The national inter-dental-school sports day against teams from across the UK.',
    image: '/images/events/inter-uni.jpg',
  },
  {
    slug: 'graduation-formals',
    name: 'Graduation & Formals',
    month: 'June',
    description: 'End-of-year formal dinners and celebrations for the graduating class.',
    image: '/images/events/formals.jpg',
  },
];

export const PAST_HIGHLIGHTS: PastHighlight[] = [
  {
    slug: 'sports-day-2025',
    title: 'Sports Day',
    year: '2025',
    image: '/images/events/inter-uni.jpg',
    stats: [
      { label: 'Students', value: '320' },
      { label: 'Universities', value: '11' },
      { label: 'Raised', value: '£4,300' },
    ],
  },
  {
    slug: 'winter-ball-2025',
    title: 'Winter Ball',
    year: '2025',
    image: '/images/events/formals.jpg',
    stats: [
      { label: 'Attendees', value: '450' },
      { label: 'Years represented', value: '5' },
    ],
  },
  {
    slug: 'boat-party-2025',
    title: 'Boat Party',
    year: '2025',
    image: '/images/events/boat-party.jpg',
    stats: [
      { label: 'Attendees', value: '280' },
      { label: 'Sold out in', value: '3 days' },
    ],
  },
  {
    slug: 'charity-week-2025',
    title: 'Charity Week',
    year: '2025',
    image: '/images/events/charity.jpg',
    stats: [
      { label: 'Raised', value: '£6,150' },
      { label: 'Events run', value: '4' },
    ],
  },
];
