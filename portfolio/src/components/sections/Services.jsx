import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code, Monitor, Settings, PenTool, Cpu, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../constants/servicesData';
import { SOCIAL_LINKS } from '../../constants/personalInfo';
import SectionHeading from '../common/SectionHeading';
import { pickLang } from '../../utils';
import { fadeUp } from '../../constants/motionVariants';

const SERVICE_ICONS = { Code, Monitor, Settings, PenTool, Cpu };

const ServiceRow = ({ service, delay, lang, t }) => {
  const Icon = SERVICE_ICONS[service.icon] || Code;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      custom={delay}
    >
      <Link
        to="/contact"
        className="group flex items-start gap-4 py-5 border-b border-fg/10 hover:border-fg/20 transition-colors"
      >
        <div className="w-9 h-9 rounded-lg bg-fg/5 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-fg/70" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-fg group-hover:text-accent-soft transition-colors">
            {pickLang(service, 'title', lang)}
          </h3>
          <p className="mt-1 text-sm text-fg/50 leading-relaxed max-w-xl">
            {pickLang(service, 'description', lang)}
          </p>
          <p className="mt-2 text-xs text-fg/30">{t(`services.${service.priceKey}`)}</p>
        </div>
        <ArrowUpRight className="w-4 h-4 text-fg/20 group-hover:text-fg transition-colors shrink-0 mt-1" />
      </Link>
    </motion.div>
  );
};

export default function Services() {
  const { t, i18n } = useTranslation();

  return (
    <section id="services" className="py-16 sm:py-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <SectionHeading top={t('services.headingTop')} bottom={t('services.headingBottom')} />
      </motion.div>

      <div className="mt-10 max-w-2xl">
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.id} service={service} delay={0.05 * i} lang={i18n.language} t={t} />
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.2}
        className="mt-8 flex flex-wrap gap-3"
      >
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-fg/15 text-fg text-sm font-medium hover:border-fg/40 transition-colors"
        >
          {t('services.chatWhatsApp')}
        </a>
      </motion.div>
    </section>
  );
}
