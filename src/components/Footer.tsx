import { useState, FormEvent } from 'react';
import { Leaf, ArrowRight, Github, Send, ShieldAlert, Sparkles } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'benefits' | 'shop' | 'blog' | 'club') => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="border-t border-emerald-100 bg-emerald-950 text-white pt-16 pb-8" id="landing-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Panel */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center cursor-pointer transition-transform duration-150 hover:scale-[1.02]" onClick={() => setActiveTab('home')}>
              <Logo className="h-16 w-auto bg-white/5 p-1.5 rounded-xl border border-white/10" aria-label="Green Life Moringa Logo" />
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              We provide peak certified organic green superfoods directly sourced from sustainably irrigated fair-trade family farms. Sun-cured & cold-milled to maximize biochemical bioavailability.
            </p>

            <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 max-w-xs">
              <div className="flex gap-2.5 items-start">
                <ShieldAlert className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-350 leading-normal">
                  *These raw state biological statements have not been evaluated by the FDA. These products are not intended to diagnose, treat, or cure any pathology.
                </p>
              </div>
            </div>
          </div>

          {/* Quick links Columns */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Catalog Collections</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-emerald-400 transition-colors">
                  Raw Moringa Leaf Powders
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-emerald-400 transition-colors">
                  Pyramid Herbal Tea Infutions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-emerald-400 transition-colors">
                  Daily Concentrated Capsules
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-emerald-400 transition-colors">
                  Facial & Hair Botanical Oils
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Science Academy</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => setActiveTab('benefits')} className="hover:text-emerald-400 transition-colors">
                  Scientific Clinical Studies
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('benefits')} className="hover:text-emerald-400 transition-colors">
                  Antioxidant Quercetin Ratios
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('benefits')} className="hover:text-emerald-400 transition-colors">
                  Cytokinin Zeatin Longevity
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-emerald-400 transition-colors">
                  Wellness Recipes & Guides
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('club')} className="hover:text-emerald-400 transition-colors font-semibold text-emerald-300">
                  Green Life Health Club
                </button>
              </li>
            </ul>
          </div>

          {/* Local Newsletter bar */}
          <div className="md:col-span-4 space-y-4" id="footer-newsletter">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Join the Botanical List</h4>
            <p className="text-xs text-slate-300 leading-normal">
              Subscribe to unlock quarterly biological analysis papers, seasonal raw recipe guides, and 10% off your initial apothecary order.
            </p>

            {subscribed ? (
              <div 
                className="rounded-xl bg-emerald-900/60 border border-emerald-800 p-3 flex items-center gap-2 text-xs text-emerald-400 font-semibold"
                id="newsletter-success-toast"
              >
                <Sparkles className="h-4 w-4 animate-spin text-emerald-400" />
                <span>Subscribed! Check your inbox for the 10% coupon soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="email"
                  id="newsletter-email-input"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 text-xs text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  aria-label="Submit email newsletter subscription"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Lower row */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-400 gap-4">
          <div>
            <p>© {new Date().getFullYear()} Green Life Moringa Inc. All rights reserved. Natural health partner.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Principles</a>
            <a href="#" className="hover:text-white transition-colors">Direct Farm Sourcing Terms</a>
            <a href="#" className="hover:text-white transition-colors">Refund Sandboxes</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
