'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { getCamp } from '@/constants/camps';
import { hashString } from '@/lib/geo';
import ElevationProfile from './ui/ElevationProfile';
import RouteMap from './ui/RouteMap';
import { Grade } from './ui/Bits';

const ROUTES = ['laugavegur', 'sarek', 'west-coast-trail'].map((s) => getCamp(s)!);

export default function RouteSpotlight() {
  const [idx, setIdx] = useState(0);
  const [stage, setStage] = useState(0);
  const camp = ROUTES[idx];
  const total = camp.stages.reduce((s, x) => s + x.km, 0);
  const before = camp.stages.slice(0, stage).reduce((s, x) => s + x.km, 0);
  const progress = (before + camp.stages[stage].km) / total;

  return (
    <div>
      <div role="tablist" aria-label="Routes" className="flex gap-1 overflow-x-auto border-b border-sand-50/20 hide-scrollbar">
        {ROUTES.map((r, i) => (
          <button
            key={r.slug}
            role="tab"
            type="button"
            aria-selected={i === idx}
            onClick={() => {
              setIdx(i);
              setStage(0);
            }}
            className={`relative shrink-0 px-1 pb-4 pt-2 font-serif text-[1.25rem] transition-colors sm:text-[1.5rem] ${i ? 'ml-6' : ''} ${i === idx ? 'text-sand-50' : 'text-sand-50/55 hover:text-sand-50/85'}`}
          >
            {r.name}
            {i === idx && <motion.span layoutId="route-tab" className="absolute inset-x-0 -bottom-px h-[3px] bg-ember" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={camp.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-[0.9375rem] text-sand-50/80">
              {camp.region}, {camp.country}
            </p>
            <p className="mt-3 max-w-[40ch] text-[1.125rem] leading-relaxed text-sand-50">{camp.summary}</p>
            <dl className="t-num mt-6 grid grid-cols-2 gap-3 border-y sm:grid-cols-4 border-sand-50/20 py-4 text-sand-50">
              {[
                ['Days', camp.days],
                ['Km', camp.km],
                ['Ascent', `${camp.ascent.toLocaleString('en-GB')} m`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.75rem] uppercase tracking-[0.12em] text-sand-50/70">{k}</dt>
                  <dd className="mt-1 font-serif text-[1.25rem]">{v}</dd>
                </div>
              ))}
              <div>
                <dt className="text-[0.75rem] uppercase tracking-[0.12em] text-sand-50/70">Grade</dt>
                <dd className="mt-2 text-[0.875rem]">
                  <Grade level={camp.difficulty} tone="light" showLabel={false} />
                  <span className="ml-2 align-middle">{camp.difficulty}</span>
                </dd>
              </div>
            </dl>

            <ol className="mt-6 flex flex-col">
              {camp.stages.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setStage(i)}
                    aria-pressed={i === stage}
                    className={`grid w-full grid-cols-[2.75rem_1fr_auto] items-baseline gap-2 border-b border-sand-50/15 py-3 text-left transition-colors ${i === stage ? 'text-sand-50' : 'text-sand-50/70 hover:text-sand-50'}`}
                  >
                    <span className="t-num text-[0.8125rem] font-semibold">Day {i + 1}</span>
                    <span>
                      <span className="block font-medium">{s.title}</span>
                      {i === stage && <span className="mt-1 block text-[0.875rem] text-sand-50/80">{s.note}</span>}
                    </span>
                    <span className="t-num text-[0.875rem]">{s.km} km</span>
                  </button>
                </li>
              ))}
            </ol>
            <Link href={`/camps/${camp.slug}`} className="btn btn-light mt-8">
              Dates and booking <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="overflow-hidden rounded-[10px] border border-sand-50/20">
              <RouteMap slug={camp.slug} stages={camp.stages.map((s) => s.km)} progress={progress} tone="pine" labels={{ start: camp.route.split(' to ')[0] ?? 'Start', end: camp.route.split(' to ')[1] ?? 'Finish' }} className="block h-auto w-full" />
            </div>
            <ElevationProfile profile={camp.profile} km={camp.km} tone="pine" progress={progress} />
            <WeatherMini seed={hashString(camp.slug)} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WeatherMini({ seed }: { seed: number }) {
  const temps = [0, 1, 2].map((i) => 6 + ((seed >> (i * 3)) % 9));
  const days = ['Today', 'Tomorrow', 'Day 3'];
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-sand-50/20 pt-4 text-sand-50">
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-50/75">Trailhead weather</p>
      <ul className="flex flex-1 flex-wrap gap-x-8 gap-y-2">
        {days.map((d, i) => (
          <li key={d} className="t-num flex items-center gap-3 text-[0.9375rem]">
            <span className="text-sand-50/85">{d}</span>
            <span>
              {temps[i]}° <span className="text-sand-50/65">/ {temps[i] - 6}°</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[0.75rem] text-sand-50/65">Demo forecast</p>
    </div>
  );
}
