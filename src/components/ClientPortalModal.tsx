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
  AlertCircle 
} from 'lucide-react';
import type { User } from 'firebase/auth';
import type { ProjectInquiry, ClientUser } from '../types';
import { getUserInquiries, signInWithGoogle, logoutUser } from '../lib/firebase';

interface ClientPortalModalProps {
  user: User | ClientUser | null;
  onClose: () => void;
  onStartNewProject: () => void;
  onOpenLogin?: () => void;
  onSignOut?: () => Promise<void> | void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  user,
  onClose,
  onStartNewProject,
  onOpenLogin,
  onSignOut,
}) => {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getUserInquiries(user?.uid || 'guest', user?.email || undefined);
      setInquiries(data);
    } catch (e) {
      console.error('Failed to load inquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      await signInWithGoogle();
    } catch (e) {
      console.error('Google sign in error:', e);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSignOutError(null);
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
      setSignOutError(e?.message || 'Failed to sign out. Please try again.');
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl p-[1px] bg-gradient-to-b from-fuchsia-500/50 via-purple-500/30 to-indigo-500/20 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[23px] bg-[#0c0822] border border-purple-500/30 p-5 sm:p-8 backdrop-blur-2xl overflow-y-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                <FolderKanban className="w-5 h-5 text-fuchsia-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">Client Portal & Project Tracker</h3>
                <p className="text-xs text-purple-300/70 truncate max-w-[200px] sm:max-w-none">
                  {user ? `Connected as ${user.displayName || user.email}` : 'Guest Session (Local + Cloud)'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              id="client-portal-close-btn"
              aria-label="Close Client Portal"
              className="p-2 rounded-full bg-purple-950/80 text-purple-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Auth Ribbon */}
          <div className="mb-6 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full border border-purple-400/50 object-cover"
                  />
                )}
                <div>
                  <div className="text-xs font-bold text-white">{user.displayName || 'Authenticated Client'}</div>
                  <div className="text-[11px] text-purple-300/70 font-mono">{user.email}</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-300 max-w-sm">
                <span className="font-semibold text-white">Sign in to your client account</span> to sync your project briefs across devices and receive live status updates.
              </div>
            )}

            <div>
              {user ? (
                <div className="flex flex-col items-end gap-1.5">
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
                  {signOutError && (
                    <div className="text-[11px] text-red-400 bg-red-950/80 border border-red-500/40 rounded-lg px-2.5 py-1 flex items-center gap-1.5 mt-1 max-w-xs text-right">
                      <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
                      <span>{signOutError}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {onOpenLogin && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenLogin();
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-bold tracking-wider shadow-md shadow-purple-950/50 transition-all min-h-[44px]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-fuchsia-200" />
                      <span>Client Sign In</span>
                    </button>
                  )}
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={signingIn}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-white text-xs font-medium tracking-wide hover:opacity-95 min-h-[44px]"
                    title="Sign in with Google SSO"
                  >
                    <span>{signingIn ? 'Connecting...' : 'Google SSO'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* List of Inquiries */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
                YOUR SUBMITTED INQUIRIES ({inquiries.length})
              </span>
              <button
                onClick={fetchInquiries}
                className="text-xs text-purple-400 hover:text-purple-200 flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-purple-300">
                Querying Firestore records...
              </div>
            ) : inquiries.length === 0 ? (
              <div className="py-10 px-4 text-center rounded-2xl bg-purple-950/20 border border-purple-500/15 space-y-3">
                <p className="text-xs text-slate-400">
                  You haven't submitted any project requests yet.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartNewProject();
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold"
                >
                  Start a Project Brief →
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id || inq.createdAt}
                    className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-2 hover:border-purple-400/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {inq.projectType}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-500/30">
                        {inq.status || 'Received'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">
                      {inq.description}
                    </p>

                    <div className="pt-2 border-t border-purple-500/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-purple-400/80">
                      <span>Budget: {inq.budget}</span>
                      <span>
                        {new Date(inq.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400 font-mono">
              Nexus Devs Cloud Persistence Active
            </span>
            <button
              onClick={() => {
                onClose();
                onStartNewProject();
              }}
              className="px-4 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-white text-xs font-bold min-h-[44px] flex items-center justify-center"
            >
              Submit New Brief +
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
