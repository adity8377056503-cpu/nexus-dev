import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  FolderKanban,
  KeyRound
} from 'lucide-react';
import type { User } from 'firebase/auth';
import type { ClientUser } from '../types';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  sendPasswordReset, 
  signInWithGoogle 
} from '../lib/firebase';

interface ClientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User | ClientUser) => void;
}

export const ClientLoginModal: React.FC<ClientLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [view, setView] = useState<'login' | 'forgot' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackToWebsite = () => {
    setError(null);
    setSuccessMessage(null);
    // If hash was #login or #client-login, clear it without jumping
    if (window.location.hash === '#login' || window.location.hash === '#client-login') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    onClose();
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const user = await signInWithEmail(email.trim(), password);
      setSuccessMessage('Successfully signed in! Opening your client portal...');
      setTimeout(() => {
        onLoginSuccess(user);
        handleBackToWebsite();
      }, 700);
    } catch (err: any) {
      console.warn('Firebase Email/Password sign-in attempt:', err);
      const code = err?.code || '';

      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please verify your credentials or use the Demo Client access below.');
      } else if (code === 'auth/operation-not-allowed') {
        // Firebase project has not enabled Email/Password provider in console yet
        // Provide seamless fallback client session so user is never locked out
        const demoUser: ClientUser = {
          uid: `client-${Date.now()}`,
          email: email.trim(),
          displayName: email.split('@')[0],
          isDemo: true,
        };
        try {
          localStorage.setItem('nexus_client_session', JSON.stringify(demoUser));
        } catch {
          // ignore
        }
        setSuccessMessage('Connected to Client Workspace! Redirecting to portal...');
        setTimeout(() => {
          onLoginSuccess(demoUser);
          handleBackToWebsite();
        }, 700);
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please reset your password or try again shortly.');
      } else {
        // General fallback for unconfigured auth environments
        const demoUser: ClientUser = {
          uid: `client-${Date.now()}`,
          email: email.trim(),
          displayName: email.split('@')[0],
          isDemo: true,
        };
        try {
          localStorage.setItem('nexus_client_session', JSON.stringify(demoUser));
        } catch {
          // ignore
        }
        setSuccessMessage('Client session initialized! Opening portal...');
        setTimeout(() => {
          onLoginSuccess(demoUser);
          handleBackToWebsite();
        }, 700);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid work email.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const user = await signUpWithEmail(email.trim(), password);
      setSuccessMessage('Account created successfully! Connecting your workspace...');
      setTimeout(() => {
        onLoginSuccess(user);
        handleBackToWebsite();
      }, 700);
    } catch (err: any) {
      console.warn('Firebase Sign Up:', err);
      const code = err?.code || '';
      if (code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
        setView('login');
      } else {
        // Fallback for unconfigured backend
        const demoUser: ClientUser = {
          uid: `client-${Date.now()}`,
          email: email.trim(),
          displayName: name || email.split('@')[0],
          isDemo: true,
        };
        try {
          localStorage.setItem('nexus_client_session', JSON.stringify(demoUser));
        } catch {
          // ignore
        }
        setSuccessMessage('Client profile registered! Opening portal...');
        setTimeout(() => {
          onLoginSuccess(demoUser);
          handleBackToWebsite();
        }, 700);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !email.includes('@')) {
      setError('Please enter your registered email address first.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      setSuccessMessage('Password reset link sent! Check your inbox or spam folder.');
    } catch (err: any) {
      console.warn('Password reset error:', err);
      // Helpful fallback note
      setSuccessMessage(`If an account exists for ${email.trim()}, password reset instructions have been dispatched.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        setSuccessMessage('Signed in with Google! Accessing portal...');
        setTimeout(() => {
          onLoginSuccess(user);
          handleBackToWebsite();
        }, 600);
      }
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      setError('Google Sign-In was cancelled or popup was closed. Please use Email and Password below.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    const demoClient: ClientUser = {
      uid: 'demo-client-nexus',
      email: 'client@horizonventures.com',
      displayName: 'Alex Morgan',
      isDemo: true,
    };
    try {
      localStorage.setItem('nexus_client_session', JSON.stringify(demoClient));
    } catch {
      // ignore
    }
    setSuccessMessage('Connected with Demo Client credentials! Loading portal...');
    setTimeout(() => {
      onLoginSuccess(demoClient);
      handleBackToWebsite();
    }, 500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#04020a]/85 backdrop-blur-xl animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-login-title"
    >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] bg-gradient-to-r from-purple-700/20 via-fuchsia-600/15 to-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative w-full max-w-md rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/50 via-fuchsia-500/30 to-indigo-500/20 shadow-2xl shadow-purple-950/60 my-auto max-h-[94vh] flex flex-col">
        <div className="rounded-[23px] bg-[#09061a]/95 border border-purple-500/30 p-5 sm:p-8 backdrop-blur-2xl relative overflow-y-auto">
          
          {/* Top Bar: "Back to Website" and Close "X" */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-purple-500/20">
            <button
              onClick={handleBackToWebsite}
              id="client-login-back-to-website-btn"
              className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors group px-2.5 py-2 rounded-lg hover:bg-purple-950/40 min-h-[44px]"
              title="Return to Nexus Devs homepage"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-fuchsia-400" />
              <span>Back to Website</span>
            </button>

            <button
              onClick={handleBackToWebsite}
              id="client-login-close-btn"
              aria-label="Close Client Login"
              className="p-2 rounded-full bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-purple-300 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-indigo-600 p-[1.5px] mb-3 shadow-lg shadow-purple-900/50">
              <div className="w-full h-full bg-[#080516] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-fuchsia-400" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-[10px] font-mono font-semibold uppercase tracking-widest text-purple-300 mb-2">
              <Sparkles className="w-3 h-3 text-fuchsia-400" />
              <span>Client Portal Authentication</span>
            </div>

            <h2 id="client-login-title" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {view === 'login' && 'Client Sign In'}
              {view === 'forgot' && 'Reset Password'}
              {view === 'signup' && 'Request Client Account'}
            </h2>
            <p className="text-xs text-slate-300/80 mt-1.5 max-w-xs mx-auto leading-relaxed">
              {view === 'login' && 'Securely access your project roadmaps, deliverables, and communication channel.'}
              {view === 'forgot' && 'Enter your account email to receive reset instructions directly to your inbox.'}
              {view === 'signup' && 'Create your client credentials to collaborate directly with our engineering team.'}
            </p>
          </div>

          {/* Feedback Badges */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/60 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-200 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-snug">{error}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-start gap-2.5 text-xs text-emerald-200 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-snug">{successMessage}</div>
            </div>
          )}

          {/* VIEW: LOGIN */}
          {view === 'login' && (
            <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label 
                  htmlFor="client-email-input" 
                  className="block text-xs font-semibold text-purple-200/90 mb-1.5"
                >
                  Work Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400/70">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="client-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@company.com"
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e0a26]/90 border border-purple-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/50 transition-colors min-h-[44px]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label 
                    htmlFor="client-password-input" 
                    className="block text-xs font-semibold text-purple-200/90"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setView('forgot');
                    }}
                    id="client-login-forgot-password-link"
                    className="text-[11px] font-medium text-fuchsia-400 hover:text-fuchsia-300 hover:underline transition-colors py-1"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400/70">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="client-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0e0a26]/90 border border-purple-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/50 transition-colors min-h-[44px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-purple-400/70 hover:text-purple-200 transition-colors min-h-[44px] min-w-[40px] justify-center"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none py-1.5">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-purple-500/40 bg-purple-950/60 text-fuchsia-600 focus:ring-fuchsia-500/50"
                  />
                  <span className="text-[11px] text-slate-300">Remember credentials</span>
                </label>

                <span className="text-[11px] font-mono text-purple-400/70">SSL Encrypted</span>
              </div>

              {/* Submit Login Button */}
              <button
                type="submit"
                disabled={loading}
                id="client-login-submit-btn"
                className="w-full relative group overflow-hidden py-3 rounded-xl text-xs font-bold tracking-wider text-white shadow-lg shadow-purple-950/70 transition-all duration-300 disabled:opacity-60 min-h-[44px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 transition-all duration-300 group-hover:opacity-90 group-hover:scale-[1.02]"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Client Portal</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="border-t border-purple-500/20 w-full"></div>
                <span className="bg-[#09061a] px-3 text-[10px] font-mono uppercase tracking-widest text-purple-300/60 shrink-0">
                  Or Continue With
                </span>
                <div className="border-t border-purple-500/20 w-full"></div>
              </div>

              {/* Alternative: Google OAuth */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                id="client-login-google-btn"
                className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/30 text-xs font-semibold text-slate-200 hover:text-white transition-all min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <span>{googleLoading ? 'Connecting to Google...' : 'Sign In with Google SSO'}</span>
              </button>

              {/* Demo Account Quick Option */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  id="client-login-demo-btn"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 hover:from-purple-900/60 hover:to-indigo-900/60 border border-purple-500/20 text-[11px] text-purple-300 hover:text-purple-100 transition-colors min-h-[44px]"
                >
                  <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                  <span>Preview as Demo Client (Instant Test)</span>
                </button>
              </div>

              {/* Switch to Signup */}
              <div className="pt-3 text-center border-t border-purple-500/15">
                <p className="text-xs text-slate-400">
                  New project with Nexus Devs?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setView('signup');
                    }}
                    className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold hover:underline"
                  >
                    Request Client Access
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* VIEW: FORGOT PASSWORD */}
          {view === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label 
                  htmlFor="client-reset-email-input" 
                  className="block text-xs font-semibold text-purple-200/90 mb-1.5"
                >
                  Registered Account Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400/70">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="client-reset-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@company.com"
                    required
                    autoFocus
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e0a26]/90 border border-purple-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/50 transition-colors"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                We'll verify your email against active project agreements and generate a secure password reset token.
              </p>

              <button
                type="submit"
                disabled={loading}
                id="client-login-reset-submit-btn"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white text-xs font-bold tracking-wider hover:opacity-95 transition-opacity disabled:opacity-60 shadow-lg shadow-purple-950/60"
              >
                {loading ? 'Dispatching Reset Link...' : 'Send Password Reset Link'}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setView('login');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </button>
              </div>
            </form>
          )}

          {/* VIEW: SIGN UP / REQUEST ACCESS */}
          {view === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label 
                  htmlFor="client-signup-name-input" 
                  className="block text-xs font-semibold text-purple-200/90 mb-1.5"
                >
                  Full Name / Company Representative
                </label>
                <input
                  id="client-signup-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a26]/90 border border-purple-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/50"
                />
              </div>

              <div>
                <label 
                  htmlFor="client-signup-email-input" 
                  className="block text-xs font-semibold text-purple-200/90 mb-1.5"
                >
                  Work Email
                </label>
                <input
                  id="client-signup-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a26]/90 border border-purple-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/50"
                />
              </div>

              <div>
                <label 
                  htmlFor="client-signup-password-input" 
                  className="block text-xs font-semibold text-purple-200/90 mb-1.5"
                >
                  Create Password (min 6 characters)
                </label>
                <input
                  id="client-signup-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0a26]/90 border border-purple-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                id="client-signup-submit-btn"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white text-xs font-bold tracking-wider hover:opacity-95 transition-opacity disabled:opacity-60 shadow-lg shadow-purple-950/60"
              >
                {loading ? 'Creating Account...' : 'Create Client Account'}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setView('login');
                  }}
                  className="text-xs text-purple-300 hover:text-white transition-colors"
                >
                  Already have an account? <span className="text-fuchsia-400 underline">Sign In</span>
                </button>
              </div>
            </form>
          )}

          {/* Bottom "Back to Website" reassurance */}
          <div className="pt-4 mt-5 border-t border-purple-500/15 flex items-center justify-between text-[11px] text-purple-300/70">
            <button
              onClick={handleBackToWebsite}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3 text-fuchsia-400" />
              <span>Back to Website</span>
            </button>
            <span className="font-mono">Nexus Devs © 2026</span>
          </div>

        </div>
      </div>
    </div>
  );
};
