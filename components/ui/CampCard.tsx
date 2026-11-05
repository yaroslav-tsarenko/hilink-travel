import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import type { Camp } from '@/constants/camps';
import CampMedia from './CampMedia';
import FavoriteButton from './FavoriteButton';

const diffColor = { Easy: 'bg-green-10 text-green-60', Moderate: 'bg-yellow-50/20 text-[#9A7600]', Hard: 'bg-orange-10 text-orange-50' } as const;

export default function CampCard({ camp }: { camp: Camp }) {
  return (
    <Link href={`/camps/${camp.slug}`} className="card group flex h-full flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative">
        <CampMedia camp={camp} className="aspect-[4/3] transition duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 92vw, 380px" />
        <FavoriteButton slug={camp.slug} name={camp.name} className="absolute right-4 top-4" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-bold backdrop-blur">{camp.terrain}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flexBetween gap-3">
          <h3 className="bold-20">{camp.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-[14px] font-bold">
            <Star className="h-4 w-4 fill-yellow-50 text-yellow-50" /> {camp.rating}
          </span>
        </div>
        <p className="regular-14 flex items-center gap-1.5 text-gray-30">
          <MapPin className="h-4 w-4" /> {camp.location}, {camp.country}
        </p>
        <div className="mt-auto flexBetween border-t border-gray-10 pt-4">
          <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${diffColor[camp.difficulty]}`}>{camp.difficulty} · {camp.duration}</span>
          <p className="text-[14px] text-gray-30">
            <span className="bold-20 text-gray-90">${camp.price}</span> / night
          </p>
        </div>
      </div>
    </Link>
  );
}
