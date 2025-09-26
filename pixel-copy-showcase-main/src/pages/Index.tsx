import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import SplineInfoSection from "@/components/SplineInfoSection";
import BloodTypeSelector from "@/components/BloodTypeSelector";
import DonationProcess from "@/components/DonationProcess";
import BloodTypesInfo from "@/components/BloodTypesInfo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ServicesSection />
      <SplineInfoSection />
      <BloodTypeSelector />
      <DonationProcess />
      <BloodTypesInfo />
      <Footer />
    </div>
  );
};

export default Index;
