import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import useStore from '../../store/useStore';

const Layout = ({ children }) => {
  const initTheme = useStore(state => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 font-sans transition-colors duration-300">
      {/* Background Particles/Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <Navbar />
      <Sidebar />
      
      <main className="pt-20 pl-24 md:pl-72 pr-4 md:pr-8 pb-12 min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
