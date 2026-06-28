
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admins and product managers can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images'
  AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'product_manager'::app_role))
);

CREATE POLICY "Admins and product managers can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images'
  AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'product_manager'::app_role))
);

CREATE POLICY "Admins and product managers can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images'
  AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'product_manager'::app_role))
);
