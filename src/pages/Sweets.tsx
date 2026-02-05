import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { CakeCustomizationModal } from "@/components/sweets/CakeCustomizationModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  customizable: boolean;
  customization_options: any;
  subcategory: string | null;
}

const categories = [
  { id: "all", label: "All" },
  { id: "cakes", label: "Cakes" },
  { id: "snacks", label: "Snacks" },
  { id: "pastry", label: "Pastry" },
];

export default function Sweets() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "sweets")
      .eq("available", true);

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleCustomize = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.subcategory?.toLowerCase() === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Sweet Delights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Custom cakes, artisan pastries, and decadent desserts
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full px-6 transition-all",
                activeCategory === category.id && "shadow-lg"
              )}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image_url}
                  customizable={product.customizable}
                  onCustomize={() => handleCustomize(product)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <CakeCustomizationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      )}
      <Footer />
    </div>
  );
}
