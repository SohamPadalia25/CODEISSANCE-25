import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Calendar,
  Users,
  Droplets,
  AlertTriangle,
  Clock,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  MapPin
} from 'lucide-react';

// Recharts for professional charts
import {
  BarChart,
  Bar,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';

// Types
interface BloodTypeDistribution {
  type: string;
  percentage: number;
  currentStock: number;
  criticalLevel: number;
}

interface MonthlyData {
  month: string;
  donations: number;
  requests: number;
  fulfillmentRate: number;
  responseTime: number;
}

interface AnalyticsData {
  totalDonations: number;
  totalRequests: number;
  averageResponseTime: number;
  criticalShortages: number;
  monthlyTrends: MonthlyData[];
}

interface EmergencyDepartment {
  department: string;
  patients: number;
  critical: number;
  bloodRequired: boolean;
}

// Mock Data Generator
const generateMonthlyData = (timeRange: '6months' | '12months' | 'year'): MonthlyData[] => {
  const baseData = [
    { month: 'Jan', donations: 45, requests: 38, fulfillmentRate: 92, responseTime: 25 },
    { month: 'Feb', donations: 52, requests: 45, fulfillmentRate: 94, responseTime: 23 },
    { month: 'Mar', donations: 48, requests: 42, fulfillmentRate: 91, responseTime: 26 },
    { month: 'Apr', donations: 60, requests: 52, fulfillmentRate: 96, responseTime: 21 },
    { month: 'May', donations: 55, requests: 48, fulfillmentRate: 93, responseTime: 24 },
    { month: 'Jun', donations: 58, requests: 50, fulfillmentRate: 95, responseTime: 22 },
  ];

  if (timeRange === '12months') {
    return [
      ...baseData,
      { month: 'Jul', donations: 62, requests: 55, fulfillmentRate: 97, responseTime: 20 },
      { month: 'Aug', donations: 58, requests: 52, fulfillmentRate: 95, responseTime: 22 },
      { month: 'Sep', donations: 65, requests: 58, fulfillmentRate: 98, responseTime: 19 },
      { month: 'Oct', donations: 70, requests: 62, fulfillmentRate: 96, responseTime: 21 },
      { month: 'Nov', donations: 68, requests: 60, fulfillmentRate: 97, responseTime: 20 },
      { month: 'Dec', donations: 75, requests: 65, fulfillmentRate: 98, responseTime: 18 },
    ];
  }

  if (timeRange === 'year') {
    return [
      { month: 'Q1', donations: 145, requests: 125, fulfillmentRate: 92, responseTime: 25 },
      { month: 'Q2', donations: 173, requests: 150, fulfillmentRate: 95, responseTime: 22 },
      { month: 'Q3', donations: 195, requests: 175, fulfillmentRate: 97, responseTime: 20 },
      { month: 'Q4', donations: 218, requests: 187, fulfillmentRate: 98, responseTime: 18 },
    ];
  }

  return baseData;
};

const mockAnalytics: AnalyticsData = {
  totalDonations: 1247,
  totalRequests: 1085,
  averageResponseTime: 23,
  criticalShortages: 2,
  monthlyTrends: generateMonthlyData('6months')
};

const emergencyData: EmergencyDepartment[] = [
  { department: 'ER', patients: 12, critical: 3, bloodRequired: true },
  { department: 'ICU', patients: 8, critical: 5, bloodRequired: true },
  { department: 'Surgery', patients: 6, critical: 2, bloodRequired: false },
  { department: 'Oncology', patients: 4, critical: 1, bloodRequired: true },
  { department: 'Cardiology', patients: 3, critical: 1, bloodRequired: false },
];

const bloodTypeData: BloodTypeDistribution[] = [
  { type: 'O+', percentage: 35, currentStock: 45, criticalLevel: 15 },
  { type: 'O-', percentage: 15, currentStock: 18, criticalLevel: 5 },
  { type: 'A+', percentage: 25, currentStock: 32, criticalLevel: 10 },
  { type: 'A-', percentage: 8, currentStock: 10, criticalLevel: 3 },
  { type: 'B+', percentage: 12, currentStock: 15, criticalLevel: 4 },
  { type: 'B-', percentage: 3, currentStock: 4, criticalLevel: 1 },
  { type: 'AB+', percentage: 1.5, currentStock: 2, criticalLevel: 1 },
  { type: 'AB-', percentage: 0.5, currentStock: 1, criticalLevel: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC0CB', '#A4DE6C'];

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'6months' | '12months' | 'year'>('6months');
  const [activeChart, setActiveChart] = useState<'donations' | 'requests'>('donations');
  const [analytics] = useState<AnalyticsData>(mockAnalytics);

  // Generate dynamic data based on time range
  const monthlyData = useMemo(() => generateMonthlyData(timeRange), [timeRange]);

  const handleTimeRangeChange = (range: '6months' | '12months' | 'year') => {
    setTimeRange(range);
  };

  const handleGenerateReport = () => {
    // Simulate report generation
    alert(`Generating analytics report for ${timeRange}...`);
    // In real application, this would download a PDF or open a report modal
  };

  const handleQuickAction = (action: string) => {
    alert(`Opening ${action} panel...`);
    // In real application, this would navigate to respective sections
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="flex items-center space-x-3 mb-4 lg:mb-0">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-xl">
            <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hospital Blood Bank Analytics</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real-time insights and performance metrics for blood management
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select 
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value as any)}
              className="bg-transparent border-none text-sm focus:ring-0"
            >
              <option value="6months">Last 6 months</option>
              <option value="12months">Last 12 months</option>
              <option value="year">This year</option>
            </select>
          </div>
          
          <button 
            onClick={handleGenerateReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Current Blood Inventory */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Current Inventory</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.totalDonations.toLocaleString()} units
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">+15.2% from last month</span>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg">
              <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Critical Shortages */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Critical Shortages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.criticalShortages} types
              </p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">-25% improvement</span>
              </div>
            </div>
            <div className="bg-red-100 dark:bg-red-800 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Average Response Time */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.averageResponseTime} min
              </p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">-12.3% faster</span>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-800 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Active Donors */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Active Donors</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1,247
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">+8.7% growth</span>
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly Trends Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Blood Usage Trends</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveChart('donations')}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  activeChart === 'donations' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                Donations
              </button>
              <button 
                onClick={() => setActiveChart('requests')}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  activeChart === 'requests' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                Requests
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} units`, activeChart === 'donations' ? 'Donations' : 'Requests']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey={activeChart} 
                name={activeChart === 'donations' ? 'Donations' : 'Requests'} 
                fill={activeChart === 'donations' ? '#10B981' : '#3B82F6'} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Blood Type Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Blood Type Distribution & Stock Levels</h3>
          <div className="flex flex-col lg:flex-row items-center">
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={bloodTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percentage }) => `${type} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {bloodTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </RePieChart>
            </ResponsiveContainer>
            <div className="w-full lg:w-1/2 space-y-3 mt-4 lg:mt-0 lg:pl-4">
              {bloodTypeData.map((type, index) => (
                <div key={type.type} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="font-medium text-sm">{type.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{type.currentStock} units</div>
                    <div className={`text-xs font-medium ${
                      type.currentStock <= type.criticalLevel 
                        ? 'text-red-500' 
                        : type.currentStock <= type.criticalLevel * 2 
                        ? 'text-amber-500' 
                        : 'text-green-500'
                    }`}>
                      {type.currentStock <= type.criticalLevel ? 'Critical' : 
                       type.currentStock <= type.criticalLevel * 2 ? 'Low' : 'Safe'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Department Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Emergency Department Status
          </h3>
          <div className="space-y-3">
            {emergencyData.map((dept, index) => (
              <div key={dept.department} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-sm">{dept.department}</div>
                    <div className="text-xs text-gray-500">
                      {dept.patients} patients • {dept.critical} critical
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  dept.bloodRequired 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {dept.bloodRequired ? 'Blood Required' : 'Stable'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Trends</h3>
            <LineChartIcon className="w-5 h-5 text-gray-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ReLineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Fulfillment Rate') return [`${value}%`, name];
                  return [value, name];
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="fulfillmentRate" 
                name="Fulfillment Rate" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="responseTime" 
                name="Response Time (min)" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
              />
            </ReLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickAction('Donor Management')}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
          >
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Manage Donors</span>
          </button>
          <button 
            onClick={() => handleQuickAction('Inventory Check')}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
          >
            <Droplets className="w-6 h-6 text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Inventory Check</span>
          </button>
          <button 
            onClick={() => handleQuickAction('Emergency Alert')}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
          >
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Emergency Alert</span>
          </button>
          <button 
            onClick={handleGenerateReport}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
          >
            <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Generate Report</span>
          </button>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Donations</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">+58</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">95.4%</p>
            </div>
            <PieChartIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Resolution</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">23min</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;