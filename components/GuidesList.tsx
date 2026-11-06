'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { GUIDES } from '@/constants/content';

const CATS = ['All', 'Skills', 'Gear', 'Places', 'Safety'] as const;

export default function GuidesList() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('All');
  const list = GUIDES.filter((g) => cat === 'All' || g.category === cat);
  const [first, ...rest] = list;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {CATS.map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className="chip">
            {c}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cat} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="flex flex-col gap-14">
          {first && (
            <Link href={`/guides/${first.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="relative aspect-[16/10] overflow-hidden rounded-card lg:col-span-7">
                <Image src={first.photo} alt={first.photoAlt} fill sizes="(max-width: 1024px) 92vw, 760px" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="lg:col-span-5">
                <p className="t-label">
                  {first.category} · {first.readTime} read
                </p>
                <h2 className="t-h2 mt-4 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[8px]">{first.title}</h2>
                <p className="t-lead mt-4">{first.excerpt}</p>
                <p className="mt-6 text-[0.875rem] text-ink-soft">
                  {first.author} · {first.date}
                </p>
              </div>
            </Link>
          )}
          {rest.length > 0 && (
            <ul className="grid gap-x-6 gap-y-12 border-t border-ink/15 pt-12 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col">
                    <div className="relative aspect-[3/2] overflow-hidden rounded-card">
                      <Image src={g.photo} alt={g.photoAlt} fill sizes="(max-width: 768px) 92vw, 420px" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                    </div>
                    <p className="t-label mt-5">
                      {g.category} · {g.readTime}
                    </p>
                    <h3 className="mt-3 font-serif text-[1.5rem] leading-[1.15] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{g.title}</h3>
                    <p className="mt-2 text-ink-soft">{g.excerpt}</p>
                    <p className="mt-auto pt-4 text-[0.8125rem] text-ink-soft">
                      {g.author} · {g.date}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!list.length && <p className="text-ink-soft">Nothing in this category yet.</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
