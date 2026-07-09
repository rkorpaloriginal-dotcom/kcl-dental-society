import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Join',
  description: 'Join KCL Dental Society through the KCLSU portal and get the Society App.',
};

export default function JoinPage() {
  return (
    <RevealOnScroll className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-display text-5xl text-navy md:text-7xl">Join KCL Dental Society</h1>
      <p className="mt-6 max-w-md text-body">
        Membership gets you into every event on this site — boat parties, formals, workshops,
        talks, and more — plus career mentorship and a community that lasts well beyond
        university.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="https://www.kclsu.org/groups/activities/join/group/kcl_dental_society/"
          className="rounded-full bg-navy px-8 py-3 text-cream transition-colors duration-300 ease-expo-out hover:bg-gold"
        >
          Sign up via KCLSU
        </a>
        <a
          href="https://go.link2app.co/QlZx6wiDP0b"
          className="rounded-full border border-navy px-8 py-3 text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
        >
          Get the Society App
        </a>
      </div>
    </RevealOnScroll>
  );
}
