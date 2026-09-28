import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { pricingPlans } from '../data/agencyData';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const handlePlanCta = (planName: string) => {
    onSelectPlan(planName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="relative py-24 z-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-fuchsia-900/10 blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-900/10 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            TRANSPARENT PRICING
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Predictable investment.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">
              Exceptional returns.
            </span>
          </h2>
          <p className="text-slate-300/80 text-sm sm:text-base max-w-xl mx-auto">
            Choose the package that aligns with your scale. All projects include custom design, mobile fidelity, performance optimization, and direct consultation.
          </p>

          {/* Currency Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex p-1 rounded-xl bg-purple-950/70 border border-purple-500/25">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${
                  currency === 'INR'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                INR (₹)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${
                  currency === 'USD'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>

        {/* Exactly 3 Tiered Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const isHighlighted = plan.highlighted;
            const isCustom = plan.id === 'custom-project';
            const displayPrice = currency === 'INR' ? plan.priceINR : plan.priceUSD;

            return (
              <div
                key={plan.id}
                className={`group relative rounded-3xl p-[1px] transition-all duration-500 ease-out flex flex-col justify-between ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-fuchsia-500 via-purple-500 to-indigo-500 shadow-2xl shadow-fuchsia-950/50 lg:-translate-y-2 hover:-translate-y-3.5 hover:shadow-fuchsia-600/40 hover:shadow-2xl'
                    : isCustom
                    ? 'bg-gradient-to-b from-indigo-500/40 via-purple-500/30 to-fuchsia-500/30 shadow-xl shadow-purple-950/30 hover:from-indigo-500/70 hover:via-purple-500/50 hover:to-pink-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/40'
                    : 'bg-gradient-to-b from-purple-500/30 via-purple-500/15 to-transparent shadow-xl shadow-purple-950/30 hover:from-purple-500/60 hover:via-fuchsia-500/35 hover:to-purple-500/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-950/60'
                }`}
              >
                {/* Subtle Ambient Hover Glow */}
                <div 
                  aria-hidden="true" 
                  className={`absolute -inset-1 rounded-[26px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 ${
                    isHighlighted
                      ? 'bg-gradient-to-b from-fuchsia-500/25 via-purple-600/20 to-indigo-600/20'
                      : isCustom
                      ? 'bg-gradient-to-b from-indigo-500/20 via-purple-600/20 to-fuchsia-500/20'
                      : 'bg-gradient-to-b from-purple-500/15 via-fuchsia-500/10 to-indigo-500/15'
                  }`} 
                />

                {/* Floating Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase shadow-md flex items-center gap-1.5 transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-fuchsia-500/40 group-hover:shadow-fuchsia-500/60'
                        : 'bg-purple-950 border border-purple-500/40 text-purple-200 group-hover:border-purple-400/70 group-hover:text-white'
                    }`}>
                      {isCustom && <Sparkles className="w-3 h-3 text-fuchsia-400" />}
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div className={`h-full rounded-[23px] backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-500 ${
                  isHighlighted 
                    ? 'bg-[#0f0928] group-hover:bg-[#120a32]' 
                    : isCustom
                    ? 'bg-[#0d0724]/90 group-hover:bg-[#110a2f]/95'
                    : 'bg-[#0c0822]/85 group-hover:bg-[#0f0a2d]/95'
                }`}>
                  
                  {/* Card Header & Price */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white tracking-wide transition-colors duration-300 group-hover:text-purple-100">
                        {plan.name}
                      </h3>
                      <span className="text-xs font-mono text-purple-300/70 transition-colors duration-300 group-hover:text-purple-200">
                        {plan.timeline}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mb-5 font-normal leading-relaxed">
                      {plan.tagline}
                    </p>

                    <div className="mb-6 pb-6 border-b border-purple-500/15">
                      {isCustom ? (
                        <div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-pink-200 tracking-tight">
                            Custom Pricing
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-fuchsia-400 mt-1">
                            Let's Discuss
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            {displayPrice}
                          </div>
                          <span className="text-[11px] text-purple-300/70 block mt-1">
                            Scoped per project requirements
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Custom Project Detailed Description */}
                    {plan.description && (
                      <div className="mb-6 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-slate-300/90 leading-relaxed italic">
                        "{plan.description}"
                      </div>
                    )}

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                        {isCustom ? 'Scope & Capabilities Included:' : 'Included in this package:'}
                      </span>
                      {plan.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-200 leading-snug">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isHighlighted 
                              ? 'text-fuchsia-400' 
                              : isCustom
                              ? 'text-pink-400'
                              : 'text-purple-400'
                          }`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action - Consistent Discuss Your Project */}
                  <button
                    type="button"
                    id={`pricing-plan-${plan.id}-cta`}
                    onClick={() => handlePlanCta(plan.name)}
                    className={`w-full py-3.5 rounded-full text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all duration-300 group min-h-[44px] cursor-pointer ${
                      isHighlighted
                        ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-xl shadow-fuchsia-900/50 hover:shadow-fuchsia-600/60 hover:scale-[1.02]'
                        : isCustom
                        ? 'bg-gradient-to-r from-purple-900/80 to-indigo-900/80 hover:from-purple-800 hover:to-indigo-800 border border-purple-500/40 text-white shadow-lg shadow-purple-950/40 hover:scale-[1.01]'
                        : 'bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 hover:text-white'
                    }`}
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Scope and Transparency Note */}
        <div className="mt-12 text-center text-xs text-purple-300/70 max-w-2xl mx-auto flex items-center justify-center gap-2 px-4">
          <ShieldCheck className="w-4 h-4 text-fuchsia-400 shrink-0" />
          <span>
            Automation and integrations are subject to project scope and requirements. No hidden fees.
          </span>
        </div>

      </div>
    </section>
  );
};
