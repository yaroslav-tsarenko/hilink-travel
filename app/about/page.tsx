import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import Stats from '@/components/Stats';
import { Avatar, SectionHead } from '@/components/ui/Bits';
import { GUIDES_TEAM, TEAM } from '@/constants/content';

export const metadata: Metadata = { title: 'About', description: 'Wildway is a small company of guides and mapmakers running small-group hiking and wild-camping trips.' };

const TIMELINE = [
  { year: '2019', text: 'Two guides in Tromsø start running weekend camps in Lofoten for friends of friends.' },
  { year: '2021', text: 'Laugavegur and Sarek added, with local lead guides in Iceland and Lapland.' },
  { year: '2023', text: 'First route packs: printable maps and GPX for every trip.' },
  { year: '2025', text: 'Departures open in Utah, Washington, Minnesota and Patagonia.' },
  { year: '2026', text: 'Ten routes, forty-six guides and the field app.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader label="About" title="Guides first, company second" text="Wildway is run by people who still spend most summers on the routes. We keep groups small, camp only where it is allowed and walk out with everything we carried in." crumbs={[{ label: 'About' }]} seed={43} />

      <section className="wrap section grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-card lg:col-span-7">
          <Image src="/photos/about.webp" alt="Hikers on a ridge trail above cloud-filled valleys" fill sizes="(max-width: 1024px) 92vw, 760px" className="object-cover" />
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
          <h2 className="t-h2">Why small groups</h2>
          <p className="t-lead mt-5">A group of eight can share a pitch, cross a river together and change plan in five minutes. A group of twenty cannot.</p>
          <p className="mt-4 text-ink-soft">Every route is run by a lead guide who lives in the region, knows the river levels and the wind, and decides each morning whether the plan holds.</p>
          <Link href="/careers" className="link mt-6">
            Work with us <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      <section className="wrap pb-20 lg:pb-28">
        <Stats />
      </section>

      <section className="border-y border-ink/10 bg-sand-50">
        <div className="wrap section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-label">Timeline</p>
            <h2 className="t-h2 mt-4">How we got here</h2>
          </div>
          <ol className="lg:col-span-8">
            {TIMELINE.map((t) => (
              <li key={t.year} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-ink/15 py-5 last:border-b">
                <span className="t-num font-serif text-[1.5rem] text-pine">{t.year}</span>
                <p className="pt-1 text-[1.0625rem]">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section">
        <SectionHead label="People" title="Lead guides" />
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES_TEAM.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={i * 0.05} className="border-t-2 border-pine pt-5">
                <Avatar name={m.name} size={56} tone={i % 2 ? 'sand' : 'pine'} />
                <p className="mt-4 font-serif text-[1.375rem] leading-tight">{m.name}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-soft">{m.role}</p>
                <p className="t-num mt-3 text-[0.8125rem] text-ink-soft">
                  Based in {m.base} · {m.years} seasons
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <h3 className="t-label mt-16">Office</h3>
        <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <li key={m.name} className="flex items-center gap-3">
              <Avatar name={m.name} size={36} tone="sand" />
              <span>
                <span className="block font-medium">{m.name}</span>
                <span className="text-[0.8125rem] text-ink-soft">{m.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
