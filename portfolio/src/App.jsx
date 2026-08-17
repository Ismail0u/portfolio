import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import SEO from './components/common/seo';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ExpertisePage from './pages/ExpertisePage';
import ExperiencePage from './pages/ExperiencePage';
import CertificationsPage from './pages/CertificationsPage';
import WritingPage from './pages/WritingPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';

import './index.css';

export default function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col font-primary transition duration-100 scroll-smooth bg-ink text-white">
        <SEO />
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow max-w-5xl w-full mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectDetailPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
