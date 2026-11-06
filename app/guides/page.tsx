import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import GuidesList from '@/components/GuidesList';

export const metadata: Metadata = { title: 'Journal', description: 'Skills, gear, places and safety: field notes from Wildway guides.' };

export default function GuidesPage() {
  return (
    <>
      <PageHeader label="Journal" title="Field notes" text="Practical writing from the guides: what to pack, how to navigate, where to go and when. No listicles, no affiliate links." crumbs={[{ label: 'Journal' }]} seed={17} />
      <section className="wrap section">
        <GuidesList />
      </section>
    </>
  );
}
