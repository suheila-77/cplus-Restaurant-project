-- Enable RLS on the existing TodoList table
ALTER TABLE public."TodoList" ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view TodoList items (public read)
CREATE POLICY "Anyone can view TodoList items"
  ON public."TodoList" FOR SELECT
  USING (true);