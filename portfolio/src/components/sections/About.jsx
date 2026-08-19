import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../common/SectionHeading';
import { fadeUp } from '../../constants/motionVariants';

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
        className="mt-6 max-w-2xl space-y-4 text-fg/60 leading-relaxed"
      >
        {isEn ? (
          <p>
            Master's student in Software Engineering at EMIG, I build full-stack web and mobile
            applications (React, Next.js, Django, FastAPI) with a particular interest in applied AI —
            currently interning at <span className="text-fg">JaciGreen</span>, fine-tuning a YOLOv8
            computer-vision model. I've also worked with{' '}
            <span className="text-fg">Nexcellus</span>, <span className="text-fg">Novatech Niger</span>,{' '}
            <span className="text-fg">Nigelec</span>, and I contribute to the{' '}
            <span className="text-fg">DevByte Community</span> on open source projects.
          </p>
        ) : (
          <p>
            Étudiant en Master Génie Logiciel à l'EMIG, je développe des applications web et mobiles
            full-stack (React, Next.js, Django, FastAPI) avec un intérêt particulier pour l'IA
            appliquée — actuellement en stage chez <span className="text-fg">JaciGreen</span>, où je
            travaille sur le fine-tuning d'un modèle YOLOv8 de vision par ordinateur. J'ai également
            collaboré avec <span className="text-fg">Nexcellus</span>,{' '}
            <span className="text-fg">Novatech Niger</span>, la{' '}
            <span className="text-fg">Nigelec</span>, et je contribue à la{' '}
            <span className="text-fg">DevByte Community</span> sur des projets open source.
          </p>
        )}
      </motion.div>

      <motion.blockquote
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.2}
        className="mt-8 pl-4 border-l-2 border-accent text-fg/70 italic max-w-xl"
      >
        {isEn
          ? '"Shaping the future through software that is useful, durable, and well-crafted."'
          : "« Façonner l'avenir par des solutions logicielles utiles, pérennes et esthétiques. »"}
      </motion.blockquote>
    </section>
  );
}
