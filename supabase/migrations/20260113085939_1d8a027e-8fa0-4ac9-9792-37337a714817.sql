-- Drop the overly permissive public read policy on TodoList
DROP POLICY IF EXISTS "Anyone can view TodoList items" ON public."TodoList";

-- Create a more restrictive policy - only authenticated users can view
CREATE POLICY "Authenticated users can view TodoList items"
ON public."TodoList"
FOR SELECT
TO authenticated
USING (true);