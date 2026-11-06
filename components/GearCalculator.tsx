'use client';

import { Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { GEAR } from '@/constants/content';
import { useToast } from './ui/Toast';
import { eur } from './ui/Bits';

export default function GearCalculator() {
  const toast = useToast();
  const [qty, setQty] = useState<Record<string, number>>({ tent: 1, 'sleeping-bag': 2, mat: 2 });
  const [days, setDays] = useState(4);
  const perDay = GEAR.reduce((s, g) => s + g.price * (qty[g.id] ?? 0), 0);
  const subtotal = perDay * days;
  const discount = days >= 5 ? Math.round(subtotal * 0.15) : 0;
  const total = subtotal - discount;
  const items = GEAR.reduce((s, g) => s + (qty[g.id] ?? 0), 0);
  const set = (id: string, d: number) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(9, (q[id] ?? 0) + d)) }));

  return (
    <div className="grid overflow-hidden rounded-card border border-line bg-sand-50 lg:grid-cols-12">
      <ul className="divide-y divide-ink/10 px-6 py-2 lg:col-span-7 lg:px-8">
        {GEAR.map((g) => (
          <li key={g.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="font-medium">{g.label}</p>
              <p className="text-[0.875rem] text-ink-soft">
                {g.detail} · {eur(g.price)} a day
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => set(g.id, -1)} aria-label={`Remove one ${g.label}`} className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-ink disabled:opacity-35" disabled={!qty[g.id]}>
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span className="t-num w-5 text-center font-serif text-[1.25rem]" aria-label={`${qty[g.id] ?? 0} selected`}>
                {qty[g.id] ?? 0}
              </span>
              <button type="button" onClick={() => set(g.id, 1)} aria-label={`Add one ${g.label}`} className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-ink">
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-6 bg-pine p-6 text-sand-50 lg:col-span-5 lg:p-8">
        <p className="t-label text-sand-50/75">Your kit</p>
        <div>
          <label htmlFor="rental-days" className="flex items-baseline justify-between text-[0.9375rem] text-sand-50/85">
            Rental days <span className="t-num font-serif text-[1.5rem] text-sand-50">{days}</span>
          </label>
          <input id="rental-days" type="range" min={1} max={14} value={days} onChange={(e) => setDays(+e.target.value)} className="mt-3 w-full accent-ember" />
          <p className="mt-2 text-[0.8125rem] text-sand-50/75">15% off for five days or more</p>
        </div>
        <ul className="flex flex-col border-t border-sand-50/20 text-[0.9375rem]" aria-label="Selected items">
          {GEAR.filter((g) => qty[g.id]).map((g) => (
            <li key={g.id} className="t-num flex justify-between border-b border-sand-50/15 py-2 text-sand-50/85">
              <span>
                {qty[g.id]} × {g.label}
              </span>
              <span>{eur(g.price * (qty[g.id] ?? 0))} / day</span>
            </li>
          ))}
          {!items && <li className="py-2 text-sand-50/70">Nothing selected yet</li>}
        </ul>
        <dl className="t-num mt-auto flex flex-col gap-2 text-[0.9375rem] text-sand-50/85">
          <div className="flex justify-between">
            <dt>
              {items} {items === 1 ? 'item' : 'items'} × {days} {days === 1 ? 'day' : 'days'}
            </dt>
            <dd>{eur(subtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-ember-tint">
              <dt>Long-trip discount</dt>
              <dd>−{eur(discount)}</dd>
            </div>
          )}
          <div className="mt-2 flex items-baseline justify-between border-t border-sand-50/25 pt-4 text-sand-50">
            <dt className="font-semibold">Total</dt>
            <dd>
              <motion.span key={total} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block font-serif text-[2.75rem] leading-none">
                {eur(total)}
              </motion.span>
            </dd>
          </div>
        </dl>
        <button type="button" disabled={!perDay} onClick={() => toast({ title: 'Kit reserved', text: 'It will be packed and waiting at the trailhead. (Demo)' })} className="btn btn-ember btn-lg w-full">
          Reserve this kit
        </button>
      </div>
    </div>
  );
}
