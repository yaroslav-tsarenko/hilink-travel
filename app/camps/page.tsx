import type { Metadata } from 'next';
import { Suspense } from 'react';
import CampsExplorer from '@/components/CampsExplorer';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Trips',
  description: 'Guided hiking and wild-camping trips across mountains, coast, forest, lakes, desert and glacier country. Filter by grade, length and price.',
};

export default function CampsPage() {
  return (
    <>
      <PageHeader
        label="Ten routes, small groups"
        title="Find a trip"
        text="From a two-day beach camp in Lofoten to six trackless days in Sarek. Filter by landscape, grade and budget, and save the ones you like."
        crumbs={[{ label: 'Trips' }]}
        seed={3}
      />
      <section className="wrap py-12 lg:py-16">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-card bg-sand-200" />}>
          <CampsExplorer />
        </Suspense>
      </section>
    </>
  );
}
