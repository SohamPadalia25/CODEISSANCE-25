import { FileText, Download, Calendar, BarChart3, TrendingUp, Activity } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";

// Mock data for reports
const recentReports = [
  {
    id: "RPT001",
    name: "Weekly Donation Summary",
    type: "Donation Report", 
    generatedDate: "2024-01-16",
    period: "Jan 8-14, 2024",
    status: "completed",
    fileSize: "2.3 MB"
  },
  {
    id: "RPT002",
    name: "Monthly Quality Control",
    type: "Quality Report",
    generatedDate: "2024-01-15", 
    period: "December 2023",
    status: "completed",
    fileSize: "5.1 MB"
  },
  {
    id: "RPT003",
    name: "Distribution Analytics",
    type: "Distribution Report",
    generatedDate: "2024-01-14",
    period: "Jan 1-14, 2024", 
    status: "processing",
    fileSize: null
  },
  {
    id: "RPT004",
    name: "Regulatory Compliance Audit",
    type: "Compliance Report",
    generatedDate: "2024-01-12",
    period: "Q4 2023",
    status: "completed",
    fileSize: "8.7 MB"
  }
];

const auditTrail = [
  {
    id: "AUD001",
    action: "Report Generated",
    user: "Dr. Sarah Johnson",
    target: "Weekly Donation Summary",
    timestamp: "2024-01-16 09:30:15",
    ipAddress: "192.168.1.45"
  },
  {
    id: "AUD002", 
    action: "Data Export",
    user: "Mike Anderson",
    target: "Inventory Report - Excel",
    timestamp: "2024-01-16 08:15:22",
    ipAddress: "192.168.1.67"
  },
  {
    id: "AUD003",
    action: "Report Deleted",
    user: "Dr. Sarah Johnson", 
    target: "Test Report - Dec 2023",
    timestamp: "2024-01-15 16:45:33",
    ipAddress: "192.168.1.45"
  },
  {
    id: "AUD004",
    action: "Settings Modified",
    user: "Admin User",
    target: "Report Generation Schedule",
    timestamp: "2024-01-15 14:20:18",
    ipAddress: "192.168.1.12"
  }
];

const getReportStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
      return "warning";
    case "failed":
      return "critical";
    default:
      return "info";
  }
};

export default function Reports() {
  const totalReports = recentReports.length;
  const completedReports = recentReports.filter(report => report.status === "completed").length;
  const processingReports = recentReports.filter(report => report.status === "processing").length;
  const auditEntries = auditTrail.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Compliance & Reports</h1>
        <p className="text-muted-foreground mt-2">
          Generate compliance reports and maintain audit trails
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Reports"
          value={totalReports}
          icon={FileText}
          description="This month"
        />
        <StatsCard
          title="Completed"
          value={completedReports}
          icon={BarChart3}
          changeType="positive"
          description="Ready for download"
        />
        <StatsCard
          title="Processing"
          value={processingReports}
          icon={Activity}
          changeType="neutral"
          description="In progress"
        />
        <StatsCard
          title="Audit Entries"
          value={auditEntries}
          icon={TrendingUp}
          description="Last 24 hours"
        />
      </div>

      {/* Report Generation */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Daily Report</span>
                </Button>
                <Button className="h-20 flex-col" variant="outline">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Weekly Report</span>
                </Button>
                <Button className="h-20 flex-col" variant="outline">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span>Monthly Report</span>
                </Button>
                <Button className="h-20 flex-col" variant="outline">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span>Custom Report</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">PDF Format</div>
                  <div className="text-sm text-muted-foreground">Professional reports with charts</div>
                </div>
                <Button size="sm">Export PDF</Button>  
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">Excel Format</div>
                  <div className="text-sm text-muted-foreground">Raw data for analysis</div>
                </div>
                <Button size="sm" variant="outline">Export Excel</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">CSV Format</div>
                  <div className="text-sm text-muted-foreground">Simple data format</div>
                </div>
                <Button size="sm" variant="outline">Export CSV</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Report Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Period</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Generated</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Size</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground">{report.name}</div>
                      <div className="text-xs text-muted-foreground">{report.id}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">{report.type}</td>
                    <td className="py-3 px-4 text-sm">{report.period}</td>
                    <td className="py-3 px-4 text-sm">{report.generatedDate}</td>
                    <td className="py-3 px-4">
                      <StatusBadge variant={getReportStatusVariant(report.status)}>
                        <span className="capitalize">{report.status}</span>
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {report.fileSize || "Processing..."}
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      {report.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Target</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {auditTrail.map((entry) => (
                  <tr key={entry.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <StatusBadge variant="info">
                        {entry.action}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">{entry.user}</td>
                    <td className="py-3 px-4 text-sm">{entry.target}</td>
                    <td className="py-3 px-4 text-sm font-mono">{entry.timestamp}</td>
                    <td className="py-3 px-4 text-sm font-mono">{entry.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}