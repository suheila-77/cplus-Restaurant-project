-- Create hall_bookings table for wedding venue booking requests
CREATE TABLE public.hall_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hall_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  preferred_date DATE NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'wedding',
  guest_count INTEGER,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hall_bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a booking request
CREATE POLICY "Anyone can create hall bookings"
  ON public.hall_bookings FOR INSERT
  WITH CHECK (true);

-- Only admins can view all bookings
CREATE POLICY "Admins can view all hall bookings"
  ON public.hall_bookings FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Only admins can update booking status
CREATE POLICY "Admins can update hall bookings"
  ON public.hall_bookings FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_hall_bookings_updated_at
  BEFORE UPDATE ON public.hall_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();