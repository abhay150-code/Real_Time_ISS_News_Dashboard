import React from 'react';
import IssMap from './IssMap';
import IssStats from './IssStats';
import Astronauts from './Astronauts';
import { useISSData } from '../../hooks/useISSData';
import { RefreshCw } from 'lucide-react';

const IssTracker = () => {
  const { refresh } = useISSData();

  return (
    <section id="iss-live" className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">ISS Live Tracking</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time coordinates, telemetry, and crew data</p>
        </div>
        <button 
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors shadow-lg shadow-brand-500/20 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Refresh Data</span>
        </button>
      </div>

      <IssStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-2xl">
          <IssMap />
        </div>
        <div className="h-full">
          <Astronauts />
        </div>
      </div>
    </section>
  );
};

export default IssTracker;
