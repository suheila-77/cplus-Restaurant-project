import { Coffee, UtensilsCrossed, Cake, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: Coffee,
    title: "Café",
    description: "Artisan coffee and cozy ambiance for your daily escape",
    link: "/cafe",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant",
    description: "Fine dining with exquisite flavors and premium ingredients",
    link: "/restaurant",
    gradient: "from-red-500/10 to-pink-500/10",
  },
  {
    icon: Cake,
    title: "Sweets & Cakes",
    description: "Custom birthday cakes and artisan desserts for every celebration",
    link: "/sweets",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: Heart,
    title: "Wedding Halls",
    description: "Elegant venues for your special day and unforgettable moments",
    link: "/weddings",
    gradient: "from-rose-500/10 to-red-500/10",
  },
];

export const Sections = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in">
          Our Services
        </h2>
        <p className="text-center text-muted-foreground mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Discover our premium offerings across all sections
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <Link key={section.title} to={section.link}>
              <Card 
                className="hover-lift premium-shadow hover:shadow-xl transition-all cursor-pointer h-full stagger-animation"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4 float-animation`}>
                    <section.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {section.description}
                  </CardDescription>
                  <span className="text-primary font-medium hover:underline">
                    Explore →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};