import Link from 'next/link';
import { VideoHero } from '@/components/VideoHero';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function Home() {
  return (
    <>
      <VideoHero />

      <RevealOnScroll className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="font-display text-3xl text-navy">More than a society</h2>
        <p className="mt-4 text-lg">
          KCL Dental Society is a community built to make your time at dental school
          unforgettable — creating lasting connections among students from diverse backgrounds
          and delivering the best London has to offer academically, socially, and professionally.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/join"
            className="rounded-full bg-navy px-6 py-3 text-white hover:bg-gold"
          >
            Join
          </Link>
          <a
            href="https://go.link2app.co/QlZx6wiDP0b"
            className="rounded-full border border-navy px-6 py-3 text-navy hover:border-gold hover:text-gold"
          >
            Society App
          </a>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
        <div className="rounded-lg border border-navy/10 p-6 text-center">
          <h3 className="font-display text-xl text-navy">What We Run</h3>
          <p className="mt-2 text-sm">Boat parties, formals, workshops, and more.</p>
          <Link href="/events" className="mt-4 inline-block text-navy hover:text-gold">
            Explore Events →
          </Link>
        </div>
        <div className="rounded-lg border border-navy/10 p-6 text-center">
          <h3 className="font-display text-xl text-navy">Your Committee</h3>
          <p className="mt-2 text-sm">The people making it all happen.</p>
          <Link href="/committee" className="mt-4 inline-block text-navy hover:text-gold">
            Meet the Committee →
          </Link>
        </div>
        <div className="rounded-lg border border-navy/10 p-6 text-center">
          <h3 className="font-display text-xl text-navy">Our Partners</h3>
          <p className="mt-2 text-sm">Industry support for the largest trade fayre in the UK.</p>
          <Link href="/sponsors" className="mt-4 inline-block text-navy hover:text-gold">
            Our Sponsors →
          </Link>
        </div>
      </RevealOnScroll>
    </>
  );
}
