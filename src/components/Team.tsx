import React from 'react';
import { Linkedin, Sparkles, Shield, ArrowUpRight } from 'lucide-react';
import { teamMembersData } from '../data/agencyData';
import type { TeamMember } from '../types';

export const Team: React.FC = () => {
  const founder = teamMembersData.find((member) => member.isFounder);
  const specialists = teamMembersData.filter((member) => !member.isFounder);

  return (
    <section id="team" className="relative py-24 sm:py-28 z-20">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-950/20 blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            OUR TEAM
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Meet the Team Behind the Work.
          </h2>
          <p className="text-slate-300/85 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-1">
            Different skills. One vision. Our team brings together technology, creativity, data and design to build meaningful digital experiences and business solutions.
          </p>
        </div>

        {/* 1. Featured Founder & CEO Card (Top Spotlight on Desktop, Responsive on All Screens) */}
        {founder && (
          <div className="mb-8 lg:mb-10">
            <div 
              id={`team-card-${founder.id}`}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-r from-purple-500/35 via-fuchsia-500/25 to-indigo-500/20 hover:from-fuchsia-500/50 hover:via-purple-500/35 hover:to-indigo-500/30 transition-all duration-300 shadow-2xl shadow-purple-950/30"
            >
              <div className="rounded-[23px] bg-[#0c0822]/90 backdrop-blur-xl border border-purple-500/25 p-7 sm:p-9 lg:p-10 transition-all duration-300 group-hover:bg-[#0e0926]/95 group-hover:border-purple-400/40">
                
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
                  
                  {/* Left Column: Role Badge, Name, and Bio */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      {/* Founder & CEO Distinction Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-900/60 to-fuchsia-900/40 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-wider uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                        <span>{founder.role}</span>
                      </div>

                      {/* Optional LinkedIn / Social */}
                      {founder.linkedin && (
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          id="founder-linkedin-btn"
                          className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:text-white hover:border-fuchsia-400 hover:bg-purple-900/50 transition-all"
                          title={`Connect with ${founder.name} on LinkedIn`}
                          aria-label={`Connect with ${founder.name} on LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* Prominent Name */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-fuchsia-200 transition-colors">
                      {founder.name}
                    </h3>

                    {/* Bio */}
                    <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
                      {founder.bio}
                    </p>
                  </div>

                  {/* Right Column: Core Skills */}
                  <div className="lg:w-80 shrink-0 pt-2 lg:pt-0 lg:border-l lg:border-purple-500/20 lg:pl-8">
                    <div className="text-[11px] uppercase font-bold tracking-wider text-purple-400/80 mb-3">
                      Core Skills:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {founder.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-purple-950/80 text-purple-200 border border-purple-500/25 group-hover:border-purple-400/35 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* 2. Remaining Team Members Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {specialists.map((member) => (
            <div
              key={member.id}
              id={`team-card-${member.id}`}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/20 via-purple-500/10 to-transparent hover:from-fuchsia-500/40 hover:via-purple-500/25 hover:to-indigo-500/20 transition-all duration-300 shadow-xl shadow-purple-950/30 flex flex-col"
            >
              <div className="h-full rounded-[23px] bg-[#0c0822]/85 backdrop-blur-xl border border-purple-500/20 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-purple-500/35 group-hover:bg-[#0e0926]/90">
                
                {/* Top: Role Label, Social, Name, Bio */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {member.role.toLowerCase().includes('co-founder') ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-fuchsia-200 uppercase px-3 py-1 rounded-full bg-gradient-to-r from-purple-900/80 to-fuchsia-900/60 border border-fuchsia-400/40 shadow-sm shadow-fuchsia-950/40">
                        <Sparkles className="w-3 h-3 text-fuchsia-400" />
                        <span>{member.role}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold tracking-wider text-purple-300/90 uppercase px-2.5 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/20">
                        {member.role}
                      </span>
                    )}

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-300 hover:text-white hover:border-purple-400 transition-colors"
                        title={`Connect with ${member.name} on LinkedIn`}
                        aria-label={`Connect with ${member.name} on LinkedIn`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Member Name */}
                  <h3 className={`text-lg sm:text-xl font-bold text-white group-hover:text-fuchsia-200 transition-colors tracking-wide ${member.specialty ? 'mb-1' : 'mb-3'}`}>
                    {member.name}
                    {member.id === 'isha' && (
                      <span className="text-purple-300/90 font-medium text-sm sm:text-base"> — {member.role}</span>
                    )}
                  </h3>

                  {/* Specialty Sub-headline */}
                  {member.specialty && (
                    <p className="text-xs font-semibold text-fuchsia-300/90 mb-3 tracking-wide">
                      {member.specialty}
                    </p>
                  )}

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-normal">
                    {member.bio}
                  </p>
                </div>

                {/* Bottom: Core Skills Pills */}
                <div className="pt-5 mt-6 border-t border-purple-500/15">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-purple-400/80 mb-2.5">
                    Core Skills:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-purple-950/70 text-purple-200/90 border border-purple-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
