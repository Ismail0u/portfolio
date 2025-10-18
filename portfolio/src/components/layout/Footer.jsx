import React from 'react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-10 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 dark:text-gray-300">
        
        {/* Info gauche */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            Moussa Ismael
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 — Full Stack Developer. Tous droits réservés.
          </p>
        </div>

        {/* Liens sociaux */}
        <div className="flex items-center space-x-6">
          {[
            {
              href: 'mailto:moussaisma05@gmail.com',
              label: 'Email',
              icon: <Mail className="w-4 h-4 mr-2" />,
              hover: 'hover:text-blue-600 dark:hover:text-blue-400',
            },
            {
              href: 'https://github.com/Ismail0u',
              label: 'GitHub',
              icon: <Github className="w-4 h-4 mr-2" />,
              hover: 'hover:text-gray-800 dark:hover:text-white',
            },
            {
              href: 'https://wa.me/22789558380',
              label: 'WhatsApp',
              icon: <MessageCircle className="w-4 h-4 mr-2" />,
              hover: 'hover:text-green-600 dark:hover:text-green-400',
            },
            {
              href: 'https://www.linkedin.com/in/ismael-moussa-314a78355/',
              label: 'LinkedIn',
              icon: <Linkedin className="w-4 h-4 mr-2" />,
              hover: 'hover:text-blue-600 dark:hover:text-blue-400',
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center transition-all duration-200 ${item.hover}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Ligne animée subtile */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x" />
    </footer>
  );
}
