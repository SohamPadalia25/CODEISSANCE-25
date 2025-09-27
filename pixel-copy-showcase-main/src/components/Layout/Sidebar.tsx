import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplets, 
  Users, 
  AlertTriangle, 
  UserCheck, 
  BarChart3, 
  Settings,
  Heart,
  LogOut
} from 'lucide-react';

// If using a toast library like react-hot-toast
import toast from 'react-hot-toast';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/hospital' },
    { id: 'requests', label: 'Blood Requests', icon: Droplets, path: '/hospital/requests' },
    { id: 'inventory', label: 'Inventory', icon: Heart, path: '/hospital/inventory' },
    { id: 'patients', label: 'Patients', icon: Users, path: '/hospital/patients' },
    { id: 'emergency', label: 'Emergency SOS', icon: AlertTriangle, path: '/hospital/emergency' },
    { id: 'donors', label: 'Matched Donors', icon: UserCheck, path: '/hospital/donors' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/hospital/analytics' },
    { id: 'staff', label: 'Staff Management', icon: Settings, path: '/hospital/staff' },
  ];

  const handleClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.clear();
    sessionStorage.clear();
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <aside className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 min-h-screen flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-red-600 rounded-lg p-2">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hospital </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Community Hospital</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                location.pathname === item.path
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;