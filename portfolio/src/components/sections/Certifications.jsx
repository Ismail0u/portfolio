import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, ArrowUpRight, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '../../constants/certificationsData';
import SectionHeading from '../common/SectionHeading';
import { pickLang } from '../../utils';
import { fadeUp } from '../../constants/motionVariants';

export const CertCard = ({ cert, delay, lang, t }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={fadeUp}
    custom={delay}
    className="rounded-xl border border-fg/10 p-5 hover:border-fg/20 transition-colors"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
        <Award className="w-4 h-4 text-accent-soft" />
      </div>
      <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-fg/5 text-fg/40 shrink-0">
        {pickLang(cert, 'category', lang)}
      </span>
    </div>

    <h3 className="mt-3 text-sm font-semibold text-fg leading-snug">{cert.title}</h3>
    <p className="mt-1 text-xs text-fg/40">{cert.org} — {cert.date}</p>

    <div className="mt-4 flex items-center gap-4">
      {cert.pdf && (
        <a
          href={cert.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-accent-soft hover:text-fg transition-colors inline-flex items-center gap-1"
        >
          {t('certifications.viewCertificate')} <ExternalLink className="w-3 h-3" />
        </a>
      )}
      {cert.verifyUrl && (
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-fg/40 hover:text-fg transition-colors inline-flex items-center gap-1"
        >
          {t('certifications.verify')} <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  </motion.div>
);

/**
 * @param {number} [limit] - si fourni, n'affiche que les N premières certifications
 * @param {boolean} [showViewAll] - affiche un lien "View all certifications"
 * @param {'list'|'grid'} [layout]
 */
export default function Certifications({ limit, showViewAll = false, layout = 'grid', headingTop, headingBottom }) {
  const { t, i18n } = useTranslation();
  const top = headingTop ?? t('certifications.headingTop');
  const bottom = headingBottom ?? t('certifications.headingBottom');
  const list = limit ? CERTIFICATIONS.slice(0, limit) : CERTIFICATIONS;

  return (
    <section id="certifications" className="py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeading top={top} bottom={bottom} />
        </motion.div>
        {showViewAll && (
          <Link
            to="/certifications"
            className="text-sm font-medium text-fg/50 hover:text-fg transition-colors inline-flex items-center gap-1"
          >
            {t('certifications.viewAll')} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div
        className={
          layout === 'grid'
            ? 'mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl'
            : 'mt-10 max-w-2xl divide-y divide-fg/10'
        }
      >
        {list.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} delay={0.04 * i} lang={i18n.language} t={t} />
        ))}
      </div>
    </section>
  );
}
