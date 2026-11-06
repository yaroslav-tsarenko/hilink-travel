'use client';

import Link from 'next/link';
import { CAMPS } from '@/constants/camps';
import { useFavorites } from '@/lib/useFavorites';
import CampCard from './ui/CampCard';

export default function FavoritesList() {
  const { favorites } = useFavorites();
  const list = CAMPS.filter((c) => favorites.includes(c.slug));
  if (!list.length)
    return (
      <div className="flex flex-col items-start gap-4 border-y border-ink/15 py-14">
        <p className="t-h3">Nothing saved yet</p>
        <p className="max-w-[48ch] text-ink-soft">Use the bookmark on any trip to keep it here while you decide. Saved trips stay on this device.</p>
        <Link href="/camps" className="btn btn-primary mt-2">
          Browse trips
        </Link>
      </div>
    );
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((c) => (
        <li key={c.slug}>
          <CampCard camp={c} />
        </li>
      ))}
    </ul>
  );
}
