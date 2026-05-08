import React from 'react';
import useStore from '../../store/useStore';
import { User, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Astronauts = () => {
  const { astronauts } = useStore();

  if (!astronauts) {
    return (
      <div className="glass dark:glass-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-800 h-full animate-pulse">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-12 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass dark:glass-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-800 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-500" />
          People in Space
        </h3>
        <span className="px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-bold">
          {astronauts.length} Total
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {astronauts.map((astro, index) => (
          <motion.div
            key={astro.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{astro.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Craft: {astro.craft}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Astronauts;
