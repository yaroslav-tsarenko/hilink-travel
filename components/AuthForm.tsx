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
  const labels = ['Too short', 'Weak', 'Okay', 'Good', 'Strong'];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (mode === 'signup' && values.name.trim().length < 2) next.name = 'Tell us your name';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Enter a valid email';
    if (values.password.length < (mode === 'signup' ? 8 : 1)) next.password = mode === 'signup' ? 'At least 8 characters' : 'Enter your password';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      toast({ title: mode === 'signup' ? 'Welcome to Hilink!' : 'Welcome back!', text: 'This is a demo — no account was created.' });
      router.push('/camps');
    }, 900);
  };

  const field = (name: keyof typeof values, label: string, type = 'text', autoComplete?: string) => (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-semibold">{label}</span>
      <div className="relative">
        <input
          type={name === 'password' ? (show ? 'text' : 'password') : type}
          autoComplete={autoComplete}
          value={values[name]}
          onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
          aria-invalid={Boolean(errors[name])}
          className={`input ${errors[name] ? 'border-orange-50' : ''} ${name === 'password' ? 'pr-14' : ''}`}
        />
        {name === 'password' && (
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-30">
            {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {errors[name] && <span className="text-[13px] font-semibold text-orange-50" role="alert">{errors[name]}</span>}
    </label>
  );

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      {plan && mode === 'signup' && <p className="rounded-2xl bg-green-10 px-4 py-3 text-[14px] font-semibold text-green-60">Selected plan: <span className="capitalize">{plan}</span></p>}
      {mode === 'signup' && field('name', 'Full name', 'text', 'name')}
      {field('email', 'Email', 'email', 'email')}
      {field('password', 'Password', 'password', mode === 'signup' ? 'new-password' : 'current-password')}
      {mode === 'signup' && values.password && (
        <div>
          <div className="flex gap-1.5">{[0, 1, 2, 3].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full transition ${i < strength ? (strength > 2 ? 'bg-green-50' : 'bg-yellow-50') : 'bg-gray-10'}`} />)}</div>
          <p className="mt-1.5 text-[12px] font-semibold text-gray-30">{labels[strength]}</p>
        </div>
      )}
      {mode === 'login' && (
        <div className="flexBetween text-[14px]">
          <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-green-50" defaultChecked /> Remember me</label>
          <button type="button" onClick={() => toast({ title: 'Reset link sent', text: 'Check your inbox (demo).' })} className="font-semibold text-green-50 hover:underline">Forgot password?</button>
        </div>
      )}
      <button type="submit" disabled={loading} className="btn_green flexCenter gap-2 rounded-full border font-bold transition hover:bg-green-60 disabled:opacity-70">
        {loading && <Loader2 className="h-5 w-5 animate-spin" />}
        {mode === 'signup' ? 'Create account' : 'Log in'}
      </button>
      <p className="text-center text-[14px] text-gray-30">
        {mode === 'signup' ? 'Already have an account? ' : 'New to Hilink? '}
        <Link href={mode === 'signup' ? '/login' : '/signup'} className="font-bold text-green-50 hover:underline">{mode === 'signup' ? 'Log in' : 'Create account'}</Link>
      </p>
    </form>
  );
}
