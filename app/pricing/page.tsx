import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import PricingPlans from '@/components/PricingPlans';
import FaqList from '@/components/FaqList';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = { title: 'Pricing', description: 'Start free. Upgrade for unlimited offline maps, AR navigation and camp discounts.' };

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Simple plans for every adventurer" text="Start free and upgrade when the mountains call more often. Cancel anytime." crumbs={[{ label: 'Pricing' }]} />
      <section className="max-container padding-container pb-24">
        <PricingPlans />
      </section>
      <section className="max-container padding-container grid gap-12 pb-24 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="bold-40">Good to know</h2>
        </Reveal>
        <FaqList />
      </section>
    </>
  );
}
