import { useState } from "react";
import { Calendar, Plus, MapPin, Users, Edit, Eye, Download, BarChart3, Settings } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    registrations: 35,
    description: "Annual blood donation drive in collaboration with City Hospital",
    organizer: "Dr. Sarah Johnson"
  },
  {
    id: "DD002", 
    title: "University Campus Drive",
    date: "2024-01-18",
    time: "10:00 - 16:00",
    location: "State University, Student Center",
    status: "completed",
    expectedDonors: 40,
    registrations: 42,
    description: "Student-led blood donation campaign",
    organizer: "Student Union"
  },
  {
    id: "DD003",
    title: "Community Center Drive", 
    date: "2024-01-25",
    time: "08:00 - 15:00",
    location: "Downtown Community Center",
    status: "upcoming",
    expectedDonors: 60,
    registrations: 23,
    description: "Community outreach program for blood donation",
    organizer: "Community Health Dept."
  },
  {
    id: "DD004",
    title: "Mall Blood Drive",
    date: "2024-01-15",
    time: "11:00 - 19:00", 
    location: "Shopping Mall, Food Court Area",
    status: "completed",
    expectedDonors: 80,
    registrations: 78,
    description: "Public blood donation drive at central mall",
    organizer: "Mall Management"
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
  const [drives, setDrives] = useState(donationDrives);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Function to handle scheduling a new drive
  const handleScheduleDrive = (driveData) => {
    const newDrive = {
      id: `DD${String(drives.length + 1).padStart(3, '0')}`,
      ...driveData,
      status: "upcoming",
      registrations: 0
    };
    setDrives([newDrive, ...drives]);
    setIsScheduleDialogOpen(false);
  };

  // Function to handle editing a drive
  const handleEditDrive = (driveData) => {
    setDrives(drives.map(drive => 
      drive.id === selectedDrive.id ? { ...drive, ...driveData } : drive
    ));
    setIsEditDialogOpen(false);
    setSelectedDrive(null);
  };

  // Function to view drive details
  const handleViewDetails = (drive) => {
    setSelectedDrive(drive);
    // In a real app, you might navigate to a details page or show a modal
    alert(`Viewing details for: ${drive.title}\n\nDescription: ${drive.description}\nOrganizer: ${drive.organizer}\nRegistrations: ${drive.registrations}/${drive.expectedDonors}`);
  };

  // Function to download drive report
  const handleDownloadReport = () => {
    const csvContent = [
      ["ID", "Title", "Date", "Location", "Status", "Expected Donors", "Registrations"],
      ...drives.map(drive => [
        drive.id,
        drive.title,
        drive.date,
        drive.location,
        drive.status,
        drive.expectedDonors,
        drive.registrations
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "donation-drives-report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Function to view calendar
  const handleViewCalendar = () => {
    alert("Opening calendar view...");
    // In a real app, this would open a calendar modal or navigate to calendar page
  };

  // Function to manage volunteers
  const handleManageVolunteers = () => {
    alert("Opening volunteer management...");
    // In a real app, this would open volunteer management interface
  };

  // Function to manage locations
  const handleLocationManagement = () => {
    alert("Opening location management...");
    // In a real app, this would open location management interface
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Donation Drives
          </h1>
          <p className="text-muted-foreground mt-2">
            Schedule and manage blood donation drives efficiently
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleDownloadReport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Drive
              </Button>
            </DialogTrigger>
            <ScheduleDriveDialog 
              onSubmit={handleScheduleDrive}
              onCancel={() => setIsScheduleDialogOpen(false)}
            />
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">This Month</CardTitle>
            <Calendar className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">8</div>
            <p className="text-xs text-blue-600 mt-1">Donation drives scheduled</p>
            <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-700">
              +2 from last month
            </Badge>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Donors</CardTitle>
            <Users className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">195</div>
            <p className="text-xs text-green-600 mt-1">Registered this month</p>
            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
              +15% growth
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Success Rate</CardTitle>
            <BarChart3 className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">94%</div>
            <p className="text-xs text-purple-600 mt-1">Completion rate</p>
            <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-700">
              Excellent
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Donation Drives List */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-t-lg border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900">Scheduled Drives</CardTitle>
            <Badge variant="outline" className="px-3 py-1">
              {drives.length} drives
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200/60">
            {drives.map((drive) => (
              <div 
                key={drive.id}
                className="p-6 hover:bg-gray-50/50 transition-all duration-200 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                        {drive.title}
                      </h3>
                      <StatusBadge variant={getStatusVariant(drive.status)}>
                        {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                      </StatusBadge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <span>{drive.date} • {drive.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span className="truncate">{drive.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span>
                          <span className={drive.registrations >= drive.expectedDonors ? "text-green-600 font-semibold" : ""}>
                            {drive.registrations}
                          </span>
                          /{drive.expectedDonors} registered
                        </span>
                      </div>
                    </div>
                    
                    {drive.description && (
                      <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                        {drive.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(drive)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Details
                    </Button>
                    {drive.status === "upcoming" && (
                      <Dialog open={isEditDialogOpen && selectedDrive?.id === drive.id} onOpenChange={(open) => {
                        if (!open) {
                          setIsEditDialogOpen(false);
                          setSelectedDrive(null);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedDrive(drive);
                              setIsEditDialogOpen(true);
                            }}
                            className="flex items-center gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <EditDriveDialog 
                          drive={drive}
                          onSubmit={handleEditDrive}
                          onCancel={() => {
                            setIsEditDialogOpen(false);
                            setSelectedDrive(null);
                          }}
                        />
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-t-lg border-b">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Settings className="h-5 w-5 text-red-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 text-left hover:bg-red-50 hover:text-red-600 transition-colors"
                onClick={handleViewCalendar}
              >
                <Calendar className="h-4 w-4 mr-3" />
                View Calendar
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 text-left hover:bg-green-50 hover:text-green-600 transition-colors"
                onClick={handleManageVolunteers}
              >
                <Users className="h-4 w-4 mr-3" />
                Manage Volunteers
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 text-left hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={handleLocationManagement}
              >
                <MapPin className="h-4 w-4 mr-3" />
                Location Management
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-t-lg border-b">
            <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {drives.slice(0, 3).map((drive) => (
                <div key={drive.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{drive.title}</div>
                    <div className="text-sm text-gray-500">{drive.status} • {drive.date}</div>
                  </div>
                  <Badge variant={drive.status === "completed" ? "success" : "secondary"}>
                    {drive.registrations} donors
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Schedule Drive Dialog Component
function ScheduleDriveDialog({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    expectedDonors: "",
    description: "",
    organizer: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-900">Schedule New Drive</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Drive Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter drive title"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              placeholder="09:00 - 17:00"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Enter location"
            required
          />
        </div>

        <div>
          <Label htmlFor="expectedDonors">Expected Donors</Label>
          <Input
            id="expectedDonors"
            type="number"
            value={formData.expectedDonors}
            onChange={(e) => setFormData({ ...formData, expectedDonors: e.target.value })}
            placeholder="50"
            required
          />
        </div>

        <div>
          <Label htmlFor="organizer">Organizer</Label>
          <Input
            id="organizer"
            value={formData.organizer}
            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
            placeholder="Enter organizer name"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter drive description"
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-red-500 hover:bg-red-600">
            Schedule Drive
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}

// Edit Drive Dialog Component
function EditDriveDialog({ drive, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(drive);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-900">Edit Drive</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="edit-title">Drive Title</Label>
          <Input
            id="edit-title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="edit-date">Date</Label>
            <Input
              id="edit-date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-time">Time</Label>
            <Input
              id="edit-time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="edit-location">Location</Label>
          <Input
            id="edit-location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="edit-expectedDonors">Expected Donors</Label>
          <Input
            id="edit-expectedDonors"
            type="number"
            value={formData.expectedDonors}
            onChange={(e) => setFormData({ ...formData, expectedDonors: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="edit-description">Description</Label>
          <Textarea
            id="edit-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
            Update Drive
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}