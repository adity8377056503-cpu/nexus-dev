import React, { useState } from 'react';
import { ArrowUp, Mail, Phone, MessageCircle, Shield, Sparkles, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Team', href: '#team' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative border-t border-purple-500/20 bg-[#06040d] pt-16 pb-12 z-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-purple-950/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Logo, Mission, Nav Links, Social */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-500/15">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 p-[1.5px]">
                <div className="w-full h-full bg-[#080514] rounded-[10px] flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-purple-300 rotate-45"></div>
                </div>
              </div>
              <span className="font-extrabold tracking-wider text-lg text-white font-sans">
                NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 ml-1">DEVS</span>
              </span>
            </a>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Building digital experiences for ambitious businesses. Transforming complex concepts into fast, conversion-engineered web software.
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <a 
                href="mailto:adity8377056503@gmail.com" 
                className="inline-flex items-center gap-2 hover:text-fuchsia-300 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Mail className="w-3 h-3" />
                </div>
                <span>adity8377056503@gmail.com</span>
              </a>

              <div className="flex flex-wrap items-center gap-3">
                <a 
                  href="tel:+918377056503" 
                  className="inline-flex items-center gap-2 hover:text-fuchsia-300 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Phone className="w-3 h-3" />
                  </div>
                  <span>+91 8377056503</span>
                </a>

                <a 
                  href="https://wa.me/918377056503" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors text-[11px]"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
              NAVIGATION
            </span>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-fuchsia-300 transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services Col */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
              SERVICES
            </span>
            <ul className="space-y-1.5 text-sm text-slate-300">
              <li>
                <a href="#services" className="hover:text-fuchsia-300 transition-colors block py-0.5">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-fuchsia-300 transition-colors block py-0.5">
                  Video Production & Editing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-fuchsia-300 transition-colors block py-0.5">
                  Graphic Design
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-fuchsia-300 transition-colors block py-0.5">
                  Branding
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-fuchsia-300 transition-colors block py-0.5">
                  Data & Operations
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-fuchsia-300 transition-colors block py-0.5">
                  SEO & Digital Growth
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top Col */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-200 hover:text-white hover:border-purple-400 transition-all group min-h-[44px]"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Nexus Devs. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-purple-300 transition-colors py-2"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-purple-300 transition-colors py-2"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      {/* Legal Dialog */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl p-[1px] bg-gradient-to-b from-fuchsia-500/50 via-purple-500/30 to-transparent my-auto max-h-[92vh] flex flex-col">
            <div className="rounded-[23px] bg-[#0d0926] border border-purple-500/30 p-5 sm:p-8 backdrop-blur-2xl overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 mb-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                  {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h3>
                <button
                  onClick={() => setLegalModal(null)}
                  className="p-2 rounded-full text-purple-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed space-y-3 max-h-72 overflow-y-auto pr-2">
                <p>
                  At Nexus Devs, we uphold strict confidentiality standards. All project inquiries, proprietary business logic, wireframes, and strategic assets shared during consultation remain 100% your exclusive intellectual property.
                </p>
                <p>
                  We store client contact submissions securely in encrypted cloud Firestore databases. We never distribute, sell, or rent client information to any third parties.
                </p>
                <p>
                  Contracts and development deliverables are executed under mutual non-disclosure agreements prior to development sprint kickoffs.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-purple-500/20 flex justify-end">
                <button
                  onClick={() => setLegalModal(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-white text-xs font-semibold min-h-[44px]"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
