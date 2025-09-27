import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Heart, 
  Calendar, 
  Users, 
  TestTube, 
  Truck, 
  FileText, 
  Thermometer,
  Package,
  Menu,
  X,
  LogOut,
  User,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: Heart },
  { name: "Inventory", href: "/dashboard/inventory", icon: Package },
  { name: "Donations", href: "/dashboard/donations", icon: Calendar },
  { name: "Quality Control", href: "/dashboard/quality", icon: TestTube },
  { name: "Distribution", href: "/dashboard/distribution", icon: Truck },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Monitoring", href: "/dashboard/monitoring", icon: Thermometer },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/");
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 transform bg-card border-r border-border transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">BloodBank</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-6 w-6 text-muted-foreground" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 px-3 flex-1">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile Logout Button */}
          <div className="p-3 border-t border-border lg:hidden">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-card border-b border-border">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left side - Menu button */}
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6 text-muted-foreground" />
            </button>
            
            {/* Center - System title */}
            <div className="flex-1 text-center lg:text-left">
              <div className="text-sm text-muted-foreground">
                Blood Bank Management System
              </div>
            </div>
            
            {/* Right side - User dropdown with logout */}
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground hidden sm:block">
                Admin User
              </div>
              
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm font-medium border-b border-border">
                      Admin User
                    </div>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-muted-foreground hover:bg-accent rounded-md">
                      <User className="mr-2 w-4 h-4" />
                      Profile
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-muted-foreground hover:bg-accent rounded-md">
                      <Settings className="mr-2 w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-border my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <LogOut className="mr-2 w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}