import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const emergencyRequests = [
  {
    id: 1,
    bloodType: "O-",
    hospital: "General Hospital",
    distance: "2.3 miles",
    urgency: "critical",
    time: "2 hours ago",
    unitsNeeded: 3,
  },
  {
    id: 2,
    bloodType: "A+",
    hospital: "Children's Medical Center",
    distance: "4.7 miles",
    urgency: "warning",
    time: "4 hours ago",
    unitsNeeded: 2,
  },
  {
    id: 3,
    bloodType: "B-",
    hospital: "City Emergency",
    distance: "1.8 miles",
    urgency: "critical",
    time: "1 hour ago",
    unitsNeeded: 1,
  },
];

const urgencyColors = {
  critical: "bg-critical text-critical-foreground",
  warning: "bg-warning text-warning-foreground",
  success: "bg-success text-success-foreground",
  info: "bg-info text-info-foreground",
};

export function EmergencyAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-critical" />
          Emergency Alerts
        </CardTitle>
        <CardDescription>
          Real-time blood donation requests in your area
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {emergencyRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className={urgencyColors[request.urgency as keyof typeof urgencyColors]}>
                  {request.bloodType}
                </Badge>
                <span className="font-medium text-sm">{request.hospital}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {request.distance}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {request.time}
                </div>
                <span>{request.unitsNeeded} units needed</span>
              </div>
            </div>
            <Button
              size="sm"
              className={
                request.urgency === "critical"
                  ? "bg-critical hover:bg-critical/90 text-critical-foreground"
                  : ""
              }
            >
              Respond
            </Button>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          View All Requests
        </Button>
      </CardContent>
    </Card>
  );
}