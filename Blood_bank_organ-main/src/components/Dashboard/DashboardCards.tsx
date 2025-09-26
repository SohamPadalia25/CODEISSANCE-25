import React from 'react';
import { Droplets, Users, AlertTriangle, Activity, TrendingUp, Clock } from 'lucide-react';

const DashboardCards: React.FC = () => {
  const cards = [
    {
      title: 'Active Requests',
      value: '23',
      change: '+12%',
      changeType: 'increase' as const,
      icon: Droplets,
      color: 'red'
    },
    {
      title: 'Total Patients',
      value: '156',
      change: '+8%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Critical Alerts',
      value: '5',
      change: '-15%',
      changeType: 'decrease' as const,
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      title: 'Available Donors',
      value: '89',
      change: '+5%',
      changeType: 'increase' as const,
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Response Rate',
      value: '94%',
      change: '+2%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Avg Response Time',
      value: '45min',
      change: '-8min',
      changeType: 'decrease' as const,
      icon: Clock,
      color: 'blue'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm font-medium ${
                    card.changeType === 'increase'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {card.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  vs last week
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(card.color)}`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;