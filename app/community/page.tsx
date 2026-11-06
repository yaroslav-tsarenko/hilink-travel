import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import CommunityFeed from '@/components/CommunityFeed';

export const metadata: Metadata = { title: 'Community', description: 'Trip reports, photos and advice from people who have walked Wildway routes.' };

export default function CommunityPage() {
  return (
    <>
      <PageHeader label="Community" title="Trip reports" text="Written by people who walked the routes: what the weather did, what they would pack next time, and what made it worth it." crumbs={[{ label: 'Community' }]} seed={29} />
      <section className="wrap section">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-card bg-sand-200" />}>
          <CommunityFeed />
        </Suspense>
      </section>
    </>
  );
}
