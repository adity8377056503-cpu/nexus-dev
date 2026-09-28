import React, { useState, useEffect } from 'react';
import { Settings2, Check, RefreshCw, Sparkles, TrendingUp, Users, Award, Clock } from 'lucide-react';
import type { AgencyStats } from '../types';
import { initialStats } from '../data/agencyData';
import { getAgencyStats, saveAgencyStats, checkIsAdmin } from '../lib/firebase';
import type { User } from 'firebase/auth';

interface StatsProps {
  user?: User | null;
}

export const Stats: React.FC<StatsProps> = ({ user }) => {
  const [stats, setStats] = useState<AgencyStats>(initialStats);
  const [isEditing, setIsEditing] = useState(false);
  const [tempStats, setTempStats] = useState<AgencyStats>(initialStats);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const hasAdminAccess = checkIsAdmin(user || null);

  useEffect(() => {
    if (!hasAdminAccess && isEditing) {
      setIsEditing(false);
    }
  }, [hasAdminAccess, isEditing]);

  useEffect(() => {
    const loadStats = async () => {
      const remote = await getAgencyStats();
      if (remote) {
        setStats(remote);
        setTempStats(remote);
      }
    };
    loadStats();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAdminAccess) return;
    setStats(tempStats);
    await saveAgencyStats(tempStats);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = async () => {
    if (!hasAdminAccess) return;
    setStats(initialStats);
    setTempStats(initialStats);
    await saveAgencyStats(initialStats);
    setIsEditing(false);
  };

  const statItems = [
    {
      key: 'projects' as const,
      value: stats.projects,
      label: 'Projects Delivered',
      subtext: 'High-impact web experiences',
      icon: TrendingUp,
      color: 'from-purple-400 to-indigo-300'
    },
    {
      key: 'clients' as const,
      value: stats.clients,
      label: 'Ambitious Clients',
      subtext: 'Startups, creators & brands',
      icon: Users,
      color: 'from-fuchsia-400 to-pink-300'
    },
    {
      key: 'satisfaction' as const,
      value: stats.satisfaction,
      label: 'Production Standard',
      subtext: 'Clean TypeScript & Modern Stacks',
      icon: Award,
      color: 'from-violet-400 to-purple-300'
    },
    {
      key: 'support' as const,
      value: stats.support,
      label: 'Dedicated Support',
      subtext: 'Continuous agile collaboration',
      icon: Clock,
      color: 'from-pink-400 to-rose-300'
    }
  ];

  return (
    <section className="relative py-12 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Stats Card Container */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-purple-500/25 via-fuchsia-500/20 to-indigo-500/25 shadow-xl shadow-purple-950/40">
          <div className="rounded-[23px] bg-[#0c0822]/85 backdrop-blur-xl px-4 py-6 sm:p-10 border border-purple-500/20">
            
            {/* Top Toolbar: Placeholder notice & edit button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-purple-500/15">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span className="text-[11px] font-mono tracking-wider uppercase text-purple-300/80">
                  METRICS OVERVIEW
                </span>
              </div>

              <div className="flex items-center gap-2">
                {savedSuccess && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 animate-fade-in">
                    <Check className="w-3.5 h-3.5" /> Saved to cloud
                  </span>
                )}
                {hasAdminAccess && (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    id="stats-edit-toggle-btn"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/25 text-xs text-purple-200 hover:text-white transition-colors min-h-[36px]"
                  >
                    <Settings2 className="w-3.5 h-3.5 text-fuchsia-400" />
                    <span>{isEditing ? 'Close Editor' : 'Edit Values'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Editable Form Mode (Strictly restricted to verified Admins) */}
            {hasAdminAccess && isEditing ? (
              <form onSubmit={handleSave} className="p-4 rounded-2xl bg-[#090518] border border-purple-500/30 mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Update Agency Metrics
                  </h4>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-purple-400 hover:text-purple-200 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Defaults
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Projects</label>
                    <input
                      type="text"
                      value={tempStats.projects}
                      onChange={(e) => setTempStats({ ...tempStats, projects: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-purple-950/60 border border-purple-500/30 text-white text-xs font-mono focus:border-fuchsia-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Clients</label>
                    <input
                      type="text"
                      value={tempStats.clients}
                      onChange={(e) => setTempStats({ ...tempStats, clients: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-purple-950/60 border border-purple-500/30 text-white text-xs font-mono focus:border-fuchsia-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Satisfaction</label>
                    <input
                      type="text"
                      value={tempStats.satisfaction}
                      onChange={(e) => setTempStats({ ...tempStats, satisfaction: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-purple-950/60 border border-purple-500/30 text-white text-xs font-mono focus:border-fuchsia-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Support</label>
                    <input
                      type="text"
                      value={tempStats.support}
                      onChange={(e) => setTempStats({ ...tempStats, support: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-purple-950/60 border border-purple-500/30 text-white text-xs font-mono focus:border-fuchsia-400 outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold hover:opacity-90 min-h-[38px]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : null}

            {/* Grid of 4 Stat Blocks */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
              {statItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.key}
                    className="group relative p-3 sm:p-4 rounded-2xl bg-purple-950/20 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-900/40 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:text-fuchsia-300 transition-colors">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-purple-400/50">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-0.5 sm:space-y-1">
                      <div className={`text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                        {item.value}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white truncate sm:whitespace-normal">
                        {item.label}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight sm:leading-snug">
                        {item.subtext}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
