import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  FolderKanban, 
  Sparkles 
} from 'lucide-react';
import type { User } from 'firebase/auth';
import { signInWithGoogle, logoutUser } from '../lib/firebase';

interface NavbarProps {
  user: User | null;
  onOpenClientPortal: () => void;
  onStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onOpenClientPortal, 
  onStartProject 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoogleAuth = async () => {
    try {
      setSigningIn(true);
      await signInWithGoogle();
      setAuthDropdownOpen(false);
    } catch (e) {
      console.error('Sign in error:', e);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      setAuthDropdownOpen(false);
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'WORK', href: '#work' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROCESS', href: '#process' },
    { label: 'TEAM', href: '#team' },
    { label: 'ABOUT', href: '#about' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#070512]/85 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-950/20' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            id="nav-brand-logo"
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-indigo-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#080514] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/25 transition-colors"></div>
                <div className="w-3.5 h-3.5 border-2 border-purple-300 rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full absolute"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-purple-200 transition-colors font-sans">
                NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 ml-1">DEVS</span>
              </span>
              <span className="text-[9px] tracking-widest text-purple-300/60 uppercase font-mono -mt-1 hidden sm:block">
                DIGITAL STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full bg-[#0f0a24]/50 border border-purple-500/15 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold tracking-wider text-slate-300 hover:text-white rounded-full transition-all duration-200 hover:bg-purple-500/10 focus:outline-none focus:ring-1 focus:ring-purple-400/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action & Auth Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Account / Client Portal */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                    id="nav-user-menu-btn"
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 hover:border-purple-400 transition-colors"
                    title={user.displayName || user.email || 'Client Profile'}
                  >
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt="Profile" 
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full border border-purple-400/50 object-cover" 
                      />
                    ) : (
                      <UserIcon className="w-3.5 h-3.5 text-purple-300" />
                    )}
                    <span className="hidden sm:inline font-medium max-w-[90px] truncate">
                      {user.displayName?.split(' ')[0] || 'Client'}
                    </span>
                  </button>

                  {authDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0e0a24] border border-purple-500/30 p-2 shadow-2xl backdrop-blur-xl z-50">
                      <div className="px-3 py-2 border-b border-purple-500/15">
                        <p className="text-xs font-medium text-white truncate">
                          {user.displayName || 'Client'}
                        </p>
                        <p className="text-[11px] text-purple-300/60 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-1 space-y-1">
                        <button
                          onClick={() => {
                            setAuthDropdownOpen(false);
                            onOpenClientPortal();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:text-white rounded-xl hover:bg-purple-900/30 transition-colors text-left"
                        >
                          <FolderKanban className="w-3.5 h-3.5 text-purple-400" />
                          <span>My Inquiries & Projects</span>
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-300 hover:text-red-200 rounded-xl hover:bg-red-950/30 transition-colors text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleGoogleAuth}
                  disabled={signingIn}
                  id="nav-google-signin-btn"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/25 text-xs text-purple-200 hover:text-white hover:border-purple-400 transition-all hover:bg-purple-900/40"
                  title="Sign in with Google to track project requests"
                >
                  <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span className="font-medium">{signingIn ? 'Connecting...' : 'Client Sign In'}</span>
                </button>
              )}
            </div>

            {/* Primary CTA: "LET'S CONNECT →" */}
            <button
              onClick={onStartProject}
              id="nav-connect-cta-btn"
              className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider text-white transition-all duration-300 shadow-lg shadow-purple-950/50 hover:shadow-purple-700/30 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 transition-all duration-300 group-hover:opacity-90"></div>
              <div className="absolute inset-[1px] bg-[#0c081e] rounded-full transition-opacity group-hover:bg-opacity-40"></div>
              <span className="relative z-10 flex items-center gap-1.5">
                <span>LET'S CONNECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-toggle-btn"
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-xl bg-purple-950/40 border border-purple-500/20 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-[#0c0822] border border-purple-500/25 p-4 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-xl hover:bg-purple-900/30 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-purple-500/20 flex flex-col gap-2">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenClientPortal();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-purple-200 bg-purple-950/50 rounded-xl border border-purple-500/30"
                    >
                      <span>Track Inquiries ({user.displayName || user.email})</span>
                      <FolderKanban className="w-4 h-4 text-purple-400" />
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="text-left px-3 py-1.5 text-xs text-red-400 hover:text-red-300"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleGoogleAuth}
                    disabled={signingIn}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-purple-200 bg-purple-950/60 rounded-xl border border-purple-500/30"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                    <span>Sign in with Google</span>
                  </button>
                )}
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartProject();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold tracking-wider text-white text-center shadow-lg shadow-purple-900/40"
                >
                  START A PROJECT →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
