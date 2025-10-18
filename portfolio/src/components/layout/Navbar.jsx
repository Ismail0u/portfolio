import React, { useEffect, useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../constants/navigation';
import { useScrollPosition, useMediaQuery } from '../../hooks';

/**
 * ============================================
 * NAVBAR COMPONENT
 * ============================================
 * Navigation avec:
 * - Sticky header
 * - Scroll spy actif
 * - Mobile menu animé
 * - Backdrop blur
 * - Progress bar scroll
 * ============================================
 */

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Desktop Nav Link
 */
const DesktopNavLink = ({ link, isActive }) => (
  <a
    href={link.href}
    className={`
      relative px-4 py-2 text-sm font-medium transition-colors
      ${isActive
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
      }
    `}
  >
    {link.label}
    
    {/* Active Indicator */}
    <motion.span
      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  </a>
);

/**
 * Mobile Nav Link
 */
const MobileNavLink = ({ link, isActive, onClick }) => (
  <motion.a
    href={link.href}
    onClick={onClick}
    whileTap={{ scale: 0.95 }}
    className={`
      block px-4 py-3 rounded-lg text-base font-medium transition-colors
      ${isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }
    `}
  >
    {link.label}
  </motion.a>
);

/**
 * Scroll Progress Bar
 */
const ScrollProgress = () => {
  const scrollPosition = useScrollPosition();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollPosition / height) * 100;
    setProgress(Math.min(scrolled, 100));
  }, [scrollPosition]);

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
      style={{ width: `${progress}%` }}
      initial={{ width: 0 }}
      transition={{ duration: 0.1 }}
    />
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const scrollPosition = useScrollPosition();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // ============================================
  // Detect scroll for backdrop
  // ============================================
  useEffect(() => {
    setHasScrolled(scrollPosition > 10);
  }, [scrollPosition]);

  // ============================================
  // Scroll Spy - Detect active section
  // ============================================
  useEffect(() => {
    const sections = NAV_LINKS.map(link => {
      const id = link.href.replace('#', '');
      return document.getElementById(id);
    }).filter(Boolean);

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPos >= section.offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================
  // Close mobile menu on resize
  // ============================================
  useEffect(() => {
    if (!isMobile && menuOpen) {
      setMenuOpen(false);
    }
  }, [isMobile, menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 z-40 w-full transition-all duration-300
          ${hasScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
          }
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl font-bold text-blue-600 dark:text-blue-400 font-primary"
            >
              Moussa Ismael
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <DesktopNavLink
                  key={link.id}
                  link={link}
                  isActive={activeSection === link.id}
                />
              ))}

              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md"
              >
                Contact
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Scroll Progress Bar */}
          <ScrollProgress />
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[80%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl md:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  Menu
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="p-4 space-y-2">
                {NAV_LINKS.map((link) => (
                  <MobileNavLink
                    key={link.id}
                    link={link}
                    isActive={activeSection === link.id}
                    onClick={() => setMenuOpen(false)}
                  />
                ))}
              </div>

              {/* CTA Section */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <motion.a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-3 rounded-lg font-medium transition-colors shadow-lg"
                >
                  Me Contacter
                </motion.a>

                <motion.a
                  href="/assets/certif/cv.pdf"
                  download
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 flex items-center justify-center space-x-2 w-full border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger CV</span>
                </motion.a>
              </div>

              {/* Footer Info */}
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>© 2025 Moussa Ismael</p>
                <p className="mt-1">Full Stack Developer</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}