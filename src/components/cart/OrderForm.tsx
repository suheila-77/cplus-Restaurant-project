import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/stores/cartStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface OrderFormProps {
  onBack: () => void;
}

export const OrderForm = ({ onBack }: OrderFormProps) => {
  const { items, getTotalPrice, clearCart, toggleCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("orders").insert([{
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        items: items as any,
        total_amount: getTotalPrice(),
        notes: formData.notes,
        status: "pending",
      }]);

      if (error) throw error;

      setOrderPlaced(true);
      setTimeout(() => {
        clearCart();
        toggleCart();
        setOrderPlaced(false);
      }, 3000);

      toast({
        title: "Order placed successfully!",
        description: "We'll contact you shortly to confirm your order.",
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <CheckCircle className="h-20 w-20 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
          <p className="text-muted-foreground">We'll contact you soon to confirm your order.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6">
      <Button variant="ghost" onClick={onBack} className="mb-4 self-start">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Button>

      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

      <form onSubmit={handleSubmit} className="flex-1 space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <Label htmlFor="notes">Special Instructions (Optional)</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Delivery time preferences, special requests, etc."
            rows={4}
          />
        </div>

        <div className="pt-4 border-t space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Amount:</span>
            <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};
