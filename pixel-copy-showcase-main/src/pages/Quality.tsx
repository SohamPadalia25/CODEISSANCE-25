import { useState } from "react";
import { TestTube, FileText, AlertTriangle, CheckCircle, Download, Eye, Filter, Search, Calendar, User, Shield, Trash2, RefreshCw, X } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for quality control testing
const testResults = [
  {
    id: "QC001",
    donationId: "D001",
    donor: "John Smith",
    donorId: "DNR001",
    bloodType: "O+",
    collectedDate: "2024-01-15",
    testDate: "2024-01-16",
    status: "passed",
    tests: {
      hiv: { result: "negative", date: "2024-01-16", lab: "Main Lab" },
      hepatitisB: { result: "negative", date: "2024-01-16", lab: "Main Lab" },
      hepatitisC: { result: "negative", date: "2024-01-16", lab: "Main Lab" },
      syphilis: { result: "negative", date: "2024-01-16", lab: "Main Lab" },
      bloodTyping: { result: "confirmed", date: "2024-01-16", lab: "Blood Bank" }
    },
    technician: "Dr. Sarah Johnson",
    notes: "All tests completed successfully. Blood unit ready for distribution."
  },
  {
    id: "QC002",
    donationId: "D002",
    donor: "Maria Garcia",
    donorId: "DNR002",
    bloodType: "A-",
    collectedDate: "2024-01-15",
    testDate: "2024-01-16",
    status: "in_progress",
    tests: {
      hiv: { result: "pending", date: "pending", lab: "Pending" },
      hepatitisB: { result: "negative", date: "2024-01-16", lab: "Main Lab" },
      hepatitisC: { result: "negative", date: "2024-01-16", lab: "Main Lab" },
      syphilis: { result: "negative", date: "2024-01-16", lab: "Main Lab" },
      bloodTyping: { result: "confirmed", date: "2024-01-15", lab: "Blood Bank" }
    },
    technician: "Lab Tech Mike",
    notes: "Awaiting HIV test results. Expected completion: 2024-01-17"
  },
  {
    id: "QC003",
    donationId: "D003",
    donor: "Robert Chen",
    donorId: "DNR003",
    bloodType: "B+",
    collectedDate: "2024-01-14",
    testDate: "2024-01-15",
    status: "passed",
    tests: {
      hiv: { result: "negative", date: "2024-01-15", lab: "Main Lab" },
      hepatitisB: { result: "negative", date: "2024-01-15", lab: "Main Lab" },
      hepatitisC: { result: "negative", date: "2024-01-15", lab: "Main Lab" },
      syphilis: { result: "negative", date: "2024-01-15", lab: "Main Lab" },
      bloodTyping: { result: "confirmed", date: "2024-01-14", lab: "Blood Bank" }
    },
    technician: "Dr. Sarah Johnson",
    notes: "Rapid testing completed. All parameters within normal limits."
  },
  {
    id: "QC004",
    donationId: "D004",
    donor: "Lisa Johnson",
    donorId: "DNR004",
    bloodType: "AB-",
    collectedDate: "2024-01-14",
    testDate: "2024-01-15",
    status: "failed",
    tests: {
      hiv: { result: "negative", date: "2024-01-15", lab: "Main Lab" },
      hepatitisB: { result: "positive", date: "2024-01-15", lab: "Main Lab" },
      hepatitisC: { result: "negative", date: "2024-01-15", lab: "Main Lab" },
      syphilis: { result: "negative", date: "2024-01-15", lab: "Main Lab" },
      bloodTyping: { result: "confirmed", date: "2024-01-14", lab: "Blood Bank" }
    },
    technician: "Dr. Sarah Johnson",
    notes: "Hepatitis B positive detected. Unit marked for destruction."
  }
];

const quarantineData = [
  { id: "Q001", donationId: "D002", donor: "Maria Garcia", bloodType: "A-", reason: "Pending HIV test", daysInQuarantine: 2 },
  { id: "Q002", donationId: "D006", donor: "David Wilson", bloodType: "O+", reason: "Incomplete paperwork", daysInQuarantine: 5 },
  { id: "Q003", donationId: "D007", donor: "Sarah Miller", bloodType: "B-", reason: "Temperature excursion", daysInQuarantine: 1 }
];

const releaseHistory = [
  { id: "R001", donationId: "D001", donor: "John Smith", bloodType: "O+", releaseDate: "2024-01-16", releasedBy: "Dr. Sarah Johnson" },
  { id: "R002", donationId: "D003", donor: "Robert Chen", bloodType: "B+", releaseDate: "2024-01-15", releasedBy: "Dr. Sarah Johnson" }
];

const disposalRecords = [
  { id: "DIS001", donationId: "D004", donor: "Lisa Johnson", bloodType: "AB-", disposalDate: "2024-01-16", method: "Incinerated", reason: "Hepatitis B positive" },
  { id: "DIS002", donationId: "D008", donor: "Tom Brown", bloodType: "A+", disposalDate: "2024-01-14", method: "Chemical", reason: "Hemolyzed sample" }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "passed": return "success";
    case "failed": return "critical";
    case "in_progress": return "warning";
    case "pending": return "pending";
    default: return "info";
  }
};

const getTestResultVariant = (result: string) => {
  switch (result) {
    case "negative":
    case "confirmed": return "success";
    case "positive": return "critical";
    case "pending": return "warning";
    default: return "info";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "passed": return <CheckCircle className="h-4 w-4" />;
    case "failed": return <AlertTriangle className="h-4 w-4" />;
    case "in_progress": return <TestTube className="h-4 w-4" />;
    default: return <TestTube className="h-4 w-4" />;
  }
};

export default function Quality() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("test-results");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const filteredTests = testResults.filter(test => {
    const matchesSearch = test.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.donationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || test.status === statusFilter;
    const matchesDate = dateFilter === "all" || true; // Simplified date filtering

    return matchesSearch && matchesStatus && matchesDate;
  });

  const downloadPDFCertificate = (test) => {
    // Create PDF content
    const pdfContent = `
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 500 >>
stream
BT
/F1 12 Tf
50 750 Td
(BLOOD DONATION CERTIFICATE) Tj
0 -20 Td
(===========================) Tj
0 -40 Td
(Certificate ID: CERT-${test.id}) Tj
0 -20 Td
(Donation ID: ${test.donationId}) Tj
0 -20 Td
(Donor: ${test.donor} (ID: ${test.donorId})) Tj
0 -20 Td
(Blood Type: ${test.bloodType}) Tj
0 -20 Td
(Collection Date: ${test.collectedDate}) Tj
0 -20 Td
(Test Date: ${test.testDate}) Tj
0 -40 Td
(TEST RESULTS:) Tj
0 -20 Td
(- HIV Antibody: ${test.tests.hiv.result.toUpperCase()}) Tj
0 -20 Td
(- Hepatitis B: ${test.tests.hepatitisB.result.toUpperCase()}) Tj
0 -20 Td
(- Hepatitis C: ${test.tests.hepatitisC.result.toUpperCase()}) Tj
0 -20 Td
(- Syphilis: ${test.tests.syphilis.result.toUpperCase()}) Tj
0 -20 Td
(- Blood Typing: ${test.tests.bloodTyping.result.toUpperCase()}) Tj
0 -40 Td
(Status: APPROVED FOR TRANSFUSION) Tj
0 -20 Td
(Technician: ${test.technician}) Tj
0 -20 Td
(Issue Date: ${new Date().toLocaleDateString()}) Tj
0 -40 Td
(This certifies that the blood unit has passed all required quality) Tj
0 -20 Td
(control tests and meets the standards set by the Blood Bank) Tj
0 -20 Td
(Management System.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000273 00000 n 
0000000895 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1956
%%EOF
    `.trim();

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate-${test.donationId}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleReleaseUnit = (donationId) => {
    alert(`Unit ${donationId} has been released from quarantine.`);
  };

  const handleDestroyUnit = (donationId) => {
    if (confirm(`Are you sure you want to destroy unit ${donationId}? This action cannot be undone.`)) {
      alert(`Unit ${donationId} has been marked for destruction.`);
    }
  };

  const handleFilter = () => {
    setIsFilterOpen(true);
  };

  const handleTimeline = () => {
    setIsTimelineOpen(true);
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setDateFilter("all");
    setIsFilterOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Quality Control
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor blood testing results and quality assurance processes
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2" onClick={handleFilter}>
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DialogTrigger>
            <FilterDialog 
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              onApply={applyFilters}
              onClear={clearFilters}
            />
          </Dialog>
          
          <Dialog open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2" onClick={handleTimeline}>
                <Calendar className="h-4 w-4" />
                Timeline
              </Button>
            </DialogTrigger>
            <TimelineDialog />
          </Dialog>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tests by donor, ID, or blood type..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 min-w-[300px]">
          <Card className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="text-2xl font-bold text-green-900">
              {testResults.filter(t => t.status === "passed").length}
            </div>
            <div className="text-sm text-green-600">Approved</div>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
            <div className="text-2xl font-bold text-yellow-900">
              {testResults.filter(t => t.status === "in_progress").length + quarantineData.length}
            </div>
            <div className="text-sm text-yellow-600">In Review</div>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
            <div className="text-2xl font-bold text-red-900">
              {testResults.filter(t => t.status === "failed").length + disposalRecords.length}
            </div>
            <div className="text-sm text-red-600">Rejected</div>
          </Card>
        </div>
      </div>

      {/* Active Filters */}
      {(statusFilter !== "all" || dateFilter !== "all") && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">Active filters:</span>
          {statusFilter !== "all" && (
            <Badge variant="outline" className="bg-blue-100 text-blue-700">
              Status: {statusFilter}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setStatusFilter("all")} />
            </Badge>
          )}
          {dateFilter !== "all" && (
            <Badge variant="outline" className="bg-blue-100 text-blue-700">
              Date: {dateFilter}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setDateFilter("all")} />
            </Badge>
          )}
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="test-results">Test Results</TabsTrigger>
          <TabsTrigger value="quarantine">Quarantine</TabsTrigger>
          <TabsTrigger value="release-history">Release History</TabsTrigger>
          <TabsTrigger value="disposal-records">Disposal Records</TabsTrigger>
        </TabsList>

        {/* Test Results Tab */}
        <TabsContent value="test-results" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-t-lg border-b">
              <CardTitle className="text-xl font-bold">Quality Test Results</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Test ID</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Donor</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Blood Type</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Test Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/60">
                    {filteredTests.map((test) => (
                      <tr key={test.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-900">{test.id}</div>
                          <div className="text-sm text-gray-500">{test.donationId}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-900">{test.donor}</div>
                          <div className="text-sm text-gray-500">ID: {test.donorId}</div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            {test.bloodType}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {test.testDate}
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge variant={getStatusVariant(test.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(test.status)}
                              <span className="capitalize">{test.status.replace('_', ' ')}</span>
                            </div>
                          </StatusBadge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2 justify-center">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedTest(test)}
                                  className="flex items-center gap-1"
                                >
                                  <Eye className="h-4 w-4" />
                                  Details
                                </Button>
                              </DialogTrigger>
                              <TestDetailsDialog test={selectedTest} />
                            </Dialog>
                            {test.status === "passed" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => downloadPDFCertificate(test)}
                                className="flex items-center gap-1"
                              >
                                <Download className="h-4 w-4" />
                                Certificate
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs remain the same */}
        <TabsContent value="quarantine">
          {/* Quarantine content */}
        </TabsContent>
        <TabsContent value="release-history">
          {/* Release history content */}
        </TabsContent>
        <TabsContent value="disposal-records">
          {/* Disposal records content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Filter Dialog Component
function FilterDialog({ statusFilter, setStatusFilter, dateFilter, setDateFilter, onApply, onClear }) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Filter Tests</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="passed">Passed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Date Range</label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClear} className="flex-1">
            Clear All
          </Button>
          <Button onClick={onApply} className="flex-1 bg-red-500 hover:bg-red-600">
            Apply Filters
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

// Timeline Dialog Component
function TimelineDialog() {
  const timelineEvents = [
    { time: "09:00 AM", event: "Daily quality control checks", status: "completed" },
    { time: "10:30 AM", event: "Batch testing started", status: "in-progress" },
    { time: "02:00 PM", event: "Equipment calibration", status: "pending" },
    { time: "04:00 PM", event: "Final review and reporting", status: "pending" }
  ];

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Quality Control Timeline</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {timelineEvents.map((event, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                event.status === "completed" ? "bg-green-500" :
                event.status === "in-progress" ? "bg-yellow-500" : "bg-gray-300"
              }`} />
              {index < timelineEvents.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200 mt-1" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{event.time}</div>
              <div className="text-sm text-gray-600">{event.event}</div>
              <Badge variant={event.status === "completed" ? "success" : "secondary"}>
                {event.status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  );
}

// Compact Test Details Dialog Component
function TestDetailsDialog({ test }) {
  if (!test) return null;

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">Test Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Donor:</span>
            <p className="font-medium">{test.donor}</p>
          </div>
          <div>
            <span className="text-gray-500">Blood Type:</span>
            <Badge variant="outline" className="bg-red-50 text-red-700">
              {test.bloodType}
            </Badge>
          </div>
          <div>
            <span className="text-gray-500">Collection:</span>
            <p className="font-medium">{test.collectedDate}</p>
          </div>
          <div>
            <span className="text-gray-500">Test Date:</span>
            <p className="font-medium">{test.testDate}</p>
          </div>
        </div>

        {/* Test Results */}
        <div>
          <h4 className="font-medium mb-2">Test Results:</h4>
          <div className="space-y-2">
            {Object.entries(test.tests).map(([testName, testData]) => (
              <div key={testName} className="flex justify-between items-center text-sm">
                <span className="capitalize">{testName.replace(/([A-Z])/g, ' $1')}:</span>
                <StatusBadge variant={getTestResultVariant(testData.result)} size="sm">
                  {testData.result}
                </StatusBadge>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-sm text-gray-500">Overall Status:</span>
          <StatusBadge variant={getStatusVariant(test.status)}>
            {test.status.replace('_', ' ')}
          </StatusBadge>
        </div>
      </div>
    </DialogContent>
  );
}