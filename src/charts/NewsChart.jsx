import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import useStore from '../store/useStore';

const COLORS = ['#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#f59e0b', '#f97316', '#ef4444', '#8b5cf6', '#d946ef'];

const NewsChart = ({ onPieClick }) => {
  const { newsSources, theme } = useStore();
  const isDark = theme === 'dark';

  if (newsSources.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse">
        <p className="text-slate-400">Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={newsSources}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            onClick={(data) => onPieClick && onPieClick(data.name)}
            style={{ cursor: 'pointer' }}
          >
            {newsSources.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
              borderRadius: '0.5rem',
              color: isDark ? '#f8fafc' : '#0f172a'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewsChart;
