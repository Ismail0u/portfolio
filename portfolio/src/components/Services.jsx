import React from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, Settings, PenTool } from 'lucide-react';

const services = [
  {
    icon: <Code className="w-12 h-12 text-blue-500" />,
    title: 'Développement Web',
    description:
      "Création d'applications web robustes avec Django et React, adaptées à vos besoins spécifiques.",
    price: 'Sur devis',
  },
  {
    icon: <Monitor className="w-12 h-12 text-green-500" />,
    title: 'Création de Sites Vitrines & Présence Web',
    description:
      "Sites professionnels et esthétiques pour valoriser votre activité en ligne. Je m'assure que votre site est non seulement beau, mais aussi fonctionnel et facile à utiliser pour vos visiteurs.",
    price: 'Sur devis',
  },
  {
    icon: <Settings className="w-12 h-12 text-purple-500" />,
    title: 'Entretien & Support',
    description:
      "Mises à jour, sécurité et optimisation pour que votre site fonctionne sans accroc, vous libérant du temps pour votre activité.",
    price: 'Forfait mensuel',
  },
  {
    icon: <PenTool className="w-12 h-12 text-pink-500" />,
    title: 'Infographie & Design',
    description:
      "Création de supports visuels professionnels (logos, flyers, posts réseaux sociaux,affiches) pour une communication digitale impactante.",
    price: 'Sur devis',
    secondary: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="my-20 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">
        Mes Services
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3, duration: 0.6 }}
          >
             {s.secondary && (
             <span className="absolute top-4 right-4 bg-yellow-400 text-xs font-semibold text-gray-900 px-2 py-1 rounded-full">
               Optionnel
             </span>
           )}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-full mb-4 shadow-md">
              {s.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              {s.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {s.description}
            </p>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {s.price}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
