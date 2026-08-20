import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../constants/navigation';
import { useScrollPosition, useMediaQuery } from '../../hooks';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeToggle from '../common/ThemeToggle';


// Navbar component with responsive design, scroll detection, and theme/language toggles.
// the navbar changes its background color when the user scrolls down, and it has a mobile menu that can be toggled open and closed. The component also uses internationalization for navigation links and includes a link to the resume page.



export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const scrollPosition = useScrollPosition();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setHasScrolled(scrollPosition > 10);
  }, [scrollPosition]);

  useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false);
  }, [isMobile, menuOpen]);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-fg' : 'text-fg/50 hover:text-fg'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-accent text-white' : 'text-fg/60 hover:bg-fg/5'
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 z-40 w-full transition-colors duration-300 ${
          hasScrolled ? 'bg-bg/90 backdrop-blur-md border-b border-fg/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="font-display font-bold text-fg text-sm">
              Moussa Ismael
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.id} to={link.href} className={linkClass}>
                  {t(`nav.${link.id}`)}
                </NavLink>
              ))}
              <Link
                to="/resume"
                className="ml-2 px-3 py-2 text-sm font-medium text-fg/50 hover:text-fg transition-colors inline-flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" /> {t('nav.resume')}
              </Link>
              <LanguageSwitcher className="ml-3" />
              <ThemeToggle className="ml-2" />
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-fg/70 hover:text-fg"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[80%] max-w-xs bg-bg-soft border-l border-fg/10 md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-fg/10">
                <span className="font-display font-semibold text-fg">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="p-1 text-fg/50 hover:text-fg">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={mobileLinkClass}
                  >
                    {t(`nav.${link.id}`)}
                  </NavLink>
                ))}
                <NavLink to="/resume" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
                  {t('nav.resume')}
                </NavLink>
              </div>

              <div className="p-4 border-t border-fg/10 space-y-3">
                <div className="flex items-center justify-between">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-lg bg-accent text-white text-sm font-medium"
                >
                  {t('nav.getInTouch')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
