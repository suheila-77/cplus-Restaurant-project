-- Fix users table: restrict INSERT to admins only
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;

CREATE POLICY "Admins can insert users"
  ON public.users FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));