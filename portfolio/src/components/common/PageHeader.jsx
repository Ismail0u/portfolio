import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../sections/Hero';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

export default function PageHeader({ top, bottom, description }) {
  return (
    <div className="pt-28 pb-4 brand-glow">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <SectionHeading top={top} bottom={bottom} />
      </motion.div>
      {description && (
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.1}
          className="mt-5 text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
