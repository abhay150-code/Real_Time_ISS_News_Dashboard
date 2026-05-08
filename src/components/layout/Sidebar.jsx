import React from 'react';
import { LayoutDashboard, Globe2, Newspaper, Settings } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Globe2, label: 'ISS Live', id: 'iss-live' },
  { icon: Newspaper, label: 'News Feed', id: 'news-feed' },
  { icon: Settings, label: 'Settings', id: 'settings' }
];

const Sidebar = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-20 md:w-64 glass dark:glass-dark border-r border-slate-200 dark:border-slate-800 transition-all z-40 flex flex-col pt-6">
      <nav className="flex flex-col gap-2 px-3 md:px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="flex items-center gap-3 p-3 md:px-4 md:py-3 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
          >
            <item.icon className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
