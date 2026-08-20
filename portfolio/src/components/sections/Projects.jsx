import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, ArrowUpRight } from 'lucide-react';
import { PROJECTS, CATEGORY_ACCENT } from '../../constants/projectsData';
import { trackEvent, pickLang } from '../../utils';
import SectionHeading from '../common/SectionHeading';
import { fadeUp } from '../../constants/motionVariants';

const ProjectRow = ({ project, delay, lang, t }) => {
  const accent = CATEGORY_ACCENT[project.category] || 'accent';
  const hasCaseStudy = Boolean(project.caseStudy);
  const Wrapper = hasCaseStudy ? Link : motion.a;
  const wrapperProps = hasCaseStudy
    ? { to: `/work/${project.slug}` }
    : {
        href: project.demo || project.github,
        target: '_blank',
        rel: 'noopener noreferrer',
        onClick: () =>
          trackEvent(project.demo ? 'project_demo_click' : 'project_github_click', {
            project: project.title,
          }),
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={delay}
    >
      <Wrapper
        {...wrapperProps}
        className="group flex items-start gap-4 py-5 border-b border-fg/10 hover:border-fg/20 transition-colors"
      >
        <span
          className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
            accent === 'accent2' ? 'bg-accent2' : 'bg-accent'
          }`}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-fg group-hover:text-accent-soft transition-colors">
              {project.title}
            </h3>
            <span className="text-xs text-fg/30">{project.year}</span>
            {hasCaseStudy && (
              <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-accent/15 text-accent-soft">
                {t('projects.caseStudyBadge')}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-fg/50 leading-relaxed max-w-xl">
            {pickLang(project, 'description', lang)}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="text-[11px] px-2 py-0.5 rounded-full bg-fg/5 text-fg/40">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-fg/30 group-hover:text-fg transition-colors">
          {!hasCaseStudy && <Github className="w-4 h-4" />}
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </Wrapper>
    </motion.div>
  );
};

/**
 * @param {number} [limit] - si fourni, n'affiche que les N premiers projets marqués `featured`
 * @param {boolean} [showViewAll] - affiche un lien "View all projects" (utile en preview Home)
 */
export default function Projects({ limit, showViewAll = false, headingTop, headingBottom }) {
  const { t, i18n } = useTranslation();
  const top = headingTop ?? t('projects.headingTop');
  const bottom = headingBottom ?? t('projects.headingBottom');
  const list = limit ? PROJECTS.filter((p) => p.featured).slice(0, limit) : PROJECTS;

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeading top={top} bottom={bottom} />
        </motion.div>
        {showViewAll && (
          <Link
            to="/work"
            className="text-sm font-medium text-fg/50 hover:text-fg transition-colors inline-flex items-center gap-1"
          >
            {t('projects.viewAll')} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="mt-10 max-w-3xl">
        {list.map((project, i) => (
          <ProjectRow key={project.id} project={project} delay={0.05 * i} lang={i18n.language} t={t} />
        ))}
      </div>
    </section>
  );
}
