CREATE DATABASE IF NOT EXISTS leftovers;
USE leftovers;

CREATE TABLE Household (
  household_id VARCHAR(10) PRIMARY KEY,
  household_name VARCHAR(100) NOT NULL
);

CREATE TABLE User (
  user_id VARCHAR(10) PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  email_address VARCHAR(100),
  spice_tolerance INT,
  household_id VARCHAR(10),
  FOREIGN KEY (household_id) REFERENCES Household(household_id)
);

CREATE TABLE preferred_cuisines (
  user_id VARCHAR(10),
  cuisine VARCHAR(50),
  PRIMARY KEY (user_id, cuisine),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Ingredient (
  ingredient_id VARCHAR(10) PRIMARY KEY,
  ingredient_name VARCHAR(100) NOT NULL
);

CREATE TABLE ingredient_tag (
  ingredient_id VARCHAR(10),
  tag VARCHAR(50),
  PRIMARY KEY (ingredient_id, tag),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id)
);

CREATE TABLE FoodItem (
  fooditem_id VARCHAR(20) PRIMARY KEY,
  expiration_date DATE NOT NULL,
  item_quantity INT NOT NULL,
  item_unit VARCHAR(20),
  household_id VARCHAR(10),
  ingredient_id VARCHAR(10),
  FOREIGN KEY (household_id) REFERENCES Household(household_id),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id)
);

CREATE TABLE Recipe (
  recipe_id VARCHAR(10) PRIMARY KEY,
  recipe_name VARCHAR(100) NOT NULL,
  recipe_spice_level INT,
  recipe_cuisine VARCHAR(50),
  recipe_diet VARCHAR(50)
);

CREATE TABLE recipe_instructions (
  recipe_id VARCHAR(10),
  step_number INT,
  instruction TEXT,
  PRIMARY KEY (recipe_id, step_number),
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id)
);

CREATE TABLE MadeOf (
  recipe_id VARCHAR(10),
  ingredient_id VARCHAR(10),
  ingredient_quantity DECIMAL(6,2),
  ingredient_unit VARCHAR(20),
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id)
);

CREATE TABLE RecipeLog (
  log_id VARCHAR(20) PRIMARY KEY,
  user_id VARCHAR(10),
  rating INT,
  date_completed DATE,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE IsIn (
  recipe_id VARCHAR(10),
  log_id VARCHAR(20),
  PRIMARY KEY (recipe_id, log_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
  FOREIGN KEY (log_id) REFERENCES RecipeLog(log_id)
);

CREATE TABLE SubstitutesFor (
  original_ingredient_id VARCHAR(10),
  replacement_ingredient_id VARCHAR(10),
  PRIMARY KEY (original_ingredient_id, replacement_ingredient_id),
  FOREIGN KEY (original_ingredient_id) REFERENCES Ingredient(ingredient_id),
  FOREIGN KEY (replacement_ingredient_id) REFERENCES Ingredient(ingredient_id)
);

-- Seed data
INSERT INTO Household VALUES ('h001', 'Lillian\'s House'), ('h002', 'Arya\'s Dorm');

INSERT INTO User VALUES
  ('u001', 'Cat', 'cat@uni.edu', 3, 'h001'),
  ('u002', 'Fish', 'fish@uni.edu', 5, 'h001'),
  ('u003', 'Ham', 'ham@uni.edu', 1, 'h002');

INSERT INTO preferred_cuisines VALUES
  ('u001', 'Italian'), ('u001', 'Mexican'), ('u002', 'Thai'), ('u003', 'American');

INSERT INTO Ingredient VALUES
  ('i001', 'Spinach'), ('i002', 'Chicken Breast'), ('i003', 'Pasta'),
  ('i004', 'Garlic'), ('i005', 'Tomato Sauce'), ('i006', 'Eggs'),
  ('i007', 'Cheddar'), ('i008', 'Kale');

INSERT INTO ingredient_tag VALUES
  ('i001', 'vegetable'), ('i002', 'protein'), ('i003', 'carb'),
  ('i004', 'vegetable'), ('i005', 'sauce'), ('i006', 'protein'),
  ('i007', 'dairy'), ('i008', 'vegetable');

INSERT INTO FoodItem VALUES
  ('f001', '2026-06-01', 2, 'cups', 'h001', 'i001'),
  ('f002', '2026-06-04', 3, 'lbs', 'h001', 'i002'),
  ('f003', '2026-07-01', 1, 'box', 'h001', 'i003'),
  ('f004', '2026-06-15', 5, 'cloves', 'h001', 'i004'),
  ('f005', '2026-06-10', 1, 'jar', 'h001', 'i005'),
  ('f006', '2026-06-05', 6, 'count', 'h002', 'i006');

INSERT INTO Recipe VALUES
  ('r001', 'Pasta Marinara', 2, 'Italian', 'vegetarian'),
  ('r002', 'Chicken Stir Fry', 3, 'Asian', 'omnivore'),
  ('r003', 'Spinach Omelette', 1, 'American', 'vegetarian'),
  ('r004', 'Garlic Chicken Pasta', 2, 'Italian', 'omnivore');

INSERT INTO recipe_instructions VALUES
  ('r001', 1, 'Boil pasta in salted water until al dente, then drain.'),
  ('r001', 2, 'Sauté minced garlic in olive oil over medium heat for 1 minute.'),
  ('r001', 3, 'Add tomato sauce and simmer for 10 minutes.'),
  ('r001', 4, 'Toss pasta with sauce and serve hot.'),
  ('r002', 1, 'Slice chicken breast into thin strips and season with salt.'),
  ('r002', 2, 'Heat oil in a wok or skillet over high heat.'),
  ('r002', 3, 'Stir-fry chicken for 5–6 minutes until cooked through.'),
  ('r002', 4, 'Add minced garlic and stir-fry for 1 more minute.'),
  ('r002', 5, 'Season with soy sauce and serve over rice.'),
  ('r003', 1, 'Whisk eggs with a pinch of salt and pepper.'),
  ('r003', 2, 'Wilt spinach in a non-stick pan over medium heat, then set aside.'),
  ('r003', 3, 'Pour egg mixture into the pan and cook until edges set.'),
  ('r003', 4, 'Add spinach to one half, fold omelette over, and serve.'),
  ('r004', 1, 'Cook pasta in salted boiling water until al dente, reserve ½ cup pasta water, then drain.'),
  ('r004', 2, 'Season chicken breast with salt and pepper; cook in olive oil over medium-high heat for 6–7 minutes per side, then slice.'),
  ('r004', 3, 'In the same pan, sauté minced garlic for 1 minute.'),
  ('r004', 4, 'Add pasta, sliced chicken, and a splash of pasta water; toss to combine and serve.');

INSERT INTO MadeOf VALUES
  ('r001', 'i003', 2, 'cups'), ('r001', 'i005', 1, 'jar'), ('r001', 'i004', 3, 'cloves'),
  ('r002', 'i002', 1, 'lb'), ('r002', 'i004', 2, 'cloves'),
  ('r003', 'i001', 1, 'cup'), ('r003', 'i006', 2, 'count'),
  ('r004', 'i003', 2, 'cups'), ('r004', 'i002', 1, 'lb'), ('r004', 'i004', 4, 'cloves');

INSERT INTO RecipeLog VALUES
  ('l001', 'u001', 4, '2026-05-10'),
  ('l002', 'u001', 5, '2026-05-20'),
  ('l003', 'u002', 3, '2026-05-15');

INSERT INTO IsIn VALUES ('r001', 'l001'), ('r004', 'l002'), ('r002', 'l003');

INSERT INTO SubstitutesFor VALUES ('i001', 'i008');
