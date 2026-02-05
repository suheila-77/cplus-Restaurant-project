-- Clear existing products and insert new menu
DELETE FROM public.products;

-- CAFE: Coffee
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Cplus Coffee', 'Our signature house blend coffee', 2.0, 'cafe', 'Coffee', true),
('Americano', 'Classic espresso with hot water', 2.0, 'cafe', 'Coffee', true),
('Cortado', 'Espresso with a small amount of warm milk', 2.0, 'cafe', 'Coffee', true),
('Espresso', 'Rich and bold espresso shot', 2.0, 'cafe', 'Coffee', true),
('Iced Coffee', 'Refreshing cold brewed coffee', 2.0, 'cafe', 'Coffee', true),
('Macchiato', 'Espresso marked with foamed milk', 2.0, 'cafe', 'Coffee', true),
('Cappuccino', 'Espresso with steamed milk foam', 2.0, 'cafe', 'Coffee', true),
('Camelccino', 'Unique camel milk cappuccino', 2.0, 'cafe', 'Coffee', true);

-- CAFE: Latte
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Chocolate Latte', 'Rich chocolate espresso with milk', 2.0, 'cafe', 'Latte', true),
('Iced Spanish Latte', 'Chilled Spanish-style latte', 2.0, 'cafe', 'Latte', true),
('Iced Cafe Latte', 'Classic iced latte', 2.0, 'cafe', 'Latte', true),
('Iced Vanilla Latte', 'Vanilla-infused iced latte', 2.0, 'cafe', 'Latte', true),
('Iced Caramel Latte', 'Caramel iced latte', 2.0, 'cafe', 'Latte', true),
('Caramel Latte', 'Warm caramel latte', 2.0, 'cafe', 'Latte', true),
('Spanish Latte', 'Sweet condensed milk latte', 2.0, 'cafe', 'Latte', true),
('Vanilla Latte', 'Classic vanilla latte', 2.0, 'cafe', 'Latte', true),
('Cafe Latte', 'Espresso with steamed milk', 2.0, 'cafe', 'Latte', true);

-- CAFE: Hot Drinks
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Hot Chocolate', 'Rich and creamy hot chocolate', 2.0, 'cafe', 'Drinks', true),
('Iced Chocolate', 'Chilled chocolate drink', 2.0, 'cafe', 'Drinks', true);

-- CAFE: Tea
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Bigays', 'Traditional Somali tea', 1.0, 'cafe', 'Tea', true),
('Shaah Geel', 'Somali spiced tea', 1.5, 'cafe', 'Tea', true),
('English Tea', 'Classic English breakfast tea', 1.0, 'cafe', 'Tea', true),
('Somali Tea', 'Traditional spiced Somali tea', 1.0, 'cafe', 'Tea', true),
('Dawa Tea', 'Healing herbal tea', 1.5, 'cafe', 'Tea', true),
('Qaxwo Somali', 'Somali coffee ceremony style', 1.5, 'cafe', 'Tea', true);

-- CAFE: Mocha
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Mocha', 'Espresso with chocolate and milk', 2.0, 'cafe', 'Mocha', true),
('Iced Caramel Mocha', 'Chilled caramel mocha', 2.0, 'cafe', 'Mocha', true),
('Iced Cafe Mocha', 'Iced chocolate espresso', 2.0, 'cafe', 'Mocha', true);

-- CAFE: Smoothies
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Strawberry Smoothie', 'Fresh strawberry blend', 2.0, 'cafe', 'Smoothies', true),
('Tropical Smoothie', 'Mixed tropical fruits', 2.0, 'cafe', 'Smoothies', true),
('Peanut Butter Smoothie', 'Creamy peanut butter blend', 2.0, 'cafe', 'Smoothies', true);

-- CAFE: Iced Tea
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Lemon Iced Tea', 'Refreshing lemon iced tea', 2.0, 'cafe', 'Iced Tea', true),
('Passion Iced Tea', 'Passion fruit iced tea', 2.0, 'cafe', 'Iced Tea', true),
('Kiwi Iced Tea', 'Kiwi flavored iced tea', 2.0, 'cafe', 'Iced Tea', true),
('Strawberry Iced Tea', 'Sweet strawberry iced tea', 2.0, 'cafe', 'Iced Tea', true);

-- CAFE: Milkshake
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Blueberry Milkshake', 'Creamy blueberry shake', 2.5, 'cafe', 'Milkshake', true),
('Caramel Milkshake', 'Rich caramel shake', 2.5, 'cafe', 'Milkshake', true),
('Espresso Milkshake', 'Coffee lovers shake', 2.5, 'cafe', 'Milkshake', true),
('Oreo Milkshake', 'Cookies and cream shake', 2.5, 'cafe', 'Milkshake', true),
('Cplus Caramel Milkshake', 'Signature caramel shake', 2.5, 'cafe', 'Milkshake', true),
('Strawberry Milkshake', 'Classic strawberry shake', 2.5, 'cafe', 'Milkshake', true),
('Chocolate Milkshake', 'Rich chocolate shake', 2.5, 'cafe', 'Milkshake', true),
('Vanilla Milkshake', 'Smooth vanilla shake', 2.5, 'cafe', 'Milkshake', true),
('Classic Milkshake', 'Traditional milkshake', 2.5, 'cafe', 'Milkshake', true),
('Nutella Cookie Milkshake', 'Nutella with cookie crumbs', 2.5, 'cafe', 'Milkshake', true),
('Peanut Butter Chocolate Milkshake', 'PB and chocolate blend', 2.5, 'cafe', 'Milkshake', true);

-- CAFE: Lemonade
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Kiwi Lemonade', 'Kiwi infused lemonade', 2.0, 'cafe', 'Lemonade', true),
('Classic Lemonade', 'Fresh squeezed lemonade', 2.0, 'cafe', 'Lemonade', true),
('Peach Lemonade', 'Sweet peach lemonade', 2.0, 'cafe', 'Lemonade', true),
('Strawberry Lemonade', 'Berry lemonade blend', 2.0, 'cafe', 'Lemonade', true),
('Blue Lagoon', 'Tropical blue lemonade', 2.0, 'cafe', 'Lemonade', true);

-- CAFE: Juice
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Ananas Juice', 'Fresh pineapple juice', 1.5, 'cafe', 'Juice', true),
('Orange Juice', 'Freshly squeezed orange', 1.5, 'cafe', 'Juice', true),
('Mushakal Juice', 'Mixed fruit juice', 1.5, 'cafe', 'Juice', true),
('Isbandhays Juice', 'Refreshing spinach juice', 1.5, 'cafe', 'Juice', true),
('Qare Juice', 'Fresh watermelon juice', 1.5, 'cafe', 'Juice', true),
('Apple Juice', 'Crisp apple juice', 1.5, 'cafe', 'Juice', true),
('Mango Juice', 'Sweet mango juice', 1.5, 'cafe', 'Juice', true),
('Passion Juice', 'Tangy passion fruit', 1.5, 'cafe', 'Juice', true),
('Avocado Juice', 'Creamy avocado blend', 1.5, 'cafe', 'Juice', true);

-- SWEETS: Cake Slices
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('White Forest Slice', 'Creamy white forest cake slice', 2.0, 'sweets', 'Cake Slices', true),
('Black Forest Slice', 'Classic black forest slice', 2.0, 'sweets', 'Cake Slices', true),
('Strawberry Cake Slice', 'Fresh strawberry cake slice', 2.0, 'sweets', 'Cake Slices', true),
('Oreo Cake Slice', 'Cookies and cream cake slice', 2.0, 'sweets', 'Cake Slices', true),
('Orange Cake Slice', 'Citrus orange cake slice', 2.0, 'sweets', 'Cake Slices', true),
('Banana Cake Slice', 'Moist banana cake slice', 1.5, 'sweets', 'Cake Slices', true),
('Carrot Cake Slice', 'Spiced carrot cake slice', 1.5, 'sweets', 'Cake Slices', true);

-- SWEETS: Cakes (customizable)
INSERT INTO public.products (name, description, price, category, subcategory, available, customizable, customization_options) VALUES
('White Forest Cake', 'Creamy white forest cake', 12.0, 'sweets', 'Cakes', true, true, '{"sizes": [{"name": "½ Kg", "price": 12}, {"name": "1 Kg", "price": 18}, {"name": "2 Kg", "price": 25}]}'),
('Black Forest Cake', 'Classic black forest cake', 12.0, 'sweets', 'Cakes', true, true, '{"sizes": [{"name": "½ Kg", "price": 12}, {"name": "1 Kg", "price": 18}, {"name": "2 Kg", "price": 25}]}'),
('Strawberry Cake', 'Fresh strawberry cake', 12.0, 'sweets', 'Cakes', true, true, '{"sizes": [{"name": "½ Kg", "price": 12}, {"name": "1 Kg", "price": 18}, {"name": "2 Kg", "price": 25}]}'),
('Orange Cake', 'Citrus orange cake', 12.0, 'sweets', 'Cakes', true, true, '{"sizes": [{"name": "½ Kg", "price": 12}, {"name": "1 Kg", "price": 18}, {"name": "2 Kg", "price": 25}]}'),
('Oreo Cake', 'Cookies and cream cake', 12.0, 'sweets', 'Cakes', true, true, '{"sizes": [{"name": "½ Kg", "price": 12}, {"name": "1 Kg", "price": 18}, {"name": "2 Kg", "price": 25}]}'),
('Vanilla Cake', 'Classic vanilla cake', 12.0, 'sweets', 'Cakes', true, true, '{"sizes": [{"name": "½ Kg", "price": 12}, {"name": "1 Kg", "price": 18}, {"name": "2 Kg", "price": 25}]}');

-- SWEETS: Pastry
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Danish Pastry', 'Flaky Danish pastry', 2.0, 'sweets', 'Pastry', true),
('Chocolate Croissant', 'Buttery chocolate croissant', 1.5, 'sweets', 'Pastry', true),
('Cheese Croissant', 'Savory cheese croissant', 1.5, 'sweets', 'Pastry', true),
('Cplus Bread', 'Fresh house bread', 1.0, 'sweets', 'Pastry', true),
('Cinnamon Roll', 'Sweet cinnamon roll', 0.5, 'sweets', 'Pastry', true);

-- SWEETS: Snacks
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Vanilla Cupcake', 'Classic vanilla cupcake', 0.5, 'sweets', 'Snacks', true),
('Strawberry Muffin', 'Fresh strawberry muffin', 1.0, 'sweets', 'Snacks', true),
('Chocolate Muffin', 'Rich chocolate muffin', 1.0, 'sweets', 'Snacks', true),
('Swiss Roll', 'Cream filled swiss roll', 2.0, 'sweets', 'Snacks', true),
('Decorated Muffin', 'Beautifully decorated muffin', 1.0, 'sweets', 'Snacks', true);

-- SWEETS: Arabic Sweets
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Lotus Cake', 'Biscoff lotus cake', 2.5, 'sweets', 'Arabic Sweets', true),
('Tiramisu Cake', 'Classic Italian tiramisu', 2.5, 'sweets', 'Arabic Sweets', true),
('Pistachio Cake', 'Rich pistachio cake', 2.5, 'sweets', 'Arabic Sweets', true),
('Chocolate Cake', 'Decadent chocolate cake', 2.5, 'sweets', 'Arabic Sweets', true),
('Cream Caramel', 'Smooth cream caramel', 2.5, 'sweets', 'Arabic Sweets', true);

-- RESTAURANT: Fish
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Fish Curry', 'Aromatic fish curry', 6.0, 'restaurant', 'Fish', true),
('Fish Fingers', 'Crispy fish fingers', 6.0, 'restaurant', 'Fish', true),
('Fish Salad', 'Fresh fish salad', 6.0, 'restaurant', 'Fish', true),
('Grilled Fish', 'Perfectly grilled fish', 6.0, 'restaurant', 'Fish', true),
('Creamy Fish', 'Fish in creamy sauce', 6.0, 'restaurant', 'Fish', true);

-- RESTAURANT: Chicken
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Chicken Curry', 'Spiced chicken curry', 6.0, 'restaurant', 'Chicken', true),
('Chicken Drumstick', 'Juicy chicken drumstick', 5.0, 'restaurant', 'Chicken', true),
('Chicken Salad', 'Grilled chicken salad', 6.0, 'restaurant', 'Chicken', true),
('Chicken Wings', 'Crispy chicken wings', 6.0, 'restaurant', 'Chicken', true),
('Roast Chicken', 'Perfectly roasted chicken', 5.0, 'restaurant', 'Chicken', true),
('Chicken Fingers', 'Crispy chicken fingers', 6.0, 'restaurant', 'Chicken', true);

-- RESTAURANT: Meat
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Dheylo Ido', 'Traditional goat meat dish', 8.0, 'restaurant', 'Meat', true),
('Suqaar', 'Somali sauteed meat cubes', 6.0, 'restaurant', 'Meat', true),
('Hilib Dheylo', 'Tender goat meat', 8.0, 'restaurant', 'Meat', true),
('Liver Package', 'Seasoned liver dish', 5.0, 'restaurant', 'Meat', true);

-- RESTAURANT: Pasta
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Macaroni Alforno', 'Baked macaroni', 5.0, 'restaurant', 'Pasta', true),
('Pasta Salsato', 'Pasta with tomato sauce', 2.0, 'restaurant', 'Pasta', true),
('Penne Arabiata', 'Spicy penne pasta', 3.0, 'restaurant', 'Pasta', true),
('Thai Pasta', 'Asian-inspired pasta', 6.0, 'restaurant', 'Pasta', true);

-- RESTAURANT: Asian Corner
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Chicken Biryani', 'Aromatic chicken biryani', 6.0, 'restaurant', 'Asian Corner', true),
('Mutton Biryani', 'Flavorful mutton biryani', 7.0, 'restaurant', 'Asian Corner', true),
('Fish Biryani', 'Fragrant fish biryani', 6.0, 'restaurant', 'Asian Corner', true),
('Vegetable Biryani', 'Mixed vegetable biryani', 6.0, 'restaurant', 'Asian Corner', true),
('Butter Chicken', 'Creamy butter chicken', 5.0, 'restaurant', 'Asian Corner', true),
('Chicken Tikka Masala', 'Spiced tikka masala', 6.0, 'restaurant', 'Asian Corner', true),
('Chicken Fried Rice', 'Wok-fried chicken rice', 5.0, 'restaurant', 'Asian Corner', true),
('Fish Fried Rice', 'Wok-fried fish rice', 5.0, 'restaurant', 'Asian Corner', true),
('Vegetable Rice', 'Mixed vegetable rice', 4.0, 'restaurant', 'Asian Corner', true);

-- RESTAURANT: Sides
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Chapati', 'Fresh flatbread', 1.5, 'restaurant', 'Sides', true),
('Chips', 'Crispy french fries', 2.0, 'restaurant', 'Sides', true),
('Chips Masala', 'Spiced french fries', 3.0, 'restaurant', 'Sides', true),
('Malawax 3pcs', 'Traditional Somali pancakes', 1.0, 'restaurant', 'Sides', true),
('Mashed Potatoes', 'Creamy mashed potatoes', 3.0, 'restaurant', 'Sides', true),
('Plain Rice', 'Steamed white rice', 1.5, 'restaurant', 'Sides', true),
('Ugali', 'Traditional cornmeal dish', 3.0, 'restaurant', 'Sides', true),
('Spinach', 'Sauteed spinach', 3.0, 'restaurant', 'Sides', true),
('Club Sandwich', 'Triple-decker club sandwich', 6.0, 'restaurant', 'Sides', true);

-- RESTAURANT: Salad
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Chicken Salad Plate', 'Fresh chicken salad', 6.0, 'restaurant', 'Salad', true),
('Beef Salad', 'Grilled beef salad', 5.0, 'restaurant', 'Salad', true),
('Fish Salad Plate', 'Fresh fish salad', 5.0, 'restaurant', 'Salad', true),
('Fruits Plate', 'Seasonal fruit plate', 4.0, 'restaurant', 'Salad', true),
('Fruits Platter', 'Large fruit platter', 6.0, 'restaurant', 'Salad', true),
('Caesar Salad', 'Classic Caesar salad', 6.0, 'restaurant', 'Salad', true);

-- RESTAURANT: Pizza
INSERT INTO public.products (name, description, price, category, subcategory, available, customizable, customization_options) VALUES
('Double Chicken Pizza', 'Loaded chicken pizza', 8.0, 'restaurant', 'Pizza', true, true, '{"sizes": [{"name": "Medium", "price": 8}, {"name": "Large", "price": 12}]}'),
('Margherita Pizza', 'Classic tomato and mozzarella', 8.0, 'restaurant', 'Pizza', true, true, '{"sizes": [{"name": "Medium", "price": 8}, {"name": "Large", "price": 12}]}'),
('Tuna Pizza', 'Tuna and olive pizza', 8.0, 'restaurant', 'Pizza', true, true, '{"sizes": [{"name": "Medium", "price": 8}, {"name": "Large", "price": 12}]}'),
('Bolognese Pizza', 'Meat sauce pizza', 8.0, 'restaurant', 'Pizza', true, true, '{"sizes": [{"name": "Medium", "price": 8}, {"name": "Large", "price": 12}]}'),
('Meat Pizza', 'Mixed meat pizza', 8.0, 'restaurant', 'Pizza', true, true, '{"sizes": [{"name": "Medium", "price": 8}, {"name": "Large", "price": 12}]}'),
('Vegetable Pizza', 'Garden vegetable pizza', 8.0, 'restaurant', 'Pizza', true, true, '{"sizes": [{"name": "Medium", "price": 8}, {"name": "Large", "price": 12}]}');

-- RESTAURANT: Wraps
INSERT INTO public.products (name, description, price, category, subcategory, available) VALUES
('Meat Wrap', 'Grilled meat wrap', 5.0, 'restaurant', 'Wraps', true),
('Chicken Wrap', 'Grilled chicken wrap', 5.0, 'restaurant', 'Wraps', true),
('Quesadilla', 'Cheese filled quesadilla', 5.0, 'restaurant', 'Wraps', true);

-- RESTAURANT: Burger
INSERT INTO public.products (name, description, price, category, subcategory, available, customizable, customization_options) VALUES
('Chicken Burger', 'Crispy chicken burger', 5.0, 'restaurant', 'Burger', true, true, '{"sizes": [{"name": "Single", "price": 5}, {"name": "Double", "price": 8}]}'),
('Beef Burger', 'Juicy beef burger', 5.0, 'restaurant', 'Burger', true, true, '{"sizes": [{"name": "Single", "price": 5}, {"name": "Double", "price": 8}]}');