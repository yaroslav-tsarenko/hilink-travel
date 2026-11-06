import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import PlanCta from '@/components/PlanCta';
import RouteSpotlight from '@/components/RouteSpotlight';
import Stats from '@/components/Stats';
import CampCard from '@/components/ui/CampCard';
import Reveal from '@/components/ui/Reveal';
import Topo from '@/components/ui/Topo';
import { Avatar, SectionHead } from '@/components/ui/Bits';
import { CAMPS } from '@/constants/camps';
import { GUIDES, POSTS } from '@/constants/content';

const PROMISES = [
  { n: '01', title: 'Ten regions, four continents', text: 'Arctic coast to Patagonian ice, each run by guides who live there.' },
  { n: '02', title: 'Small groups', text: 'Six to ten walkers. Two guides on every Hard route.' },
  { n: '03', title: 'Permits included', text: 'Park fees, hut pitches, ferries and transfers arranged for you.' },
  { n: '04', title: 'Gear on loan', text: 'Tents, bags, mats and stoves waiting at the trailhead.' },
];

const STEPS = [
  { title: 'Choose a route', text: 'Filter by landscape, grade and days, or let the planner pick three routes for you.' },
  { title: 'Talk to your guide', text: 'A short call about fitness, kit and food. Hard routes need one previous multi-day trip.' },
  { title: 'Collect your kit', text: 'Rent what you do not own. It is cleaned, checked and packed at the start point.' },
  { title: 'Walk, camp, repeat', text: 'Five to seven hours on foot a day, a legal pitch each night, everything carried out.' },
];

export default function Home() {
  const departures = ['fitz-roy', 'kvalvika', 'coyote-gulch', 'malerweg'].map((s) => CAMPS.find((c) => c.slug === s)!);
  const [lead, ...journal] = GUIDES.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Promise strip */}
      <section aria-label="What every trip includes" className="border-b border-ink/10 bg-sand-50">
        <ul className="wrap grid sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <li key={p.n} className={`py-7 sm:pr-6 ${i % 2 ? 'sm:border-l sm:border-ink/10 sm:pl-6' : ''} ${i === 2 ? 'lg:border-l lg:border-ink/10 lg:pl-6' : ''} ${i >= 2 ? 'border-t border-ink/10 lg:border-t-0' : i === 1 ? 'border-t border-ink/10 sm:border-t-0' : ''}`}>
              <p className="t-num text-[0.75rem] font-semibold text-ember-ink">{p.n}</p>
              <p className="mt-2 font-serif text-[1.25rem] leading-tight">{p.title}</p>
              <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Departures */}
      <section className="wrap section">
        <SectionHead index="01" label="Departures" title="Routes with places left this season" href="/camps" linkLabel="All ten routes" />
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {departures.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 0.06} className="h-full">
                <CampCard camp={c} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Route spotlight */}
      <section className="relative overflow-hidden bg-pine text-sand-50">
        <Topo seed={12} className="pointer-events-none absolute inset-0 h-full w-full text-sand-50/[0.06]" summits={4} rings={14} />
        <div className="wrap section relative">
          <SectionHead
            index="02"
            label="Route notes"
            tone="light"
            title="Read a route before you walk it"
            text="Every trip comes with stage-by-stage notes, an elevation profile and the camps marked on the map. Pick a day to see where you sleep."
          />
          <div className="mt-12">
            <RouteSpotlight />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="wrap section">
        <SectionHead index="03" label="How it works" title="From first question to last pitch" href="/how-it-works" linkLabel="The full process" />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <svg className="pointer-events-none absolute left-0 top-[34px] hidden h-6 w-full lg:block" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden>
            <path d="M10 12 C 160 2, 260 22, 380 12 S 620 2, 740 12 S 900 22, 990 12" fill="none" stroke="#1f3d2b" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
          </svg>
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 0.07}>
                <span className="t-num relative z-10 inline-grid h-[68px] w-[68px] place-items-center rounded-full border border-ink/20 bg-sand font-serif text-[1.75rem] text-pine">{i + 1}</span>
                <h3 className="t-h4 mt-6">{s.title}</h3>
                <p className="mt-2 max-w-[34ch] text-ink-soft">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Guide quote + stats */}
      <section className="pb-20 lg:pb-28">
        <div className="relative">
          <div className="relative h-[460px] sm:h-[560px] lg:h-[680px]">
            <Image src="/photos/about.webp" alt="A group of hikers on a high trail with cloud filling the valleys behind them" fill sizes="100vw" className="object-cover object-[50%_60%]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,36,24,0.55)_0%,rgba(17,36,24,0)_50%)]" />
          </div>
          <div className="wrap relative -mt-40 sm:-mt-48">
            <Reveal className="ml-auto max-w-[620px] rounded-[10px] bg-sand-50 p-7 shadow-lift sm:p-10">
              <p className="t-label">From the guides</p>
              <blockquote className="mt-5 font-serif text-[clamp(1.5rem,2.6vw,2.125rem)] font-[380] italic leading-[1.22]">
                “We turn a group around about one day in twelve because of weather. Nobody remembers the summit they skipped. They remember that everyone walked out.”
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <Avatar name="Ásta Jónsdóttir" size={44} />
                <p className="text-[0.9375rem]">
                  <span className="block font-semibold">Ásta Jónsdóttir</span>
                  <span className="text-ink-soft">Lead guide, Iceland. Eleven seasons on Laugavegur.</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="wrap mt-16">
          <Stats />
        </div>
      </section>

      {/* Journal */}
      <section className="border-t border-ink/10 bg-sand-50">
        <div className="wrap section">
          <SectionHead index="04" label="Journal" title="Field notes from people who do this for a living" href="/guides" linkLabel="All articles" />
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Link href={`/guides/${lead.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-card">
                  <Image src={lead.photo} alt={lead.photoAlt} fill sizes="(max-width: 1024px) 92vw, 760px" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="t-label mt-6">
                  {lead.category} · {lead.readTime} read
                </p>
                <h3 className="t-h3 mt-3 max-w-[24ch] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[6px]">{lead.title}</h3>
                <p className="mt-3 max-w-[60ch] text-ink-soft">{lead.excerpt}</p>
              </Link>
            </Reveal>
            <ul className="flex flex-col lg:col-span-5">
              {journal.map((g, i) => (
                <li key={g.slug} className={i ? 'border-t border-ink/15' : 'border-t border-ink/15 lg:border-t-0'}>
                  <Reveal delay={i * 0.06}>
                    <Link href={`/guides/${g.slug}`} className="group grid grid-cols-[1fr_120px] gap-5 py-6 sm:grid-cols-[1fr_160px]">
                      <span>
                        <span className="t-label">{g.category}</span>
                        <span className="mt-2 block font-serif text-[1.375rem] leading-[1.15] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{g.title}</span>
                        <span className="mt-2 block text-[0.875rem] text-ink-soft">
                          {g.author} · {g.readTime}
                        </span>
                      </span>
                      <span className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
                        <Image src={g.photo} alt="" fill sizes="160px" className="object-cover" />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="wrap section">
        <SectionHead index="05" label="Community" title="Overheard at camp" href="/community" linkLabel="Read the trip reports" />
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {POSTS.slice(0, 3).map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 0.07} className="flex h-full flex-col border-t-2 border-pine pt-6">
                <p className="font-serif text-[1.25rem] leading-[1.35]">“{p.text}”</p>
                <div className="mt-auto flex items-center gap-3 pt-6">
                  <Avatar name={p.author} size={38} tone={i === 1 ? 'ember' : 'sand'} />
                  <p className="text-[0.875rem]">
                    <span className="block font-semibold">{p.author}</span>
                    <span className="text-ink-soft">{p.camp}</span>
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Link href="/community" className="link mt-10 md:hidden">
          More trip reports <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>

      <PlanCta />
    </>
  );
}
