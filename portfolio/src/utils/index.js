/**
 * ============================================
 * UTILITY FUNCTIONS
 * ============================================
 * Fonctions utilitaires réutilisables
 * Principes: DRY, Pure Functions, Type Safety
 * ============================================
 */

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Capitalise la première lettre d'une chaîne
 * @param {string} str - Chaîne à capitaliser
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Tronque un texte avec ellipsis
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string}
 */
export const truncate = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Génère un slug URL-friendly
 * @param {string} text - Texte source
 * @returns {string}
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric with -
    .replace(/^-+|-+$/g, '');        // Trim dashes
};

// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * Formate un nombre avec séparateurs
 * @param {number} num - Nombre à formater
 * @param {string} locale - Locale (default: 'fr-FR')
 * @returns {string}
 */
export const formatNumber = (num, locale = 'fr-FR') => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Génère un nombre aléatoire dans un intervalle
 * @param {number} min - Minimum (inclusif)
 * @param {number} max - Maximum (exclusif)
 * @returns {number}
 */
export const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * Clamp une valeur entre min et max
 * @param {number} value - Valeur
 * @param {number} min - Minimum
 * @param {number} max - Maximum
 * @returns {number}
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Interpolation linéaire
 * @param {number} start - Valeur de départ
 * @param {number} end - Valeur finale
 * @param {number} t - Facteur (0-1)
 * @returns {number}
 */
export const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * Mélange un tableau (Fisher-Yates)
 * @param {Array} array - Tableau à mélanger
 * @returns {Array}
 */
export const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Groupe un tableau par propriété
 * @param {Array} array - Tableau source
 * @param {string} key - Clé de groupement
 * @returns {Object}
 */
export const groupBy = (array, key) => {
  return array.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {});
};

/**
 * Retire les doublons d'un tableau
 * @param {Array} array - Tableau source
 * @param {string} key - Clé pour comparaison (optionnel)
 * @returns {Array}
 */
export const unique = (array, key = null) => {
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

/**
 * Chunk un tableau en sous-tableaux
 * @param {Array} array - Tableau source
 * @param {number} size - Taille des chunks
 * @returns {Array}
 */
export const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// ============================================
// OBJECT UTILITIES
// ============================================

/**
 * Deep clone d'un objet
 * @param {Object} obj - Objet à cloner
 * @returns {Object}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Vérifie si un objet est vide
 * @param {Object} obj - Objet à vérifier
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Merge profond de deux objets
 * @param {Object} target - Objet cible
 * @param {Object} source - Objet source
 * @returns {Object}
 */
export const deepMerge = (target, source) => {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  
  return output;
};

/**
 * Vérifie si une valeur est un objet
 * @param {*} item - Valeur à vérifier
 * @returns {boolean}
 */
const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

// ============================================
// DATE UTILITIES
// ============================================

/**
 * Formate une date
 * @param {Date|string} date - Date à formater
 * @param {string} locale - Locale (default: 'fr-FR')
 * @returns {string}
 */
export const formatDate = (date, locale = 'fr-FR') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Calcule le temps relatif (il y a X jours)
 * @param {Date|string} date - Date
 * @returns {string}
 */
export const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = {
    année: 31536000,
    mois: 2592000,
    semaine: 604800,
    jour: 86400,
    heure: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `Il y a ${interval} ${unit}${interval > 1 ? 's' : ''}`;
    }
  }

  return 'À l\'instant';
};

// ============================================
// DOM UTILITIES
// ============================================

/**
 * Scroll smooth vers un élément
 * @param {string} selector - Sélecteur CSS
 * @param {number} offset - Offset en pixels
 */
export const scrollToElement = (selector, offset = 0) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

/**
 * Copie du texte dans le presse-papier
 * @param {string} text - Texte à copier
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback pour anciens navigateurs
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

/**
 * Détecte si on est sur mobile
 * @returns {boolean}
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Détecte si on est sur iOS
 * @returns {boolean}
 */
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

// ============================================
// PERFORMANCE UTILITIES
// ============================================

/**
 * Debounce une fonction
 * @param {Function} func - Fonction à debouncer
 * @param {number} wait - Délai en ms
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle une fonction
 * @param {Function} func - Fonction à throttler
 * @param {number} limit - Limite en ms
 * @returns {Function}
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Valide un email
 * @param {string} email - Email à valider
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valide un numéro de téléphone
 * @param {string} phone - Téléphone à valider
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const regex = /^[\d\s\-\+\(\)]+$/;
  return regex.test(phone) && phone.replace(/\D/g, '').length >= 8;
};

/**
 * Valide une URL
 * @param {string} url - URL à valider
 * @returns {boolean}
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ============================================
// COLOR UTILITIES
// ============================================

/**
 * Convertit hex en RGB
 * @param {string} hex - Couleur hex (#ffffff)
 * @returns {Object} - { r, g, b }
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

/**
 * Génère une couleur aléatoire
 * @returns {string} - Couleur hex
 */
export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

// ============================================
// ANALYTICS UTILITIES
// ============================================

/**
 * Track un événement Google Analytics
 * @param {string} eventName - Nom de l'événement
 * @param {Object} params - Paramètres
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track une page vue
 * @param {string} path - Chemin de la page
 */
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-06VERW47V6', {
      page_path: path,
    });
  }
};

// ============================================
// STORAGE UTILITIES
// ============================================

/**
 * Sauvegarde dans localStorage avec gestion d'erreur
 * @param {string} key - Clé
 * @param {*} value - Valeur
 * @returns {boolean}
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error('Error saving to localStorage:', err);
    return false;
  }
};

/**
 * Récupère depuis localStorage
 * @param {string} key - Clé
 * @param {*} defaultValue - Valeur par défaut
 * @returns {*}
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.error('Error reading from localStorage:', err);
    return defaultValue;
  }
};

/**
 * Supprime de localStorage
 * @param {string} key - Clé
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error removing from localStorage:', err);
  }
};

// ============================================
// EXPORT ALL
// ============================================
export default {
  // Strings
  capitalize,
  truncate,
  slugify,
  
  // Numbers
  formatNumber,
  randomRange,
  clamp,
  lerp,
  
  // Arrays
  shuffle,
  groupBy,
  unique,
  chunk,
  
  // Objects
  deepClone,
  isEmpty,
  deepMerge,
  
  // Dates
  formatDate,
  timeAgo,
  
  // DOM
  scrollToElement,
  copyToClipboard,
  isMobile,
  isIOS,
  
  // Performance
  debounce,
  throttle,
  
  // Validation
  isValidEmail,
  isValidPhone,
  isValidURL,
  
  // Colors
  hexToRgb,
  randomColor,
  
  // Analytics
  trackEvent,
  trackPageView,
  
  // Storage
  saveToStorage,
  getFromStorage,
  removeFromStorage,
};