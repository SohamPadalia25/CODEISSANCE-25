import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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
            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary-light">
              <span>HOME</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary-light">
              <span>LOOKING FOR BLOOD</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary-light">
              <span>WANT TO DONATE BLOOD</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary-light">
              <span>BLOOD CENTER LOGIN</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <span className="cursor-pointer hover:text-primary-light">E-RAKTKOSH DASHBOARD</span>
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden text-primary-foreground">
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-current"></div>
              <div className="w-full h-0.5 bg-current"></div>
              <div className="w-full h-0.5 bg-current"></div>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;