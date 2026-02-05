// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ArrowRight, Coffee, UtensilsCrossed, Cake, Star } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useCartStore } from "@/stores/cartStore";
// import { toast } from "@/hooks/use-toast";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image_url: string;
//   category: string;
//   subcategory: string;
// }

// const categoryConfig = {
//   cafe: {
//     icon: Coffee,
//     label: "Café",
//     gradient: "from-amber-500 to-orange-600",
//     link: "/cafe",
//   },
//   restaurant: {
//     icon: UtensilsCrossed,
//     label: "Restaurant",
//     gradient: "from-red-500 to-rose-600",
//     link: "/restaurant",
//   },
//   sweets: {
//     icon: Cake,
//     label: "Sweets",
//     gradient: "from-pink-500 to-purple-600",
//     link: "/sweets",
//   },
// };

// const FeaturedProductCard = ({ product }: { product: Product }) => {
//   const addItem = useCartStore((state) => state.addItem);
//   const config = categoryConfig[product.category as keyof typeof categoryConfig];

//   const handleAddToCart = () => {
//     addItem({
//       id: product.id,
//       productId: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image_url || "/placeholder.svg",
//     });
//     toast({
//       title: "Added to cart",
//       description: `${product.name} has been added to your cart.`,
//     });
//   };

//   return (
//     <Card className="group overflow-hidden hover-lift premium-shadow border-0 bg-card">
//       <div className="relative overflow-hidden aspect-[4/3]">
//         <img
//           src={product.image_url || "/placeholder.svg"}
//           alt={product.name}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
//         {/* Category Badge */}
//         <Badge 
//           className={`absolute top-4 left-4 bg-gradient-to-r ${config?.gradient} text-white border-0 shadow-lg`}
//         >
//           {config?.label}
//         </Badge>
        
//         {/* Rating Badge */}
//         <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center gap-1 text-sm">
//           <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//           <span>4.9</span>
//         </div>

//         {/* Quick Add Button - appears on hover */}
//         <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
//           <Button 
//             onClick={handleAddToCart}
//             className="w-full bg-white/95 text-foreground hover:bg-white shadow-lg"
//           >
//             Add to Cart
//           </Button>
//         </div>
//       </div>
      
//       <CardContent className="p-5">
//         <div className="flex items-start justify-between gap-2 mb-2">
//           <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
//             {product.name}
//           </h3>
//           <span className="text-xl font-bold text-primary whitespace-nowrap">
//             ${product.price.toFixed(2)}
//           </span>
//         </div>
//         <p className="text-muted-foreground text-sm line-clamp-2">
//           {product.description}
//         </p>
//       </CardContent>
//     </Card>
//   );
// };

// export const FeaturedProducts = () => {
//   const { data: products, isLoading } = useQuery({
//     queryKey: ["featured-products"],
//     queryFn: async () => {
//       // Fetch a few products from each category
//       const { data, error } = await supabase
//         .from("products")
//         .select("*")
//         .eq("available", true)
//         .limit(12);

//       if (error) throw error;

//       // Group by category and pick top items
//       const cafeProducts = data?.filter(p => p.category === "cafe").slice(0, 4) || [];
//       const restaurantProducts = data?.filter(p => p.category === "restaurant").slice(0, 4) || [];
//       const sweetsProducts = data?.filter(p => p.category === "sweets").slice(0, 4) || [];

//       // Interleave products from each category for variety
//       const featured: Product[] = [];
//       for (let i = 0; i < 4; i++) {
//         if (cafeProducts[i]) featured.push(cafeProducts[i]);
//         if (restaurantProducts[i]) featured.push(restaurantProducts[i]);
//         if (sweetsProducts[i]) featured.push(sweetsProducts[i]);
//       }

//       return featured.slice(0, 8);
//     },
//   });

//   if (isLoading) {
//     return (
//       <section className="py-24 px-4">
//         <div className="container mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Delights</h2>
//             <p className="text-muted-foreground text-lg">Loading our best selections...</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <Card key={i} className="overflow-hidden animate-pulse">
//                 <div className="aspect-[4/3] bg-muted" />
//                 <CardContent className="p-5">
//                   <div className="h-6 bg-muted rounded mb-2" />
//                   <div className="h-4 bg-muted rounded w-3/4" />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 px-4 relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />
//       <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
//       <div className="container mx-auto relative">
//         {/* Section Header */}
//         <div className="text-center mb-16 animate-fade-in">
//           <Badge variant="outline" className="mb-4 text-primary border-primary/30">
//             ✨ Handpicked for You
//           </Badge>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//             Featured <span className="text-gradient">Delights</span>
//           </h2>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             Discover our most loved items from across our café, restaurant, and sweets collection. 
//             Each crafted with passion and premium ingredients.
//           </p>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {products?.map((product, index) => (
//             <div
//               key={product.id}
//               className="stagger-animation"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <FeaturedProductCard product={product} />
//             </div>
//           ))}
//         </div>

//         {/* Category Links */}
//         <div className="flex flex-wrap justify-center gap-4">
//           {Object.entries(categoryConfig).map(([key, config]) => (
//             <Link key={key} to={config.link}>
//               <Button 
//                 variant="outline" 
//                 className="gap-2 hover-scale group border-2 hover:border-primary/50"
//               >
//                 <config.icon className="h-4 w-4" />
//                 Explore {config.label}
//                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
