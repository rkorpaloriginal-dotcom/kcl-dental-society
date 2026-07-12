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
    id: 'clinical-skills-workshop',
    title: 'Clinical Skills Workshop',
    description:
      'A hands-on evening refining core clinical techniques with guidance from senior students and faculty.',
    category: 'academic',
    startDate: '2026-07-13',
    time: '18:00',
    location: 'Guy\'s Campus, Simulation Suite',
    coverImage: '/images/events/workshops.jpg',
    status: 'upcoming',
  },
  {
    id: 'summer-send-off-social',
    title: 'Summer Send-Off Social',
    description:
      'One last get-together before the summer break — drinks, games, and good company at a favourite local spot.',
    category: 'social',
    startDate: '2026-07-17',
    time: '19:30',
    location: 'The Roebuck, Borough',
    coverImage: '/images/events/pulp-crawl.jpg',
    status: 'upcoming',
  },
  {
    id: 'careers-evening-nhs-vs-private',
    title: 'Careers Evening: NHS vs Private Practice',
    description:
      'Practising dentists compare paths into the NHS and private practice, with time for open Q&A.',
    category: 'careers',
    startDate: '2026-09-16',
    time: '18:30',
    location: 'Guy\'s Campus, Henriette Raphael Lecture Theatre',
    coverImage: '/images/events/talks.jpg',
    status: 'upcoming',
  },
  {
    id: 'freshers-fair',
    title: 'Freshers\' Fair',
    description:
      'Meet the committee, sign up for the year ahead, and find out everything the Society runs.',
    category: 'social',
    startDate: '2026-09-21',
    time: '11:00',
    location: 'Guy\'s Campus Quad',
    coverImage: '/images/events/year-group.jpg',
    status: 'upcoming',
  },
  {
    id: 'charity-bake-sale',
    title: 'Charity Bake Sale',
    description:
      'Home baking from across the year groups, raised in aid of our partner charity.',
    category: 'charity',
    startDate: '2026-10-01',
    time: '12:00',
    location: 'Guy\'s Campus Concourse',
    coverImage: '/images/events/charity.jpg',
    status: 'upcoming',
  },
  {
    id: 'sports-day',
    title: 'Sports Day',
    description:
      'Year groups face off across a full day of five-a-side, netball, and dodgeball, capped with an evening social.',
    category: 'sports',
    startDate: '2026-10-10',
    time: '10:00',
    location: 'Honor Oak Park Sports Grounds',
    coverImage: '/images/events/inter-uni.jpg',
    status: 'upcoming',
  },
  {
    id: 'clinical-photography-workshop',
    title: 'Clinical Photography Workshop',
    description:
      'Learn the fundamentals of intra-oral photography for case documentation and portfolio work.',
    category: 'academic',
    startDate: '2026-11-15',
    time: '14:00',
    location: 'Guy\'s Campus',
    coverImage: '/images/events/workshops.jpg',
    status: 'upcoming',
  },
  {
    id: 'wellbeing-wind-down',
    title: 'Wellbeing Wind-Down',
    description:
      'A calm evening of low-key activities and honest conversation as term deadlines pile up.',
    category: 'wellbeing',
    startDate: '2026-11-19',
    time: '17:30',
    location: 'Guy\'s Campus Chaplaincy',
    coverImage: '/images/events/charity.jpg',
    status: 'upcoming',
  },
  {
    id: 'winter-ball',
    title: 'Winter Ball',
    description:
      'Our flagship formal of the year — a black-tie evening of dinner, dancing, and celebration for the whole dental school.',
    category: 'social',
    startDate: '2026-12-12',
    time: '19:00',
    location: 'Royal Lancaster Hotel',
    coverImage: '/images/events/formals.jpg',
    featured: true,
    registrationUrl: 'https://go.link2app.co/QlZx6wiDP0b',
    status: 'upcoming',
  },
  {
    id: 'inter-uni-tournament',
    title: 'Inter-Uni Sports Tournament',
    description:
      'Dental schools from across the UK compete for the season\'s inter-uni title.',
    category: 'sports',
    startDate: '2027-02-06',
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
