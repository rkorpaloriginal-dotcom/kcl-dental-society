import Link from 'next/link';
import { VideoHero } from '@/components/VideoHero';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Timeline } from '@/components/timeline/Timeline';

export default function Home() {
  return (
    <>
      <VideoHero />

      <RevealOnScroll className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-[3fr_2fr]">
        <h2 className="font-display text-4xl leading-tight text-navy md:text-6xl">
          KCL Dental Society is a community built to make your time at dental school{' '}
          <span className="text-navy underline decoration-gold decoration-4 underline-offset-4">
            unforgettable
          </span>
          .
        </h2>
        <p className="self-end text-base leading-relaxed text-body">
          Creating lasting connections among students from diverse backgrounds and delivering
          the best London has to offer — academically, socially, and professionally.
        </p>
        <div className="flex flex-wrap gap-4 md:col-span-2">
          <Link
            href="/join"
            className="rounded-full bg-navy px-6 py-3 text-cream transition-colors duration-300 ease-expo-out hover:bg-gold"
          >
            Join
          </Link>
          <a
            href="https://go.link2app.co/QlZx6wiDP0b"
            className="rounded-full border border-navy px-6 py-3 text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
          >
            Society App
          </a>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid overflow-hidden border-y-2 border-navy bg-cream text-navy md:grid-cols-[1fr_1fr_auto]">
          <div className="px-6 py-8 md:border-r-2 md:border-navy md:px-10 md:py-10">
            <p className="font-display text-5xl leading-none md:text-7xl">130+</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-body/60">
              Years of society history
            </p>
          </div>
          <div className="border-t-2 border-navy px-6 py-8 md:border-r-2 md:border-t-0 md:px-10 md:py-10">
            <p className="font-display text-5xl leading-none md:text-7xl">1000+</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-body/60">
              Members across the school
            </p>
          </div>
          <div className="border-t-2 border-navy px-6 py-6 md:border-t-0 md:px-8 md:py-10">
            <p className="max-w-xs text-sm leading-relaxed text-body">
              A student-led network connecting generations of King's dental students through
              academic, professional, and social life.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      <Timeline />

      <RevealOnScroll className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
        <div className="border-t-2 border-navy pt-6 md:col-span-2 md:row-span-2">
          <h3 className="font-display text-3xl text-navy">What We Run</h3>
          <p className="mt-3 max-w-md text-sm text-body">
            Boat parties, formals, workshops, and more.
          </p>
          <Link
            href="/events"
            className="mt-6 inline-block border-b-2 border-gold text-navy hover:text-gold"
          >
            Explore Events →
          </Link>
        </div>
        <div className="border-t-2 border-navy pt-6">
          <h3 className="font-display text-xl text-navy">Your Committee</h3>
          <p className="mt-2 text-sm text-body">The people making it all happen.</p>
          <Link
            href="/committee"
            className="mt-4 inline-block border-b-2 border-gold text-navy hover:text-gold"
          >
            Meet the Committee →
          </Link>
        </div>
        <div className="border-t-2 border-navy pt-6">
          <h3 className="font-display text-xl text-navy">Our Partners</h3>
          <p className="mt-2 text-sm text-body">
            Industry support for the largest trade fayre in the UK.
          </p>
          <Link
            href="/sponsors"
            className="mt-4 inline-block border-b-2 border-gold text-navy hover:text-gold"
          >
            Our Sponsors →
          </Link>
        </div>
      </RevealOnScroll>
    </>
  );
}
