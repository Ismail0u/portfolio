import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../../constants/personalInfo';
import { fadeUp } from '../../../constants/motionVariants';

const SOCIAL_ICON_CLASS =
  'w-8 h-8 flex items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-accent hover:text-white transition-colors';

export default function ProfileCard() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={0}
      className="relative w-full max-w-70 mx-auto lg:mx-0"
    >
      <div className="bg-bg rounded-2xl p-5 shadow-xl">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-linear-to-br from-accent to-accent2">
          <img
            src="/assets/image/isma12.jpeg"
            alt={PERSONAL_INFO.name}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        
        <p className="mt-4 text-center font-display font-bold text-fg text-lg">
          {PERSONAL_INFO.name}
        </p>
        <p className="mt-1 text-center text-xs text-fg/60 leading-snug px-2">
          {PERSONAL_INFO.title} — {PERSONAL_INFO.location}
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={SOCIAL_ICON_CLASS}>
            <Github className="w-4 h-4" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={SOCIAL_ICON_CLASS}>
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={SOCIAL_LINKS.email} aria-label="Email" className={SOCIAL_ICON_CLASS}>
            <Mail className="w-4 h-4" />
          </a>
        </div>
      
      </div>
    </motion.div>
  );
}
