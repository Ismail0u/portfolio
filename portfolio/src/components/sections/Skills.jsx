import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaReact, FaPython, FaHtml5, FaGithub, FaNodeJs,
} from 'react-icons/fa';
import {
  SiTailwindcss, SiDjango, SiJavascript, SiMysql, SiPostgresql, SiStreamlit, SiFigma,
  SiFastapi, SiDocker, SiNextdotjs, SiPrisma, SiRedis, SiExpo, SiOpencv, SiLinux,
} from 'react-icons/si';
import { Code, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SKILLS } from '../../constants/skillData';
import SectionHeading from '../common/SectionHeading';
import { fadeUp } from '../../constants/motionVariants';

const SKILL_ICONS = {
  React: FaReact,
  'Next.js': SiNextdotjs,
  'React Native / Expo': SiExpo,
  'Django / DRF': SiDjango,
  Python: FaPython,
  FastAPI: SiFastapi,
  JavaScript: SiJavascript,
  TailwindCSS: SiTailwindcss,
  'Node.js': FaNodeJs,
  Prisma: SiPrisma,
  'REST API': Code,
  'HTML5 / CSS3': FaHtml5,
  'Git / GitHub': FaGithub,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  PostGIS: Code,
  Redis: SiRedis,
  Docker: SiDocker,
  Linux: SiLinux,
  Streamlit: SiStreamlit,
  Figma: SiFigma,
  OpenCV: SiOpencv,
  'NLP / NLTK': Code,
};

const CATEGORY_KEY = {
  frontend: 'categoryFrontend',
  backend: 'categoryBackend',
  database: 'categoryDatabase',
  tools: 'categoryTools',
  ai: 'categoryAi',
};

export const SkillRow = ({ skill, delay, t }) => {
  const Icon = SKILL_ICONS[skill.name] || Code;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      custom={delay}
      className="flex items-center gap-3 py-3"
    >
      <div className="w-9 h-9 rounded-lg bg-fg/5 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-fg/70" />
      </div>
      <div>
        <p className="text-sm font-medium text-fg">{skill.name}</p>
        <p className="text-xs text-fg/40">{t(`skills.${CATEGORY_KEY[skill.category]}`)}</p>
      </div>
    </motion.div>
  );
};

/**
 * @param {number} [limit]
 * @param {boolean} [showViewAll]
 */
export default function Skills({ limit, showViewAll = false, headingTop, headingBottom }) {
  const { t } = useTranslation();
  const top = headingTop ?? t('skills.headingTop');
  const bottom = headingBottom ?? t('skills.headingBottom');
  const allSkills = Object.values(SKILLS).flat();
  const list = limit ? allSkills.slice(0, limit) : allSkills;

  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeading top={top} bottom={bottom} />
        </motion.div>
        {showViewAll && (
          <Link
            to="/expertise"
            className="text-sm font-medium text-fg/50 hover:text-fg transition-colors inline-flex items-center gap-1"
          >
            {t('skills.viewAll')} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-x-10 max-w-2xl">
        {list.map((skill, i) => (
          <SkillRow key={skill.name} skill={skill} delay={0.03 * i} t={t} />
        ))}
      </div>
    </section>
  );
}
