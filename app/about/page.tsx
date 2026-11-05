import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import Stats from '@/components/Stats';
import { TEAM } from '@/constants/content';

export const metadata: Metadata = { title: 'About Hilink', description: 'Hilink started with climbers who got lost once too often. Today we help millions find their way.' };

const TIMELINE = [
  { year: '2019', text: 'Two climbers get lost on Mount Arjuno and sketch the first offline map on a napkin.' },
  { year: '2020', text: 'Hilink launches in Indonesia with 40 partner camps.' },
  { year: '2022', text: 'AR trail guidance ships — the first that works without internet.' },
  { year: '2024', text: '1,000 camps in 60 countries and a community of 150k climbers.' },
  { year: '2025', text: '2 million offline maps downloaded and a tree planted for every trip.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Hilink" title="We got lost so you don't have to" text="Hilink is built by climbers, cartographers and engineers who believe everyone deserves to feel safe in the wild." crumbs={[{ label: 'About' }]} />
      <section className="max-container padding-container grid items-center gap-12 pb-24 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-5xl">
          <Image src="/img-1.webp" alt="View from a tent in the forest" fill sizes="(max-width: 1024px) 92vw, 50vw" className="object-cover" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="bold-40">Our mission</h2>
          <p className="regular-18 mt-6 text-gray-50">Starting from the anxiety of climbers visiting a new location, we set out to make getting lost a thing of the past. Offline maps, AR navigation and a community that shares every trail.</p>
          <p className="regular-18 mt-4 text-gray-50">Today Hilink helps adventurers in 64 countries plan, navigate and come home with stories instead of worries.</p>
          <Link href="/careers" className="mt-8 inline-block font-bold text-green-50 hover:underline">We are hiring →</Link>
        </Reveal>
      </section>
      <Stats />
      <section className="max-container padding-container py-24">
        <h2 className="bold-40 mb-12">Our story</h2>
        <ol className="relative border-l-2 border-green-20 pl-8">
          {TIMELINE.map((t, i) => (
            <li key={t.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-green-50 shadow" />
              <Reveal delay={i * 0.05}>
                <p className="bold-24 text-green-50">{t.year}</p>
                <p className="regular-18 mt-2 max-w-2xl text-gray-50">{t.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
      <section className="max-container padding-container pb-24">
        <h2 className="bold-40 mb-10">The team</h2>
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={i * 0.06} className="card group flex flex-col items-center gap-3 p-8 text-center transition hover:-translate-y-1 hover:shadow-xl">
                <Image src={m.avatar} alt="" width={88} height={88} className="rounded-full ring-4 ring-green-10 transition group-hover:ring-green-50" />
                <p className="bold-18">{m.name}</p>
                <p className="regular-14 text-gray-30">{m.role}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
