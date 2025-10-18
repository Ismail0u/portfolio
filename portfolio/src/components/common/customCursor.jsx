import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * ============================================
 * CUSTOM CURSOR COMPONENT
 * ============================================
 * Curseur personnalisé avec:
 * - Effet de traînée fluide
 * - Changement de forme sur hover
 * - Effet magnétique sur les CTA
 * - Performance optimisée (RAF)
 * ============================================
 */

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  // Springs pour animations fluides (60fps)
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const trailX = useSpring(0, { stiffness: 150, damping: 30 });
  const trailY = useSpring(0, { stiffness: 150, damping: 30 });

  useEffect(() => {
    // ============================================
    // Mouse Move Handler
    // ============================================
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);

      // Détecte si on survole un élément cliquable
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(isClickable);
    };

    // ============================================
    // Mouse Enter/Leave Handlers
    // ============================================
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  // ============================================
  // Hide on mobile devices
  // ============================================
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile || isHidden) {
    return null;
  }

  return (
    <>
      {/* ============================================
          CURSOR TRAIL (Traînée)
          ============================================ */}
      <motion.div
        ref={trailRef}
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className={`
            rounded-full border-2 border-blue-400
            transition-all duration-300 ease-out
            ${isPointer ? 'w-16 h-16 opacity-30' : 'w-10 h-10 opacity-50'}
          `}
        />
      </motion.div>

      {/* ============================================
          MAIN CURSOR (Point central)
          ============================================ */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="bg-blue-500 rounded-full"
          animate={{
            width: isPointer ? 32 : 8,
            height: isPointer ? 32 : 8,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 28,
          }}
        />
      </motion.div>

      {/* ============================================
          GLOBAL STYLES
          Cache le curseur système
          ============================================ */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}