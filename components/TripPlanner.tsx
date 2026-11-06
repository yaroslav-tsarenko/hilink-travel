'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CAMPS, DIFFICULTIES, TERRAINS, type Camp, type Difficulty, type Terrain } from '@/constants/camps';
import CampCard from './ui/CampCard';

const DURATIONS = [
  { id: 'short', label: 'A long weekend', hint: '2–3 days', max: 3 },
  { id: 'mid', label: 'Most of a week', hint: '4 days', max: 4 },
  { id: 'long', label: 'As long as it takes', hint: '5 days or more', max: 99 },
];

const TERRAIN_HINT: Record<Terrain, string> = {
  Mountain: 'Ridges, passes, big views',
  Coast: 'Beaches, cliffs, tides',
  Forest: 'Old trees, shade, quiet',
  Lake: 'Paddling and swimming',
  Desert: 'Canyons and dark skies',
  Glacier: 'Ice, granite, wind',
};

const LEVEL_HINT: Record<Difficulty, string> = {
  Easy: '4–6 hours on paths, light pack',
  Moderate: 'Longer days, fords, some steep ground',
  Hard: 'Trackless terrain, heavy pack, weather',
};

export default function TripPlanner() {
  const [step, setStep] = useState(0);
  const [terrain, setTerrain] = useState<Terrain | null>(null);
  const [level, setLevel] = useState<Difficulty | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const maxDays = DURATIONS.find((d) => d.id === duration)?.max ?? 99;
  const score = (c: Camp) => (c.terrain === terrain ? 3 : 0) + (c.difficulty === level ? 2 : 0) + (c.days <= maxDays ? 1.5 : 0);
  const matches = [...CAMPS].sort((a, b) => score(b) - score(a) || b.rating - a.rating).slice(0, 3);

  const steps = [
    { title: 'What kind of landscape?', options: TERRAINS.map((t) => ({ id: t, label: t, hint: TERRAIN_HINT[t] })), value: terrain, set: (v: string) => setTerrain(v as Terrain) },
    { title: 'How hard should it be?', options: DIFFICULTIES.map((d) => ({ id: d, label: d, hint: LEVEL_HINT[d] })), value: level, set: (v: string) => setLevel(v as Difficulty) },
    { title: 'How much time do you have?', options: DURATIONS, value: duration, set: setDuration },
  ];
  const current = steps[step];
  const finished = step === steps.length;

  const restart = () => {
    setStep(0);
    setTerrain(null);
    setLevel(null);
    setDuration(null);
  };

  return (
    <div id="planner" className="scroll-mt-24 overflow-hidden rounded-card border border-line bg-sand-50">
      <div className="flex flex-wrap items-center gap-4 border-b border-line px-6 py-4 lg:px-10">
        <p className="font-serif text-[1.25rem]">Trip planner</p>
        <ol className="ml-auto flex items-center gap-2 text-[0.8125rem]" aria-label={`Step ${Math.min(step + 1, 3)} of 3`}>
          {['Landscape', 'Effort', 'Time'].map((s, i) => (
            <li key={s} className={`flex items-center gap-2 ${i <= step || finished ? 'text-ink' : 'text-ink-soft'}`}>
              <span className={`t-num grid h-6 w-6 place-items-center rounded-full text-[0.75rem] font-semibold ${i < step || finished ? 'bg-pine text-sand-50' : i === step ? 'border border-pine text-pine' : 'border border-ink/25'}`}>{i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
              {i < 2 && <span className="mx-1 hidden h-px w-6 bg-ink/25 sm:block" aria-hidden />}
            </li>
          ))}
        </ol>
      </div>
      <div className="min-h-[380px] p-6 lg:p-10">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }}>
              <h3 className="t-h3">{current.title}</h3>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {current.options.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      current.set(o.id);
                      window.setTimeout(() => setStep((s) => s + 1), 200);
                    }}
                    aria-pressed={current.value === o.id}
                    className={`flex flex-col items-start gap-1 rounded-[8px] border p-5 text-left transition ${current.value === o.id ? 'border-pine bg-pine text-sand-50' : 'border-line bg-sand hover:border-ink/60'}`}
                  >
                    <span className="font-serif text-[1.375rem] leading-tight">{o.label}</span>
                    <span className={`text-[0.875rem] ${current.value === o.id ? 'text-sand-50/80' : 'text-ink-soft'}`}>{o.hint}</span>
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-ink-soft hover:text-ink">
                  <ArrowLeft className="h-4 w-4" aria-hidden /> Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="t-label">Three routes for you</p>
                  <h3 className="t-h3 mt-3">
                    {terrain}, {level?.toLowerCase()}, {DURATIONS.find((d) => d.id === duration)?.hint}
                  </h3>
                </div>
                <button type="button" onClick={restart} className="inline-flex items-center gap-2 font-semibold text-pine underline underline-offset-4">
                  <RotateCcw className="h-4 w-4" aria-hidden /> Start again
                </button>
              </div>
              <ul className="grid gap-x-6 gap-y-10 md:grid-cols-3">
                {matches.map((c, i) => (
                  <motion.li key={c.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <CampCard camp={c} />
                  </motion.li>
                ))}
              </ul>
              <Link href="/camps" className="link mt-10">
                Compare all ten routes <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
