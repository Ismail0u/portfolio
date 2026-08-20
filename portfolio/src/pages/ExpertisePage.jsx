import React from 'react';
import Skills from '../components/sections/Skills';
import Services from '../components/sections/Services';

export default function ExpertisePage() {
  return (
    <div className="pt-14">
      <Skills />
      <div className="border-t border-fg/10">
        <Services />
      </div>
    </div>
  );
}
