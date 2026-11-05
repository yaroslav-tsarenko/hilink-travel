'use client';

import { Check, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { COMPARE_ROWS, PLANS } from '@/constants/content';

export default function PricingPlans() {
  const [yearly, setYearly] = useState(true);
  return (
    <div className="flex flex-col gap-16">
      <div className="flexCenter">
        <div className="relative flex rounded-full bg-gray-5 p-1.5" role="radiogroup" aria-label="Billing period">
          {[false, true].map((y) => (
            <button key={String(y)} type="button" role="radio" aria-checked={yearly === y} onClick={() => setYearly(y)} className={`relative z-10 rounded-full px-6 py-3 font-bold transition ${yearly === y ? 'text-white' : 'text-gray-50'}`}>
              {yearly === y && <motion.span layoutId="billing" className="absolute inset-0 -z-10 rounded-full bg-green-50" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              {y ? 'Yearly · save 22%' : 'Monthly'}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((p) => {
          const price = yearly ? Math.round(p.yearly / 12) : p.monthly;
          return (
            <li key={p.name} className={`relative flex flex-col gap-6 rounded-5xl p-8 transition duration-500 hover:-translate-y-1.5 lg:p-10 ${p.popular ? 'bg-green-90 text-white shadow-2xl' : 'card hover:shadow-xl'}`}>
              {p.popular && <span className="absolute -top-3.5 left-10 rounded-full bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-white">Most popular</span>}
              <div>
                <h3 className="bold-24">{p.name}</h3>
                <p className={`regular-16 mt-2 ${p.popular ? 'text-gray-20' : 'text-gray-30'}`}>{p.description}</p>
              </div>
              <p className="flex items-end gap-2">
                <motion.span key={`${p.name}-${yearly}`} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="bold-64 tabular-nums">${price}</motion.span>
                <span className={`mb-3 ${p.popular ? 'text-gray-20' : 'text-gray-30'}`}>/ month</span>
              </p>
              <p className={`-mt-4 text-[14px] ${p.popular ? 'text-gray-20' : 'text-gray-30'}`}>{p.monthly === 0 ? 'Free forever' : yearly ? `$${p.yearly} billed yearly` : 'Billed monthly'}</p>
              <ul className="flex flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-green-50 text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/signup?plan=${p.name.toLowerCase()}`} className={`mt-auto rounded-full px-6 py-4 text-center font-bold transition hover:-translate-y-0.5 ${p.popular ? 'bg-green-50 hover:bg-green-60' : 'border border-gray-90 hover:bg-gray-90 hover:text-white'}`}>
                {p.cta}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <caption className="sr-only">Plan comparison</caption>
          <thead>
            <tr className="border-b border-gray-10">
              <th className="bold-18 p-6">Compare plans</th>
              {PLANS.map((p) => (
                <th key={p.name} className="bold-16 p-6 text-center">{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((r) => (
              <tr key={r.label} className="border-b border-gray-10 last:border-0 hover:bg-gray-5">
                <td className="regular-16 p-6">{r.label}</td>
                {r.values.map((v, i) => (
                  <td key={i} className="p-6 text-center">
                    {typeof v === 'boolean' ? (
                      v ? <Check className="mx-auto h-5 w-5 text-green-50" aria-label="Included" /> : <Minus className="mx-auto h-5 w-5 text-gray-20" aria-label="Not included" />
                    ) : (
                      <span className="font-semibold">{v}</span>
                    )}
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
