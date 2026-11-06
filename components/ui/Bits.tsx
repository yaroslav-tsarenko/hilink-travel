import type { Difficulty } from '@/constants/camps';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

const LEVEL: Record<Difficulty, number> = { Easy: 1, Moderate: 2, Hard: 3 };

/** Difficulty as three rising bars, like a signal meter on a trail sign. */
export function Grade({ level, tone = 'dark', showLabel = true }: { level: Difficulty; tone?: 'dark' | 'light'; showLabel?: boolean }) {
  const n = LEVEL[level];
  const on = tone === 'light' ? 'bg-sand-50' : 'bg-pine';
  const off = tone === 'light' ? 'bg-sand-50/30' : 'bg-pine/20';
  return (
    <span className="inline-flex items-center gap-2" title={`Grade: ${level}`}>
      <span className="flex items-end gap-[3px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`w-[5px] rounded-[1px] ${i < n ? on : off}`} style={{ height: 6 + i * 4 }} />
        ))}
      </span>
      {showLabel ? <span>{level}</span> : <span className="sr-only">{level}</span>}
    </span>
  );
}

export function Avatar({ name, size = 40, tone = 'pine' }: { name: string; size?: number; tone?: 'pine' | 'sand' | 'ember' }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
  const cls = tone === 'pine' ? 'bg-pine text-sand-50' : tone === 'ember' ? 'bg-ember-tint text-ember-ink' : 'bg-sand-200 text-pine';
  return (
    <span aria-hidden className={`inline-grid shrink-0 place-items-center rounded-full font-serif font-[500] ${cls}`} style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {initials}
    </span>
  );
}

/** Section heading with a running number, as in a printed trail journal. */
export function SectionHead({ index, label, title, text, href, linkLabel, tone = 'dark', className = '' }: { index?: string; label: string; title: ReactNode; text?: ReactNode; href?: string; linkLabel?: string; tone?: 'dark' | 'light'; className?: string }) {
  const light = tone === 'light';
  return (
    <div className={`grid gap-6 border-t pt-6 lg:grid-cols-12 lg:gap-10 ${light ? 'border-sand-50/25' : 'border-ink/20'} ${className}`}>
      <p className={`t-label flex gap-3 lg:col-span-3 ${light ? 'text-sand-50/80' : ''}`}>
        {index && <span className="t-num">{index}</span>}
        <span>{label}</span>
      </p>
      <div className="lg:col-span-9">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className={`t-h2 max-w-[18ch] ${light ? 'text-sand-50' : ''}`}>{title}</h2>
          {href && linkLabel && (
            <Link href={href} className={light ? 'inline-flex items-center gap-1.5 font-semibold text-sand-50 underline decoration-sand-50/40 underline-offset-[5px] hover:decoration-sand-50' : 'link'}>
              {linkLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
        {text && <p className={`t-lead mt-5 max-w-[62ch] ${light ? 'text-sand-50/80' : ''}`}>{text}</p>}
      </div>
    </div>
  );
}

export function Stat({ label, value, tone = 'dark' }: { label: string; value: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <div>
      <dt className={`text-[0.75rem] font-medium uppercase tracking-[0.12em] ${tone === 'light' ? 'text-sand-50/75' : 'text-ink-soft'}`}>{label}</dt>
      <dd className={`t-num mt-1.5 font-serif text-[1.375rem] leading-none ${tone === 'light' ? 'text-sand-50' : 'text-ink'}`}>{value}</dd>
    </div>
  );
}

export const eur = (n: number) => `€${n.toLocaleString('en-GB')}`;
