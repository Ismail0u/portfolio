import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/image/image2.jpeg';

export default function Header({ dark, setDark }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-4 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Avatar + Nom avec effet de frappe */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4"
        >
          <motion.div
            className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 dark:border-blue-300 cursor-pointer"
            whileHover={{ scale: 3.15 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <img
              src={image1}
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Nom animé avec lien */}
          <a
            href="#home"
            className="relative inline-block text-2xl font-bold text-blue-600 dark:text-blue-400 typewriter"
          >
            Moussa Ismael
          </a>
        </motion.div>

        {/* Toggle Dark Mode */}
        <motion.button
          onClick={() => setDark(!dark)}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
        >
          {dark ? '🌞 Mode clair' : '🌙 Mode sombre'}
        </motion.button>
      </div>

      {/* Style effet de frappe */}
      <style>{`
        .typewriter {
          overflow: hidden;
          border-right: 2px solid #3b82f6;
          white-space: nowrap;
          animation: typing 2.5s steps(20, end), blink-caret 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #3b82f6 }
        }
      `}</style>
    </header>
  );
}
