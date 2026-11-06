import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GUIDES, GUIDES_TEAM } from '@/constants/content';
import Reveal from '@/components/ui/Reveal';
import ReadingProgress from '@/components/ReadingProgress';
import ShareButtons from '@/components/ShareButtons';
import { Avatar } from '@/components/ui/Bits';

export const dynamicParams = false;
export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  return g ? { title: g.title, description: g.excerpt, openGraph: { images: [g.photo] } } : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();
  const more = GUIDES.filter((g) => g.slug !== slug).slice(0, 3);
  const author = GUIDES_TEAM.find((p) => p.name === guide.author);

  return (
    <>
      <ReadingProgress />
      <article className="pb-20 pt-8 lg:pb-28 lg:pt-10">
        <div className="wrap">
          <Link href="/guides" className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Journal
          </Link>
          <header className="mx-auto mt-12 max-w-[820px] text-center lg:mt-16">
            <p className="t-label">
              {guide.category} · {guide.readTime} read
            </p>
            <h1 className="t-h1 mt-6">{guide.title}</h1>
            <p className="t-lead mx-auto mt-6 max-w-[56ch]">{guide.excerpt}</p>
          </header>
        </div>

        <div className="wrap mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-card lg:aspect-[21/9]">
            <Image src={guide.photo} alt={guide.photoAlt} fill priority sizes="(max-width: 1360px) 100vw, 1360px" className="object-cover" />
          </div>
        </div>

        <div className="wrap">
          <div className="mx-auto mt-10 flex max-w-[680px] flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-6">
            <span className="flex items-center gap-3">
              <Avatar name={guide.author} size={44} />
              <span>
                <span className="block font-semibold">{guide.author}</span>
                <span className="text-[0.875rem] text-ink-soft">
                  {author?.role ?? 'Wildway guide'} · {guide.date}
                </span>
              </span>
            </span>
            <ShareButtons title={guide.title} />
          </div>

          <div className="mx-auto mt-10 flex max-w-[680px] flex-col gap-10">
            {guide.body.map((b, i) => (
              <Reveal key={b.heading}>
                <h2 className="t-h3">
                  <span className="t-num mr-3 text-ember-ink">{String(i + 1).padStart(2, '0')}</span>
                  {b.heading}
                </h2>
                <p className={`mt-4 text-[1.125rem] leading-[1.75] ${i === 0 ? 'first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-[3.6rem] first-letter:leading-[0.9] first-letter:text-pine' : ''}`}>{b.text}</p>
              </Reveal>
            ))}

            <aside className="mt-4 rounded-card bg-pine p-8 text-sand-50 lg:p-10">
              <p className="t-label text-sand-50/75">Put it into practice</p>
              <p className="mt-4 font-serif text-[1.75rem] leading-tight">Our Easy routes are made for first trips.</p>
              <Link href="/camps" className="btn btn-light mt-6">
                See Easy routes <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t border-ink/10 bg-sand-50">
        <div className="wrap py-16 lg:py-20">
          <h2 className="t-h2">Keep reading</h2>
          <ul className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">
            {more.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-card">
                    <Image src={g.photo} alt={g.photoAlt} fill sizes="(max-width: 768px) 92vw, 420px" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <p className="t-label mt-5">{g.category}</p>
                  <h3 className="mt-2 font-serif text-[1.375rem] leading-[1.2] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{g.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
