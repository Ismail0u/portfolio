import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, Settings, PenTool, Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../constants/servicesData';
import { useIntersectionObserver } from '../../hooks';
import { PERSONAL_INFO } from '../../constants/personalInfo';
/**
 * ============================================
 * SERVICES COMPONENT
 * ============================================
 * Section services avec:
 * - Cards interactives
 * - Pricing details
 * - Features lists
 * - CTA buttons
 * - Hover effects
 * ============================================
 */

// ============================================
// ICONS MAPPING
// ============================================
const SERVICE_ICONS = {
  Code,
  Monitor,
  Settings,
  PenTool,
};

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Service Card
 */
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  
  const Icon = SERVICE_ICONS[service.icon] || Code;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-4">
        {/* Icon */}
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0 
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="inline-block p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg mb-6"
        >
          <Icon className="w-8 h-8" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
          {service.description}
        </p>

        {/* Features List */}
        {service.features && (
          <ul className="space-y-2 mb-2">
            {service.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start text-sm text-gray-700 dark:text-gray-300"
              >
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 my-3" />

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Tarif
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {service.price}
            </p>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
          >
            <span>Devis</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* Accent Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

/**
 * Stats Section
 */
const StatsSection = () => {
  const stats = [
    { value: '10+', label: 'Projets Livrés' },
    { value: '100%', label: 'Satisfaction Client' },
    { value: '24h', label: 'Temps de Réponse' },
    { value: '3+', label: 'Ans d\'Expérience' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl"
        >
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {stat.value}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Process Section
 */
const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'Discutons de votre projet et de vos besoins',
    },
    {
      number: '02',
      title: 'Proposition',
      description: 'Je vous présente une solution adaptée',
    },
    {
      number: '03',
      title: 'Développement',
      description: 'Création de votre solution avec suivi régulier',
    },
    {
      number: '04',
      title: 'Livraison',
      description: 'Déploiement et formation si nécessaire',
    },
  ];

  return (
    <div className="mt-10  rounded-3xl p-12">
      <div className="text-center mb-2">
        <h3 className="text-3xl font-bold text-gray-200 dark:text-white mb-2">
          Comment je travaille
        </h3>
        <p className="text-gray-100 dark:text-gray-400 max-w-2xl mx-auto">
          Un processus simple et transparent pour garantir votre satisfaction
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center"
          >
            {/* Number Badge */}
            <div className="inline-block mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-blue-300 dark:bg-blue-700" />
                )}
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-50 dark:text-white mb-2">
              {step.title}
            </h4>
            <p className="text-sm text-gray-200 dark:text-gray-400">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function Services() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="services" className="my-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
        >
          <motion.span
            className="inline-block px-2 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Services
          </motion.span>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-50 dark:text-white mb-3">
            Comment je peux vous aider
          </h2>

          <p className="text-gray-200 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            Des solutions sur mesure pour transformer vos idées en réalité digitale.
            Du concept au déploiement, je vous accompagne à chaque étape.
          </p>
        </motion.div>

        {/* Stats 
        <StatsSection /> */}
        

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-7 mb-5">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Process */}
        <ProcessSection />

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-2">
            Prêt à démarrer votre projet ?
          </h3>
          <p className="text-blue-100 mb-3 max-w-2xl mx-auto">
            Discutons de votre idée et voyons comment je peux vous aider à la concrétiser.
            Consultation gratuite et sans engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <span>Demander un devis</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href={`https://wa.me/${PERSONAL_INFO.phone.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.520.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}