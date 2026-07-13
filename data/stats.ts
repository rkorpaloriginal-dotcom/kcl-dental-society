import { SPONSORS } from './sponsors';

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 130, suffix: '+', label: 'Years of Society History' },
  { value: 1000, suffix: '+', label: 'Members Across the School' },
  { value: 40, suffix: '+', label: 'Annual Events' },
  { value: SPONSORS.length, suffix: '', label: 'Industry Sponsors' },
];
