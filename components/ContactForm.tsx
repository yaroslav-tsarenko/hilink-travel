'use client';

import { CheckCircle2, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, type FormEvent } from 'react';

const TOPICS = ['Booking', 'App support', 'Partnership', 'Press', 'Other'];

export default function ContactForm() {
  const [topic, setTopic] = useState('Booking');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email';
    if (form.message.trim().length < 10) next.message = 'Tell us a bit more (10+ characters)';
    setErrors(next);
    if (Object.keys(next).length) return;
    setState('sending');
    window.setTimeout(() => setState('sent'), 1000);
  };

  return (
    <div className="card relative overflow-hidden p-6 lg:p-10">
      <AnimatePresence mode="wait">
        {state === 'sent' ? (
          <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flexCenter min-h-[420px] flex-col gap-4 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-50" />
            <h3 className="bold-32">Message sent!</h3>
            <p className="regular-16 max-w-sm text-gray-30">Thanks, {form.name.split(' ')[0]}. We usually reply within one business day. (Demo — nothing was sent.)</p>
            <button type="button" onClick={() => { setForm({ name: '', email: '', message: '' }); setState('idle'); }} className="btn_outline mt-2 rounded-full border font-bold">Send another</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate className="flex flex-col gap-5" exit={{ opacity: 0 }}>
            <fieldset>
              <legend className="mb-3 text-[14px] font-semibold">What is it about?</legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button key={t} type="button" onClick={() => setTopic(t)} aria-pressed={topic === t} className={`chip ${topic === t ? 'chip-active' : ''}`}>{t}</button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              {(['name', 'email'] as const).map((k) => (
                <label key={k} className="flex flex-col gap-2">
                  <span className="text-[14px] font-semibold capitalize">{k}</span>
                  <input type={k === 'email' ? 'email' : 'text'} autoComplete={k} value={form[k]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))} aria-invalid={Boolean(errors[k])} className={`input ${errors[k] ? 'border-orange-50' : ''}`} />
                  {errors[k] && <span className="text-[13px] font-semibold text-orange-50" role="alert">{errors[k]}</span>}
                </label>
              ))}
            </div>
            <label className="flex flex-col gap-2">
              <span className="flexBetween text-[14px] font-semibold">Message <span className="font-normal text-gray-30">{form.message.length}/500</span></span>
              <textarea rows={5} maxLength={500} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} aria-invalid={Boolean(errors.message)} className={`input resize-none ${errors.message ? 'border-orange-50' : ''}`} placeholder={`Your ${topic.toLowerCase()} question…`} />
              {errors.message && <span className="text-[13px] font-semibold text-orange-50" role="alert">{errors.message}</span>}
            </label>
            <button type="submit" disabled={state === 'sending'} className="btn_green flexCenter gap-2 rounded-full border font-bold transition hover:bg-green-60 disabled:opacity-70 sm:w-fit">
              {state === 'sending' && <Loader2 className="h-5 w-5 animate-spin" />} Send message
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
