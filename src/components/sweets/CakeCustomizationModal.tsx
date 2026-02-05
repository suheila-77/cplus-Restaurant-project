import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "@/hooks/use-toast";

interface CakeCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    customization_options: any;
  };
}

export const CakeCustomizationModal = ({
  isOpen,
  onClose,
  product,
}: CakeCustomizationModalProps) => {
  const [size, setSize] = useState(product.customization_options.sizes?.[0] || "");
  const [flavor, setFlavor] = useState(product.customization_options.flavors?.[0] || "");
  const [design, setDesign] = useState(product.customization_options.designs?.[0] || "");
  const [message, setMessage] = useState("");
  
  const addItem = useCartStore((state) => state.addItem);

  const getSizeMultiplier = () => {
    const sizeMap: Record<string, number> = {
      '6"': 1,
      '8"': 1.5,
      '10"': 2,
      '12"': 2.5,
    };
    return sizeMap[size] || 1;
  };

  const finalPrice = product.price * getSizeMultiplier();

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${size}-${flavor}-${design}`,
      productId: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image_url,
      customization: {
        size,
        flavor,
        design,
        message,
      },
    });
    toast({
      title: "Custom cake added!",
      description: "Your custom cake has been added to cart.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Customize Your Cake</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Size Selection */}
          <div>
            <Label className="text-lg mb-3 block">Select Size</Label>
            <RadioGroup value={size} onValueChange={setSize}>
              <div className="grid grid-cols-2 gap-4">
                {product.customization_options.sizes?.map((s: string) => (
                  <div key={s} className="flex items-center space-x-2">
                    <RadioGroupItem value={s} id={`size-${s}`} />
                    <Label htmlFor={`size-${s}`} className="cursor-pointer">
                      {s}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Flavor Selection */}
          <div>
            <Label className="text-lg mb-3 block">Choose Flavor</Label>
            <RadioGroup value={flavor} onValueChange={setFlavor}>
              <div className="grid grid-cols-2 gap-4">
                {product.customization_options.flavors?.map((f: string) => (
                  <div key={f} className="flex items-center space-x-2">
                    <RadioGroupItem value={f} id={`flavor-${f}`} />
                    <Label htmlFor={`flavor-${f}`} className="cursor-pointer">
                      {f}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Design Selection */}
          <div>
            <Label className="text-lg mb-3 block">Design Style</Label>
            <RadioGroup value={design} onValueChange={setDesign}>
              <div className="grid grid-cols-2 gap-4">
                {product.customization_options.designs?.map((d: string) => (
                  <div key={d} className="flex items-center space-x-2">
                    <RadioGroupItem value={d} id={`design-${d}`} />
                    <Label htmlFor={`design-${d}`} className="cursor-pointer">
                      {d}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Custom Message */}
          <div>
            <Label htmlFor="message" className="text-lg mb-3 block">
              Custom Message (Optional)
            </Label>
            <Input
              id="message"
              placeholder="Happy Birthday!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={50}
            />
          </div>

          {/* Price Display */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center text-xl font-semibold">
              <span>Total Price:</span>
              <span className="text-primary">${finalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={handleAddToCart} size="lg" className="w-full">
            Add Custom Cake to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
