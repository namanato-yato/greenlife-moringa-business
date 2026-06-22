import { useState, ComponentType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Sparkles, Shield, HeartPulse, Smile, Activity, ChevronRight, BookOpen, Scale } from 'lucide-react';
import { MORINGA_BENEFITS } from '../data/moringaData';
import { MoringaBenefit } from '../types';

// Map icon strings to Lucide components
const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Leaf,
  Sparkles,
  Shield,
  HeartPulse,
  Smile,
  Activity,
};

export default function Benefits() {
  const [selectedBenefit, setSelectedBenefit] = useState<MoringaBenefit>(MORINGA_BENEFITS[0]);

  return (
    <div id="benefits-section" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      {/* Informative Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">Scientific Research Hub</span>
        <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
          Why is Moringa the "Miracle Tree"?
        </h2>
        <p className="mt-4 text-base text-emerald-900/70">
          Uncompromised organic nutrition meets physiological science. Click on any of our primary clinical pillars below to review expanded health studies and nutritional breakdowns.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Side: Interactive Benefit Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {MORINGA_BENEFITS.map((benefit) => {
              const IconComponent = ICON_MAP[benefit.iconName] || Leaf;
              const isSelected = selectedBenefit.id === benefit.id;

              return (
                <motion.button
                  key={benefit.id}
                  id={`benefit-btn-${benefit.id}`}
                  onClick={() => setSelectedBenefit(benefit)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col text-left p-5 rounded-2xl border-2 transition-all duration-150 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-emerald-50 bg-white hover:border-emerald-150 hover:bg-emerald-50/20'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl self-start ${isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-emerald-950">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-emerald-900/70 leading-relaxed grow line-clamp-2">
                    {benefit.shortDescription}
                  </p>
                  <div className="mt-3.5 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <span>Read Study Details</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Quick Nutritional Comparison Grid */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <Scale className="h-4.5 w-4.5 text-emerald-600" />
              Weight-for-Weight Superfood Density comparison
            </h4>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-emerald-50/40 p-3 text-center border border-emerald-50">
                <p className="text-xl font-black text-emerald-800">7x_</p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-950/80 mt-1">Vitamin C</p>
                <p className="text-[9px] text-emerald-900/60 font-medium">vs. Oranges</p>
              </div>
              <div className="rounded-xl bg-emerald-50/40 p-3 text-center border border-emerald-50">
                <p className="text-xl font-black text-emerald-800">17x_</p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-950/80 mt-1">Calcium</p>
                <p className="text-[9px] text-emerald-900/60 font-medium">vs. Pure Milk</p>
              </div>
              <div className="rounded-xl bg-emerald-50/40 p-3 text-center border border-emerald-50">
                <p className="text-xl font-black text-emerald-800">25x_</p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-950/80 mt-1">Organic Iron</p>
                <p className="text-[9px] text-emerald-900/60 font-medium">vs. Spinach</p>
              </div>
              <div className="rounded-xl bg-emerald-50/40 p-3 text-center border border-emerald-50">
                <p className="text-xl font-black text-emerald-800">9x_</p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-950/80 mt-1">Plant Protein</p>
                <p className="text-[9px] text-emerald-900/60 font-medium">vs. Yogurt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Benefit Display Panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBenefit.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="sticky top-24 rounded-3xl border border-emerald-100 bg-white p-6 shadow-md shadow-emerald-900/5 sm:p-8"
              id="benefit-detail-panel"
            >
              <div className="flex items-center gap-4 border-b border-emerald-50 pb-6">
                <div className="rounded-2xl bg-emerald-700 p-3 text-white">
                  {(() => {
                    const IconComponent = ICON_MAP[selectedBenefit.iconName] || Leaf;
                    return <IconComponent className="h-6 w-6" />;
                  })()}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Active Health System Impact</span>
                  <h3 className="text-xl font-extrabold text-emerald-950 mt-0.5">{selectedBenefit.title}</h3>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">Nutritional Mechanism</h4>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-900/80">
                    {selectedBenefit.detailedBenefit}
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50/40 border border-amber-100/50 p-4.5">
                  <div className="flex items-start gap-2.5">
                    <BookOpen className="h-4.5 w-4.5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900">Clinical Scientific Citation</h5>
                      <p className="mt-1.5 font-mono text-[11px] text-amber-900/85 leading-normal">
                        {selectedBenefit.scientificReference}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-emerald-50 pt-5">
                  <span className="text-[11px] font-medium text-emerald-900/55">
                    *Our premium harvesting guidelines comply strictly with botanical standards to respect raw molecular profiles.
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
