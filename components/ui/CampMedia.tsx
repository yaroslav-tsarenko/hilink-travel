import Image from 'next/image';
import type { Camp } from '@/constants/camps';
import Landscape from './Landscape';

export default function CampMedia({ camp, className = '', sizes = '400px', priority = false }: { camp: Camp; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {camp.photo ? (
        <Image src={camp.photo} alt={camp.name} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <Landscape palette={camp.palette} title={camp.name} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
