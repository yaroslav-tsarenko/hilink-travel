'use client';

import { Check, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { COMPARE_ROWS, PLANS } from '@/constants/content';

export default function PricingPlans() {
  const [yearly, setYearly] = useState(true);
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-ink-soft">Prices in euros, including VAT. Demo pricing.</p>
        <div className="flex rounded-[8px] border border-line bg-sand-50 p-1" role="radiogroup" aria-label="Billing period">
          {[false, true].map((y) => (
            <button key={String(y)} type="button" role="radio" aria-checked={yearly === y} onClick={() => setYearly(y)} className={`relative rounded-[6px] px-4 py-2 text-[0.9375rem] font-semibold transition-colors ${yearly === y ? 'text-sand-50' : 'text-ink-soft hover:text-ink'}`}>
              {yearly === y && <motion.span layoutId="billing" className="absolute inset-0 rounded-[6px] bg-pine" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <span className="relative">{y ? 'Yearly, save over 20%' : 'Monthly'}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((p) => {
          const price = yearly ? Math.round(p.yearly / 12) : p.monthly;
          const dark = Boolean(p.popular);
          return (
            <li key={p.name} className={`relative flex flex-col rounded-card p-7 lg:p-9 ${dark ? 'bg-pine text-sand-50' : 'border border-line bg-sand-50'}`}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-[1.75rem]">{p.name}</h3>
                {dark && <span className="text-[0.8125rem] font-semibold text-ember-tint">Most chosen</span>}
              </div>
              <p className={`mt-2 ${dark ? 'text-sand-50/80' : 'text-ink-soft'}`}>{p.description}</p>
              <p className="mt-8 flex items-end gap-2">
                <motion.span key={`${p.name}-${yearly}`} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="t-num font-serif text-[3.75rem] font-[350] leading-[0.9]">
                  €{price}
                </motion.span>
                <span className={`mb-1 ${dark ? 'text-sand-50/75' : 'text-ink-soft'}`}>/ month</span>
              </p>
              <p className={`mt-2 text-[0.875rem] ${dark ? 'text-sand-50/75' : 'text-ink-soft'}`}>{p.monthly === 0 ? 'Free, no card needed' : yearly ? `€${p.yearly} billed once a year` : 'Billed monthly, cancel anytime'}</p>
              <ul className={`mt-8 flex flex-col gap-3 border-t pt-6 ${dark ? 'border-sand-50/20' : 'border-ink/15'}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className={`mt-1 h-4 w-4 shrink-0 ${dark ? 'text-ember' : 'text-pine'}`} strokeWidth={2.5} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/signup?plan=${p.name.toLowerCase()}`} className={`btn btn-lg mt-10 ${dark ? 'btn-ember' : 'btn-outline'}`}>
                {p.cta}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="overflow-x-auto rounded-card border border-line bg-sand-50">
        <table className="w-full min-w-[640px] text-left">
          <caption className="sr-only">Plan comparison</caption>
          <thead>
            <tr className="border-b border-ink/15">
              <th scope="col" className="p-5 font-serif text-[1.25rem] font-normal lg:px-8">
                Compare plans
              </th>
              {PLANS.map((p) => (
                <th key={p.name} scope="col" className="p-5 text-center text-[0.9375rem] font-semibold">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((r) => (
              <tr key={r.label} className="border-b border-ink/10 last:border-0">
                <th scope="row" className="p-5 font-normal lg:px-8">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className="t-num p-5 text-center">
                    {typeof v === 'boolean' ? v ? <Check className="mx-auto h-5 w-5 text-pine" aria-label="Included" /> : <Minus className="mx-auto h-5 w-5 text-ink/30" aria-label="Not included" /> : <span>{v}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
