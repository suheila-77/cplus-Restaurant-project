import { Heart, Award, Users, Sparkles } from "lucide-react";

export const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Passion for Excellence",
      description: "Every dish, every cup, every moment crafted with love and dedication"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Only the finest ingredients and most skilled artisans for your experience"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building lasting relationships through exceptional service and warm hospitality"
    },
    {
      icon: Sparkles,
      title: "Memorable Moments",
      description: "Creating unforgettable experiences for life's most special occasions"
    }
  ];

  return (
    <section id="about" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Welcome to C<span className="text-primary">+</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            More than just a venue, C+ is where culinary artistry meets elegant ambiance. 
            From our artisan café to our fine dining restaurant, from custom celebration cakes 
            to breathtaking wedding halls, we've been creating extraordinary experiences since 
            our founding. Every detail is crafted to exceed expectations and create memories 
            that last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center stagger-animation hover-scale"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 float-animation">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
