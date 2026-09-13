import React, { useState } from 'react';
import { 
  Compass, 
  FileText, 
  Palette, 
  Code2, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { processSteps } from '../data/agencyData';

export const Process: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = processSteps[activeStepIndex];

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return Compass;
      case 1: return FileText;
      case 2: return Palette;
      case 3: return Code2;
      case 4: return Rocket;
      default: return Compass;
    }
  };

  return (
    <section id="process" className="relative py-24 z-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-purple-900/15 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            OUR PROCESS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            From idea<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
              to digital experience.
            </span>
          </h2>
          <p className="text-slate-300/80 text-sm sm:text-base max-w-xl mx-auto">
            A battle-tested 5-phase methodology that eliminates surprises, keeps communication crystal clear, and ensures high velocity.
          </p>
        </div>

        {/* Horizontal Futuristic Timeline Progress Bar */}
        <div className="relative mb-12">
          {/* Glowing Background Connecting Line */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-gradient-to-r from-purple-900 via-purple-500/40 to-indigo-900 z-0"></div>
          
          {/* Active Fill Line */}
          <div 
            className="hidden lg:block absolute top-7 left-12 h-[2px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-all duration-500 z-0 shadow-lg shadow-fuchsia-500/50"
            style={{ width: `${(activeStepIndex / (processSteps.length - 1)) * 82}%` }}
          ></div>

          {/* 5 Step Indicator Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 relative z-10">
            {processSteps.map((step, idx) => {
              const Icon = getStepIcon(idx);
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`group text-left p-3 sm:p-4 rounded-2xl border transition-all duration-300 min-h-[44px] ${
                    isActive 
                      ? 'bg-[#150d36] border-fuchsia-400/80 shadow-lg shadow-fuchsia-950/50 scale-102' 
                      : 'bg-[#0c0822]/70 border-purple-500/20 hover:border-purple-500/40 hover:bg-[#120a30]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-md shadow-pink-500/40' 
                        : isPast 
                          ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                          : 'bg-purple-950/40 text-purple-400/60 border border-purple-500/15'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-fuchsia-400' : 'text-purple-400/60'}`}>
                      {step.number}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-white mb-0.5 tracking-wide">
                    {step.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-purple-300/70 line-clamp-1">
                    {step.tagline}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="rounded-3xl p-[1px] bg-gradient-to-r from-purple-500/30 via-fuchsia-500/30 to-indigo-500/20">
          <div className="rounded-[23px] bg-[#0c0822]/95 backdrop-blur-2xl border border-purple-500/20 p-5 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1 rounded-full bg-fuchsia-950/80 border border-fuchsia-500/40 text-xs font-mono text-fuchsia-300 font-bold">
                    PHASE {activeStep.number} — {activeStep.timeline}
                  </span>
                  <span className="text-xs text-purple-300/80 font-mono">
                    Structured Milestone
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                  {activeStep.title}:{' '}
                  <span className="text-purple-300 font-normal">
                    {activeStep.tagline}
                  </span>
                </h3>

                <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                  {activeStep.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">
                    Deliverables you receive:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                    {activeStep.deliverables.map((del) => (
                      <div key={del} className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/15 text-xs text-slate-200 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Phase Quick Navigation */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end p-5 sm:p-6 rounded-2xl bg-purple-950/20 border border-purple-500/15">
                <span className="text-xs text-purple-300/70 font-mono mb-2">Next Milestone</span>
                <div className="text-base sm:text-lg font-bold text-white mb-4 text-center lg:text-right">
                  {activeStepIndex < processSteps.length - 1 ? (
                    <>Phase 0{activeStepIndex + 2}: {processSteps[activeStepIndex + 1].title}</>
                  ) : (
                    <>Final Production Delivery Completed</>
                  )}
                </div>

                {activeStepIndex < processSteps.length - 1 ? (
                  <button
                    onClick={() => setActiveStepIndex((prev) => Math.min(processSteps.length - 1, prev + 1))}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold tracking-wider hover:opacity-95 shadow-md shadow-purple-950/50 min-h-[44px]"
                  >
                    <span>EXPLORE NEXT PHASE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveStepIndex(0)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-purple-950 border border-purple-500/40 text-purple-200 text-xs font-bold tracking-wider hover:text-white min-h-[44px]"
                  >
                    <span>REVIEW FROM START</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
