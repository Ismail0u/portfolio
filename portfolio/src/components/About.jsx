import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/image/isma1.png';

export default function About() {
  return (
    <section id="about" className="my-20 px-4">
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center sm:text-left">
          À propos de moi
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Photo animée */}
          <motion.div
            className="w-32 h-32 rounded-full overflow-hidden shadow-md border-2 border-blue-500"
            whileHover={{ scale: 1.5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src={image1}
              alt="Moussa Ismael"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Texte info */}
          <div className="flex-1">
            <p className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
              Étudiant en génie logiciel à l'EMIG.
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Passionné par le développement web et l’intelligence artificielle.
              J’ai récemment effectué un stage chez <strong>Novatech Niger</strong> (Avril–Juin 2025),
              où j'ai travaillé sur un projet  mêlant React, Django et Python.
              J’ai également effectué un stage à la <strong>Nigelec</strong> (Juillet-Septembre 2024),
            </p>

            {/* Badges technos */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Django</span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">React</span>
              <span className="bg-blue-200 text-blue-900 text-sm font-medium px-3 py-1 rounded-full">React Native</span>
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">Python</span>
            </div>

            {/* Citation */}
            <p className="italic text-sm text-gray-500 mt-6">
              "Créer des solutions utiles, durables et élégantes, voilà mon objectif."
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
