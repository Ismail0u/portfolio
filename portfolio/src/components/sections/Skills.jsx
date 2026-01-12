import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact, FaPython, FaHtml5, FaCss3Alt, FaGithub, FaNodeJs, FaDatabase
} from 'react-icons/fa';
import {
  SiTailwindcss, SiDjango, SiJavascript, SiMysql, SiPostgresql,
  SiStreamlit, SiFigma, SiAdobephotoshop
} from 'react-icons/si';
import { Code, Palette, Server, Brain, Filter } from 'lucide-react';
import { SKILLS } from '../../constants/skillData';
import { useIntersectionObserver } from '../../hooks';

/**
 * ============================================
 * SKILLS COMPONENT
 * ============================================
 * Section compétences avec:
 * - Filtres par catégorie
 * - Progress bars animées
 * - Icons pour chaque skill
 * - Grid responsive
 * - Animations au scroll
 * ============================================
 */

// ============================================
// SKILL ICONS MAPPING
// ============================================
const SKILL_ICONS = {
  React: FaReact,
  Django: SiDjango,
  Python: FaPython,
  JavaScript: SiJavascript,
  TailwindCSS: SiTailwindcss,
  'Node.js': FaNodeJs,
  CSS3: FaCss3Alt,
  HTML5: FaHtml5,
  GitHub: FaGithub,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Streamlit: SiStreamlit,
  NLTK: Brain,
  Figma: SiFigma,
  Photoshop: SiAdobephotoshop,
};

// ============================================
// CATEGORIES CONFIG
// ============================================
const CATEGORIES = [
  { id: 'all', label: 'Toutes', icon: Code, color: 'blue' },
  { id: 'frontend', label: 'Frontend', icon: Palette, color: 'purple' },
  { id: 'backend', label: 'Backend', icon: Server, color: 'green' },
  { id: 'database', label: 'Database', icon: FaDatabase, color: 'orange' },
  { id: 'tools', label: 'Tools', icon: Filter, color: 'pink' },
  { id: 'ai', label: 'AI/ML', icon: Brain, color: 'indigo' },
];

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Category Filter Button
 */
const CategoryButton = ({ category, isActive, onClick }) => {
  const Icon = category.icon;
  
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-4 py-2 rounded-full flex items-center space-x-2 transition-all
        ${isActive
          ? `bg-${category.color}-600 text-white shadow-lg`
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{category.label}</span>
      
      {isActive && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
};
/**
 * Skill Card
 */
const SkillCard = ({ skill, index }) => {
  const Icon = SKILL_ICONS[skill.name] || Code;
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  // Color based on category
  const categoryColors = {
    frontend: 'purple',
    backend: 'green',
    database: 'orange',
    tools: 'pink',
    ai: 'indigo',
  };
  
  const color = categoryColors[skill.category] || 'blue';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="rounded-xl shadow-zinc-100 p-4 hover:shadow-2xs transition-shadow"
    >
      {/* Icon + Name */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-1 bg-${color}-800 dark:bg-${color}-900 rounded-lg`}>
            <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-400`} />
          </div>
          <h6 className="text-lg font-semibold text-gray-100 dark:text-white">
            {skill.name}
          </h6>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  // Filter skills based on category
  const allSkills = Object.values(SKILLS).flat();
  const filteredSkills = activeCategory === 'all'
    ? allSkills
    : allSkills.filter(skill => skill.category === activeCategory);

  // Calculate average level
  const avgLevel = Math.round(
    filteredSkills.reduce((sum, skill) => sum + skill.level, 0) / filteredSkills.length
  );

  return (
    <section id="skills" className="my-20 px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Compétences Techniques
          </motion.h2>
          <motion.p
            className="text-gray-200 dark:text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Une sélection de technologies que je maîtrise, constamment en évolution
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {CATEGORIES.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-200 dark:text-gray-400 mb-4">
            En constante évolution et apprentissage !
          </p>
          <a
            href="https://github.com/Ismail0u"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FaGithub className="w-5 h-5" />
            <span>Voir mes projets sur GitHub</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}