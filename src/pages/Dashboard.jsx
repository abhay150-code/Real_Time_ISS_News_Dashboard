import React from 'react';
import IssTracker from '../components/iss/IssTracker';
import NewsSection from '../components/news/NewsSection';
import Chatbot from '../components/chat/Chatbot';
import SpeedChart from '../charts/SpeedChart';
import { Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 relative">
      <header id="dashboard" className="pt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Mission Control
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
          Welcome to OrbitIQ. Monitoring orbital telemetry and global intelligence.
        </p>
      </header>

      {/* ISS Tracking Section */}
      <IssTracker />

      {/* Analytics Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-brand-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Orbital Analytics</h2>
        </div>
        <div className="glass dark:glass-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="font-semibold mb-6 text-slate-700 dark:text-slate-300">ISS Speed Velocity History</h3>
          <SpeedChart />
        </div>
      </section>

      {/* News Intelligence Section */}
      <NewsSection />

      {/* Floating Chatbot */}
      <Chatbot />
      
      {/* Footer space */}
      <div className="h-12"></div>
    </div>
  );
};

export default Dashboard;
