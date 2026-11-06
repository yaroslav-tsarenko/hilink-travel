import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import TripPlanner from '@/components/TripPlanner';
import FaqList from '@/components/FaqList';
import { SectionHead } from '@/components/ui/Bits';

export const metadata: Metadata = {
  title: 'How it works',
  description: 'How a guided Wildway trip works, from choosing a route to the last pitch. Try the three-question trip planner.',
};

const STEPS = [
  { title: 'Choose a route', text: 'Filter the ten routes by landscape, grade and length, or use the planner below. Each trip page lists the stages, the camps and exactly what is included.', meta: 'Online, 10 minutes' },
  { title: 'Request a place', text: 'Pick a start date and group size. Nothing is charged at this point; your guide checks that the route suits you and confirms within a day.', meta: 'Reply within 24 h' },
  { title: 'Prepare together', text: 'A short call about fitness, food and kit. You get the route pack — printable maps, GPX, water sources and bail-out points — and rent anything you are missing.', meta: '2–4 weeks before' },
  { title: 'Walk and camp', text: 'Five to seven hours on foot a day at a steady pace, a legal pitch every night, and everything carried out. Guides change the plan when the weather does.', meta: 'On the trail' },
];

const GRADES = [
  { name: 'Easy', text: 'Paths all the way, 4–6 hours a day, light pack. Fine for a first multi-day trip with reasonable fitness.' },
  { name: 'Moderate', text: 'Longer days, some steep ground and river fords, full pack on some stages. You should be comfortable walking two days in a row.' },
  { name: 'Hard', text: 'Trackless or exposed terrain, heavy packs and serious weather. We ask about one previous multi-day trip before confirming.' },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        label="How it works"
        title="From first question to last pitch"
        text="Wildway trips are small, guided and planned around the weather. Here is what happens between clicking a route and walking out at the other end."
        crumbs={[{ label: 'How it works' }]}
        seed={5}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#planner" className="btn btn-primary btn-lg">
            Try the trip planner
          </Link>
          <Link href="/camps" className="btn btn-outline btn-lg">
            Browse trips
          </Link>
        </div>
      </PageHeader>

      <section className="wrap section">
        <ol className="border-t border-ink/20">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal className="grid gap-4 border-b border-ink/20 py-8 md:grid-cols-12 md:gap-8 lg:py-10">
                <span className="t-num font-serif text-[3rem] font-[350] leading-none text-pine md:col-span-2 lg:text-[4rem]">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="t-h3 md:col-span-4">{s.title}</h2>
                <div className="md:col-span-6">
                  <p className="text-[1.0625rem] leading-relaxed">{s.text}</p>
                  <p className="mt-3 text-[0.875rem] font-semibold text-ember-ink">{s.meta}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-ink/10 bg-sand-50">
        <div className="wrap section">
          <SectionHead label="Grades" title="How hard is hard?" text="Every route has one of three grades. If you are between two, talk to us: the guide will be honest about whether a route suits you." />
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {GRADES.map((g, i) => (
              <li key={g.name} className="border-t-2 border-pine pt-5">
                <p className="flex items-center gap-3">
                  <span className="flex items-end gap-[3px]" aria-hidden>
                    {[0, 1, 2].map((k) => (
                      <span key={k} className={`w-[6px] rounded-[1px] ${k <= i ? 'bg-pine' : 'bg-pine/20'}`} style={{ height: 8 + k * 5 }} />
                    ))}
                  </span>
                  <span className="t-h4">{g.name}</span>
                </p>
                <p className="mt-3 text-ink-soft">{g.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <SectionHead label="Planner" title="Not sure where to go? Answer three questions." className="mb-12" />
        <TripPlanner />
      </section>

      <section className="wrap grid gap-12 pb-20 lg:grid-cols-12 lg:pb-28">
        <div className="lg:col-span-4">
          <p className="t-label">Questions</p>
          <h2 className="t-h2 mt-4">Before you book</h2>
          <p className="mt-4 text-ink-soft">Still unsure about something? We reply within one working day.</p>
          <Link href="/contact" className="btn btn-outline mt-6">
            Ask a guide
          </Link>
        </div>
        <div className="lg:col-span-8">
          <FaqList />
        </div>
      </section>
    </>
  );
}
