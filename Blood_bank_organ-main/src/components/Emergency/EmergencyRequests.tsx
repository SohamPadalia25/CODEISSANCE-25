import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Phone, Zap } from 'lucide-react';
import { EmergencyRequest } from '../../types';
import { mockEmergencyRequests } from '../../utils/mockData';

const EmergencyRequests: React.FC = () => {
  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>(mockEmergencyRequests);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState<EmergencyRequest | null>(null);

  const [formData, setFormData] = useState({
    type: 'Blood',
    urgency: 'Critical',
    patientName: '',
    location: '',
    bloodType: '',
    organType: '',
    responses: 0,
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-500 text-white animate-pulse';
      case 'Emergency':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Blood':
        return <div className="w-3 h-3 bg-red-500 rounded-full" />;
      case 'Organ':
        return <div className="w-3 h-3 bg-blue-500 rounded-full" />;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full" />;
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: EmergencyRequest = {
      id: (Math.random() * 100000).toFixed(0),
      ...formData,
      requestedAt: new Date(),
      responses: Number(formData.responses),
    };
    setEmergencyRequests([newRequest, ...emergencyRequests]);
    setShowForm(false);
    setFormData({
      type: 'Blood',
      urgency: 'Critical',
      patientName: '',
      location: '',
      bloodType: '',
      organType: '',
      responses: 0,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Emergency SOS</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Active emergency requests requiring immediate attention
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Zap className="w-4 h-4" />
          <span>New Emergency</span>
        </button>
      </div>

      {/* Emergency List */}
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
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(
                    request.urgency
                  )}`}
                >
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{request.patientName}</h3>
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
                  <p className="font-semibold text-green-600 dark:text-green-400">{request.responses} donors</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Contact Donors</span>
              </button>
              <button
                onClick={() => setShowDetails(request)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Emergency Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Emergency</h3>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option>Blood</option>
                  <option>Organ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Urgency</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option>Critical</option>
                  <option>Emergency</option>
                  <option>Normal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {formData.type === 'Blood' && (
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300">Blood Type</label>
                  <input
                    type="text"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              {formData.type === 'Organ' && (
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300">Organ Type</label>
                  <input
                    type="text"
                    name="organType"
                    value={formData.organType}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Responses</label>
                <input
                  type="number"
                  name="responses"
                  value={formData.responses}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Details</h3>
            <div className="space-y-2">
              <p><strong>Type:</strong> {showDetails.type}</p>
              <p><strong>Urgency:</strong> {showDetails.urgency}</p>
              <p><strong>Patient Name:</strong> {showDetails.patientName}</p>
              <p><strong>Location:</strong> {showDetails.location}</p>
              <p><strong>Blood Type:</strong> {showDetails.bloodType}</p>
              <p><strong>Organ Type:</strong> {showDetails.organType}</p>
              <p><strong>Responses:</strong> {showDetails.responses}</p>
              <p><strong>Requested At:</strong> {showDetails.requestedAt.toLocaleString()}</p>
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowDetails(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyRequests;
