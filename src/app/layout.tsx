import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://classicwrench.com'),
  title: {
    default: 'ClassicWrench — Find the Best Classic Car Mechanics in America',
    template: '%s | ClassicWrench',
  },
  description:
    'The definitive directory of classic car mechanics and restoration shops in the United States. Find, compare, and connect with expert classic car specialists.',
  keywords: [
    'classic car mechanics', 'vintage car restoration', 'classic car shops', 'auto restoration',
    'classic car repair', 'vintage car service', 'classic car directory', 'restoration shops',
    'classic car specialists', 'vintage auto repair', 'classic car experts', 'car restoration near me',
    'classic Porsche mechanics', 'Ferrari restoration', 'muscle car restoration', 'British car repair',
    'classic car parts', 'vintage car maintenance', 'classic car upholstery', 'engine rebuild',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ClassicWrench — Find the Best Classic Car Mechanics in America',
    description:
      'Discover expert classic car mechanics and restoration shops across America. Vetted specialists for every make and era.',
    siteName: 'ClassicWrench',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ClassicWrench - Classic Car Mechanics Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClassicWrench — Find the Best Classic Car Mechanics in America',
    description:
      'The definitive directory of classic car mechanics and restoration shops in the United States.',
    images: ['/og-image.jpg'],
  },
};

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#faf7f2]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#c41e3a]">
          <span className="text-2xl">🔧</span>
          <span className="font-display">ClassicWrench</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/mechanics"
            className="text-sm font-medium text-slate-600 transition hover:text-[#c41e3a]"
          >
            Browse
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-600 transition hover:text-[#c41e3a]"
          >
            Blog
          </Link>
          <Link
            href="/states/CA"
            className="hidden text-sm font-medium text-slate-600 transition hover:text-[#c41e3a] sm:block"
          >
            States
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-[#c41e3a]"
          >
            About
          </Link>
          <Link
            href="/mechanics"
            className="rounded-lg bg-[#c41e3a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a01729]"
          >
            Find Mechanics
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[#c41e3a]">
              <span className="text-xl">🔧</span>
              <span className="font-display">ClassicWrench</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              Find the best classic car mechanics in America. Vetted specialists for every make and era.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link href="/mechanics" className="hover:text-[#c41e3a]">All Mechanics</Link></li>
              <li><Link href="/states/CA" className="hover:text-[#c41e3a]">California</Link></li>
              <li><Link href="/states/TX" className="hover:text-[#c41e3a]">Texas</Link></li>
              <li><Link href="/states/FL" className="hover:text-[#c41e3a]">Florida</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Specialties</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link href="/mechanics?specialty=Porsche" className="hover:text-[#c41e3a]">Porsche Specialists</Link></li>
              <li><Link href="/mechanics?specialty=Ferrari" className="hover:text-[#c41e3a]">Ferrari Restoration</Link></li>
              <li><Link href="/mechanics?specialty=Muscle" className="hover:text-[#c41e3a]">Muscle Cars</Link></li>
              <li><Link href="/mechanics?specialty=British" className="hover:text-[#c41e3a]">British Classics</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-sm text-slate-400">
          Built with 🔧 by ClassicWrench &middot; &copy; {new Date().getFullYear()} ClassicWrench. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}