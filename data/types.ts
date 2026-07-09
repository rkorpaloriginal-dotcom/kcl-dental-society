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
  // Real photo pulled from the live site, downloaded into public/images/committee
  // and committed to the repo — every member has one, so this is never rendered
  // conditionally against a possibly-missing asset. If a future member is added
  // without a photo, do not add a bare onError-based fallback: an SSR'd <img>
  // that fails before hydration attaches the listener can't be rescued that way
  // (see the NavBar logo fix in this project's history for the same failure mode).
  photo?: string;
}

export interface Sponsor {
  name: string;
  tier: 'diamond' | 'partner';
  description?: string;
  link?: string;
  // Real logo pulled from the live site, downloaded into public/images/sponsors
  // and committed to the repo.
  logo?: string;
}
