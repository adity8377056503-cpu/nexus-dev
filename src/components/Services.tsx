import React, { useState } from 'react';
import { 
  Code2, 
  Video, 
  Palette, 
  Sparkles, 
  BarChart3, 
  Workflow, 
  ArrowRight, 
  Check, 
  X 
} from 'lucide-react';
import type { Service } from '../types';
import { servicesData } from '../data/agencyData';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const [activeServiceModal, setActiveServiceModal] = useState<Service | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
      case 'Code': 
        return Code2;
      case 'Video': 
        return Video;
      case 'Palette': 
        return Palette;
      case 'Sparkles': 
        return Sparkles;
      case 'BarChart3': 
        return BarChart3;
      case 'Workflow': 
        return Workflow;
      default: 
        return Sparkles;
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-28 z-20">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-purple-950/25 blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            OUR SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Everything You Need<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
              to Build, Grow & Scale.
            </span>
          </h2>
          <p className="text-slate-300/85 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-1">
            From digital experiences and creative content to branding, data and operations, we bring the expertise needed to turn ideas into meaningful business outcomes.
          </p>
        </div>

        {/* 6 Premium Service Cards Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {servicesData.map((service) => {
            const Icon = getIcon(service.iconName);

            return (
              <div
                key={service.number}
                id={`service-card-${service.number}`}
                onClick={() => setActiveServiceModal(service)}
                className="group cursor-pointer relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/20 via-purple-500/10 to-transparent hover:from-fuchsia-500/40 hover:via-purple-500/25 hover:to-indigo-500/20 transition-all duration-300 shadow-xl shadow-purple-950/30 flex flex-col"
              >
                <div className="h-full rounded-[23px] bg-[#0c0822]/85 backdrop-blur-xl border border-purple-500/20 p-6 sm:p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-purple-500/35 group-hover:bg-[#0e0926]/90">
                  
                  {/* Top Content Block */}
                  <div>
                    {/* Top Row: Minimal modern icon & Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:text-fuchsia-300 group-hover:border-fuchsia-400/50 group-hover:bg-purple-900/40 group-hover:scale-105 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-purple-400/70 px-2.5 py-1 rounded-lg bg-purple-950/50 border border-purple-500/20">
                        {service.number}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-fuchsia-200 transition-colors mb-2.5 tracking-wide">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-normal">
                      {service.shortDesc}
                    </p>

                    {/* Small list of services/features */}
                    <div className="mt-5 pt-4 border-t border-purple-500/15">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-purple-400/80 mb-2.5">
                        Included capabilities:
                      </p>
                      <ul className="space-y-2">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/80 group-hover:bg-fuchsia-400 shrink-0 transition-colors"></span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action: "Explore Service →" with smooth hover interaction */}
                  <div className="pt-5 mt-6 border-t border-purple-500/15 flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-300 group-hover:text-fuchsia-200 transition-colors flex items-center gap-1.5">
                      Explore Service
                    </span>
                    <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:bg-fuchsia-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Service Detail Modal */}
      {activeServiceModal && (
        <div 
          id="service-detail-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveServiceModal(null)}
        >
          <div 
            id="service-detail-modal"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-3xl p-[1px] bg-gradient-to-b from-fuchsia-500/50 via-purple-500/30 to-transparent shadow-2xl"
          >
            <div className="rounded-[23px] bg-[#0d0926] border border-purple-500/30 p-6 sm:p-8 backdrop-blur-2xl">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-500/20">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-fuchsia-400 font-bold px-2 py-0.5 rounded bg-fuchsia-950/60 border border-fuchsia-500/30">
                    {activeServiceModal.number}
                  </span>
                  <h3 className="text-white text-lg sm:text-xl font-bold">
                    {activeServiceModal.title}
                  </h3>
                </div>
                <button
                  id="close-service-modal-btn"
                  onClick={() => setActiveServiceModal(null)}
                  className="p-1.5 rounded-full bg-purple-950/60 text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed">
                  {activeServiceModal.fullDesc}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">
                    Key Features & Deliverables:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeServiceModal.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-slate-200 bg-purple-950/30 border border-purple-500/15 rounded-xl p-2.5">
                        <Check className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-purple-500/20 flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button
                  id="modal-cancel-btn"
                  type="button"
                  onClick={() => setActiveServiceModal(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white border border-transparent hover:border-purple-500/30 transition-colors"
                >
                  Close
                </button>
                <button
                  id="modal-request-service-btn"
                  type="button"
                  onClick={() => {
                    const title = activeServiceModal.title;
                    setActiveServiceModal(null);
                    onSelectServiceForInquiry(title);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold tracking-wider hover:opacity-95 hover:shadow-lg hover:shadow-fuchsia-500/25 transition-all flex items-center justify-center gap-1.5"
                >
                  REQUEST THIS SERVICE <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
