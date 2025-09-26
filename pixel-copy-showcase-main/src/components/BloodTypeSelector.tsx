import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Users, Shield, Zap } from "lucide-react";

const bloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];

const bloodCompatibility = {
  "A+": {
    giveTo: ["A+", "AB+"],
    receiveFrom: ["A+", "A-", "O+", "O-"]
  },
  "A-": {
    giveTo: ["A+", "A-", "AB+", "AB-"],
    receiveFrom: ["A-", "O-"]
  },
  "B+": {
    giveTo: ["B+", "AB+"],
    receiveFrom: ["B+", "B-", "O+", "O-"]
  },
  "B-": {
    giveTo: ["B+", "B-", "AB+", "AB-"],
    receiveFrom: ["B-", "O-"]
  },
  "AB+": {
    giveTo: ["AB+"],
    receiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  "AB-": {
    giveTo: ["AB+", "AB-"],
    receiveFrom: ["AB-", "A-", "B-", "O-"]
  },
  "O+": {
    giveTo: ["O+", "A+", "B+", "AB+"],
    receiveFrom: ["O+", "O-"]
  },
  "O-": {
    giveTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    receiveFrom: ["O-"]
  }
};

const organDonationFacts = [
  {
    icon: Heart,
    title: "8 Lives Saved",
    description: "One organ donor can save up to 8 lives through heart, lungs, liver, kidneys, pancreas, and intestines"
  },
  {
    icon: Users,
    title: "75+ Lives Improved",
    description: "Tissue donation can improve the lives of more than 75 people through corneas, skin, bones, and tendons"
  },
  {
    icon: Shield,
    title: "No Age Limit",
    description: "Anyone from newborns to seniors can be organ donors. Medical condition at time of death determines eligibility"
  },
  {
    icon: Zap,
    title: "Fast Process",
    description: "Organ donation doesn't delay funeral arrangements. The procedure is performed with great care and respect"
  }
];

const BloodTypeSelector = () => {
  const [selectedType, setSelectedType] = useState("A+");

  const currentCompatibility = bloodCompatibility[selectedType as keyof typeof bloodCompatibility];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Blood Donation Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Learn About Donation</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Blood Type Selector */}
          <div>
            <p className="text-center text-lg text-gray-700 mb-8 font-medium">Select your Blood Type</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {bloodTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className={`w-16 h-16 text-lg font-bold rounded-xl transition-all duration-300 ${
                    selectedType === type 
                      ? "bg-red-600 hover:bg-red-700 text-white shadow-lg scale-105" 
                      : "border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Compatibility Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                      <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">↓</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">You can receive from</h3>
                    <div className="flex flex-wrap gap-3">
                      {currentCompatibility.receiveFrom.map((type) => (
                        <span 
                          key={type}
                          className="px-4 py-2 bg-white rounded-lg text-lg font-bold text-gray-900 border-2 border-yellow-300 shadow-sm"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    {selectedType === "AB+" && (
                      <p className="text-sm text-yellow-700 mt-3 font-medium">Universal Recipient</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">↑</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">You can give to</h3>
                    <div className="flex flex-wrap gap-3">
                      {currentCompatibility.giveTo.map((type) => (
                        <span 
                          key={type}
                          className="px-4 py-2 bg-white rounded-lg text-lg font-bold text-gray-900 border-2 border-blue-300 shadow-sm"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    {selectedType === "O-" && (
                      <p className="text-sm text-blue-700 mt-3 font-medium">Universal Donor</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Impact */}
          <div className="text-center bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg border-2 border-red-100">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Blood Donation Impact</h3>
            </div>
            <p className="text-xl text-gray-700 mb-4">
              One Blood Donation can save up to <span className="text-red-600 font-bold">Three Lives</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">1 Unit</div>
                <div className="text-sm text-gray-600">Whole Blood Donation</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">3 Patients</div>
                <div className="text-sm text-gray-600">Can Be Helped</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">45 Minutes</div>
                <div className="text-sm text-gray-600">Average Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Organ Donation Section */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Organ Donation</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn how organ donation can transform lives and make a lasting impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {organDonationFacts.map((fact, index) => (
              <Card key={index} className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <fact.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{fact.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{fact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Organ Donation Call to Action */}
          <div className="text-center mt-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Make a Difference?</h3>
            <p className="text-green-100 mb-6 text-lg">
              Register as an organ donor today and give the gift of life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg">
                Register Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default BloodTypeSelector;