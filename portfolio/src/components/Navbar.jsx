// Navbar.jsx
import React from 'react';

const links = [
  { name: 'Accueil', href: '#hero' },
  { name: 'À propos', href: '#about' },
  { name: 'Compétences', href: '#skills' },
  { name: 'Parcours', href: '#timeline' },
  { name: 'Projets', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow text-sm">
      <div className="container mx-auto flex justify-center gap-4 py-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
