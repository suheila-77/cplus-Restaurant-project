-- Update Cafe products with correct subcategory names (case-sensitive)
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop' WHERE category = 'cafe' AND subcategory = 'Coffee';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop' WHERE category = 'cafe' AND subcategory = 'Latte';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop' WHERE category = 'cafe' AND subcategory = 'Tea';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' WHERE category = 'cafe' AND subcategory = 'Drinks';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' WHERE category = 'cafe' AND subcategory = 'Mocha';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1553787499-6f9133860278?w=400&h=300&fit=crop' WHERE category = 'cafe' AND subcategory = 'Smoothies';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop' WHERE category = 'cafe' AND subcategory = 'Milkshakes';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop' WHERE category = 'cafe' AND subcategory = 'Fresh Juice';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&h=300&fit=crop' WHERE category = 'cafe' AND subcategory = 'Cocktails';

-- Update Sweets products
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' WHERE category = 'sweets' AND subcategory = 'Cakes';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop' WHERE category = 'sweets' AND subcategory = 'Cupcakes';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop' WHERE category = 'sweets' AND subcategory = 'Cookies';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop' WHERE category = 'sweets' AND subcategory = 'Pastries';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop' WHERE category = 'sweets' AND subcategory = 'Ice Cream';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop' WHERE category = 'sweets' AND subcategory = 'Baklava';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop' WHERE category = 'sweets' AND subcategory = 'Desserts';

-- Update Restaurant products  
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Pizza';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Burgers';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Grills';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Pasta';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Salads';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Asian Corner';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Seafood';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1534938665420-4193effeacc4?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Sandwiches';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Appetizers';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Main Courses';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Soups';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Sides';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop' WHERE category = 'restaurant' AND subcategory = 'Specials';

-- Fallback for any remaining null images
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' WHERE image_url IS NULL;