import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, ArrowUpRight, X } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../constants/personalInfo';
import { trackEvent, pickLang } from '../../utils';

/**
 * ============================================
 * HERO — direction "sobre, structuré, senior"
 * ============================================
 * Principes appliqués :
 * - Fond noir statique (pas de gradient animé, pas de particules)
 * - Une seule zone claire à fort contraste (la carte photo)
 * - Titres en deux niveaux : mot plein (blanc) / mot muted (gris)
 * - Animation limitée à un fade-in + léger slide au montage
 * - Couleur utilisée en accent ciblé, jamais en glow ambiant
 * ============================================
 */

// Variants d'animation partagés — un seul pattern, réutilisé partout
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

/**
 * Titre à deux niveaux : ligne pleine + ligne muted, même taille.
 * Pattern réutilisable pour toutes les sections (Projects, Timeline, Skills...).
 */
export function SectionHeading({ top, bottom, align = 'left' }) {
  return (
    <h2
      className={`font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
    >
      <span className="block text-white">{top}</span>
      <span className="block text-white/30">{bottom}</span>
    </h2>
  );
}

// Carte photo — la seule zone "claire" de la page
const ProfileCard = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    custom={0}
    className="relative w-full max-w-[280px] mx-auto lg:mx-0"
  >
    <div className="bg-paper rounded-2xl p-5 shadow-xl">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-accent to-accent2">
        <img
          src="/assets/image/isma12.jpeg"
          alt={PERSONAL_INFO.name}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <p className="mt-4 text-center font-display font-bold text-ink text-lg">
        {PERSONAL_INFO.name}
      </p>
      <p className="mt-1 text-center text-xs text-ink/60 leading-snug px-2">
        {PERSONAL_INFO.title} — {PERSONAL_INFO.location}
      </p>

      <div className="mt-4 flex items-center justify-center gap-3">
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-accent hover:text-white transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-accent hover:text-white transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href={SOCIAL_LINKS.email}
          aria-label="Email"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-accent hover:text-white transition-colors"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </div>
  </motion.div>
);

// Ligne de statistiques — remplace les jauges de % arbitraires par des chiffres factuels
const Stat = ({ value, label, delay }) => (
  <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={delay}>
    <div className="font-display font-bold text-3xl sm:text-4xl text-white">{value}</div>
    <div className="text-[11px] uppercase tracking-wider text-white/40 mt-1">{label}</div>
  </motion.div>
);

// Bloc d'expertise — équivalent des cartes orange/lime, adapté à la stack réelle
const ExpertiseBlock = ({ title, tone, delay }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    custom={delay}
    className={`relative rounded-xl p-5 min-h-[110px] flex flex-col justify-between ${
      tone === 'primary' ? 'bg-accent' : 'bg-accent2'
    }`}
  >
    <p className="font-display font-semibold text-sm leading-snug text-ink pr-6">{title}</p>
    <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-ink/70" />
  </motion.div>
);

// Modale de sélection de langue pour le CV — inchangée dans sa fonction, allégée dans le style
const CVModal = ({ isOpen, onClose, onDownload, t }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-ink-soft border border-white/10 rounded-2xl w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
        <p className="font-display font-bold text-white text-lg mb-1">{t('hero.cvModalTitle')}</p>
        <p className="text-white/50 text-sm mb-5">{t('hero.cvModalSubtitle')}</p>
        <div className="flex gap-3">
          <button
            onClick={() => onDownload('fr')}
            className="flex-1 py-3 rounded-lg border border-white/15 text-white text-sm font-medium hover:border-accent hover:text-accent transition-colors"
          >
            {t('hero.cvModalFrench')}
          </button>
          <button
            onClick={() => onDownload('en')}
            className="flex-1 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-soft transition-colors"
          >
            {t('hero.cvModalEnglish')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCVDownload = useCallback((language) => {
    const cvUrls = { fr: '/cv-fr.pdf', en: '/cv-en.pdf' };
    const fileName =
      language === 'fr' ? 'MOUSSA_Ismael_CV_FR.pdf' : 'MOUSSA_Ismael_Resume_EN.pdf';

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
        {/* Colonne gauche — carte photo, sticky en desktop */}
        <div className="lg:sticky lg:top-24">
          <ProfileCard />
        </div>

        {/* Colonne droite — contenu */}
        <div>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.1} className="brand-glow">
            <SectionHeading top={t('hero.titleTop')} bottom={t('hero.titleBottom')} />
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="mt-5 text-white/60 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            {pickLang(PERSONAL_INFO, 'pitch', lang)}
          </motion.p>

          {/* Domaines — élargit le positionnement au-delà de "full-stack dev" */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="mt-4 flex flex-wrap gap-2"
          >
            {PERSONAL_INFO.domains.map((domain) => (
              <span
                key={domain}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/60"
              >
                {domain}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat value="3+" label={t('hero.statExperience')} delay={0.3} />
            <Stat value="12+" label={t('hero.statProjects')} delay={0.35} />
            <Stat value="6+" label={t('hero.statTech')} delay={0.4} />
          </div>

          {/* Blocs d'expertise — à ajuster avec les vraies spécialités */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-xl">
            <ExpertiseBlock
              title={t('hero.expertiseBlock1')}
              tone="primary"
              delay={0.45}
            />
            <ExpertiseBlock
              title={t('hero.expertiseBlock2')}
              tone="secondary"
              delay={0.5}
            />
          </div>

          {/* CTA */}
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
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white text-sm font-medium hover:border-white/40 transition-colors"
            >
              <Download className="w-4 h-4" />
              {t('hero.ctaDownloadCV')}
            </button>
          </motion.div>
        </div>
      </div>

      <CVModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={handleCVDownload}
        t={t}
      />
    </section>
  );
}
