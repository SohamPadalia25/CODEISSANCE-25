import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
              <div className="text-primary font-bold text-sm">eR</div>
            </div>
            <span className="font-semibold text-lg">e-RaktKosh</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* HOME Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 cursor-pointer hover:text-primary-light transition-colors duration-200 outline-none">
                <span>HOME</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/">Overview</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/about">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/contact">Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* LOOKING FOR BLOOD Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 cursor-pointer hover:text-primary-light transition-colors duration-200 outline-none">
                <span>LOOKING FOR BLOOD</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/search-blood">Search Blood Availability</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/nearby-banks">Nearby Blood Banks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/request-blood">Request Blood</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* WANT TO DONATE BLOOD Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 cursor-pointer hover:text-primary-light transition-colors duration-200 outline-none">
                <span>WANT TO DONATE BLOOD</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/donate">Register as Donor</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/camps">Upcoming Donation Camps</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/eligibility">Eligibility Criteria</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* BLOOD CENTER LOGIN Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 cursor-pointer hover:text-primary-light transition-colors duration-200 outline-none">
                <span>BLOOD CENTER LOGIN</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/hospital-login">Hospital Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/bloodbank-login">Blood Bank Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/admin-login">Admin Login</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dashboard (no dropdown) */}
            <span className="cursor-pointer hover:text-primary-light transition-colors duration-200">
              E-RAKTKOSH DASHBOARD
            </span>
          </nav>

          {/* Login/Sign Up Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-200"
              >
                LOG IN
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-light hover:text-primary-foreground transition-all duration-200 shadow-md">
                SIGN UP
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                Sign Up
              </Button>
            </Link>
            <Button variant="ghost" className="text-primary-foreground">
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-current"></div>
                <div className="w-full h-0.5 bg-current"></div>
                <div className="w-full h-0.5 bg-current"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
