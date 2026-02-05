import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  customizable?: boolean;
  onCustomize?: () => void;
}

export const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  customizable,
  onCustomize,
}: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (customizable && onCustomize) {
      onCustomize();
    } else {
      addItem({
        id,
        productId: id,
        name,
        price,
        image,
      });
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      });
    }
  };

  return (
    <Card className="group overflow-hidden hover-lift premium-shadow animate-fade-in">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
          <Button onClick={handleAddToCart} className="gap-2 hover-scale">
            <ShoppingCart className="h-4 w-4" />
            {customizable ? "Customize" : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
