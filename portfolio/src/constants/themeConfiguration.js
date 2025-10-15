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

// ============================================
// TERMINAL COMMANDS
// ============================================
export const TERMINAL_COMMANDS = {
  help: {
    description: 'Liste toutes les commandes disponibles',
    output: `
Commandes disponibles:
  help        - Affiche cette aide
  about       - À propos de moi
  skills      - Mes compétences
  projects    - Mes projets
  contact     - Informations de contact
  clear       - Efface le terminal
  konami      - Easter egg 🎮
  matrix      - Mode Matrix
  ascii       - ASCII art
    `,
  },
  
  about: {
    description: 'Informations à propos de moi',
    output: () => `
${PERSONAL_INFO.name}
${PERSONAL_INFO.title}
${PERSONAL_INFO.location}

${PERSONAL_INFO.bio}
    `,
  },
  
  skills: {
    description: 'Mes compétences techniques',
    output: () => {
      const allSkills = Object.values(SKILLS).flat();
      return allSkills
        .map(s => `${s.name.padEnd(20)} ${'█'.repeat(Math.floor(s.level / 10))} ${s.level}%`)
        .join('\n');
    },
  },
  
  contact: {
    description: 'Informations de contact',
    output: () => `
📧 Email:    ${PERSONAL_INFO.email}
📱 WhatsApp: ${PERSONAL_INFO.phone}
🐙 GitHub:   ${SOCIAL_LINKS.github}
💼 LinkedIn: ${SOCIAL_LINKS.linkedin}
    `,
  },
  
  ascii: {
    description: 'ASCII art',
    output: `
  __  __                            ___                      _ 
 |  \\/  |                          |_ _|___ _ __ ___   __ _| |
 | |\\/| | ___  _   _ ___ ___  __ _  | |/ __| '_ \` _ \\ / _\` | |
 | |  | |/ _ \\| | | / __/ __|/ _\` | | |\\__ \\ | | | | | (_| | |
 |_|  |_|\\___/ \\_,_|\\___\\___/\\__,_||___|___/_| |_| |_|\\__,_|_|
                                                               
    `,
  },
};
