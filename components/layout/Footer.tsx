import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-2xl">KCL Dental Society</p>
          <a
            href="mailto:kingsdentalsociety@gmail.com"
            className="mt-2 inline-block text-sm text-cream/80 transition-colors duration-300 ease-expo-out hover:text-gold"
          >
            kingsdentalsociety@gmail.com
          </a>
        </div>
        <ul className="flex gap-8 text-sm font-semibold uppercase tracking-[0.15em]">
          <li>
            <Link href="/events" className="text-cream hover:text-gold">
              Events
            </Link>
          </li>
          <li>
            <Link href="/committee" className="text-cream hover:text-gold">
              Committee
            </Link>
          </li>
          <li>
            <Link href="/sponsors" className="text-cream hover:text-gold">
              Sponsors
            </Link>
          </li>
        </ul>
        <p className="text-sm text-cream/60">
          © {new Date().getFullYear()} King&apos;s College London Dental Society. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
