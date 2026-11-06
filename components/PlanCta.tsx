import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Topo from './ui/Topo';

export default function PlanCta({ title = 'Not sure where to go?', text = 'Answer three questions about landscape, effort and time, and the planner suggests three routes that fit.' }: { title?: string; text?: string }) {
  return (
    <section className="wrap pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-[12px] bg-sand-200 px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
        <Topo seed={23} className="pointer-events-none absolute -right-10 -top-10 h-[140%] w-[60%] text-pine/20" rings={11} />
        <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="t-h2 max-w-[16ch]">{title}</h2>
            <p className="t-lead mt-4 max-w-[48ch]">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link href="/how-it-works#planner" className="btn btn-primary btn-lg">
              Open the trip planner <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/camps" className="btn btn-outline btn-lg">
              Browse all trips
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
