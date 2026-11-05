import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthForm from '@/components/AuthForm';
import AuthLayout from '@/components/AuthLayout';

export const metadata: Metadata = { title: 'Create account', robots: { index: false } };

export default function SignupPage() {
  return (
    <AuthLayout title="Start your adventure" text="Create a free account in seconds. No credit card required.">
      <Suspense><AuthForm mode="signup" /></Suspense>
    </AuthLayout>
  );
}
