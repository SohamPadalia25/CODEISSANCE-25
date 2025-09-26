import { TestTube, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for quality control testing
const testResults = [
  {
    id: "QC001",
    donationId: "D001",
    donor: "John Smith",
    bloodType: "O+",
    collectedDate: "2024-01-15",
    testDate: "2024-01-16",
    status: "passed",
    tests: {
      hiv: "negative",
      hepatitisB: "negative", 
      hepatitisC: "negative",
      syphilis: "negative",
      bloodTyping: "confirmed"
    }
  },
  {
    id: "QC002",
    donationId: "D002",
    donor: "Maria Garcia", 
    bloodType: "A-",
    collectedDate: "2024-01-15",
    testDate: "2024-01-16",
    status: "in_progress",
    tests: {
      hiv: "pending",
      hepatitisB: "negative",
      hepatitisC: "negative", 
      syphilis: "negative",
      bloodTyping: "confirmed"
    }
  },
  {
    id: "QC003",
    donationId: "D003",
    donor: "Robert Chen",
    bloodType: "B+", 
    collectedDate: "2024-01-14",
    testDate: "2024-01-15",
    status: "passed",
    tests: {
      hiv: "negative",
      hepatitisB: "negative",
      hepatitisC: "negative",
      syphilis: "negative", 
      bloodTyping: "confirmed"
    }
  },
  {
    id: "QC004",
    donationId: "D004",
    donor: "Lisa Johnson",
    bloodType: "AB-",
    collectedDate: "2024-01-14", 
    testDate: "2024-01-15",
    status: "failed",
    tests: {
      hiv: "negative",
      hepatitisB: "positive",
      hepatitisC: "negative",
      syphilis: "negative",
      bloodTyping: "confirmed"
    }
  },
  {
    id: "QC005",
    donationId: "D005", 
    donor: "Michael Brown",
    bloodType: "O-",
    collectedDate: "2024-01-13",
    testDate: "pending",
    status: "pending",
    tests: {
      hiv: "pending",
      hepatitisB: "pending", 
      hepatitisC: "pending",
      syphilis: "pending",
      bloodTyping: "pending"
    }
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "passed":
      return "success";
    case "failed":
      return "critical";
    case "in_progress":
      return "warning";
    case "pending":
      return "pending";
    default:
      return "info";
  }
};

const getTestResultVariant = (result: string) => {
  switch (result) {
    case "negative":
    case "confirmed":
      return "success";
    case "positive":
      return "critical";
    case "pending":
      return "warning";
    default:
      return "info";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "passed":
      return <CheckCircle className="h-4 w-4" />;
    case "failed":
      return <AlertTriangle className="h-4 w-4" />;
    case "in_progress":
      return <TestTube className="h-4 w-4" />;
    default:
      return <TestTube className="h-4 w-4" />;
  }
};

export default function Quality() {
  const totalTests = testResults.length;
  const passedTests = testResults.filter(test => test.status === "passed").length;
  const failedTests = testResults.filter(test => test.status === "failed").length;
  const pendingTests = testResults.filter(test => test.status === "pending" || test.status === "in_progress").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quality Control</h1>
        <p className="text-muted-foreground mt-2">
          Monitor blood testing results and quality assurance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTests}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{passedTests}</div>
            <p className="text-xs text-muted-foreground">{Math.round((passedTests/totalTests) * 100)}% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{failedTests}</div>
            <p className="text-xs text-muted-foreground">Require disposal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <TestTube className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingTests}</div>
            <p className="text-xs text-muted-foreground">Awaiting results</p>
          </CardContent>
        </Card>
      </div>

      {/* Test Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Test ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Donor</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Blood Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Test Date</th>  
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((test) => (
                  <tr key={test.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">{test.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-foreground">{test.donor}</div>
                        <div className="text-xs text-muted-foreground">{test.donationId}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{test.bloodType}</span>
                        </div>
                        <span className="font-medium">{test.bloodType}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {test.testDate === "pending" ? (
                        <span className="text-warning">Pending</span>
                      ) : (
                        test.testDate
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge variant={getStatusVariant(test.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(test.status)}
                          <span className="capitalize">{test.status.replace('_', ' ')}</span>
                        </div>
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {test.status === "passed" && (
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Certificate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quarantine & Release Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quarantine & Release Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">12</div>
                <div className="text-sm text-muted-foreground">Units in Quarantine</div>
                <Button className="mt-2 w-full" variant="outline" size="sm">
                  Review Quarantine
                </Button>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">38</div>
                <div className="text-sm text-muted-foreground">Units Released</div>
                <Button className="mt-2 w-full" variant="outline" size="sm">
                  Release History
                </Button>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">3</div>
                <div className="text-sm text-muted-foreground">Units Destroyed</div>
                <Button className="mt-2 w-full" variant="outline" size="sm">
                  Disposal Records
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Traceability Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Traceability Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Donation ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm font-medium">D001</td>
                  <td className="py-3 px-4">
                    <StatusBadge variant="success">Released</StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-sm">Dr. Sarah Johnson</td>
                  <td className="py-3 px-4 text-sm">2024-01-16 14:30</td>
                  <td className="py-3 px-4 text-sm">All tests passed, approved for distribution</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm font-medium">D002</td>
                  <td className="py-3 px-4">
                    <StatusBadge variant="warning">Quarantined</StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-sm">Lab Tech Mike</td>
                  <td className="py-3 px-4 text-sm">2024-01-16 13:15</td>
                  <td className="py-3 px-4 text-sm">Pending HIV test results</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm font-medium">D004</td>
                  <td className="py-3 px-4">
                    <StatusBadge variant="critical">Destroyed</StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-sm">Dr. Sarah Johnson</td>
                  <td className="py-3 px-4 text-sm">2024-01-16 10:45</td>
                  <td className="py-3 px-4 text-sm">Hepatitis B positive, incinerated per protocol</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm font-medium">D005</td>
                  <td className="py-3 px-4">
                    <StatusBadge variant="info">Collected</StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-sm">Nurse Lisa Chen</td>
                  <td className="py-3 px-4 text-sm">2024-01-16 09:30</td>
                  <td className="py-3 px-4 text-sm">Initial collection completed, sent to lab</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Test Parameters and Quality Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">HIV Antibody Test</span>
                <StatusBadge variant="success">Required</StatusBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Hepatitis B Surface Antigen</span>
                <StatusBadge variant="success">Required</StatusBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Hepatitis C Virus</span>
                <StatusBadge variant="success">Required</StatusBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Syphilis (RPR/VDRL)</span>
                <StatusBadge variant="success">Required</StatusBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Blood Group Confirmation</span>
                <StatusBadge variant="success">Required</StatusBadge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((passedTests/totalTests) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full" 
                    style={{width: `${(passedTests/totalTests) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Processing Time</span>
                  <span className="text-sm text-muted-foreground">24h avg</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-4/5"></div>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}