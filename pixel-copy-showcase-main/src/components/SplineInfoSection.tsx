import { useEffect, useRef, useState } from "react";
import Spline from '@splinetool/react-spline';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: Heart,
    number: "50,000+",
    label: "Lives Saved",
    description: "Through blood and organ donations"
  },
  {
    icon: Users,
    number: "2M+",
    label: "Registered Donors",
    description: "Active blood and organ donors"
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Emergency Service",
    description: "Round the clock availability"
  },
  {
    icon: Award,
    number: "99.9%",
    label: "Success Rate",
    description: "Safe and successful procedures"
  }
];

const SplineInfoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-background to-accent/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Spline Model */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="bg-gradient-to-br from-white to-accent/20 rounded-3xl p-8 shadow-2xl border border-border/50 backdrop-blur-sm">
              <div className="h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
                <Spline 
                  scene="https://prod.spline.design/VjLJumRBAYHcRQXI/scene.splinecode" 
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-light rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Info Content */}
          <div 
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Saving Lives Through
                  <span className="text-primary block">Blood & Organ Donation</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every donation creates a ripple effect of hope. Your contribution of blood or organs 
                  can save multiple lives and bring immeasurable joy to families in need.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card 
                    key={index} 
                    className={`group hover-scale transition-all duration-500 border-border/50 hover:border-primary/30 hover:shadow-lg ${
                      isVisible ? 'animate-fade-in' : ''
                    }`}
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-primary">{stat.number}</div>
                        <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                        <div className="text-xs text-muted-foreground leading-tight">{stat.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="pt-4">
                <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-6 border border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Ready to make a difference?</h3>
                      <p className="text-sm text-muted-foreground">Join thousands of heroes saving lives every day.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplineInfoSection;