import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Activity, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Shield,
  Brain
} from "lucide-react";

const Health = () => {
  const [eligibilityStatus, setEligibilityStatus] = useState("eligible");
  const [fitnessScore, setFitnessScore] = useState(85);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              Health Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor your health status and donation eligibility
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
            <Activity className="h-4 w-4 mr-2" />
            Sync Health Data
          </Button>
        </div>

        {/* Health Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Eligibility Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Badge variant={eligibilityStatus === "eligible" ? "default" : "destructive"} className="bg-success text-success-foreground">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {eligibilityStatus === "eligible" ? "Eligible" : "Not Eligible"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Last updated: Today
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Next eligibility check in 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-info" />
                AI Fitness Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{fitnessScore}%</span>
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <Progress value={fitnessScore} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Excellent donor health profile
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-warning" />
                Next Donation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">Available Now</p>
                <p className="text-sm text-muted-foreground">
                  Blood donation: Ready
                </p>
                <p className="text-sm text-muted-foreground">
                  Last donation: 65 days ago
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="questionnaire" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="questionnaire">Health Questionnaire</TabsTrigger>
            <TabsTrigger value="reports">Medical Reports</TabsTrigger>
            <TabsTrigger value="vitals">Vitals Tracking</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          {/* Health Questionnaire */}
          <TabsContent value="questionnaire" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Health Assessment
                </CardTitle>
                <CardDescription>
                  Complete your health questionnaire to maintain donation eligibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" placeholder="Enter your weight" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" placeholder="Enter your height" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea 
                    id="medications" 
                    placeholder="List any medications you're currently taking..." 
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Recent Health History</Label>
                  <div className="space-y-3">
                    {[
                      "Have you traveled outside your country in the last 6 months?",
                      "Have you had any surgeries in the last 12 months?",
                      "Do you have any chronic medical conditions?",
                      "Have you received any blood transfusions?"
                    ].map((question, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">{question}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Yes</Button>
                          <Button variant="outline" size="sm">No</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                  Update Health Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Reports */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Reports
                  </CardTitle>
                  <CardDescription>
                    Upload your latest medical reports and test results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-sm font-medium">Drop files here or click to upload</p>
                      <p className="text-xs text-muted-foreground">
                        Supports PDF, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                    <Button variant="outline">Select Files</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>
                    Your uploaded medical documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Blood Test - Complete Panel", date: "2024-01-15", status: "Reviewed" },
                      { name: "Health Checkup Report", date: "2024-01-10", status: "Pending" },
                      { name: "Vaccination Record", date: "2024-01-05", status: "Approved" }
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{report.name}</p>
                          <p className="text-xs text-muted-foreground">{report.date}</p>
                        </div>
                        <Badge variant={report.status === "Approved" ? "default" : "secondary"} 
                               className={report.status === "Approved" ? "bg-success text-success-foreground" : ""}>
                          {report.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vitals Tracking */}
          <TabsContent value="vitals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Blood Pressure", value: "120/80", status: "normal", icon: Heart },
                { label: "Heart Rate", value: "72 bpm", status: "good", icon: Activity },
                { label: "Hemoglobin", value: "14.2 g/dL", status: "excellent", icon: TrendingUp },
                { label: "Iron Level", value: "95 μg/dL", status: "good", icon: Shield }
              ].map((vital, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <vital.icon className="h-5 w-5 text-primary" />
                      <Badge variant="outline" className={
                        vital.status === "excellent" ? "border-success text-success" :
                        vital.status === "good" ? "border-info text-info" : "border-warning text-warning"
                      }>
                        {vital.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{vital.label}</p>
                    <p className="text-lg font-semibold">{vital.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Vitals History</CardTitle>
                <CardDescription>
                  Track your vital signs over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <p>Interactive vitals chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-info" />
                    Health Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Optimize Iron Intake",
                      description: "Your iron levels are good, but consider iron-rich foods 2 days before donation.",
                      priority: "medium"
                    },
                    {
                      title: "Hydration Reminder",
                      description: "Increase water intake 24 hours before your next donation appointment.",
                      priority: "high"
                    },
                    {
                      title: "Rest Schedule",
                      description: "Ensure 7-8 hours of sleep before donation for optimal recovery.",
                      priority: "low"
                    }
                  ].map((rec, index) => (
                    <div key={index} className="flex gap-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        rec.priority === "high" ? "bg-critical" :
                        rec.priority === "medium" ? "bg-warning" : "bg-info"
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{rec.title}</p>
                        <p className="text-xs text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Donation Readiness Score</CardTitle>
                  <CardDescription>
                    AI-powered assessment of your donation readiness
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success mb-2">95%</div>
                    <p className="text-sm text-muted-foreground">Excellent donation readiness</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    {[
                      { factor: "Health Status", score: 98 },
                      { factor: "Vital Signs", score: 95 },
                      { factor: "Recovery Time", score: 92 },
                      { factor: "Nutrition Level", score: 94 }
                    ].map((factor, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{factor.factor}</span>
                          <span className="font-medium">{factor.score}%</span>
                        </div>
                        <Progress value={factor.score} className="h-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Health;