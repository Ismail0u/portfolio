import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { getProjectBySlug } from '../constants/projectsData';
import { pickLang } from '../utils';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

const Block = ({ title, children, delay }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={fadeUp}
    custom={delay}
    className="py-8 border-b border-white/10"
  >
    <h2 className="font-display font-semibold text-white/40 text-xs uppercase tracking-widest mb-3">
      {title}
    </h2>
    {children}
  </motion.div>
);

const BulletList = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-sm text-white/70 leading-relaxed">
        <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/work" replace />;

  const cs = project.caseStudy;
  const suffix = lang?.startsWith('en') ? 'En' : 'Fr';

  return (
    <div className="pt-28 pb-24 max-w-2xl">
      <Link
        to="/work"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> {t('projects.allProjects')}
      </Link>

      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.1} className="mt-6 brand-glow">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-white">{project.title}</h1>
        <p className="mt-4 text-white/60 leading-relaxed max-w-xl">
          {pickLang(project, 'description', lang)}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-white text-sm font-medium hover:border-white/40 transition-colors"
            >
              <Github className="w-4 h-4" /> {t('projects.sourceCode')}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-soft text-white text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> {t('projects.liveDemo')}
            </a>
          )}
        </div>
      </motion.div>

      {cs ? (
        <div className="mt-10">
          <Block title={t('projects.problem')} delay={0.05}>
            <p className="text-sm text-white/70 leading-relaxed">{cs[`problem${suffix}`]}</p>
          </Block>
          <Block title={t('projects.solution')} delay={0.1}>
            <p className="text-sm text-white/70 leading-relaxed">{cs[`solution${suffix}`]}</p>
          </Block>
          <Block title={t('projects.role')} delay={0.15}>
            <p className="text-sm text-white/70 leading-relaxed">{cs[`role${suffix}`]}</p>
          </Block>
          <Block title={t('projects.architecture')} delay={0.2}>
            <BulletList items={cs[`architecture${suffix}`]} />
          </Block>
          <Block title={t('projects.challenges')} delay={0.25}>
            <BulletList items={cs[`challenges${suffix}`]} />
          </Block>
          <Block title={t('projects.learnings')} delay={0.3}>
            <BulletList items={cs[`learnings${suffix}`]} />
          </Block>
          {cs[`results${suffix}`] && (
            <Block title={t('projects.outcome')} delay={0.35}>
              <p className="text-sm text-white/70 leading-relaxed">{cs[`results${suffix}`]}</p>
            </Block>
          )}
        </div>
      ) : (
        <p className="mt-10 text-sm text-white/40">{t('projects.noCaseStudy')}</p>
      )}
    </div>
  );
}
