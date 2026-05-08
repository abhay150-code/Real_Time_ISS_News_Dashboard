import React, { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import { getNews } from '../../services/news';
import NewsChart from '../../charts/NewsChart';
import { Search, RefreshCw, ExternalLink, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const NewsSection = () => {
  const { newsArticles, setNews } = useStore();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState(null);

  const fetchNews = async (force = false) => {
    setLoading(true);
    try {
      const articles = await getNews(force);
      setNews(articles);
    } catch (error) {
      toast.error('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = () => {
    fetchNews(true);
  };

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSource = filterSource ? article.source.name === filterSource : true;
    return matchesSearch && matchesSource;
  });

  return (
    <section id="news-feed" className="space-y-6 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI News Intelligence</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Latest curated tech and space headlines</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search news..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm w-full md:w-64"
            />
          </div>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 rounded-xl transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-slate-600 dark:text-slate-300 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 glass dark:glass-dark rounded-2xl p-4 border border-slate-200 dark:border-slate-800 h-[350px]">
          <h3 className="font-semibold mb-4 text-center text-slate-700 dark:text-slate-300">Sources Distribution</h3>
          <NewsChart onPieClick={(source) => setFilterSource(source === filterSource ? null : source)} />
          {filterSource && (
            <div className="text-center mt-2">
              <span className="text-xs px-2 py-1 bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 rounded-full cursor-pointer hover:bg-brand-200" onClick={() => setFilterSource(null)}>
                Clear Filter: {filterSource} ✕
              </span>
            </div>
          )}
        </div>

        <div className="lg:col-span-3">
          {loading && newsArticles.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredNews.map((article, index) => (
                  <motion.article 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="glass dark:glass-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group hover:border-brand-500/50 transition-colors flex flex-col h-full"
                  >
                    {article.urlToImage ? (
                      <div className="h-40 overflow-hidden relative">
                        <img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                        <span className="text-slate-400">No Image</span>
                      </div>
                    )}
                    
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold rounded-md">
                          {article.source.name}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 ml-auto">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.publishedAt)}
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 flex-1">
                        {article.description || 'No description available for this article.'}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                          <User className="w-3 h-3" />
                          <span className="truncate">{article.author || 'Unknown'}</span>
                        </div>
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                        >
                          Read More
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
              
              {filteredNews.length === 0 && !loading && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-lg">No articles found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
