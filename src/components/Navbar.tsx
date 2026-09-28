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
import { logoutUser } from '../lib/firebase';

interface NavbarProps {
  user: User | null;
  onOpenClientPortal: () => void;
  onStartProject: () => void;
  onOpenClientLogin: () => void;
  onSignOut?: () => Promise<void> | void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onOpenClientPortal, 
  onStartProject,
  onOpenClientLogin,
  onSignOut
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [navSignOutError, setNavSignOutError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setNavSignOutError(null);
    setSigningOut(true);
    try {
      if (onSignOut) {
        await onSignOut();
      } else {
        await logoutUser();
      }
      setAuthDropdownOpen(false);
      setMobileMenuOpen(false);
    } catch (e: any) {
      console.error('Sign out error:', e);
      setNavSignOutError(e?.message || 'Failed to sign out. Please try again.');
      setTimeout(() => setNavSignOutError(null), 4000);
    } finally {
      setSigningOut(false);
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

          {/* Desktop Navigation Links (For screens >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 px-3 xl:px-4 py-1.5 rounded-full bg-[#0f0a24]/60 border border-purple-500/20 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-2.5 xl:px-3.5 py-1 text-xs font-semibold tracking-wider text-slate-300 hover:text-white rounded-full transition-all duration-200 hover:bg-purple-500/15 focus:outline-none focus:ring-1 focus:ring-purple-400/50 whitespace-nowrap"
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
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-xs text-purple-200 hover:border-purple-400 transition-colors min-h-[38px]"
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
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0e0a24] border border-purple-500/30 p-2 shadow-2xl backdrop-blur-xl z-50 animate-fade-in">
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
                          type="button"
                          id="nav-user-signout-btn"
                          onClick={handleSignOut}
                          disabled={signingOut}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-300 hover:text-red-200 rounded-xl hover:bg-red-950/30 transition-colors text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <LogOut className={`w-3.5 h-3.5 ${signingOut ? 'animate-spin' : ''}`} />
                          <span>{signingOut ? 'Signing Out...' : 'Sign Out'}</span>
                        </button>
                        {navSignOutError && (
                          <div className="px-3 py-1.5 text-[11px] text-red-400 bg-red-950/70 border border-red-500/30 rounded-lg mx-1 my-1">
                            {navSignOutError}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenClientLogin}
                  id="nav-client-signin-btn"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400/60 text-xs text-purple-200 hover:text-white transition-all duration-200 cursor-pointer shadow-sm shadow-purple-950/50 min-h-[38px]"
                  title="Client Sign In — Nexus Devs Portal"
                >
                  <Sparkles className="w-3 h-3 text-fuchsia-400 animate-pulse" />
                  <span className="font-semibold whitespace-nowrap">Client Sign In</span>
                </button>
              )}
            </div>

            {/* Primary CTA: "LET'S CONNECT →" */}
            <button
              onClick={onStartProject}
              id="nav-connect-cta-btn"
              className="relative group overflow-hidden px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider text-white transition-all duration-300 shadow-lg shadow-purple-950/50 hover:shadow-purple-700/30 active:scale-95 min-h-[38px] flex items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 transition-all duration-300 group-hover:opacity-90"></div>
              <div className="absolute inset-[1px] bg-[#0c081e] rounded-full transition-opacity group-hover:bg-opacity-40"></div>
              <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                <span>LET'S CONNECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Tablet & Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-toggle-btn"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-xl bg-purple-950/60 border border-purple-500/25 text-slate-200 hover:text-white hover:bg-purple-900/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-fuchsia-400" /> : <Menu className="w-5 h-5 text-purple-300" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 rounded-2xl bg-[#0c0822]/98 border border-purple-500/30 p-4 shadow-2xl backdrop-blur-2xl max-h-[calc(100vh-6rem)] overflow-y-auto animate-fade-in">
            <div className="flex flex-col space-y-1.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pb-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2.5 text-xs font-semibold tracking-wider text-slate-300 hover:text-white rounded-xl hover:bg-purple-900/40 bg-purple-950/30 border border-purple-500/15 transition-colors flex items-center justify-between min-h-[44px]"
                  >
                    <span>{link.label}</span>
                    <span className="w-1 h-1 rounded-full bg-purple-400/50"></span>
                  </a>
                ))}
              </div>

              <div className="pt-3 mt-1 border-t border-purple-500/20 flex flex-col gap-2">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenClientPortal();
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-purple-200 bg-purple-950/60 hover:bg-purple-900/60 rounded-xl border border-purple-500/30 min-h-[44px] transition-colors"
                    >
                      <span>Track Inquiries ({user.displayName || user.email})</span>
                      <FolderKanban className="w-4 h-4 text-fuchsia-400" />
                    </button>
                    <button
                      type="button"
                      id="nav-mobile-user-signout-btn"
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:text-red-300 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                      <LogOut className={`w-3.5 h-3.5 ${signingOut ? 'animate-spin' : ''}`} />
                      <span>{signingOut ? 'Signing Out...' : 'Sign Out of Session'}</span>
                    </button>
                    {navSignOutError && (
                      <div className="px-4 py-1.5 text-[11px] text-red-400 bg-red-950/70 border border-red-500/30 rounded-lg mx-2 my-1">
                        {navSignOutError}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenClientLogin();
                    }}
                    id="nav-mobile-client-signin-btn"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold tracking-wider text-purple-200 bg-purple-950/80 hover:bg-purple-900 rounded-xl border border-purple-500/40 hover:border-purple-400/60 transition-all cursor-pointer min-h-[44px] shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
                    <span>CLIENT PORTAL SIGN IN</span>
                  </button>
                )}
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartProject();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-xs font-bold tracking-wider text-white text-center shadow-lg shadow-purple-900/50 min-h-[44px] flex items-center justify-center"
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
