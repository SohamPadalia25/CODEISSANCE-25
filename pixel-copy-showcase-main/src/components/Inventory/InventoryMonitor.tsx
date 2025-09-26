import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, TrendingUp, Droplet, Heart } from 'lucide-react';
import { BloodInventory, OrganInventory } from '../../types';
import { mockBloodInventory, mockOrganInventory } from '../../utils/mockData';

const InventoryMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blood' | 'organs'>('blood');
  const [bloodInventory] = useState<BloodInventory[]>(mockBloodInventory);
  const [organInventory] = useState<OrganInventory[]>(mockOrganInventory);

  const isLowStock = (available: number, threshold: number) => available < threshold;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Monitor</h2>
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('blood')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'blood'
                ? 'bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Droplet className="w-4 h-4 inline mr-2" />
            Blood Inventory
          </button>
          <button
            onClick={() => setActiveTab('organs')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'organs'
                ? 'bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Heart className="w-4 h-4 inline mr-2" />
            Organ Inventory
          </button>
        </div>
      </div>

      {activeTab === 'blood' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodInventory.map((item) => (
            <div
              key={item.bloodType}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-6 ${
                isLowStock(item.unitsAvailable, item.minThreshold)
                  ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                    <Droplet className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.bloodType}
                  </h3>
                </div>
                {isLowStock(item.unitsAvailable, item.minThreshold) && (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
                    <span className={`text-2xl font-bold ${
                      isLowStock(item.unitsAvailable, item.minThreshold)
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {item.unitsAvailable}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        isLowStock(item.unitsAvailable, item.minThreshold)
                          ? 'bg-red-500'
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${Math.min((item.unitsAvailable / (item.minThreshold * 2)) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Min: {item.minThreshold}</span>
                    <span>
                      {isLowStock(item.unitsAvailable, item.minThreshold) ? 'Low Stock' : 'Good Stock'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <div className="flex items-center space-x-1">
                      {isLowStock(item.unitsAvailable, item.minThreshold) ? (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-500" />
                          <span className="text-red-600 dark:text-red-400 font-medium">Critical</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 dark:text-green-400 font-medium">Normal</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'organs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organInventory.map((item) => (
            <div
              key={item.organType}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                  <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.organType}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {item.available}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
                  <span className="text-lg font-semibold text-amber-600 dark:text-amber-400">
                    {item.pending}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">
                    Compatible Blood Types
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.compatibility.map((bloodType) => (
                      <span
                        key={bloodType}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {bloodType}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryMonitor;