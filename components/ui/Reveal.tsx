'use client';

import { motion, type HTMLMotionProps } from 'motion/react';

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number; x?: number };

export default function Reveal({ delay = 0, y = 28, x = 0, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
