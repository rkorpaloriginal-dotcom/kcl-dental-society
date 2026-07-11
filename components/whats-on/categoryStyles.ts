import type { WhatsOnCategorySlug } from '@/data/types';

// Tailwind's content scanner only walks app/** and components/**, so the full
// class names must appear literally in a scanned file — dynamic template
// strings built from data/whats-on.ts's `accent` field would be purged.
export const CATEGORY_STYLES: Record<
  WhatsOnCategorySlug,
  { badge: string; dot: string; text: string }
> = {
  academic: { badge: 'bg-category-academic', dot: 'bg-category-academic', text: 'text-category-academic' },
  social: { badge: 'bg-category-social', dot: 'bg-category-social', text: 'text-category-social' },
  sports: { badge: 'bg-category-sports', dot: 'bg-category-sports', text: 'text-category-sports' },
  careers: { badge: 'bg-category-careers', dot: 'bg-category-careers', text: 'text-category-careers' },
  charity: { badge: 'bg-category-charity', dot: 'bg-category-charity', text: 'text-category-charity' },
  wellbeing: { badge: 'bg-category-wellbeing', dot: 'bg-category-wellbeing', text: 'text-category-wellbeing' },
};
