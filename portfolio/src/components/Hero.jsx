import React, { useState } from 'react';
import { motion } from 'framer-motion';
import cv from '../assets/certif/cv.pdf';
import profilePic from '../assets/image/isma12.jfif';

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative text-center overflow-hidden py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-b-3xl"
    >
      {/* Bulles animées */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-64 h-64 bg-blue-400 opacity-20 rounded-full -top-24 -left-24 blur-3xl animate-ping-slow" />
        <div className="absolute w-52 h-52 bg-purple-400 opacity-20 rounded-full bottom-10 right-10 blur-2xl animate-pulse" />
        <div className="absolute w-32 h-32 bg-pink-400 opacity-20 rounded-full top-1/3 left-1/2 -translate-x-1/2 blur-xl animate-bounce" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        {/* Photo de profil avec lazy load + blur-up */}
        <motion.div
          whileHover={{ scale: 1.65 }}
          whileTap={{ scale: 1.35 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mx-auto w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-lg border-4 border-blue-500 dark:border-blue-300 mb-6"
        >
          <img
            src={profilePic}
            alt="Moussa Ismael"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`object-cover w-full h-full transition-transform duration-500 
              ${imgLoaded ? 'blur-0' : 'blur-2xl scale-110'}`}
          />
        </motion.div>

        {/* Nom avec effet de frappe */}
        <motion.h1
          initial={{ width: 0 }}
          animate={{ width: 'fit-content' }}
          transition={{ duration: 4 }}
          className="mx-auto text-3xl sm:text-5xl font-extrabold text-blue-700 dark:text-blue-300 whitespace-nowrap overflow-hidden border-r-4 border-blue-500 animate-typing"
        >
          Moussa Ismael
        </motion.h1>

        {/* Titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-xl sm:text-2xl text-gray-800 dark:text-gray-200"
        >
          Développeur Full Stack | 💡 J'aime construire des solutions utiles.
        </motion.p>

        {/* Pitch rapide */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-2 text-md sm:text-lg text-gray-600 dark:text-gray-400"
        >
          Bonjour! Je suis Moussa Ismael. Je suis un développeur web qui aime créer des sites et des applications pour aider les entreprises et les personnes à mieux travailler en ligne.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium"
        >
           Mon approche est simple : transformer vos idées en outils numériques fiables et faciles à utiliser.
        </motion.p>

        {/* Boutons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          <a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition duration-300"
          >
            Me contacter
          </a>
          <motion.a
            href={cv}
            download="MOUSSA_Ismael_CV_2025.pdf"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative inline-block border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full shadow transition duration-300"
          >
            <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              NEW
            </span>
            Télécharger mon CV
          </motion.a>
        </motion.div>
      </div>

      {/* Indicateur scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce text-blue-500 dark:text-blue-300 text-xl">↓</div>
        <span className="text-sm text-gray-500 dark:text-gray-400">Scroll pour en savoir plus</span>
      </motion.div>

      {/* Typing animation styles */}
      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #3b82f6 }
        }
        .animate-typing {
          animation: typing 4.2s steps(20, end), blink-caret 0.8s step-end infinite;
        }

        .animate-ping-slow {
          animation: ping 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .blur-2xl {
          filter: blur(2rem);
        }
        .blur-0 {
          filter: blur(0);
        }
      `}</style>
    </section>
  );
}
