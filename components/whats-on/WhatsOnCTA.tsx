import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export function WhatsOnCTA() {
  return (
    <RevealOnScroll className="border-t border-navy/15 bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-navy/50">Join us</p>
        <h2 className="mx-auto mt-6 max-w-xl font-display text-3xl text-navy md:text-5xl">
          Ready for your next event?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-body">
          Become a member and never miss another KCL Dental Society event.
        </p>
        <Link
          href="/join"
          className="mt-8 inline-block rounded-full bg-navy px-8 py-3 text-cream transition-colors duration-300 ease-expo-out hover:bg-gold"
        >
          Join the Society
        </Link>
      </div>
    </RevealOnScroll>
  );
}
