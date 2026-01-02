'use client';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({ title, value, change, changeType, subtitle, color = 'blue' }) => {
  const isPositive = changeType === 'positive';
  
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex space-x-1">
          <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded">Today</button>
          <button className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Week</button>
          <button className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Month</button>
          <button className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Year</button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{subtitle}</div>
          <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{change}</span>
            <span className="text-gray-400">20,641 (prev)</span>
          </div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">98,534</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Page Impressions</div>
          <div className="flex items-center space-x-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>14%</span>
            <span className="text-gray-400">20,641 (prev)</span>
          </div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">12,142</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Page Likes</div>
          <div className="flex items-center space-x-1 text-sm text-red-600">
            <TrendingDown className="w-4 h-4" />
            <span>12%</span>
            <span className="text-gray-400">20,641 (prev)</span>
          </div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">1,432</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Page Impressions</div>
          <div className="flex items-center space-x-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>14%</span>
            <span className="text-gray-400">20,641 (prev)</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 h-32">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <path
            d="M0,80 Q50,60 100,70 T200,50 T300,60 T400,40"
            fill="none"
            stroke={color === 'green' ? '#10b981' : color === 'red' ? '#ef4444' : color === 'purple' ? '#8b5cf6' : color === 'orange' ? '#f59e0b' : '#3b82f6'}
            strokeWidth="2"
            className="opacity-80"
          />
          <path
            d="M0,90 Q50,70 100,80 T200,60 T300,70 T400,50"
            fill="none"
            stroke={color === 'green' ? '#10b981' : color === 'red' ? '#ef4444' : color === 'purple' ? '#8b5cf6' : color === 'orange' ? '#f59e0b' : '#3b82f6'}
            strokeWidth="2"
            className="opacity-60"
          />
        </svg>
      </div>
    </div>
  );
};

export default MetricCard;