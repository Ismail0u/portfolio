import React, { useState } from 'react';
import { motion } from 'framer-motion';
import IEEE from '../assets/certif/certificatIEEE1.pdf';
import CS1 from '../assets/certif/Saylor_CS1.pdf';
import english from '../assets/certif/Saylor_Englich.pdf';
import pythonCert from '../assets/certif/saylor_Python.pdf';
import dataCommuni from '../assets/certif/dataCommuni.pdf';

const certifications = [
  {
    title: ' CS105: Introduction to Python',
    org: 'Saylor',
    date: '2025',
    link: pythonCert,
  },
  {
    title: ' CS101: Introduction to Computer Science I',
    org: 'Saylor',
    date: '2025',
    link: CS1,
  },
  {
    title: '2024 Certificate of IEEE membership',
    org: 'IEEE',
    date: '2024',
    link: IEEE,
  },
  {
    title: ' ESL003: Upper-Intermediate English as a Second Language',
    org: 'Saylor',
    date: '2025',
    link: english,
  },
  {
    title: ' PRDV200: Communicating with Data',
    org: 'Saylor',
    date: '2025',
    link: dataCommuni,
  },
  // Tu peux en ajouter autant que tu veux...
];

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const visibleCerts = showAll ? certifications : certifications.slice(0, 4);

  return (
    <section id="certifications" className="my-20">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">
        Certifications
      </h2>

      <div className="space-y-6 max-w-2xl mx-auto">
        {visibleCerts.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold text-blue-500">{cert.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{cert.org} • {cert.date}</p>
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Voir le certificat
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {certifications.length > 4 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
          >
            {showAll ? 'Voir moins' : 'Voir plus'}
          </button>
        </div>
      )}
    </section>
  );
}
