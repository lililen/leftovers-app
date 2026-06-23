import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
  const [Household] = await pool.query('SELECT * FROM Household');
  const [User] = await pool.query('SELECT * FROM User');
  const [preferred_cuisines] = await pool.query('SELECT * FROM preferred_cuisines');
  const [Ingredient] = await pool.query('SELECT * FROM Ingredient');
  const [ingredient_tag] = await pool.query('SELECT * FROM ingredient_tag');
  const [FoodItem] = await pool.query('SELECT * FROM FoodItem');
  const [recipes] = await pool.query('SELECT * FROM Recipe');
  const [instructions] = await pool.query('SELECT * FROM recipe_instructions ORDER BY recipe_id, step_number');
  const [MadeOf] = await pool.query('SELECT * FROM MadeOf');
  const [RecipeLog] = await pool.query('SELECT * FROM RecipeLog');
  const [IsIn] = await pool.query('SELECT * FROM IsIn');
  const [SubstitutesFor] = await pool.query('SELECT * FROM SubstitutesFor');

  const Recipe = recipes.map(r => ({
    ...r,
    instructions: instructions.filter(i => i.recipe_id === r.recipe_id).map(i => i.instruction),
  }));

  res.json({ Household, User, preferred_cuisines, Ingredient, ingredient_tag, FoodItem, Recipe, MadeOf, RecipeLog, IsIn, SubstitutesFor });
});

app.post('/api/fooditems', async (req, res) => {
  const { fooditem_id, household_id, ingredient_id, expiration_date, item_quantity, item_unit } = req.body;
  await pool.query(
    'INSERT INTO FoodItem (fooditem_id, expiration_date, item_quantity, item_unit, household_id, ingredient_id) VALUES (?, ?, ?, ?, ?, ?)',
    [fooditem_id, expiration_date, item_quantity, item_unit, household_id, ingredient_id]
  );
  res.json({ ok: true });
});

app.put('/api/fooditems/:id', async (req, res) => {
  const { item_quantity } = req.body;
  await pool.query('UPDATE FoodItem SET item_quantity = ? WHERE fooditem_id = ?', [item_quantity, req.params.id]);
  res.json({ ok: true });
});

app.delete('/api/fooditems/:id', async (req, res) => {
  await pool.query('DELETE FROM FoodItem WHERE fooditem_id = ?', [req.params.id]);
  res.json({ ok: true });
});

app.post('/api/logs', async (req, res) => {
  const { log_id, user_id, rating, date_completed, recipe_id } = req.body;
  await pool.query(
    'INSERT INTO RecipeLog (log_id, user_id, rating, date_completed) VALUES (?, ?, ?, ?)',
    [log_id, user_id, rating, date_completed]
  );
  await pool.query('INSERT INTO IsIn (recipe_id, log_id) VALUES (?, ?)', [recipe_id, log_id]);
  res.json({ ok: true });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
