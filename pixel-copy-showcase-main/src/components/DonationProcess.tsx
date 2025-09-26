import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Heart, Gift } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Registration Process",
    description: "Sign up and schedule your first visit with ease"
  },
  {
    icon: Heart,
    title: "Health Screening",
    description: "A simple check-up to ensure you're ready to donate"
  },
  {
    icon: Gift,
    title: "Donation Day",
    description: "Relax as our professional staff guide you through"
  }
];

const DonationProcess = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-medical-pink/50 to-medical-pink/20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-foreground mb-4">
          How <span className="text-primary">Donation</span> Works?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <Card className="w-full bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-medical-pink rounded-full flex items-center justify-center mb-6">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-foreground">{step.description}</p>
                </CardContent>
              </Card>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute translate-x-32 translate-y-24">
                  <div className="w-8 h-8 text-primary/40">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationProcess;