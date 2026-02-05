import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Sections } from "@/components/home/Sections";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <FeaturedProducts />
      <Sections />
      <Footer />
    </div>
  );
};

export default Index;