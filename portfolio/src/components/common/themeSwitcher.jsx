import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { THEMES } from '../../constants/themeConfiguration';

/**
 * ============================================
 * THEME SWITCHER COMPONENT
 * ============================================
 * Switcher de thèmes avancé:
 * - Light / Dark / Cyberpunk / Retro
 * - Persistance localStorage
 * - Smooth transitions
 * - Auto-detect système
 * ============================================
 */

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');

  // ============================================
  // Initialize theme from localStorage or system
  // ============================================
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Détecte la préférence système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setCurrentTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // ============================================
  // Apply theme to document
  // ============================================
  useEffect(() => {
    const theme = THEMES[currentTheme];
    if (!theme) return;

    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'cyberpunk', 'retro');

    // Add current theme class
    if (currentTheme !== 'light') {
      document.documentElement.classList.add(currentTheme);
    }

    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-bg', theme.colors.bg);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);

    // Save to localStorage
    localStorage.setItem('portfolio-theme', currentTheme);
  }, [currentTheme]);

  // ============================================
  // Handle theme change
  // ============================================
  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    setIsOpen(false);
  };

  // ============================================
  // Close on outside click
  // ============================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.theme-switcher')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="theme-switcher fixed top-6 right-6 z-40">
      {/* ============================================
          TOGGLE BUTTON
          ============================================ */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 shadow-lg rounded-full hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        
        {/* Current theme indicator */}
        <span className="absolute -bottom-1 -right-1 text-xl">
          {THEMES[currentTheme].emoji}
        </span>
      </motion.button>

      {/* ============================================
          THEME SELECTOR PANEL
          ============================================ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 min-w-[200px] border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Choisir un thème
            </h3>

            <div className="space-y-2">
              {Object.entries(THEMES).map(([key, theme]) => (
                <motion.button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg
                    transition-colors text-left
                    ${
                      currentTheme === key
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-xl">{theme.emoji}</span>
                    <span className="text-sm font-medium">{theme.name}</span>
                  </span>

                  {currentTheme === key && (
                    <motion.div
                      layoutId="activeTheme"
                      className="w-2 h-2 bg-blue-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* ============================================
                THEME PREVIEW
                ============================================ */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Aperçu des couleurs
              </p>
              <div className="flex gap-2">
                {Object.entries(THEMES[currentTheme].colors).map(([key, color]) => (
                  <div
                    key={key}
                    className="w-8 h-8 rounded-lg border-2 border-white dark:border-gray-700 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={key}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}