import { PERSONAL_INFO, SOCIAL_LINKS } from "./personalInfo";
// ============================================
// THEME CONFIGURATION
// ============================================
export const THEMES = {
  light: {
    name: 'Light',
    emoji: '☀️',
    colors: {
      bg: '#ffffff',
      text: '#1a202c',
      primary: '#3b82f6',
      secondary: '#6366f1',
    },
  },
  dark: {
    name: 'Dark',
    emoji: '🌙',
    colors: {
      bg: '#1a202c',
      text: '#f7fafc',
      primary: '#60a5fa',
      secondary: '#818cf8',
    },
  },
  cyberpunk: {
    name: 'Cyberpunk',
    emoji: '🤖',
    colors: {
      bg: '#0a0e27',
      text: '#00ff41',
      primary: '#ff006e',
      secondary: '#00f5ff',
    },
  },
  retro: {
    name: 'Retro',
    emoji: '🎮',
    colors: {
      bg: '#2d1b00',
      text: '#ffb700',
      primary: '#ff6b35',
      secondary: '#004e89',
    },
  },
};

// ============================================
// ANIMATION VARIANTS (Framer Motion)
// ============================================
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
  },
  
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
  },
  
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
  },
  
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
  },
  
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};