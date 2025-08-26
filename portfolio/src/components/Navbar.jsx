import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { name: 'Accueil', href: '#hero' },
  { name: 'À propos', href: '#about' },
  { name: 'Compétences', href: '#skills' },
  { name: 'Service', href: '#services' },
  { name: 'Parcours', href: '#timeline' },
  { name: 'Projets', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [active, setActive] = useState('#hero');

  // Ombre au scroll
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ScrollSpy
  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href));
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let sec of sections) {
        if (sec && scrollPos >= sec.offsetTop) {
          setActive('#' + sec.id);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/60 transition-shadow duration-300 ${
        hasScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl font-bold font-primary text-blue-600 dark:text-blue-400 hover:underline"
        >
          MonPortfolio
        </a>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {links.map(({ name, href }) => (
            <a
              key={href}
              href={href}
              className={`relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                active === href ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={() => setActive(href)}
            >
              {name}
              {/* Underline animé */}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${
                  active === href ? 'w-full' : 'w-0'
                }`}
              />
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300 p-2"
          animate={menuOpen ? 'open' : 'closed'}
          variants={{
            closed: { rotate: 0 },
            open: { rotate: 90 },
          }}
          transition={{ duration: 0.3 }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pb-4 space-y-2">
          {links.map(({ name, href }) => (
            <a
              key={href}
              href={href}
              className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              onClick={() => {
                setMenuOpen(false);
                setActive(href);
              }}
            >
              {name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
