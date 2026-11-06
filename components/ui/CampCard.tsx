import Image from 'next/image';
import Link from 'next/link';
import type { Camp } from '@/constants/camps';
import FavoriteButton from './FavoriteButton';
import { Grade, eur } from './Bits';

export default function CampCard({ camp, size = 'md', priority = false }: { camp: Camp; size?: 'md' | 'lg'; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className={`relative overflow-hidden rounded-card bg-sand-200 ${size === 'lg' ? 'aspect-[4/3] lg:aspect-[5/4]' : 'aspect-[4/3] sm:aspect-[4/5]'}`}>
        <Image
          src={camp.photo}
          alt={camp.photoAlt}
          fill
          priority={priority}
          sizes={size === 'lg' ? '(max-width: 1024px) 92vw, 640px' : '(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 420px'}
          className="object-cover transition duration-[900ms] ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3">
          <span className="rounded-[4px] bg-ink/75 px-2 py-1 text-[0.75rem] font-semibold tracking-[0.04em] text-sand-50">{camp.terrain}</span>
          <FavoriteButton slug={camp.slug} name={camp.name} className="relative z-10" />
        </div>
        {camp.spotsLeft <= 3 && (
          <span className="absolute bottom-3 left-3 rounded-[4px] bg-sand-50 px-2 py-1 text-[0.75rem] font-semibold text-ember-ink">
            {camp.spotsLeft} {camp.spotsLeft === 1 ? 'place' : 'places'} left
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="t-meta">
          {camp.region}, {camp.country}
        </p>
        <h3 className={`mt-1 font-serif leading-[1.1] tracking-[-0.01em] ${size === 'lg' ? 'text-[2rem]' : 'text-[1.5rem]'}`}>
          <Link href={`/camps/${camp.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {camp.name}
          </Link>
        </h3>
        {size === 'lg' && <p className="t-lead mt-3 max-w-[48ch]">{camp.summary}</p>}
        <dl className="t-num mt-4 grid grid-cols-3 gap-3 border-t border-ink/15 pt-3 text-[0.875rem]">
          <div>
            <dt className="sr-only">Duration</dt>
            <dd>{camp.days} days</dd>
          </div>
          <div>
            <dt className="sr-only">Distance</dt>
            <dd>{camp.km} km</dd>
          </div>
          <div>
            <dt className="sr-only">Ascent</dt>
            <dd>+{camp.ascent.toLocaleString('en-GB')} m</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-[0.875rem]">
          <span className="text-ink-soft">
            <Grade level={camp.difficulty} />
          </span>
          <span className="text-ink-soft">
            from <span className="t-num font-serif text-[1.25rem] text-ink">{eur(camp.price)}</span> / night
          </span>
        </div>
      </div>
    </article>
  );
}
