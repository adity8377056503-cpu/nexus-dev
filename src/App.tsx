/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { onAuthUpdate, logoutUser } from './lib/firebase';
import type { Project } from './types';

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
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjectsModal, setShowAllProjectsModal] = useState(false);
  const [showClientPortal, setShowClientPortal] = useState(false);
  const [showClientLogin, setShowClientLogin] = useState(false);
  
  const [prefilledPlan, setPrefilledPlan] = useState<string | undefined>();
  const [prefilledService, setPrefilledService] = useState<string | undefined>();
  const [logoutFeedback, setLogoutFeedback] = useState<string | null>(null);

  // Centralized Firebase sign out handler
  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout error from Firebase Auth:', err);
      throw err;
    } finally {
      // 1. Immediately clear authenticated user session
      setUser(null);

      // 2. Clear any lingering client cache from previous session
      try {
        localStorage.removeItem('nexus_my_inquiries');
        localStorage.removeItem('nexus_all_client_reviews');
      } catch {}

      // 3. Close client portal and login modal if open
      setShowClientPortal(false);
      setShowClientLogin(false);

      // 4. Return user to the normal public Nexus Devs website (clean URL hash)
      if (
        window.location.hash === '#portal' ||
        window.location.hash === '#inquiries' ||
        window.location.hash === '#login' ||
        window.location.hash === '#client-login' ||
        window.location.hash === '#signin'
      ) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      // 5. Show brief confirmation
      setLogoutFeedback('Signed out of client workspace');
      setTimeout(() => setLogoutFeedback(null), 3500);
    }
  };

  // Safe handler to open Client Portal or prompt login if not authenticated
  const handleOpenClientPortal = () => {
    if (user) {
      setShowClientPortal(true);
    } else {
      setShowClientLogin(true);
    }
  };

  // Firebase Auth listener - single source of truth for authentication state
  useEffect(() => {
    const unsubscribe = onAuthUpdate((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Hash routing for direct login access and client portal deep-links
  useEffect(() => {
    if (authLoading) return; // Wait for Firebase Auth initialization before routing

    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#login' || hash === '#client-login' || hash === '#signin') {
        setShowClientLogin(true);
      } else if (hash === '#portal' || hash === '#inquiries') {
        // Only open portal if authenticated, otherwise redirect to login
        if (user) {
          setShowClientPortal(true);
          setShowClientLogin(false);
        } else {
          setShowClientLogin(true);
          setShowClientPortal(false);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    return () => {
      window.removeEventListener('hashchange', handleHash);
    };
  }, [user, authLoading]);

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
        onOpenClientPortal={handleOpenClientPortal}
        onOpenClientLogin={() => setShowClientLogin(true)}
        onStartProject={() => scrollToContact()}
        onSignOut={handleSignOut}
      />

      {/* Main Content Sections in Visitor Journey */}
      <main className="relative">
        
        {/* 2. Hero Section */}
        <Hero
          onStartProject={() => scrollToContact()}
          onViewWork={scrollToWork}
        />

        {/* 3. Trust & Stats Section */}
        <Stats user={user} />

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
          onOpenClientPortal={handleOpenClientPortal}
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
          onSignOut={handleSignOut}
        />
      )}

      {/* Floating Logout Toast Feedback */}
      {logoutFeedback && (
        <div 
          id="logout-feedback-toast"
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-5 sm:bottom-24 sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0e0a24]/95 border border-purple-500/40 text-xs font-semibold text-purple-200 shadow-2xl backdrop-blur-xl animate-fade-in"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{logoutFeedback}</span>
        </div>
      )}

      {/* Floating WhatsApp Action (Bottom-Right, Google/Brand Clean) */}
      <FloatingWhatsApp />

    </div>
  );
}
