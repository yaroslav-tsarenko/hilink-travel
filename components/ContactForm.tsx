'use client';

import { Check, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, type FormEvent } from 'react';

const TOPICS = ['A trip', 'Private group', 'Gear rental', 'Press', 'Something else'];

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email address';
    if (form.message.trim().length < 10) next.message = 'A little more detail, please (10 characters or more)';
    setErrors(next);
    if (Object.keys(next).length) return;
    setState('sending');
    window.setTimeout(() => setState('sent'), 900);
  };

  return (
    <div className="rounded-card border border-line bg-sand-50 p-6 lg:p-10">
      <AnimatePresence mode="wait">
        {state === 'sent' ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col items-start justify-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-pine text-sand-50">
              <Check className="h-6 w-6" aria-hidden />
            </span>
            <h2 className="t-h3">Thanks, {form.name.split(' ')[0]}.</h2>
            <p className="max-w-[44ch] text-ink-soft">We reply within one working day, usually sooner. This is a demo, so nothing was actually sent.</p>
            <button
              type="button"
              onClick={() => {
                setForm({ name: '', email: '', message: '' });
                setState('idle');
              }}
              className="btn btn-outline mt-2"
            >
              Write another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate className="flex flex-col gap-6" exit={{ opacity: 0 }}>
            <fieldset>
              <legend className="field-label">What is it about?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button key={t} type="button" onClick={() => setTopic(t)} aria-pressed={topic === t} className="chip">
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              {(['name', 'email'] as const).map((k) => (
                <label key={k} className="flex flex-col gap-2">
                  <span className="field-label">{k === 'name' ? 'Name' : 'Email'}</span>
                  <input
                    type={k === 'email' ? 'email' : 'text'}
                    autoComplete={k}
                    value={form[k]}
                    onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                    aria-invalid={Boolean(errors[k])}
                    className={`field ${errors[k] ? 'border-ember-ink' : ''}`}
                  />
                  {errors[k] && (
                    <span className="field-error" role="alert">
                      {errors[k]}
                    </span>
                  )}
                </label>
              ))}
            </div>
            <label className="flex flex-col gap-2">
              <span className="flex items-baseline justify-between">
                <span className="field-label">Message</span>
                <span className="t-num text-[0.8125rem] text-ink-soft">{form.message.length}/500</span>
              </span>
              <textarea
                rows={6}
                maxLength={500}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                aria-invalid={Boolean(errors.message)}
                className={`field resize-none ${errors.message ? 'border-ember-ink' : ''}`}
                placeholder={topic === 'A trip' ? 'Which route, which dates, how many of you?' : 'How can we help?'}
              />
              {errors.message && (
                <span className="field-error" role="alert">
                  {errors.message}
                </span>
              )}
            </label>
            <button type="submit" disabled={state === 'sending'} className="btn btn-primary btn-lg sm:w-fit">
              {state === 'sending' && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />} Send message
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
