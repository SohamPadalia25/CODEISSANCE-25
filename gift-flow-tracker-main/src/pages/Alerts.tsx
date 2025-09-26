import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DonorSidebar } from "@/components/DonorSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Bell, Clock, MapPin, Settings, Smartphone, Mail, Volume2, CheckCircle, XCircle, Heart, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Alerts = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    emergencyOnly: false,
    maxDistance: "25",
    bloodTypeMatch: true,
    soundEnabled: true
  });

  const emergencyAlerts = [
    {
      id: 1,
      type: "critical",
      title: "O- Blood Critically Low",
      message: "Regional blood bank reserves at 2% capacity",
      hospital: "Multiple Hospitals",
      distance: "City-wide",
      time: "15 mins ago",
      priority: "HIGH",
      actionRequired: true
    },
    {
      id: 2,
      type: "urgent",
      title: "Mass Casualty Event",
      message: "Highway accident - All blood types needed",
      hospital: "Trauma Center",
      distance: "5.2 miles",
      time: "32 mins ago",
      priority: "CRITICAL",
      actionRequired: true
    },
    {
      id: 3,
      type: "warning",
      title: "Scheduled Surgery Needs",
      message: "3 surgeries tomorrow requiring A+ blood",
      hospital: "General Hospital",
      distance: "2.3 miles",
      time: "2 hours ago",
      priority: "MEDIUM",
      actionRequired: false
    }
  ];

  const personalizedAlerts = [
    {
      id: 1,
      type: "prediction",
      title: "Shortage Prediction Alert",
      message: "AI predicts O+ shortage in your area within 48 hours based on seasonal trends",
      severity: "info",
      time: "4 hours ago",
      category: "AI Forecast"
    },
    {
      id: 2,
      type: "reminder",
      title: "Donation Eligibility Restored",
      message: "You're now eligible to donate again. Last donation was 12 weeks ago.",
      severity: "success",
      time: "1 day ago",
      category: "Personal"
    },
    {
      id: 3,
      type: "achievement",
      title: "Milestone Reached!",
      message: "Congratulations! You've saved 24 lives through your donations.",
      severity: "success",
      time: "3 days ago",
      category: "Achievement"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Responded to emergency alert",
      hospital: "City Emergency",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      action: "Received critical shortage alert",
      hospital: "Regional Medical",
      time: "1 day ago",
      status: "viewed"
    },
    {
      id: 3,
      action: "Donation reminder sent",
      hospital: "General Hospital",
      time: "3 days ago",
      status: "acted"
    }
  ];

  const priorityColors = {
    CRITICAL: "bg-critical text-critical-foreground",
    HIGH: "bg-destructive text-destructive-foreground",
    MEDIUM: "bg-warning text-warning-foreground",
    LOW: "bg-info text-info-foreground"
  };

  const severityColors = {
    critical: "border-critical bg-critical/5",
    urgent: "border-destructive bg-destructive/5",
    warning: "border-warning bg-warning/5",
    info: "border-info bg-info/5",
    success: "border-success bg-success/5"
  };

  const handleAlertAction = (alertId: number, action: string) => {
    toast({
      title: "Alert Action",
      description: `${action} action completed for alert #${alertId}`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DonorSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Emergency Alerts
              </h1>
              <p className="text-muted-foreground">
                Stay informed about urgent blood needs and manage your notification preferences.
              </p>
            </div>

            <Tabs defaultValue="alerts" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
                <TabsTrigger value="personalized">Personal Alerts</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="alerts" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-critical" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">
                        2 critical, 1 medium priority
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                      <TrendingUp className="h-4 w-4 text-success" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87%</div>
                      <p className="text-xs text-muted-foreground">
                        Above community average
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                      <Clock className="h-4 w-4 text-info" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12m</div>
                      <p className="text-xs text-muted-foreground">
                        Faster than last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Emergency Alerts */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Current Emergency Alerts</h2>
                  {emergencyAlerts.map((alert) => (
                    <Card key={alert.id} className={severityColors[alert.type as keyof typeof severityColors]}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">{alert.title}</CardTitle>
                              <Badge className={priorityColors[alert.priority as keyof typeof priorityColors]}>
                                {alert.priority}
                              </Badge>
                            </div>
                            <CardDescription className="text-base">{alert.message}</CardDescription>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {alert.time}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Heart className="h-4 w-4 text-muted-foreground" />
                              <span>{alert.hospital}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{alert.distance}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {alert.actionRequired && (
                              <>
                                <Button 
                                  onClick={() => handleAlertAction(alert.id, "Respond")}
                                  className="bg-critical hover:bg-critical/90"
                                >
                                  Respond Now
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => handleAlertAction(alert.id, "Dismiss")}
                                >
                                  Dismiss
                                </Button>
                              </>
                            )}
                            {!alert.actionRequired && (
                              <Button variant="outline">
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="personalized" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Personalized Alerts</h2>
                  {personalizedAlerts.map((alert) => (
                    <Card key={alert.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CardTitle>{alert.title}</CardTitle>
                              <Badge variant="outline">{alert.category}</Badge>
                            </div>
                            <CardDescription>{alert.message}</CardDescription>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {alert.time}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Read
                          </Button>
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Alert Activity</CardTitle>
                    <CardDescription>Your interactions with emergency alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div className="space-y-1">
                            <p className="font-medium text-sm">{activity.action}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Heart className="h-3 w-3" />
                              {activity.hospital}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={activity.status === 'completed' ? 'default' : 'secondary'}
                              className={activity.status === 'completed' ? 'bg-success text-success-foreground' : ''}
                            >
                              {activity.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Notification Preferences */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Notification Preferences
                      </CardTitle>
                      <CardDescription>
                        Customize how you receive emergency alerts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            Push Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Instant alerts on your device
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, pushNotifications: checked})
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Detailed alerts via email
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emailAlerts}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, emailAlerts: checked})
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            SMS Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Text messages for critical alerts
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.smsAlerts}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, smsAlerts: checked})
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4" />
                            Sound Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Audio notifications enabled
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.soundEnabled}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, soundEnabled: checked})
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Emergency Only Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Only critical and high priority alerts
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emergencyOnly}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, emergencyOnly: checked})
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Alert Criteria */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Alert Criteria</CardTitle>
                      <CardDescription>
                        Set your preferences for receiving alerts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Maximum Alert Distance</Label>
                        <Select 
                          value={notificationSettings.maxDistance} 
                          onValueChange={(value) => 
                            setNotificationSettings({...notificationSettings, maxDistance: value})
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 miles</SelectItem>
                            <SelectItem value="10">10 miles</SelectItem>
                            <SelectItem value="25">25 miles</SelectItem>
                            <SelectItem value="50">50 miles</SelectItem>
                            <SelectItem value="100">100 miles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Blood Type Match Only</Label>
                          <p className="text-sm text-muted-foreground">
                            Only alerts for your compatible blood types
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.bloodTypeMatch}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, bloodTypeMatch: checked})
                          }
                        />
                      </div>

                      <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                        <h4 className="font-medium flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          AI Prediction Alerts
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Receive AI-powered shortage predictions and personalized donation recommendations.
                        </p>
                        <Switch defaultChecked />
                      </div>

                      <Button className="w-full">
                        Save Preferences
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Alerts;