import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Filter, Info, ShoppingBag, Eye, X, Check, HelpCircle } from 'lucide-react';
import { MORINGA_PRODUCTS } from '../data/moringaData';
import { Product } from '../types';

interface StorefrontProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function Storefront({ onAddToCart }: StorefrontProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'powder', label: 'Leaf Powders' },
    { value: 'tea', label: 'Herbal Infusions' },
    { value: 'capsule', label: 'Wellness Capsules' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'seeds', label: 'Whole Seeds' },
    { value: 'oil', label: 'Therapeutic Oils' },
  ];

  // Filters & Search
  const filteredProducts = MORINGA_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setDetailQuantity(1);
  };

  const executeAddAction = (product: Product, qty: number) => {
    onAddToCart(product, qty);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <div id="store-section" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      
      {/* Upper Marketing Title */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-emerald-100/60 pb-8 mb-10">
        <div>
          <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">Apothecary Shop</span>
          <p className="mt-2.5 text-sm text-emerald-900/70 max-w-lg">
            100% pure botanical formulas. Free from synthetics, additives, or agricultural chemicals. Direct farm trade.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="relative">
            <input
              type="text"
              id="search-products-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apothecary..."
              className="w-full sm:w-64 rounded-xl border border-emerald-100 bg-white px-4 py-2.5 pl-10 text-sm text-emerald-950 placeholder-emerald-900/40 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-emerald-900/40" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-emerald-400 hover:text-emerald-600 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-emerald-100">
        <Filter className="h-4 w-4 text-emerald-700 shrink-0 mr-1 hidden sm:inline" />
        {categories.map((cat) => (
          <button
            key={cat.value}
            id={`cat-filter-${cat.value}`}
            onClick={() => setSelectedCategory(cat.value)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-150 ${
              selectedCategory === cat.value
                ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-800/10'
                : 'bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800 border border-emerald-100/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-100 py-16 text-center" id="no-products-view">
          <Info className="mx-auto h-12 w-12 text-emerald-700/40" />
          <h3 className="mt-4 text-base font-bold text-emerald-950">No formulas matched your search</h3>
          <p className="mt-2 text-sm text-emerald-900/65 max-w-sm mx-auto">
            Try correcting typos or clear filters to view our complete premium organic catalog.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-6 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
          >
            Reset Catalog
          </button>
        </div>
      ) : (
        <div id="product-results-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {filteredProducts.map((product) => {
            const isHovered = hoveredProductId === product.id;
            const hasBeenAdded = addedProductId === product.id;

            return (
              <motion.div
                key={product.id}
                id={`product-card-${product.id}`}
                layout
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-100/50 bg-white transition-all duration-200 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-950/5"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                {/* Product Image Holder */}
                <div className="relative aspect-square overflow-hidden bg-emerald-50/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badges */}
                  <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                    <span className="rounded-lg bg-emerald-700/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      {product.size}
                    </span>
                    {product.stock <= 15 && (
                      <span className="rounded-lg bg-amber-600/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                        Low Stock
                      </span>
                    )}
                  </div>

                  {/* Hover Quick actions Overlay */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-emerald-950/20 backdrop-blur-[1px] gap-2.5"
                      >
                        <button
                          id={`quick-view-${product.id}`}
                          onClick={() => handleProductClick(product)}
                          className="rounded-xl bg-white p-2.5 text-emerald-900 shadow-md transition-transform hover:scale-110 hover:text-emerald-600"
                          title="View formulas details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info Text Card */}
                <div className="flex flex-col p-5 grow">
                  <div className="flex items-center gap-1.5 text-xs text-amber-500">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span className="ml-1 font-bold font-sans text-emerald-950">{product.rating}</span>
                    </div>
                    <span className="text-emerald-900/40">•</span>
                    <span className="text-emerald-900/60 font-medium">{product.reviewsCount} reviews</span>
                  </div>

                  <h3 
                    onClick={() => handleProductClick(product)}
                    className="mt-2 text-base font-extrabold text-emerald-950 line-clamp-1 hover:text-emerald-700 cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  
                  <p className="mt-1 text-xs text-emerald-900/70 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-emerald-50">
                    <div>
                      <span className="text-[10px] font-medium text-emerald-900/50 uppercase tracking-wider">Apothecary price</span>
                      <p className="text-lg font-black font-sans text-emerald-950">${product.price}</p>
                    </div>

                    <button
                      id={`add-to-cart-bin-${product.id}`}
                      onClick={() => executeAddAction(product, 1)}
                      className={`flex h-11 items-center justify-center rounded-xl font-bold px-4 transition-all ${
                        hasBeenAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-800 text-white hover:bg-emerald-900'
                      }`}
                    >
                      {hasBeenAdded ? (
                        <>
                          <Check className="h-4.5 w-4.5 animate-bounce" />
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          <ShoppingBag className="h-4 w-4" />
                          <span>Buy</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Dynamic Product Details Overlay Dialog */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center px-4 py-6" id="product-modal-container">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-emerald-950/50 backdrop-blur-sm"
              id="product-modal-backdrop"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-2xl z-10 scrollbar-thin"
              id="product-detail-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 rounded-full bg-emerald-50/80 p-2 text-emerald-900 hover:bg-emerald-100 hover:text-emerald-700"
                id="close-product-modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
                {/* Product Column Left: Image & Quick Stats */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-emerald-50 aspect-square">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="rounded-xl bg-emerald-50/50 border border-emerald-100/40 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Storage Instruction</span>
                    <p className="text-[11px] text-emerald-950 mt-1 leading-normal">
                      Store in a cool, dark, dry climate cupboard. Seal package immediately after opening to defend enzymatic micronutrients.
                    </p>
                  </div>
                </div>

                {/* Product Column Right: Specs & Action buttons */}
                <div className="md:col-span-7 flex flex-col">
                  {/* Category Header */}
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                    Category: {selectedProduct.category}
                  </span>

                  <h3 className="font-sans text-2xl font-black text-emerald-950 mt-1">
                    {selectedProduct.name}
                  </h3>

                  {/* Price, Stats */}
                  <div className="flex items-center gap-4 mt-3 pb-4 border-b border-emerald-50">
                    <p className="text-3xl font-black text-emerald-800">${selectedProduct.price}</p>
                    <div className="h-5 w-px bg-emerald-100" />
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span>{selectedProduct.rating} ({selectedProduct.reviewsCount} customer reviews)</span>
                    </div>
                  </div>

                  {/* Benefits checklist bullet */}
                  <div className="mt-5 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">Formulas Highlights</h4>
                      <ul className="mt-2.5 space-y-1.5 pl-1">
                        {selectedProduct.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-emerald-900/80 leading-normal">
                            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How to use */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">Recommended Intake / Usage</h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-emerald-950 bg-emerald-50/40 rounded-xl p-3.5 border border-emerald-100/50">
                        {selectedProduct.usage}
                      </p>
                    </div>

                    {/* Ingredients list */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">Botanical Ingredients</h4>
                      <p className="mt-1 font-mono text-[11px] text-emerald-900/70 leading-relaxed">
                        {selectedProduct.ingredients}
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Cart Addition buttons area */}
                  <div className="mt-auto pt-6 border-t border-emerald-50 flex items-center justify-between gap-4">
                    
                    {/* Quantity selectors */}
                    <div className="flex items-center rounded-xl border border-emerald-100 p-1 bg-emerald-50/30 shrink-0">
                      <button
                        onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                        className="rounded-lg h-8 w-8 flex items-center justify-center font-bold text-emerald-900 hover:bg-white transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3.5 text-sm font-bold text-emerald-950">{detailQuantity}</span>
                      <button
                        onClick={() => setDetailQuantity(Math.min(10, detailQuantity + 1))}
                        className="rounded-lg h-8 w-8 flex items-center justify-center font-bold text-emerald-900 hover:bg-white transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      id="modal-add-to-cart-btn"
                      onClick={() => {
                        executeAddAction(selectedProduct, detailQuantity);
                        setSelectedProduct(null); // Close modal on success
                      }}
                      className="grow rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold h-12 flex items-center justify-center gap-2 text-sm shadow-md transition-all sm:text-base"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>Add {detailQuantity} to Bag — ${(selectedProduct.price * detailQuantity).toFixed(2)}</span>
                    </button>
                  </div>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
