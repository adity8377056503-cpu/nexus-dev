import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Code2, 
  Layers, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  Play, 
  ExternalLink 
} from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onViewWork }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 sm:pt-36 pb-20 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Ambient Lighting & Grids */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40"></div>
      
      {/* Atmospheric Neon Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-to-tr from-purple-800/25 via-fuchsia-700/15 to-indigo-900/10 blur-[130px] pointer-events-none animate-atmospheric"></div>
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] rounded-full bg-pink-600/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] rounded-full bg-purple-900/15 blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Eyebrow Tag */}
        <div className="flex items-center justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 absolute"></span>
            <span className="ml-1">CREATIVE DIGITAL AGENCY</span>
          </div>
        </div>

        {/* Main Grid: Headline Left / Futuristic Tech Composition Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold tracking-tight text-white leading-[1.08]">
              WE BUILD{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
                  DIGITAL EXPERIENCES
                </span>
                <span className="absolute -inset-1 rounded-lg bg-purple-500/15 blur-lg -z-0"></span>
              </span>{' '}
              THAT MOVE BUSINESSES FORWARD.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed text-slate-300/90">
              Nexus Devs helps ambitious businesses turn ideas into fast, beautiful and high-converting digital experiences.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onStartProject}
                id="hero-primary-cta"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-purple-900/40 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onViewWork}
                id="hero-secondary-cta"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/25 hover:border-purple-400 text-purple-200 font-semibold text-sm tracking-wider flex items-center justify-center gap-2 backdrop-blur-md transition-all duration-300 hover:text-white"
              >
                <span>VIEW OUR WORK</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>

            {/* Availability Indicator & Micro-Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block ring-4 ring-emerald-500/20 animate-pulse"></span>
                <span className="font-medium text-slate-300">Available for Q2 & Q3 Projects</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-purple-300/80">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Zero Legacy Tech</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-purple-300/80">
                <CheckCircle2 className="w-4 h-4 text-fuchsia-400" />
                <span>100% Custom Crafted</span>
              </div>
            </div>
          </div>

          {/* Right Column: Original Futuristic Technology Composition */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            {/* The Central Visual Container */}
            <div className="relative mx-auto max-w-[500px] lg:max-w-none">
              
              {/* Outer Glowing Atmospheric Frame */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-purple-500/30 via-fuchsia-500/10 to-transparent shadow-2xl shadow-purple-950/60">
                
                {/* Main Glass Deck */}
                <div className="rounded-[22px] bg-[#0c0822]/90 border border-purple-500/20 p-4 sm:p-6 backdrop-blur-2xl overflow-hidden relative">
                  
                  {/* Subtle Top Specular Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300/40 to-transparent"></div>

                  {/* Window Controls & Toggle */}
                  <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                      <span className="ml-2 text-[11px] font-mono text-purple-300/70 font-semibold tracking-wide">
                        nexus-engine.core
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-purple-950/60 p-1 rounded-xl border border-purple-500/20">
                      <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                          activeTab === 'preview'
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-purple-300/70 hover:text-white'
                        }`}
                      >
                        Interactive UI
                      </button>
                      <button
                        onClick={() => setActiveTab('code')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                          activeTab === 'code'
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-purple-300/70 hover:text-white'
                        }`}
                      >
                        Architecture
                      </button>
                    </div>
                  </div>

                  {/* Composition Body */}
                  <div className="py-5">
                    {activeTab === 'preview' ? (
                      <div className="space-y-4">
                        {/* 3D Holographic Core Simulation */}
                        <div className="relative h-52 rounded-2xl bg-gradient-to-br from-[#120b33] via-[#0b0720] to-[#150b38] border border-purple-500/20 overflow-hidden flex items-center justify-center p-4">
                          {/* Radial Grid Floor */}
                          <div className="absolute inset-0 cyber-dots opacity-40"></div>
                          
                          {/* Central Glowing Energy Sphere / Polyhedron */}
                          <div className="relative flex items-center justify-center">
                            {/* Outer Rings */}
                            <div className="absolute w-36 h-36 rounded-full border border-purple-500/30 border-dashed animate-spin" style={{ animationDuration: '24s' }}></div>
                            <div className="absolute w-28 h-28 rounded-full border border-fuchsia-400/40 animate-spin" style={{ animationDuration: '14s', animationDirection: 'reverse' }}></div>
                            
                            {/* Glowing Sphere Core */}
                            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-400 p-[2px] shadow-2xl shadow-fuchsia-500/50">
                              <div className="w-full h-full rounded-full bg-[#0a0520] flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent"></div>
                                <Cpu className="w-8 h-8 text-fuchsia-300 animate-pulse" />
                              </div>
                            </div>

                            {/* Orbiting Satellite Data Nodes */}
                            <div className="absolute -top-3 -right-2 px-2 py-0.5 rounded-full bg-purple-900/80 border border-purple-400/40 text-[9px] font-mono text-purple-200">
                              99.8% LATENCY
                            </div>
                            <div className="absolute -bottom-3 -left-2 px-2 py-0.5 rounded-full bg-fuchsia-900/80 border border-fuchsia-400/40 text-[9px] font-mono text-fuchsia-200">
                              REACT 19 CORE
                            </div>
                          </div>

                          {/* Overlay Gradient */}
                          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-purple-400/60">
                            Nexus Spatial Engine
                          </div>
                        </div>

                        {/* Interactive UI Mockup Bar */}
                        <div className="grid grid-cols-3 gap-2.5">
                          <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/15">
                            <span className="text-[10px] text-purple-300/70 block uppercase">Conversion</span>
                            <span className="text-sm font-bold text-white">+240%</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/15">
                            <span className="text-[10px] text-purple-300/70 block uppercase">Speed Index</span>
                            <span className="text-sm font-bold text-emerald-300">0.38s</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/15">
                            <span className="text-[10px] text-purple-300/70 block uppercase">SEO Score</span>
                            <span className="text-sm font-bold text-fuchsia-300">100/100</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Architecture Code Snippet */
                      <div className="h-64 rounded-2xl bg-[#080518] p-4 font-mono text-[11px] text-purple-200/90 leading-relaxed border border-purple-500/15 overflow-x-auto">
                        <div className="text-purple-400/50">// Nexus Devs Production Stack</div>
                        <div className="mt-1">
                          <span className="text-fuchsia-400">const</span>{' '}
                          <span className="text-purple-300">experience</span> ={' '}
                          <span className="text-indigo-400">new</span>{' '}
                          <span className="text-yellow-300">DigitalProduct</span>&#123;
                        </div>
                        <div className="pl-4">
                          framework: <span className="text-emerald-300">'Next.js + React 19'</span>,
                        </div>
                        <div className="pl-4">
                          styling: <span className="text-emerald-300">'Tailwind 4 + Micro-Glow'</span>,
                        </div>
                        <div className="pl-4">
                          motion: <span className="text-emerald-300">'Spatial Layout Choreo'</span>,
                        </div>
                        <div className="pl-4">
                          database: <span className="text-emerald-300">'Cloud Firestore Active'</span>,
                        </div>
                        <div className="pl-4">
                          targetMetric: <span className="text-amber-300">'Maximum Conversion'</span>
                        </div>
                        <div>&#125;;</div>
                        <div className="mt-2 text-purple-400/80">
                          await experience.<span className="text-fuchsia-400">deployToProduction</span>();
                        </div>
                        <div className="mt-2 text-emerald-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>Status: Online & Optimized across 38 global edge nodes.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Info */}
                  <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between text-[11px] text-purple-300/70">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-fuchsia-400" />
                      Dynamic Render Active
                    </span>
                    <span className="font-mono text-purple-400">v3.4.0-stable</span>
                  </div>
                </div>
              </div>

              {/* Small Floating Card 1 (Top Right): "BUILDING DIGITAL PRODUCTS" */}
              <div className="absolute -top-6 -right-2 sm:-right-6 p-3.5 rounded-2xl bg-[#140c30]/90 border border-fuchsia-500/30 backdrop-blur-xl shadow-xl shadow-purple-950/60 animate-float hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-pink-500/30">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-fuchsia-300 tracking-wider uppercase block">
                      BUILDING
                    </span>
                    <span className="text-xs font-extrabold text-white">
                      DIGITAL PRODUCTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Small Floating Card 2 (Bottom Left): "DESIGN • DEVELOP • LAUNCH" */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 p-3.5 rounded-2xl bg-[#140c30]/90 border border-purple-500/30 backdrop-blur-xl shadow-xl shadow-purple-950/60 animate-float-reverse hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <Sparkles className="w-4 h-4 text-fuchsia-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-slate-100">
                      <span>DESIGN</span>
                      <span className="text-purple-400">•</span>
                      <span>DEVELOP</span>
                      <span className="text-fuchsia-400">•</span>
                      <span>LAUNCH</span>
                    </div>
                    <span className="text-[10px] text-purple-300/70 font-mono">
                      End-to-end craft
                    </span>
                  </div>
                </div>
              </div>

              {/* Focus Areas Card (Right side accent) */}
              <div className="absolute top-1/2 -right-10 translate-y-2 p-3 rounded-2xl bg-[#0f0928]/85 border border-purple-500/25 backdrop-blur-xl shadow-lg hidden xl:block">
                <span className="text-[9px] font-bold tracking-widest text-purple-400/80 uppercase block mb-1">
                  FOCUS AREAS
                </span>
                <ul className="text-[10px] space-y-1 text-slate-300 font-medium">
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-fuchsia-400 rounded-full"></span> User Research
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span> Design Systems
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-indigo-400 rounded-full"></span> WebGL & Prototyping
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
