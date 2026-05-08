import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Theme state
  theme: localStorage.getItem('theme') || 'dark',
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    set({ theme: newTheme });
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  initTheme: () => {
    const theme = get().theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  // ISS State
  issData: null,
  issHistory: [], // Max 15 positions
  issSpeedHistory: [],
  astronauts: null,
  addIssPosition: (position, speed) => set((state) => {
    const newHistory = [...state.issHistory, position].slice(-15);
    const newSpeedHistory = speed > 0 ? [...state.issSpeedHistory, { time: new Date().toLocaleTimeString(), speed: Math.round(speed) }].slice(-15) : state.issSpeedHistory;
    return {
      issHistory: newHistory,
      issSpeedHistory: newSpeedHistory,
      issData: { ...position, speed }
    };
  }),
  setAstronauts: (astronauts) => set({ astronauts }),

  // News State
  newsArticles: [],
  newsSources: [], // for doughnut chart
  setNews: (articles) => {
    // calculate sources distribution
    const sourcesCount = articles.reduce((acc, article) => {
      const sourceName = article.source.name || 'Unknown';
      acc[sourceName] = (acc[sourceName] || 0) + 1;
      return acc;
    }, {});
    const sources = Object.entries(sourcesCount).map(([name, value]) => ({ name, value }));
    set({ newsArticles: articles, newsSources: sources });
  },

  // AI Chat State
  chatHistory: JSON.parse(localStorage.getItem('chatHistory') || '[]'),
  addChatMessage: (msg) => set((state) => {
    const newHistory = [...state.chatHistory, msg].slice(-30);
    localStorage.setItem('chatHistory', JSON.stringify(newHistory));
    return { chatHistory: newHistory };
  }),
  clearChat: () => {
    localStorage.removeItem('chatHistory');
    set({ chatHistory: [] });
  }
}));

export default useStore;
