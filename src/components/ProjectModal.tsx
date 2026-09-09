import React from 'react';
import { X, ArrowUpRight, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import type { Project } from '../types';
import { featuredProjects } from '../data/agencyData';

interface ProjectModalProps {
  project: Project | null;
  showAllGallery?: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onStartProjectLikeThis: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  showAllGallery,
  onClose,
  onSelectProject,
  onStartProjectLikeThis,
}) => {
  if (!project && !showAllGallery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl p-[1px] bg-gradient-to-b from-fuchsia-500/50 via-purple-500/30 to-indigo-500/20 my-8">
        <div className="rounded-[23px] bg-[#0c0822] border border-purple-500/30 p-6 sm:p-10 backdrop-blur-2xl max-h-[90vh] overflow-y-auto">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">
                {showAllGallery ? 'ALL PORTFOLIO ARCHIVES' : `CASE STUDY: ${project?.name}`}
              </span>
            </div>
            <button
              onClick={onClose}
              id="project-modal-close-btn"
              className="p-2 rounded-full bg-purple-950/80 text-purple-300 hover:text-white border border-purple-500/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* VIEW ALL GALLERY MODE */}
          {showAllGallery ? (
            <div className="space-y-6">
              <div className="text-left space-y-1">
                <h3 className="text-2xl font-extrabold text-white">
                  Curated Agency Works & Platforms
                </h3>
                <p className="text-xs text-slate-400">
                  Select any engagement to inspect the architecture, metrics, and deliverable specifications.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProject(p)}
                    className="group cursor-pointer rounded-2xl p-4 bg-purple-950/30 border border-purple-500/20 hover:border-fuchsia-400/60 hover:bg-purple-900/30 transition-all"
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-[#080516]">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-1">
                      <span>{p.number}</span>
                      <span>{p.category || p.industry}</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : project ? (
            /* SINGLE PROJECT DEEP DIVE */
            <div className="space-y-8">
              {/* Top Banner Mockup */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 aspect-[16/9] bg-[#070414]">
                <img
                  src={project.image}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0822] via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-fuchsia-400 font-bold block mb-1">
                      {project.number} — {project.category || project.industry}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                      {project.name}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-xs font-mono text-purple-200">
                    {project.metrics}
                  </div>
                </div>
              </div>

              {/* Description & Services */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 font-mono">
                    Project Overview & Strategy
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {project.highlights && project.highlights.length > 0 && (
                    <div className="pt-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono mb-3">
                        Core Innovations Delivered:
                      </h4>
                      <ul className="space-y-2.5">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="md:col-span-4 space-y-4 p-5 rounded-2xl bg-purple-950/30 border border-purple-500/20">
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold block">
                    Scope of Work
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.services?.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg text-xs bg-purple-900/40 text-purple-200 border border-purple-500/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-purple-500/15">
                    <button
                      onClick={() => {
                        onClose();
                        onStartProjectLikeThis(project.name);
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold tracking-wider hover:opacity-95 shadow-lg shadow-purple-950/60"
                    >
                      BUILD A SIMILAR PLATFORM →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
};
