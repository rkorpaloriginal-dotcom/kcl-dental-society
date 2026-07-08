import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-lg">KCL Dental Society</p>
          <a href="mailto:kingsdentalsociety@gmail.com" className="text-white hover:text-gold">
            kingsdentalsociety@gmail.com
          </a>
        </div>
        <ul className="flex gap-6">
          <li>
            <Link href="/events" className="text-white hover:text-gold">
              Events
            </Link>
          </li>
          <li>
            <Link href="/committee" className="text-white hover:text-gold">
              Committee
            </Link>
          </li>
          <li>
            <Link href="/sponsors" className="text-white hover:text-gold">
              Sponsors
            </Link>
          </li>
        </ul>
        <p className="text-sm text-white/70">
          © {new Date().getFullYear()} King&apos;s College London Dental Society. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
