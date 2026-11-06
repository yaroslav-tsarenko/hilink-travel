import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import CarbonCalculator from '@/components/CarbonCalculator';
import Reveal from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/Bits';

export const metadata: Metadata = { title: 'Environment', description: 'How Wildway keeps camps legal and invisible, and what your journey to the trailhead costs the climate.' };

const PILLARS = [
  { title: 'Only legal pitches', text: 'We camp under the right to roam where it exists, and at designated sites everywhere else. Every trip page says which applies.' },
  { title: 'Groups of ten or fewer', text: 'Small groups spread less, need fewer pitches and leave the place quieter for the next people.' },
  { title: 'Everything carried out', text: 'Food waste, packaging and, where the rules require it, human waste. Guides carry the bags.' },
  { title: 'Rail first', text: 'Trip notes start with train and coach connections. Six of ten trailheads are reachable without a flight from somewhere in Europe.' },
];

export default function EnvironmentPage() {
  return (
    <>
      <PageHeader label="Environment" title="Leave the place as you found it" text="The routes only stay wild if the people walking them keep their impact close to zero. These are the rules we work by." crumbs={[{ label: 'Environment' }]} photo={{ src: '/photos/pack-summit.webp', alt: 'A backpack on a rock above a forested mountain valley' }} seed={37} />
      <section className="wrap section">
        <ul className="grid gap-x-10 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="border-t border-ink/20">
              <Reveal delay={(i % 2) * 0.06} className="grid grid-cols-[3rem_1fr] gap-2 pb-10 pt-6">
                <span className="t-num pt-1 text-[0.8125rem] font-semibold text-ember-ink">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="t-h3">{p.title}</h2>
                  <p className="mt-3 max-w-[46ch] text-ink-soft">{p.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-ink/10 bg-sand-100">
        <div className="wrap section">
          <SectionHead label="Calculator" title="What does getting there cost?" text="For most trips, the journey to the trailhead is the largest part of the footprint. Compare ways of getting there." />
          <div className="mt-12">
            <CarbonCalculator />
          </div>
        </div>
      </section>
    </>
  );
}
