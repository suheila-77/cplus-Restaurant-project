-- Update Cafe products with stock images
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop' WHERE category = 'Cafe' AND subcategory = 'Hot Coffee';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop' WHERE category = 'Cafe' AND subcategory = 'Latte';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=300&fit=crop' WHERE category = 'Cafe' AND subcategory = 'Iced Coffee';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop' WHERE category = 'Cafe' AND subcategory = 'Tea';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop' WHERE category = 'Cafe' AND subcategory = 'Juice';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop' WHERE category = 'Cafe' AND subcategory = 'Milkshake';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop' WHERE category = 'Cafe' AND subcategory = 'Dessert';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' WHERE category = 'Cafe' AND image_url IS NULL;

-- Update Sweets products with stock images
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND subcategory = 'Cakes';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND subcategory = 'Cupcakes';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND subcategory = 'Cookies';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND subcategory = 'Pastries';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND subcategory = 'Ice Cream';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND subcategory = 'Brownies';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND subcategory = 'Donuts';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND subcategory = 'Chocolate';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND subcategory = 'Baklava';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop' WHERE category = 'Sweets' AND image_url IS NULL;

-- Update Restaurant products with stock images
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND subcategory = 'Pizza';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND subcategory = 'Burgers';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND subcategory = 'Grills';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND subcategory = 'Pasta';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND subcategory = 'Salads';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND subcategory = 'Asian Corner';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND subcategory = 'Seafood';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1534938665420-4193effeacc4?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND subcategory = 'Sandwiches';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND subcategory = 'Appetizers';
UPDATE public.products SET image_url = 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop' WHERE category = 'Restaurant' AND image_url IS NULL;