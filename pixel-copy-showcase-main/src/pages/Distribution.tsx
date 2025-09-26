import { useState } from "react";
import { Truck, CheckCircle, Clock, AlertTriangle, MapPin, Phone, Plus, Eye, Navigation } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data for hospital requests
const initialHospitalRequests = [
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
    deliveryStatus: "delivered",
    address: "123 Medical Ave, City Center",
    estimatedDelivery: "2024-01-16 14:30"
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
    deliveryStatus: "pending",
    address: "456 Health St, Medical District",
    estimatedDelivery: null
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
    deliveryStatus: "in_transit",
    address: "789 Emergency Rd, Downtown",
    estimatedDelivery: "2024-01-16 16:00"
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
    deliveryStatus: "cancelled",
    address: "321 Regional Blvd, Suburbia",
    estimatedDelivery: null
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

const getPriorityBadge = (priority: string) => {
  return priority === "urgent" ? "destructive" : "secondary";
};

export default function Distribution() {
  const [requests, setRequests] = useState(initialHospitalRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isTrackDialogOpen, setIsTrackDialogOpen] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  // New request form state
  const [newRequest, setNewRequest] = useState({
    hospital: "",
    contact: "",
    phone: "",
    bloodType: "",
    unitsRequested: 1,
    priority: "normal",
    address: ""
  });

  const totalRequests = requests.length;
  const approvedRequests = requests.filter(req => req.status === "approved").length;
  const pendingRequests = requests.filter(req => req.status === "pending").length;
  const deliveredRequests = requests.filter(req => req.deliveryStatus === "delivered").length;

  // Animate progress bars on component mount
  useState(() => {
    const timer = setTimeout(() => {
      setProgressWidth(92); // Animate to 92%
    }, 300);
    return () => clearTimeout(timer);
  });

  const handleApprove = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: "approved", 
            deliveryStatus: "pending",
            dispatchDate: new Date().toISOString().split('T')[0],
            estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + " 14:00"
          }
        : req
    ));
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: "rejected", deliveryStatus: "cancelled" }
        : req
    ));
  };

  const handleTrack = (request: any) => {
    setSelectedRequest(request);
    setIsTrackDialogOpen(true);
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsDetailsDialogOpen(true);
  };

  const handleNewRequest = () => {
    const newRequestData = {
      id: `REQ${String(requests.length + 1).padStart(3, '0')}`,
      ...newRequest,
      requestDate: new Date().toISOString().split('T')[0],
      status: "pending",
      deliveryStatus: "pending",
      dispatchDate: null,
      estimatedDelivery: null
    };

    setRequests(prev => [...prev, newRequestData]);
    setIsNewRequestDialogOpen(false);
    
    // Reset form
    setNewRequest({
      hospital: "",
      contact: "",
      phone: "",
      bloodType: "",
      unitsRequested: 1,
      priority: "normal",
      address: ""
    });
  };

  const updateDeliveryStatus = (requestId: string, status: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, deliveryStatus: status }
        : req
    ));
    setIsTrackDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes progressBar {
          from { width: 0; }
          to { width: var(--target-width); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .animate-progress {
          animation: progressBar 1.5s ease-out forwards;
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .pulse-urgent {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>

      {/* Header */}
      <div className="animate-slide-in">
        <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Distribution Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage hospital requests and track blood unit deliveries
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Total Requests", value: totalRequests, icon: Truck, description: "This week", trend: "up" },
          { title: "Approved", value: approvedRequests, icon: CheckCircle, description: `${Math.round((approvedRequests/totalRequests) * 100)}% approval rate` },
          { title: "Pending Review", value: pendingRequests, icon: Clock, description: "Awaiting approval" },
          { title: "Delivered", value: deliveredRequests, icon: CheckCircle, description: "Successfully completed" }
        ].map((card, index) => (
          <div 
            key={card.title} 
            className="animate-slide-in hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <StatsCard {...card} />
          </div>
        ))}
      </div>

      {/* Hospital Requests Table */}
      <Card className="shadow-lg border-0 hover-lift">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Hospital Blood Requests</CardTitle>
            <Button 
              onClick={() => setIsNewRequestDialogOpen(true)}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover-lift"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Request ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Hospital</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Blood Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Units</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Priority</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Delivery</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr 
                    key={request.id}
                    className="border-b border-border hover:bg-primary/5 transition-all duration-200 animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-4 px-6">
                      <div className="font-mono font-bold text-primary">{request.id}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-foreground">{request.hospital}</div>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-2" />
                          {request.contact} • {request.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center shadow-lg ${
                          request.priority === 'urgent' ? 'pulse-urgent' : ''
                        }`}>
                          <span className="text-sm font-bold text-primary">{request.bloodType}</span>
                        </div>
                        <span className="font-semibold">{request.bloodType}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                        {request.unitsRequested}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getPriorityBadge(request.priority)} className="uppercase font-semibold">
                        {request.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge variant={getStatusVariant(request.status)}>
                        <span className="capitalize font-medium">{request.status}</span>
                      </StatusBadge>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge variant={getDeliveryVariant(request.deliveryStatus)}>
                        <div className="flex items-center space-x-2">
                          {request.deliveryStatus === "in_transit" && <Truck className="h-3 w-3" />}
                          {request.deliveryStatus === "delivered" && <CheckCircle className="h-3 w-3" />}
                          {request.deliveryStatus === "pending" && <Clock className="h-3 w-3" />}
                          <span className="capitalize font-medium">{request.deliveryStatus.replace('_', ' ')}</span>
                        </div>
                      </StatusBadge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-2">
                        {request.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button 
                              variant="default" 
                              size="sm" 
                              onClick={() => handleApprove(request.id)}
                              className="bg-green-600 hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleReject(request.id)}
                              className="transition-colors"
                            >
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {request.status === "approved" && request.deliveryStatus !== "delivered" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleTrack(request)}
                            className="border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors"
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Track
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewDetails(request)}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
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
        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-xl font-bold">Delivery Routes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {[
              { name: "Route A - City Center", status: "Active", deliveries: 3, color: "warning" },
              { name: "Route B - Medical District", status: "Completed", deliveries: 2, color: "success" },
              { name: "Route C - Emergency", status: "Priority", deliveries: 1, color: "critical" }
            ].map((route, index) => (
              <div 
                key={route.name}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border hover:shadow-md transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <div className="font-semibold text-foreground">{route.name}</div>
                  <div className="text-sm text-muted-foreground">{route.deliveries} deliveries scheduled</div>
                </div>
                <StatusBadge variant={route.color as any}>{route.status}</StatusBadge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-xl font-bold">Dispatch Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">On-Time Delivery</span>
                <span className="text-sm font-bold text-green-600">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full animate-progress"
                  style={{ width: `${progressWidth}%`, transition: 'width 1.5s ease-out' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">Average Transit Time</span>
                <span className="text-sm font-bold text-blue-600">45 min</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full animate-progress"
                  style={{ width: '75%', transition: 'width 1.5s ease-out 0.2s' }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary animate-slide-in">
                  {requests.reduce((sum, req) => sum + req.unitsRequested, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total units dispatched this week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Request Dialog */}
      <Dialog open={isNewRequestDialogOpen} onOpenChange={setIsNewRequestDialogOpen}>
        <DialogContent className="sm:max-w-[500px] animate-slide-in">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">New Blood Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hospital Name</Label>
                <Input 
                  value={newRequest.hospital}
                  onChange={(e) => setNewRequest({...newRequest, hospital: e.target.value})}
                  placeholder="Enter hospital name"
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Person</Label>
                <Input 
                  value={newRequest.contact}
                  onChange={(e) => setNewRequest({...newRequest, contact: e.target.value})}
                  placeholder="Enter contact name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input 
                value={newRequest.phone}
                onChange={(e) => setNewRequest({...newRequest, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input 
                value={newRequest.address}
                onChange={(e) => setNewRequest({...newRequest, address: e.target.value})}
                placeholder="Enter hospital address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Blood Type</Label>
                <Select value={newRequest.bloodType} onValueChange={(value) => setNewRequest({...newRequest, bloodType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Units Requested</Label>
                <Input 
                  type="number" 
                  value={newRequest.unitsRequested}
                  onChange={(e) => setNewRequest({...newRequest, unitsRequested: parseInt(e.target.value) || 1})}
                  min="1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={newRequest.priority} onValueChange={(value) => setNewRequest({...newRequest, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewRequestDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleNewRequest} 
              disabled={!newRequest.hospital || !newRequest.bloodType}
              className="transition-all duration-200"
            >
              Create Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] animate-slide-in">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Request Details - {selectedRequest?.id}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Hospital</Label>
                  <div className="font-semibold">{selectedRequest.hospital}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Contact</Label>
                  <div className="font-semibold">{selectedRequest.contact}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Blood Type</Label>
                  <div className="font-semibold">{selectedRequest.bloodType}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Units</Label>
                  <div className="font-semibold">{selectedRequest.unitsRequested}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Priority</Label>
                  <Badge variant={getPriorityBadge(selectedRequest.priority)}>
                    {selectedRequest.priority}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <StatusBadge variant={getStatusVariant(selectedRequest.status)}>
                    {selectedRequest.status}
                  </StatusBadge>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Address</Label>
                <div className="font-semibold">{selectedRequest.address}</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Request Date</Label>
                <div className="font-semibold">{selectedRequest.requestDate}</div>
              </div>
              {selectedRequest.dispatchDate && (
                <div>
                  <Label className="text-sm text-muted-foreground">Dispatch Date</Label>
                  <div className="font-semibold">{selectedRequest.dispatchDate}</div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Track Dialog */}
      <Dialog open={isTrackDialogOpen} onOpenChange={setIsTrackDialogOpen}>
        <DialogContent className="sm:max-w-[500px] animate-slide-in">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Track Delivery - {selectedRequest?.id}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Current Status</Label>
                <StatusBadge variant={getDeliveryVariant(selectedRequest.deliveryStatus)}>
                  {selectedRequest.deliveryStatus.replace('_', ' ')}
                </StatusBadge>
              </div>
              
              <div className="space-y-4">
                <Label className="text-sm text-muted-foreground">Delivery Progress</Label>
                <div className="flex items-center justify-between">
                  {['pending', 'in_transit', 'delivered'].map((status, index) => (
                    <div key={status} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        status === selectedRequest.deliveryStatus ? 'bg-primary text-white scale-110' :
                        index < ['pending', 'in_transit', 'delivered'].indexOf(selectedRequest.deliveryStatus) ? 'bg-green-500 text-white' : 'bg-muted'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-xs mt-1 capitalize">{status.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedRequest.estimatedDelivery && (
                <div>
                  <Label className="text-sm text-muted-foreground">Estimated Delivery</Label>
                  <div className="font-semibold">{selectedRequest.estimatedDelivery}</div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => updateDeliveryStatus(selectedRequest.id, 'in_transit')}
                  disabled={selectedRequest.deliveryStatus !== 'pending'}
                  className="transition-all duration-200"
                >
                  Mark as In Transit
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => updateDeliveryStatus(selectedRequest.id, 'delivered')}
                  disabled={selectedRequest.deliveryStatus !== 'in_transit'}
                  className="transition-all duration-200"
                >
                  Mark as Delivered
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}