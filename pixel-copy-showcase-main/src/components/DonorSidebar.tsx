import {
  User,
  History,
  MapPin,
  Bell,
  Calendar,
  Heart,
  Users,
  Bot,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "History", url: "/history", icon: History },
  { title: "Requests", url: "/requests", icon: MapPin },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Health", url: "/health", icon: Heart },
  { title: "Community", url: "/community", icon: Users },
  { title: "AI Help", url: "/assistance", icon: Bot },
];

export function DonorSidebar() {
  return (
    <Sidebar className="border-r border-border bg-white shadow-sm">
      <SidebarHeader className="border-b border-gray-200 p-6 bg-gradient-to-r from-white to-red-50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">Donor Hub</h2>
            <p className="text-sm text-gray-600">Blood & Organ Tracker</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 mx-3 rounded-lg">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3 mt-2">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-2">
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 group relative overflow-hidden",
                          isActive
                            ? "bg-red-600 text-black shadow-lg shadow-red-200/50 transform scale-105"
                            : "text-gray-800 hover:text-red-700 hover:bg-red-50 hover:shadow-md border-2 border-transparent hover:border-red-200"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={cn(
                              "absolute left-0 top-0 h-full w-1 bg-red-600 transition-all duration-300",
                              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}
                          />
                          <item.icon
                            className={cn(
                              "h-5 w-5 transition-all duration-300 z-10",
                              isActive
                                ? "text-white transform scale-110"
                                : "text-gray-600 group-hover:text-red-600 group-hover:transform group-hover:scale-110"
                            )}
                          />
                          <span className="z-10">{item.title}</span>
                          <div
                            className={cn(
                              "absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 opacity-0 transition-opacity duration-300",
                              isActive ? "opacity-0" : "group-hover:opacity-100"
                            )}
                          />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Health Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 mx-3 rounded-lg">
            Health
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3 mt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mb-2">
                  <NavLink
                    to="/health"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 group relative overflow-hidden",
                        isActive
                          ? "bg-red-600 text-black shadow-lg shadow-red-200/50 transform scale-105"
                          : "text-gray-800 hover:text-red-700 hover:bg-red-50 hover:shadow-md border-2 border-transparent hover:border-red-200"
                      )
                    }
                  >
                    <Heart className="h-5 w-5 transition-all duration-300" />
                    <span>Health Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mb-2">
                  <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:text-red-700 hover:bg-red-50 transition-all duration-300 w-full text-left group">
                    <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
                    <span>Track Health</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 mx-3 rounded-lg">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3 mt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mb-2">
                  <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:text-red-700 hover:bg-red-50 transition-all duration-300 w-full text-left group">
                    <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
                    <span>Donate Now</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mb-2">
                  <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:text-red-700 hover:bg-red-50 transition-all duration-300 w-full text-left group">
                    <Users className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
                    <span>Find Donors</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Section */}
      <div className="p-6 border-t border-gray-200 mt-auto">
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-red-700">Save a Life Today</p>
          <p className="text-xs text-red-600 mt-1">Your donation matters</p>
        </div>
      </div>
    </Sidebar>
  );
}
