import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthForm from '@/components/AuthForm';
import AuthLayout from '@/components/AuthLayout';

export const metadata: Metadata = { title: 'Create account', robots: { index: false } };

export default function SignupPage() {
  return (
    <AuthLayout title="Create an account" text="Free, and you only need one to book. Takes under a minute.">
      <Suspense>
        <AuthForm mode="signup" />
      </Suspense>
    </AuthLayout>
  );
}
