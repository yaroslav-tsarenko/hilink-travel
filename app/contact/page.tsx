import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import ContactForm from '@/components/ContactForm';
import FaqList from '@/components/FaqList';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = { title: 'Contact us', description: 'Questions about bookings, the app or partnerships? The Hilink team is here to help.' };

const CHANNELS = [
  { icon: Phone, label: 'Admin Officer', value: '123-456-7890', href: 'tel:1234567890' },
  { icon: Mail, label: 'Email Officer', value: 'hilink@akinthil.com', href: 'mailto:hilink@akinthil.com' },
  { icon: MapPin, label: 'Base camp', value: 'Prigen, Pasuruan, Indonesia', href: '/camps/putuk-truno' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="We are here for you" text="Lost on the way to a booking or found a bug at the top of a mountain? Write to us." crumbs={[{ label: 'Contact' }]} />
      <section className="max-container padding-container grid gap-10 pb-24 lg:grid-cols-[1fr_1.5fr]">
        <div className="flex flex-col gap-4">
          {CHANNELS.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <a href={href} className="card group flex items-center gap-5 p-6 transition hover:-translate-y-1 hover:border-green-50 hover:shadow-lg">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-green-50 text-white transition group-hover:rotate-[-10deg]"><Icon className="h-6 w-6" /></span>
                <span>
                  <span className="regular-14 block text-gray-30">{label}</span>
                  <span className="bold-18">{value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <ContactForm />
      </section>
      <section className="max-container padding-container grid gap-12 pb-24 lg:grid-cols-[1fr_1.4fr]">
        <Reveal><p className="eyebrow mb-3">FAQ</p><h2 className="bold-40">Quick answers</h2></Reveal>
        <FaqList />
      </section>
    </>
  );
}
