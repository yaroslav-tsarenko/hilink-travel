import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { h: 'What we collect', p: 'Account details you provide, trips you plan and, only while navigating, your location. Offline maps never send your position to our servers.' },
        { h: 'How we use it', p: 'To show you relevant camps, sync your trips between devices and improve route suggestions. We never sell personal data.' },
        { h: 'Sharing', p: 'When you book a camp we share your name and dates with that camp only. Group trips share your schedule with the members you invite.' },
        { h: 'Your choices', p: 'You can export or delete your data at any time from account settings, or by contacting hilink@akinthil.com.' },
        { h: 'Cookies', p: 'This website uses only essential cookies and local storage to remember saved camps and preferences.' },
      ]}
    />
  );
}
