import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route,Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// First App pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DonorDashboard from "./pages/DonorDashboard";
import IndexMain from "./pages/Index";   // public landing
import IndexDonor from "./pages/Index1"; // donor landing

// Second App pages
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import BloodDashboard from "./pages/BloodDashboard";
import Inventory from "./pages/Inventory";
import Donations from "./pages/Donations";
import Quality from "./pages/Quality";
import Distribution from "./pages/Distribution";
import Reports from "./pages/Reports";
import Monitoring from "./pages/Monitoring";

// Shared pages
import Profile from "./pages/Profile";
import History from "./pages/History";
import Requests from "./pages/Requests";
import Alerts from "./pages/Alerts";
import Appointments from "./pages/Appointments";
import Health from "./pages/Health";
import NotFound from "./pages/NotFound";
import AIAssistant from "./pages/Assistance";


import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import BloodRequestManager from "./components/BloodRequests/BloodRequestManager";
import PatientManager from "./components/Patients/PatientManager";
import EmergencyRequests from "./components/Emergency/EmergencyRequests";
import MatchedDonors from "./components/Donors/MatchedDonors";
import AnalyticsDashboard from "./components/Analytics/AnalyticsDashboard";
import StaffManager from "./components/Staff/StaffManager";
const queryClient = new QueryClient();

const HospitalDashboardLayout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          {/* Public / Landing Routes */}
          <Route path="/" element={<IndexMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/donor-index" element={<IndexDonor />} />

          {/* Donor-specific pages */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/health" element={<Health />} />
          <Route path="/assistance" element={<AIAssistant/>}/>

          

          {/* Dashboard (second app) routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<BloodDashboard />} />
  <Route path="/dashboard/inventory" element={<Inventory />} />
  <Route path="donations" element={<Donations />} />
  <Route path="quality" element={<Quality />} />
  <Route path="distribution" element={<Distribution />} />
  {/* <Route path="/appointments1" element={<Appointments />} /> */}
  <Route path="reports" element={<Reports />} />
  <Route path="monitoring" element={<Monitoring />} />
</Route>

<Route path="/hospital" element={<HospitalDashboardLayout />}>
            <Route index element={<BloodDashboard />} />
            <Route path="requests" element={<BloodRequestManager />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="patients" element={<PatientManager />} />
            <Route path="emergency" element={<EmergencyRequests />} />
            <Route path="donors" element={<MatchedDonors />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="staff" element={<StaffManager />} />
            {/* <Route path="donations" element={<Donations />} />
            <Route path="quality" element={<Quality />} />
            <Route path="distribution" element={<Distribution />} />
            <Route path="reports" element={<Reports />} />
            <Route path="monitoring" element={<Monitoring />} /> */}
          </Route>


          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
