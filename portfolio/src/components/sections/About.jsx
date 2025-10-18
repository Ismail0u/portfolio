import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, GraduationCap, Heart, MapPin, Calendar } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants/personalInfo';
import { ANIMATION_VARIANTS } from '../../constants/themeConfiguration';
import { useIntersectionObserver } from '../../hooks';

/**
 * ============================================
 * ABOUT COMPONENT
 * ============================================
 * Section "À propos" avec:
 * - Image interactive avec zoom
 * - Stats animées
 * - Badges technologiques
 * - Timeline mini
 * - Fun facts
 * 
 * Principes appliqués:
 * - Component Composition
 * - Lazy Animation (only when visible)
 * - Interactive UI
 * ============================================
 */

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Profile Image with Interactive Zoom
 */
const ProfileImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <motion.div
        className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-500 dark:border-blue-400 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
          <span className="text-white text-xs font-medium">Click to zoom</span>
        </div>
      </motion.div>

      {/* Zoomed Modal */}
      {isZoomed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <motion.img
            src={src}
            alt={alt}
            className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
      )}
    </>
  );
};

/**
 * Animated Stat Card
 */
const StatCard = ({ icon: Icon, value, label, delay = 0 }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center p-2 bg-blue-50 dark:bg-gray-800 rounded-xl"
    >
      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-1" />
      <span className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </span>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </motion.div>
  );
};

/**
 * Tech Badge with Hover Effect
 */
const TechBadge = ({ name, color = 'blue', delay = 0 }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.1, y: -2 }}
      className={`${colors[color]} text-sm font-medium px-3 py-1 rounded-full cursor-pointer transition-shadow hover:shadow-lg`}
    >
      {name}
    </motion.span>
  );
};
// ============================================
// MAIN COMPONENT
// ============================================

export default function About() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  // Stats data
  const stats = [
    { icon: Code, value: '2+', label: 'Années Coding' },
    { icon: Briefcase, value: '7+', label: 'Projets' },
    { icon: GraduationCap, value: '6+', label: 'Certifications' },
    { icon: Heart, value: '∞', label: 'Passion' },
  ];

  // Tech stack
  const techStack = [
    { name: 'Django', color: 'green' },
    { name: 'React', color: 'blue' },
    { name: 'React Native', color: 'blue' },
    { name: 'Python', color: 'yellow' },
    { name: 'JavaScript', color: 'yellow' },
    { name: 'PostgreSQL', color: 'blue' },
    { name: 'TailwindCSS', color: 'blue' },
    { name: 'Three.js', color: 'purple' },
  ];
  return (
    <section id="about" className="my-10 px-4" ref={ref}>
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-4 max-w-5xl mx-auto overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2
            className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
            {...ANIMATION_VARIANTS.fadeIn}
          >
            À propos de moi
          </motion.h2>
          <motion.div
            className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MapPin className="w-4 h-4" />
            <span>{PERSONAL_INFO.location}</span>
            <span>•</span>
            <Calendar className="w-4 h-4" />
            <span>Disponible</span>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left: Image + Info */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <ProfileImage
              src="assets/image/image2.jpeg"
              alt={PERSONAL_INFO.name}
            />

            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                Étudiant en génie logiciel à l'EMIG, passionné par le développement web 
                et l'intelligence artificielle. J'ai récemment effectué un stage chez{' '}
                <strong>Novatech Niger</strong> et à la <strong>Nigelec</strong>.
                Je suis également membre du <strong> DevByte Community</strong>.
              </p>
            </div>
          </div>

          {/* Right: Stats + Tech */}
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <StatCard key={i} {...stat} delay={i * 0.1} />
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Technologies maîtrisées
              </h4>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, i) => (
                  <TechBadge key={i} {...tech} delay={i * 0.05} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
            {/* Quote */}
            <motion.blockquote
              className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              "Façonner l'avenir par des solutions logicielles utiles, pérennes et esthétiques."
            </motion.blockquote>

        {/* CTA Section */}
        <motion.div
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Intéressé par une collaboration ? Discutons de votre projet !
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-lg transition-colors"
          >
            Me contacter
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}