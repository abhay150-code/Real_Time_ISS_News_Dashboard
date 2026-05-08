import React from 'react';
import useStore from '../../store/useStore';
import { Compass, Navigation, Zap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, unit }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass dark:glass-dark p-4 rounded-xl flex items-center gap-4 border border-slate-200 dark:border-slate-800"
  >
    <div className="p-3 bg-brand-100 dark:bg-brand-900/30 rounded-lg text-brand-600 dark:text-brand-400">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <div className="flex items-baseline gap-1">
        <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
        {unit && <span className="text-sm text-slate-500 dark:text-slate-400">{unit}</span>}
      </div>
    </div>
  </motion.div>
);

const IssStats = () => {
  const { issData, issHistory } = useStore();

  if (!issData) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        icon={Navigation} 
        label="Latitude" 
        value={issData.lat.toFixed(4)} 
        unit="°" 
      />
      <StatCard 
        icon={Compass} 
        label="Longitude" 
        value={issData.lon.toFixed(4)} 
        unit="°" 
      />
      <StatCard 
        icon={Zap} 
        label="Speed" 
        value={Math.round(issData.speed).toLocaleString()} 
        unit="km/h" 
      />
      <StatCard 
        icon={MapPin} 
        label="Nearest Location" 
        value={issData.locationName} 
        unit="" 
      />
    </div>
  );
};

export default IssStats;
