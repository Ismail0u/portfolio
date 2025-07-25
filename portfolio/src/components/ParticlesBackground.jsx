// src/components/ParticlesBackground.jsx
import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function ParticlesBackground() {
  // callback pour charger toutes les fonctionnalités
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  // config des particules
  const options = {
    fullScreen: { enable: true, zIndex: -10 },
    particles: {
      number: { value: 60, density: { enable: true, area: 800 } },
      color: { value: ['#3b82f6', '#10b981', '#f59e0b'] },
      shape: { type: 'circle' },
      opacity: { value: 0.3, random: { enable: true, minimumValue: 0.1 } },
      size: { value: { min: 1, max: 4 } },
      links: {
        enable: true,
        distance: 150,
        color: '#aaa',
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none',
        random: false,
        straight: false,
        outModes: 'bounce',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.4 } },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Particles init={particlesInit} options={options} className="w-full h-full" />
    </div>
  );
}
   