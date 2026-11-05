import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { GUIDES } from '@/constants/content';
import Landscape from '@/components/ui/Landscape';
import Reveal from '@/components/ui/Reveal';
import ReadingProgress from '@/components/ReadingProgress';
import ShareButtons from '@/components/ShareButtons';

export const dynamicParams = false;
export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  return g ? { title: g.title, description: g.excerpt } : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();
  const more = GUIDES.filter((g) => g.slug !== slug).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <article className="max-container padding-container pb-24 pt-8">
        <Link href="/guides" className="mb-8 inline-flex items-center gap-2 font-bold text-gray-50 hover:text-green-50">
          <ArrowLeft className="h-4 w-4" /> All guides
        </Link>
        <header className="mx-auto max-w-3xl">
          <p className="eyebrow mb-4">{guide.category} · {guide.readTime} read</p>
          <h1 className="bold-40 lg:bold-52">{guide.title}</h1>
          <p className="regular-18 mt-6 text-gray-30">{guide.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-gray-10 py-5">
            <span className="flex items-center gap-3">
              <Image src={guide.author.avatar} alt="" width={44} height={44} className="rounded-full" />
              <span>
                <span className="bold-16 block">{guide.author.name}</span>
                <span className="regular-14 text-gray-30">{guide.date}</span>
              </span>
            </span>
            <ShareButtons title={guide.title} />
          </div>
        </header>
        <Landscape palette={guide.palette} className="mx-auto my-12 aspect-[21/9] w-full max-w-5xl rounded-5xl" />
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {guide.body.map((b, i) => (
            <Reveal key={b.heading}>
              <h2 className="bold-32 mb-4"><span className="mr-3 text-green-50">{String(i + 1).padStart(2, '0')}</span>{b.heading}</h2>
              <p className="regular-18 leading-relaxed text-gray-50">{b.text}</p>
            </Reveal>
          ))}
          <div className="rounded-5xl bg-green-50 p-8 text-white lg:p-12">
            <h2 className="bold-32">Ready to try it?</h2>
            <p className="regular-16 mt-3">Pick a camp and download the offline map before you go.</p>
            <Link href="/camps" className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-bold text-green-50 transition hover:-translate-y-0.5">Find a camp</Link>
          </div>
        </div>
      </article>
      <section className="max-container padding-container pb-24">
        <h2 className="bold-32 mb-8">Keep reading</h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {more.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                <Landscape palette={g.palette} className="aspect-[16/10] w-full" />
                <div className="p-6">
                  <span className="eyebrow">{g.category}</span>
                  <h3 className="bold-18 mt-2 group-hover:text-green-50">{g.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
