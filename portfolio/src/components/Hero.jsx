import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="my-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400"
      >
        Moussa Ismael
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300"
      >
        Développeur Full Stack | IA & Cybersécurité Enthousiaste
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6 flex justify-center gap-4"
      >
        <a
          href="#contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
        >
          Me contacter
        </a>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded shadow"
        >
          Télécharger mon CV
        </a>
      </motion.div>
    </section>
  );
}

