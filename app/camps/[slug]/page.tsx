import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Clock, Mountain, Route, Star, TrendingUp } from 'lucide-react';
import { CAMPS, getCamp } from '@/constants/camps';
import { PEOPLE_URL } from '@/constants';
import BookingWidget from '@/components/BookingWidget';
import PackingChecklist from '@/components/PackingChecklist';
import Weather from '@/components/Weather';
import CampMedia from '@/components/ui/CampMedia';
import CampCard from '@/components/ui/CampCard';
import FavoriteButton from '@/components/ui/FavoriteButton';
import Reveal from '@/components/ui/Reveal';
import Reviews from '@/components/Reviews';

export const dynamicParams = false;

export function generateStaticParams() {
  return CAMPS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const camp = getCamp((await params).slug);
  return camp ? { title: camp.name, description: camp.description } : {};
}

export default async function CampPage({ params }: { params: Promise<{ slug: string }> }) {
  const camp = getCamp((await params).slug);
  if (!camp) notFound();
  const similar = CAMPS.filter((c) => c.slug !== camp.slug && (c.terrain === camp.terrain || c.difficulty === camp.difficulty)).slice(0, 3);
  const seed = CAMPS.indexOf(camp);

  const stats = [
    { icon: Route, label: 'Distance', value: camp.distance },
    { icon: Mountain, label: 'Elevation', value: camp.elevation },
    { icon: Clock, label: 'Duration', value: camp.duration },
    { icon: TrendingUp, label: 'Difficulty', value: camp.difficulty },
  ];

  return (
    <>
      <section className="max-container padding-container pt-6">
        <nav aria-label="Breadcrumb" className="regular-14 mb-6 flex flex-wrap gap-2 text-gray-30">
          <Link href="/" className="hover:text-green-50">Home</Link> / <Link href="/camps" className="hover:text-green-50">Camps</Link> / <span className="text-gray-90">{camp.name}</span>
        </nav>
        <div className="relative">
          <CampMedia camp={camp} priority sizes="100vw" className="h-[320px] rounded-5xl md:h-[480px]" />
          <div className="absolute inset-0 rounded-5xl bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <FavoriteButton slug={camp.slug} name={camp.name} className="absolute right-6 top-6" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-6 text-white md:p-12">
            <span className="w-fit rounded-full bg-white/20 px-4 py-1.5 text-[14px] font-bold backdrop-blur">{camp.terrain} · {camp.country}</span>
            <h1 className="bold-40 md:bold-64">{camp.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[14px] md:text-[16px]">
              <span className="flex items-center gap-1 font-bold">
                <Star className="h-4 w-4 fill-yellow-50 text-yellow-50" /> {camp.rating} <span className="font-normal opacity-80">({camp.reviews.toLocaleString('en')} reviews)</span>
              </span>
              <span className="opacity-90">{camp.location}</span>
              <span className="flex items-center gap-2">
                <span className="flex -space-x-3">
                  {PEOPLE_URL.map((u) => (
                    <Image key={u} src={u} alt="" width={28} height={28} className="rounded-full ring-2 ring-white" />
                  ))}
                </span>
                {camp.joined}+ joined this month
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-container padding-container grid gap-10 py-12 lg:grid-cols-[1fr_380px] lg:py-16">
        <div className="flex flex-col gap-10">
          <Reveal className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="card flex flex-col gap-2 p-5">
                <Icon className="h-6 w-6 text-green-50" />
                <span className="regular-14 text-gray-30">{label}</span>
                <span className="bold-18">{value}</span>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <h2 className="bold-32 mb-4">About this camp</h2>
            <p className="regular-18 leading-relaxed text-gray-50">{camp.description}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {camp.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 font-semibold">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-green-50 text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="bold-24 mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {camp.amenities.map((a) => (
                <span key={a} className="chip">{a}</span>
              ))}
            </div>
          </Reveal>

          <Reveal className="grid gap-6 xl:grid-cols-2">
            <Weather seed={seed} elevation={camp.elevation} />
            <div className="card relative overflow-hidden p-6 lg:p-8">
              <h3 className="bold-20 mb-2">Offline trail map</h3>
              <p className="regular-14 text-gray-30">Download before you go — works with GPS only.</p>
              <Image src="/hero.webp" alt="" width={420} height={340} className="mx-auto mt-2 h-44 w-auto object-contain" />
              <Link href="/app" className="mt-2 inline-flex font-bold text-green-50 hover:underline">Open in Hilink app →</Link>
            </div>
          </Reveal>

          <Reveal>
            <PackingChecklist slug={camp.slug} />
          </Reveal>

          <Reveal>
            <Reviews rating={camp.rating} total={camp.reviews} seed={seed} />
          </Reveal>
        </div>

        <aside>
          <BookingWidget camp={camp} />
        </aside>
      </section>

      {similar.length > 0 && (
        <section className="max-container padding-container pb-24">
          <div className="flexBetween mb-8">
            <h2 className="bold-32">You might also like</h2>
            <Link href="/camps" className="font-bold text-green-50 hover:underline">All camps →</Link>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((c) => (
              <li key={c.slug}><CampCard camp={c} /></li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
