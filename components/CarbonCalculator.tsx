'use client';

import { Bus, Car, Plane, Ship, Train } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

// Approximate kg CO2e per passenger-km, rounded from published averages. Demo calculator.
const MODES = [
  { id: 'train', label: 'Train', icon: Train, factor: 0.035 },
  { id: 'bus', label: 'Coach', icon: Bus, factor: 0.027 },
  { id: 'car', label: 'Car, 2 people', icon: Car, factor: 0.085 },
  { id: 'ferry', label: 'Ferry', icon: Ship, factor: 0.11 },
  { id: 'plane', label: 'Flight', icon: Plane, factor: 0.15 },
];

export default function CarbonCalculator() {
  const [mode, setMode] = useState('train');
  const [km, setKm] = useState(800);
  const factor = MODES.find((m) => m.id === mode)!.factor;
  const kg = Math.round(km * 2 * factor);
  const flight = Math.round(km * 2 * 0.15);
  const pct = Math.min(100, Math.round((kg / Math.max(flight, 1)) * 100));
  const m2 = Math.ceil(kg / 10);

  return (
    <div className="grid overflow-hidden rounded-card border border-line bg-sand-50 lg:grid-cols-12">
      <div className="flex flex-col gap-8 p-6 lg:col-span-7 lg:p-10">
        <fieldset>
          <legend className="field-label">How do you get to the trailhead?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {MODES.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setMode(id)} aria-pressed={mode === id} className={`flex flex-col items-start gap-3 rounded-[8px] border p-3.5 text-left text-[0.875rem] font-medium transition ${mode === id ? 'border-pine bg-pine text-sand-50' : 'border-line hover:border-ink/60'}`}>
                <Icon className="h-5 w-5" aria-hidden /> {label}
              </button>
            ))}
          </div>
        </fieldset>
        <label>
          <span className="flex items-baseline justify-between">
            <span className="field-label">One-way distance</span>
            <span className="t-num font-serif text-[1.5rem]">{km.toLocaleString('en-GB')} km</span>
          </span>
          <input type="range" min={50} max={4000} step={50} value={km} onChange={(e) => setKm(+e.target.value)} className="mt-3 w-full" />
        </label>
      </div>
      <div className="flex flex-col justify-center gap-5 bg-pine p-6 text-sand-50 lg:col-span-5 lg:p-10">
        <p className="t-label text-sand-50/75">Return journey</p>
        <motion.p key={kg} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="t-num font-serif text-[clamp(2.75rem,5vw,4rem)] font-[350] leading-none">
          {kg.toLocaleString('en-GB')} kg CO₂e
        </motion.p>
        <div>
          <div className="h-2 overflow-hidden rounded-full bg-sand-50/20">
            <motion.div className="h-full bg-ember" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 22 }} />
          </div>
          <p className="mt-2 text-[0.875rem] text-sand-50/80">{mode === 'plane' ? 'Flying is the highest-emission option here.' : `${pct}% of the same trip by plane.`}</p>
        </div>
        <p className="border-t border-sand-50/20 pt-5 text-[0.9375rem] text-sand-50/85">
          We fund restoration of <span className="t-num font-semibold text-sand-50">{m2} m²</span> of upland peat bog for this journey. Estimates are approximate.
        </p>
      </div>
    </div>
  );
}
