'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { CAMPS, DIFFICULTIES, PRICE_MAX, PRICE_MIN, TERRAINS, type Difficulty, type Terrain } from '@/constants/camps';
import CampCard from './ui/CampCard';
import { Grade } from './ui/Bits';

const SORTS = { popular: 'Most reviewed', rating: 'Highest rated', 'price-asc': 'Price, low to high', 'price-desc': 'Price, high to low', short: 'Shortest first' } as const;

export default function CampsExplorer() {
  const params = useSearchParams();
  const initialTerrain = params.get('terrain');
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [terrain, setTerrain] = useState<Terrain | 'All'>(TERRAINS.includes(initialTerrain as Terrain) ? (initialTerrain as Terrain) : 'All');
  const [difficulty, setDifficulty] = useState<Difficulty[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<keyof typeof SORTS>('popular');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = CAMPS.filter(
      (c) =>
        (terrain === 'All' || c.terrain === terrain) &&
        (!difficulty.length || difficulty.includes(c.difficulty)) &&
        c.price <= maxPrice &&
        (!q || `${c.name} ${c.route} ${c.region} ${c.country} ${c.terrain}`.toLowerCase().includes(q)),
    );
    return [...filtered].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'short') return a.days - b.days;
      return b.reviews - a.reviews;
    });
  }, [query, terrain, difficulty, maxPrice, sort]);

  const reset = () => {
    setQuery('');
    setTerrain('All');
    setDifficulty([]);
    setMaxPrice(PRICE_MAX);
  };
  // Balanced rhythm at 3 columns: the first cards go two-up so the last row is never a lone card.
  const wide = list.length < 2 ? 0 : [0, 4, 2][list.length % 3];
  const dirty = Boolean(query) || terrain !== 'All' || difficulty.length > 0 || maxPrice < PRICE_MAX;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <aside className="lg:col-span-3" aria-label="Filters">
        <div className="flex flex-col gap-8 lg:sticky lg:top-[100px]">
          <label className="block">
            <span className="field-label">Search</span>
            <span className="relative mt-2 block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Route, region, country" className="field pl-10" />
            </span>
          </label>

          <fieldset>
            <legend className="field-label">Terrain</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {(['All', ...TERRAINS] as const).map((t) => (
                <button key={t} type="button" onClick={() => setTerrain(t)} className="chip" aria-pressed={terrain === t}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="field-label">Grade</legend>
            <div className="mt-3 flex flex-col gap-1">
              {DIFFICULTIES.map((d) => {
                const on = difficulty.includes(d);
                return (
                  <label key={d} className="flex cursor-pointer items-center justify-between rounded-[6px] px-1 py-1.5 hover:bg-sand-200/60">
                    <span className="flex items-center gap-3">
                      <input type="checkbox" checked={on} onChange={() => setDifficulty((all) => (on ? all.filter((x) => x !== d) : [...all, d]))} className="h-4 w-4 accent-pine" />
                      <span className="text-[0.9375rem]">{d}</span>
                    </span>
                    <Grade level={d} showLabel={false} />
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className="flex items-baseline justify-between">
              <span className="field-label">Price per night</span>
              <span className="t-num text-[0.875rem] text-ink-soft">up to €{maxPrice}</span>
            </span>
            <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={5} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="mt-3 w-full" />
            <span className="t-num mt-1 flex justify-between text-[0.75rem] text-ink-soft">
              <span>€{PRICE_MIN}</span>
              <span>€{PRICE_MAX}</span>
            </span>
          </label>

          {dirty && (
            <button type="button" onClick={reset} className="inline-flex w-fit items-center gap-1.5 text-[0.875rem] font-semibold text-pine underline underline-offset-4">
              <X className="h-4 w-4" aria-hidden /> Clear filters
            </button>
          )}
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-4">
          <p className="text-[0.9375rem] text-ink-soft" aria-live="polite">
            <span className="t-num font-semibold text-ink">{list.length}</span> {list.length === 1 ? 'route' : 'routes'}
            {terrain !== 'All' && <> · {terrain}</>}
          </p>
          <label className="flex items-center gap-2 text-[0.875rem]">
            <span className="text-ink-soft">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof SORTS)} className="cursor-pointer rounded-[6px] border border-line bg-sand-50 px-3 py-2 font-medium outline-none focus:border-pine">
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>

        <motion.ul layout className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {list.map((c, i) => (
              <motion.li key={c.slug} layout className={i < wide ? 'xl:col-span-3' : 'xl:col-span-2'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <CampCard camp={c} size={i < wide ? 'lg' : 'md'} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {!list.length && (
          <div className="panel flex flex-col items-start gap-3 p-10">
            <p className="t-h4">No routes match these filters</p>
            <p className="text-ink-soft">Try another terrain, add a grade, or raise the price limit.</p>
            <button type="button" onClick={reset} className="btn btn-primary mt-2">
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
