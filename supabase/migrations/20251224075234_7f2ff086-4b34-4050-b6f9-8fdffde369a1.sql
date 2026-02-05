-- =============================================
-- CLEAN MIGRATION FOR C+ PROJECT
-- Drop existing policies first, then recreate
-- =============================================

-- Drop existing policies on profiles (if any)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Drop existing policies on user_roles (if any)
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Drop existing policies on products (if any)
DROP POLICY IF EXISTS "Anyone can view available products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Drop existing policies on orders (if any)
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

-- Drop existing storage policies (if any)
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

-- 1. Create app_role enum type (only if not exists)
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'registrar', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 3. Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create has_role security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- User roles RLS policies
CREATE POLICY "Users can view their own roles" 
  ON public.user_roles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
  ON public.user_roles FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'));

-- Add admin view policy for profiles
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  available BOOLEAN DEFAULT true,
  customizable BOOLEAN DEFAULT false,
  customization_options JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products RLS policies
CREATE POLICY "Anyone can view available products" 
  ON public.products FOR SELECT 
  USING (available = true);

CREATE POLICY "Admins can manage products" 
  ON public.products FOR ALL 
  USING (auth.uid() IS NOT NULL);

-- 6. Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders RLS policies
CREATE POLICY "Anyone can create orders" 
  ON public.orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders" 
  ON public.orders FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update orders" 
  ON public.orders FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

-- 7. Create handle_new_user function and trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Create update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at columns
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Create product-images storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for product images
CREATE POLICY "Anyone can view product images" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'product-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update product images" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'product-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete product images" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'product-images' AND auth.uid() IS NOT NULL);