import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

// PDFs des certificats
import IEEE from '../assets/certif/certificatIEEE1.pdf';
import CS1 from '../assets/certif/Saylor_CS1.pdf';
import English from '../assets/certif/Saylor_Englich.pdf';
import PythonCert from '../assets/certif/saylor_Python.pdf';
import DataCommuni from '../assets/certif/dataCommuni.pdf';
import OraclecertifIA from '../assets/certif/OracleCertificate.pdf';

const certifications = [
  { title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate', org: 'Oracle University', date: '2025', pdf: OraclecertifIA },
  { title: 'CS105: Introduction to Python', org: 'Saylor', date: '2025', pdf: PythonCert },
  { title: 'CS101: Intro to Computer Science I', org: 'Saylor', date: '2025', pdf: CS1 },
  { title: 'IEEE Membership Certificate', org: 'IEEE', date: '2024', pdf: IEEE },
  { title: 'ESL003: Upper-Intermediate English', org: 'Saylor', date: '2025', pdf: English },
  { title: 'PRDV200: Communicating with Data', org: 'Saylor', date: '2025', pdf: DataCommuni },
];

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const visibleCerts = showAll ? certifications : certifications.slice(0, 3);

  return (
    <section id="certifications" className="my-20 px-4">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">
        Certifications
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {visibleCerts.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col items-center p-4"
          >
            {/* Placeholder icon pour certificat */}
            <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-5">
              <FileText className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              {cert.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {cert.org} • {cert.date}
            </p>
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-500 hover:underline"
            >
              <FileText className="w-4 h-4 mr-1" /> Voir le certificat
            </a>
          </motion.div>
        ))}
      </div>

      {certifications.length > 3 && (
        <div className="text-center mt-8">
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
