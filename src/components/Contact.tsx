import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  Phone,
  MessageCircle,
  Building2,
  CheckCircle2, 
  Sparkles, 
  Clock,
  ShieldCheck,
  User as UserIcon,
  ArrowUpRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { User } from 'firebase/auth';
import { submitProjectInquiry, signInWithGoogle } from '../lib/firebase';

interface ContactProps {
  user: User | null;
  prefilledPlan?: string;
  prefilledService?: string;
  onOpenClientPortal: () => void;
  onOpenClientLogin?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ 
  user, 
  prefilledPlan, 
  prefilledService,
  onOpenClientPortal,
  onOpenClientLogin 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('Web Development');
  const [budget, setBudget] = useState('₹50k - ₹1.5L ($600 - $2,000)');
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState('2-4 weeks');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Sync with user's info if logged in
  useEffect(() => {
    if (user) {
      if (!name && user.displayName) setName(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user]);

  // Sync pre-filled plan or service
  useEffect(() => {
    if (prefilledPlan) {
      setDescription((prev) => 
        prev ? `${prev}\nInterested in ${prefilledPlan} package.` : `Interested in ${prefilledPlan} package.`
      );
    }
    if (prefilledService) {
      setProjectType(prefilledService);
    }
  }, [prefilledPlan, prefilledService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !description.trim()) {
      setError('Please fill in your name, email and project description.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await submitProjectInquiry({
        name,
        email,
        company,
        projectType,
        budget,
        description,
        timeline,
        userId: user ? user.uid : null,
      });

      setSubmitted(true);
      setSubmittedId(res.id);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#d946ef', '#ec4899', '#6366f1']
      });

    } catch (err: unknown) {
      console.error('Submission error:', err);
      setError('Failed to submit. Please try again or email directly at adity8377056503@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName(user?.displayName || '');
    setEmail(user?.email || '');
    setCompany('');
    setDescription('');
    setSubmitted(false);
    setSubmittedId('');
  };

  return (
    <section id="contact" className="relative py-24 z-20 overflow-hidden">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-800/20 via-fuchsia-700/15 to-transparent blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Glowing Glass Container */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/40 via-fuchsia-500/30 to-indigo-500/30 shadow-2xl shadow-purple-950/50">
          <div className="rounded-[23px] bg-[#0c0822]/95 backdrop-blur-2xl border border-purple-500/25 p-6 sm:p-10 lg:p-14 overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Headline, Description, Contact Details */}
              <div className="lg:col-span-5 space-y-7">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-widest uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
                    START A PROJECT
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                    LET'S BUILD<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
                      SOMETHING GREAT.
                    </span>
                  </h2>
                  <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                    Have an idea, business or product that needs a high-impact digital presence, custom web platform, or creative campaign? Connect with us directly or submit your project brief.
                  </p>
                </div>

                {/* Direct Real Business Contact Points */}
                <div className="space-y-3.5 text-sm text-slate-300">

                  {/* Agency & Lead Details Card */}
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/25 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-300">
                          <Building2 className="w-5 h-5 text-purple-300" />
                        </div>
                        <div>
                          <span className="text-[10px] text-purple-400 uppercase font-mono tracking-wider block">Agency</span>
                          <span className="font-extrabold text-base text-white">Nexus Dev</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-purple-400 uppercase font-mono tracking-wider block">Lead Contact</span>
                        <span className="font-bold text-sm text-fuchsia-300">Aditya Raj</span>
                      </div>
                    </div>
                  </div>

                  {/* Clickable Email Card */}
                  <a 
                    href="mailto:adity8377056503@gmail.com" 
                    id="contact-email-link"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/20 hover:border-purple-400/60 hover:bg-purple-900/35 transition-all text-white group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:text-fuchsia-300 group-hover:scale-105 transition-all shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-purple-400 uppercase font-mono tracking-wider block">Email Address</span>
                        <span className="font-semibold text-sm truncate block group-hover:text-fuchsia-200 transition-colors">
                          adity8377056503@gmail.com
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:text-white group-hover:bg-purple-600/50 transition-all shrink-0 ml-2">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </a>

                  {/* Clickable Phone Number & WhatsApp */}
                  <div 
                    id="contact-phone-card"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-900/30 transition-all text-white"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <a
                        href="tel:+918377056503"
                        id="contact-phone-icon-btn"
                        title="Call +91 8377056503"
                        aria-label="Call +91 8377056503"
                        className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:text-fuchsia-300 hover:border-fuchsia-400/60 hover:scale-105 transition-all shrink-0"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                      <div className="min-w-0">
                        <span className="text-[10px] text-purple-400 uppercase font-mono tracking-wider block">Phone Call</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a 
                            href="tel:+918377056503"
                            id="contact-phone-link"
                            className="font-semibold text-sm hover:text-fuchsia-200 transition-colors whitespace-nowrap"
                            title="Click to call +91 8377056503"
                          >
                            +91 8377056503
                          </a>

                          {/* WhatsApp Icon next to phone number */}
                          <a
                            href="https://wa.me/918377056503"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="contact-phone-whatsapp-icon"
                            aria-label="Chat on WhatsApp with +91 8377056503"
                            title="Chat on WhatsApp (+91 8377056503)"
                            className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm shadow-emerald-950/50 shrink-0 group/wa"
                          >
                            <MessageCircle className="w-4 h-4 fill-emerald-400/20 group-hover/wa:fill-slate-950" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <a
                      href="tel:+918377056503"
                      id="contact-phone-action-btn"
                      title="Call +91 8377056503"
                      className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-600/50 transition-all shrink-0 ml-2"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Dedicated Clickable WhatsApp Contact Button */}
                  <a 
                    href="https://wa.me/918377056503" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    id="chat-on-whatsapp-btn"
                    title="Chat on WhatsApp (+91 8377056503)"
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-emerald-900/40 to-purple-950/40 border border-emerald-500/40 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 hover:bg-emerald-950/80 active:scale-[0.99] transition-all duration-200 text-white group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:scale-105 transition-all duration-200 shrink-0 shadow-sm shadow-emerald-950/50">
                        <MessageCircle className="w-5 h-5 fill-emerald-400/20 group-hover:fill-slate-950 transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base sm:text-lg text-white group-hover:text-emerald-200 transition-colors">
                            Chat on WhatsApp
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Online
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-emerald-300/85 font-medium block truncate mt-0.5">
                          +91 8377056503
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950 text-xs font-semibold transition-all duration-200 shrink-0 ml-2">
                      <span className="hidden sm:inline">Connect</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>

                  {/* Turnaround Commitment */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-950/25 border border-purple-500/20 text-slate-300">
                    <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-xs text-slate-300/90">Prompt response within 24 hours guaranteed.</span>
                  </div>

                </div>

              </div>

              {/* Right Column: Project Request Intake Form / Success View */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#090518]/90 border border-purple-500/25 p-6 sm:p-8 backdrop-blur-xl">
                  
                  {submitted ? (
                    <div className="text-center py-10 space-y-5 animate-fade-in">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center mx-auto text-white shadow-xl shadow-fuchsia-500/40">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-extrabold text-white">
                          Thanks! Your project request has been received.
                        </h3>
                        <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                          We've logged your project specs to our cloud database. Aditya Raj from Nexus Dev will review your request and reach out within 24 hours.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 max-w-sm mx-auto text-xs font-mono text-purple-300">
                        Reference Ticket: <span className="text-fuchsia-400 font-bold">{submittedId.slice(0, 12)}</span>
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                        {user ? (
                          <button
                            onClick={onOpenClientPortal}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold"
                          >
                            Track Inquiries in Portal →
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              if (onOpenClientLogin) {
                                onOpenClientLogin();
                              } else {
                                try {
                                  await signInWithGoogle();
                                  onOpenClientPortal();
                                } catch (e) {
                                  console.error(e);
                                }
                              }
                            }}
                            className="px-5 py-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-900 border border-purple-500/30 text-white text-xs font-bold transition-all"
                          >
                            Sign In to Track Status
                          </button>
                        )}
                        
                        <button
                          onClick={resetForm}
                          className="px-4 py-2.5 text-xs text-purple-300 hover:text-white"
                        >
                          Submit Another Project
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      {/* Form Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-purple-500/15">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
                          PROJECT BRIEF
                        </span>
                        {user ? (
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            Linked to {user.email}
                          </span>
                        ) : (
                          <span className="text-[11px] text-purple-400/80">
                            Guest or Google Account
                          </span>
                        )}
                      </div>

                      {error && (
                        <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300">
                          {error}
                        </div>
                      )}

                      {/* Row 1: Name and Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alex Vance"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-colors min-h-[44px]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="alex@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-colors min-h-[44px]"
                          />
                        </div>
                      </div>

                      {/* Row 2: Business / Company & Project Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Business / Company
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Acme Innovations"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-colors min-h-[44px]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Project Type
                          </label>
                          <select
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/20 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-colors min-h-[44px]"
                          >
                            <option value="Web Development">Web Development</option>
                            <option value="Video Production & Editing">Video Production & Editing</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Branding">Branding & Identity</option>
                            <option value="Data & Analytics">Data & Analytics</option>
                            <option value="Operations">Operations & Automation</option>
                            <option value="Full-Suite Digital Transformation">Full-Suite Digital Transformation</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 3: Budget Range & Timeline */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Target Budget Range
                          </label>
                          <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/20 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-colors min-h-[44px]"
                          >
                            <option value="₹25,000 - ₹50,000 (Starter Tier)">₹25,000 - ₹50,000 (Starter Tier)</option>
                            <option value="₹50,000 - ₹1,00,000 (Growth Tier)">₹50,000 - ₹1,00,000 (Growth Tier)</option>
                            <option value="₹1,00,000+ (Custom / Enterprise)">₹1,00,000+ (Custom / Enterprise)</option>
                            <option value="Custom Scoped">Custom Scoped / Not Sure</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Estimated Launch Timeline
                          </label>
                          <select
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/20 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-colors min-h-[44px]"
                          >
                            <option value="2-3 weeks (Urgent)">2–3 weeks (Urgent)</option>
                            <option value="3-5 weeks (Standard)">3–5 weeks (Standard)</option>
                            <option value="6+ weeks (Comprehensive)">6+ weeks (Comprehensive)</option>
                          </select>
                        </div>
                      </div>

                      {/* Project Description */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Project Description *
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us about what you are building, your primary objectives, target audience, and any reference sites you love..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-white text-sm focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 outline-none transition-colors resize-none"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        id="contact-submit-btn"
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-purple-900/50 hover:shadow-fuchsia-600/60 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 min-h-[48px]"
                      >
                        {loading ? (
                          <span>RECORDING TO DATABASE...</span>
                        ) : (
                          <>
                            <span>SEND PROJECT REQUEST</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="pt-2 text-center text-[11px] text-purple-300/70 flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Protected by SSL. Your ideas and intellectual property remain 100% confidential.</span>
                      </div>

                      {/* Alternate Instant Route: Chat on WhatsApp */}
                      <div className="mt-4 pt-4 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <span className="text-slate-400">Prefer direct instant messaging?</span>
                        <a
                          href="https://wa.me/918377056503"
                          target="_blank"
                          rel="noopener noreferrer"
                          id="form-whatsapp-chat-link"
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-900/60 hover:border-emerald-400 transition-all font-semibold"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          <span>Chat on WhatsApp</span>
                          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                        </a>
                      </div>

                    </form>
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
