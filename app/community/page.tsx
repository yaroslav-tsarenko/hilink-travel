import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import CommunityFeed from '@/components/CommunityFeed';

export const metadata: Metadata = { title: 'Community', description: 'Stories, photos and tips from the worldwide Hilink community of climbers and hikers.' };

export default function CommunityPage() {
  return (
    <>
      <PageHeader eyebrow="Community" title="Climbers who share the best trails" text="Join groups, share stories from the trail and discover new places through people who have been there." crumbs={[{ label: 'Community' }]} />
      <section className="max-container padding-container pb-24">
        <Suspense fallback={<div className="card h-96 animate-pulse" />}>
          <CommunityFeed />
        </Suspense>
      </section>
    </>
  );
}
