import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-50 dark:bg-gray-800 py-8 mt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
        {/* Info gauche */}
        <div className="text-center md:text-left">
          <p>© 2025 Moussa Ismael. Tous droits réservés.</p>
        </div>

        {/* Liens sociaux */}
        <div className="flex items-center space-x-6">
          <a
            href="mailto:moussaisma05@gmail.com"
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="w-4 h-4 mr-1" />
            Email
          </a>
          <a
            href="https://github.com/Ismail0u"
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ismael-moussa-314a78355/"
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-4 h-4 mr-1" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
