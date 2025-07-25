import React, { useState, useEffect } from 'react';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import './index.css'; // Assure le support des styles dark

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(prefersDark);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col font-sans transition duration-300 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 scroll-smooth">
      <Navbar />
      
      <main className="flex-grow container max-w-screen-lg mx-auto px-4 py-12">
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <Certifications />
        <Services />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
