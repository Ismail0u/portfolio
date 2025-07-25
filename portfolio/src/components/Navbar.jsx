import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Accueil', href: '#hero' },
  { name: 'À propos', href: '#about' },
  { name: 'Compétences', href: '#skills' },
  { name: 'Parcours', href: '#timeline' },
  { name: 'Projets', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Service', href: '#services'},
  { name: 'Contact', href: '#contact' },

];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/60 transition-shadow duration-300 ${
        hasScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="#hero"
          className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          MonPortfolio
        </a>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Burger menu */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 dark:text-gray-300">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pb-4 space-y-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
