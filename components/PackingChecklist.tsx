'use client';

import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const ITEMS = ['Tent & footprint', 'Sleeping bag', 'Headlamp + batteries', 'Water filter', 'Rain jacket', 'First aid kit', 'Offline map downloaded', 'Snacks for the trail'];

export default function PackingChecklist({ slug }: { slug: string }) {
  const key = `hilink:pack:${slug}`;
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(JSON.parse(localStorage.getItem(key) ?? '[]'));
    } catch {}
  }, [key]);

  const toggle = (item: string) => {
    const next = done.includes(item) ? done.filter((d) => d !== item) : [...done, item];
    setDone(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  const pct = Math.round((done.length / ITEMS.length) * 100);

  return (
    <div className="card p-6 lg:p-8">
      <div className="flexBetween mb-4">
        <h3 className="bold-20">Packing checklist</h3>
        <span className="bold-16 text-green-50">{pct}%</span>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-10">
        <motion.div className="h-full rounded-full bg-green-50" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {ITEMS.map((item) => {
          const on = done.includes(item);
          return (
            <li key={item}>
              <button type="button" onClick={() => toggle(item)} aria-pressed={on} className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[14px] font-semibold transition ${on ? 'border-green-50 bg-green-10 text-gray-50 line-through' : 'border-gray-10 hover:border-green-50'}`}>
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${on ? 'border-green-50 bg-green-50 text-white' : 'border-gray-20'}`}>
                  {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                {item}
              </button>
            </li>
          );
        })}
      </ul>
      {pct === 100 && <p className="regular-14 mt-4 font-semibold text-green-60">All packed — have an amazing trip! 🎒</p>}
    </div>
  );
}
