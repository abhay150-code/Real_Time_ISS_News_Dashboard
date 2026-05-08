import axios from 'axios';

const CACHE_KEY = 'news_cache';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Spaceflight News API - Free, HTTPS, no API key needed
// https://api.spaceflightnewsapi.net/v4/docs/
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

  try {
    const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles?limit=12');
    
    if (response.data && response.data.results) {
      // Map Spaceflight News API format to our app's expected format
      const articles = response.data.results.map(article => ({
        title: article.title,
        description: article.summary,
        url: article.url,
        urlToImage: article.image_url,
        publishedAt: article.published_at,
        author: article.authors?.[0]?.name || article.news_site,
        source: {
          name: article.news_site
        }
      }));

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
