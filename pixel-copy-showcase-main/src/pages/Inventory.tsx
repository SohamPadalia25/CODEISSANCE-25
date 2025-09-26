import { useState } from "react";
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  PieChart as PieChartIcon,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

// Mock inventory data
const initialInventoryData = [
  {
    id: "INV001",
    type: "A+",
    quantity: 45,
    location: "Rack A1",
    expiry: "2024-02-15",
    status: "sufficient",
    donated: "2024-01-10",
  },
  {
    id: "INV002",
    type: "A-",
    quantity: 12,
    location: "Rack A2",
    expiry: "2024-01-28",
    status: "low",
    donated: "2024-01-08",
  },
  {
    id: "INV003",
    type: "B+",
    quantity: 38,
    location: "Rack B1",
    expiry: "2024-02-20",
    status: "sufficient",
    donated: "2024-01-12",
  },
  {
    id: "INV004",
    type: "B-",
    quantity: 8,
    location: "Rack B2",
    expiry: "2024-01-25",
    status: "critical",
    donated: "2024-01-05",
  },
  {
    id: "INV005",
    type: "AB+",
    quantity: 15,
    location: "Rack C1",
    expiry: "2024-02-10",
    status: "low",
    donated: "2024-01-09",
  },
  {
    id: "INV006",
    type: "AB-",
    quantity: 3,
    location: "Rack C2",
    expiry: "2024-02-25",
    status: "critical",
    donated: "2024-01-11",
  },
  {
    id: "INV007",
    type: "O+",
    quantity: 52,
    location: "Rack D1",
    expiry: "2024-02-18",
    status: "sufficient",
    donated: "2024-01-13",
  },
  {
    id: "INV008",
    type: "O-",
    quantity: 18,
    location: "Rack D2",
    expiry: "2024-01-30",
    status: "low",
    donated: "2024-01-07",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "sufficient":
      return <CheckCircle className="h-4 w-4" />;
    case "low":
      return <AlertTriangle className="h-4 w-4" />;
    case "critical":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "sufficient":
      return "success";
    case "low":
      return "warning";
    case "critical":
      return "critical";
    default:
      return "info";
  }
};

const getDaysUntilExpiry = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function Inventory() {
  const [inventory, setInventory] = useState(initialInventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Update modal state
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [updatedQuantity, setUpdatedQuantity] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedExpiry, setUpdatedExpiry] = useState("");

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;
    const matchesType = filterType === "all" || item.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Chart data for blood type distribution
  const chartData = Object.values(
    inventory.reduce((acc: any, item) => {
      if (!acc[item.type]) acc[item.type] = { name: item.type, value: 0 };
      acc[item.type].value += item.quantity;
      return acc;
    }, {})
  );

  // Bar chart data (Stock per type)
  const barData = chartData.map((d: any) => ({
    type: d.name,
    stock: d.value,
  }));

  // Line chart data (donation trends)
  const lineData = Object.values(
    inventory.reduce((acc: any, item) => {
      if (!acc[item.donated])
        acc[item.donated] = { date: item.donated, donations: 0 };
      acc[item.donated].donations += item.quantity;
      return acc;
    }, {})
  ).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Area chart data (stock status overview)
  const areaData = [
    { name: "Critical", value: inventory.filter(i => i.status === "critical").length },
    { name: "Low", value: inventory.filter(i => i.status === "low").length },
    { name: "Sufficient", value: inventory.filter(i => i.status === "sufficient").length },
  ];

  // Expiry timeline data
  const expiryData = inventory.map(item => ({
    name: item.type,
    daysLeft: getDaysUntilExpiry(item.expiry),
    expiry: item.expiry,
  })).filter(item => item.daysLeft > 0).sort((a, b) => a.daysLeft - b.daysLeft);

  const COLORS = [
    "#FF6B6B",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#FF922B",
    "#845EC2",
    "#FF9671",
    "#00C9A7",
  ];

  const STATUS_COLORS = {
    critical: "#FF6B6B",
    low: "#FFD93D",
    sufficient: "#6BCB77"
  };

  const handleUpdate = () => {
    if (!selectedItem) return;
    setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              quantity: updatedQuantity
                ? parseInt(updatedQuantity)
                : item.quantity,
              location: updatedLocation || item.location,
              expiry: updatedExpiry || item.expiry,
            }
          : item
      )
    );
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Inventory Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor blood stock levels and expiry dates
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <BarChart3 className="w-8 h-8 text-primary" />
          <TrendingUp className="w-8 h-8 text-primary" />
          <PieChartIcon className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventory.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">All blood types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {
                inventory.filter(
                  (i) =>
                    getDaysUntilExpiry(i.expiry) <= 7 &&
                    getDaysUntilExpiry(i.expiry) > 0
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Within 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {
                inventory.filter((i) => i.quantity < 20 && i.quantity >= 10)
                  .length
              }
            </div>
            <p className="text-xs text-muted-foreground">Below 20 units</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {inventory.filter((i) => i.quantity < 10).length}
            </div>
            <p className="text-xs text-muted-foreground">Below 10 units</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Blood Group Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: ${value}`}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} units`, 'Quantity']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Stock Levels by Blood Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} units`, 'Stock']} />
                  <Legend />
                  <Bar dataKey="stock" fill="#4D96FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Stock Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stackId="1"
                    stroke="#FF6B6B" 
                    fill="#FF6B6B" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expiry Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Expiry Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expiryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Days Left', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value} days`, 'Expires in']} />
                  <Bar 
                    dataKey="daysLeft" 
                    fill="#FF922B"
                    radius={[4, 4, 0, 0]}
                  >
                    {expiryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.daysLeft <= 7 ? '#FF6B6B' : entry.daysLeft <= 30 ? '#FFD93D' : '#6BCB77'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by blood type or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sufficient">Sufficient</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Blood Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Quantity
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Expiry Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => {
                  const daysToExpiry = getDaysUntilExpiry(item.expiry);
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="py-3 px-4 text-sm">{item.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                              {item.type}
                            </span>
                          </div>
                          <span className="font-medium">{item.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{item.quantity} units</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {item.location}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          {item.expiry}
                          <div
                            className={`text-xs ${
                              daysToExpiry <= 7
                                ? "text-warning"
                                : daysToExpiry <= 0
                                ? "text-destructive"
                                : "text-muted-foreground"
                            }`}
                          >
                            {daysToExpiry > 0
                              ? `${daysToExpiry} days left`
                              : "Expired"}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge variant={getStatusVariant(item.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(item.status)}
                            <span className="capitalize">{item.status}</span>
                          </div>
                        </StatusBadge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item);
                            setUpdatedQuantity(item.quantity.toString());
                            setUpdatedLocation(item.location);
                            setUpdatedExpiry(item.expiry);
                          }}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Update Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Inventory - {selectedItem?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Quantity</Label>
              <Input 
                type="number" 
                value={updatedQuantity} 
                onChange={(e) => setUpdatedQuantity(e.target.value)} 
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input 
                value={updatedLocation} 
                onChange={(e) => setUpdatedLocation(e.target.value)} 
              />
            </div>
            <div>
              <Label>Expiry Date</Label>
              <Input 
                type="date" 
                value={updatedExpiry} 
                onChange={(e) => setUpdatedExpiry(e.target.value)} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedItem(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}