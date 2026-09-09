import React from 'react';
import { 
  TrendingUp, 
  Zap, 
  Layers, 
  MessageSquare, 
  Gauge, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { benefitsData } from '../data/agencyData';

export const WhyUs: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return TrendingUp;
      case 'Zap': return Zap;
      case 'Layers': return Layers;
      case 'MessageSquare': return MessageSquare;
      case 'Gauge': return Gauge;
      case 'ShieldCheck': return ShieldCheck;
      default: return Sparkles;
    }
  };

  return (
    <section className="relative py-24 z-20 overflow-hidden">
      {/* Subtle atmospheric glow behind why us */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-fuchsia-900/10 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center sm:text-left mb-16 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            WHY NEXUS DEVS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Small team.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
              Big digital ambition.
            </span>
          </h2>
          <p className="text-slate-300/85 text-sm sm:text-base leading-relaxed">
            We operate as your dedicated design and technology partners. No junior handoffs, no bloated overhead—just seasoned digital craft focused on your commercial growth.
          </p>
        </div>

        {/* Visually interesting asymmetric layout (Bento grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Business-focused thinking (Col 7 wide) */}
          <div className="md:col-span-7 rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/30 to-transparent">
            <div className="h-full rounded-[23px] bg-[#0c0822]/90 backdrop-blur-xl border border-purple-500/20 p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-purple-950 border border-purple-500/30 text-[10px] font-mono uppercase tracking-wider text-purple-300">
                    {benefitsData[0].tag}
                  </span>
                  <TrendingUp className="w-5 h-5 text-fuchsia-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {benefitsData[0].title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {benefitsData[0].description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-purple-500/15 flex flex-wrap gap-4 text-xs text-purple-300/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Conversion Architecture
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Target Audience Resonance
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Modern Technology (Col 5 wide) */}
          <div className="md:col-span-5 rounded-3xl p-[1px] bg-gradient-to-bl from-fuchsia-500/30 to-transparent">
            <div className="h-full rounded-[23px] bg-[#0c0822]/90 backdrop-blur-xl border border-purple-500/20 p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-purple-950 border border-purple-500/30 text-[10px] font-mono uppercase tracking-wider text-fuchsia-300">
                    {benefitsData[1].tag}
                  </span>
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {benefitsData[1].title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {benefitsData[1].description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-purple-500/15 flex items-center gap-2">
                <span className="text-xs font-mono text-purple-300/90 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-500/20">
                  React 19 • TS • Edge Nodes
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Premium design (Col 4 wide) */}
          <div className="md:col-span-4 rounded-3xl p-[1px] bg-gradient-to-t from-purple-500/25 to-transparent">
            <div className="h-full rounded-[23px] bg-[#0c0822]/90 backdrop-blur-xl border border-purple-500/20 p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-purple-950 border border-purple-500/30 text-[10px] font-mono uppercase tracking-wider text-purple-300">
                    {benefitsData[2].tag}
                  </span>
                  <Layers className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {benefitsData[2].title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {benefitsData[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Fast communication (Col 4 wide) */}
          <div className="md:col-span-4 rounded-3xl p-[1px] bg-gradient-to-t from-fuchsia-500/25 to-transparent">
            <div className="h-full rounded-[23px] bg-[#0c0822]/90 backdrop-blur-xl border border-purple-500/20 p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-purple-950 border border-purple-500/30 text-[10px] font-mono uppercase tracking-wider text-pink-300">
                    {benefitsData[3].tag}
                  </span>
                  <MessageSquare className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {benefitsData[3].title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {benefitsData[3].description}
                </p>
              </div>
            </div>
          </div>

          {/* Card 5: Performance-first development & Long-term support (Col 4 wide) */}
          <div className="md:col-span-4 rounded-3xl p-[1px] bg-gradient-to-t from-indigo-500/25 to-transparent">
            <div className="h-full rounded-[23px] bg-[#0c0822]/90 backdrop-blur-xl border border-purple-500/20 p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-purple-950 border border-purple-500/30 text-[10px] font-mono uppercase tracking-wider text-indigo-300">
                    {benefitsData[4].tag}
                  </span>
                  <Gauge className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {benefitsData[4].title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {benefitsData[4].description}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
