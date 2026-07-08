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
  // A broken path here renders as a broken image, not a fallback avatar —
  // CommitteeCard's onError handling can't rescue an SSR'd <img> that fails
  // before hydration attaches the listener (see the NavBar logo fix in
  // this project's history for the same failure mode). Verify the file
  // exists in public/ before setting this.
  photo?: string;
}

export interface Sponsor {
  name: string;
  tier: 'diamond' | 'partner';
  description?: string;
  link?: string;
}
