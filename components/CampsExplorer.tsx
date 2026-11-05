'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { CAMPS, DIFFICULTIES, TERRAINS, type Difficulty, type Terrain } from '@/constants/camps';
import CampCard from './ui/CampCard';

const SORTS = { popular: 'Most popular', rating: 'Top rated', 'price-asc': 'Price: low to high', 'price-desc': 'Price: high to low' } as const;

export default function CampsExplorer() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [terrain, setTerrain] = useState<Terrain | 'All'>((params.get('terrain') as Terrain) ?? 'All');
  const [difficulty, setDifficulty] = useState<Difficulty[]>([]);
  const [maxPrice, setMaxPrice] = useState(60);
  const [sort, setSort] = useState<keyof typeof SORTS>('popular');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = CAMPS.filter(
      (c) =>
        (terrain === 'All' || c.terrain === terrain) &&
        (!difficulty.length || difficulty.includes(c.difficulty)) &&
        c.price <= maxPrice &&
        (!q || `${c.name} ${c.location} ${c.country} ${c.terrain}`.toLowerCase().includes(q)),
    );
    return [...filtered].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return b.reviews - a.reviews;
    });
  }, [query, terrain, difficulty, maxPrice, sort]);

  const reset = () => {
    setQuery('');
    setTerrain('All');
    setDifficulty([]);
    setMaxPrice(60);
  };
  const dirty = query || terrain !== 'All' || difficulty.length || maxPrice < 60;

  return (
    <div className="flex flex-col gap-8">
      <div className="card flex flex-col gap-5 p-5 lg:p-6">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search camps</span>
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-30" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by camp, region or country" className="input pl-12" />
          </label>
          <label className="flex items-center gap-3 md:w-64">
            <SlidersHorizontal className="h-5 w-5 shrink-0 text-gray-30" />
            <span className="sr-only">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof SORTS)} className="input cursor-pointer appearance-none py-3.5">
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Terrain">
          {(['All', ...TERRAINS] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTerrain(t)} className={`chip ${terrain === t ? 'chip-active' : ''}`} aria-pressed={terrain === t}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-5 border-t border-gray-10 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Difficulty">
            <span className="medium-14 mr-1 text-gray-30">Difficulty:</span>
            {DIFFICULTIES.map((d) => {
              const on = difficulty.includes(d);
              return (
                <button key={d} type="button" aria-pressed={on} onClick={() => setDifficulty((all) => (on ? all.filter((x) => x !== d) : [...all, d]))} className={`chip ${on ? 'chip-active' : ''}`}>
                  {d}
                </button>
              );
            })}
          </div>
          <label className="flex items-center gap-4 md:w-80">
            <span className="medium-14 whitespace-nowrap text-gray-30">Max ${maxPrice}/night</span>
            <input type="range" min={20} max={60} step={2} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-green-50" />
          </label>
        </div>
      </div>

      <div className="flexBetween">
        <p className="regular-16 text-gray-30" aria-live="polite">
          <span className="bold-16 text-gray-90">{list.length}</span> camps found
        </p>
        {dirty ? (
          <button type="button" onClick={reset} className="flex items-center gap-1 text-[14px] font-bold text-green-50 hover:underline">
            <X className="h-4 w-4" /> Clear filters
          </button>
        ) : null}
      </div>

      <motion.ul layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.li key={c.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
              <CampCard camp={c} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {!list.length && (
        <div className="card flexCenter flex-col gap-3 p-16 text-center">
          <p className="bold-20">No camps match these filters</p>
          <p className="regular-16 text-gray-30">Try a different terrain or raise the price limit.</p>
          <button type="button" onClick={reset} className="btn_small mt-2 rounded-full border font-bold">Reset filters</button>
        </div>
      )}
    </div>
  );
}
