import React from 'react';
import useStore from '../../store/useStore';
import { Sun, Moon, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 glass dark:glass-dark px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <Rocket className="w-8 h-8 text-brand-500" />
        </motion.div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-cyan-400">
          OrbitIQ
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          System Online
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
