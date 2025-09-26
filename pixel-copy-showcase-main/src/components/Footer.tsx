import { Smartphone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Looking for Blood */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Looking for Blood</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Blood Availability</a></li>
              <li><a href="#" className="hover:text-primary">Blood Center Directory</a></li>
              <li><a href="#" className="hover:text-primary">Thalassemia Request</a></li>
            </ul>
          </div>

          {/* Want to Donate Blood */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Want to Donate Blood</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Blood Donation Camp</a></li>
              <li><a href="#" className="hover:text-primary">Donor Login</a></li>
              <li><a href="#" className="hover:text-primary">About Blood Donation</a></li>
              <li><a href="#" className="hover:text-primary">Register VBD Camp</a></li>
            </ul>
          </div>

          {/* Blood Center Login */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Blood Center Login</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">e-Raktkosh Login</a></li>
              <li><a href="#" className="hover:text-primary">Add your Blood Center</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-bold text-foreground mb-4">About Us</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About e-Raktkosh</a></li>
              <li><a href="#" className="hover:text-primary">Notifications</a></li>
              <li><a href="#" className="hover:text-primary">e-Raktkosh FAQs</a></li>
              <li><a href="#" className="hover:text-primary">Gallery</a></li>
              <li><a href="#" className="hover:text-primary">Video Gallery</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Mobile Apps</a></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Download e-raktkosh App</h3>
            <div className="space-y-3">
              <a href="#" className="block">
                <div className="bg-black text-white p-3 rounded-lg flex items-center space-x-2">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-xs">
                    <div>Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </div>
              </a>
              <a href="#" className="block">
                <div className="bg-black text-white p-3 rounded-lg flex items-center space-x-2">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-xs">
                    <div>Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Government Logos */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="text-primary font-bold">eR</div>
              </div>
              <div className="text-xs text-muted-foreground">e-RaktKosh</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="text-blue-600 font-bold text-xs">MoHFW</div>
              </div>
              <div className="text-xs text-muted-foreground">Ministry of Health</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="text-green-600 font-bold text-xs">NHP</div>
              </div>
              <div className="text-xs text-muted-foreground">National Health Portal</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="text-orange-600 font-bold text-xs">Gov</div>
              </div>
              <div className="text-xs text-muted-foreground">india.gov.in</div>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="#" className="hover:text-primary">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-primary">Accessibility Statement</a>
            <span>|</span>
            <a href="#" className="hover:text-primary">Site Map</a>
          </div>
          <p>Last Updated: 05 Sept 2025 | 2016-2025 by Ministry of Health and Family Welfare</p>
          <p>Designed and Developed by Centre for Development of Advanced Computing</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;