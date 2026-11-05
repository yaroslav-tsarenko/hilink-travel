'use client';

import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { GEAR } from '@/constants/content';
import { useToast } from './ui/Toast';

export default function GearCalculator() {
  const toast = useToast();
  const [qty, setQty] = useState<Record<string, number>>({ tent: 1, 'sleeping-bag': 2 });
  const [days, setDays] = useState(3);
  const perDay = GEAR.reduce((s, g) => s + g.price * (qty[g.id] ?? 0), 0);
  const total = perDay * days;
  const discount = days >= 5 ? 0.15 : 0;
  const set = (id: string, d: number) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(9, (q[id] ?? 0) + d)) }));

  return (
    <div className="card grid overflow-hidden lg:grid-cols-[1.3fr_1fr]">
      <ul className="flex flex-col divide-y divide-gray-10 p-6 lg:p-8">
        {GEAR.map((g) => (
          <li key={g.id} className="flexBetween gap-4 py-4">
            <div>
              <p className="bold-16">{g.label}</p>
              <p className="regular-14 text-gray-30">${g.price} / day</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => set(g.id, -1)} aria-label={`Remove ${g.label}`} className="grid h-9 w-9 place-items-center rounded-full border border-gray-10 hover:border-green-50 disabled:opacity-40" disabled={!qty[g.id]}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="bold-16 w-4 text-center tabular-nums">{qty[g.id] ?? 0}</span>
              <button type="button" onClick={() => set(g.id, 1)} aria-label={`Add ${g.label}`} className="grid h-9 w-9 place-items-center rounded-full border border-gray-10 hover:border-green-50">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-6 bg-green-90 p-6 text-white lg:p-8">
        <div>
          <label htmlFor="days" className="flexBetween regular-16 mb-3 text-gray-20">
            Rental days <span className="bold-20 text-white">{days}</span>
          </label>
          <input id="days" type="range" min={1} max={14} value={days} onChange={(e) => setDays(+e.target.value)} className="w-full accent-green-50" />
          <p className="regular-14 mt-2 text-gray-20">Rent 5+ days and save 15%</p>
        </div>
        <dl className="mt-auto flex flex-col gap-2 text-[14px] text-gray-20">
          <div className="flexBetween"><dt>Per day</dt><dd>${perDay}</dd></div>
          {discount > 0 && <div className="flexBetween text-green-50"><dt>Long-trip discount</dt><dd>−${Math.round(total * discount)}</dd></div>}
          <div className="flexBetween pt-3 text-white">
            <dt className="bold-18">Total</dt>
            <dd><motion.span key={total} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bold-40 inline-block tabular-nums">${Math.round(total * (1 - discount))}</motion.span></dd>
          </div>
        </dl>
        <button type="button" disabled={!perDay} onClick={() => toast({ title: 'Gear reserved', text: 'Pick it up at the camp reception. (Demo)' })} className="flexCenter gap-2 rounded-full bg-green-50 px-6 py-4 font-bold transition hover:bg-green-60 disabled:opacity-50">
          <ShoppingBag className="h-5 w-5" /> Reserve gear
        </button>
      </div>
    </div>
  );
}
