import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { CommitteeGrid } from './CommitteeGrid';

export const metadata: Metadata = {
  title: 'Committee',
  description: "Meet the committee running KCL Dental Society — the people making it all happen.",
};

export default function CommitteePage() {
  return (
    <RevealOnScroll className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-navy md:text-6xl">Meet the Committee</h1>
      <p className="mt-4 max-w-xl text-body">The people making it all happen.</p>
      <div className="mt-12">
        <CommitteeGrid />
      </div>
    </RevealOnScroll>
  );
}
