import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import bloodCells from "@/assets/blood-cells.png";

const donationTypes = [
  {
    id: "packed-red-blood-cells",
    name: "Packed Red Blood Cells",
    type: "blood",
    active: true
  },
  {
    id: "plasma",
    name: "Plasma",
    type: "blood",
    active: false
  },
  {
    id: "platelets",
    name: "Platelets",
    type: "blood",
    active: false
  },
  {
    id: "organ-donation",
    name: "Organ Donation",
    type: "organ",
    active: false
  }
];

const bloodContent = {
  "packed-red-blood-cells": {
    title: "Packed Red Blood Cells",
    description: "Blood collected straight from the donor into a blood bag and mixed with an anticoagulant is called whole blood. This collected whole blood is then centrifuged and red cells, platelets and plasma are separated. The separated red cells are mixed with a preservative to be called as packed red blood cells.",
    whoCanDonate: "You need to be 18-65 years old, weight 45kg or more and be fit and healthy.",
    usedFor: "Correction of severe anemia in a number of conditions and blood loss in case of child birth, surgery or trauma settings."
  },
  "plasma": {
    title: "Plasma",
    description: "Plasma is the liquid portion of blood that contains water, proteins, nutrients, hormones, and waste products. It makes up about 55% of total blood volume and is essential for maintaining blood pressure and transporting blood cells throughout the body.",
    whoCanDonate: "You need to be 18-69 years old, weight 50kg or more, and meet specific health criteria. Plasma donors can donate more frequently than whole blood donors.",
    usedFor: "Treating burn victims, patients with clotting disorders, immune deficiencies, and used in emergency medicine."
  },
  "platelets": {
    title: "Platelets",
    description: "Platelets are tiny blood cells that help your body form clots to stop bleeding. They are essential for preventing excessive bleeding and promoting wound healing.",
    whoCanDonate: "You need to be 18-65 years old, meet specific platelet count requirements, and not have taken certain medications recently.",
    usedFor: "Cancer patients, organ transplant recipients, and those with platelet disorders or undergoing major surgery."
  }
};

const organContent = {
  title: "Organ Donation",
  description: "Organ donation is the process of giving an organ or tissue to help someone who needs a transplant. Transplants can save or greatly enhance the lives of other people. One organ donor can save up to 8 lives.",
  whoCanDonate: "People of all ages can consider themselves potential donors. Medical suitability is determined at the time of death. There are very few absolute exclusions to organ donation.",
  usedFor: "Saving lives of people with organ failure including heart, liver, kidney, lung, pancreas, and small intestine transplants. Tissue donation can also help many people."
};

const BloodTypesInfo = () => {
  const [activeComponent, setActiveComponent] = useState("packed-red-blood-cells");

  const handleFindCenter = () => {
    const currentType = donationTypes.find(item => item.id === activeComponent);
    const searchQuery = currentType?.type === "organ" 
      ? "organ+donation+center" 
      : "blood+donation+center";
    
    window.open(`https://www.google.com/maps/search/${searchQuery}`, "_blank");
  };

  const isBloodDonation = donationTypes.find(item => item.id === activeComponent)?.type === "blood";

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">Types of Donation</h2>
        
        <p className="text-center text-lg text-foreground mb-12 max-w-4xl mx-auto">
          The average human body contains about five litres of blood, which is made of several cellular and non-cellular components 
          such as <span className="text-primary font-semibold">Red blood cell</span>, <span className="text-primary font-semibold">Platelet</span>, and <span className="text-primary font-semibold">Plasma</span>. 
          Additionally, <span className="text-primary font-semibold">Organ donation</span> can save up to 8 lives and improve many more through tissue donation.
        </p>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-border">
              <CardContent className="p-0">
                {donationTypes.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => setActiveComponent(component.id)}
                    className={`w-full p-4 text-left border-b border-border last:border-b-0 hover:bg-accent transition-colors ${
                      activeComponent === component.id 
                        ? "bg-accent border-l-4 border-l-primary text-primary font-semibold" 
                        : "text-foreground"
                    }`}
                  >
                    {component.name}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <Card className="bg-white border-border">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-4">
                        What is {isBloodDonation ? "it" : "organ donation"}?
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        {isBloodDonation 
                          ? bloodContent[activeComponent]?.description 
                          : organContent.description
                        }
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-primary mb-3">Who can donate?</h4>
                      <p className="text-foreground">
                        {isBloodDonation 
                          ? bloodContent[activeComponent]?.whoCanDonate 
                          : organContent.whoCanDonate
                        }
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-primary mb-3">
                        {isBloodDonation ? "Used For?" : "Impact?"}
                      </h4>
                      <p className="text-foreground">
                        {isBloodDonation 
                          ? bloodContent[activeComponent]?.usedFor 
                          : organContent.usedFor
                        }
                      </p>
                    </div>

                    {!isBloodDonation && (
                      <div>
                        <h4 className="text-xl font-bold text-primary mb-3">How to Register?</h4>
                        <p className="text-foreground">
                          You can register as an organ donor through your state's donor registry, 
                          at your local DMV, or through national organ donor organizations. 
                          It's important to discuss your decision with family members.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Image Section */}
                  <div className="flex justify-center">
                    {isBloodDonation ? (
                      <img 
                        src={bloodCells} 
                        alt="Blood cells microscopic view" 
                        className="w-full max-w-sm h-auto rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-blue-50 to-green-50 w-full max-w-sm h-64 rounded-lg shadow-lg flex items-center justify-center p-4">
                        <div className="text-center">
                          <div className="text-6xl mb-4">❤️</div>
                          <h3 className="text-xl font-bold text-primary mb-2">Organ Donation</h3>
                          <p className="text-foreground text-sm">
                            One donor can save up to 8 lives and improve 75 more
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button 
                    onClick={handleFindCenter}
                    className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 rounded-lg font-semibold"
                  >
                    Find Nearest {isBloodDonation ? "Blood" : "Organ"} Center To Donate →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodTypesInfo;