import { Heart, Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statsData = [
  {
    title: "Total Donations",
    value: "24",
    description: "All time contributions",
    icon: Heart,
    trend: "+2 this month",
    color: "text-primary",
  },
  {
    title: "Lives Impacted",
    value: "96",
    description: "People helped",
    icon: Users,
    trend: "+8 this month",
    color: "text-success",
  },
  {
    title: "Nearby Requests",
    value: "12",
    description: "Within 10 miles",
    icon: MapPin,
    trend: "3 critical",
    color: "text-critical",
  },
  {
    title: "Next Appointment",
    value: "Mar 15",
    description: "Central Hospital",
    icon: Calendar,
    trend: "In 5 days",
    color: "text-info",
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <p className={`text-xs font-medium mt-1 ${stat.color}`}>
              {stat.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}