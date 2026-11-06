# Wildway

**Guided hiking and wild-camping trips — a concept project by Yaroslav Tsarenko.**

Wildway is a fictional product: a platform for finding a route or camp, booking a small-group guided trip, renting gear and reading trail guides. It is a front-end only concept; there is no backend, and every booking, sign-up and form submission is simulated in the browser.

Routes and regions are real places, described as accurately as possible (Laugavegur, Sarek, Lofoten, Saxon Switzerland, Wadi Rum, Fitz Roy, Boundary Waters, Hoh Rain Forest, Coyote Gulch, West Coast Trail). **Prices, departures, availability, ratings, reviews, people and publications are demo data.**

## Design

Art direction: *trail journal* — an editorial outdoor-magazine feel rather than an app landing page.

- **Palette:** warm sand `#efe6d8` background, deep pine `#1f3d2b` as the brand colour, sunset orange `#e0632e` used sparingly as an accent, ink `#1b1a17` for text. Text colours are checked for WCAG AA on their backgrounds.
- **Type:** Fraunces (display, variable optical sizes) and Inter (UI and body), loaded with `next/font`. One type scale (`t-display`, `t-h1`…`t-h4`, `t-lead`, `t-label`) defined in `app/globals.css`.
- **Imagery:** full-bleed landscape photography with strong crops; no illustrations or device mockups.
- **Own SVG work:** the logo mark, procedurally drawn topographic contours (`components/ui/Topo.tsx`, `lib/geo.ts`), a schematic route map with camps, scale bar and north arrow (`components/ui/RouteMap.tsx`), and an interactive elevation profile (`components/ui/ElevationProfile.tsx`).
- **Map-like UI pieces** built in HTML/CSS: route card, weather strip, booking widget, stage lists, difficulty grade meter.
- Icons from `lucide-react`. No emoji, no gradient text, no glassmorphism.

## Pages and features

| Route | What is there |
| --- | --- |
| `/` | Full-bleed hero with route search (keyboard-navigable suggestions), route-of-the-month card with elevation profile, departures, interactive route notes (map, stages, profile, weather), process, guide quote, stats, journal, community, planner CTA |
| `/camps` | Trip search with terrain, grade and price filters, sorting, saved trips |
| `/camps/[slug]` | 10 trip pages: stats, route map with camps, hoverable elevation profile, stages, inclusions, forecast, packing list saved to `localStorage`, reviews, **booking calculator** with request confirmation |
| `/how-it-works` | Process, grades, **three-question trip planner**, FAQ |
| `/services` | Services and **gear rental calculator** |
| `/pricing` | Membership plans with **monthly / yearly toggle** and comparison table |
| `/guides`, `/guides/[slug]` | Journal with category filter; 6 articles with **reading progress** bar |
| `/community` | Trip reports with group filter, likes and a post composer |
| `/app` | Interactive field-app demo (offline map, elevation, forecast, group) |
| `/environment` | Journey **carbon calculator** |
| `/about`, `/careers`, `/press`, `/contact` | Company pages, job board with apply modal, contact form with validation |
| `/login`, `/signup`, `/favorites` | Demo auth forms with validation and password strength, saved trips |
| `/privacy`, `/terms`, 404 | Legal pages and custom not-found page |

## Tech

Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS 3, Motion, lucide-react.

```bash
npm install
npm run dev        # http://localhost:3200
npm run build      # static export to ./out
npm run lint
npm run typecheck
```

Content lives in `constants/` (`camps.ts` for trips, `content.ts` for journal, plans, gear, jobs and posts). Set `NEXT_PUBLIC_SITE_URL` for correct sitemap and Open Graph URLs.

## Photo credits

All photographs are from [Unsplash](https://unsplash.com) and used under the [Unsplash License](https://unsplash.com/license). They were resized and converted to WebP for this project.

| File | Used for | Photographer | Source |
| --- | --- | --- | --- |
| `public/photos/laugavegur.webp` | Laugavegur trip, journal, community | [Krisztián Korhetz](https://unsplash.com/@kkorhetz) | [Unsplash](https://unsplash.com/photos/a-group-of-people-hiking-on-a-mountain-gDG_FkVvq98) |
| `public/photos/kvalvika.webp` | Kvalvika Beach trip, community | [Bernhard](https://unsplash.com/@bernhardbar) | [Unsplash](https://unsplash.com/photos/waves-crash-on-a-sandy-beach-with-mountains-sMXnqV7pgHs) |
| `public/photos/sarek.webp` | Sarek Traverse trip | [Ville Palmu](https://unsplash.com/@villepalmu) | [Unsplash](https://unsplash.com/photos/a-man-standing-on-top-of-a-lush-green-hillside-63py8RP4UoE) |
| `public/photos/malerweg.webp` | Malerweg trip | [Wolfgang Weiser](https://unsplash.com/@hamburgmeinefreundin) | [Unsplash](https://unsplash.com/photos/jagged-rock-formations-rise-above-a-dense-forest-1lxoXQEyqNE) |
| `public/photos/wadi-rum.webp` | Wadi Rum trip, desert article | [Daniele Colucci](https://unsplash.com/@daniele71043) | [Unsplash](https://unsplash.com/photos/man-in-black-shirt-sitting-on-brown-sand-during-daytime-Smeer5L0tXM) |
| `public/photos/fitz-roy.webp` | Fitz Roy Circuit trip, community | [Arto Marttinen](https://unsplash.com/@wandervisions) | [Unsplash](https://unsplash.com/photos/snow-covered-mountain-beside-body-of-water-6Wt0kG2zK4A) |
| `public/photos/boundary-waters.webp` | Boundary Waters trip, lake article, community | [Josh Hild](https://unsplash.com/@joshhild) | [Unsplash](https://unsplash.com/photos/yellow-canoe-on-body-of-water-LuCWEh0nb5s) |
| `public/photos/hoh-rain-forest.webp` | Hoh River trip, community | [Griffin Quinn](https://unsplash.com/@griffinquinn) | [Unsplash](https://unsplash.com/photos/a-forest-with-trees-A4W3EwylWZo) |
| `public/photos/coyote-gulch.webp` | Coyote Gulch trip | [Alex Moliski](https://unsplash.com/@alexmoliski) | [Unsplash](https://unsplash.com/photos/a-view-of-a-canyon-from-a-high-point-of-view-Nf_NvnGAv4o) |
| `public/photos/west-coast-trail.webp` | West Coast Trail trip, community | [Logan Kuzyk](https://unsplash.com/@logankuzyk) | [Unsplash](https://unsplash.com/photos/a-couple-of-people-walking-along-a-beach-next-to-a-forest-H4E3JCH2-V4) |
| `public/photos/hero.webp` | Home hero, Open Graph image | [Florian Schindler](https://unsplash.com/@flo_raw) | [Unsplash](https://unsplash.com/photos/yellow-camping-tent-on-a-mountain-with-a-cloudy-sky-Q-TObbvZ9Dw) |
| `public/photos/auth.webp` | Log in and sign up | [Florian Schindler](https://unsplash.com/@flo_raw) | [Unsplash](https://unsplash.com/photos/tent-and-person-on-a-grassy-hill-under-cloudy-sky-eDyDXzi4MPw) |
| `public/photos/about.webp` | Home guide quote, About | [Anh Phan](https://unsplash.com/@_pnmanh) | [Unsplash](https://unsplash.com/photos/hikers-on-a-trail-with-misty-mountains-in-the-background-GEMAk0kmcmM) |
| `public/photos/night-tent.webp` | Tent article | [Master Unknown](https://unsplash.com/@exp00) | [Unsplash](https://unsplash.com/photos/a-tent-on-a-beach-at-night-l_N5amJKaac) |
| `public/photos/map-compass.webp` | Navigation article, Gear page | [Hendrik Morkel](https://unsplash.com/@hendrikmorkel) | [Unsplash](https://unsplash.com/photos/clear-and-white-compass-with-ruler-on-map-illustration--eAtOTvnkQI) |
| `public/photos/stove.webp` | Gear page header | [Sage Friedman](https://unsplash.com/@sagefriedman) | [Unsplash](https://unsplash.com/photos/selective-focus-of-blue-and-gray-camping-gas-burner-and-cooking-pan-on-cliff-N561DZ3NfVM) |
| `public/photos/gear-flatlay.webp` | Packing article | [Alexander Andrews](https://unsplash.com/@alex_andrews) | [Unsplash](https://unsplash.com/photos/photo-of-assorted-cameras-and-bags-X62F1WQhuLI) |
| `public/photos/pack-summit.webp` | Leave No Trace article, Environment | [Yaroslav Konyk](https://unsplash.com/@konyk_y) | [Unsplash](https://unsplash.com/photos/black-and-gray-hiking-backpack-on-green-grass-field-during-daytime-TS4eBHeIIq8) |

The logo, favicon, topographic patterns, route maps and charts are original SVG work for this project. The Open Graph image (`public/og.jpg`) is composed from the hero photograph by Florian Schindler.

## Note

Wildway is a portfolio concept. It is not a real company, does not sell trips and is not affiliated with any park, guide association or brand visible in the photographs.
