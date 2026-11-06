import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import { PRESS } from '@/constants/content';
import { CONTACT } from '@/constants';

export const metadata: Metadata = { title: 'Press', description: 'Coverage, announcements and media contacts.' };

export default function PressPage() {
  return (
    <>
      <PageHeader label="Press" title="In print and online" text="Coverage and announcements. Publications listed here are fictional, as this is a concept project." crumbs={[{ label: 'Press' }]} seed={53}>
        <Link href="/contact" className="btn btn-outline btn-lg">
          Contact the press desk
        </Link>
      </PageHeader>
      <section className="wrap section">
        <ul className="border-t border-ink/20">
          {PRESS.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.04} className="grid gap-3 border-b border-ink/20 py-8 md:grid-cols-12 md:gap-8">
                <p className="text-[0.9375rem] md:col-span-3">
                  <span className="block font-semibold">{p.outlet}</span>
                  <span className="t-num text-ink-soft">{p.date}</span>
                </p>
                <h2 className="t-h3 md:col-span-9">{p.title}</h2>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-ink-soft">
          Media kit and photography on request: <a href={`mailto:${CONTACT.email}`} className="link">{CONTACT.email}</a>
        </p>
      </section>
    </>
  );
}
