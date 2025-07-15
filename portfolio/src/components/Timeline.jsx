import React from 'react';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: '2022-2025',
    title: 'Licence Génie Logiciel – EMIG',
    desc: 'Formation en développement web, mobile et ingénierie logicielle.',
  },
  {
    year: 'Avr - Juin 2025',
    title: 'Stage – Novatech Niger',
    desc: 'Développement d’une application de gestion de restaurant.',
  },
  {
    year: '2024',
    title: 'Projet personnel – FaceLogin',
    desc: 'Reconnaissance faciale avec DeepFace et Streamlit.',
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="my-20">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">
        Parcours & Expériences
      </h2>
      <div className="relative border-l-4 border-blue-600 dark:border-blue-400 pl-6">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            className="mb-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.year}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
