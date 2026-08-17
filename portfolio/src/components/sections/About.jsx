import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from './Hero';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

export default function About() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  return (
    <section id="about" className="py-16 sm:py-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <SectionHeading top={t('about.headingTop')} bottom={t('about.headingBottom')} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.1}
        className="mt-6 max-w-2xl space-y-4 text-white/60 leading-relaxed"
      >
        {isEn ? (
          <p>
            Master's student in Software Engineering at EMIG, I build full-stack web and mobile
            applications (React, React Native, Django) with a particular interest in applied AI.
            I've interned at <span className="text-white">Novatech Niger</span> and{' '}
            <span className="text-white">Nigelec</span>, and I currently collaborate with{' '}
            <span className="text-white">Nexcellus</span> and the{' '}
            <span className="text-white">DevByte Community</span> on open source projects.
          </p>
        ) : (
          <p>
            Étudiant en Master Génie Logiciel à l'EMIG, je développe des applications web et mobiles
            full-stack (React, React Native, Django) avec un intérêt particulier pour l'IA appliquée.
            J'ai effectué des stages chez <span className="text-white">Novatech Niger</span> et à la{' '}
            <span className="text-white">Nigelec</span>, et je collabore aujourd'hui avec{' '}
            <span className="text-white">Nexcellus</span> ainsi que la{' '}
            <span className="text-white">DevByte Community</span> sur des projets open source.
          </p>
        )}
      </motion.div>

      <motion.blockquote
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.2}
        className="mt-8 pl-4 border-l-2 border-accent text-white/70 italic max-w-xl"
      >
        {isEn
          ? '"Shaping the future through software that is useful, durable, and well-crafted."'
          : "« Façonner l'avenir par des solutions logicielles utiles, pérennes et esthétiques. »"}
      </motion.blockquote>
    </section>
  );
}
