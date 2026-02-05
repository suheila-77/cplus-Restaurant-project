import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  customer_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  customer_email: z.string().trim().email("Please enter a valid email").max(255),
  customer_phone: z.string().trim().max(20).optional(),
  preferred_date: z.date({ required_error: "Please select a date" }),
  event_type: z.string().min(1, "Please select an event type"),
  guest_count: z.coerce.number().int().min(1, "Guest count must be at least 1").max(1000).optional(),
  notes: z.string().trim().max(1000).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface HallBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hallName: string;
}

export function HallBookingModal({ open, onOpenChange, hallName }: HallBookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      event_type: "wedding",
      notes: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("hall_bookings").insert({
        hall_name: hallName,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone || null,
        preferred_date: format(data.preferred_date, "yyyy-MM-dd"),
        event_type: data.event_type,
        guest_count: data.guest_count || null,
        notes: data.notes || null,
      });

      if (error) throw error;

      toast({
        title: "Booking request submitted!",
        description: "We'll contact you soon to confirm your booking.",
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {hallName}</DialogTitle>
          <DialogDescription>
            Fill in your details to request a viewing or book the venue.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferred_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="event_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="birthday">Birthday Party</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guest_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Guest Count</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="150" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests / Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special requirements or questions..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
