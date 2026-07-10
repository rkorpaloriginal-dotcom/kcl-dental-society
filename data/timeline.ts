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
