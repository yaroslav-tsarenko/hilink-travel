import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import GearCalculator from '@/components/GearCalculator';
import GetApp from '@/components/GetApp';
import Button from '@/components/Button';
import { SERVICES } from '@/constants/content';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Offline maps, AR navigation, trip scheduling, camp booking, gear rental and certified local guides.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Everything for the trail, in one app" text="From the first idea to the last campfire — maps, bookings, gear and people who know the mountains." crumbs={[{ label: 'Services' }]} />

      <section className="max-container padding-container pb-24">
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.id} id={s.id} className="scroll-mt-28">
              <Reveal delay={(i % 3) * 0.08} className="card group h-full p-8 transition duration-500 hover:-translate-y-1.5 hover:border-green-50 hover:shadow-xl">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-green-50 transition duration-500 group-hover:scale-110 group-hover:rotate-[-8deg]">
                  <Image src={s.icon} alt="" width={30} height={30} />
                </div>
                <h2 className="bold-24 mt-6">{s.title}</h2>
                <p className="regular-16 mt-3 text-gray-30">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-container padding-container pb-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Gear rental</p>
            <h2 className="bold-40 lg:bold-52">Travel light. We have the gear.</h2>
            <p className="regular-16 mt-4 text-gray-30">Build your kit and see the price instantly. Everything is waiting for you at the camp.</p>
          </div>
          <Button title="See pricing plans" variant="btn_outline" href="/pricing" />
        </Reveal>
        <GearCalculator />
      </section>

      <GetApp />
    </>
  );
}
