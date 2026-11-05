'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { GUIDES } from '@/constants/content';
import Landscape from './ui/Landscape';

const CATS = ['All', 'Tips', 'Gear', 'Destinations', 'Safety'] as const;

export default function GuidesList() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('All');
  const list = GUIDES.filter((g) => cat === 'All' || g.category === cat);
  const [first, ...rest] = list;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
        {CATS.map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`chip ${cat === c ? 'chip-active' : ''}`}>{c}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cat} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="flex flex-col gap-6">
          {first && (
            <Link href={`/guides/${first.slug}`} className="card group grid overflow-hidden transition hover:shadow-xl lg:grid-cols-2">
              <div className="overflow-hidden"><Landscape palette={first.palette} className="aspect-[16/10] h-full w-full transition duration-700 group-hover:scale-105" /></div>
              <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
                <span className="eyebrow">{first.category} · {first.readTime} read</span>
                <h2 className="bold-32 transition group-hover:text-green-50">{first.title}</h2>
                <p className="regular-16 text-gray-30">{first.excerpt}</p>
                <span className="mt-2 flex items-center gap-3 text-[14px]">
                  <Image src={first.author.avatar} alt="" width={36} height={36} className="rounded-full" />
                  <span className="font-semibold">{first.author.name}</span>
                  <span className="text-gray-30">· {first.date}</span>
                </span>
              </div>
            </Link>
          )}
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="overflow-hidden"><Landscape palette={g.palette} className="aspect-[16/10] w-full transition duration-700 group-hover:scale-105" /></div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="eyebrow">{g.category} · {g.readTime}</span>
                    <h3 className="bold-20 transition group-hover:text-green-50">{g.title}</h3>
                    <p className="regular-14 text-gray-30">{g.excerpt}</p>
                    <span className="mt-auto pt-2 text-[13px] text-gray-30">{g.author.name} · {g.date}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {!list.length && <p className="regular-16 text-gray-30">No guides in this category yet.</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
