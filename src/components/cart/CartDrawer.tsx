import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { OrderForm } from "./OrderForm";

export const CartDrawer = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [showOrderForm, setShowOrderForm] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg">
        {showOrderForm ? (
          <OrderForm onBack={() => setShowOrderForm(false)} />
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>Shopping Cart ({items.length} items)</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 animate-fade-in">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        {item.customization && (
                          <p className="text-xs text-muted-foreground">
                            {item.customization.size && `${item.customization.size} • `}
                            {item.customization.flavor && `${item.customization.flavor} • `}
                            {item.customization.design}
                            {item.customization.message && ` • "${item.customization.message}"`}
                          </p>
                        )}
                        <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button onClick={() => setShowOrderForm(true)} size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
