// src/components/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Alain T.',
    role: 'Directeur chez Novatech Niger',
    quote: 'Moussa a livré une application robuste en React & Django, dans les délais et avec un suivi remarquable.',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    name: 'Marine D.',
    role: 'Professeure à l’EMIG',
    quote: 'Sa curiosité et son sérieux font de lui un développeur fiable, toujours prêt à apprendre et innover.',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    name: 'Karim S.',
    role: 'Client Projet Personnel',
    quote: 'Le mini‑chatbot IA de Moussa a séduit nos utilisateurs par sa simplicité et son efficacité.',
    avatar: 'https://i.pravatar.cc/80?img=56',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="my-20 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
        Témoignages
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-4 object-cover"
              loading="lazy"
            />
            <p className="italic text-gray-700 dark:text-gray-300 mb-4">&ldquo;{t.quote}&rdquo;</p>
            <p className="font-semibold text-blue-600 dark:text-blue-400">{t.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
