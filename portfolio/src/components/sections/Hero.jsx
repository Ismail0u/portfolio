import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, Code, Zap, Rocket, Star } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { PERSONAL_INFO , SOCIAL_LINKS } from '../../constants/personalInfo';
import { trackEvent } from '../../utils';
import GlitchText from '../common/glitchText';

/**
 * ============================================
 * HERO V3 - ULTRA TECH FINAL
 * ============================================
 */

// ============================================
// TYPING EFFECT
// ============================================
const TypingEffect = ({ text, speed = 80, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout;
    let index = 0;

    const startTyping = () => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
      }
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay]);

  return (
    <span className="inline-block font-tech">
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 h-6 sm:h-8 bg-cyan-400 ml-1 align-middle"
        />
      )}
    </span>
  );
};

// ============================================
// FLOATING TECH ICONS
// ============================================
const FloatingIcons = () => {
  const icons = [
    { Icon: Code, x: '-15%', y: '-10%', delay: 0 },
    { Icon: Zap, x: '110%', y: '-15%', delay: 0.2 },
    { Icon: Rocket, x: '-20%', y: '100%', delay: 0.4 },
    { Icon: Star, x: '115%', y: '105%', delay: 0.6 },
  ];

  return (
    <>
      {icons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ delay: delay + 1.5, duration: 0.6 }}
          className="absolute"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: delay,
              ease: 'easeInOut',
            }}
            className="text-cyan-400"
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' }} />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

// ============================================
// ANIMATED COUNTER
// ============================================
const AnimatedCounter = ({ end, label, delay = 0, suffix = '+' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.6 }}
      className="text-center group"
    >
      <div className="text-4xl sm:text-5xl font-bold text-neon-blue mb-2 group-hover:scale-110 transition-transform">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-400 font-tech uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

// ============================================
// MAGNETIC BUTTON
// ============================================
const MagneticButton = ({ children, href, onClick, primary, external, badge, className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        relative inline-flex items-center px-6 py-3 rounded-lg font-tech font-semibold
        transition-all duration-300 overflow-hidden group
        ${primary
          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-blue'
          : 'border-2 border-cyan-400 text-cyan-400 hover:text-white'
        }
        ${className || ''}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Hover effect background */}
      {!primary && (
        <span className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10" />
      )}
      
      {/* Glow effect */}
      <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${
        primary ? 'bg-cyan-400' : 'bg-cyan-400/50'
      }`} style={{ zIndex: -1 }} />
      
      {children}
      
      {badge && (
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg"
        >
          {badge}
        </motion.span>
      )}
    </Tag>
  );
};

// ============================================
// 3D PROFILE IMAGE
// ============================================
const ProfileImage3D = ({ src, alt }) => (
  <div className="relative mb-2">
    <FloatingIcons />
    
    <Tilt
      tiltMaxAngleX={13}
      tiltMaxAngleY={13}
      perspective={1000}
      scale={1.03}
      transitionSpeed={2000}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full"
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-spin-slow" />
        
        {/* Image container */}
        <div className="absolute inset-1 rounded-full overflow-hidden bg-gray-900 shadow-2xl">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="eager"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
        </div>
        
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-cyan-400"
        />
      </motion.div>
    </Tilt>
  </div>
);

// ============================================
// CV MODAL
// ============================================
const CVModal = ({ isOpen, onClose, onDownload }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-tech rounded-2xl shadow-2xl w-full max-w-md p-8 border border-cyan-400/30"
      >
        <h3 className="text-2xl font-tech font-bold text-neon-blue mb-4">
          📄 Télécharger CV
        </h3>
        <p className="text-gray-400 mb-6">Choisissez votre langue</p>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload('fr')}
            className="flex-1 px-6 py-4 rounded-xl border-2 border-cyan-400/50 hover:border-cyan-400 bg-gray-900/50 hover:bg-gray-800 text-white transition-all"
          >
            <div className="text-3xl mb-2">🇫🇷</div>
            <div className="font-semibold">Français</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload('en')}
            className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-blue transition-all"
          >
            <div className="text-3xl mb-2">🇬🇧</div>
            <div className="font-semibold">English</div>
          </motion.button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full text-sm text-gray-400 hover:text-white transition-colors"
        >
          Annuler
        </button>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// MAIN HERO
// ============================================
export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCVDownload = useCallback((language) => {
    const cvUrls = { fr: '/src/assets/certif/cv.pdf', en: '/src/assets/certif/cv_en.pdf' };
    const fileName = language === 'fr' ? 'MOUSSA_Ismael_CV_FR_2025.pdf' : 'MOUSSA_Ismael_Resume_EN_2025.pdf';

    const link = document.createElement('a');
    link.href = cvUrls[language];
    link.download = fileName;
    link.click();

    trackEvent('cv_download', { language });
    setIsModalOpen(false);
  }, []);

  const socialButtons = [
    {
      id: 'contact',
      label: 'Contact',
      href: '#contact',
      primary: true,
      icon: <Mail className="w-4 h-4 mr-1" />,
    },
    {
      id: 'cv',
      label: 'CV',
      onClick: () => setIsModalOpen(true),
      icon: <Download className="w-4 h-4 mr-1" />,
      badge: 'NEW',
    },
    {
      id: 'github',
      label: 'GitHub',
      href: SOCIAL_LINKS.github,
      external: true,
      icon: <Github className="w-4 h-4 mr-1" />,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: SOCIAL_LINKS.linkedin,
      external: true,
      icon: <Linkedin className="w-4 h-4 mr-1" />,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-5"
    >
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        
        {/* Profile */}
        <ProfileImage3D
          src="assets/image/isma12.jpeg"
          alt={PERSONAL_INFO.name}
        />

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-2"
        >
          <GlitchText
            text={PERSONAL_INFO.name}
            className="text-5xl sm:text-7xl font-black text-neon-blue mb-1"
          />
        </motion.div>

        {/* Title with Typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl sm:text-3xl text-gray-300 mb-1"
        >
          <TypingEffect
            text={`${PERSONAL_INFO.title} | ${PERSONAL_INFO.tagline}`}
            speed={70}
            delay={1500}
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          {PERSONAL_INFO.bio}
        </motion.p>
        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          {socialButtons.map((btn) => (
            <MagneticButton key={btn.id} {...btn}>
              {btn.icon}
              {btn.label}
            </MagneticButton>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <CVModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={handleCVDownload}
      />

      {/* Styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}