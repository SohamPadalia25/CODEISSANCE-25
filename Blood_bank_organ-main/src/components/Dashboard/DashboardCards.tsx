import React, { useState } from 'react';
import { Droplets, Users, AlertTriangle, Activity, TrendingUp, Clock, Heart, PlusCircle } from 'lucide-react';
import { mockEmergencyRequests } from '../../utils/mockData';
import { EmergencyRequest } from '../../types';
import { Chart } from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, LinearScale, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const DashboardCards: React.FC = () => {
  const [emergencyRequests] = useState<EmergencyRequest[]>(mockEmergencyRequests);

  const cards = [
    { title: 'Active Blood Requests', value: emergencyRequests.filter(r => r.type === 'Blood').length, icon: Droplets, color: 'red' },
    { title: 'Active Organ Requests', value: emergencyRequests.filter(r => r.type === 'Organ').length, icon: Heart, color: 'pink' },
    { title: 'Total Patients', value: 156, icon: Users, color: 'blue' },
    { title: 'Critical Alerts', value: emergencyRequests.filter(r => r.urgency === 'Critical').length, icon: AlertTriangle, color: 'amber' },
    { title: 'Available Donors', value: 89, icon: Activity, color: 'green' },
    { title: 'Response Rate', value: '94%', icon: TrendingUp, color: 'green' },
    { title: 'Avg Response Time', value: '45min', icon: Clock, color: 'blue' }
  ];

  const getColorClasses = (color: string) => {
    const colors: any = {
      red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
      pink: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
    };
    return colors[color];
  };

  const inventoryData = {
    labels: ['Blood A', 'Blood B', 'Blood O', 'Organ Kidney', 'Organ Liver'],
    datasets: [
      {
        label: 'Inventory',
        data: [12, 19, 7, 5, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <PlusCircle className="w-5 h-5 mr-2" />
          New Request
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border p-6 flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(card.color)}`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Chart */}
      <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Blood & Organ Inventory</h2>
        <Chart type="bar" data={inventoryData} />
      </div>

      {/* Latest Requests Table */}
      <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Latest Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Patient</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {emergencyRequests.slice(0, 5).map(req => (
                <tr key={req.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{req.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{req.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{req.urgency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{req.patientName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
