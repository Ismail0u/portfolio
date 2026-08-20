import React from 'react';
import { X } from 'lucide-react';

/**
 * Modale de sélection de langue pour le téléchargement du CV.
 */
export default function CVModal({ isOpen, onClose, onDownload, t }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-bg-soft border border-fg/10 rounded-2xl w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-fg/40 hover:text-fg"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
        <p className="font-display font-bold text-fg text-lg mb-1">{t('hero.cvModalTitle')}</p>
        <p className="text-fg/50 text-sm mb-5">{t('hero.cvModalSubtitle')}</p>
        <div className="flex gap-3">
          <button
            onClick={() => onDownload('fr')}
            className="flex-1 py-3 rounded-lg border border-fg/15 text-fg text-sm font-medium hover:border-accent hover:text-accent transition-colors"
          >
            {t('hero.cvModalFrench')}
          </button>
          <button
            onClick={() => onDownload('en')}
            className="flex-1 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-soft transition-colors"
          >
            {t('hero.cvModalEnglish')}
          </button>
        </div>
      </div>
    </div>
  );
}
