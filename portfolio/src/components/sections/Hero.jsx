import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants/personalInfo';
import { trackEvent, pickLang } from '../../utils';
import { fadeUp } from '../../constants/motionVariants';
import SectionHeading from '../common/SectionHeading';
import ProfileCard from './hero/ProfileCard';
import { Stat, ExpertiseBlock } from './hero/HeroStats';
import CVModal from './hero/CVModal';

/**
 * ============================================
 * HERO — direction "sobre, structurée, senior"
 * ============================================
 * Orchestrateur : compose ProfileCard / Stat / ExpertiseBlock / CVModal.
 * ============================================
 */
export default function Hero() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCVDownload = useCallback((language) => {
    const cvUrls = { fr: '/cv-fr.pdf', en: '/cv-en.pdf' };
    const fileName = language === 'fr' ? 'MOUSSA_Ismael_CV_FR.pdf' : 'MOUSSA_Ismael_Resume_EN.pdf';

    const link = document.createElement('a');
    link.href = cvUrls[language];
    link.download = fileName;
    link.click();

    trackEvent('cv_download', { language });
    setIsModalOpen(false);
  }, []);

  return (
    <section id="hero" className="relative py-16 sm:py-24">
      <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-24">
          <ProfileCard />
        </div>

        <div>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.1} className="brand-glow">
            <SectionHeading top={t('hero.titleTop')} bottom={t('hero.titleBottom')} />
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="mt-5 text-fg/60 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            {pickLang(PERSONAL_INFO, 'pitch', lang)}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="mt-4 flex flex-wrap gap-2"
          >
            {PERSONAL_INFO.domains.map((domain) => (
              <span key={domain} className="text-xs px-3 py-1.5 rounded-full border border-fg/10 text-fg/60">
                {domain}
              </span>
            ))}
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat value="3+" label={t('hero.statExperience')} delay={0.3} />
            <Stat value="9+" label={t('hero.statProjects')} delay={0.35} />
            <Stat value="7+" label={t('hero.statTech')} delay={0.4} />
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-xl">
            <ExpertiseBlock title={t('hero.expertiseBlock1')} tone="primary" delay={0.45} />
            <ExpertiseBlock title={t('hero.expertiseBlock2')} tone="secondary" delay={0.5} />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.55}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-soft transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t('hero.ctaContact')}
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-fg/15 text-fg text-sm font-medium hover:border-fg/40 transition-colors"
            >
              <Download className="w-4 h-4" />
              {t('hero.ctaDownloadCV')}
            </button>
          </motion.div>
        </div>
      </div>

      <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDownload={handleCVDownload} t={t} />
    </section>
  );
}
