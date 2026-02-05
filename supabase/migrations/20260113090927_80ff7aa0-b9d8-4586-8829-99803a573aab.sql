-- Update Cafe products with AI-generated images (using relative paths that will be imported)
-- Coffee subcategory
UPDATE public.products SET image_url = '/menu/cafe-coffee.jpg' WHERE category = 'cafe' AND subcategory = 'Coffee';
-- Latte subcategory
UPDATE public.products SET image_url = '/menu/cafe-latte.jpg' WHERE category = 'cafe' AND subcategory = 'Latte';
-- Tea subcategory
UPDATE public.products SET image_url = '/menu/cafe-tea.jpg' WHERE category = 'cafe' AND subcategory = 'Tea';
-- Iced Tea subcategory
UPDATE public.products SET image_url = '/menu/cafe-iced-tea.jpg' WHERE category = 'cafe' AND subcategory = 'Iced Tea';
-- Mocha subcategory
UPDATE public.products SET image_url = '/menu/cafe-mocha.jpg' WHERE category = 'cafe' AND subcategory = 'Mocha';
-- Smoothies subcategory
UPDATE public.products SET image_url = '/menu/cafe-smoothies.jpg' WHERE category = 'cafe' AND subcategory = 'Smoothies';
-- Milkshake subcategory
UPDATE public.products SET image_url = '/menu/cafe-milkshake.jpg' WHERE category = 'cafe' AND subcategory = 'Milkshake';
-- Juice subcategory
UPDATE public.products SET image_url = '/menu/cafe-juice.jpg' WHERE category = 'cafe' AND subcategory = 'Juice';
-- Lemonade subcategory
UPDATE public.products SET image_url = '/menu/cafe-lemonade.jpg' WHERE category = 'cafe' AND subcategory = 'Lemonade';
-- Drinks subcategory
UPDATE public.products SET image_url = '/menu/cafe-drinks.jpg' WHERE category = 'cafe' AND subcategory = 'Drinks';

-- Update Restaurant products
UPDATE public.products SET image_url = '/menu/restaurant-pizza.jpg' WHERE category = 'restaurant' AND subcategory = 'Pizza';
UPDATE public.products SET image_url = '/menu/restaurant-burger.jpg' WHERE category = 'restaurant' AND subcategory = 'Burger';
UPDATE public.products SET image_url = '/menu/restaurant-chicken.jpg' WHERE category = 'restaurant' AND subcategory = 'Chicken';
UPDATE public.products SET image_url = '/menu/restaurant-fish.jpg' WHERE category = 'restaurant' AND subcategory = 'Fish';
UPDATE public.products SET image_url = '/menu/restaurant-meat.jpg' WHERE category = 'restaurant' AND subcategory = 'Meat';
UPDATE public.products SET image_url = '/menu/restaurant-pasta.jpg' WHERE category = 'restaurant' AND subcategory = 'Pasta';
UPDATE public.products SET image_url = '/menu/restaurant-salad.jpg' WHERE category = 'restaurant' AND subcategory = 'Salad';
UPDATE public.products SET image_url = '/menu/restaurant-asian.jpg' WHERE category = 'restaurant' AND subcategory = 'Asian Corner';
UPDATE public.products SET image_url = '/menu/restaurant-sides.jpg' WHERE category = 'restaurant' AND subcategory = 'Sides';
UPDATE public.products SET image_url = '/menu/restaurant-wraps.jpg' WHERE category = 'restaurant' AND subcategory = 'Wraps';

-- Update Sweets products
UPDATE public.products SET image_url = '/menu/sweets-cakes.jpg' WHERE category = 'sweets' AND subcategory = 'Cakes';
UPDATE public.products SET image_url = '/menu/sweets-cake-slices.jpg' WHERE category = 'sweets' AND subcategory = 'Cake Slices';
UPDATE public.products SET image_url = '/menu/sweets-arabic.jpg' WHERE category = 'sweets' AND subcategory = 'Arabic Sweets';
UPDATE public.products SET image_url = '/menu/sweets-pastry.jpg' WHERE category = 'sweets' AND subcategory = 'Pastry';
UPDATE public.products SET image_url = '/menu/sweets-snacks.jpg' WHERE category = 'sweets' AND subcategory = 'Snacks';