'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CAMPS, DIFFICULTIES, TERRAINS, type Difficulty, type Terrain } from '@/constants/camps';
import CampCard from './ui/CampCard';

const DURATIONS = [
  { id: 'short', label: 'Weekend', hint: '1–2 days', max: 2 },
  { id: 'mid', label: 'Long weekend', hint: '3 days', max: 3 },
  { id: 'long', label: 'Expedition', hint: '4+ days', max: 99 },
];

export default function TripPlanner() {
  const [step, setStep] = useState(0);
  const [terrain, setTerrain] = useState<Terrain | null>(null);
  const [level, setLevel] = useState<Difficulty | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const days = (c: (typeof CAMPS)[number]) => parseInt(c.duration);
  const maxDays = DURATIONS.find((d) => d.id === duration)?.max ?? 99;
  const score = (c: (typeof CAMPS)[number]) => (c.terrain === terrain ? 3 : 0) + (c.difficulty === level ? 2 : 0) + (days(c) <= maxDays ? 1 : 0);
  const matches = [...CAMPS].sort((a, b) => score(b) - score(a) || b.rating - a.rating).slice(0, 3);

  const steps = [
    { title: 'What landscape calls you?', options: TERRAINS.map((t) => ({ id: t, label: t, hint: '' })), value: terrain, set: (v: string) => setTerrain(v as Terrain) },
    { title: 'How challenging should it be?', options: DIFFICULTIES.map((d) => ({ id: d, label: d, hint: d === 'Easy' ? 'Relaxed walks' : d === 'Moderate' ? 'Some climbing' : 'Serious elevation' })), value: level, set: (v: string) => setLevel(v as Difficulty) },
    { title: 'How long is your trip?', options: DURATIONS, value: duration, set: setDuration },
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
    <div id="planner" className="card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-gray-10 px-6 py-5 lg:px-10">
        <Sparkles className="h-5 w-5 text-green-50" />
        <p className="bold-18">Trip planner</p>
        <div className="ml-auto flex gap-1.5" aria-label={`Step ${Math.min(step + 1, 3)} of 3`}>
          {steps.map((_, i) => (
            <span key={i} className={`h-1.5 w-8 rounded-full transition ${i < step || finished ? 'bg-green-50' : i === step ? 'bg-green-20' : 'bg-gray-10'}`} />
          ))}
        </div>
      </div>
      <div className="min-h-[360px] p-6 lg:p-10">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <h3 className="bold-32 mb-8">{current.title}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {current.options.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      current.set(o.id);
                      window.setTimeout(() => setStep((s) => s + 1), 220);
                    }}
                    className={`flex flex-col items-start gap-1 rounded-3xl border-2 p-5 text-left transition hover:-translate-y-0.5 hover:border-green-50 ${current.value === o.id ? 'border-green-50 bg-green-10' : 'border-gray-10'}`}
                  >
                    <span className="bold-18">{o.label}</span>
                    {o.hint && <span className="regular-14 text-gray-30">{o.hint}</span>}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-8 inline-flex items-center gap-2 font-bold text-gray-50 hover:text-green-50">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow mb-2">Your matches</p>
                  <h3 className="bold-32">{terrain} · {level} · {DURATIONS.find((d) => d.id === duration)?.label}</h3>
                </div>
                <button type="button" onClick={restart} className="inline-flex items-center gap-2 font-bold text-green-50 hover:underline">
                  <RotateCcw className="h-4 w-4" /> Start over
                </button>
              </div>
              <ul className="grid gap-6 md:grid-cols-3">
                {matches.map((c, i) => (
                  <motion.li key={c.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <CampCard camp={c} />
                  </motion.li>
                ))}
              </ul>
              <Link href="/camps" className="mt-8 inline-flex items-center gap-2 font-bold text-green-50">See all camps <ArrowRight className="h-4 w-4" /></Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
