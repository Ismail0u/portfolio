import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * ============================================
 * GLITCH TEXT COMPONENT
 * ============================================
 * Effet de texte glitch cyberpunk:
 * - Scramble effect au hover
 * - Animation de caractères aléatoires
 * - RGB split effect
 * - Performance optimisée
 * ============================================
 */

export default function GlitchText({ 
  text, 
  className = '',
  autoGlitch = false,
  autoGlitchInterval = 5000 
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  // Caractères pour l'effet scramble
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  // ============================================
  // Scramble animation
  // ============================================
  const scramble = () => {
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsGlitching(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  // ============================================
  // Auto glitch effect (optionnel)
  // ============================================
  useEffect(() => {
    if (autoGlitch) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        scramble();
      }, autoGlitchInterval);

      return () => clearInterval(interval);
    }
  }, [autoGlitch, autoGlitchInterval]);

  // ============================================
  // Handle hover
  // ============================================
  const handleMouseEnter = () => {
    if (!isGlitching) {
      setIsGlitching(true);
      scramble();
    }
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* ============================================
          MAIN TEXT
          ============================================ */}
      <span className="relative z-10 font-bold">
        {displayText}
      </span>

      {/* ============================================
          GLITCH LAYERS (RGB Split)
          Active seulement pendant le glitch
          ============================================ */}
      {isGlitching && (
        <>
          {/* Red layer */}
          <span
            className="absolute top-0 left-0 font-bold text-red-500 opacity-70 mix-blend-screen"
            style={{
              transform: 'translate(-2px, -1px)',
              animation: 'glitch-1 0.3s infinite',
            }}
          >
            {displayText}
          </span>

          {/* Blue layer */}
          <span
            className="absolute top-0 left-0 font-bold text-blue-500 opacity-70 mix-blend-screen"
            style={{
              transform: 'translate(2px, 1px)',
              animation: 'glitch-2 0.3s infinite',
            }}
          >
            {displayText}
          </span>

          {/* Green layer */}
          <span
            className="absolute top-0 left-0 font-bold text-green-500 opacity-50 mix-blend-screen"
            style={{
              transform: 'translate(1px, -2px)',
              animation: 'glitch-3 0.4s infinite',
            }}
          >
            {displayText}
          </span>
        </>
      )}

      {/* ============================================
          CSS ANIMATIONS
          ============================================ */}
      <style>{`
        @keyframes glitch-1 {
          0% { clip-path: inset(40% 0 61% 0); }
          20% { clip-path: inset(92% 0 1% 0); }
          40% { clip-path: inset(43% 0 1% 0); }
          60% { clip-path: inset(25% 0 58% 0); }
          80% { clip-path: inset(54% 0 7% 0); }
          100% { clip-path: inset(58% 0 43% 0); }
        }

        @keyframes glitch-2 {
          0% { clip-path: inset(65% 0 15% 0); }
          20% { clip-path: inset(12% 0 78% 0); }
          40% { clip-path: inset(81% 0 6% 0); }
          60% { clip-path: inset(36% 0 51% 0); }
          80% { clip-path: inset(2% 0 88% 0); }
          100% { clip-path: inset(48% 0 29% 0); }
        }

        @keyframes glitch-3 {
          0% { clip-path: inset(25% 0 58% 0); }
          25% { clip-path: inset(65% 0 15% 0); }
          50% { clip-path: inset(12% 0 78% 0); }
          75% { clip-path: inset(81% 0 6% 0); }
          100% { clip-path: inset(25% 0 58% 0); }
        }
      `}</style>
    </motion.div>
  );
}