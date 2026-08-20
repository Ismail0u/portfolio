// ============================================
// MOTION VARIANTS PARTAGÉS (Framer Motion)
// ============================================
// Un seul pattern de fade-up, réutilisé par toutes les sections.
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};
