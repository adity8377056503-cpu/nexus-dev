/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { onAuthUpdate } from './lib/firebase';
import type { Project, ClientUser } from './types';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { FeaturedWork } from './components/FeaturedWork';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { Team } from './components/Team';
import { CaseStudy } from './components/CaseStudy';
import { ClientReviews } from './components/ClientReviews';
import { About } from './components/About';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { ClientLoginModal } from './components/ClientLoginModal';

export default function App() {
  const [user, setUser] = useState<User | ClientUser | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjectsModal, setShowAllProjectsModal] = useState(false);
  const [showClientPortal, setShowClientPortal] = useState(false);
  const [showClientLogin, setShowClientLogin] = useState(false);
  
  const [prefilledPlan, setPrefilledPlan] = useState<string | undefined>();
  const [prefilledService, setPrefilledService] = useState<string | undefined>();

  // Firebase Auth listener & local client session
  useEffect(() => {
    // Check if client session stored locally (for instant demo or fallback session)
    try {
      const storedSession = localStorage.getItem('nexus_client_session');
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        if (parsed && parsed.email) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore
    }

    const unsubscribe = onAuthUpdate((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    // Hash routing for direct login access
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#login' || hash === '#client-login' || hash === '#signin') {
        setShowClientLogin(true);
      } else if (hash === '#portal' || hash === '#inquiries') {
        setShowClientPortal(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Smooth scroll to contact section
  const scrollToContact = (planName?: string, serviceTitle?: string) => {
    if (planName) setPrefilledPlan(planName);
    if (serviceTitle) setPrefilledService(serviceTitle);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const workEl = document.getElementById('work');
    if (workEl) {
      workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#06040d] text-slate-100 font-sans selection:bg-purple-500/30 selection:text-purple-200 relative">
      
      {/* 1. Floating Sticky Navbar */}
      <Navbar
        user={user}
        onOpenClientPortal={() => setShowClientPortal(true)}
        onOpenClientLogin={() => setShowClientLogin(true)}
        onStartProject={() => scrollToContact()}
      />

      {/* Main Content Sections in Visitor Journey */}
      <main className="relative">
        
        {/* 2. Hero Section */}
        <Hero
          onStartProject={() => scrollToContact()}
          onViewWork={scrollToWork}
        />

        {/* 3. Trust & Stats Section */}
        <Stats />

        {/* 4. Featured Work (Selected Work) */}
        <FeaturedWork
          onSelectProject={(proj) => {
            setSelectedProject(proj);
            setShowAllProjectsModal(false);
          }}
          onViewAllProjects={() => setShowAllProjectsModal(true)}
        />

        {/* 5. Services (What We Do) */}
        <Services
          onSelectServiceForInquiry={(serviceTitle) => {
            scrollToContact(undefined, serviceTitle);
          }}
        />

        {/* 6. Why Nexus Devs (Asymmetric layout) */}
        <WhyUs />

        {/* 7. Our Process (Futuristic Horizontal Timeline) */}
        <Process />

        {/* 8. Our Team (Meet the Team Behind the Work) */}
        <Team />

        {/* 9. Case Study (From Idea to Impact) */}
        <CaseStudy />

        {/* 9. Genuine Client Reviews with Admin Moderation */}
        <ClientReviews user={user} />

        {/* 10. About Section */}
        <About />

        {/* 11. Pricing Section */}
        <Pricing
          onSelectPlan={(planName) => {
            scrollToContact(planName);
          }}
        />

        {/* 12. FAQ Accordion */}
        <FAQ />

        {/* 13. Contact / Final CTA with Firestore Real-time Persistence */}
        <Contact
          user={user}
          prefilledPlan={prefilledPlan}
          prefilledService={prefilledService}
          onOpenClientPortal={() => setShowClientPortal(true)}
          onOpenClientLogin={() => setShowClientLogin(true)}
        />

      </main>

      {/* 14. Footer */}
      <Footer />

      {/* Interactive Project Modal (Single Project or All Archives) */}
      {(selectedProject || showAllProjectsModal) && (
        <ProjectModal
          project={selectedProject}
          showAllGallery={showAllProjectsModal}
          onClose={() => {
            setSelectedProject(null);
            setShowAllProjectsModal(false);
          }}
          onSelectProject={(p) => {
            setSelectedProject(p);
            setShowAllProjectsModal(false);
          }}
          onStartProjectLikeThis={(name) => {
            setSelectedProject(null);
            setShowAllProjectsModal(false);
            scrollToContact(undefined, `Similar to ${name}`);
          }}
        />
      )}

      {/* Dedicated Client Login Modal */}
      <ClientLoginModal
        isOpen={showClientLogin}
        onClose={() => setShowClientLogin(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setShowClientLogin(false);
          setShowClientPortal(true);
        }}
      />

      {/* Client Portal Modal (Tracking inquiries & Firebase Auth) */}
      {showClientPortal && (
        <ClientPortalModal
          user={user}
          onClose={() => setShowClientPortal(false)}
          onStartNewProject={() => {
            setShowClientPortal(false);
            scrollToContact();
          }}
          onOpenLogin={() => {
            setShowClientPortal(false);
            setShowClientLogin(true);
          }}
        />
      )}

    </div>
  );
}
