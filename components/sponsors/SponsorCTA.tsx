import { RevealOnScroll } from '@/components/RevealOnScroll';

export function SponsorCTA() {
  return (
    <RevealOnScroll id="become-a-sponsor" className="border-t border-navy/15 bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-navy/50">
          Sponsorship enquiries
        </p>
        <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl text-navy md:text-5xl">
          Want in front of King&apos;s next generation of dentists?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-body">
          We're happy to discuss any form of sponsorship — financial, product, or academic
          opportunity. Most conversations start with a short email.
        </p>
        <a
          href="mailto:kingsdentalsociety@gmail.com?subject=Sponsorship%20Enquiry"
          className="mt-8 inline-block rounded-full bg-navy px-8 py-3 text-cream transition-colors duration-300 ease-expo-out hover:bg-gold"
        >
          Become a Sponsor
        </a>
      </div>
    </RevealOnScroll>
  );
}
