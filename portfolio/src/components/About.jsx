import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="my-16">
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          À propos de moi
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Photo Profil (optionnelle si déjà en haut) */}
          <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden shadow-md">
            {/* 👉🏽 Met ici une version différente si souhaitée */}
            <img
              src="/path-to-your-photo.jpg"
              alt="Moussa Ismael"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Infos texte */}
          <div>
            <p className="text-lg font-medium mb-2">
              Étudiant en génie logiciel à l'EMIG.
            </p>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              Passionné par le développement web, mobile et l’intelligence artificielle.
              J’ai récemment effectué un stage chez <strong>Novatech Niger</strong> (Avril–Juin 2025).
              <br />
              <br />
              <strong>Technos maîtrisées :</strong> Django, React, React Native, Python.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
