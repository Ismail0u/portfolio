import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { fadeUp } from '../../constants/motionVariants';

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
          className="mt-5 text-fg/60 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
