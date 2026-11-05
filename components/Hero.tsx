'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { MapPin, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CAMPS } from '@/constants/camps';
import Button from './Button';

const spots = CAMPS.slice(0, 5);

const Hero = () => {
  const [index, setIndex] = useState(2);
  const [paused, setPaused] = useState(false);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const spot = spots[index];

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % spots.length), 4500);
    return () => window.clearInterval(t);
  }, [paused]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CAMPS.slice(0, 4);
    return CAMPS.filter((c) => `${c.name} ${c.location} ${c.country} ${c.terrain}`.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image src="/camp.svg" alt="" width={50} height={50} className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]" />
        <motion.h1 className="bold-52 lg:bold-88" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          Putuk Truno Camp Area
        </motion.h1>
        <motion.p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
          We want to be on each of your journeys seeking the satisfaction of seeing the incorruptible beauty of nature. We can help you on an adventure around the world in just one app
        </motion.p>

        <motion.div className="relative mt-8 xl:max-w-[520px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
          <label htmlFor="hero-search" className="sr-only">Search camps</label>
          <div className={`flex items-center gap-3 rounded-full border bg-white px-5 py-2 shadow-sm transition ${focused ? 'border-green-50 ring-4 ring-green-50/15' : 'border-gray-10'}`}>
            <Search className="h-5 w-5 text-gray-30" />
            <input
              id="hero-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => window.setTimeout(() => setFocused(false), 150)}
              placeholder="Where do you want to camp?"
              autoComplete="off"
              className="min-w-0 flex-1 py-2 outline-none placeholder:text-gray-20"
            />
            <Link href={`/camps${query ? `?q=${encodeURIComponent(query)}` : ''}`} className="rounded-full bg-green-50 px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-green-60">
              Search
            </Link>
          </div>
          <AnimatePresence>
            {focused && (
              <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-3xl border border-gray-10 bg-white p-2 shadow-xl">
                {results.length ? (
                  results.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/camps/${c.slug}`} className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition hover:bg-green-10">
                        <span className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-green-50" />
                          <span>
                            <span className="bold-16 block">{c.name}</span>
                            <span className="regular-14 text-gray-30">{c.location}, {c.country}</span>
                          </span>
                        </span>
                        <span className="text-[14px] font-bold text-gray-50">${c.price}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="regular-14 px-4 py-3 text-gray-30">No camps found — try “lake” or “Peru”.</li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.08, type: 'spring' }}>
                  <Image src="/star.svg" alt="" width={24} height={24} />
                </motion.span>
              ))}
          </div>
          <p className="bold-16 lg:bold-20 text-blue-70">
            198k
            <span className="regular-16 lg:regular-20 ml-1">Excellent Reviews</span>
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Button title="Download App" variant="btn_green" href="/app" />
          <Button title="How we work?" icon="/play.svg" variant="btn_white_text" href="/how-it-works" />
        </div>
      </div>

      <div className="relative flex flex-1 items-start" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <motion.div className="relative z-20 flex w-[288px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8 shadow-2xl" initial={{ opacity: 0, y: 30, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
          <AnimatePresence mode="wait">
            <motion.div key={spot.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="flex flex-col gap-8">
              <div className="flex flex-col">
                <div className="flexBetween">
                  <p className="regular-16 text-gray-20">Location</p>
                  <button type="button" onClick={() => setIndex((i) => (i + 1) % spots.length)} aria-label="Next location" className="rounded-full p-1 transition hover:rotate-90 hover:bg-white/10">
                    <Image src="/close.svg" alt="" width={24} height={24} />
                  </button>
                </div>
                <Link href={`/camps/${spot.slug}`} className="bold-20 text-white hover:text-green-50">{spot.name}</Link>
              </div>
              <div className="flexBetween">
                <div className="flex flex-col">
                  <p className="regular-16 block text-gray-20">Distance</p>
                  <p className="bold-20 text-white">{spot.distance}</p>
                </div>
                <div className="flex flex-col">
                  <p className="regular-16 block text-gray-20">Elevation</p>
                  <p className="bold-20 text-white">{spot.elevation}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-1.5" role="tablist" aria-label="Featured locations">
            {spots.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.name}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-green-50' : 'w-3 bg-white/25 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
