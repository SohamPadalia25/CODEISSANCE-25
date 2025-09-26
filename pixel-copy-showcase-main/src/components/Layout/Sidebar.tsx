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
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['inventory']);

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

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  const handleClick = (path: string, itemId: string) => {
    navigate(path);
  };

  return (
    <aside className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-red-600 rounded-lg p-2">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Blood Bank</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Community Hospital</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  handleClick(item.path, item.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                  location.pathname === item.path
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </button>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
