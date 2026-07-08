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
