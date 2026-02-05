import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Users, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useState } from "react";
import { HallBookingModal } from "@/components/weddings/HallBookingModal";

export default function Weddings() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentHallImages, setCurrentHallImages] = useState<string[]>([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedHall, setSelectedHall] = useState("");

  const openBookingModal = (hallName: string) => {
    setSelectedHall(hallName);
    setBookingModalOpen(true);
  };

  const openLightbox = (images: string[], index: number) => {
    setCurrentHallImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentHallImages.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === currentHallImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const halls = [
    {
      name: "Grand Ballroom",
      capacity: "300-500 guests",
      features: ["Elegant chandeliers", "Premium sound system", "Customizable lighting", "Outdoor terrace"],
      images: [
        // "https://images.unsplash.com/photo-1519167758481-83f29da8f0e9?w=800",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      ],
    },
    {
      name: "Garden Hall",
      capacity: "150-250 guests",
      features: ["Natural lighting", "Garden views", "Indoor-outdoor flow", "Private entrance"],
      images: [
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800",
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
      ],
    },
    {
      name: "Intimate Suite",
      capacity: "50-100 guests",
      features: ["Cozy atmosphere", "Modern decor", "Premium amenities", "Personalized service"],
      images: [
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">Wedding Venues</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Create unforgettable memories in our elegant wedding halls
          </p>
          <Button size="lg" className="text-lg hover-lift" onClick={() => openBookingModal("General Inquiry")}>
            <Mail className="mr-2 h-5 w-5" />
            Request Consultation
          </Button>
        </div>
      </section>

      {/* Wedding Halls */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          {halls.map((hall, index) => (
            <Card
              key={hall.name}
              className="overflow-hidden hover-lift premium-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-full">
                  <Carousel className="w-full h-full">
                    <CarouselContent>
                      {hall.images.map((image, imgIndex) => (
                        <CarouselItem key={imgIndex}>
                          <div 
                            className="relative h-64 md:h-full cursor-pointer group"
                            onClick={() => openLightbox(hall.images, imgIndex)}
                          >
                            <img
                              src={image}
                              alt={`${hall.name} - View ${imgIndex + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                                Click to view full size
                              </span>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </Carousel>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4">{hall.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mb-6">
                    <Users className="h-5 w-5" />
                    <span className="text-lg">{hall.capacity}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {hall.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full hover-scale" onClick={() => openBookingModal(hall.name)}>Book a Viewing</Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <Phone className="h-8 w-8 mx-auto text-primary" />
              <p className="font-semibold">Phone</p>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div className="space-y-2">
              <Mail className="h-8 w-8 mx-auto text-primary" />
              <p className="font-semibold">Email</p>
              <p className="text-muted-foreground">weddings@cplus.com</p>
            </div>
            <div className="space-y-2">
              <MapPin className="h-8 w-8 mx-auto text-primary" />
              <p className="font-semibold">Location</p>
              <p className="text-muted-foreground">123 Main St, City</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          <div className="relative w-full h-[95vh] flex items-center justify-center">
            <img
              src={currentHallImages[currentImageIndex]}
              alt={`Gallery image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
              {currentImageIndex + 1} / {currentHallImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <HallBookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        hallName={selectedHall}
      />

      <Footer />
    </div>
  );
}
