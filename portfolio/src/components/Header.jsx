import React from 'react';
import { motion } from 'framer-motion';

export default function Header({ dark, setDark }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Avatar + Nom */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
            {/* 👉🏽 Remplace ceci par ta vraie photo */}
            <img
              src="/path-to-your-photo.jpg"
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Moussa Ismael
          </h1>
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
    </header>
  );
}
