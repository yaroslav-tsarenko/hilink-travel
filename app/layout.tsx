import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/ui/Toast';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--font-fraunces', display: 'swap', axes: ['opsz', 'SOFT'], style: ['normal', 'italic'] });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wildway.example';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Wildway — Guided hiking and wild-camping trips', template: '%s · Wildway' },
  description: 'Small-group guided hikes and wild-camping trips in Iceland, Lapland, Patagonia, Utah and beyond. Permits handled, gear on loan. A concept project by Yaroslav Tsarenko.',
  applicationName: 'Wildway',
  authors: [{ name: 'Yaroslav Tsarenko' }],
  openGraph: { type: 'website', siteName: 'Wildway', images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Wildway — guided hiking and wild-camping trips' }] },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#1f3d2b' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <ToastProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[6px] focus:bg-pine focus:px-5 focus:py-3 focus:text-sand-50">
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
