import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Terms' };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      sections={[
        { h: 'Booking', p: 'A booking request becomes a booking when your guide confirms it and the deposit is paid. Prices include what each trip page lists as included.' },
        { h: 'Fitness and safety', p: 'You are responsible for being honest about your fitness and experience. Guides may change or stop a route for safety, and their decision on the day is final.' },
        { h: 'Cancellation', p: 'Free cancellation up to 30 days before departure. If we cancel for weather or safety before departure, you get a full refund or a new date.' },
        { h: 'Membership', p: 'Memberships renew until cancelled. Cancel at any time and keep the benefits until the end of the paid period.' },
      ]}
    />
  );
}
