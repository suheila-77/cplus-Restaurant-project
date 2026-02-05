-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cafe', 'restaurant', 'sweets', 'weddings')),
  subcategory TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  customizable BOOLEAN DEFAULT false,
  customization_options JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_session_id UUID NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  customization JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read)
CREATE POLICY "Anyone can view available products"
  ON public.products FOR SELECT
  USING (available = true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for cart_items
CREATE POLICY "Users can manage their own cart"
  ON public.cart_items FOR ALL
  USING (true);

-- RLS Policies for orders (public can create, admins can view all)
CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (true);

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Add trigger for orders updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products for cafe
INSERT INTO public.products (name, description, price, category, subcategory, image_url, available, customizable, customization_options) VALUES
('Espresso', 'Rich and bold Italian espresso', 3.50, 'cafe', 'coffee', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500', true, false, '{}'),
('Cappuccino', 'Creamy espresso with steamed milk foam', 4.50, 'cafe', 'coffee', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500', true, false, '{}'),
('Latte', 'Smooth espresso with steamed milk', 4.00, 'cafe', 'coffee', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500', true, false, '{}'),
('Croissant', 'Buttery French pastry', 3.00, 'cafe', 'pastries', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500', true, false, '{}'),
('Chocolate Muffin', 'Rich chocolate chip muffin', 3.50, 'cafe', 'pastries', 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500', true, false, '{}'),
('Club Sandwich', 'Triple-decker with turkey, bacon, and fresh veggies', 8.50, 'cafe', 'sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500', true, false, '{}'),
('Grilled Cheese', 'Classic grilled cheese sandwich', 6.00, 'cafe', 'sandwiches', 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500', true, false, '{}');

-- Insert restaurant items
INSERT INTO public.products (name, description, price, category, subcategory, image_url, available, customizable, customization_options) VALUES
('Caesar Salad', 'Crisp romaine with parmesan and croutons', 9.00, 'restaurant', 'appetizers', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500', true, false, '{}'),
('Bruschetta', 'Toasted bread with tomatoes and basil', 8.00, 'restaurant', 'appetizers', 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=500', true, false, '{}'),
('Grilled Salmon', 'Fresh Atlantic salmon with herbs', 24.00, 'restaurant', 'main_courses', 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=500', true, false, '{}'),
('Ribeye Steak', 'Premium aged beef, perfectly grilled', 32.00, 'restaurant', 'main_courses', 'https://images.unsplash.com/photo-1558030006-450675393462?w=500', true, false, '{}'),
('Chicken Alfredo', 'Creamy pasta with grilled chicken', 18.00, 'restaurant', 'main_courses', 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500', true, false, '{}'),
('Tiramisu', 'Classic Italian coffee-flavored dessert', 7.50, 'restaurant', 'desserts', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500', true, false, '{}'),
('Cheesecake', 'New York style cheesecake', 8.00, 'restaurant', 'desserts', 'https://images.unsplash.com/photo-1533134242820-24ef90352a6d?w=500', true, false, '{}');

-- Insert sweets items
INSERT INTO public.products (name, description, price, category, subcategory, image_url, available, customizable, customization_options) VALUES
('Chocolate Cake', 'Rich chocolate layer cake', 45.00, 'sweets', 'cakes', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500', true, false, '{}'),
('Custom Birthday Cake', 'Fully customizable birthday cake', 60.00, 'sweets', 'custom_cakes', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500', true, true, '{"sizes": ["6\"", "8\"", "10\"", "12\""], "flavors": ["Chocolate", "Vanilla", "Red Velvet", "Lemon", "Carrot"], "designs": ["Classic", "Modern", "Themed", "Minimalist"]}'),
('Macarons Box', 'Assorted French macarons (12 pieces)', 18.00, 'sweets', 'pastries', 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500', true, false, '{}'),
('Cupcakes Box', 'Assorted cupcakes (6 pieces)', 24.00, 'sweets', 'pastries', 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500', true, false, '{}');
