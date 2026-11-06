import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { CAMPS, getCamp } from '@/constants/camps';
import BookingWidget from '@/components/BookingWidget';
import PackingChecklist from '@/components/PackingChecklist';
import Reviews from '@/components/Reviews';
import Weather from '@/components/Weather';
import CampCard from '@/components/ui/CampCard';
import ElevationProfile from '@/components/ui/ElevationProfile';
import FavoriteButton from '@/components/ui/FavoriteButton';
import RouteMap from '@/components/ui/RouteMap';
import Reveal from '@/components/ui/Reveal';
import { Avatar, Grade, Stat } from '@/components/ui/Bits';
import { hashString } from '@/lib/geo';

export const dynamicParams = false;

export function generateStaticParams() {
  return CAMPS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const camp = getCamp((await params).slug);
  return camp ? { title: `${camp.name}, ${camp.country}`, description: camp.summary, openGraph: { images: [camp.photo] } } : {};
}

export default async function CampPage({ params }: { params: Promise<{ slug: string }> }) {
  const camp = getCamp((await params).slug);
  if (!camp) notFound();
  const similar = CAMPS.filter((c) => c.slug !== camp.slug && (c.terrain === camp.terrain || c.difficulty === camp.difficulty)).slice(0, 3);
  const seed = CAMPS.indexOf(camp);
  const [start, end] = camp.route.split(' to ');

  return (
    <>
      <section className="wrap pt-8 lg:pt-10">
        <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ink-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink hover:underline">
                Wildway
              </Link>
            </li>
            <li aria-hidden className="text-ink/30">/</li>
            <li>
              <Link href="/camps" className="hover:text-ink hover:underline">
                Trips
              </Link>
            </li>
            <li aria-hidden className="text-ink/30">/</li>
            <li aria-current="page" className="text-ink">
              {camp.name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="t-label">
              {camp.terrain} · {camp.region}, {camp.country}
            </p>
            <h1 className="t-display mt-5">{camp.name}</h1>
            <p className="t-lead mt-5 max-w-[56ch]">{camp.summary}</p>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:items-end">
            <p className="t-num text-[0.875rem] text-ink-soft lg:text-right">
              {camp.coords}
              <br />
              Season: {camp.season}
            </p>
            <FavoriteButton slug={camp.slug} name={camp.name} variant="inline" />
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-ink/15 py-6 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Duration" value={`${camp.days} days`} />
          <Stat label="Distance" value={`${camp.km} km`} />
          <Stat label="Ascent" value={`${camp.ascent.toLocaleString('en-GB')} m`} />
          <Stat label="Grade" value={<span className="text-[1rem]"><Grade level={camp.difficulty} /></span>} />
          <Stat label="Group" value={`max ${camp.groupMax}`} />
          <Stat label="Rating" value={`${camp.rating} / 5`} />
        </dl>
      </section>

      <div className="wrap mt-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card sm:aspect-[16/8] lg:aspect-[21/8]">
          <Image src={camp.photo} alt={camp.photoAlt} fill priority sizes="(max-width: 1360px) 100vw, 1360px" className="object-cover" />
        </div>
      </div>

      <section className="wrap grid gap-14 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="flex flex-col gap-16 lg:col-span-7 xl:col-span-8">
          <Reveal>
            <h2 className="t-h3">The trip</h2>
            <p className="mt-4 max-w-[66ch] text-[1.0625rem] leading-[1.7]">{camp.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <Avatar name={camp.guide} size={44} />
              <p className="text-[0.9375rem]">
                <span className="block font-semibold">Led by {camp.guide}</span>
                <span className="text-ink-soft">Certified mountain leader, Wildway guide team</span>
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="t-h3">Route and stages</h2>
            <div className="mt-6 overflow-hidden rounded-card border border-line">
              <RouteMap slug={camp.slug} stages={camp.stages.map((s) => s.km)} labels={{ start: start ?? 'Start', end: end ?? 'Finish' }} className="block h-auto w-full" />
              <div className="border-t border-line bg-sand-50 p-5">
                <ElevationProfile profile={camp.profile} km={camp.km} />
              </div>
            </div>
            <ol className="mt-8 flex flex-col">
              {camp.stages.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3.5rem_1fr_auto] gap-3 border-t border-ink/15 py-4 last:border-b">
                  <span className="t-num pt-1 text-[0.8125rem] font-semibold text-ember-ink">Day {i + 1}</span>
                  <span>
                    <span className="block font-serif text-[1.25rem] leading-snug">{s.title}</span>
                    <span className="mt-1 block text-ink-soft">{s.note}</span>
                  </span>
                  <span className="t-num pt-1 text-[0.9375rem]">{s.km} km</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="t-h4">Included</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {camp.included.map((a) => (
                  <li key={a} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-pine" strokeWidth={2.5} aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="t-h4">Highlights</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {camp.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-[0.6rem] h-1.5 w-3 shrink-0 bg-ember" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="t-h3 mb-6">Conditions</h2>
            <Weather seed={hashString(camp.slug)} altitude={Math.max(...camp.profile)} base={camp.terrain === 'Desert' ? 30 : camp.terrain === 'Glacier' ? 14 : 18} />
          </Reveal>

          <Reveal>
            <PackingChecklist slug={camp.slug} />
          </Reveal>

          <Reveal>
            <Reviews rating={camp.rating} total={camp.reviews} seed={seed} />
          </Reveal>
        </div>

        <aside className="lg:col-span-5 xl:col-span-4" aria-label="Booking">
          <BookingWidget camp={camp} />
        </aside>
      </section>

      {similar.length > 0 && (
        <section className="border-t border-ink/10 bg-sand-50">
          <div className="wrap py-16 lg:py-20">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="t-h2">Similar routes</h2>
              <Link href="/camps" className="link">
                All trips <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((c) => (
                <li key={c.slug}>
                  <CampCard camp={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
