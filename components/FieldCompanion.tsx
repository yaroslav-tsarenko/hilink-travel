'use client';

import { AnimatePresence, motion } from 'motion/react';
import { CloudSun, Map as MapIcon, Mountain, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCamp } from '@/constants/camps';
import { hashString } from '@/lib/geo';
import ElevationProfile from './ui/ElevationProfile';
import RouteMap from './ui/RouteMap';
import { Avatar } from './ui/Bits';

const camp = getCamp('laugavegur')!;

const TABS = [
  { id: 'map', label: 'Offline map', text: 'Topographic map, route line and camps, stored on the phone. Works on GPS alone.', icon: MapIcon },
  { id: 'profile', label: 'Elevation', text: 'Where the climbs are, how far to the next camp and what is left today.', icon: Mountain },
  { id: 'weather', label: 'Forecast', text: 'Mountain forecast for each camp, updated whenever you get signal.', icon: CloudSun },
  { id: 'group', label: 'Group', text: 'Who is coming, who has packed, and the guide’s notes for the morning.', icon: Users },
] as const;

type TabId = (typeof TABS)[number]['id'];

function Screen({ id }: { id: TabId }) {
  if (id === 'map')
    return (
      <div className="relative">
        <RouteMap slug={camp.slug} stages={camp.stages.map((s) => s.km)} progress={0.38} labels={{ start: 'Landmannalaugar', end: 'Þórsmörk' }} className="block h-auto w-full" />
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-[8px] bg-sand-50/95 px-4 py-3 text-[0.875rem] shadow-card sm:left-auto sm:right-4 sm:w-[260px]">
          <span>
            <span className="block text-[0.75rem] text-ink-soft">Offline · GPS only</span>
            <span className="font-semibold">Day 2 · 4.6 km to Álftavatn</span>
          </span>
        </div>
      </div>
    );
  if (id === 'profile')
    return (
      <div className="p-5 sm:p-8">
        <p className="t-label">Laugavegur · 55 km</p>
        <p className="mt-3 font-serif text-[1.75rem] leading-tight">Highest point in 2.1 km, then 500 m of descent.</p>
        <ElevationProfile profile={camp.profile} km={camp.km} progress={0.24} className="mt-6" />
      </div>
    );
  if (id === 'weather') {
    const r = hashString('companion');
    const rows = camp.stages.map((s, i) => ({ camp: s.title.split(' to ')[1], hi: 6 + ((r >> i) % 6), wind: 14 + ((r >> (i + 2)) % 25) }));
    return (
      <div className="p-5 sm:p-8">
        <p className="t-label">Camps on the route</p>
        <ul className="mt-4 border-t border-ink/15">
          {rows.map((row, i) => (
            <li key={row.camp} className="t-num grid grid-cols-[3rem_1fr_auto_auto] items-baseline gap-4 border-b border-ink/10 py-3">
              <span className="text-[0.8125rem] text-ink-soft">Day {i + 1}</span>
              <span className="font-serif text-[1.125rem]">{row.camp}</span>
              <span>{row.hi}°</span>
              <span className="w-16 text-right text-[0.875rem] text-ink-soft">{row.wind} km/h</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.75rem] text-ink-soft">Demo forecast</p>
      </div>
    );
  }
  const people = [
    { n: 'Ásta Jónsdóttir', s: 'Guide · route notes posted' },
    { n: 'Hanna Berg', s: 'Packed 8 of 8' },
    { n: 'Jonas Weber', s: 'Packed 6 of 8' },
    { n: 'Priya Nair', s: 'Renting tent and mat' },
  ];
  return (
    <div className="p-5 sm:p-8">
      <p className="t-label">Group for 14 July</p>
      <ul className="mt-4 border-t border-ink/15">
        {people.map((p, i) => (
          <li key={p.n} className="flex items-center gap-3 border-b border-ink/10 py-3">
            <Avatar name={p.n} size={36} tone={i ? 'sand' : 'pine'} />
            <span>
              <span className="block font-medium">{p.n}</span>
              <span className="text-[0.8125rem] text-ink-soft">{p.s}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-[6px] bg-pine-tint px-4 py-3 text-[0.875rem] text-pine">Meet 07:30 at the BSÍ bus terminal, Reykjavík. Highland bus at 08:00.</p>
    </div>
  );
}

export default function FieldCompanion() {
  const [tab, setTab] = useState<TabId>('map');
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = window.setInterval(() => setTab((cur) => TABS[(TABS.findIndex((x) => x.id === cur) + 1) % TABS.length].id), 4500);
    return () => window.clearInterval(t);
  }, [auto]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      <ul className="flex flex-col border-t border-ink/20 lg:col-span-4" role="tablist" aria-label="Field app features">
        {TABS.map(({ id, label, text, icon: Icon }) => (
          <li key={id} className="border-b border-ink/20">
            <button
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => {
                setTab(id);
                setAuto(false);
              }}
              className="flex w-full items-start gap-4 py-5 text-left"
            >
              <span className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full transition ${tab === id ? 'bg-pine text-sand-50' : 'bg-sand-200 text-pine'}`}>
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className={`block font-serif text-[1.375rem] leading-tight ${tab === id ? 'text-ink' : 'text-ink-soft'}`}>{label}</span>
                {tab === id && <span className="mt-1.5 block text-[0.9375rem] text-ink-soft">{text}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="overflow-hidden rounded-card border border-line bg-sand-50 shadow-card lg:col-span-8" role="tabpanel">
        <div className="flex items-center justify-between border-b border-line px-5 py-3 text-[0.8125rem] text-ink-soft">
          <span className="font-semibold text-ink">Wildway Field · Laugavegur</span>
          <span className="t-num">Synced 06:12</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Screen id={tab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
