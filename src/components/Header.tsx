import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Leaf, Menu, X, BookOpen, Sparkles, Store, Award } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

interface HeaderProps {
  activeTab: 'home' | 'benefits' | 'shop' | 'blog' | 'club';
  setActiveTab: (tab: 'home' | 'benefits' | 'shop' | 'blog' | 'club') => void;
  cartCount: number;
  toggleCart: () => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, toggleCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Leaf },
    { id: 'benefits', label: 'Benefits', icon: Sparkles },
    { id: 'shop', label: 'Shop', icon: Store },
    { id: 'blog', label: 'Wellness Blog', icon: BookOpen },
    { id: 'club', label: 'Health Club', icon: Award },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-100/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          className="flex cursor-pointer items-center text-emerald-950 transition-transform duration-150 hover:scale-[1.02]"
          onClick={() => setActiveTab('home')}
          id="brand-logo"
        >
          <Logo className="h-14 w-auto object-contain" aria-label="Green Life Moringa Logo" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'text-emerald-950 font-semibold' : 'text-emerald-700/75 hover:text-emerald-950'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-emerald-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utilities: Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            id="cart-trigger-btn"
            onClick={toggleCart}
            className="group relative rounded-xl hover:bg-emerald-50 p-2.5 text-emerald-900 transition-colors"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="h-5.5 w-5.5 transition-transform group-hover:scale-105" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  id="cart-badge-count"
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl hover:bg-emerald-50 p-2.5 text-emerald-900 transition-colors md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-emerald-50 bg-white md:hidden"
            id="mobile-navigation-drawer"
          >
            <div className="space-y-1.5 px-4 pt-2 pb-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-950 font-semibold'
                        : 'text-emerald-700/80 hover:bg-emerald-50/50 hover:text-emerald-950'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-emerald-600" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
