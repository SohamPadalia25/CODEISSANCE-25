import { Search, Building2, Users, LogIn, FileText, Smartphone, Heart, Activity, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Service {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  details: string;
}

const services: Service[] = [
  {
    icon: Search,
    title: "Blood Availability Search",
    description: "Find available blood types in nearby centers",
    details: "Real-time blood inventory search across multiple centers with filtering by blood type and distance. Get instant updates on blood availability."
  },
  {
    icon: Building2,
    title: "Blood Center Directory",
    description: "Locate blood centers and hospitals near you",
    details: "Comprehensive directory with contact information, operating hours, services offered, and user ratings."
  },
  {
    icon: Users,
    title: "Blood Donation Camps",
    description: "Find and participate in blood donation camps",
    details: "Browse upcoming donation camp schedules, register for participation, and get reminders for upcoming events."
  },
  {
    icon: LogIn,
    title: "Donor Login",
    description: "Access your donor account and donation history",
    details: "Secure login portal to manage your donor profile, track donation history, and schedule appointments."
  },
  {
    icon: FileText,
    title: "Register Voluntary Blood Camp",
    description: "Organize and register new donation camps",
    details: "Streamlined registration process for organizing blood donation camps with guidance on requirements."
  },
  {
    icon: Smartphone,
    title: "MyGov Pledge",
    description: "Take pledge through government portal",
    details: "Integrated platform to connect with government initiatives and national health campaigns."
  }
];

const ServicesSection = () => {
  const [flippedCards, setFlippedCards] = useState<{[key: number]: boolean}>({});

  const handleCardClick = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <style>{`
          @keyframes fade-in {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }
          .perspective-1000 {
            perspective: 1000px;
          }
          .flip-card-inner {
            transition: transform 0.7s;
            transform-style: preserve-3d;
            position: relative;
            width: 100%;
            height: 100%;
          }
          .flip-card-flipped {
            transform: rotateY(180deg);
          }
          .flip-card-front, .flip-card-back {
            backface-visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0.75rem;
          }
          .flip-card-back {
            transform: rotateY(180deg);
          }
          .service-card {
            transition: all 0.3s ease;
          }
          .service-card:hover {
            transform: translateY(-5px);
          }
        `}</style>

        <div 
          className="text-center mb-16 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive blood donation services to connect donors with those in need
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group cursor-pointer h-64 perspective-1000 service-card"
              onClick={() => handleCardClick(index)}
            >
              <div className={`flip-card-inner ${flippedCards[index] ? 'flip-card-flipped' : ''}`}>
                {/* Front of Card */}
                <div className="flip-card-front bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center group-hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors duration-300 group-hover:scale-110">
                    <service.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center justify-center text-red-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Click for details</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Back of Card */}
                <div className="flip-card-back bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg p-6 flex flex-col justify-center text-center text-white">
                  <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">
                    {service.details}
                  </p>
                  <button 
                    className="mt-2 px-4 py-2 bg-white text-red-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors duration-200 mx-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(index);
                    }}
                  >
                    Back to Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h3>
            <p className="text-gray-600 mb-6">
              We provide a seamless platform connecting blood donors with recipients, 
              ensuring timely access to life-saving resources through innovative technology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Save Lives</h4>
                <p className="text-sm text-gray-600 mt-1">Your donation can save up to 3 lives</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Real-time Updates</h4>
                <p className="text-sm text-gray-600 mt-1">Live inventory and availability tracking</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Community Driven</h4>
                <p className="text-sm text-gray-600 mt-1">Join thousands of dedicated donors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;