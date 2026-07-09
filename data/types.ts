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
  // Not currently rendered — the editorial index layout (CommitteeRow)
  // is pure typography by design. If a future layout reintroduces
  // photos, avoid a bare onError-based fallback: an SSR'd <img> that
  // fails before hydration attaches the listener can't be rescued that
  // way (see the NavBar logo fix in this project's history for the same
  // failure mode).
  photo?: string;
}

export interface Sponsor {
  name: string;
  tier: 'diamond' | 'partner';
  description?: string;
  link?: string;
}
