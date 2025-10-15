import { PERSONAL_INFO } from "./personalInfo";
// ============================================
// SEO CONFIGURATION
// ============================================
export const SEO_CONFIG = {
  title: 'Moussa Ismael | Développeur Full-Stack Niamey – React, Django, IA',
  description: `Moussa Ismael, développeur Full-Stack à Niamey : React, Django, 
  React Native & IA. J'aide les entreprises à transformer leurs idées en 
  applications web et mobiles performantes.`,
  keywords: [
    'développeur full-stack Niamey',
    'React developer Niger',
    'Django',
    'IA',
    'cybersécurité',
    'React Native',
    'développeur web Niger',
    'DevByte Community',
  ],
  url: 'https://portfolio-smael.vercel.app/',
  image: 'https://portfolio-smael.vercel.app/og-image.png',
  author: PERSONAL_INFO.name,
  type: 'website',
  locale: 'fr_FR',
};

// ============================================
// PERFORMANCE CONFIG
// ============================================
export const PERFORMANCE_CONFIG = {
  lazyLoadOffset: 100, // px avant viewport
  imageSizes: {
    thumbnail: 150,
    small: 400,
    medium: 800,
    large: 1200,
  },
  debounceDelay: 300, // ms
  throttleDelay: 100, // ms
};

// ============================================
// ANALYTICS
// ============================================
export const ANALYTICS_CONFIG = {
  gaId: 'G-06VERW47V6',
  events: {
    PROJECT_CLICK: 'project_click',
    CONTACT_SUBMIT: 'contact_submit',
    CV_DOWNLOAD: 'cv_download',
    SOCIAL_CLICK: 'social_click',
  },
};