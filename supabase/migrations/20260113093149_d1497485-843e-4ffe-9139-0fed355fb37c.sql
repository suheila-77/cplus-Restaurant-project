-- Drop the incorrect policy
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;

-- Create correct policy for uploading product images
CREATE POLICY "Admins can upload product images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND has_role(auth.uid(), 'admin')
);

-- Also fix update and delete policies to use has_role
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

CREATE POLICY "Admins can update product images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete product images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND has_role(auth.uid(), 'admin')
);