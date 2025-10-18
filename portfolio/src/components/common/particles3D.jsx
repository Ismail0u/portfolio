import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ============================================
 * PARTICLES 3D COMPONENT
 * ============================================
 * Système de particules Three.js avec:
 * - Constellation background
 * - Interaction souris
 * - Performance optimisée
 * - Responsive
 * ============================================
 */

export default function Particles3D() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ============================================
    // SETUP SCENE
    // ============================================
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ============================================
    // CREATE PARTICLES
    // ============================================
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;

    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      // Colors (bleu à cyan)
      colors[i] = 0.2 + Math.random() * 0.3;     // R
      colors[i + 1] = 0.5 + Math.random() * 0.5; // G
      colors[i + 2] = 0.8 + Math.random() * 0.2; // B
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Particles mesh
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // ============================================
    // CREATE CONNECTIONS (Lines)
    // ============================================
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });

    const maxDistance = 15;
    const linePositions = [];

    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxDistance) {
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
        }
      }
    }

    linesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // ============================================
    // MOUSE MOVEMENT
    // ============================================
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ============================================
    // RESIZE HANDLER
    // ============================================
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // ============================================
    // ANIMATION LOOP
    // ============================================
    let time = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      time += 0.001;

      // Rotate particles
      particles.rotation.y = time * 0.5;
      particles.rotation.x = time * 0.3;
      lines.rotation.y = time * 0.5;
      lines.rotation.x = time * 0.3;

      // Mouse interaction
      camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // ============================================
    // CLEANUP
    // ============================================
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}