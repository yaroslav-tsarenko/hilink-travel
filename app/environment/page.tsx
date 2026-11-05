import type { Metadata } from 'next';
import { Leaf, Recycle, Sprout } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import CarbonCalculator from '@/components/CarbonCalculator';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = { title: 'Environment', description: 'Hilink plants a tree for every completed trip and works with camps that protect the places we love.' };

const PILLARS = [
  { icon: Sprout, title: 'A tree for every trip', text: 'Every completed trip in the app plants a tree with our reforestation partners.' },
  { icon: Leaf, title: 'Leave-no-trace camps', text: 'Partner camps commit to waste sorting, water protection and trail maintenance.' },
  { icon: Recycle, title: 'Gear that lasts', text: 'Rental gear is repaired, not replaced — keeping thousands of tents out of landfill.' },
];

export default function EnvironmentPage() {
  return (
    <>
      <PageHeader eyebrow="Environment" title="Keep wild places wild" text="Adventure and responsibility go together. Here is how we — and you — can travel lighter." crumbs={[{ label: 'Environment' }]} />
      <section className="max-container padding-container pb-24">
        <ul className="grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="card h-full p-8">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-green-10 text-green-50"><Icon className="h-7 w-7" /></span>
                <h2 className="bold-20 mt-6">{title}</h2>
                <p className="regular-16 mt-3 text-gray-30">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <section className="max-container padding-container pb-24">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">Calculator</p>
          <h2 className="bold-40 lg:bold-52">What does your trip cost the planet?</h2>
        </Reveal>
        <CarbonCalculator />
      </section>
    </>
  );
}
