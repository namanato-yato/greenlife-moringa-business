import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, User, ArrowRight, X, ChevronRight, Share, Heart, Search } from 'lucide-react';
import { MORINGA_BLOGS } from '../data/moringaData';
import { BlogArticle } from '../types';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const categories = ['all', 'Nutrition', 'Recipes', 'Wellness'];

  const filteredArticles = MORINGA_BLOGS.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLikeToggle = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setLikedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div id="blog-section" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      
      {/* Blog Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-emerald-100/60 pb-8 mb-10 gap-6">
        <div>
          <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase font-sans">Scientific Journal</span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
            Wellness & Nutrition Publications
          </h2>
          <p className="mt-2.5 text-sm text-emerald-900/70 max-w-lg">
            Stay educated on raw botanical science, holistic medicine comparative breakdowns, and nutritious recipes vetted by nutritionists.
          </p>
        </div>

        {/* Local Search */}
        <div className="relative shrink-0">
          <input
            type="text"
            id="search-blog-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search healthy journals..."
            className="w-full sm:w-64 rounded-xl border border-emerald-100 bg-white px-4 py-2.5 pl-10 text-sm text-emerald-950 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-emerald-900/40" />
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`blog-cat-${cat}`}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${
              activeCategory === cat
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800 border border-emerald-100/40'
            }`}
          >
            {cat === 'all' ? 'All Publications' : cat}
          </button>
        ))}
      </div>

      {/* Articles Grid Feed */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-100 py-16 text-center" id="empty-blog-view">
          <BookOpen className="mx-auto h-12 w-12 text-emerald-700/30" />
          <h3 className="mt-4 text-base font-bold text-emerald-950">No publications matched</h3>
          <p className="mt-1.5 text-sm text-emerald-900/60 max-w-xs mx-auto">
            Try adjusting search keys or browse all wellness publications.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-6 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700"
          >
            Refresh Publications
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-posts-grid">
          {filteredArticles.map((article) => {
            const isLiked = likedArticles[article.id];
            return (
              <motion.article
                key={article.id}
                id={`blog-card-${article.id}`}
                layout
                whileHover={{ y: -4 }}
                onClick={() => setSelectedArticle(article)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-150/45 bg-white transition-all hover:border-emerald-250 hover:shadow-lg hover:shadow-emerald-950/5 cursor-pointer"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-emerald-50/20">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="rounded-lg bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>

                  {/* Micro action hooks */}
                  <div className="absolute right-3 top-3 flex gap-1.5">
                    <button
                      onClick={(e) => handleLikeToggle(article.id, e)}
                      id={`like-btn-${article.id}`}
                      className={`rounded-lg p-1.5 backdrop-blur-md transition-colors ${
                        isLiked ? 'bg-amber-50 text-amber-600' : 'bg-white/80 text-emerald-950 hover:bg-white'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Card Text parameters */}
                <div className="flex flex-col p-5 grow">
                  {/* Meta lists */}
                  <div className="flex items-center gap-3.5 text-[11px] text-emerald-900/60 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="mt-3.5 text-base font-extrabold text-emerald-950 leading-snug group-hover:text-emerald-700 line-clamp-2 transition-colors">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs text-emerald-900/75 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 rounded-full bg-emerald-50 flex items-center justify-center">
                        <User className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span className="text-[10px] text-emerald-900/60">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Read Deep-Dive</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* Styled Article Deep-Dive Full-Screen Modal Reader */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center px-4 py-6" id="blog-modal-container">
            {/* Overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
              id="blog-modal-backdrop"
            />

            {/* Modal reader framework */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-emerald-100 p-6 sm:p-10 shadow-2xl z-10 scrollbar-thin"
              id="blog-detailed-reader"
            >
              {/* Back actions header */}
              <div className="flex items-center justify-between border-b border-emerald-50 pb-4 mb-6">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="inline-flex items-center gap-1.5 rounded-lg text-xs font-bold text-emerald-600 hover:text-emerald-900 px-2.5 py-1.5 hover:bg-emerald-50/50 transition-colors"
                  id="back-to-publications"
                >
                  <X className="h-4 w-4" />
                  <span>Back to Publications</span>
                </button>

                <div className="flex gap-2">
                  <button 
                    onClick={(e) => handleLikeToggle(selectedArticle.id, e as any)}
                    className={`rounded-lg p-2 ${likedArticles[selectedArticle.id] ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'}`}
                    id="blog-detail-like"
                  >
                    <Heart className={`h-4.5 w-4.5 ${likedArticles[selectedArticle.id] ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Title & category */}
              <span className="rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {selectedArticle.category}
              </span>

              <h1 className="font-sans text-2xl font-black tracking-tight text-emerald-950 mt-4 sm:text-3xl leading-snug">
                {selectedArticle.title}
              </h1>

              {/* Meta stats bar */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-900/60 leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-950 border-r border-emerald-100 pr-3 mr-1">{selectedArticle.author}</span>
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="h-3 w-px bg-emerald-100" />
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>{selectedArticle.readTime} reading time</span>
                </div>
              </div>

              {/* Banner Cover picture */}
              <div className="my-6 overflow-hidden rounded-2xl border border-emerald-50 h-56 sm:h-72">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content body rendered with customized pure tailwind typography classes */}
              <div 
                className="prose prose-emerald max-w-none text-sm text-emerald-950 leading-relaxed font-sans space-y-5"
                id="article-markdown-body"
              >
                {/* Simply map markdown text lines dynamically into beautiful clean nodes */}
                {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={index} className="text-base font-extrabold text-emerald-950 border-b border-emerald-50 pb-2 mt-6">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  } else if (paragraph.startsWith('*')) {
                    return (
                      <ul key={index} className="list-disc pl-5 mt-2 space-y-1.5 text-xs text-emerald-900/85">
                        {paragraph.split('\n').map((li, liIdx) => (
                          <li key={liIdx}>
                            {/* Format bold within li */}
                            {(() => {
                              const itemText = li.replace('*', '').trim();
                              const parts = itemText.split('**');
                              if (parts.length > 2) {
                                return (
                                  <>
                                    <strong>{parts[1]}</strong>
                                    {parts.slice(2).join('')}
                                  </>
                                );
                              }
                              return itemText;
                            })()}
                          </li>
                        ))}
                      </ul>
                    );
                  } else if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
                    // Styled ordered list rendering
                    return (
                      <ol key={index} className="list-decimal pl-5 mt-2 space-y-2 text-xs text-emerald-900/85">
                        {paragraph.split('\n').map((li, liIdx) => {
                          const cleanedLi = li.replace(/^\d+\.\s+/, '').trim();
                          const parts = cleanedLi.split('**');
                          return (
                            <li key={liIdx}>
                              {parts.length > 2 ? (
                                <>
                                  <strong>{parts[1]}</strong>
                                  {parts.slice(2).join('')}
                                </>
                              ) : (
                                cleanedLi
                              )}
                            </li>
                          );
                        })}
                      </ol>
                    );
                  } else {
                    // Regular paragraph text formatting bold tokens beautifully
                    const parts = paragraph.split('**');
                    if (parts.length > 2) {
                      return (
                        <p key={index} className="leading-relaxed">
                          {parts.map((p, pIdx) => (pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-emerald-950">{p}</strong> : p))}
                        </p>
                      );
                    }
                    return <p key={index} className="leading-relaxed">{paragraph}</p>;
                  }
                })}
              </div>

              {/* Recommended Action CTA bottom */}
              <div className="mt-10 border-t border-emerald-55 pt-6 bg-emerald-50/30 rounded-2xl p-6 border border-emerald-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Enjoyed the journal?</h4>
                  <p className="text-[11px] text-emerald-900/70 mt-0.5">Explore our certified organically milled formulas inside the shop.</p>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2.5 px-4 self-start sm:self-center uppercase tracking-wider transition-colors"
                >
                  Close Article Reader
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
