import type { MetadataRoute } from 'next';
import { CAMPS } from '@/constants/camps';
import { GUIDES } from '@/constants/content';

export const dynamic = 'force-static';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hilink-travel.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', 'how-it-works', 'camps', 'services', 'pricing', 'guides', 'community', 'app', 'about', 'careers', 'press', 'environment', 'contact', 'privacy', 'terms'];
  return [
    ...pages.map((p) => ({ url: `${BASE}/${p}${p ? '/' : ''}` })),
    ...CAMPS.map((c) => ({ url: `${BASE}/camps/${c.slug}/` })),
    ...GUIDES.map((g) => ({ url: `${BASE}/guides/${g.slug}/` })),
  ];
}
