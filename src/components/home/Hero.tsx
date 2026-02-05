import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80",
    title: "Welcome to C+",
    description: "Experience the perfect blend of café culture, fine dining, artisan sweets, and elegant wedding venues",
    cta1: "Explore Menu",
    cta2: "Book Wedding Hall",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1920&q=80",
    title: "Café Excellence",
    description: "Artisanal coffee and freshly baked pastries in a warm, inviting atmosphere",
    cta1: "View Café Menu",
    cta2: "Visit Us",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
    title: "Fine Dining",
    description: "Exquisite cuisine crafted with passion and the finest ingredients",
    cta1: "View Restaurant Menu",
    cta2: "Reserve Table",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1920&q=80",
    title: "Wedding Dreams",
    description: "Create unforgettable moments in our elegant wedding venues",
    cta1: "View Venues",
    cta2: "Book Consultation",
  },
];

export const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          loop: true,
          duration: 30,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative min-h-screen flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 -z-10">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 text-center relative z-10">
                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient animate-scale-in">
                      {slide.title}
                    </h1>
                  </div>
                  <p
                    className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in"
                    style={{ animationDelay: "0.3s" }}
                  >
                    {slide.description}
                  </p>
                  <div
                    className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <Button size="lg" className="text-lg gap-2 hover-lift">
                      {slide.cta1}
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg hover-lift"
                    >
                      {slide.cta2}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-foreground rounded-full p-3 transition-all duration-300 hover-scale"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-foreground rounded-full p-3 transition-all duration-300 hover-scale"
          aria-label="Next slide"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 float-animation" style={{ bottom: '3rem' }}>
        <ArrowRight className="h-6 w-6 text-primary rotate-90" />
      </div>
    </section>
  );
};
