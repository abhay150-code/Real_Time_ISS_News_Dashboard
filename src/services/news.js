import axios from 'axios';

const CACHE_KEY = 'news_cache';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export const getNews = async (forceRefresh = false) => {
  if (!forceRefresh) {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  if (!apiKey) {
    throw new Error('News API Key is missing. Please set VITE_NEWS_API_KEY in .env');
  }

  try {
    // Note: Free tier only works on localhost, might fail on production/Vercel
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${apiKey}`);
    
    if (response.data && response.data.articles) {
      const articles = response.data.articles.filter(a => a.title && a.title !== '[Removed]');
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: articles,
        timestamp: Date.now()
      }));
      return articles;
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch news:', error);
    throw error;
  }
};
