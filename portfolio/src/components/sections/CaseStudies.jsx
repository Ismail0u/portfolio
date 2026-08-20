import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { TECH_NOTES } from '../../constants/notesData';
import SectionHeading from '../common/SectionHeading';
import { pickLang } from '../../utils';
import { fadeUp } from '../../constants/motionVariants';

export const NoteRow = ({ note, delay, lang }) => (
  <motion.a
    href={note.href}
    target="_blank"
    rel="noopener noreferrer"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={fadeUp}
    custom={delay}
    className="group block py-6 border-b border-fg/10 hover:border-fg/20 transition-colors"
  >
    <div className="flex items-start justify-between gap-4">
      <h3 className="font-display font-semibold text-accent-soft group-hover:text-fg transition-colors max-w-xl">
        {pickLang(note, 'title', lang)}
      </h3>
      <ArrowUpRight className="w-4 h-4 text-fg/20 group-hover:text-fg transition-colors shrink-0 mt-1" />
    </div>
    <p className="mt-2 text-sm text-fg/50 leading-relaxed max-w-2xl">
      {pickLang(note, 'excerpt', lang)}
    </p>
    <p className="mt-3 text-xs text-fg/30">{note.date}</p>
  </motion.a>
);

/**
 * @param {number} [limit]
 * @param {boolean} [showViewAll]
 */
export default function CaseStudies({ limit, showViewAll = false, headingTop, headingBottom }) {
  const { t, i18n } = useTranslation();
  const top = headingTop ?? t('writing.headingTop');
  const bottom = headingBottom ?? t('writing.headingBottom');
  const list = limit ? TECH_NOTES.slice(0, limit) : TECH_NOTES;

  return (
    <section id="notes" className="py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeading top={top} bottom={bottom} />
        </motion.div>
        {showViewAll && (
          <Link
            to="/writing"
            className="text-sm font-medium text-fg/50 hover:text-fg transition-colors inline-flex items-center gap-1"
          >
            {t('writing.viewAll')} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="mt-10 max-w-2xl">
        {list.map((note, i) => (
          <NoteRow key={note.id} note={note} delay={0.05 * i} lang={i18n.language} />
        ))}
      </div>
    </section>
  );
}
