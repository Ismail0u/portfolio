import { useState, useEffect } from 'react';

/**
 * Position verticale du scroll — utilisé par la Navbar pour son
 * effet "backdrop-blur" au-delà d'un certain seuil.
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', updatePosition, { passive: true });
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}
