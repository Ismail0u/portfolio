// src/components/ParticlesBackground.jsx
import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function ParticlesBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: '#3b82f6' },
          links: { enable: true, color: '#3b82f6', distance: 150, opacity: 0.2 },
          move: { enable: true, speed: 0.5 },
          number: { value: 30 },
          size: { value: { min: 1, max: 3 } },
        },
      }}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
