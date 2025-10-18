import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ============================================
 * TECH BACKGROUND COMPONENT
 * ============================================
 * Animated tech background with:
 * - Scanline effect
 * - Data streams
 * - Cyber grid
 * - Floating particles
 * ============================================
 */

export default function TechBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particles
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles = Array.from({ length: 50 }, () => new Particle());

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      />

      {/* Scanline Effect */}
      <div className="scanline" />

      {/* Data Streams */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="data-stream"
          style={{
            left: `${20 + i * 20}%`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      {/* Cyber Grid (perspective) */}
      <div className="cyber-grid" />

      {/* Floating Code Snippets */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[
          { code: '{ }', x: '10%', y: '20%', delay: 0 },
          { code: '</>', x: '80%', y: '30%', delay: 1 },
          { code: '< />', x: '15%', y: '70%', delay: 2 },
          { code: '[ ]', x: '85%', y: '60%', delay: 3 },
          { code: '( )', x: '50%', y: '15%', delay: 4 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [0, -100, -200],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: item.delay,
            }}
            className="absolute font-mono text-4xl text-cyan-400/30"
            style={{
              left: item.x,
              top: item.y,
            }}
          >
            {item.code}
          </motion.div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>
    </>
  );
}