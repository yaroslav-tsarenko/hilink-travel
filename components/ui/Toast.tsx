'use client';

import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

type Toast = { id: number; title: string; text?: string };
const ToastContext = createContext<(t: Omit<Toast, 'id'>) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random();
    setToasts((all) => [...all, { ...t, id }]);
    window.setTimeout(() => setToasts((all) => all.filter((x) => x.id !== id)), 3800);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-[min(92vw,420px)] -translate-x-1/2 flex-col gap-3" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl bg-green-90 px-5 py-4 text-white shadow-2xl"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-50" />
              <div>
                <p className="bold-16">{t.title}</p>
                {t.text && <p className="regular-14 mt-0.5 text-gray-20">{t.text}</p>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
