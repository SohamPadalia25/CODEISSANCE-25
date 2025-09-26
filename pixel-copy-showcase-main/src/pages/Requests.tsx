import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DonorSidebar } from "@/components/DonorSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Clock, Navigation, Phone, Filter, Search, AlertTriangle, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Requests = () => {
  const [filters, setFilters] = useState({
    bloodType: "all",
    distance: [25],
    urgency: "all"
  });

  const bloodRequests = [
    {
      id: 1,
      hospital: "General Hospital",
      bloodType: "O-",
      urgency: "critical",
      unitsNeeded: 3,
      distance: "2.3 miles",
      timePosted: "2 hours ago",
      contactNumber: "+1 (555) 123-4567",
      address: "123 Medical Center Dr, City",
      estimatedTime: "8 mins",
      compatibility: 95,
      description: "Emergency surgery patient requires immediate blood transfusion"
    },
    {
      id: 2,
      hospital: "Children's Medical Center",
      bloodType: "A+",
      urgency: "warning",
      unitsNeeded: 2,
      distance: "4.7 miles",
      timePosted: "4 hours ago",
      contactNumber: "+1 (555) 987-6543",
      address: "456 Pediatric Way, City",
      estimatedTime: "15 mins",
      compatibility: 87,
      description: "Scheduled surgery for pediatric patient tomorrow morning"
    },
    {
      id: 3,
      hospital: "City Emergency Center",
      bloodType: "B-",
      urgency: "critical",
      unitsNeeded: 1,
      distance: "1.8 miles",
      timePosted: "1 hour ago",
      contactNumber: "+1 (555) 456-7890",
      address: "789 Emergency Blvd, City",
      estimatedTime: "5 mins",
      compatibility: 92,
      description: "Accident victim in critical condition"
    },
    {
      id: 4,
      hospital: "Regional Medical",
      bloodType: "AB+",
      urgency: "info",
      unitsNeeded: 4,
      distance: "8.2 miles",
      timePosted: "6 hours ago",
      contactNumber: "+1 (555) 321-0987",
      address: "321 Health Plaza, City",
      estimatedTime: "22 mins",
      compatibility: 78,
      description: "Replenishing blood bank reserves"
    }
  ];

  const urgencyColors = {
    critical: "bg-critical text-critical-foreground",
    warning: "bg-warning text-warning-foreground",
    success: "bg-success text-success-foreground",
    info: "bg-info text-info-foreground"
  };

  const aiSuggestions = [
    {
      hospital: "General Hospital",
      reason: "Highest compatibility (95%) + Critical urgency",
      travelTime: "8 mins"
    },
    {
      hospital: "City Emergency Center", 
      reason: "Closest distance (1.8 miles) + Critical urgency",
      travelTime: "5 mins"
    },
    {
      hospital: "Children's Medical Center",
      reason: "Good compatibility (87%) + Your donation history",
      travelTime: "15 mins"
    }
  ];

  const handleAcceptRequest = (requestId: number) => {
    toast({
      title: "Request Accepted",
      description: "Hospital has been notified. Please arrive within the estimated time.",
    });
  };

  const handleNavigate = (address: string) => {
    toast({
      title: "Opening Navigation",
      description: "Launching maps with fastest route to hospital.",
    });
  };

  const filteredRequests = bloodRequests.filter(request => {
    const matchesBloodType = filters.bloodType === "all" || request.bloodType === filters.bloodType;
    const matchesDistance = parseFloat(request.distance) <= filters.distance[0];
    const matchesUrgency = filters.urgency === "all" || request.urgency === filters.urgency;
    
    return matchesBloodType && matchesDistance && matchesUrgency;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DonorSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Blood Requests
              </h1>
              <p className="text-muted-foreground">
                Find urgent blood donation requests near you and make a difference.
              </p>
            </div>

            {/* AI Smart Suggestions */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                  AI Smart Matching
                </CardTitle>
                <CardDescription>
                  Top 3 recommendations based on compatibility, urgency, and distance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{suggestion.hospital}</p>
                        <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                        <p className="text-xs text-success">{suggestion.travelTime} drive</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-4">
              {/* Filters Sidebar */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Hospital name..." className="pl-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Blood Type</Label>
                      <Select value={filters.bloodType} onValueChange={(value) => setFilters({...filters, bloodType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
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
                      <Label>Maximum Distance: {filters.distance[0]} miles</Label>
                      <Slider
                        value={filters.distance}
                        onValueChange={(value) => setFilters({...filters, distance: value})}
                        max={50}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Urgency Level</Label>
                      <Select value={filters.urgency} onValueChange={(value) => setFilters({...filters, urgency: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="All levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="warning">High</SelectItem>
                          <SelectItem value="info">Normal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="outline" className="w-full">
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>

                {/* Emergency SOS Alert */}
                <Card className="border-critical bg-critical/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-critical">
                      <AlertTriangle className="h-5 w-5" />
                      Mass Emergency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">Multi-vehicle accident on Highway 101. All blood types urgently needed.</p>
                    <Button size="sm" className="w-full bg-critical hover:bg-critical/90">
                      View Emergency Details
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Requests List */}
              <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {filteredRequests.length} Active Requests
                  </h2>
                  <Button variant="outline" size="sm">
                    View on Map
                  </Button>
                </div>

                {filteredRequests.map((request) => (
                  <Card key={request.id} className={request.urgency === 'critical' ? 'border-critical/50' : ''}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="flex items-center gap-2">
                            {request.hospital}
                            <Badge className={urgencyColors[request.urgency as keyof typeof urgencyColors]}>
                              {request.bloodType}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{request.description}</CardDescription>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {request.timePosted}
                          </div>
                          <Badge variant="outline" className="text-success border-success">
                            {request.compatibility}% match
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{request.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Navigation className="h-4 w-4 text-muted-foreground" />
                            <span>{request.distance} • {request.estimatedTime} drive</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{request.contactNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Heart className="h-4 w-4 text-muted-foreground" />
                            <span>{request.unitsNeeded} units needed</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button 
                            onClick={() => handleAcceptRequest(request.id)}
                            className={request.urgency === 'critical' ? 'bg-critical hover:bg-critical/90' : ''}
                          >
                            Accept Request
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handleNavigate(request.address)}
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Navigate
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Hospital
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredRequests.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Search className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No requests found</h3>
                      <p className="text-muted-foreground text-center">
                        Try adjusting your filters or check back later for new requests.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Requests;