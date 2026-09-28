import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import type { User } from 'firebase/auth';
import { 
  signInWithGoogle,
  FIREBASE_PROJECT_ID
} from '../lib/firebase';

interface ClientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialMessage?: string;
}

// Crisp Google 'G' brand icon
const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
      fill="#4285F4"
    />
    <path
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
      fill="#34A853"
    />
    <path
      d="M5.28 14.27a7.22 7.22 0 0 1 0-4.54V6.58H1.24a11.97 11.97 0 0 0 0 10.84l4.04-3.15z"
      fill="#FBBC05"
    />
    <path
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      fill="#EA4335"
    />
  </svg>
);

export const ClientLoginModal: React.FC<ClientLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMessage,
}) => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleBackToWebsite();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialMessage) {
        setError(initialMessage);
        setErrorCode(null);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialMessage]);

  if (!isOpen) return null;

  const handleBackToWebsite = () => {
    setError(null);
    setErrorCode(null);
    setSuccessMessage(null);
    if (
      window.location.hash === '#login' || 
      window.location.hash === '#client-login' || 
      window.location.hash === '#portal' || 
      window.location.hash === '#inquiries' ||
      window.location.hash === '#signin'
    ) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    onClose();
  };

  /**
   * SECURE GOOGLE SIGN-IN ONLY
   * Single source of truth: Firebase Authentication signInWithPopup with GoogleAuthProvider
   */
  const handleGoogleSignIn = async () => {
    setError(null);
    setErrorCode(null);
    setSuccessMessage(null);
    setGoogleLoading(true);

    try {
      const user = await signInWithGoogle();
      if (user) {
        setSuccessMessage('Successfully authenticated with Google! Opening your Client Portal...');
        setTimeout(() => {
          onLoginSuccess(user);
          handleBackToWebsite();
        }, 500);
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      const code = err?.code || '';
      const rawMessage = err?.message || 'Google authentication failed. Please try again.';
      setErrorCode(code || 'auth/unknown');

      if (code === 'auth/popup-closed-by-user') {
        setError('Google sign-in popup was closed before completing authentication.');
      } else if (code === 'auth/cancelled-popup-request') {
        setError('Previous sign-in request was cancelled. Please try again.');
      } else if (code === 'auth/popup-blocked') {
        setError('The sign-in popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (code === 'auth/operation-not-allowed') {
        setError('Google Authentication is not enabled in Firebase Console. Action required: Enable "Google" in Firebase Console under Authentication > Sign-in method.');
      } else if (code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for OAuth in Firebase. Action required: Add this domain in Firebase Console under Authentication > Settings > Authorized domains.');
      } else if (code === 'auth/configuration-not-found') {
        setError('Google OAuth configuration not found in Firebase. Action required: Configure Google provider in Firebase Console.');
      } else if (code === 'auth/network-request-failed') {
        setError('Network error: unable to reach Firebase Authentication servers. Please check your internet connection.');
      } else {
        setError(rawMessage);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#04020a]/90 backdrop-blur-xl animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-login-title"
      onClick={handleBackToWebsite}
    >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[300px] bg-gradient-to-r from-purple-700/20 via-fuchsia-600/15 to-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div 
        className="relative w-full max-w-[450px] mx-auto rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/50 via-fuchsia-500/30 to-indigo-500/20 shadow-2xl shadow-purple-950/70 my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[15px] sm:rounded-[23px] bg-[#09061a]/95 border border-purple-500/30 p-4 sm:p-7 md:p-8 backdrop-blur-2xl relative overflow-y-auto">
          
          {/* Top Bar: "Back to Website" and Close Button */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-purple-500/20">
            <button
              type="button"
              onClick={handleBackToWebsite}
              id="client-login-back-to-website-btn"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-colors group px-2 py-1.5 rounded-lg hover:bg-purple-950/40 min-h-[44px] cursor-pointer"
              title="Return to Nexus Devs homepage"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-fuchsia-400" />
              <span>Back to Website</span>
            </button>

            <button
              type="button"
              onClick={handleBackToWebsite}
              id="client-login-close-btn"
              aria-label="Close Client Login"
              className="p-2 rounded-full bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-purple-300 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-indigo-600 p-[1.5px] mb-2.5 shadow-lg shadow-purple-900/50">
              <div className="w-full h-full bg-[#080516] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-fuchsia-400" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-[10px] font-mono font-semibold uppercase tracking-widest text-purple-300 mb-1.5">
              <Sparkles className="w-3 h-3 text-fuchsia-400" />
              <span>Google Verified Portal</span>
            </div>

            <h2 id="client-login-title" className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Client Portal Sign In
            </h2>
            <p className="text-xs text-slate-300/80 mt-1 max-w-xs mx-auto leading-relaxed">
              Sign in with your Google account to access project roadmaps, live inquiry tracking, and deliverables.
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div 
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-200 animate-fade-in"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-snug break-words flex-1 space-y-1.5">
                {errorCode && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-red-900/90 border border-red-500/60 font-mono text-[10px] font-bold text-red-100 tracking-wider">
                      Error Code: {errorCode}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-900/50 border border-purple-500/30 font-mono text-[10px] text-purple-300">
                      Project: {FIREBASE_PROJECT_ID}
                    </span>
                  </div>
                )}
                <div className="leading-relaxed text-red-200">{error}</div>
              </div>
            </div>
          )}

          {successMessage && (
            <div 
              role="status"
              className="mb-5 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 flex items-start gap-2.5 text-xs text-emerald-200 animate-fade-in"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-snug break-words">{successMessage}</div>
            </div>
          )}

          {/* Google-Only Authentication Body */}
          <div className="space-y-4 my-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              id="client-login-google-btn"
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-[#0f0a28] hover:bg-[#18103d] border border-purple-500/40 hover:border-purple-400/80 text-sm font-semibold text-white shadow-lg shadow-purple-950/50 hover:shadow-purple-900/40 transition-all min-h-[48px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.99]"
            >
              {googleLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Google...</span>
                </>
              ) : (
                <>
                  <GoogleIcon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-center">
              <p className="text-[11px] text-slate-300/80 leading-relaxed flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                <span>Instant single sign-on powered by Firebase Google Auth.</span>
              </p>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="pt-3.5 mt-5 border-t border-purple-500/15 flex flex-wrap items-center justify-between gap-2 text-[11px] text-purple-300/70">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Firebase Auth Protected</span>
            </span>
            <span className="font-mono text-[10px] text-purple-400/70">
              Project: <span className="text-purple-200 font-semibold">{FIREBASE_PROJECT_ID}</span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
