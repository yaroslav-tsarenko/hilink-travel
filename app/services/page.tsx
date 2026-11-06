import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import GearCalculator from '@/components/GearCalculator';
import PlanCta from '@/components/PlanCta';
import { SectionHead } from '@/components/ui/Bits';
import { SERVICES } from '@/constants/content';

export const metadata: Metadata = {
  title: 'Gear and services',
  description: 'Guided trips, permits, gear rental, offline route packs, skills courses and private departures.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Gear and services"
        title="Everything except the walking"
        text="Permits, transfers, route packs and a full kit waiting at the trailhead, so the only thing you prepare is yourself."
        crumbs={[{ label: 'Gear and services' }]}
        photo={{ src: '/photos/stove.webp', alt: 'A small gas stove and cooking pot on a rock above a valley' }}
        seed={9}
      />

      <section className="wrap section">
        <ul className="grid gap-x-10 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.id} id={s.id} className="scroll-mt-28 border-t border-ink/20">
              <Reveal delay={(i % 3) * 0.05} className="h-full pb-12 pt-6">
                <span className="t-num text-[0.8125rem] font-semibold text-ember-ink">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="t-h3 mt-3">{s.title}</h2>
                <p className="mt-3 max-w-[40ch] text-ink-soft">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="gear" className="scroll-mt-24 border-y border-ink/10 bg-sand-100">
        <div className="wrap section">
          <SectionHead
            label="Gear rental"
            title="Build a kit, see the price"
            text="Everything is cleaned and checked after every trip, and repaired rather than replaced. Pick up at the start point, leave it at the end."
            href="/pricing"
            linkLabel="Members get free rental days"
          />
          <div className="mt-12">
            <GearCalculator />
          </div>
        </div>
      </section>

      <section className="wrap section grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:col-span-6">
          <Image src="/photos/map-compass.webp" alt="A baseplate compass on a topographic map" fill sizes="(max-width: 1024px) 92vw, 640px" className="object-cover" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="t-label">Skills courses</p>
          <h2 className="t-h2 mt-4">Navigation without a screen</h2>
          <p className="t-lead mt-5">One-day courses on real terrain: map and compass in fog, crossing rivers safely, and pitching in strong wind. Run before most Hard departures.</p>
          <Link href="/guides/map-and-compass-basics" className="link mt-6">
            Read the ten-minute refresher
          </Link>
        </div>
      </section>

      <PlanCta />
    </>
  );
}
