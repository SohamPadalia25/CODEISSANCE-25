import { Truck, CheckCircle, Clock, AlertTriangle, MapPin, Phone } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for hospital requests
const hospitalRequests = [
  {
    id: "REQ001",
    hospital: "City General Hospital",
    contact: "Dr. Sarah Williams",
    phone: "+1-555-0123",
    bloodType: "O+",
    unitsRequested: 5,
    priority: "urgent",
    requestDate: "2024-01-16",
    status: "approved",
    dispatchDate: "2024-01-16",
    deliveryStatus: "delivered"
  },
  {
    id: "REQ002", 
    hospital: "St. Mary's Medical Center",
    contact: "Dr. Michael Chen",
    phone: "+1-555-0124",
    bloodType: "A-",
    unitsRequested: 3,
    priority: "normal",
    requestDate: "2024-01-16",
    status: "pending",
    dispatchDate: null,
    deliveryStatus: "pending"
  },
  {
    id: "REQ003",
    hospital: "Emergency Care Hospital",
    contact: "Dr. Lisa Johnson",
    phone: "+1-555-0125", 
    bloodType: "B+",
    unitsRequested: 8,
    priority: "urgent",
    requestDate: "2024-01-15",
    status: "approved",
    dispatchDate: "2024-01-15",
    deliveryStatus: "in_transit"
  },
  {
    id: "REQ004",
    hospital: "Regional Medical Center",
    contact: "Dr. Robert Davis",
    phone: "+1-555-0126",
    bloodType: "AB+",
    unitsRequested: 2,
    priority: "normal", 
    requestDate: "2024-01-15",
    status: "rejected",
    dispatchDate: null,
    deliveryStatus: "cancelled"
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "success";
    case "rejected":
      return "critical";
    case "pending":
      return "warning";
    default:
      return "info";
  }
};

const getDeliveryVariant = (status: string) => {
  switch (status) {
    case "delivered":
      return "success";
    case "in_transit":
      return "warning";
    case "pending":
      return "pending";
    case "cancelled":
      return "critical";
    default:
      return "info";
  }
};

const getPriorityColor = (priority: string) => {
  return priority === "urgent" ? "text-destructive" : "text-muted-foreground";
};

export default function Distribution() {
  const totalRequests = hospitalRequests.length;
  const approvedRequests = hospitalRequests.filter(req => req.status === "approved").length;
  const pendingRequests = hospitalRequests.filter(req => req.status === "pending").length;
  const deliveredRequests = hospitalRequests.filter(req => req.deliveryStatus === "delivered").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Distribution Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage hospital requests and track blood unit deliveries
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Requests"
          value={totalRequests}
          icon={Truck}
          description="This week"
        />
        <StatsCard
          title="Approved"
          value={approvedRequests}
          icon={CheckCircle}
          changeType="positive"
          description={`${Math.round((approvedRequests/totalRequests) * 100)}% approval rate`}
        />
        <StatsCard
          title="Pending Review"
          value={pendingRequests}
          icon={Clock}
          changeType="neutral"
          description="Awaiting approval"
        />
        <StatsCard
          title="Delivered"
          value={deliveredRequests}
          icon={CheckCircle}
          changeType="positive"
          description="Successfully completed"
        />
      </div>

      {/* Hospital Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Hospital Blood Requests</CardTitle>
            <Button>New Request</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Request ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Hospital</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Blood Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Units</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Delivery</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospitalRequests.map((request) => (
                  <tr key={request.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">{request.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-foreground">{request.hospital}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {request.contact}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{request.bloodType}</span>
                        </div>
                        <span className="font-medium">{request.bloodType}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">{request.unitsRequested}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium uppercase ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge variant={getStatusVariant(request.status)}>
                        <span className="capitalize">{request.status}</span>
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge variant={getDeliveryVariant(request.deliveryStatus)}>
                        <div className="flex items-center space-x-1">
                          {request.deliveryStatus === "in_transit" && <Truck className="h-3 w-3" />}
                          {request.deliveryStatus === "delivered" && <CheckCircle className="h-3 w-3" />}
                          {request.deliveryStatus === "pending" && <Clock className="h-3 w-3" />}
                          <span className="capitalize">{request.deliveryStatus.replace('_', ' ')}</span>
                        </div>
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      {request.status === "pending" && (
                        <>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === "approved" && request.deliveryStatus !== "delivered" && (
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">Route A - City Center</div>
                  <div className="text-sm text-muted-foreground">3 deliveries scheduled</div>
                </div>
                <StatusBadge variant="warning">Active</StatusBadge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">Route B - Medical District</div>
                  <div className="text-sm text-muted-foreground">2 deliveries completed</div>
                </div>
                <StatusBadge variant="success">Completed</StatusBadge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">Route C - Emergency</div>
                  <div className="text-sm text-muted-foreground">1 urgent delivery</div>
                </div>
                <StatusBadge variant="critical">Priority</StatusBadge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dispatch Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">On-Time Delivery</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-11/12"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Average Transit Time</span>
                  <span className="text-sm text-muted-foreground">45 min</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Total units dispatched this week: 47
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}