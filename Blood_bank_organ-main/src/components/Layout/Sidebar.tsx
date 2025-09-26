import React, { useState } from 'react';
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

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['inventory']);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'requests', 
      label: 'Blood Requests', 
      icon: Droplets,
      subItems: [
        { id: 'requests-active', label: 'Active Requests' },
        { id: 'requests-history', label: 'Request History' }
      ]
    },
    { 
      id: 'inventory', 
      label: 'Inventory', 
      icon: Heart,
      subItems: [
        { id: 'inventory-blood', label: 'Blood Inventory' },
        { id: 'inventory-organs', label: 'Organ Inventory' }
      ]
    },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'emergency', label: 'Emergency SOS', icon: AlertTriangle },
    { id: 'donors', label: 'Matched Donors', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'staff', label: 'Staff Management', icon: Settings },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

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
                  if (item.subItems) {
                    toggleExpanded(item.id);
                  } else {
                    onSectionChange(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                  activeSection === item.id || (item.subItems && activeSection.startsWith(item.id))
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.subItems && (
                  isExpanded(item.id) ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {item.subItems && isExpanded(item.id) && (
                <div className="mt-2 ml-8 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onSectionChange(subItem.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === subItem.id
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;