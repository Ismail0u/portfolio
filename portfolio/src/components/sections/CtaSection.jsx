import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

export default function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="brand-glow rounded-2xl border border-white/10 p-10 sm:p-14 text-center max-w-3xl mx-auto"
      >
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
          {t('cta.title')}
        </h2>
        <p className="mt-3 text-white/50 max-w-lg mx-auto">
          {t('cta.body')}
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-soft text-white text-sm font-medium transition-colors"
        >
          {t('cta.button')} <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
