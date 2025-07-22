import React from 'react';
import ReactDOM from 'react-dom';

export default function ImageModal({ isOpen, onClose, image }) {
  if (!isOpen || !image) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <img
        src={image}
        alt="Image en grand"
        className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg object-contain"
        onClick={(e) => e.stopPropagation()} // Évite de fermer en cliquant sur l'image
      />
    </div>,
    document.body
  );
}
