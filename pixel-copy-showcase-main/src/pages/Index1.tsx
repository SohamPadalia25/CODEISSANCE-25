import { SidebarProvider } from "@/components/ui/sidebar";
import { DonorSidebar } from "@/components/DonorSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardStats } from "@/components/DashboardStats";
import { EmergencyAlerts } from "@/components/EmergencyAlerts";
import { DonationChart } from "@/components/DonationChart";
import { QuickActions } from "@/components/QuickActions";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DonorSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Welcome back, John
              </h1>
              <p className="text-muted-foreground">
                Your blood donation makes a difference. Track your impact and stay connected with your community.
              </p>
            </div>

            {/* Stats Overview */}
            <DashboardStats />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column */}
              <div className="space-y-6 lg:col-span-2">
                <DonationChart />
                <QuickActions />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <EmergencyAlerts />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;