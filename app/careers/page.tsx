import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import JobsBoard from '@/components/JobsBoard';

export const metadata: Metadata = { title: 'Jobs', description: 'Join the team building the outdoor app millions of hikers trust.' };

export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow="Jobs" title="Build the app that keeps people on the trail" text="Remote-friendly, outdoor-obsessed and small enough that your work matters on day one." crumbs={[{ label: 'Jobs' }]} />
      <section className="max-container padding-container pb-24"><JobsBoard /></section>
    </>
  );
}
