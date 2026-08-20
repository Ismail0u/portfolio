import React from 'react';

/**
 * Titre à deux niveaux : ligne pleine + ligne muted, même taille.
 * Pattern réutilisé par toutes les sections (Hero, Projects, Timeline,
 * Skills, Certifications, Contact...) — factorisé ici pour éviter les
 * imports croisés vers Hero.jsx et respecter la limite de lignes/fichier.
 */
export default function SectionHeading({ top, bottom, align = 'left' }) {
  return (
    <h2
      className={`font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
    >
      <span className="block text-fg">{top}</span>
      <span className="block text-fg-soft">{bottom}</span>
    </h2>
  );
}
