import { SidebarProvider } from "@/components/ui/sidebar";
import { DonorSidebar } from "@/components/DonorSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Download, Heart, Droplets, Award, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const History = () => {
  const donationHistory = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Blood",
      hospital: "General Hospital",
      outcome: "Successful",
      units: "450ml",
      recipient: "Emergency Surgery Patient"
    },
    {
      id: 2,
      date: "2023-10-20",
      type: "Platelets",
      hospital: "Children's Medical Center",
      outcome: "Successful",
      units: "1 unit",
      recipient: "Cancer Treatment Patient"
    },
    {
      id: 3,
      date: "2023-07-12",
      type: "Blood",
      hospital: "City Emergency",
      outcome: "Successful",
      units: "450ml",
      recipient: "Accident Victim"
    },
    {
      id: 4,
      date: "2023-04-08",
      type: "Blood",
      hospital: "General Hospital",
      outcome: "Successful",
      units: "450ml",
      recipient: "Maternity Ward"
    }
  ];

  const monthlyData = [
    { month: 'Jan', donations: 1, lives: 3 },
    { month: 'Feb', donations: 0, lives: 0 },
    { month: 'Mar', donations: 0, lives: 0 },
    { month: 'Apr', donations: 1, lives: 3 },
    { month: 'May', donations: 0, lives: 0 },
    { month: 'Jun', donations: 0, lives: 0 },
    { month: 'Jul', donations: 1, lives: 3 },
    { month: 'Aug', donations: 0, lives: 0 },
    { month: 'Sep', donations: 0, lives: 0 },
    { month: 'Oct', donations: 1, lives: 3 },
    { month: 'Nov', donations: 0, lives: 0 },
    { month: 'Dec', donations: 0, lives: 0 }
  ];

  const donationTypes = [
    { name: 'Whole Blood', value: 75, color: '#dc2626' },
    { name: 'Platelets', value: 20, color: '#f97316' },
    { name: 'Plasma', value: 5, color: '#eab308' }
  ];

  const yearlyComparison = [
    { year: '2022', donations: 3, impact: 9 },
    { year: '2023', donations: 4, impact: 12 },
    { year: '2024', donations: 1, impact: 3 }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DonorSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Donation History
              </h1>
              <p className="text-muted-foreground">
                Track your donation journey and see the lives you've impacted.
              </p>
            </div>

            {/* Impact Overview Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <Droplets className="h-4 w-4 text-critical" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    +1 from last quarter
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lives Saved</CardTitle>
                  <Heart className="h-4 w-4 text-critical" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    Each donation saves ~3 lives
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Volume</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.6L</div>
                  <p className="text-xs text-muted-foreground">
                    Lifetime contribution
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Donor Level</CardTitle>
                  <Award className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Gold</div>
                  <p className="text-xs text-muted-foreground">
                    2 more to reach Platinum
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Monthly Donation Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Donations (2024)</CardTitle>
                  <CardDescription>Your donation frequency throughout the year</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="donations" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="lives" stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Donation Type Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Donation Types</CardTitle>
                  <CardDescription>Distribution of your donation types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={donationTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {donationTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Yearly Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Yearly Impact Comparison</CardTitle>
                <CardDescription>Compare your donation impact across years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={yearlyComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donations" fill="hsl(var(--primary))" name="Donations" />
                    <Bar dataKey="impact" fill="hsl(var(--success))" name="Lives Impacted" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Donation History Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Donation Records</CardTitle>
                  <CardDescription>Complete history of your donations</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donationHistory.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          {new Date(donation.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={donation.type === 'Blood' ? 'destructive' : 'default'}>
                            {donation.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{donation.hospital}</TableCell>
                        <TableCell>{donation.units}</TableCell>
                        <TableCell className="text-muted-foreground">{donation.recipient}</TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-success text-success-foreground">
                            {donation.outcome}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Progress to Next Level */}
            <Card>
              <CardHeader>
                <CardTitle>Progress to Platinum Donor</CardTitle>
                <CardDescription>You're just 2 donations away from reaching Platinum status!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Progress</span>
                    <span>8/10 donations</span>
                  </div>
                  <Progress value={80} className="w-full" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Platinum donors receive priority booking, exclusive health reports, and special recognition certificates.
                </p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default History;