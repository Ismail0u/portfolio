// src/components/CaseStudies.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    title: 'Mini Chatbot IA',
    problem:
      "Les IA généralistes ne répondaient pas toujours de la meilleure manière aux questions locales (Niger, ethnies, culture).",
    solution:
      "Conception d’un mini chatbot éducatif en Streamlit ; base de données JSON maison + NLP (NLTK) pour répondre à des questions locales et synthèse vocale.",
    results:
      "Prototype en ligne avec 0 % de downtime, réponses en < 2 s, roadmap d’enrichissement continu de la base.",
    images: ['/assets/image/NIBOT.PNG'], // tableau même pour un seul élément
  },
];

export default function CaseStudies() {
  return (
    <section id="cases" className="my-20 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
        Étude de Cas
      </h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        className="max-w-3xl mx-auto"
      >
        {caseStudies.map((cs, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {cs.title}
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p><strong>Problème :</strong> {cs.problem}</p>
                <p><strong>Solution :</strong> {cs.solution}</p>
                <p><strong>Résultats :</strong> {cs.results}</p>
              </div>
              <div className="mt-4">
                {cs.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${cs.title} capture ${i + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow transition-transform duration-200 hover:scale-105"
                    loading="lazy"
                  />
                ))}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
