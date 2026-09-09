import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquarePlus, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  X, 
  Check, 
  Trash2, 
  SlidersHorizontal,
  Lock,
  Unlock,
  AlertCircle
} from 'lucide-react';
import type { ClientReview } from '../types';
import { 
  submitClientReview, 
  getApprovedReviews, 
  getAllReviewsForAdmin, 
  updateReviewStatus, 
  deleteClientReview 
} from '../lib/firebase';
import type { User } from 'firebase/auth';

interface ClientReviewsProps {
  user?: User | null;
}

export const ClientReviews: React.FC<ClientReviewsProps> = ({ user }) => {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [loading, setLoading] = useState(true);

  // Review submission modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Admin moderation state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [showAdminQueue, setShowAdminQueue] = useState(false);
  const [adminReviews, setAdminReviews] = useState<ClientReview[]>([]);
  const [adminFilter, setAdminFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [adminActionLoading, setAdminActionLoading] = useState<string | null>(null);
  const [adminPasscodePrompt, setShowAdminPasscodePrompt] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Automatically recognize owner's email
  const isOwnerEmail = user?.email === 'adity8377056503@gmail.com';
  const hasAdminAccess = isOwnerEmail || isAdminUnlocked;

  // Load approved reviews for public view
  const loadPublicReviews = async () => {
    try {
      const data = await getApprovedReviews();
      setReviews(data);
    } catch (e) {
      console.error('Error fetching approved reviews:', e);
    } finally {
      setLoading(false);
    }
  };

  // Load all reviews for admin queue
  const loadAdminReviews = async () => {
    try {
      const data = await getAllReviewsForAdmin();
      setAdminReviews(data);
    } catch (e) {
      console.error('Error fetching all reviews for admin:', e);
    }
  };

  useEffect(() => {
    loadPublicReviews();
  }, []);

  useEffect(() => {
    if (hasAdminAccess) {
      loadAdminReviews();
    }
  }, [hasAdminAccess]);

  const handleOpenReviewModal = () => {
    if (user?.displayName && !name) {
      setName(user.displayName);
    }
    setSubmitSuccess(false);
    setSubmitError(null);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setSubmitError('Please enter your name.');
      return;
    }
    if (!reviewText.trim()) {
      setSubmitError('Please share a few words about your experience.');
      return;
    }
    if (rating < 1 || rating > 5) {
      setSubmitError('Please select a star rating between 1 and 5.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      await submitClientReview({
        name: name.trim(),
        company: company.trim() || undefined,
        rating,
        review: reviewText.trim(),
      });

      setSubmitSuccess(true);
      setName('');
      setCompany('');
      setReviewText('');
      setRating(5);

      // Refresh admin queue if admin is viewing
      if (hasAdminAccess) {
        await loadAdminReviews();
      }
    } catch (err) {
      console.error('Submit review error:', err);
      setSubmitError('Unable to submit review at this moment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Admin Actions
  const handleSetStatus = async (reviewId: string, newStatus: 'approved' | 'rejected') => {
    setAdminActionLoading(reviewId);
    try {
      await updateReviewStatus(reviewId, newStatus);
      await loadAdminReviews();
      await loadPublicReviews();
    } catch (err) {
      console.error('Update status error:', err);
    } finally {
      setAdminActionLoading(null);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this review?')) return;
    setAdminActionLoading(reviewId);
    try {
      await deleteClientReview(reviewId);
      await loadAdminReviews();
      await loadPublicReviews();
    } catch (err) {
      console.error('Delete review error:', err);
    } finally {
      setAdminActionLoading(null);
    }
  };

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    // Default secret passcode or 'aditya' or 'nexus2026'
    if (adminPasscode.trim().toLowerCase() === 'nexus' || adminPasscode.trim().toLowerCase() === 'aditya' || adminPasscode.trim() === '2026') {
      setIsAdminUnlocked(true);
      setShowAdminPasscodePrompt(false);
      setShowAdminQueue(true);
      setPasscodeError(false);
      setAdminPasscode('');
    } else {
      setPasscodeError(true);
    }
  };

  const pendingCount = adminReviews.filter((r) => r.status === 'pending').length;

  const ratingLabels: Record<number, string> = {
    1: '1 Star - Needs Improvement',
    2: '2 Stars - Fair',
    3: '3 Stars - Good',
    4: '4 Stars - Very Good',
    5: '5 Stars - Exceptional'
  };

  return (
    <section id="reviews" className="relative py-24 z-20 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-900/10 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            CLIENT REVIEWS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Authentic experiences.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
              Verified client stories.
            </span>
          </h2>
          <p className="text-slate-300/80 text-sm sm:text-base max-w-xl mx-auto">
            Real feedback from verified project partners. Every review is authenticated through our review moderation process.
          </p>

          {/* Action Bar: Leave a Review & Admin Moderation Toggle */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              id="leave-review-btn"
              onClick={handleOpenReviewModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white text-xs font-bold tracking-wider hover:opacity-95 shadow-xl shadow-fuchsia-950/40 hover:shadow-fuchsia-600/50 hover:scale-[1.02] transition-all duration-300"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>LEAVE A REVIEW</span>
            </button>

            {/* Admin Moderation Queue Button */}
            {hasAdminAccess ? (
              <button
                id="open-admin-queue-btn"
                onClick={() => {
                  loadAdminReviews();
                  setShowAdminQueue(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs font-semibold hover:border-fuchsia-400 hover:text-white transition-all shadow-lg"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Admin Review Queue</span>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold animate-pulse">
                    {pendingCount} Pending
                  </span>
                )}
              </button>
            ) : (
              <button
                id="admin-moderation-unlock-btn"
                onClick={() => setShowAdminPasscodePrompt(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/20 text-purple-400/80 hover:text-purple-200 text-[11px] transition-all"
                title="Moderation access for Nexus Dev team"
              >
                <Lock className="w-3 h-3 text-purple-400/70" />
                <span>Admin Moderation</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Section: Approved Reviews or Empty State */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 mx-auto border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
            <p className="mt-3 text-xs text-purple-300/70 font-mono">Loading verified reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          /* Approved Reviews Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/25 via-purple-500/10 to-transparent hover:from-fuchsia-500/40 hover:to-purple-500/20 transition-all duration-300 shadow-xl shadow-purple-950/30 flex flex-col justify-between"
              >
                <div className="h-full rounded-[23px] bg-[#0c0822]/85 backdrop-blur-xl border border-purple-500/20 p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Rating stars & verified badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= item.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-purple-950 text-purple-800'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal italic">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Reviewer Details & Date */}
                  <div className="pt-6 mt-6 border-t border-purple-500/15 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                        {item.name}
                      </h4>
                      {item.company && (
                        <p className="text-xs text-purple-300/80">
                          {item.company}
                        </p>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-purple-400/60">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State as mandated: "Be one of our first clients to share your experience." */
          <div className="relative max-w-2xl mx-auto rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent shadow-2xl">
            <div className="rounded-[23px] bg-[#0c0822]/90 backdrop-blur-2xl border border-purple-500/20 p-10 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-fuchsia-400 shadow-lg shadow-purple-950/50">
                <Star className="w-8 h-8 fill-fuchsia-400/20 text-fuchsia-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Be one of our first clients to share your experience.
                </h3>
                <p className="text-sm text-purple-300/80 max-w-md mx-auto leading-relaxed">
                  We take pride in transparent collaboration and high-fidelity delivery. Your honest testimonial helps other founders choose with confidence.
                </p>
              </div>

              <div className="pt-2">
                <button
                  id="empty-state-leave-review-btn"
                  onClick={handleOpenReviewModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white text-xs font-bold tracking-wider hover:opacity-95 shadow-xl shadow-fuchsia-950/50 hover:scale-[1.02] transition-all duration-300"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>LEAVE A REVIEW</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 1. Leave a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl p-[1px] bg-gradient-to-b from-fuchsia-500/40 via-purple-500/30 to-transparent shadow-2xl">
            <div className="rounded-[23px] bg-[#0d0926] border border-purple-500/30 p-6 sm:p-8">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-purple-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-fuchsia-400">
                    <MessageSquarePlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Leave a Client Review
                    </h3>
                    <p className="text-xs text-purple-300/70">
                      Published upon verification by Nexus Dev
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                /* Success Screen */
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white">
                      Thank you for sharing your experience!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                      Your review has been submitted for verification. To maintain authentic feedback standards, it will appear publicly once approved by our team.
                    </p>
                  </div>
                  <div className="pt-3">
                    <button
                      onClick={() => setShowReviewModal(false)}
                      className="px-6 py-2.5 rounded-full bg-purple-900/50 hover:bg-purple-900/80 border border-purple-500/30 text-xs font-semibold text-white transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                /* Review Form */
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Rating Selector (1 to 5 stars) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-2">
                      Your Rating <span className="text-fuchsia-400">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((starValue) => {
                        const isFilled = (hoverRating || rating) >= starValue;
                        return (
                          <button
                            key={starValue}
                            type="button"
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                            aria-label={`Rate ${starValue} stars`}
                          >
                            <Star
                              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                                isFilled
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                                  : 'fill-purple-950 text-purple-700/60 hover:text-purple-500'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs text-purple-300/80 font-mono ml-2">
                        {ratingLabels[hoverRating || rating]}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Your Full Name <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/25 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-all placeholder:text-purple-400/40"
                    />
                  </div>

                  {/* Company or Role (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Company / Organization <span className="text-purple-400/60 font-normal normal-case">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Founder at Horizon AI"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/25 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-all placeholder:text-purple-400/40"
                    />
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Your Review <span className="text-fuchsia-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the project, communication, execution quality, and outcome..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/25 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-all placeholder:text-purple-400/40 resize-none"
                    ></textarea>
                  </div>

                  {/* Notice */}
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-[11px] text-purple-300/80">
                    <ShieldCheck className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                    <span>
                      To preserve review integrity and prevent spam, submissions are reviewed and published only after admin approval.
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-bold tracking-wider hover:shadow-lg hover:shadow-fuchsia-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>SUBMITTING...</span>
                        </>
                      ) : (
                        <span>SUBMIT REVIEW</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 2. Admin Passcode Modal (For unlocking review queue if not signed in) */}
      {adminPasscodePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/40 to-transparent shadow-2xl">
            <div className="rounded-[23px] bg-[#0d0926] border border-purple-500/30 p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-500/20">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Lock className="w-4 h-4 text-fuchsia-400" />
                  <span>Admin Moderation Passcode</span>
                </div>
                <button
                  onClick={() => setShowAdminPasscodePrompt(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleVerifyPasscode} className="space-y-4">
                <p className="text-xs text-purple-300/80">
                  Enter agency admin passkey (<code className="text-fuchsia-400 font-mono">nexus</code> or <code className="text-fuchsia-400 font-mono">aditya</code>) to manage and approve client reviews:
                </p>
                <input
                  type="password"
                  placeholder="Enter passcode"
                  value={adminPasscode}
                  onChange={(e) => {
                    setAdminPasscode(e.target.value);
                    setPasscodeError(false);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-white text-sm focus:border-fuchsia-400 outline-none"
                  autoFocus
                />
                {passcodeError && (
                  <p className="text-xs text-rose-400">Invalid passcode. Try 'nexus' or sign in with your admin Google account.</p>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminPasscodePrompt(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold"
                  >
                    Unlock Queue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 3. Admin Review Queue Modal / Drawer */}
      {showAdminQueue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl p-[1px] bg-gradient-to-b from-fuchsia-500/50 via-purple-500/30 to-transparent shadow-2xl max-h-[90vh] flex flex-col">
            <div className="rounded-[23px] bg-[#0c0822] border border-purple-500/30 p-6 flex flex-col h-full overflow-hidden">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-purple-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-fuchsia-400">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Admin Review Approval Queue
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                        Active Admin
                      </span>
                    </div>
                    <p className="text-xs text-purple-300/70">
                      Approve or reject real reviews before they appear on the public site
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={loadAdminReviews}
                    className="px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/25 text-xs text-purple-300 hover:text-white transition-colors"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={() => setShowAdminQueue(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2 pb-4 mb-2 overflow-x-auto">
                {(['pending', 'approved', 'rejected', 'all'] as const).map((filterTab) => {
                  const count = filterTab === 'all'
                    ? adminReviews.length
                    : adminReviews.filter((r) => r.status === filterTab).length;
                  return (
                    <button
                      key={filterTab}
                      onClick={() => setAdminFilter(filterTab)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize flex items-center gap-1.5 transition-all ${
                        adminFilter === filterTab
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-purple-950/50 text-purple-300/70 hover:text-white border border-purple-500/20'
                      }`}
                    >
                      <span>{filterTab}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        filterTab === 'pending' && count > 0 ? 'bg-amber-400 text-purple-950 font-bold' : 'bg-purple-900/80 text-purple-200'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Reviews List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {adminReviews
                  .filter((r) => adminFilter === 'all' || r.status === adminFilter)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{item.name}</span>
                            {item.company && (
                              <span className="text-xs text-purple-300/70 font-normal">
                                • {item.company}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= item.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-purple-950 text-purple-800'
                                }`}
                              />
                            ))}
                            <span className="text-[11px] font-mono text-purple-400/60 ml-2">
                              {new Date(item.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {item.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              <Clock className="w-3 h-3" /> Pending Approval
                            </span>
                          )}
                          {item.status === 'approved' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              <Check className="w-3 h-3" /> Approved & Public
                            </span>
                          )}
                          {item.status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              <X className="w-3 h-3" /> Rejected
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Review text */}
                      <p className="text-xs sm:text-sm text-slate-200 bg-purple-950/50 p-3 rounded-xl border border-purple-500/15 leading-relaxed">
                        "{item.review}"
                      </p>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                        {item.status !== 'approved' && (
                          <button
                            disabled={adminActionLoading === item.id}
                            onClick={() => handleSetStatus(item.id, 'approved')}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all disabled:opacity-50"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Publish</span>
                          </button>
                        )}
                        {item.status !== 'rejected' && (
                          <button
                            disabled={adminActionLoading === item.id}
                            onClick={() => handleSetStatus(item.id, 'rejected')}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-rose-900/50 text-rose-200 hover:text-white border border-rose-500/30 text-xs font-semibold transition-all disabled:opacity-50"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}
                        <button
                          disabled={adminActionLoading === item.id}
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-purple-900/40 transition-colors"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                {adminReviews.filter((r) => adminFilter === 'all' || r.status === adminFilter).length === 0 && (
                  <div className="py-12 text-center text-purple-300/60 text-xs">
                    No reviews in the <span className="capitalize font-semibold text-purple-200">{adminFilter}</span> queue.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 mt-3 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-400/70">
                <span>Moderating as: {user?.email || 'Agency Administrator'}</span>
                <button
                  onClick={() => setShowAdminQueue(false)}
                  className="px-4 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-500/30 text-white font-medium"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
