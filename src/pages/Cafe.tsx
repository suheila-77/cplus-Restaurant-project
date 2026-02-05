import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  subcategory: string;
}

export default function Cafe() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "cafe")
      .eq("available", true);

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(
    (p) => activeFilter === "all" || p.subcategory === activeFilter
  );

  const subcategories = Array.from(new Set(products.map((p) => p.subcategory)));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Our Café</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Artisan coffee, fresh pastries, and delightful sandwiches
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Tabs */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-8">
          <TabsList className="glass-effect">
            <TabsTrigger value="all">All</TabsTrigger>
            {subcategories.map((sub) => (
              <TabsTrigger key={sub} value={sub} className="capitalize">
                {sub.replace("_", " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Products Grid */}
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
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
