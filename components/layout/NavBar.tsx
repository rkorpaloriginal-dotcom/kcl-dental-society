'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/whats-on', label: "What's On" },
  { href: '/committee', label: 'Committee' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/join', label: 'Join' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gold/30 bg-navy text-cream">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 font-display text-2xl tracking-tight text-cream">
          <img
            src="/images/kcl-dental-logo.jpeg"
            alt="KCL Dental Society"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          KCL Dental Society
        </Link>
        <ul className="hidden gap-8 text-sm font-semibold uppercase tracking-[0.15em] md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="border-b-2 border-transparent pb-1 text-cream transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          aria-label="Toggle navigation menu"
          className="-mr-2 flex h-11 min-w-11 items-center justify-center px-2 text-sm font-semibold uppercase tracking-[0.15em] text-cream md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul id="mobile-nav-menu" className="flex flex-col gap-4 border-t border-cream/20 px-6 pb-6 pt-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-semibold uppercase tracking-[0.15em] text-cream hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
