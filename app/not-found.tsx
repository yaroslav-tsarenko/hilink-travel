import Link from 'next/link';
import Topo from '@/components/ui/Topo';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <Topo seed={404} className="pointer-events-none absolute inset-0 h-full w-full text-pine/15" summits={2} rings={14} />
      <div className="wrap relative flex min-h-[70svh] flex-col items-start justify-center py-24">
        <p className="t-label">Error 404 · off route</p>
        <h1 className="t-display mt-6 max-w-[14ch]">This path is not on the map.</h1>
        <p className="t-lead mt-6 max-w-[48ch]">The page may have moved, or the link was mistyped. Retrace your steps from somewhere familiar.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary btn-lg">
            Back to the start
          </Link>
          <Link href="/camps" className="btn btn-outline btn-lg">
            Browse trips
          </Link>
        </div>
      </div>
    </section>
  );
}
