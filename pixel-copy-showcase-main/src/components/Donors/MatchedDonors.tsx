import React, { useState } from 'react';
import { Users, MapPin, Phone, Calendar, Star, CheckCircle } from 'lucide-react';
import { MatchedDonor } from '../../types';
import { mockMatchedDonors } from '../../utils/mockData';

const MatchedDonors: React.FC = () => {
  const [matchedDonors] = useState<MatchedDonor[]>(mockMatchedDonors);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Not Available': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 95) return 'text-green-600 dark:text-green-400';
    if (compatibility >= 85) return 'text-blue-600 dark:text-blue-400';
    if (compatibility >= 75) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getCompatibilityStars = (compatibility: number) => {
    const stars = Math.ceil(compatibility / 20);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < stars 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Matched Donors</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI-suggested donor matches based on compatibility and availability</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {matchedDonors.map((donor) => (
          <div
            key={donor.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {donor.name}
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    {donor.bloodType}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(donor.availability)}`}>
                {donor.availability}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Compatibility</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-bold ${getCompatibilityColor(donor.compatibility)}`}>
                    {donor.compatibility}%
                  </span>
                  <div className="flex space-x-1">
                    {getCompatibilityStars(donor.compatibility)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Distance</span>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {donor.distance} km
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Donation</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {donor.lastDonation.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-1 text-sm transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-1 text-sm transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  <span>Match</span>
                </button>
              </div>
            </div>

            {donor.compatibility >= 95 && (
              <div className="mt-4 p-2 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-green-600 dark:text-green-400 fill-current" />
                  <span className="text-xs font-medium text-green-800 dark:text-green-400">
                    Premium match - Excellent compatibility
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Donor Matching Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">89</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Available Donors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">High Compatibility</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">3.2km</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Distance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">92%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Match Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchedDonors;