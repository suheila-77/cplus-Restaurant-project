-- Drop the overly permissive SELECT policy that allows anyone to read all users
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;