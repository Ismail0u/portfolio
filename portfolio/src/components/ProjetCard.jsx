import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export default function ProjectCard({ title, description, image, github, demo }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">{title}</h3>
        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{description}</p>

        <div className="flex items-center mt-4 space-x-4">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
              <Github className="w-4 h-4 mr-1" /> Code
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                🌐 Démo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
