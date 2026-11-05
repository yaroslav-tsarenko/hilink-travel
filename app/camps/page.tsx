import type { Metadata } from 'next';
import { Suspense } from 'react';
import CampsExplorer from '@/components/CampsExplorer';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Camps',
  description: 'Browse forest, lake, mountain, desert, coast and snow camps around the world. Filter by difficulty and price.',
};

export default function CampsPage() {
  return (
    <>
      <PageHeader eyebrow="1,200+ partner camps" title="Find your next camp" text="Forests, lakes, deserts and glaciers — filter by terrain, difficulty and budget, then save your favourites for later." crumbs={[{ label: 'Camps' }]} />
      <section className="max-container padding-container pb-24">
        <Suspense fallback={<div className="card h-64 animate-pulse" />}>
          <CampsExplorer />
        </Suspense>
      </section>
    </>
  );
}
