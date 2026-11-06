import { CONTACT, FOOTER_LINKS } from '@/constants';
import Link from 'next/link';
import Newsletter from './Newsletter';
import Logo from './ui/Logo';
import Topo from './ui/Topo';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pine text-sand-50">
      <Topo seed={41} className="pointer-events-none absolute inset-0 h-full w-full text-sand-50/[0.07]" summits={4} rings={14} />
      <div className="wrap relative">
        <div className="grid gap-12 border-b border-sand-50/20 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <p className="t-label text-sand-50/75">The Trail Letter</p>
            <h2 className="t-h2 mt-5 max-w-[16ch]">One route, one forecast, one good read. Fridays.</h2>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Newsletter />
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Wildway home">
              <Logo tone="light" />
            </Link>
            <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-sand-50/80">Guided hiking and wild-camping trips in small groups, on routes we know well.</p>
            <p className="mt-5 text-[0.9375rem] text-sand-50/80">
              <a href={`mailto:${CONTACT.email}`} className="underline decoration-sand-50/40 underline-offset-4 hover:decoration-sand-50">
                {CONTACT.email}
              </a>
              <br />
              {CONTACT.base}
            </p>
          </div>
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="t-label text-sand-50/70">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sand-50/90 hover:text-sand-50 hover:underline hover:underline-offset-4">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-sand-50/20 py-8 text-[0.8125rem] text-sand-50/75 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[78ch]">
            Wildway is a concept project designed and built by Yaroslav Tsarenko. Trips, prices, availability, people and reviews are demo data; route descriptions refer to real places. Photography from Unsplash contributors, credited in the README.
          </p>
          <ul className="flex shrink-0 gap-6">
            <li>
              <Link href="/privacy" className="hover:text-sand-50 hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-sand-50 hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sand-50 hover:underline">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
