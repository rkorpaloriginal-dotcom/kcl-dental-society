import type { EventCategory } from '@/data/types';

export function EventCard({ category }: { category: EventCategory }) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-navy/10 bg-cream">
      <img src={category.image} alt={category.name} className="h-2/3 w-full flex-1 object-cover" />
      <div className="p-4">
        <h3 className="font-display text-xl text-navy">{category.name}</h3>
        <p className="mt-2 text-sm text-body">{category.description}</p>
      </div>
    </article>
  );
}
