import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { TIMELINE } from '../../constants/timelineData';
import SectionHeading from '../common/SectionHeading';
import { pickLang } from '../../utils';
import { fadeUp } from '../../constants/motionVariants';

// Une couleur d'accent par type d'entrée — cohérent avec le reste du site
const TYPE_ACCENT = {
  work: 'text-accent-soft',
  education: 'text-accent2',
  project: 'text-accent-soft',
  achievement: 'text-accent2',
};

export const TimelineRow = ({ item, delay, lang }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={fadeUp}
    custom={delay}
    className="py-5 border-b border-fg/10"
  >
    <h3 className={`font-display font-semibold ${TYPE_ACCENT[item.type] || 'text-fg'}`}>
      {pickLang(item, 'title', lang)}
    </h3>
    <p className="mt-1.5 text-sm text-fg/50 leading-relaxed max-w-2xl">
      {pickLang(item, 'description', lang)}
    </p>
    <p className="mt-2 text-xs text-fg/30">{item.year}</p>
  </motion.div>
);

/**
 * @param {number} [limit]
 * @param {boolean} [showViewAll]
 */
export default function Timeline({ limit, showViewAll = false, headingTop, headingBottom }) {
  const { t, i18n } = useTranslation();
  const top = headingTop ?? t('timeline.headingTop');
  const bottom = headingBottom ?? t('timeline.headingBottom');
  const list = limit ? TIMELINE.slice(0, limit) : TIMELINE;

  return (
    <section id="timeline" className="py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeading top={top} bottom={bottom} />
        </motion.div>
        {showViewAll && (
          <Link
            to="/experience"
            className="text-sm font-medium text-fg/50 hover:text-fg transition-colors inline-flex items-center gap-1"
          >
            {t('timeline.viewAll')} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="mt-10 max-w-2xl">
        {list.map((item, i) => (
          <TimelineRow key={item.id} item={item} delay={0.05 * i} lang={i18n.language} />
        ))}
      </div>
    </section>
  );
}
