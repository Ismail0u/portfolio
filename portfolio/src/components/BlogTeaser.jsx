// src/components/BlogTeaser.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function BlogTeaser() {
  return (
    <motion.section
      id="blog-teaser"
      className="my-20 px-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        Bientôt : Mon Blog Technique
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
        Je partagerai bientôt des articles sur React, Django, IA et bonnes pratiques dev. Restez connecté !
      </p>
      <a
        href="#contact"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition"
      >
        Prévenez‑moi
      </a>
    </motion.section>
  );
}
