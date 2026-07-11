import type { Metadata } from 'next';
import { COMMITTEE } from '@/data/committee';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { CommitteeGrid } from './CommitteeGrid';

export const metadata: Metadata = {
  title: 'Committee',
  description: "Meet the committee running KCL Dental Society — the people making it all happen.",
};

export default function CommitteePage() {
  const groupCount = new Set(COMMITTEE.map((member) => member.group)).size;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <RevealOnScroll className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
        <div>
          <p className="font-display text-sm italic text-gold">KCL Dental Society</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-navy md:text-7xl">
            Meet the
            <br />
            Committee
          </h1>
          <p className="mt-6 max-w-md text-body">
            A community of dental students building the academic, social and
            professional experiences that carry the next generation of
            dentists through King&apos;s.
          </p>
        </div>
        <dl className="flex gap-8 border-t border-navy/15 pt-6 md:flex-col md:gap-6 md:border-t-0 md:border-l md:pl-8 md:pt-0">
          <div>
            <dt className="text-xs uppercase tracking-[0.15em] text-body/60">People</dt>
            <dd className="font-display text-3xl text-navy">{COMMITTEE.length}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.15em] text-body/60">Teams</dt>
            <dd className="font-display text-3xl text-navy">{groupCount}</dd>
          </div>
        </dl>
      </RevealOnScroll>

      <a
        href="#roster"
        className="mt-12 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-navy transition-colors duration-300 ease-expo-out hover:text-gold"
      >
        Meet the committee
        <span aria-hidden="true">↓</span>
      </a>

      <div id="roster" className="mt-16 scroll-mt-24">
        <CommitteeGrid />
      </div>
    </div>
  );
}
