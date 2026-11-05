'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { CAMPS } from '@/constants/camps';
import { useFavorites } from '@/lib/useFavorites';
import CampCard from './ui/CampCard';

export default function FavoritesList() {
  const { favorites } = useFavorites();
  const list = CAMPS.filter((c) => favorites.includes(c.slug));
  if (!list.length)
    return (
      <div className="card flexCenter flex-col gap-4 p-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-orange-10 text-orange-50"><Heart className="h-7 w-7" /></span>
        <p className="bold-24">No saved camps yet</p>
        <p className="regular-16 max-w-md text-gray-30">Tap the heart on any camp to keep it here for later.</p>
        <Link href="/camps" className="btn_green mt-2 rounded-full border font-bold">Browse camps</Link>
      </div>
    );
  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((c) => <li key={c.slug}><CampCard camp={c} /></li>)}
    </ul>
  );
}
