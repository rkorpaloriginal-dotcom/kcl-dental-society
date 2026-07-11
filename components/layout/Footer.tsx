'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { TimelineBackground } from '@/components/timeline/TimelineBackground';
import { SPONSORS } from '@/data/sponsors';

const NAV_LINKS = [
  { href: '/events', label: 'Events' },
  { href: '/committee', label: 'Committee' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/join', label: 'Join' },
];

export function Footer() {
  const reducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.12 },
    },
  };
  const item = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <footer className="relative overflow-hidden bg-[#08121D] px-6 py-24 text-cream md:px-12">
      <TimelineBackground />
      <motion.div
        className="relative mx-auto flex max-w-4xl flex-col items-center gap-10 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.p variants={item} className="font-display text-5xl md:text-7xl">
          KCL Dental Society
        </motion.p>

        <motion.p variants={item} className="max-w-md text-base text-cream/70">
          Connecting King&apos;s dental students through education, community and opportunity.
        </motion.p>

        <motion.ul
          variants={item}
          className="flex flex-wrap justify-center gap-8 text-sm font-semibold uppercase tracking-[0.15em]"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-cream transition-colors duration-300 ease-expo-out hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-8">
          {SPONSORS.map((sponsor) =>
            sponsor.logo ? (
              <img
                key={sponsor.name}
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-6 w-auto max-w-[80px] object-contain opacity-60 grayscale transition-opacity duration-300 ease-expo-out hover:opacity-100"
              />
            ) : null
          )}
        </motion.div>

        <motion.a
          variants={item}
          href="mailto:kingsdentalsociety@gmail.com"
          className="text-sm text-cream/80 transition-colors duration-300 ease-expo-out hover:text-gold"
        >
          kingsdentalsociety@gmail.com
        </motion.a>

        <motion.div variants={item}>
          <Link
            href="/join"
            className="inline-block rounded-full bg-gold px-8 py-4 text-base font-medium text-navy transition-colors duration-300 ease-expo-out hover:bg-cream"
          >
            Join the Next Generation of King&apos;s Dentists
          </Link>
        </motion.div>

        <motion.div variants={item} className="text-xs text-cream/50">
          <p>
            © {new Date().getFullYear()} King&apos;s College London Dental Society. All rights
            reserved.
          </p>
          <p className="mt-1">Designed for King&apos;s College London students.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
