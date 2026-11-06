import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Topo from './Topo';

type Props = {
  label?: string;
  title: ReactNode;
  text?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  photo?: { src: string; alt: string };
  seed?: number;
};

export default function PageHeader({ label, title, text, crumbs, children, photo, seed = 7 }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <Topo seed={seed} className="pointer-events-none absolute -right-24 top-0 h-full w-[70%] text-pine/[0.13]" rings={12} />
      <div className={`wrap relative grid gap-10 pb-14 pt-8 lg:pb-20 lg:pt-12 ${photo ? 'lg:grid-cols-12 lg:items-end' : ''}`}>
        <div className={photo ? 'lg:col-span-7' : ''}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-10 text-[0.8125rem] text-ink-soft lg:mb-14">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-ink hover:underline">
                    Wildway
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <span aria-hidden className="text-ink/30">/</span>
                    {c.href ? (
                      <Link href={c.href} className="hover:text-ink hover:underline">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ink">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {label && <p className="t-label mb-5">{label}</p>}
          <h1 className="t-h1 max-w-[16ch]">{title}</h1>
          {text && <p className="t-lead mt-6 max-w-[56ch]">{text}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {photo && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:col-span-5">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 1024px) 92vw, 520px" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
