import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  Code2, 
  Compass, 
  Heart, 
  Zap, 
  Layers, 
  Globe2 
} from 'lucide-react';

export const About: React.FC = () => {
  const techStack = [
    { name: 'React 19', category: 'Frontend' },
    { name: 'Next.js', category: 'SSR / Edge' },
    { name: 'TypeScript', category: 'Type Safety' },
    { name: 'Tailwind CSS', category: 'Aesthetics' },
    { name: 'Figma', category: 'UI Systems' },
    { name: 'Firebase & Cloud', category: 'Databases' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'WebGL & Canvas', category: 'Spatial 3D' },
  ];

  return (
    <section id="about" className="relative py-24 z-20 overflow-hidden">
      {/* Glow elements */}
      <div className="absolute -top-10 left-1/4 w-96 h-96 bg-purple-900/15 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center sm:text-left mb-16 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            ABOUT NEXUS DEVS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We don't just build websites.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
              We build digital experiences.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed pt-2">
            Nexus Devs is a modern digital agency focused on helping startups, small businesses and ambitious brands create a stronger digital presence through strategy, design and development.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Team Ethos & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/30 via-purple-500/10 to-transparent">
              <div className="rounded-[23px] bg-[#0c0822]/90 backdrop-blur-xl border border-purple-500/20 p-7 sm:p-9 space-y-6">
                
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-fuchsia-400" />
                    <span>Our Studio Philosophy</span>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    We believe the internet has too many cookie-cutter templates that slow down browsers and bore visitors. We exist to restore craftsmanship, expressive typography, and razor-sharp performance to the modern web.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-purple-500/15">
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/15">
                    <span className="text-xs font-bold text-white block mb-1">Human Empathy</span>
                    <span className="text-[11px] text-slate-400">Designing around genuine visitor needs & emotions.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/15">
                    <span className="text-xs font-bold text-white block mb-1">Modern Velocity</span>
                    <span className="text-[11px] text-slate-400">Shipping production-grade code in weeks, not months.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/15">
                    <span className="text-xs font-bold text-white block mb-1">Pure Polish</span>
                    <span className="text-[11px] text-slate-400">Subtle light physics, fluid motion, and crisp rhythm.</span>
                  </div>
                </div>

                {/* Studio Location & Availability */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-purple-300/80">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-purple-400" />
                    <span>Remote-first studio working with clients globally</span>
                  </div>
                  <div className="font-mono text-purple-400">
                    EST. 2024 • BENGALURU / GLOBAL
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Technology Constellation & Stack Matrix */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-[1px] bg-gradient-to-bl from-fuchsia-500/30 via-purple-500/15 to-transparent">
              <div className="rounded-[23px] bg-[#0c0822]/90 backdrop-blur-xl border border-purple-500/20 p-6 sm:p-8">
                
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-bold tracking-widest text-fuchsia-400 uppercase font-mono">
                    TECHNOLOGY RADAR
                  </span>
                  <Terminal className="w-4 h-4 text-purple-400" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-3 rounded-xl bg-[#120a30]/60 border border-purple-500/20 hover:border-purple-400/50 hover:bg-[#180d40] transition-all"
                    >
                      <span className="text-[10px] font-mono text-purple-400/80 block uppercase">
                        {tech.category}
                      </span>
                      <span className="text-xs font-bold text-white mt-0.5 block">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Zero bloated site-builders or slow plugins. Clean, hand-crafted TypeScript and modern component architecture.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
