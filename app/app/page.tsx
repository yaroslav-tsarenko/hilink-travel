import type { Metadata } from 'next';
import Image from 'next/image';
import { Star } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import PhoneDemo from '@/components/PhoneDemo';
import GetApp from '@/components/GetApp';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = { title: 'Get the app', description: 'Download Hilink for iOS and Android. Offline maps, AR guidance and group trip planning.' };

const REVIEWS = [
  { name: 'Maya L.', text: 'The only app I trust when the signal disappears.', avatar: '/person-2.png' },
  { name: 'Rizky P.', text: 'AR arrows in the fog felt like magic. Saved our summit day.', avatar: '/person-3.png' },
  { name: 'Dewi A.', text: 'Planning with friends is finally not a 200-message group chat.', avatar: '/person-4.png' },
];

export default function AppPage() {
  return (
    <>
      <PageHeader eyebrow="Hilink app" title="Your guide in every pocket" text="Tap the features to see the app in action. Free on iOS and Android." crumbs={[{ label: 'App' }]} />
      <section className="max-container padding-container pb-24">
        <PhoneDemo />
      </section>
      <section className="max-container padding-container pb-24">
        <ul className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <li key={r.name}>
              <Reveal delay={i * 0.08} className="card h-full p-8">
                <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-yellow-50 text-yellow-50" />)}</span>
                <p className="regular-18 mt-4">“{r.text}”</p>
                <span className="mt-6 flex items-center gap-3">
                  <Image src={r.avatar} alt="" width={36} height={36} className="rounded-full" />
                  <span className="bold-16">{r.name}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <div id="download" className="scroll-mt-24">
        <GetApp />
      </div>
    </>
  );
}
