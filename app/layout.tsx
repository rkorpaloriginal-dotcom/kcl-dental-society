import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kingsdentalsociety.com'),
  title: {
    default: "KCL Dental Society — King's College London Dental Society",
    template: '%s | KCL Dental Society',
  },
  description:
    "King's College London Dental Society — Community, Careers, Culture. Events, committee, and sponsors for KCL dental students.",
  openGraph: {
    title: "KCL Dental Society",
    description:
      "King's College London Dental Society — Community, Careers, Culture.",
    images: ['/images/og-image.jpg'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-body text-body">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
