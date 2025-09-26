import { Heart, Users, Calendar, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demonstration
const bloodInventory = [
  { type: "A+", quantity: 45, status: "sufficient", expiringSoon: 2 },
  { type: "A-", quantity: 12, status: "low", expiringSoon: 1 },
  { type: "B+", quantity: 38, status: "sufficient", expiringSoon: 0 },
  { type: "B-", quantity: 8, status: "critical", expiringSoon: 3 },
  { type: "AB+", quantity: 15, status: "low", expiringSoon: 1 },
  { type: "AB-", quantity: 3, status: "critical", expiringSoon: 0 },
  { type: "O+", quantity: 52, status: "sufficient", expiringSoon: 4 },
  { type: "O-", quantity: 18, status: "low", expiringSoon: 2 },
];

const recentDonations = [
  { id: "D001", donor: "John Smith", type: "O+", date: "2024-01-15", status: "completed" },
  { id: "D002", donor: "Maria Garcia", type: "A-", date: "2024-01-15", status: "testing" },
  { id: "D003", donor: "Robert Chen", type: "B+", date: "2024-01-14", status: "completed" },
  { id: "D004", donor: "Lisa Johnson", type: "AB-", date: "2024-01-14", status: "pending" },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "sufficient":
      return "success";
    case "low":
      return "warning";
    case "critical":
      return "critical";
    default:
      return "info";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "sufficient":
      return "Sufficient";
    case "low":
      return "Low Stock";
    case "critical":
      return "Critical";
    default:
      return "Unknown";
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the Blood Bank Management System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Units"
          value="191"
          change="+5 from yesterday"
          changeType="positive"
          icon={Heart}
          description="Blood units in inventory"
        />
        <StatsCard
          title="Donors Today"
          value="12"
          change="+2 from yesterday"
          changeType="positive"
          icon={Users}
          description="New donations received"
        />
        <StatsCard
          title="Scheduled"
          value="8"
          change="Appointments today"
          changeType="neutral"
          icon={Calendar}
          description="Donor appointments"
        />
        <StatsCard
          title="Requests"
          value="6"
          change="Pending fulfillment"
          changeType="neutral"
          icon={TrendingUp}
          description="Hospital requests"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Blood Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>Blood Inventory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bloodInventory.map((blood) => (
                <div 
                  key={blood.type}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {blood.type}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {blood.quantity} units
                      </div>
                      {blood.expiringSoon > 0 && (
                        <div className="text-xs text-warning">
                          {blood.expiringSoon} expiring soon
                        </div>
                      )}
                    </div>
                  </div>
                  <StatusBadge variant={getStatusVariant(blood.status)}>
                    {getStatusText(blood.status)}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-secondary" />
              <span>Recent Donations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div 
                  key={donation.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-foreground">
                      {donation.donor}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {donation.id} • {donation.type} • {donation.date}
                    </div>
                  </div>
                  <StatusBadge 
                    variant={
                      donation.status === "completed" ? "success" :
                      donation.status === "testing" ? "warning" : "pending"
                    }
                  >
                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}