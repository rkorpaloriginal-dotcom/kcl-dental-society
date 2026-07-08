import type { EventCategory } from '@/data/types';

export function EventCard({ category }: { category: EventCategory }) {
  return (
    <article className="overflow-hidden rounded-lg border border-navy/10 shadow-sm">
      <img src={category.image} alt={category.name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-display text-xl text-navy">{category.name}</h3>
        <p className="mt-2 text-body">{category.description}</p>
      </div>
    </article>
  );
}
