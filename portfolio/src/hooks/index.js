/**
 * ============================================
 * CUSTOM HOOKS
 * ============================================
 * Hooks réutilisables suivant les principes:
 * - DRY (Don't Repeat Yourself)
 * - SRP (Single Responsibility Principle)
 * - Composition over inheritance
 * ============================================
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================
// useIntersectionObserver
// Détecte quand un élément entre dans le viewport
// Utile pour: lazy loading, animations au scroll
// ============================================
export function useIntersectionObserver(options = {}) {
  const [entry, setEntry] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options;

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Si déjà visible et freeze activé, on sort
    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsVisible(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return { ref: elementRef, entry, isVisible };
}

// ============================================
// useMediaQuery
// Détecte les media queries CSS
// Utile pour: responsive design, adaptive UI
// ============================================
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Listener function
    const listener = (e) => setMatches(e.matches);
    
    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } 
    // Legacy browsers
    else {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}

// ============================================
// useLocalStorage
// Persist state dans localStorage
// Utile pour: theme preference, user settings
// ============================================
export function useLocalStorage(key, initialValue) {
  // State pour stocker la valeur
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour update la valeur
  const setValue = useCallback((value) => {
    try {
      // Permet de passer une function comme dans useState
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// ============================================
// useDebounce
// Retarde l'exécution d'une fonction
// Utile pour: search input, resize events
// ============================================
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================
// useThrottle
// Limite la fréquence d'exécution
// Utile pour: scroll events, mouse move
// ============================================
export function useThrottle(value, interval = 100) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [value, interval]);

  return throttledValue;
}

// ============================================
// useMousePosition
// Track la position de la souris
// Utile pour: custom cursor, parallax effects
// ============================================
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return position;
}

// ============================================
// useScrollPosition
// Track la position du scroll
// Utile pour: sticky header, scroll indicators
// ============================================
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return scrollPosition;
}

// ============================================
// useKeyPress
// Détecte les touches du clavier
// Utile pour: shortcuts, easter eggs
// ============================================
export function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

// ============================================
// useKonamiCode
// Détecte le Konami Code (easter egg)
// ↑ ↑ ↓ ↓ ← → ← → B A
// ============================================
export function useKonamiCode(callback) {
  const [keys, setKeys] = useState([]);
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => [...prevKeys, e.key].slice(-10));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (keys.join(',') === konamiCode.join(',')) {
      callback();
      setKeys([]); // Reset after trigger
    }
  }, [keys, callback]);
}

// ============================================
// useToggle
// Simple toggle boolean state
// Utile pour: modals, menus, switches
// ============================================
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle, setValue];
}

// ============================================
// useWindowSize
// Track les dimensions de la fenêtre
// Utile pour: responsive logic, canvas sizing
// ============================================
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// ============================================
// usePrefersColorScheme
// Détecte la préférence système dark/light
// Utile pour: theme auto-detection
// ============================================
export function usePrefersColorScheme() {
  const [scheme, setScheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    setScheme(mediaQuery.matches ? 'dark' : 'light');

    const listener = (e) => {
      setScheme(e.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);

  return scheme;
}

// ============================================
// useClickOutside
// Détecte les clics en dehors d'un élément
// Utile pour: modals, dropdowns, menus
// ============================================
export function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [callback]);

  return ref;
}

// ============================================
// useAnimationFrame
// Hook pour animations performantes
// Utile pour: custom animations, games
// ============================================
export function useAnimationFrame(callback) {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]);
}