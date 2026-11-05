'use client';

import { Bike, Bus, Car, Plane, TreePine, Train } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const MODES = [
  { id: 'car', label: 'Car', icon: Car, factor: 0.17 },
  { id: 'bus', label: 'Bus', icon: Bus, factor: 0.09 },
  { id: 'train', label: 'Train', icon: Train, factor: 0.04 },
  { id: 'plane', label: 'Plane', icon: Plane, factor: 0.25 },
  { id: 'bike', label: 'Bike', icon: Bike, factor: 0 },
];

export default function CarbonCalculator() {
  const [mode, setMode] = useState('car');
  const [km, setKm] = useState(250);
  const factor = MODES.find((m) => m.id === mode)!.factor;
  const kg = Math.round(km * 2 * factor);
  const trees = Math.max(0, Math.ceil(kg / 21));

  return (
    <div className="card grid overflow-hidden lg:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 lg:p-10">
        <div>
          <p className="mb-3 text-[14px] font-semibold">How do you get to camp?</p>
          <div className="grid grid-cols-5 gap-2">
            {MODES.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setMode(id)} aria-pressed={mode === id} className={`flex flex-col items-center gap-2 rounded-2xl border-2 py-4 text-[12px] font-bold transition ${mode === id ? 'border-green-50 bg-green-10 text-green-60' : 'border-gray-10 hover:border-green-20'}`}>
                <Icon className="h-6 w-6" /> {label}
              </button>
            ))}
          </div>
        </div>
        <label>
          <span className="flexBetween mb-3 text-[14px] font-semibold">One-way distance <span className="bold-20">{km} km</span></span>
          <input type="range" min={10} max={2000} step={10} value={km} onChange={(e) => setKm(+e.target.value)} className="w-full accent-green-50" />
        </label>
      </div>
      <div className="flex flex-col justify-center gap-4 bg-green-50 p-6 text-white lg:p-10">
        <p className="regular-16">Round-trip footprint</p>
        <motion.p key={kg} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bold-64 tabular-nums">{kg} kg CO₂</motion.p>
        <div className="flex items-center gap-3">
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: Math.min(trees, 12) }).map((_, i) => (
              <motion.span key={`${trees}-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04, type: 'spring' }}><TreePine className="h-7 w-7" /></motion.span>
            ))}
          </div>
          <p className="font-semibold">{trees ? `${trees} tree${trees > 1 ? 's' : ''} we will plant for you` : 'Zero emissions — legend!'}</p>
        </div>
      </div>
    </div>
  );
}
