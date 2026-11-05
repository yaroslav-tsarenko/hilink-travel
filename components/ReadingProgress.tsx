'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-green-50" style={{ scaleX }} />;
}
