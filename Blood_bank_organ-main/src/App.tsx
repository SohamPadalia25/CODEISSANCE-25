import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import DashboardCards from './components/Dashboard/DashboardCards';
import BloodRequestManager from './components/BloodRequests/BloodRequestManager';
import InventoryMonitor from './components/Inventory/InventoryMonitor';
import PatientManager from './components/Patients/PatientManager';
import EmergencyRequests from './components/Emergency/EmergencyRequests';
import MatchedDonors from './components/Donors/MatchedDonors';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import StaffManager from './components/Staff/StaffManager';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardCards />;
      case 'requests':
      case 'requests-active':
      case 'requests-history':
        return <BloodRequestManager />;
      case 'inventory':
      case 'inventory-blood':
      case 'inventory-organs':
        return <InventoryMonitor />;
      case 'patients':
        return <PatientManager />;
      case 'emergency':
        return <EmergencyRequests />;
      case 'donors':
        return <MatchedDonors />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'staff':
        return <StaffManager />;
      default:
        return <DashboardCards />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          <div className="flex-1">
            <Header />
            <main className="p-6">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;