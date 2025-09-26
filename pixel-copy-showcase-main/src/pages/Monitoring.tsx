import { useState, useEffect } from "react";
import { Thermometer, AlertTriangle, CheckCircle, Activity, Wifi, WifiOff, Settings, Bell, RefreshCw, Power } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// Mock data for temperature monitoring
const initialTemperatureData = [
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

const initialStorageUnits = [
  {
    id: "FRIDGE-A1",
    location: "Main Storage - Section A",
    currentTemp: 4.2,
    targetTemp: 4.0,
    status: "normal",
    lastUpdate: "2024-01-16 14:32:15",
    connectivity: "online",
    powerStatus: "on",
    humidity: 45,
    doorStatus: "closed"
  },
  {
    id: "FRIDGE-B1", 
    location: "Main Storage - Section B",
    currentTemp: 4.4,
    targetTemp: 4.0,
    status: "warning",
    lastUpdate: "2024-01-16 14:32:10",
    connectivity: "online",
    powerStatus: "on",
    humidity: 48,
    doorStatus: "closed"
  },
  {
    id: "FRIDGE-C1",
    location: "Emergency Storage",
    currentTemp: 4.1,
    targetTemp: 4.0,
    status: "normal", 
    lastUpdate: "2024-01-16 14:32:18",
    connectivity: "online",
    powerStatus: "on",
    humidity: 42,
    doorStatus: "closed"
  },
  {
    id: "FREEZER-F1",
    location: "Plasma Storage", 
    currentTemp: -18.5,
    targetTemp: -18.0,
    status: "normal",
    lastUpdate: "2024-01-16 14:32:12",
    connectivity: "offline",
    powerStatus: "on",
    humidity: 35,
    doorStatus: "closed"
  }
];

const initialAlerts = [
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

const getTemperatureColor = (current: number, target: number, type: string = "fridge") => {
  const range = type === "freezer" ? 2 : 0.5;
  const diff = Math.abs(current - target);
  if (diff > range * 2) return "text-destructive";
  if (diff > range) return "text-warning";
  return "text-success";
};

const getTemperatureBackground = (current: number, target: number, type: string = "fridge") => {
  const range = type === "freezer" ? 2 : 0.5;
  const diff = Math.abs(current - target);
  if (diff > range * 2) return "bg-destructive/20";
  if (diff > range) return "bg-warning/20";
  return "bg-success/20";
};

export default function Monitoring() {
  const [storageUnits, setStorageUnits] = useState(initialStorageUnits);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [temperatureData, setTemperatureData] = useState(initialTemperatureData);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMonitorOpen, setIsMonitorOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(prev => prev + 1);
      // Simulate small temperature fluctuations
      setTemperatureData(prev => prev.map(item => ({
        ...item,
        temp: Math.round((item.temp + (Math.random() - 0.5) * 0.2) * 10) / 10
      })));

      // Simulate unit status changes
      setStorageUnits(prev => prev.map(unit => {
        if (unit.connectivity === "online") {
          const fluctuation = (Math.random() - 0.5) * 0.3;
          const newTemp = Math.round((unit.currentTemp + fluctuation) * 10) / 10;
          const diff = Math.abs(newTemp - unit.targetTemp);
          const range = unit.id.includes("FREEZER") ? 2 : 0.5;
          
          return {
            ...unit,
            currentTemp: newTemp,
            status: diff > range * 2 ? "critical" : diff > range ? "warning" : "normal",
            lastUpdate: new Date().toLocaleString('en-US', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false 
            }).replace(/,/g, '')
          };
        }
        return unit;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalUnits = storageUnits.length;
  const onlineUnits = storageUnits.filter(unit => unit.connectivity === "online").length;
  const normalUnits = storageUnits.filter(unit => unit.status === "normal").length;
  const activeAlerts = alerts.filter(alert => !alert.acknowledged).length;

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleAcknowledgeAll = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
  };

  const handleMonitor = (unit: any) => {
    setSelectedUnit(unit);
    setIsMonitorOpen(true);
  };

  const handleSettings = (unit: any) => {
    setSelectedUnit(unit);
    setIsSettingsOpen(true);
  };

  const handleUpdateSettings = (unitId: string, newTargetTemp: number) => {
    setStorageUnits(prev => prev.map(unit => 
      unit.id === unitId ? { ...unit, targetTemp: newTargetTemp } : unit
    ));
    setIsSettingsOpen(false);
  };

  const handleTogglePower = (unitId: string) => {
    setStorageUnits(prev => prev.map(unit => 
      unit.id === unitId ? { 
        ...unit, 
        powerStatus: unit.powerStatus === "on" ? "off" : "on",
        status: unit.powerStatus === "on" ? "critical" : "normal"
      } : unit
    ));
  };

  const handleReconnect = (unitId: string) => {
    setStorageUnits(prev => prev.map(unit => 
      unit.id === unitId ? { ...unit, connectivity: "online" } : unit
    ));
  };

  const TemperatureGauge = ({ current, target, type, size = "medium" }) => {
    const isFreezer = type === "freezer";
    const minTemp = isFreezer ? -25 : 0;
    const maxTemp = isFreezer ? -15 : 8;
    const percentage = ((current - minTemp) / (maxTemp - minTemp)) * 100;
    const targetPercentage = ((target - minTemp) / (maxTemp - minTemp)) * 100;
    
    return (
      <div className={`relative ${size === "large" ? "w-32 h-32" : "w-20 h-20"}`}>
        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
        <div 
          className={`absolute inset-0 rounded-full ${getTemperatureBackground(current, target, type)} transition-all duration-500`}
          style={{ clipPath: `inset(${100 - percentage}% 0 0 0)` }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold ${size === "large" ? "text-2xl" : "text-lg"} ${getTemperatureColor(current, target, type)}`}>
            {current}°C
          </span>
          <span className={`${size === "large" ? "text-sm" : "text-xs"} text-muted-foreground`}>
            Target: {target}°C
          </span>
        </div>
        {targetPercentage > 0 && targetPercentage < 100 && (
          <div 
            className="absolute w-1 bg-foreground rounded-full transform -translate-y-1/2"
            style={{
              height: "6%",
              top: `${100 - targetPercentage}%`,
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)"
            }}
          ></div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .pulse-warning {
          animation: pulse 2s infinite;
        }
        .temperature-bar {
          transition: all 0.5s ease-in-out;
        }
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Storage & Temperature Monitoring
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring of blood storage temperature and conditions
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setRefresh(prev => prev + 1)}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${refresh > 0 ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Storage Units"
          value={totalUnits}
          icon={Thermometer}
          description="Total monitored"
          className="hover-lift"
        />
        <StatsCard
          title="Online Units"
          value={onlineUnits}
          icon={Wifi}
          changeType={onlineUnits === totalUnits ? "positive" : "warning"}
          description={`${Math.round((onlineUnits/totalUnits) * 100)}% connectivity`}
          className="hover-lift"
        />
        <StatsCard
          title="Normal Status"
          value={normalUnits}
          icon={CheckCircle}
          changeType={normalUnits === totalUnits ? "positive" : "warning"}
          description="Operating normally"
          className="hover-lift"
        />
        <StatsCard
          title="Active Alerts"
          value={activeAlerts}
          icon={AlertTriangle}
          changeType={activeAlerts > 0 ? "negative" : "positive"}
          description="Require attention"
          className={`hover-lift ${activeAlerts > 0 ? 'pulse-warning' : ''}`}
        />
      </div>

      {/* Temperature Chart with Gauge */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-xl font-bold flex items-center space-x-2">
              <Thermometer className="h-5 w-5" />
              <span>Temperature Trend - Last 24 Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64 flex items-end justify-between space-x-1">
              {temperatureData.map((data, index) => {
                const height = Math.max(20, (data.temp + 20) * 4);
                const isCritical = data.temp > 6 || data.temp < 2;
                const isWarning = (data.temp > 4.5 || data.temp < 3.5) && !isCritical;
                
                return (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div 
                      className={`w-full rounded-t transition-all duration-500 temperature-bar ${
                        isCritical ? 'bg-destructive' : isWarning ? 'bg-warning' : 'bg-primary'
                      }`}
                      style={{ height: `${height}px` }}
                    ></div>
                    <div className="text-xs text-muted-foreground transform -rotate-45 origin-left">
                      {data.time}
                    </div>
                    <div className={`text-xs font-medium ${
                      isCritical ? 'text-destructive' : isWarning ? 'text-warning' : 'text-foreground'
                    }`}>
                      {data.temp}°C
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded"></div>
                <span className="text-sm">Normal Range (2-6°C)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded"></div>
                <span className="text-sm">Warning Range</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded"></div>
                <span className="text-sm">Critical Range</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-xl font-bold">Current Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {storageUnits.map((unit, index) => (
                <div 
                  key={unit.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-all duration-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      unit.status === "normal" ? "bg-success/20" : 
                      unit.status === "warning" ? "bg-warning/20" : "bg-destructive/20"
                    }`}>
                      <Thermometer className={`h-4 w-4 ${
                        unit.status === "normal" ? "text-success" : 
                        unit.status === "warning" ? "text-warning" : "text-destructive"
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{unit.id}</div>
                      <div className="text-xs text-muted-foreground">{unit.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      getTemperatureColor(unit.currentTemp, unit.targetTemp, unit.id.includes("FREEZER") ? "freezer" : "fridge")
                    }`}>
                      {unit.currentTemp}°C
                    </div>
                    <StatusBadge variant={getStatusVariant(unit.status)} className="text-xs">
                      {unit.status}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Units Status */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="text-xl font-bold">Storage Units Detailed Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 font-semibold">Unit ID</th>
                  <th className="text-left py-4 px-6 font-semibold">Temperature</th>
                  <th className="text-left py-4 px-6 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 font-semibold">Connectivity</th>
                  <th className="text-left py-4 px-6 font-semibold">Power</th>
                  <th className="text-left py-4 px-6 font-semibold">Last Update</th>
                  <th className="text-center py-4 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {storageUnits.map((unit, index) => (
                  <tr 
                    key={unit.id}
                    className="border-b border-border hover:bg-primary/5 transition-all duration-200 animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-mono font-bold text-primary">{unit.id}</div>
                        <div className="text-xs text-muted-foreground">{unit.location}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <TemperatureGauge 
                          current={unit.currentTemp} 
                          target={unit.targetTemp}
                          type={unit.id.includes("FREEZER") ? "freezer" : "fridge"}
                        />
                        <div>
                          <div className={`font-bold ${getTemperatureColor(unit.currentTemp, unit.targetTemp, unit.id.includes("FREEZER") ? "freezer" : "fridge")}`}>
                            {unit.currentTemp}°C
                          </div>
                          <div className="text-xs text-muted-foreground">Target: {unit.targetTemp}°C</div>
                          <div className="text-xs text-muted-foreground">Humidity: {unit.humidity}%</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge variant={getStatusVariant(unit.status)}>
                        <div className="flex items-center space-x-1">
                          {unit.status === "normal" && <CheckCircle className="h-3 w-3" />}
                          {unit.status === "warning" && <AlertTriangle className="h-3 w-3" />}
                          <span className="capitalize">{unit.status}</span>
                        </div>
                      </StatusBadge>
                      <div className="text-xs text-muted-foreground mt-1">
                        Door: <Badge variant={unit.doorStatus === "open" ? "destructive" : "outline"}>{unit.doorStatus}</Badge>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {unit.connectivity === "online" ? (
                          <Wifi className="h-4 w-4 text-success" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-destructive" />
                        )}
                        <span className={`text-sm ${unit.connectivity === "online" ? "text-success" : "text-destructive"}`}>
                          {unit.connectivity}
                        </span>
                        {unit.connectivity === "offline" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleReconnect(unit.id)}
                            className="ml-2 text-xs"
                          >
                            Reconnect
                          </Button>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Power className={`h-4 w-4 ${unit.powerStatus === "on" ? "text-success" : "text-destructive"}`} />
                        <Switch
                          checked={unit.powerStatus === "on"}
                          onCheckedChange={() => handleTogglePower(unit.id)}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-mono">{unit.lastUpdate}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleMonitor(unit)}
                          className="flex items-center space-x-1"
                        >
                          <Activity className="h-3 w-3" />
                          <span>Monitor</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleSettings(unit)}
                          className="flex items-center space-x-1"
                        >
                          <Settings className="h-3 w-3" />
                          <span>Settings</span>
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

      {/* Alerts */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Recent Alerts</span>
              {activeAlerts > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {activeAlerts} Active
                </Badge>
              )}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleAcknowledgeAll}>
              Acknowledge All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={alert.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  alert.acknowledged ? "bg-muted/30" : "bg-muted/50 border-l-4"
                } ${
                  alert.severity === "critical" && !alert.acknowledged ? "border-l-destructive" :
                  alert.severity === "warning" && !alert.acknowledged ? "border-l-warning" :
                  "border-l-transparent"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    alert.severity === "critical" ? "bg-destructive/20" :
                    alert.severity === "warning" ? "bg-warning/20" : "bg-primary/20"
                  }`}>
                    {alert.severity === "critical" && <AlertTriangle className="h-5 w-5 text-destructive" />}
                    {alert.severity === "warning" && <AlertTriangle className="h-5 w-5 text-warning" />}
                    {alert.severity === "info" && <CheckCircle className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{alert.message}</div>
                    <div className="text-sm text-muted-foreground">
                      {alert.unit} • {alert.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <StatusBadge variant={getSeverityVariant(alert.severity)}>
                    {alert.severity}
                  </StatusBadge>
                  {!alert.acknowledged && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAcknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monitor Dialog */}
      <Dialog open={isMonitorOpen} onOpenChange={setIsMonitorOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Monitor Unit - {selectedUnit?.id}</DialogTitle>
            <DialogDescription>
              Real-time monitoring and detailed status information
            </DialogDescription>
          </DialogHeader>
          {selectedUnit && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <TemperatureGauge 
                    current={selectedUnit.currentTemp} 
                    target={selectedUnit.targetTemp}
                    type={selectedUnit.id.includes("FREEZER") ? "freezer" : "fridge"}
                    size="large"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Unit Information</Label>
                    <div className="font-semibold">{selectedUnit.location}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Current Temp</Label>
                      <div className={`font-bold text-xl ${getTemperatureColor(selectedUnit.currentTemp, selectedUnit.targetTemp)}`}>
                        {selectedUnit.currentTemp}°C
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Target Temp</Label>
                      <div className="font-bold text-xl">{selectedUnit.targetTemp}°C</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Humidity</Label>
                      <div className="font-semibold">{selectedUnit.humidity}%</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Door Status</Label>
                      <Badge variant={selectedUnit.doorStatus === "open" ? "destructive" : "outline"}>
                        {selectedUnit.doorStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <StatusBadge variant={getStatusVariant(selectedUnit.status)}>
                    {selectedUnit.status}
                  </StatusBadge>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground">Connectivity</div>
                  <div className={`font-semibold ${selectedUnit.connectivity === "online" ? "text-success" : "text-destructive"}`}>
                    {selectedUnit.connectivity}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground">Power</div>
                  <div className={`font-semibold ${selectedUnit.powerStatus === "on" ? "text-success" : "text-destructive"}`}>
                    {selectedUnit.powerStatus}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Unit Settings - {selectedUnit?.id}</DialogTitle>
            <DialogDescription>
              Configure temperature settings and unit parameters
            </DialogDescription>
          </DialogHeader>
          {selectedUnit && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="targetTemp">Target Temperature (°C)</Label>
                  <Input 
                    id="targetTemp"
                    type="number" 
                    step="0.1"
                    value={selectedUnit.targetTemp}
                    onChange={(e) => setSelectedUnit({
                      ...selectedUnit,
                      targetTemp: parseFloat(e.target.value)
                    })}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Recommended range: {selectedUnit.id.includes("FREEZER") ? "-25°C to -15°C" : "2°C to 6°C"}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="powerStatus">Power Status</Label>
                  <Switch
                    id="powerStatus"
                    checked={selectedUnit.powerStatus === "on"}
                    onCheckedChange={(checked) => setSelectedUnit({
                      ...selectedUnit,
                      powerStatus: checked ? "on" : "off"
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="alertThreshold">Alert Threshold</Label>
                  <Select defaultValue="0.5">
                    <SelectTrigger>
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.2">±0.2°C (Strict)</SelectItem>
                      <SelectItem value="0.5">±0.5°C (Normal)</SelectItem>
                      <SelectItem value="1.0">±1.0°C (Lenient)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdateSettings(selectedUnit.id, selectedUnit.targetTemp)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}