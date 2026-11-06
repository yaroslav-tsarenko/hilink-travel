'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { useId, useMemo, useState, type FormEvent } from 'react';
import { CAMPS, TERRAINS } from '@/constants/camps';
import ElevationProfile from './ui/ElevationProfile';
import { Grade } from './ui/Bits';

const featured = CAMPS[0];

export default function Hero() {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState('');
  const [terrain, setTerrain] = useState('');
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CAMPS.slice(0, 5);
    return CAMPS.filter((c) => `${c.name} ${c.region} ${c.country} ${c.terrain} ${c.route}`.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (active >= 0 && results[active]) {
      router.push(`/camps/${results[active].slug}`);
      return;
    }
    const p = new URLSearchParams();
    if (query.trim()) p.set('q', query.trim());
    if (terrain) p.set('terrain', terrain);
    router.push(`/camps${p.size ? `?${p}` : ''}`);
  };

  return (
    <section className="relative isolate flex min-h-[640px] flex-col justify-end overflow-hidden bg-pine-900 text-sand-50 lg:h-[min(100svh,940px)] lg:min-h-[760px]">
      <Image src="/photos/hero.webp" alt="A tent pitched on a grassy ridge above a misty alpine valley at dusk" fill priority sizes="100vw" className="-z-20 object-cover object-[62%_50%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,36,24,0.82)_0%,rgba(17,36,24,0.5)_45%,rgba(17,36,24,0.05)_75%),linear-gradient(0deg,rgba(17,36,24,0.85)_0%,rgba(17,36,24,0)_45%)]" />

      <div className="wrap grid gap-10 pb-10 pt-32 lg:grid-cols-12 lg:items-end lg:pb-14">
        <div className="lg:col-span-9 xl:col-span-7">
          <motion.p className="t-label text-sand-50/85" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            Guided hiking and wild-camping trips
          </motion.p>
          <motion.h1 className="t-display mt-5 max-w-[12ch]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            Sleep where the trail runs out.
          </motion.h1>
          <motion.p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-sand-50/85 lg:text-[1.1875rem]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Small groups, local guides and routes we have walked many times — from Lapland and Iceland to Patagonia and the canyons of Utah. Permits sorted, tents on loan, nothing left behind.
          </motion.p>

          <motion.form
            onSubmit={submit}
            role="search"
            className="relative mt-9 max-w-[640px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid overflow-hidden rounded-[8px] bg-sand-50 text-ink shadow-lift sm:grid-cols-[1fr_170px_auto]">
              <label className="flex items-center gap-3 px-4 py-2 sm:py-0">
                <MapPin className="h-5 w-5 shrink-0 text-pine" aria-hidden />
                <span className="flex min-w-0 flex-1 flex-col py-2">
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">Where</span>
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActive(-1);
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => window.setTimeout(() => setFocused(false), 150)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setActive((a) => Math.min(results.length - 1, a + 1));
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setActive((a) => Math.max(-1, a - 1));
                      } else if (e.key === 'Escape') setFocused(false);
                    }}
                    placeholder="Region, route or country"
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={focused}
                    aria-controls={listId}
                    aria-autocomplete="list"
                    aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
                    className="w-full bg-transparent text-[1rem] outline-none placeholder:text-ink-mute"
                  />
                </span>
              </label>
              <label className="flex flex-col justify-center border-t border-line px-4 py-2.5 sm:border-l sm:border-t-0">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">Terrain</span>
                <select value={terrain} onChange={(e) => setTerrain(e.target.value)} className="w-full cursor-pointer bg-transparent py-0.5 text-[1rem] outline-none">
                  <option value="">Any terrain</option>
                  {TERRAINS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="m-2 inline-flex items-center justify-center gap-2 rounded-[6px] bg-pine px-6 py-3.5 font-semibold text-sand-50 transition hover:bg-pine-600">
                <Search className="h-4 w-4" aria-hidden /> Search
              </button>
            </div>

            <AnimatePresence>
              {focused && (
                <motion.ul
                  id={listId}
                  role="listbox"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-[8px] border border-line bg-sand-50 py-1.5 text-ink shadow-lift"
                >
                  {results.length ? (
                    results.map((c, i) => (
                      <li key={c.slug} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                        <Link href={`/camps/${c.slug}`} className={`flex items-center justify-between gap-4 px-4 py-2.5 ${i === active ? 'bg-sand-200' : 'hover:bg-sand-100'}`}>
                          <span>
                            <span className="block font-serif text-[1.125rem] leading-tight">{c.name}</span>
                            <span className="text-[0.8125rem] text-ink-soft">
                              {c.region}, {c.country}
                            </span>
                          </span>
                          <span className="t-num shrink-0 text-[0.8125rem] text-ink-soft">
                            {c.days} days · {c.km} km
                          </span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-[0.9375rem] text-ink-soft">No routes match. Try “Norway”, “canyon” or “lake”.</li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.form>
        </div>

        <motion.aside
          aria-label="Route of the month"
          className="hidden self-end rounded-[10px] bg-sand-50 p-6 text-ink shadow-lift xl:col-span-4 xl:col-start-9 xl:block"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="t-label">Route of the month</p>
              <p className="mt-2 font-serif text-[1.75rem] leading-none">{featured.name}</p>
              <p className="mt-1.5 text-[0.875rem] text-ink-soft">{featured.route}</p>
            </div>
            <span className="t-num shrink-0 whitespace-pre-line text-right text-[0.75rem] leading-snug text-ink-soft">{featured.coords.replace(', ', '\n')}</span>
          </div>
          <ElevationProfile profile={featured.profile} km={featured.km} compact className="mt-4" />
          <dl className="t-num mt-3 grid grid-cols-4 gap-2 border-t border-ink/15 pt-3 text-[0.8125rem]">
            <div>
              <dt className="text-ink-soft">Days</dt>
              <dd className="font-semibold">{featured.days}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Distance</dt>
              <dd className="font-semibold">{featured.km} km</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Ascent</dt>
              <dd className="font-semibold">{featured.ascent.toLocaleString('en-GB')} m</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Grade</dt>
              <dd className="font-semibold">
                <Grade level={featured.difficulty} showLabel={false} />
              </dd>
            </div>
          </dl>
          <Link href={`/camps/${featured.slug}`} className="link mt-4 text-[0.9375rem]">
            See dates and itinerary <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.aside>
      </div>
    </section>
  );
}
