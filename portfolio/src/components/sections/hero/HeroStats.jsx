import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp } from '../../../constants/motionVariants';

// Ligne de statistiques — chiffres factuels plutôt que des jauges de % arbitraires
export const Stat = ({ value, label, delay }) => (
  <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={delay}>
    <div className="font-display font-bold text-3xl sm:text-4xl text-fg">{value}</div>
    <div className="text-[11px] uppercase tracking-wider text-fg/40 mt-1">{label}</div>
  </motion.div>
);

// Bloc d'expertise — deux cartes accent / accent2, adaptées à la stack réelle
export const ExpertiseBlock = ({ title, tone = 'primary', delay }) => {
  const isPrimary = tone === 'primary';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={delay}
      className={`relative rounded-xl p-5 min-h-27.5 flex flex-col justify-between transition-all duration-200 border ${
        isPrimary 
          ? 'bg-accent-soft text-ink border-accent/20' 
          : 'text-fg border-fg/10 hover:border-fg/20'
      }`}
    >
      <p className={`font-display font-semibold text-sm leading-snug pr-6 ${
        isPrimary ? 'text-ink' : 'text-fg'
      }`}>
        {title}
      </p>
      <ArrowUpRight className={`absolute top-4 right-4 w-4 h-4 ${
        isPrimary ? 'text-ink/70' : 'text-fg/70'
      }`} />
    </motion.div>
  );
};