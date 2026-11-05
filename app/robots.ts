import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hilink-travel.vercel.app';
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/login/', '/signup/', '/favorites/'] }], sitemap: `${base}/sitemap.xml` };
}
