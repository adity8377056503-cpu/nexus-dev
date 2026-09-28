import React, { useState, useEffect } from 'react';
import { 
  X, 
  FolderKanban, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  LogOut, 
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Lock,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import type { User } from 'firebase/auth';
import type { ProjectInquiry } from '../types';
import { getUserInquiries, signInWithGoogle, logoutUser } from '../lib/firebase';

interface ClientPortalModalProps {
  user: User | null;
  onClose: () => void;
  onStartNewProject: () => void;
  onOpenLogin: () => void;
  onSignOut?: () => Promise<void> | void;
}

// Google SVG icon
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

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  user,
  onClose,
  onStartNewProject,
  onOpenLogin,
  onSignOut,
}) => {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [signingInGoogle, setSigningInGoogle] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'received' | 'in-review' | 'discovery-scheduled'>('all');

  // Query authenticated user inquiries
  const fetchInquiries = async () => {
    if (!user) {
      setInquiries([]);
      return;
    }
    setLoading(true);
    try {
      const data = await getUserInquiries(user.uid, user.email || undefined);
      setInquiries(data);
    } catch (e) {
      console.error('Failed to load inquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInquiries();
    } else {
      setInquiries([]);
    }
  }, [user]);

  // Handle Google Auth from within gate
  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setSigningInGoogle(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Google sign in error:', err);
      const code = err?.code || '';
      if (code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup was closed before completing authentication.');
      } else if (code === 'auth/operation-not-allowed') {
        setAuthError('Google sign-in is not enabled in Firebase Console. Action required: Enable "Google" in Firebase Console > Authentication > Sign-in method.');
      } else if (code === 'auth/unauthorized-domain') {
        setAuthError('This domain is not authorized for OAuth in Firebase. Action required: Add domain in Firebase Console > Authentication > Settings.');
      } else {
        setAuthError(err?.message || 'Google authentication failed.');
      }
    } finally {
      setSigningInGoogle(false);
    }
  };

  const handleSignOut = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAuthError(null);
    setSigningOut(true);
    try {
      if (onSignOut) {
        await onSignOut();
      } else {
        await logoutUser();
        onClose();
      }
    } catch (e: any) {
      console.error('Sign out error:', e);
      setAuthError(e?.message || 'Failed to sign out. Please try again.');
    } finally {
      setSigningOut(false);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter === 'all') return true;
    return inq.status === statusFilter;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-portal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-fuchsia-500/50 via-purple-500/30 to-indigo-500/20 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[15px] sm:rounded-[23px] bg-[#0c0822]/98 border border-purple-500/30 p-4 sm:p-7 md:p-8 backdrop-blur-2xl overflow-y-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-purple-500/20">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                <FolderKanban className="w-5 h-5 text-fuchsia-400" />
              </div>
              <div>
                <h3 id="client-portal-title" className="text-base sm:text-lg font-bold text-white leading-snug">
                  Nexus Devs Client Portal
                </h3>
                <p className="text-[11px] sm:text-xs text-purple-300/70 truncate max-w-[200px] sm:max-w-none">
                  {user ? `Authenticated as ${user.displayName || user.email}` : 'Access Restricted — Authentication Required'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              id="client-portal-close-btn"
              aria-label="Close Client Portal"
              className="p-2 rounded-full bg-purple-950/80 text-purple-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 cursor-pointer border border-purple-500/30 hover:border-purple-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Feedback or Auth Errors */}
          {authError && (
            <div 
              role="alert"
              className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-200 animate-fade-in"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-snug break-words">{authError}</div>
            </div>
          )}

          {/* 1. ACCESS RESTRICTED GATE FOR UNAUTHENTICATED USERS */}
          {!user ? (
            <div className="py-8 sm:py-12 px-4 text-center space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-fuchsia-400 shadow-xl shadow-purple-950/60">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-fuchsia-400" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Client Authentication Required
                </h4>
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                  The Client Portal contains confidential project briefs, production milestones, and dedicated client deliverables. Please sign in to verify your account.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 max-w-xs mx-auto pt-2">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={signingInGoogle}
                  id="portal-gate-google-btn"
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-white via-slate-100 to-white hover:from-slate-100 hover:to-slate-200 text-slate-900 text-xs font-bold shadow-lg shadow-purple-950/60 transition-all min-h-[48px] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 group active:scale-[0.99]"
                >
                  {signingInGoogle ? (
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <GoogleIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  )}
                  <span className="font-bold tracking-wide">Continue with Google</span>
                </button>
              </div>

              <div className="pt-4 border-t border-purple-500/15 max-w-xs mx-auto">
                <span className="text-[11px] text-purple-300/60 font-mono">
                  Encrypted Firebase Client Sessions
                </span>
              </div>
            </div>
          ) : (
            /* 2. AUTHENTICATED CLIENT WORKSPACE */
            <div className="space-y-6">
              {/* User Session Ribbon */}
              <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-purple-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Client'}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border-2 border-purple-400/60 object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-sm shrink-0 border border-purple-400/40">
                      {(user.displayName || user.email || 'C').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white truncate">
                        {user.displayName || 'Verified Client'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                        Authenticated
                      </span>
                    </div>
                    <div className="text-[11px] text-purple-300/70 font-mono truncate max-w-[240px] sm:max-w-none">
                      {user.email}
                    </div>
                  </div>
                </div>

                {/* Sign Out Button */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    id="client-portal-signout-btn"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 hover:border-red-500/60 text-xs text-red-300 hover:text-red-100 transition-all min-h-[44px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    <LogOut className={`w-3.5 h-3.5 ${signingOut ? 'animate-spin' : ''}`} />
                    <span>{signingOut ? 'Signing Out...' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>

              {/* Status Overview Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#0e0a28]/80 border border-purple-500/20 text-center sm:text-left">
                  <div className="text-[10px] sm:text-xs font-mono text-purple-300/70 uppercase tracking-wider">
                    Total Briefs
                  </div>
                  <div className="text-lg sm:text-2xl font-black text-white mt-0.5">
                    {inquiries.length}
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-[#0e0a28]/80 border border-purple-500/20 text-center sm:text-left">
                  <div className="text-[10px] sm:text-xs font-mono text-purple-300/70 uppercase tracking-wider">
                    In Review
                  </div>
                  <div className="text-lg sm:text-2xl font-black text-fuchsia-300 mt-0.5">
                    {inquiries.filter((i) => i.status === 'in-review' || i.status === 'received').length}
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-[#0e0a28]/80 border border-purple-500/20 text-center sm:text-left">
                  <div className="text-[10px] sm:text-xs font-mono text-purple-300/70 uppercase tracking-wider">
                    Discovery
                  </div>
                  <div className="text-lg sm:text-2xl font-black text-emerald-400 mt-0.5">
                    {inquiries.filter((i) => i.status === 'discovery-scheduled').length}
                  </div>
                </div>
              </div>

              {/* Inquiries List & Filters */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
                      Your Project Inquiries ({filteredInquiries.length})
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    {/* Status Filter buttons */}
                    <div className="inline-flex rounded-lg bg-purple-950/60 p-0.5 border border-purple-500/20 text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => setStatusFilter('all')}
                        className={`px-2 py-1 rounded-md transition-colors ${statusFilter === 'all' ? 'bg-purple-600 text-white font-bold' : 'text-purple-300/70 hover:text-white'}`}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatusFilter('received')}
                        className={`px-2 py-1 rounded-md transition-colors ${statusFilter === 'received' ? 'bg-purple-600 text-white font-bold' : 'text-purple-300/70 hover:text-white'}`}
                      >
                        Active
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={fetchInquiries}
                      disabled={loading}
                      className="text-xs text-purple-300 hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-950/50 border border-purple-500/20 min-h-[36px] cursor-pointer"
                      title="Sync records from Firestore"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="py-12 text-center text-xs text-purple-300 flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
                    <span>Querying your private inquiries...</span>
                  </div>
                ) : filteredInquiries.length === 0 ? (
                  <div className="py-10 px-4 text-center rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-3">
                    <FileText className="w-8 h-8 text-purple-400/60 mx-auto" />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-white">
                        {inquiries.length === 0 ? "You haven't submitted any project inquiries yet." : "No inquiries match this filter."}
                      </p>
                      <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                        Submit a brief below and our engineering team will evaluate your architecture, timeline, and deliverables.
                      </p>
                    </div>
                    {inquiries.length === 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onStartNewProject();
                        }}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md shadow-purple-950/50 min-h-[44px] cursor-pointer"
                      >
                        Start a Project Brief →
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[340px] sm:max-h-[380px] overflow-y-auto pr-1">
                    {filteredInquiries.map((inq) => (
                      <div
                        key={inq.id || inq.createdAt}
                        className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-2.5 hover:border-purple-400/40 transition-all hover:bg-purple-950/40"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-white">
                              {inq.projectType}
                            </span>
                            {inq.company && (
                              <span className="text-[11px] text-purple-300/70 font-mono">
                                • {inq.company}
                              </span>
                            )}
                          </div>
                          <span className={`self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                            inq.status === 'discovery-scheduled'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                              : inq.status === 'in-review'
                              ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                              : 'bg-fuchsia-950 text-fuchsia-300 border-fuchsia-500/40'
                          }`}>
                            {inq.status === 'discovery-scheduled' ? 'Discovery Scheduled' : inq.status === 'in-review' ? 'In Review' : 'Received'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                          {inq.description}
                        </p>

                        <div className="pt-2 border-t border-purple-500/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-purple-400/80">
                          <div className="flex items-center gap-3">
                            <span>Budget: <strong className="text-purple-200">{inq.budget}</strong></span>
                            {inq.timeline && <span>Timeline: {inq.timeline}</span>}
                          </div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(inq.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 font-mono text-center sm:text-left">
                  Connected to Nexus Devs Cloud Repository
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartNewProject();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wider shadow-lg shadow-purple-950/60 min-h-[44px] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Submit New Project Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
