import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Phone, Zap } from 'lucide-react';
import { EmergencyRequest } from '../../types';
import { mockEmergencyRequests } from '../../utils/mockData';

const EmergencyRequests: React.FC = () => {
  const [emergencyRequests] = useState<EmergencyRequest[]>(mockEmergencyRequests);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-500 text-white animate-pulse';
      case 'Emergency': return 'bg-amber-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Blood': return <div className="w-3 h-3 bg-red-500 rounded-full" />;
      case 'Organ': return <div className="w-3 h-3 bg-blue-500 rounded-full" />;
      default: return <div className="w-3 h-3 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Emergency SOS</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active emergency requests requiring immediate attention</p>
          </div>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Zap className="w-4 h-4" />
          <span>New Emergency</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {emergencyRequests.map((request) => (
          <div
            key={request.id}
            className={`rounded-xl shadow-sm border p-6 ${
              request.urgency === 'Critical'
                ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/10'
                : 'border-amber-300 bg-amber-50 dark:border-amber-600 dark:bg-amber-900/10'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {getTypeIcon(request.type)}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {request.type}
                  </span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                  {request.urgency}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Request ID</div>
                <div className="font-mono text-sm">{request.id}</div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {request.patientName}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{request.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Required</span>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {request.bloodType || request.organType}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Responses</span>
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    {request.responses} donors
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Requested {request.requestedAt.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Contact Donors</span>
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                View Details
              </button>
            </div>

            {request.urgency === 'Critical' && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-800 dark:text-red-400">
                    CRITICAL: Immediate response required
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Response Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Emergencies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">17</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Responses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12min</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">94%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequests;