import { Thermometer, AlertTriangle, CheckCircle, Activity, Wifi, WifiOff } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

// Mock data for temperature monitoring
const temperatureData = [
  { time: "00:00", temp: 4.2 },
  { time: "02:00", temp: 4.1 },
  { time: "04:00", temp: 4.3 },
  { time: "06:00", temp: 4.0 },
  { time: "08:00", temp: 4.2 },
  { time: "10:00", temp: 4.4 },
  { time: "12:00", temp: 4.1 },
  { time: "14:00", temp: 4.3 },
  { time: "16:00", temp: 4.2 },
  { time: "18:00", temp: 4.0 },
  { time: "20:00", temp: 4.1 },
  { time: "22:00", temp: 4.2 }
];

const storageUnits = [
  {
    id: "FRIDGE-A1",
    location: "Main Storage - Section A",
    currentTemp: 4.2,
    targetTemp: 4.0,
    status: "normal",
    lastUpdate: "2024-01-16 14:32:15",
    connectivity: "online"
  },
  {
    id: "FRIDGE-B1", 
    location: "Main Storage - Section B",
    currentTemp: 4.4,
    targetTemp: 4.0,
    status: "warning",
    lastUpdate: "2024-01-16 14:32:10",
    connectivity: "online"
  },
  {
    id: "FRIDGE-C1",
    location: "Emergency Storage",
    currentTemp: 4.1,
    targetTemp: 4.0,
    status: "normal", 
    lastUpdate: "2024-01-16 14:32:18",
    connectivity: "online"
  },
  {
    id: "FREEZER-F1",
    location: "Plasma Storage", 
    currentTemp: -18.5,
    targetTemp: -18.0,
    status: "normal",
    lastUpdate: "2024-01-16 14:32:12",
    connectivity: "offline"
  }
];

const recentAlerts = [
  {
    id: "ALT001",
    unit: "FRIDGE-B1",
    message: "Temperature above threshold",
    severity: "warning",
    timestamp: "2024-01-16 14:15:33",
    acknowledged: false
  },
  {
    id: "ALT002",
    unit: "FREEZER-F1", 
    message: "Connectivity lost",
    severity: "critical",
    timestamp: "2024-01-16 13:45:12",
    acknowledged: true
  },
  {
    id: "ALT003",
    unit: "FRIDGE-A1",
    message: "Door left open for 5 minutes", 
    severity: "warning",
    timestamp: "2024-01-16 12:30:45",
    acknowledged: true
  },
  {
    id: "ALT004",
    unit: "FRIDGE-C1",
    message: "Power restored",
    severity: "info",
    timestamp: "2024-01-16 11:15:22", 
    acknowledged: true
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "normal":
      return "success";
    case "warning":
      return "warning";
    case "critical":
      return "critical";
    default:
      return "info";
  }
};

const getSeverityVariant = (severity: string) => {
  switch (severity) {
    case "critical":
      return "critical";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "info";
  }
};

const getTemperatureColor = (current: number, target: number) => {
  const diff = Math.abs(current - target);
  if (diff > 1.0) return "text-destructive";
  if (diff > 0.5) return "text-warning";
  return "text-success";
};

export default function Monitoring() {
  const totalUnits = storageUnits.length;
  const onlineUnits = storageUnits.filter(unit => unit.connectivity === "online").length;
  const normalUnits = storageUnits.filter(unit => unit.status === "normal").length;
  const activeAlerts = recentAlerts.filter(alert => !alert.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Storage & Temperature Monitoring</h1>
        <p className="text-muted-foreground mt-2">
          Real-time monitoring of blood storage temperature and conditions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Storage Units"
          value={totalUnits}
          icon={Thermometer}
          description="Total monitored"
        />
        <StatsCard
          title="Online Units"
          value={onlineUnits}
          icon={Wifi}
          changeType="positive"
          description={`${Math.round((onlineUnits/totalUnits) * 100)}% connectivity`}
        />
        <StatsCard
          title="Normal Status"
          value={normalUnits}
          icon={CheckCircle}
          changeType="positive"
          description="Operating normally"
        />
        <StatsCard
          title="Active Alerts"
          value={activeAlerts}
          icon={AlertTriangle}
          changeType={activeAlerts > 0 ? "negative" : "positive"}
          description="Require attention"
        />
      </div>

      {/* Temperature Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Temperature Trend - Last 24 Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {temperatureData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className="bg-primary w-4 rounded-t"
                  style={{ height: `${(data.temp + 20) * 4}px` }}
                ></div>
                <div className="text-xs text-muted-foreground transform -rotate-45">
                  {data.time}
                </div>
                <div className="text-xs font-medium">
                  {data.temp}°C
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded"></div>
                <span>Normal Range (2-6°C)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded"></div>
                <span>Warning Range</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded"></div>
                <span>Critical Range</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage Units Status */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Units Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Unit ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Current Temp</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Target Temp</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Connectivity</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Update</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {storageUnits.map((unit) => (
                  <tr key={unit.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">{unit.id}</td>
                    <td className="py-3 px-4 text-sm">{unit.location}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-bold ${getTemperatureColor(unit.currentTemp, unit.targetTemp)}`}>
                        {unit.currentTemp}°C
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{unit.targetTemp}°C</td>
                    <td className="py-3 px-4">
                      <StatusBadge variant={getStatusVariant(unit.status)}>
                        <div className="flex items-center space-x-1">
                          {unit.status === "normal" && <CheckCircle className="h-3 w-3" />}
                          {unit.status === "warning" && <AlertTriangle className="h-3 w-3" />}
                          <span className="capitalize">{unit.status}</span>
                        </div>
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        {unit.connectivity === "online" ? (
                          <Wifi className="h-4 w-4 text-success" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-destructive" />
                        )}
                        <span className={`text-xs ${unit.connectivity === "online" ? "text-success" : "text-destructive"}`}>
                          {unit.connectivity}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono">{unit.lastUpdate}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Activity className="h-4 w-4 mr-1" />
                        Monitor
                      </Button>
                      <Button variant="outline" size="sm">
                        Settings
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Alerts</CardTitle>
            <Button variant="outline" size="sm">
              Acknowledge All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  alert.acknowledged ? "bg-muted/30" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {alert.severity === "critical" && <AlertTriangle className="h-5 w-5 text-destructive" />}
                    {alert.severity === "warning" && <AlertTriangle className="h-5 w-5 text-warning" />}
                    {alert.severity === "info" && <CheckCircle className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{alert.message}</div>
                    <div className="text-sm text-muted-foreground">
                      {alert.unit} • {alert.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusBadge variant={getSeverityVariant(alert.severity)}>
                    {alert.severity}
                  </StatusBadge>
                  {!alert.acknowledged && (
                    <Button variant="outline" size="sm">
                      Acknowledge
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}