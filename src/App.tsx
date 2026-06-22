import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Star, Heart, FileText, Check } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Storefront from './components/Storefront';
import Blog from './components/Blog';
import HealthClub from './components/HealthClub';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { MORINGA_PRODUCTS, HERO_IMAGE } from './data/moringaData';
import { Product, CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'benefits' | 'shop' | 'blog' | 'club'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Sync cart from/to localStorage for client persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('moringa_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading cart state:', err);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('moringa_cart', JSON.stringify(updatedCart));
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { product, quantity }];
    }

    saveCartToStorage(updatedCart);
    
    // Auto slide-open the cart after 300ms to give visual reward feedback
    setTimeout(() => {
      setCartOpen(true);
    }, 200);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCartToStorage(updatedCart);
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    saveCartToStorage(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Smooth scroll helper when switching views
  const changeActiveTabWithScroll = (tab: 'home' | 'benefits' | 'shop' | 'blog' | 'club') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-950">
      
      {/* Upper announcements */}
      <div className="bg-emerald-950 text-white text-[11px] font-semibold uppercase tracking-wider py-2.5 px-4 text-center border-b border-white/5 flex items-center justify-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
        <span>Free Priority USA & Global standard Delivery for all orders over $35!</span>
      </div>

      {/* Main navigation header */}
      <Header
        activeTab={activeTab}
        setActiveTab={changeActiveTabWithScroll}
        cartCount={totalCartCount}
        toggleCart={() => setCartOpen(!cartOpen)}
      />

      {/* Structured Multi-Panel Content rendering */}
      <main className="grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Hero
                onShopClick={() => changeActiveTabWithScroll('shop')}
                onBenefitsClick={() => changeActiveTabWithScroll('benefits')}
              />

              {/* Home Abbreviated Preview Block: Product Benefits Preview */}
              <section className="bg-white py-16 border-t border-b border-emerald-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Pure Biological Value</span>
                    <h3 className="mt-2 text-2xl font-extrabold text-emerald-950 sm:text-3xl">Pristine Botanical Defense</h3>
                    <p className="mt-2.5 text-xs text-slate-600">Moringa leaf compounds deliver steady cardiovascular cellular defense, organic daily stamina, and anti-aging qualities.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="rounded-2xl border border-emerald-50 p-5 bg-[#FDFDFB]">
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">1</div>
                      <h4 className="mt-4 text-sm font-extrabold text-emerald-950">90+ Vital Micro-Nutrients</h4>
                      <p className="mt-1 text-xs text-slate-600">Matches complete multi-vitamins and active trace minerals in raw biological forms.</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-50 p-5 bg-[#FDFDFB]">
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">2</div>
                      <h4 className="mt-4 text-sm font-extrabold text-emerald-950">Pure Cellular ATP Stamina</h4>
                      <p className="mt-1 text-xs text-slate-600">Iron and active magnesium stimulate mitochondrial energy release without caffeine crashes.</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-50 p-5 bg-[#FDFDFB]">
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">3</div>
                      <h4 className="mt-4 text-sm font-extrabold text-emerald-950">Hormone Zeatin Anti-Aging</h4>
                      <p className="mt-1 text-xs text-slate-600">Promotes collagen fibers and cell division to preserve youthful outer dermis hydration.</p>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      id="home-benefits-preview-cta"
                      onClick={() => changeActiveTabWithScroll('benefits')}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-5  py-3 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
                    >
                      <span>Explore Scientific Clinical Citations</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Home Quick Highlight Block: Bestsellers Preview */}
              <section className="py-16 bg-[#FDFDFB]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Organic Apothecary Bestsellers</span>
                      <h3 className="mt-2 text-2xl font-black text-emerald-950 sm:text-3xl font-sans">Apothecary Specialties</h3>
                    </div>
                    <button
                      id="home-shop-preview-cta"
                      onClick={() => changeActiveTabWithScroll('shop')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                    >
                      <span>Browse All Products</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MORINGA_PRODUCTS.slice(0, 4).map((product) => (
                      <div 
                        key={product.id}
                        id={`home-product-card-${product.id}`}
                        onClick={() => changeActiveTabWithScroll('shop')}
                        className="rounded-2xl border border-emerald-50 bg-white p-4 cursor-pointer hover:border-emerald-250 transition-colors shadow-sm group"
                      >
                        <div className="aspect-square rounded-xl overflow-hidden bg-emerald-50/20 relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h4 className="mt-3.5 text-xs font-bold text-emerald-950 line-clamp-1 group-hover:text-emerald-700">{product.name}</h4>
                        <div className="mt-2 flex items-center justify-between text-xs font-bold text-emerald-950">
                          <span className="text-emerald-800 font-black">${product.price}</span>
                          <span className="text-amber-500 flex items-center gap-0.5">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Trust Slogan Banner */}
              <section className="bg-emerald-900 text-white py-16 px-4">
                <div className="mx-auto max-w-4xl text-center space-y-6">
                  <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">natural health partner</span>
                  <h3 className="font-sans text-3xl font-black md:text-4xl leading-tight">Our standard is uncompromised clean health.</h3>
                  <p className="text-slate-200 text-sm max-w-2xl mx-auto leading-relaxed">
                    We harvest premium Moringa stenotepela leaves from volcanic, mineral-dense soils. They are washed, shade-dried to protect enzymes against solar radiation degradation, and milled down to an ultra-active micro-powder state. Complete trace certificate transparency on every pouch.
                  </p>
                  <div className="inline-flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-semibold pt-2">
                    <span className="flex items-center gap-1.5"><Check className="h-4.5 w-4.5 text-emerald-400" /> USDA Organic</span>
                    <span className="flex items-center gap-1.5"><Check className="h-4.5 w-4.5 text-emerald-400" /> Non-Irradiated</span>
                    <span className="flex items-center gap-1.5"><Check className="h-4.5 w-4.5 text-emerald-400" /> Caffeine Free</span>
                    <span className="flex items-center gap-1.5"><Check className="h-4.5 w-4.5 text-emerald-400" /> Third Party Tested</span>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {activeTab === 'benefits' && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Benefits />
            </motion.div>
          )}

          {activeTab === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Storefront onAddToCart={handleAddToCart} />
            </motion.div>
          )}

          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Blog />
            </motion.div>
          )}

          {activeTab === 'club' && (
            <motion.div
              key="club"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <HealthClub />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sticky footer structure */}
      <Footer setActiveTab={changeActiveTabWithScroll} />

      {/* Cart sidebar slider */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
