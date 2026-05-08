import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useStore from '../store/useStore';

const SpeedChart = () => {
  const { issSpeedHistory, theme } = useStore();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';

  if (issSpeedHistory.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse">
        <p className="text-slate-400">Waiting for speed data...</p>
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={issSpeedHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke={textColor} 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke={textColor} 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${gridColor}`,
              borderRadius: '0.5rem',
              color: isDark ? '#f8fafc' : '#0f172a'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="speed" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: isDark ? '#0f172a' : '#ffffff' }}
            activeDot={{ r: 6, fill: '#0ea5e9' }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpeedChart;
