import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Calendar, Code, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useIntersectionObserver } from '../../hooks';
import { trackEvent } from '../../utils';

/**
 * ============================================
 * PROJECTS COMPONENT
 * ============================================
 * Galerie de projets avec:
 * - Filtres par technologie
 * - Modal détails
 * - Images carousel
 * - Links GitHub/Demo
 * - Animations sophistiquées
 * ============================================
 */

// ============================================
// PROJECTS DATA (À déplacer dans constants/)
// ============================================
const PROJECTS_DATA = [
  {
    id: 1,
    title: 'EMIG Resto',
    slug: 'emig-resto',
    description: "Application complète pour la gestion d'un restaurant. Admin web (React) + app mobile client (React Native). Backend Django.",
    longDescription: "Application full-stack complète pour la digitalisation d'un restaurant universitaire. Interface admin web pour gestion des menus, commandes et statistiques. Application mobile pour les étudiants avec système de tickets numériques et réservations.",
    images: ['/assets/image/emigResto1.PNG', '/src/assets/image/emigresto2.PNG'],
    github: 'https://github.com/Ismail0u/EMIG_Resto',
    demo: '',
    tech: ['React', 'Django', 'React Native', 'PostgreSQL'],
    category: 'fullstack',
    featured: true,
    year: '2025',
    status: 'completed',
    features: [
      'Interface admin responsive',
      'App mobile React Native',
      'Système de tickets numériques',
      'Gestion des réservations',
      'Statistiques en temps réel',
    ],
  },
  {
    id: 2,
    title: 'FaceLogin',
    slug: 'facelogin',
    description: "Système d'authentification par reconnaissance faciale basé sur DeepFace et Streamlit.",
    longDescription: "Système d'authentification innovant utilisant la reconnaissance faciale. Basé sur DeepFace pour l'analyse biométrique et Streamlit pour l'interface. Prise en charge de la webcam en temps réel.",
    images: ['/assets/image/facelog.PNG'],
    github: 'https://github.com/Ismail0u/FaceLogin',
    demo: 'https://facelogin-8td8.onrender.com/',
    tech: ['Python', 'DeepFace', 'Streamlit', 'OpenCV'],
    category: 'ai',
    featured: true,
    year: '2024',
    status: 'completed',
    features: [
      'Reconnaissance faciale temps réel',
      'Base DeepFace',
      'Interface Streamlit',
      'Authentification sécurisée',
    ],
  },
  {
    id: 3,
    title: 'Kayanabinchi',
    slug: 'kayanabinchi',
    description: "Plateforme complète pour gérer les stocks et réservations dans une école.",
    longDescription: "Solution de gestion complète pour établissement scolaire. Gestion des stocks alimentaire, gestion des reservations de plats. Interface admin puissante.",
    images: ['/assets/image/C1.PNG'],
    github: 'https://github.com/Ismail0u/projet_industrielEMIG',
    demo: '',
    tech: ['React', 'Django', 'MySQL'],
    category: 'fullstack',
    featured: false,
    year: '2024',
    status: 'completed',
    features: [
      'Gestion des stocks',
      'Système de réservation',
      'Planning interactif',
      'Dashboard analytics',
    ],
  },
  {
    id: 4,
    title: 'NiBot',
    slug: 'nibot',
    description: "Chatbot éducatif avec traitement NLP, synthèse vocale et interaction en français.",
    longDescription: "Chatbot éducatif spécialisé dans les questions sur le Niger. Utilise NLTK pour le traitement du langage naturel et intègre la synthèse vocale. Base de connaissances extensible.",
    images: ['/assets/image/NIBOT.PNG'],
    github: 'https://github.com/Ismail0u/miniChatBot_python',
    demo: 'https://minichatbot-python.onrender.com/',
    tech: ['Python', 'NLTK', 'Streamlit', 'TTS'],
    category: 'ai',
    featured: true,
    year: '2024',
    status: 'completed',
    features: [
      'NLP avec NLTK',
      'Synthèse vocale',
      'Base de connaissances',
      'Interface conversationnelle',
    ],
  },
];

// ============================================
// FILTERS CONFIG
// ============================================
const FILTERS = [
  { id: 'all', label: 'Tous', color: 'blue' },
  { id: 'fullstack', label: 'Full Stack', color: 'purple' },
  { id: 'ai', label: 'IA/ML', color: 'green' },
  { id: 'featured', label: '⭐ Featured', color: 'yellow' },
];

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Filter Button
 */
const FilterButton = ({ filter, isActive, onClick, count }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`
      px-4 py-2 rounded-full text-sm font-medium transition-all
      ${isActive
        ? 'bg-blue-600 text-white shadow-lg'
        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }
    `}
  >
    {filter.label}
    {count > 0 && (
      <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
        {count}
      </span>
    )}
  </motion.button>
);

/**
 * Project Card
 */
const ProjectCard = ({ project, onClick, index }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(project)}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white text-sm font-medium">
            Cliquer pour plus de détails →
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {project.year}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center space-x-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                trackEvent('project_github_click', { project: project.title });
              }}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
            >
              <Github className="w-4 h-4 mr-1" />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                trackEvent('project_demo_click', { project: project.title });
              }}
              className="flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Démo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Project Detail Modal
 */
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {project.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {project.year} • {project.status === 'completed' ? '✅ Terminé' : '🚧 En cours'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Images Carousel */}
          {project.images.length > 0 && (
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              className="mb-6 rounded-xl overflow-hidden"
            >
              {project.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full h-80 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Features */}
          {project.features && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Fonctionnalités
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Technologies utilisées
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>Voir le code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Voir la démo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  // Filter projects
  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="my-2 px-2" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Mes Projets
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Une sélection de mes réalisations, du web au mobile en passant par l'IA
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {FILTERS.map((filter) => {
            const count = filter.id === 'all'
              ? PROJECTS_DATA.length
              : filter.id === 'featured'
              ? PROJECTS_DATA.filter(p => p.featured).length
              : PROJECTS_DATA.filter(p => p.category === filter.id).length;

            return (
              <FilterButton
                key={filter.id}
                filter={filter}
                isActive={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
                count={count}
              />
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Aucun projet dans cette catégorie pour le moment
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}