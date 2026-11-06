import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FieldCompanion from '@/components/FieldCompanion';
import PlanCta from '@/components/PlanCta';
import { SectionHead } from '@/components/ui/Bits';

export const metadata: Metadata = { title: 'Field app', description: 'Offline maps, elevation, forecasts and group notes for every Wildway trip.' };

const NOTES = [
  { title: 'Works with no signal', text: 'Maps, tracks and notes are downloaded with the route pack. Your position comes from GPS, which does not need mobile data.' },
  { title: 'Paper is the backup', text: 'Every route pack also prints on two A4 sheets. Guides carry paper maps and a compass on every trip.' },
  { title: 'Light on battery', text: 'In flight mode with the screen off between checks, a phone lasts a long weekend. Members can borrow a power bank.' },
];

export default function AppPage() {
  return (
    <>
      <PageHeader label="Field app" title="The route in your pocket" text="Each trip comes with a route pack for the Wildway field app. Select a feature to see what it shows on the trail. (Interactive demo.)" crumbs={[{ label: 'Field app' }]} seed={31} />
      <section className="wrap section">
        <FieldCompanion />
      </section>
      <section className="border-t border-ink/10 bg-sand-50">
        <div className="wrap section">
          <SectionHead label="In the field" title="Designed for wet hands and cold batteries" />
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {NOTES.map((n) => (
              <li key={n.title} className="border-t-2 border-pine pt-5">
                <h3 className="t-h4">{n.title}</h3>
                <p className="mt-3 text-ink-soft">{n.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div id="download" className="scroll-mt-24 pt-20 lg:pt-28">
        <PlanCta title="Route packs come with every trip" text="Book any trip and the route pack is added to your account the same day. Members can download packs for every route." />
      </div>
    </>
  );
}
