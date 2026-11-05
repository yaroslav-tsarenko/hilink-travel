import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/Button';
import { PRESS } from '@/constants/content';

export const metadata: Metadata = { title: 'Press releases', description: 'News, announcements and media resources from Hilink.' };

export default function PressPage() {
  return (
    <>
      <PageHeader eyebrow="Press" title="Hilink in the news" text="Latest announcements and coverage. For interviews and media kits, contact our press team." crumbs={[{ label: 'Press' }]}>
        <Button title="Contact press team" variant="btn_dark_green" href="/contact" />
      </PageHeader>
      <section className="max-container padding-container pb-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {PRESS.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={(i % 2) * 0.08} className="card group flex h-full flex-col gap-4 p-8 transition hover:-translate-y-1 hover:border-green-50 hover:shadow-xl">
                <span className="eyebrow">{p.outlet} · {p.date}</span>
                <h2 className="bold-24 group-hover:text-green-50">{p.title}</h2>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
