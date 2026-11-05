import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Reveal from './Reveal';

export default function PageHeader({ eyebrow, title, text, crumbs, children }: { eyebrow?: string; title: ReactNode; text?: ReactNode; crumbs?: { label: string; href?: string }[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-pattern-2 bg-cover bg-center opacity-60" aria-hidden />
      <div className="max-container padding-container relative pb-16 pt-10 lg:pb-24 lg:pt-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="regular-14 mb-8 flex flex-wrap items-center gap-2 text-gray-30">
            <Link href="/" className="hover:text-green-50">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.href ? <Link href={c.href} className="hover:text-green-50">{c.label}</Link> : <span className="text-gray-90">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <Reveal className="relative max-w-3xl">
          <Image src="/camp.svg" alt="" width={50} height={50} className="absolute -top-7 left-[-5px] w-10 lg:w-[50px]" />
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="bold-40 lg:bold-64">{title}</h1>
          {text && <p className="regular-16 lg:regular-18 mt-6 max-w-2xl text-gray-30">{text}</p>}
        </Reveal>
        {children && <Reveal delay={0.1} className="mt-10">{children}</Reveal>}
      </div>
    </section>
  );
}
