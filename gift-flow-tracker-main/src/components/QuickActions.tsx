import { Calendar, Heart, MapPin, FileText, Users, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    title: "Schedule Donation",
    description: "Book your next appointment",
    icon: Calendar,
    color: "bg-primary hover:bg-primary-hover text-primary-foreground",
  },
  {
    title: "Find Blood Banks",
    description: "Locate nearby centers",
    icon: MapPin,
    color: "bg-info hover:bg-info/90 text-info-foreground",
  },
  {
    title: "Update Health Info",
    description: "Medical questionnaire",
    icon: Heart,
    color: "bg-success hover:bg-success/90 text-success-foreground",
  },
  {
    title: "Upload Documents",
    description: "Medical certificates",
    icon: FileText,
    color: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
  },
  {
    title: "Join Community",
    description: "Connect with donors",
    icon: Users,
    color: "bg-accent hover:bg-accent/90 text-accent-foreground",
  },
  {
    title: "AI Assistant",
    description: "Get smart recommendations",
    icon: Bot,
    color: "bg-warning hover:bg-warning/90 text-warning-foreground",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Access key features with one click
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className={`h-auto p-4 justify-start hover:shadow-md transition-all ${action.color} border-0`}
            >
              <div className="flex items-center gap-3">
                <action.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}