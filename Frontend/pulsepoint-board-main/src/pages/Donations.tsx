import { Calendar, Plus, MapPin, Users } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for donation drives
const donationDrives = [
  {
    id: "DD001",
    title: "City Hospital Drive",
    date: "2024-01-20",
    time: "09:00 - 17:00",
    location: "City Hospital, Main Campus",
    status: "upcoming",
    expectedDonors: 50,
    registrations: 35
  },
  {
    id: "DD002", 
    title: "University Campus Drive",
    date: "2024-01-18",
    time: "10:00 - 16:00",
    location: "State University, Student Center",
    status: "completed",
    expectedDonors: 40,
    registrations: 42
  },
  {
    id: "DD003",
    title: "Community Center Drive", 
    date: "2024-01-25",
    time: "08:00 - 15:00",
    location: "Downtown Community Center",
    status: "upcoming",
    expectedDonors: 60,
    registrations: 23
  },
  {
    id: "DD004",
    title: "Mall Blood Drive",
    date: "2024-01-15",
    time: "11:00 - 19:00", 
    location: "Shopping Mall, Food Court Area",
    status: "completed",
    expectedDonors: 80,
    registrations: 78
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "upcoming":
      return "info";
    case "cancelled":
      return "critical";
    default:
      return "pending";
  }
};

export default function Donations() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Donation Drives</h1>
          <p className="text-muted-foreground mt-2">
            Schedule and manage blood donation drives
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Drive
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Donation drives scheduled</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">195</div>
            <p className="text-xs text-muted-foreground">Registered this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Calendar className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">94%</div>
            <p className="text-xs text-muted-foreground">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Donation Drives List */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Drives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donationDrives.map((drive) => (
              <div 
                key={drive.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-foreground">{drive.title}</h3>
                    <StatusBadge variant={getStatusVariant(drive.status)}>
                      {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                    </StatusBadge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{drive.date} • {drive.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{drive.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{drive.registrations}/{drive.expectedDonors} registered</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {drive.status === "upcoming" && (
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage Volunteers
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MapPin className="h-4 w-4 mr-2" />
              Location Management
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mall Drive completed</span>
                <span className="text-foreground">78 donors</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">University Drive scheduled</span>
                <span className="text-foreground">Jan 18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">New volunteer registered</span>
                <span className="text-foreground">Today</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}