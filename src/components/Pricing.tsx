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

  const getCtaLabel = (planId: string) => {
    if (planId === 'custom') {
      return "Let’s Talk";
    }
    return "Discuss Your Project";
  };

  return (
    <section id="pricing" className="relative py-24 z-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-fuchsia-900/10 blur-[140px] pointer-events-none"></div>

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
            Transparent starting tiers tailored to your launch phase. All scopes include clean source code, responsive fidelity, and launch warranty.
          </p>

          {/* Currency Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex p-1 rounded-xl bg-purple-950/70 border border-purple-500/25">
              <button
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

        {/* 3 Tiered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const isHighlighted = plan.highlighted;
            const displayPrice = currency === 'INR' ? plan.priceINR : plan.priceUSD;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-[1px] transition-all duration-300 flex flex-col justify-between ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-fuchsia-500 via-purple-500 to-indigo-500 shadow-2xl shadow-fuchsia-950/50 lg:-translate-y-2'
                    : 'bg-gradient-to-b from-purple-500/25 via-purple-500/10 to-transparent hover:border-purple-400/40 shadow-xl shadow-purple-950/30'
                }`}
              >
                {/* Most Popular Floating Pill */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white text-[10px] font-extrabold tracking-widest uppercase shadow-md shadow-fuchsia-500/40">
                      {plan.badge || 'MOST POPULAR'}
                    </span>
                  </div>
                )}

                <div className={`h-full rounded-[23px] backdrop-blur-2xl p-7 sm:p-8 flex flex-col justify-between ${
                  isHighlighted ? 'bg-[#0f0928]' : 'bg-[#0c0822]/85'
                }`}>
                  
                  {/* Card Header & Price */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        {plan.name}
                      </h3>
                      <span className="text-xs font-mono text-purple-300/70">
                        {plan.timeline}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mb-6 font-normal">
                      {plan.tagline}
                    </p>

                    <div className="mb-6 pb-6 border-b border-purple-500/15">
                      {displayPrice.startsWith('Starting from ') ? (
                        <div>
                          <span className="text-[11px] sm:text-xs font-mono font-semibold text-purple-300/80 uppercase tracking-wider block mb-1">
                            Starting from
                          </span>
                          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            {displayPrice.replace('Starting from ', '')}
                          </div>
                        </div>
                      ) : (
                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {displayPrice}
                        </div>
                      )}
                      <span className="text-[11px] text-purple-300/70 block mt-1.5">
                        Scoped per project requirements
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                        Included in this package:
                      </span>
                      {plan.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isHighlighted ? 'text-fuchsia-400' : 'text-purple-400'}`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action - Consultation Focused */}
                  <button
                    id={`pricing-plan-${plan.id}-cta`}
                    onClick={() => handlePlanCta(plan.name)}
                    className={`w-full py-3.5 rounded-full text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all duration-300 group ${
                      isHighlighted
                        ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-xl shadow-fuchsia-900/50 hover:shadow-fuchsia-600/60 hover:scale-[1.02]'
                        : 'bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 hover:text-white'
                    }`}
                  >
                    <span>{getCtaLabel(plan.id)}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
