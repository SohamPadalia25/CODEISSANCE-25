import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import heroImage from "@/assets/blood-donation-hero.png";

const HeroSection = () => {
  const [currentDonationType, setCurrentDonationType] = useState("blood");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTakePledge = () => {
    // Redirect to pledge form or open modal
    window.open('/pledge', '_blank');
  };

  const handleFindCenter = () => {
    const searchQuery = currentDonationType === "blood" 
      ? "blood+donation+center" 
      : "organ+donation+center";
    window.open(`https://www.google.com/maps/search/${searchQuery}`, "_blank");
  };

  // Organ donation placeholder component
  const OrganDonationPlaceholder = () => (
    <div className="w-full max-w-lg h-80 bg-gradient-to-br from-green-50 to-teal-100 rounded-2xl shadow-2xl flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-6xl mb-4">💚</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Organ Donation</h3>
        <p className="text-green-600">One donor can save up to 8 lives</p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-150"></span>
          <span className="w-3 h-3 bg-green-600 rounded-full animate-pulse delay-300"></span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-red-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-20 left-10 w-32 h-32 bg-primary rounded-full transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
        <div className={`absolute bottom-32 right-20 w-20 h-20 bg-primary rounded-full transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
        <div className={`absolute top-40 right-32 w-16 h-16 bg-green-400 rounded-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
        <div className={`absolute bottom-20 left-1/4 w-24 h-24 bg-red-400 rounded-full transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Government badges */}
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-xs text-muted-foreground">Ministry of Health</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-xs text-muted-foreground">Government of India</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-xs text-muted-foreground">NOTTO</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-xs text-muted-foreground">NBTC</div>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-red-600 text-6xl lg:text-7xl">Give</span>
                <span className="text-foreground"> The Gift of</span>
                <br />
                <span className="text-foreground">Life Through </span>
                <span className="text-green-600">Donation</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Join millions of heroes who save lives through {currentDonationType === "blood" ? "blood" : "organ"} donation. 
                Your single act of kindness can make a world of difference.
              </p>

              {/* Donation Type Toggle */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setCurrentDonationType("blood")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    currentDonationType === "blood"
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  🩸 Blood Donation
                </button>
                <button
                  onClick={() => setCurrentDonationType("organ")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    currentDonationType === "organ"
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  💚 Organ Donation
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleTakePledge}
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Take Pledge
                </Button>
                <Button 
                  onClick={handleFindCenter}
                  variant="outline"
                  size="lg" 
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Find Donation Center
                </Button>
              </div>
            </div>
          </div>

          {/* Hero Image with Animation */}
          <div className={`flex justify-center lg:justify-end transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="relative w-full max-w-lg">
                {/* Conditional Image Rendering */}
                {currentDonationType === "blood" ? (
                  <>
                    {/* Blood Donation Image */}
                    <img 
                      src={heroImage} 
                      alt="Blood donation illustration" 
                      className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-500 transform rotate-2 hover:rotate-0"
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-xl animate-bounce text-red-600">
                      <div className="text-2xl">🩸</div>
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                      <div className="text-sm font-semibold">Saves 3 Lives</div>
                      <div className="text-xs text-gray-500">Per Donation</div>
                    </div>

                    {/* Animated Pulse Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-red-200 opacity-20 animate-pulse -z-10"></div>
                  </>
                ) : (
                  <>
                    {/* Organ Donation Placeholder */}
                    <OrganDonationPlaceholder />
                    
                    {/* Floating Badge */}
                    <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-xl animate-bounce text-green-600">
                      <div className="text-2xl">💚</div>
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                      <div className="text-sm font-semibold">Saves 8 Lives</div>
                      <div className="text-xs text-gray-500">Per Donation</div>
                    </div>

                    {/* Animated Pulse Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-green-200 opacity-20 animate-pulse -z-10"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Nationwide Mega Voluntary Donation Drive
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="text-sm text-muted-foreground mb-2">Camps Organized</div>
              <div className="text-3xl font-bold text-blue-600">15,046</div>
            </div>
            <div className="text-center bg-red-50 p-6 rounded-xl border border-red-100 hover:shadow-lg transition-shadow">
              <div className="text-sm text-muted-foreground mb-2">Blood Donors Registered</div>
              <div className="text-3xl font-bold text-red-600">982,848</div>
            </div>
            <div className="text-center bg-green-50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="text-sm text-muted-foreground mb-2">Organ Donors Registered</div>
              <div className="text-3xl font-bold text-green-600">152,310</div>
            </div>
            <div className="text-center bg-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="text-sm text-muted-foreground mb-2">Lives Saved</div>
              <div className="text-3xl font-bold text-purple-600">2.1M+</div>
            </div>
          </div>
          
          <div className="text-center mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Since 17 September 2025 onward • 🩸 Blood + 💚 Organ Donation
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;