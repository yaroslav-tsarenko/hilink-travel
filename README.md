# Hilink — camping & hiking travel site

Multi-page marketing site for the Hilink camping app, built with **Next.js 16 (App Router, static export)**, **React 19**, **Tailwind CSS 3** and **Motion** for animations. All interactive features are front-end mockups — no backend required.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero with live camp search, rotating location card, camp carousel, live route widget, stats, features, popular camps, community stories |
| `/how-it-works` | 4-step explainer, **interactive trip planner** (3 questions → matched camps), FAQ |
| `/camps` | Catalog with search, terrain / difficulty filters, price slider, sorting, favourites |
| `/camps/[slug]` | 10 camp pages: **booking widget** with price calculator and confirmation, weather, packing checklist (saved locally), reviews |
| `/services` | Services + **gear rental calculator** |
| `/pricing` | Monthly / yearly toggle, plan comparison table, FAQ |
| `/guides`, `/guides/[slug]` | Trail guides with category filter, 6 articles with reading progress bar |
| `/community` | Feed with group filter, likes and a post composer |
| `/app` | **Interactive phone mockup** showing app screens |
| `/environment` | **CO₂ trip calculator** |
| `/about`, `/careers`, `/press`, `/contact` | Company pages, job board with apply modal, contact form with validation |
| `/login`, `/signup`, `/favorites` | Mock auth with validation & password strength, saved camps |
| `/privacy`, `/terms`, 404 | Legal pages and custom not-found page |

## Scripts

```bash
npm install
npm run dev        # http://localhost:3200
npm run build      # static export to ./out
npm run lint
npm run typecheck
```

`npm run build` produces a fully static site in `out/` that can be hosted anywhere (Vercel, Netlify, GitHub Pages, any static host).

## Content

All content lives in `constants/`:

- `constants/camps.ts` — camps (terrain, difficulty, price, amenities…)
- `constants/content.ts` — guides, plans, FAQ, services, gear, jobs, team, press, community posts
- `constants/index.ts` — navigation, features, footer links

Camps without a photo use the procedural `Landscape` SVG illustration (`components/ui/Landscape.tsx`), so new camps look good without new images.

Set `NEXT_PUBLIC_SITE_URL` to your domain for correct sitemap and Open Graph URLs.
