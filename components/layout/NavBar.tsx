'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/committee', label: 'Committee' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/join', label: 'Join' },
];

export function NavBar() {
  return (
    <header className="bg-navy text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 font-display text-lg tracking-wide">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt=""
            className="h-8 w-8 object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          KCL Dental Society
        </Link>
        <ul className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white hover:text-gold">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
