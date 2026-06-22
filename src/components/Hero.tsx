import { motion } from 'motion/react';
import { ArrowRight, Leaf, Shield, Award, Sparkles, Heart } from 'lucide-react';
import { HERO_IMAGE } from '../data/moringaData';

interface HeroProps {
  onShopClick: () => void;
  onBenefitsClick: () => void;
}

export default function Hero({ onShopClick, onBenefitsClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const statItems = [
    { value: '100%', label: 'Certified Organic', icon: Leaf },
    { value: '90+', label: 'Active Nutrients', icon: Sparkles },
    { value: '46', label: 'Anti-inflammatory Agents', icon: Shield },
    { value: 'Direct', label: 'Fair Trade Sourced', icon: Award },
  ];

  return (
    <div id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20 py-12 md:py-20 lg:py-24">
      {/* Decorative vector meshes */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-100/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-amber-50/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Hero text panel */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 rounded-full border border-emerald-150 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-800 uppercase"
            >
              <Sparkles className="h-4.5 w-4.5 text-emerald-600 animate-pulse" />
              Natural Health Partner
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="font-sans text-4xl font-extrabold tracking-tight text-emerald-950 sm:text-5xl md:text-6xl"
            >
              <span className="bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                pure, organic nutrition for radiant vitality.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="max-w-xl text-lg leading-relaxed text-emerald-900/80 sm:text-xl"
            >
              Sustainably harvested and shade-dried within hours to preserve all 90+ vital vitamins, cell antioxidants, bioflavonoids, and complete plant-based proteins. Rediscover organic coffee-free stamina.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:items-center"
            >
              <button
                id="hero-shop-cta"
                onClick={onShopClick}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-7 py-4 text-base font-semibold text-white shadow-md shadow-emerald-950/10 transition-all duration-150 hover:bg-emerald-900 hover:shadow-lg hover:shadow-emerald-950/20"
              >
                Shop
                <ArrowRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-benefits-cta"
                onClick={onBenefitsClick}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-100 bg-white px-7 py-4 text-base font-semibold text-emerald-800 transition-all duration-150 hover:bg-emerald-50/40 hover:border-emerald-300"
              >
                Scientific Benefits
              </button>
            </motion.div>

            {/* Benefit quick bullet features */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-x-6 gap-y-3.5 border-t border-emerald-100/60 pt-8"
            >
              <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-950">
                <Heart className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Cardiovascular Support</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-950">
                <Sparkles className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Immune Amplification</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-950">
                <Leaf className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Steady Alkalizing Stamina</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-950">
                <Shield className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Anti-Aging Beauty Phytohormones</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero visual panel */}
          <motion.div
            className="relative lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="relative h-[280px] w-full max-w-[420px] overflow-hidden rounded-3xl border border-emerald-150 shadow-xl sm:h-[350px] lg:h-[450px]">
              <img
                src={HERO_IMAGE}
                alt="Organic lush green moringa leaves and wellness powder"
                className="h-full w-full object-cover transition-transform duration-[4000ms] ease-out hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlaid quality trust seal */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md p-3.5 border border-emerald-50">
                <div className="rounded-xl bg-emerald-600 p-2 text-white">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">100% Organically Grown</h4>
                  <p className="text-[11px] text-emerald-900/70">Certified shade-dried, high-retaining milling</p>
                </div>
              </div>
            </div>
            
            {/* Background design dots */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-24 w-24 bg-[radial-gradient(#059669_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-40" />
            <div className="absolute -top-6 -left-6 -z-10 h-24 w-24 bg-[radial-gradient(#059669_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-40" />
          </motion.div>
        </div>

        {/* Stats Section with dynamic stagger animations */}
        <div className="mt-16 sm:mt-24 border-t border-emerald-100/60 pt-10 sm:pt-16">
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 gap-x-4">
            {statItems.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl bg-white/20 border border-transparent hover:border-emerald-50 hover:bg-white/50 transition-all duration-200">
                  <div className="mb-2.5 rounded-full bg-emerald-50 p-2.5 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <dd className="font-sans text-2xl font-bold tracking-tight text-emerald-950 sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs font-medium text-emerald-800">
                    {stat.label}
                  </dt>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
