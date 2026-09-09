import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Maximize2, 
  X, 
  TrendingUp, 
  Zap, 
  Target 
} from 'lucide-react';

export const CaseStudy: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative py-24 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            FEATURED CASE STUDY
          </div>
          <span className="text-xs font-mono text-purple-400/80">
            01 / DEEP DIVE
          </span>
        </div>

        {/* Large Cinematic Case Study Container */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/30 via-fuchsia-500/20 to-purple-500/10 shadow-2xl shadow-purple-950/40">
          <div className="rounded-[23px] bg-[#0c0822]/95 backdrop-blur-2xl border border-purple-500/20 p-6 sm:p-10 lg:p-12 overflow-hidden">
            
            {/* Header: Title & Subtitle */}
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                FROM IDEA TO IMPACT:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
                  NEXORA DASHBOARD
                </span>
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                How Nexus Devs re-architected a legacy fintech backend into a lightning-fast spatial analytics engine that scaled from 1,000 to 80,000 active traders.
              </p>
            </div>

            {/* Large Browser Mockup */}
            <div className="relative rounded-2xl border border-purple-500/25 bg-[#090518] shadow-2xl overflow-hidden mb-10">
              {/* Browser Chrome Header */}
              <div className="px-4 py-3 bg-[#0f0928] border-b border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
                </div>
                <div className="px-4 py-1 rounded-md bg-purple-950/80 border border-purple-500/20 text-xs font-mono text-purple-300/80">
                  https://app.nexora.com/analytics/live
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="p-1 text-purple-300 hover:text-white"
                  title="Expand Case Study"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mockup Preview Visual */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#0c0822] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                  alt="Nexora Platform Mockup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center brightness-90"
                />
                
                {/* Floating Analytics Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0822] via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="p-3 rounded-xl bg-[#090518]/90 border border-purple-500/30 backdrop-blur-md">
                    <span className="text-[10px] font-mono text-purple-300 uppercase block">Monitored Volume</span>
                    <span className="text-base font-bold text-white">$4.8B+ / Quarterly</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#090518]/90 border border-purple-500/30 backdrop-blur-md">
                    <span className="text-[10px] font-mono text-fuchsia-300 uppercase block">Global Latency</span>
                    <span className="text-base font-bold text-emerald-400">42ms Edge</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Step Narrative Breakdown: Challenge, Solution, Design, Development, Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              
              <div className="p-5 rounded-2xl bg-purple-950/25 border border-purple-500/15">
                <div className="flex items-center gap-2 mb-2 text-rose-400">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">1. Challenge</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Slow 4.5s load times and bloated tabular UI caused 40% bounce rate among institutional traders evaluating the software.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-950/25 border border-purple-500/15">
                <div className="flex items-center gap-2 mb-2 text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">2. Solution</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rebuilt architecture using React 19 concurrent mode and custom high-density canvas charts with sub-second responsive layout.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-950/25 border border-purple-500/15">
                <div className="flex items-center gap-2 mb-2 text-fuchsia-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">3. Design</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered dark-mode glassmorphic design token system with zero cognitive clutter and instantaneous keyboard navigation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-950/25 border border-purple-500/15">
                <div className="flex items-center gap-2 mb-2 text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">4. Outcome</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Page load dropped to 0.4s. Customer conversion jumped +240%, securing their Series-A funding within 90 days.
                </p>
              </div>

            </div>

            {/* Bottom Metrics Bar & CTA */}
            <div className="pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6 text-xs text-purple-300/80">
                <div>
                  <span className="font-bold text-white text-sm">+240%</span> Conversion Rate
                </div>
                <div className="hidden sm:block text-purple-500">•</div>
                <div>
                  <span className="font-bold text-emerald-300 text-sm">0.42s</span> Load Time
                </div>
                <div className="hidden sm:block text-purple-500">•</div>
                <div>
                  <span className="font-bold text-fuchsia-300 text-sm">99.98%</span> Uptime
                </div>
                <span className="text-[10px] text-purple-400/60 font-mono">(Editable metrics)</span>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                id="case-study-cta-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold tracking-wider hover:opacity-95 shadow-lg shadow-purple-950/50"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Case Study Deep Dive Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl p-[1px] bg-gradient-to-b from-fuchsia-500/50 via-purple-500/30 to-transparent my-8">
            <div className="rounded-[23px] bg-[#0c0822] border border-purple-500/30 p-6 sm:p-10 backdrop-blur-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
                <div>
                  <span className="text-xs font-mono text-fuchsia-400 font-bold">CASE STUDY REPORT</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Nexora Business Intelligence</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full bg-purple-950/60 text-purple-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Nexus Devs was engaged by Nexora to overhaul their core B2B fintech application. The original solution struggled with massive latency spikes during market open, leading to executive churn and developer burn-out.
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 pt-2">
                  Technical Architecture Implemented:
                </h4>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Migrated to React 19 with optimistic state transitions and Web Workers for calculating financial risk matrices without blocking UI thread.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Integrated custom GPU-accelerated canvas chart renderer sustaining 60fps across 50,000 tick points.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Applied dark-mode OLED accessibility palette complying with strict financial compliance requirements.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-purple-500/20 flex justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-white text-xs font-bold"
                >
                  Close Case Study
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
