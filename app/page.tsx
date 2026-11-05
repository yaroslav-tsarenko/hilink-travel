import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, MessageCircle } from 'lucide-react';
import Camp from '@/components/Camp';
import Features from '@/components/Features';
import GetApp from '@/components/GetApp';
import Guide from '@/components/Guide';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import CampCard from '@/components/ui/CampCard';
import Reveal from '@/components/ui/Reveal';
import Landscape from '@/components/ui/Landscape';
import { CAMPS } from '@/constants/camps';
import { POSTS } from '@/constants/content';

export default function Home() {
  const popular = [...CAMPS].sort((a, b) => b.reviews - a.reviews).slice(0, 3);
  return (
    <>
      <Hero />
      <Camp />
      <Guide />
      <Stats />
      <Features />

      <section className="max-container padding-container py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-3">Most loved</p>
            <h2 className="bold-40 lg:bold-52">Popular camps this season</h2>
          </Reveal>
          <Link href="/camps" className="inline-flex items-center gap-2 font-bold text-green-50 transition hover:gap-3">
            Explore all camps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {popular.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <CampCard camp={c} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-5 py-24">
        <div className="max-container padding-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow mb-3">Community</p>
              <h2 className="bold-40 lg:bold-52">Stories from the trail</h2>
            </Reveal>
            <Link href="/community" className="inline-flex items-center gap-2 font-bold text-green-50 transition hover:gap-3">
              Join the community <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {POSTS.slice(0, 3).map((p, i) => (
              <li key={p.id}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Link href="/community" className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                    <Landscape palette={p.palette} className="aspect-[16/9] w-full transition duration-700 group-hover:scale-105" />
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <span className="flex items-center gap-3">
                        <Image src={p.avatar} alt="" width={36} height={36} className="rounded-full" />
                        <span>
                          <span className="bold-16 block">{p.author}</span>
                          <span className="regular-14 text-gray-30">at {p.camp}</span>
                        </span>
                      </span>
                      <p className="regular-16 text-gray-50">{p.text}</p>
                      <span className="mt-auto flex gap-5 pt-2 text-[14px] font-semibold text-gray-30">
                        <span className="flex items-center gap-1.5"><Heart className="h-4 w-4" /> {p.likes}</span>
                        <span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> {p.comments}</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-24">
        <GetApp />
      </div>
    </>
  );
}
