'use client';
import { useState } from 'react';

const ChartCard = ({ title, data, type = 'line' }) => {
  const [activeTab, setActiveTab] = useState('Week');
  const tabs = ['Week', 'Month', 'Year'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {type === 'bar' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">985,872</span>
            <div className="flex items-center space-x-2">
              <span className="text-green-600 text-sm">↑ 75%</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Subscribers</div>
          
          <div className="h-48 flex items-end justify-between space-x-2">
            {[240000, 192000, 144000, 96000, 48000].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex space-x-1">
                  <div 
                    className="bg-blue-500 rounded-t"
                    style={{ height: `${(height / 240000) * 120}px`, width: '40%' }}
                  />
                  <div 
                    className="bg-purple-500 rounded-t"
                    style={{ height: `${(height / 240000) * 100}px`, width: '40%' }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Gained</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Lost</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-green-500' : 
                  index === 1 ? 'bg-green-500' : 
                  index === 2 ? 'bg-green-500' : 'bg-green-500'
                }`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{item.value}</span>
                <span className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </span>
                <div className="w-24 h-8">
                  <svg className="w-full h-full" viewBox="0 0 96 32">
                    <path
                      d="M0,16 Q24,8 48,12 T96,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-300"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartCard;