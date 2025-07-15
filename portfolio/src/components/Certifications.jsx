import React, { useState } from 'react';
import { motion } from 'framer-motion';

const certifications = [
  {
    title: 'Introduction à l’IA – IBM',
    org: 'Coursera / IBM',
    date: '2024',
    link: 'https://www.coursera.org/account/accomplishments/certificate/XYZ1',
  },
  {
    title: 'Développement Web avec Django',
    org: 'OpenClassrooms',
    date: '2023',
    link: '',
  },
  {
    title: 'Cybersécurité fondamentale',
    org: 'Cisco NetAcad',
    date: '2024',
    link: 'https://skillsforall.com/student/XYZ2',
  },
  {
    title: 'Responsive Web Design',
    org: 'freeCodeCamp',
    date: '2023',
    link: 'https://www.freecodecamp.org/certification/ton-nom/responsive-web-design',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    org: 'freeCodeCamp',
    date: '2024',
    link: 'https://www.freecodecamp.org/certification/ton-nom/javascript-algorithms-and-data-structures',
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
