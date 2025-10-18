import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Code, ChevronDown } from 'lucide-react';
import { TIMELINE } from '../../constants/timelineData';
import { useIntersectionObserver } from '../../hooks';

/**
 * ============================================
 * TIMELINE COMPONENT
 * ============================================
 * Timeline vertical avec:
 * - Icons par type
 * - Animations au scroll
 * - Expandable details
 * - Color coding
 * - Responsive design
 * ============================================
 */

// ============================================
// TYPE ICONS & COLORS
// ============================================
const TYPE_CONFIG = {
  work: {
    icon: Briefcase,
    color: 'blue',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-500',
  },
  education: {
    icon: GraduationCap,
    color: 'green',
    bgColor: 'bg-green-100 dark:bg-green-900',
    textColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-500',
  },
  project: {
    icon: Code,
    color: 'purple',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-500',
  },
  achievement: {
    icon: Award,
    color: 'yellow',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    borderColor: 'border-yellow-500',
  },
};

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Timeline Item
 */
const TimelineItem = ({ item, index, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.5 });
  
  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.work;
  const Icon = config.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex gap-6 group"
    >
      {/* Timeline Line & Icon */}
      <div className="relative flex flex-col items-center">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 5 }}
          className={`
            relative z-10 w-12 h-12 rounded-full flex items-center justify-center
            ${config.bgColor} ${config.borderColor} border-4
            shadow-lg group-hover:shadow-xl transition-shadow
          `}
        >
          <Icon className={`w-6 h-6 ${config.textColor}`} />
        </motion.div>

        {/* Vertical Line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isVisible ? { height: '100%' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`w-1 flex-1 ${config.bgColor} mt-2`}
          />
        )}
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ x: 5 }}
        className="flex-1 pb-3"
      >
        <div className={`
          bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl 
          transition-shadow p-3 border-l-4 ${config.borderColor}
        `}>
          {/* Year Badge */}
          <div className="flex items-start justify-between mb-3">
            <span className={`
              inline-block px-3 py-1 rounded-full text-xs font-bold
              ${config.bgColor} ${config.textColor}
            `}>
              {item.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>

          {/* Expand Button (if more details) */}
          {item.details && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`
                mt-4 flex items-center space-x-2 text-sm font-medium
                ${config.textColor} hover:underline transition-colors
              `}
            >
              <span>{isExpanded ? 'Voir moins' : 'Voir plus'}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          )}

          {/* Expandable Details */}
          <AnimatePresence>
            {isExpanded && item.details && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.details}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Filter Tabs
 */
const FilterTabs = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', label: 'Tout', icon: null },
    { id: 'work', label: 'Travail', icon: Briefcase },
    { id: 'education', label: 'Formation', icon: GraduationCap },
    { id: 'project', label: 'Projets', icon: Code },
    { id: 'achievement', label: 'Prix', icon: Award },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;

        return (
          <motion.button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium
              transition-all shadow-md
              ${isActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{filter.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  // Filter timeline items
  const filteredTimeline = activeFilter === 'all'
    ? TIMELINE
    : TIMELINE.filter(item => item.type === activeFilter);

  return (
    <section id="timeline" className="my-20 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mon Parcours & Expériences
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            De mes études à mes expériences professionnelles, découvrez mon évolution
          </p>
        </motion.div>

        {/* Filters */}
        <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {/* Timeline */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredTimeline.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                  isLast={index === filteredTimeline.length - 1}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTimeline.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Aucun élément dans cette catégorie
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}