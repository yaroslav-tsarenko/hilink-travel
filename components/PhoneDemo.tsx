'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, CalendarDays, Compass, Map, Navigation, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CAMPS } from '@/constants/camps';
import Landscape from './ui/Landscape';

const TABS = [
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'map', label: 'Offline map', icon: Map },
  { id: 'ar', label: 'AR guide', icon: Navigation },
  { id: 'plan', label: 'Schedule', icon: CalendarDays },
] as const;

function Screen({ id }: { id: (typeof TABS)[number]['id'] }) {
  if (id === 'explore')
    return (
      <div className="flex flex-col gap-3 p-4">
        <div className="flexBetween"><p className="text-[18px] font-bold">Get Inspired</p><Bell className="h-5 w-5" /></div>
        {CAMPS.slice(2, 5).map((c) => (
          <div key={c.slug} className="relative h-24 overflow-hidden rounded-2xl">
            <Landscape palette={c.palette} className="absolute inset-0 h-full w-full" />
            <p className="absolute bottom-2 left-3 text-[13px] font-bold text-white drop-shadow">{c.name}</p>
          </div>
        ))}
      </div>
    );
  if (id === 'map')
    return (
      <div className="relative h-full">
        <Image src="/hero.webp" alt="" fill className="object-cover" />
        <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-3 shadow-lg">
          <p className="text-[11px] text-gray-30">Offline · GPS only</p>
          <p className="text-[14px] font-bold">Aguas Calientes · 48 min</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-10"><motion.div className="h-full bg-green-50" initial={{ width: '10%' }} animate={{ width: '64%' }} transition={{ duration: 2 }} /></div>
        </div>
      </div>
    );
  if (id === 'ar')
    return (
      <div className="relative h-full overflow-hidden bg-gray-90">
        <Landscape palette={6} className="absolute inset-0 h-full w-full opacity-80" />
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="absolute left-1/2 -translate-x-1/2 text-green-50" style={{ bottom: `${18 + i * 18}%` }} animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}>
            <Navigation className="h-10 w-10 -rotate-45 fill-green-50" />
          </motion.div>
        ))}
        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white">320 m to summit</div>
      </div>
    );
  return (
    <div className="flex flex-col gap-3 p-4">
      <p className="text-[18px] font-bold">Group trip</p>
      {['Sat · Pack & drive', 'Sun · Summit push', 'Mon · Lake day'].map((d, i) => (
        <motion.div key={d} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="flex items-center gap-3 rounded-2xl bg-gray-5 p-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-green-50 text-[12px] font-bold text-white">{i + 1}</span>
          <span className="text-[13px] font-semibold">{d}</span>
        </motion.div>
      ))}
      <div className="flex items-center gap-2 rounded-2xl border border-dashed border-green-50 p-3 text-[12px] font-semibold text-green-60"><Users className="h-4 w-4" /> 4 friends voted · dates locked</div>
    </div>
  );
}

export default function PhoneDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('explore');
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = window.setInterval(() => setTab((cur) => TABS[(TABS.findIndex((x) => x.id === cur) + 1) % TABS.length].id), 3500);
    return () => window.clearInterval(t);
  }, [auto]);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <ul className="flex flex-col gap-3">
        {TABS.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button type="button" onClick={() => { setTab(id); setAuto(false); }} aria-pressed={tab === id} className={`flex w-full items-center gap-4 rounded-3xl border-2 p-5 text-left transition ${tab === id ? 'border-green-50 bg-green-10' : 'border-gray-10 hover:border-green-20'}`}>
              <span className={`grid h-12 w-12 place-items-center rounded-full transition ${tab === id ? 'bg-green-50 text-white' : 'bg-gray-5'}`}><Icon className="h-5 w-5" /></span>
              <span className="bold-18">{label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="flexCenter">
        <div className="relative h-[560px] w-[280px] rounded-[48px] border-[10px] border-gray-90 bg-white shadow-2xl">
          <div className="absolute left-1/2 top-2 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-gray-90" />
          <div className="h-full overflow-hidden rounded-[38px] pt-10">
            <AnimatePresence mode="wait">
              <motion.div key={tab} className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
                <Screen id={tab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
