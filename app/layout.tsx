import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/ui/Toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hilink-travel.vercel.app'),
  title: { default: 'Hilink — Camping & hiking adventures with offline maps', template: '%s · Hilink' },
  description: 'Discover camps around the world, plan trips with friends and never get lost again with offline maps and AR trail guidance.',
  openGraph: { type: 'website', siteName: 'Hilink', images: ['/og.jpg'] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = { themeColor: '#30AF5B' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ToastProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-green-50 focus:px-5 focus:py-3 focus:text-white">
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="relative overflow-x-clip">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
