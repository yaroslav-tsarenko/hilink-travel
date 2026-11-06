'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useToast } from './ui/Toast';

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const plan = params.get('plan');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = Math.min(4, [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(values.password)).length);
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (mode === 'signup' && values.name.trim().length < 2) next.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Please enter a valid email address';
    if (values.password.length < (mode === 'signup' ? 8 : 1)) next.password = mode === 'signup' ? 'Use at least 8 characters' : 'Please enter your password';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      toast({ title: mode === 'signup' ? 'Welcome to Wildway' : 'Welcome back', text: 'Demo only. No account was created or checked.' });
      router.push('/camps');
    }, 800);
  };

  const field = (name: keyof typeof values, label: string, type = 'text', autoComplete?: string) => (
    <label className="flex flex-col gap-2">
      <span className="field-label">{label}</span>
      <span className="relative block">
        <input
          type={name === 'password' ? (show ? 'text' : 'password') : type}
          autoComplete={autoComplete}
          value={values[name]}
          onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
          aria-invalid={Boolean(errors[name])}
          className={`field ${errors[name] ? 'border-ember-ink' : ''} ${name === 'password' ? 'pr-12' : ''}`}
        />
        {name === 'password' && (
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center text-ink-soft hover:text-ink">
            {show ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
          </button>
        )}
      </span>
      {errors[name] && (
        <span className="field-error" role="alert">
          {errors[name]}
        </span>
      )}
    </label>
  );

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      {plan && mode === 'signup' && (
        <p className="rounded-[6px] bg-pine-tint px-4 py-3 text-[0.9375rem] text-pine">
          Plan selected: <span className="font-semibold capitalize">{plan}</span>
        </p>
      )}
      {mode === 'signup' && field('name', 'Full name', 'text', 'name')}
      {field('email', 'Email', 'email', 'email')}
      {field('password', 'Password', 'password', mode === 'signup' ? 'new-password' : 'current-password')}
      {mode === 'signup' && values.password && (
        <div>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`h-1 flex-1 rounded-full transition ${i < strength ? (strength > 2 ? 'bg-pine' : 'bg-ember') : 'bg-sand-300'}`} />
            ))}
          </div>
          <p className="mt-1.5 text-[0.8125rem] text-ink-soft">{labels[strength]}</p>
        </div>
      )}
      {mode === 'login' && (
        <div className="flex items-center justify-between text-[0.9375rem]">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 accent-pine" defaultChecked /> Keep me signed in
          </label>
          <button type="button" onClick={() => toast({ title: 'Reset link sent', text: 'Demo only. No email was sent.' })} className="font-semibold text-pine underline underline-offset-4">
            Forgot password?
          </button>
        </div>
      )}
      <button type="submit" disabled={loading} className="btn btn-primary btn-lg mt-1">
        {loading && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
        {mode === 'signup' ? 'Create account' : 'Log in'}
      </button>
      <p className="text-center text-[0.9375rem] text-ink-soft">
        {mode === 'signup' ? 'Already have an account? ' : 'New to Wildway? '}
        <Link href={mode === 'signup' ? '/login' : '/signup'} className="font-semibold text-pine underline underline-offset-4">
          {mode === 'signup' ? 'Log in' : 'Create an account'}
        </Link>
      </p>
    </form>
  );
}
