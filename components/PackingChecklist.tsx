'use client';

import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const ITEMS = ['Waterproof jacket and trousers', 'Warm mid-layer', 'Broken-in boots', 'Head torch and spare batteries', 'Sun hat and sunglasses', '2 litres of water capacity', 'Personal first-aid and blister kit', 'Route pack downloaded offline'];

export default function PackingChecklist({ slug }: { slug: string }) {
  const key = `wildway:pack:${slug}`;
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
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="t-h3">Your packing list</h2>
        <span className="t-num text-[0.9375rem] text-ink-soft">
          {done.length} of {ITEMS.length} packed
        </span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-sand-200" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Packing progress">
        <motion.div className="h-full bg-pine" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 140, damping: 22 }} />
      </div>
      <p className="mt-2 text-[0.8125rem] text-ink-soft">Saved on this device. Group kit is carried by the guides.</p>
      <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
        {ITEMS.map((item) => {
          const on = done.includes(item);
          return (
            <li key={item} className="border-b border-ink/10">
              <button type="button" onClick={() => toggle(item)} aria-pressed={on} className="flex w-full items-center gap-3 py-3 text-left text-[0.9375rem]">
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-[4px] border transition ${on ? 'border-pine bg-pine text-sand-50' : 'border-ink/40'}`}>
                  {on && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
                </span>
                <span className={on ? 'text-ink-soft line-through decoration-ink/40' : ''}>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {pct === 100 && <p className="mt-4 text-[0.9375rem] font-medium text-pine">Everything packed. See you at the trailhead.</p>}
    </div>
  );
}
