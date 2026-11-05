import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import TripPlanner from '@/components/TripPlanner';
import FaqList from '@/components/FaqList';
import GetApp from '@/components/GetApp';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'How Hilink works',
  description: 'Pick a camp, download the offline map, invite friends and follow AR guidance to the summit. Try the interactive trip planner.',
};

const STEPS = [
  { n: '01', title: 'Find your camp', text: 'Browse 1,200+ partner camps by terrain, difficulty and budget — or let the planner choose for you.', icon: '/location.svg' },
  { n: '02', title: 'Download the map', text: 'Save the trail with contour lines and water sources. It works with zero signal.', icon: '/map.svg' },
  { n: '03', title: 'Invite your crew', text: 'Create a group trip, vote on dates and share one schedule with everyone.', icon: '/calendar.svg' },
  { n: '04', title: 'Follow the arrows', text: 'Point your camera at the trail and AR guidance shows the way to the top.', icon: '/tech.svg' },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader eyebrow="How it works" title="From couch to summit in four steps" text="Hilink takes the anxiety out of new places. Plan, download and go — we will keep you on the trail." crumbs={[{ label: 'How it works' }]}>
        <div className="flex flex-wrap gap-3">
          <Button title="Plan a trip" variant="btn_green" href="#planner" />
          <Button title="Browse camps" variant="btn_outline" href="/camps" />
        </div>
      </PageHeader>

      <section className="max-container padding-container pb-24">
        <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.08} className="card group relative h-full overflow-hidden p-8 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="bold-64 absolute -right-2 -top-4 text-gray-10 transition group-hover:text-green-10">{s.n}</span>
                <div className="relative grid h-14 w-14 place-items-center rounded-full bg-green-50 transition group-hover:rotate-[-10deg]">
                  <Image src={s.icon} alt="" width={26} height={26} />
                </div>
                <h3 className="bold-20 relative mt-6">{s.title}</h3>
                <p className="regular-16 relative mt-3 text-gray-30">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-container padding-container pb-24">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">Interactive</p>
          <h2 className="bold-40 lg:bold-52">Not sure where to go? Answer three questions.</h2>
        </Reveal>
        <TripPlanner />
      </section>

      <section className="max-container padding-container grid gap-12 pb-24 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="bold-40">Questions, answered</h2>
          <p className="regular-16 mt-4 text-gray-30">Still curious? Our team replies within a day.</p>
          <div className="mt-6"><Button title="Contact us" variant="btn_dark_green" href="/contact" /></div>
        </Reveal>
        <FaqList />
      </section>

      <GetApp />
    </>
  );
}
