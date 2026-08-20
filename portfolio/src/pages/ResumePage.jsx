import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { PERSONAL_INFO } from '../constants/personalInfo';
import { TIMELINE } from '../constants/timelineData';
import { SKILLS } from '../constants/skillData';
import SectionHeading from '../components/common/SectionHeading';
import { pickLang } from '../utils';
import { fadeUp } from '../constants/motionVariants';

export default function ResumePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const allSkills = Object.values(SKILLS).flat();

  return (
    <div className="pt-28 pb-24 brand-glow">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-end justify-between gap-4 flex-wrap">
        <SectionHeading top={t('resume.headingTop')} bottom={t('resume.headingBottom')} />
        <div className="flex gap-3">
          <a
            href="/cv-fr.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-soft text-white text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" /> FR
          </a>
          <a
            href="/cv-en.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-fg/15 text-fg text-sm font-medium hover:border-fg/40 transition-colors"
          >
            <Download className="w-4 h-4" /> EN
          </a>
        </div>
      </motion.div>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0.1}
        className="mt-4 text-fg/50 max-w-xl"
      >
        {pickLang(PERSONAL_INFO, 'pitch', lang)}
      </motion.p>

      {/* Expérience */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.15} className="mt-14">
        <h2 className="font-display font-semibold text-fg text-lg mb-4">{t('resume.experienceEducation')}</h2>
        <div className="max-w-2xl">
          {TIMELINE.map((item) => (
            <div key={item.id} className="py-4 border-b border-fg/10">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="font-medium text-fg text-sm">{pickLang(item, 'title', lang)}</h3>
                <span className="text-xs text-fg/30 shrink-0">{item.year}</span>
              </div>
              <p className="mt-1 text-sm text-fg/50 leading-relaxed">{pickLang(item, 'description', lang)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Compétences */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.2} className="mt-14">
        <h2 className="font-display font-semibold text-fg text-lg mb-4">{t('resume.skills')}</h2>
        <div className="flex flex-wrap gap-2 max-w-2xl">
          {allSkills.map((skill) => (
            <span
              key={skill.name}
              className="text-xs px-3 py-1.5 rounded-full border border-fg/10 text-fg/60"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
