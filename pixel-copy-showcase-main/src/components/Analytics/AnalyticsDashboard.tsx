import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Activity, Calendar } from 'lucide-react';
import { AnalyticsData } from '../../types';
import { mockAnalytics } from '../../utils/mockData';

const AnalyticsDashboard: React.FC = () => {
  const [analytics] = useState<AnalyticsData>(mockAnalytics);

  const maxValue = Math.max(...analytics.monthlyTrends.map(d => Math.max(d.donations, d.requests)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Insights into donations, requests, and system performance</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Donations</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analytics.totalDonations.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">+15.2%</span>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Requests</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analytics.totalRequests.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">+8.7%</span>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Response Time</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {analytics.averageResponseTime}min
              </p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">-12.3%</span>
              </div>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Critical Shortages</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {analytics.criticalShortages}
              </p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">-25%</span>
              </div>
            </div>
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Monthly Trends</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Donations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Requests</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analytics.monthlyTrends.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex justify-center space-x-1 items-end" style={{ height: '200px' }}>
                  <div
                    className="bg-green-500 rounded-t-sm w-4 transition-all duration-300 hover:bg-green-600"
                    style={{
                      height: `${(data.donations / maxValue) * 180}px`,
                      minHeight: '4px'
                    }}
                    title={`Donations: ${data.donations}`}
                  ></div>
                  <div
                    className="bg-blue-500 rounded-t-sm w-4 transition-all duration-300 hover:bg-blue-600"
                    style={{
                      height: `${(data.requests / maxValue) * 180}px`,
                      minHeight: '4px'
                    }}
                    title={`Requests: ${data.requests}`}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {data.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Blood Type Distribution</h3>
          <div className="space-y-3">
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((type, index) => {
              const percentage = [35, 15, 25, 8, 12, 3, 1.5, 0.5][index];
              return (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{type}</span>
                  <div className="flex items-center space-x-2 flex-1 ml-4">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-10 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Donation Fulfillment Rate</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">94.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Donor Response</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">23min</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Resolution</span>
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">87.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Inventory Turnover</span>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">12.4 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;