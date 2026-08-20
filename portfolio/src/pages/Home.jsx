import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Timeline from '../components/sections/Timeline';
import Projects from '../components/sections/Projects';
import Certifications from '../components/sections/Certifications';
import CaseStudies from '../components/sections/CaseStudies';
import CtaSection from '../components/sections/CtaSection';

export default function Home() {
  return (
    <>
      <Hero />

      <div className="border-t border-fg/10">
        <About />
      </div>

      <div className="border-t border-fg/10">
        <Skills limit={6} showViewAll />
      </div>

      <div className="border-t border-fg/10">
        <Timeline limit={3} showViewAll />
      </div>

      <div className="border-t border-fg/10">
        <Projects limit={3} showViewAll />
      </div>

      <div className="border-t border-fg/10">
        <Certifications limit={3} showViewAll />
      </div>

      <div className="border-t border-fg/10">
        <CaseStudies limit={2} showViewAll />
      </div>

      <div className="border-t border-fg/10">
        <CtaSection />
      </div>
    </>
  );
}
