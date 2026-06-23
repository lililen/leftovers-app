# Leftovers — Intelligence Engine

## What it does (non-technical)

Leftovers is a smart fridge app that helps you figure out what to cook based on what you already have at home. You log what's in your fridge, and it recommends recipes ranked by how many ingredients you actually own so the recipes you can make right now show up first. It also flags ingredients that are about to expire so nothing goes to waste. If you're missing an ingredient, it checks whether you have a substitute. Once you cook something, you can rate it and track your cooking history. There's also a built-in AI assistant you can ask questions like "what should I cook tonight?" and it answers based on your actual fridge and preferences.

-----------------------------------------------------------------------------------

## Technical Summary

### Stack
- **Frontend:** React 19 + Vite, in-memory state 
- **Styling:** Inline styles with a consistent design token system (`COLORS`)
- **Fonts:** DM Mono (monospace UI), Fraunces (serif headings) via Google Fonts
- **AI chat:** Anthropic Claude API (`claude-sonnet-4-20250514`) called directly from the browser

### Data model
Relational schema held in a JS object (`initDB()`), mirroring a normalized SQL design:
<ul style = "list-style-type: none;">
<li>
| Table | Purpose |
-----------------------------------------------------------------------------------
| `Household`          | Groups of users sharing a fridge 
| `User`               | Individual users with spice tolerance 
| `preferred_cuisines` | User → cuisine preferences (many-to-many) 
| `Ingredient`.        | Master ingredient list 
| `ingredient_tag`     | Tags per ingredient (protein, carb, etc.) 
| `FoodItem`           | Items in a household's fridge with quantity + expiry 
| `Recipe`             | Recipe metadata + step-by-step instructions 
| `MadeOf`             | Recipe → ingredients with quantities (many-to-many) 
| `RecipeLog`          | A completed cooking event with user rating 
| `IsIn`               | Recipe → log entry (many-to-many) 
| `SubstitutesFor`     | Ingredient substitution pairs 
<li>
<ul>

### Key logic
- **Recipe matching:** `getMatchInfo()` computes how many of a recipe's required ingredients are in the fridge, returning `have/total` for the match percentage
- **Urgency sorting:** recipes are sorted by match % descending, then by the earliest expiration date among matched ingredients
- **Substitution check:** for each missing ingredient, `SubstitutesFor` is checked to see if a replacement is available in the fridge
- **Expiry urgency:** `daysDiff()` computes days remaining; items ≤2 days show red, ≤5 show amber

### MySQL backend (scaffolded, not wired up)
A full Express + MySQL backend exists in `server/` for when a database is needed:
- `server/schema.sql` — full DDL with seed data and three performance indices:
  - `FoodItem(household_id, expiration_date)` — composite for fridge queries filtered and sorted by expiry
  - `MadeOf(ingredient_id)` — speeds up ingredient-to-recipe matching
  - `RecipeLog(user_id)` — speeds up history and rating aggregation
- `server/index.js` — REST API with endpoints for fridge CRUD, recipe log, and a `GET /api/data` that returns all tables
- Vite proxy configured: `/api` → `localhost:3001`

### Running locally
```bash
npm install
npm run dev        #frontend only (in-memory, no DB needed)

# To run with MySQL backend:
mysql -u root -p < server/schema.sql
npm run server     #in a separate terminal
npm run dev
```

### Tab breakdown
<ul style= "list-style-type:none;">
<li>
| Tab     | What it does |
-----------------------------------------------------------------------------------
| Fridge  | Add, edit quantity, delete food items; sorted by expiration urgency 
| Recipes | Ranked recipe recommendations with expandable ingredient + instruction 
| History | Cooking log with ratings and average score 
| Ask     | AI assistant with full history context injected as system prompt 
<li>
<ul>