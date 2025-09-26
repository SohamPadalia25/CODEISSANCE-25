import React, { useState } from 'react';
import { Plus, Search, Filter, User, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Patient } from '../../types';
import { mockPatients } from '../../utils/mockData';

const PatientManager: React.FC = () => {
  const [patients] = useState<Patient[]>(mockPatients);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Discharged': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Critical': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'Active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Discharged': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {patient.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getStatusIcon(patient.status)}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Age</span>
                <p className="font-semibold text-gray-900 dark:text-white">{patient.age} years</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Blood Type</span>
                <p className="font-semibold text-red-600 dark:text-red-400">{patient.bloodType}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Condition</span>
                <p className="font-semibold text-gray-900 dark:text-white">{patient.condition}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Doctor</span>
                <p className="font-semibold text-gray-900 dark:text-white">{patient.assignedDoctor}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Admitted: {patient.admittedDate.toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                    Edit
                  </button>
                  <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Patient Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">156</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Patients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">134</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">10</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Discharged Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManager;