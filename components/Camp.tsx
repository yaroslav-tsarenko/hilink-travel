'use client';

import { PEOPLE_URL } from '@/constants';
import { CAMPS } from '@/constants/camps';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Reveal from './ui/Reveal';

const featured = CAMPS.filter((c) => c.photo);

const CampSite = ({ slug, photo, title, subtitle, peopleJoined }: { slug: string; photo: string; title: string; subtitle: string; peopleJoined: string }) => (
  <Link href={`/camps/${slug}`} className="group relative h-full w-full min-w-[85vw] shrink-0 snap-start overflow-hidden lg:min-w-[1100px] lg:rounded-r-5xl 2xl:rounded-5xl">
    <Image src={photo} alt={title} fill sizes="(max-width: 1024px) 85vw, 1100px" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
    <div className="relative flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
      <div className="flexCenter gap-4">
        <div className="rounded-full bg-green-50 p-4">
          <Image src="/folded-map.svg" alt="" width={28} height={28} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="bold-18 text-white">{title}</h3>
          <p className="regular-14 text-white">{subtitle}</p>
        </div>
      </div>
      <div className="flex w-full items-end justify-between gap-6">
        <div className="flexCenter gap-6">
          <span className="flex -space-x-4 overflow-hidden">
            {PEOPLE_URL.map((url) => (
              <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={url} key={url} alt="" width={52} height={52} />
            ))}
          </span>
          <p className="bold-16 md:bold-20 text-white">{peopleJoined}</p>
        </div>
        <span className="hidden items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-[14px] font-bold text-gray-90 backdrop-blur transition group-hover:bg-green-50 group-hover:text-white sm:flex">
          Explore camp <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  </Link>
);

const Camp = () => {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * Math.min(1100, window.innerWidth * 0.85), behavior: 'smooth' });

  return (
    <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
      <div ref={track} className="hide-scrollbar flex h-[340px] w-full snap-x snap-mandatory items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        {featured.map((c) => (
          <CampSite key={c.slug} slug={c.slug} photo={c.photo!} title={c.name} subtitle={c.location} peopleJoined={`${c.joined}+ Joined`} />
        ))}
      </div>

      <div className="padding-container mt-6 flex gap-3 relative z-10">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous camp" className="grid h-12 w-12 place-items-center rounded-full border border-gray-10 bg-white shadow-sm transition hover:bg-green-50 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next camp" className="grid h-12 w-12 place-items-center rounded-full border border-gray-10 bg-white shadow-sm transition hover:bg-green-50 hover:text-white">
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flexEnd mt-10 px-6 lg:-mt-60 lg:mr-6">
        <Reveal className="relative w-full overflow-hidden rounded-3xl bg-green-50 p-8 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-16 xl:py-20">
          <h2 className="regular-24 md:regular-32 2xl:regular-64 capitalize text-white">
            <strong>Feeling Lost</strong> And Not Knowing The Way?
          </h2>
          <p className="regular-14 xl:regular-16 mt-5 text-white">
            Starting from the anxiety of the climbers when visiting a new climbing location, the possibility of getting lost is very large. That&apos;s why we are here for those of you who want to start an adventure
          </p>
          <Link href="/how-it-works" className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-green-50 transition hover:gap-3">
            See how it works <ArrowRight className="h-4 w-4" />
          </Link>
          <Image src="/quote.svg" alt="" width={186} height={219} className="camp-quote" />
        </Reveal>
      </div>
    </section>
  );
};

export default Camp;
