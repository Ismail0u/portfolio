import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import SEO from './components/common/seo';
import TechBackground from './components/common/techBackground';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Services from './components/sections/Services';
import Timeline from './components/sections/Timeline';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import CaseStudies from './components/sections/CaseStudies';
import Contact from './components/sections/Contact';

import './index.css';


export default function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col font-primary transition duration-100 scroll-smooth">
        <SEO />
        <TechBackground />
        <Navbar />
           <main className="flex-grow container max-w-screen-lg mx-auto px-4 py-2">
          {/* Hero Section */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Skills Section */}
          <Skills />
          
          {/* Services Section */}
          <Services />
          
          {/* Timeline Section */}
          <Timeline />
          
          {/* Projects Section */}
          <Projects />
          
          {/* Certifications Section */}
          <Certifications />
          
          {/* Case Studies Section */}
          <CaseStudies />
          
          {/* Contact Section */}
          <Contact />
        </main>
        
        {/* ============================================
            FOOTER
            Social links, copyright, newsletter
            ============================================ */}
        <Footer />
      </div>
    </HelmetProvider>
  );
}

/**
 * ============================================
 * NOTES DE DÉVELOPPEMENT
 * ============================================
 * 
 * 1. PERFORMANCE:
 *    - Particles3D et CustomCursor sont légers
 *    - Lazy loading des images dans les sections
 *    - Animations déclenchées au scroll (IntersectionObserver)
 * 
 * 2. ACCESSIBILITÉ:
 *    - Semantic HTML (header, main, footer, nav, section)
 *    - ARIA labels où nécessaire
 *    - Focus management dans modals
 *    - Keyboard navigation support
 * 
 * 3. SEO:
 *    - Meta tags via SEO component
 *    - Structured data (JSON-LD)
 *    - Canonical URLs
 *    - Alt text sur toutes les images
 * 
 * 4. RESPONSIVE:
 *    - Mobile-first approach
 *    - Breakpoints Tailwind (sm, md, lg, xl)
 *    - Touch-friendly UI
 * 
 * 5. MAINTENANCE:
 *    - Composants isolés et réutilisables
 *    - Constants centralisés
 *    - Hooks custom pour logique réutilisable
 *    - Documentation inline
 * ============================================
 */