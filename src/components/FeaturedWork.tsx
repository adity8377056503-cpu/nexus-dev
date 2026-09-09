import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Code2, 
  Palette, 
  Video, 
  BrainCircuit, 
  BarChart3, 
  Workflow 
} from 'lucide-react';
import type { Project } from '../types';
import { featuredProjects } from '../data/agencyData';

interface FeaturedWorkProps {
  onSelectProject: (project: Project) => void;
  onViewAllProjects?: () => void;
}

const filterOptions = [
  'All',
  'Web',
  'Branding',
  'Design',
  'Video',
  'Data',
  'AI',
  'Operations'
] as const;

type FilterType = typeof filterOptions[number];

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ 
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  // Filter projects based on active filter
  const filteredProjects = featuredProjects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (project.filterTags?.includes(activeFilter)) return true;
    
    if (activeFilter === 'Web') {
      return project.services.includes('Web Development') || project.category?.includes('Web');
    }
    if (activeFilter === 'Branding') {
      return project.services.includes('Branding') || project.category?.includes('Branding');
    }
    if (activeFilter === 'Design') {
      return (
        project.services.includes('Graphic Design') || 
        project.services.includes('Photo Editing') ||
        project.category?.includes('Design')
      );
    }
    if (activeFilter === 'Video') {
      return project.services.includes('Video Production') || project.category?.includes('Video');
    }
    if (activeFilter === 'Data') {
      return (
        project.services.includes('Data Analytics') || 
        project.services.includes('Data') ||
        project.category?.includes('Data')
      );
    }
    if (activeFilter === 'AI') {
      return (
        project.services.includes('Generative AI') || 
        project.category?.includes('AI') || 
        project.name.includes('AI')
      );
    }
    if (activeFilter === 'Operations') {
      return (
        project.services.includes('Operations') || 
        project.services.includes('Automation') ||
        project.category?.includes('Operations')
      );
    }
    return true;
  });

  return (
    <section id="work" className="relative py-24 sm:py-28 z-20">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-950/25 blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-fuchsia-950/20 blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            SELECTED WORK / CASE STUDIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Work That Speaks for Itself.
          </h2>
          <p className="text-slate-300/85 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-1">
            Explore how we combine technology, creativity, data and strategy to create meaningful digital experiences and business solutions.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-center mb-14 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#0d0924]/80 border border-purple-500/20 backdrop-blur-xl shadow-lg shadow-purple-950/20">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  id={`work-filter-${filter.toLowerCase()}`}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-fuchsia-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-purple-900/30'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Premium Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/20 via-purple-500/10 to-transparent hover:from-fuchsia-500/40 hover:via-purple-500/25 hover:to-indigo-500/20 transition-all duration-300 shadow-xl shadow-purple-950/30 flex flex-col"
              >
                <div className="h-full rounded-[23px] bg-[#0c0822]/85 backdrop-blur-xl border border-purple-500/20 overflow-hidden flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-purple-500/40 group-hover:bg-[#0e0926]/90">
                  
                  {/* Top Content: Visual preview & header */}
                  <div>
                    {/* Project Visual Preview Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#090518] border-b border-purple-500/20">
                      
                      {/* Browser Mockup Top Bar */}
                      <div className="absolute top-0 left-0 right-0 z-10 px-3.5 py-2 bg-[#0a061c]/90 backdrop-blur-md border-b border-purple-500/15 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500/70"></span>
                          <span className="w-2 h-2 rounded-full bg-amber-500/70"></span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500/70"></span>
                        </div>
                        <div className="px-2.5 py-0.5 rounded bg-purple-950/70 border border-purple-500/20 text-[10px] font-mono text-purple-300/80 truncate max-w-[170px]">
                          nexusdevs.io/{project.id}
                        </div>
                        <ExternalLink className="w-3 h-3 text-purple-400/60" />
                      </div>

                      {/* Main Image Preview */}
                      <div className="w-full h-full pt-7 overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={project.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0822] via-transparent to-transparent opacity-60"></div>
                      </div>

                      {/* Floating Number Badge */}
                      <div className="absolute bottom-3 left-3.5 px-2.5 py-1 rounded-lg bg-[#0c0822]/90 border border-purple-500/30 text-xs font-mono font-bold text-purple-300 shadow-md">
                        {project.number}
                      </div>
                    </div>

                    {/* Meta & Descriptions */}
                    <div className="p-6 sm:p-7 space-y-3">
                      {/* Category Label */}
                      <div className="text-xs font-semibold text-fuchsia-400/90 tracking-wide">
                        {project.category}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-200 transition-colors tracking-tight">
                        {project.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-normal">
                        {project.description}
                      </p>

                      {/* Services Involved Pills */}
                      <div className="pt-2">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-purple-400/80 mb-2">
                          Services Involved:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.services.map((service) => (
                            <span
                              key={service}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-950/70 text-purple-200 border border-purple-500/25"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action: "View Project →" CTA */}
                  <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-purple-500/15 flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-purple-300 group-hover:text-fuchsia-200 transition-colors flex items-center gap-1.5">
                      View Project <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-fuchsia-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty filter fallback */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-[#0c0822]/50 rounded-3xl border border-purple-500/20">
            <p className="text-slate-400 text-sm">No case studies found for this category filter.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 px-4 py-2 rounded-full bg-purple-950 text-purple-300 text-xs font-semibold hover:text-white border border-purple-500/30"
            >
              Reset to All Projects
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
