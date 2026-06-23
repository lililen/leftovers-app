import { useState, useEffect, useRef } from "react";

const initDB = () => ({
  Household: [
    { household_id: "h001", household_name: "Lillian's House" },
    { household_id: "h002", household_name: "Arya's Dorm" },
  ],
  User: [
    { user_id: "u001", user_name: "Cat", email_address: "cat@uni.edu", spice_tolerance: 3, household_id: "h001" },
    { user_id: "u002", user_name: "Fish", email_address: "fish@uni.edu", spice_tolerance: 5, household_id: "h001" },
    { user_id: "u003", user_name: "Ham", email_address: "ham@uni.edu", spice_tolerance: 1, household_id: "h002" },
  ],
  preferred_cuisines: [
    { user_id: "u001", cuisine: "Italian" },
    { user_id: "u001", cuisine: "Mexican" },
    { user_id: "u002", cuisine: "Thai" },
    { user_id: "u003", cuisine: "American" },
  ],
  Ingredient: [
    { ingredient_id: "i001", ingredient_name: "Spinach" },
    { ingredient_id: "i002", ingredient_name: "Chicken Breast" },
    { ingredient_id: "i003", ingredient_name: "Pasta" },
    { ingredient_id: "i004", ingredient_name: "Garlic" },
    { ingredient_id: "i005", ingredient_name: "Tomato Sauce" },
    { ingredient_id: "i006", ingredient_name: "Eggs" },
    { ingredient_id: "i007", ingredient_name: "Cheddar" },
    { ingredient_id: "i008", ingredient_name: "Kale" },
  ],
  ingredient_tag: [
    { ingredient_id: "i001", tag: "vegetable" },
    { ingredient_id: "i002", tag: "protein" },
    { ingredient_id: "i003", tag: "carb" },
    { ingredient_id: "i004", tag: "vegetable" },
    { ingredient_id: "i005", tag: "sauce" },
    { ingredient_id: "i006", tag: "protein" },
    { ingredient_id: "i007", tag: "dairy" },
    { ingredient_id: "i008", tag: "vegetable" },
  ],
  FoodItem: [
    { fooditem_id: "f001", expiration_date: "2026-06-01", item_quantity: 2, item_unit: "cups", household_id: "h001", ingredient_id: "i001" },
    { fooditem_id: "f002", expiration_date: "2026-06-04", item_quantity: 3, item_unit: "lbs", household_id: "h001", ingredient_id: "i002" },
    { fooditem_id: "f003", expiration_date: "2026-07-01", item_quantity: 1, item_unit: "box", household_id: "h001", ingredient_id: "i003" },
    { fooditem_id: "f004", expiration_date: "2026-06-15", item_quantity: 5, item_unit: "cloves", household_id: "h001", ingredient_id: "i004" },
    { fooditem_id: "f005", expiration_date: "2026-06-10", item_quantity: 1, item_unit: "jar", household_id: "h001", ingredient_id: "i005" },
    { fooditem_id: "f006", expiration_date: "2026-06-05", item_quantity: 6, item_unit: "count", household_id: "h002", ingredient_id: "i006" },
  ],
  Recipe: [
    { recipe_id: "r001", recipe_name: "Pasta Marinara", recipe_spice_level: 2, recipe_cuisine: "Italian", recipe_diet: "vegetarian", instructions: ["Boil pasta in salted water until al dente, then drain.", "Sauté minced garlic in olive oil over medium heat for 1 minute.", "Add tomato sauce and simmer for 10 minutes.", "Toss pasta with sauce and serve hot."] },
    { recipe_id: "r002", recipe_name: "Chicken Stir Fry", recipe_spice_level: 3, recipe_cuisine: "Asian", recipe_diet: "omnivore", instructions: ["Slice chicken breast into thin strips and season with salt.", "Heat oil in a wok or skillet over high heat.", "Stir-fry chicken for 5–6 minutes until cooked through.", "Add minced garlic and stir-fry for 1 more minute.", "Season with soy sauce and serve over rice."] },
    { recipe_id: "r003", recipe_name: "Spinach Omelette", recipe_spice_level: 1, recipe_cuisine: "American", recipe_diet: "vegetarian", instructions: ["Whisk eggs with a pinch of salt and pepper.", "Wilt spinach in a non-stick pan over medium heat, then set aside.", "Pour egg mixture into the pan and cook until edges set.", "Add spinach to one half, fold omelette over, and serve."] },
    { recipe_id: "r004", recipe_name: "Garlic Chicken Pasta", recipe_spice_level: 2, recipe_cuisine: "Italian", recipe_diet: "omnivore", instructions: ["Cook pasta in salted boiling water until al dente, reserve ½ cup pasta water, then drain.", "Season chicken breast with salt and pepper; cook in olive oil over medium-high heat for 6–7 minutes per side, then slice.", "In the same pan, sauté minced garlic for 1 minute.", "Add pasta, sliced chicken, and a splash of pasta water; toss to combine and serve."] },
  ],
  MadeOf: [
    { recipe_id: "r001", ingredient_id: "i003", ingredient_quantity: 2, ingredient_unit: "cups" },
    { recipe_id: "r001", ingredient_id: "i005", ingredient_quantity: 1, ingredient_unit: "jar" },
    { recipe_id: "r001", ingredient_id: "i004", ingredient_quantity: 3, ingredient_unit: "cloves" },
    { recipe_id: "r002", ingredient_id: "i002", ingredient_quantity: 1, ingredient_unit: "lb" },
    { recipe_id: "r002", ingredient_id: "i004", ingredient_quantity: 2, ingredient_unit: "cloves" },
    { recipe_id: "r003", ingredient_id: "i001", ingredient_quantity: 1, ingredient_unit: "cup" },
    { recipe_id: "r003", ingredient_id: "i006", ingredient_quantity: 2, ingredient_unit: "count" },
    { recipe_id: "r004", ingredient_id: "i003", ingredient_quantity: 2, ingredient_unit: "cups" },
    { recipe_id: "r004", ingredient_id: "i002", ingredient_quantity: 1, ingredient_unit: "lb" },
    { recipe_id: "r004", ingredient_id: "i004", ingredient_quantity: 4, ingredient_unit: "cloves" },
  ],
  RecipeLog: [
    { log_id: "l001", user_id: "u001", rating: 4, date_completed: "2026-05-10" },
    { log_id: "l002", user_id: "u001", rating: 5, date_completed: "2026-05-20" },
    { log_id: "l003", user_id: "u002", rating: 3, date_completed: "2026-05-15" },
  ],
  IsIn: [
    { recipe_id: "r001", log_id: "l001" },
    { recipe_id: "r004", log_id: "l002" },
    { recipe_id: "r002", log_id: "l003" },
  ],
  SubstitutesFor: [
    { original_ingredient_id: "i001", replacement_ingredient_id: "i008" },
  ],
});

const today = new Date("2026-05-29");
const daysDiff = (dateStr) => {
  const d = new Date(dateStr);
  return Math.ceil((d - today) / (1000 * 60 * 60 * 24));
};

const TABS = ["🥔 Fridge", "🍳 Recipes", "📜 History", "❓ Ask"];
const COLORS = {
  bg: "#faf7f2",
  surface: "#f2ede4",
  card: "#ffffff",
  border: "#e0d8cc",
  accent: "#2d7a4f",
  accentDim: "#3a9962",
  warn: "#c47a0a",
  danger: "#c0392b",
  text: "#1e2420",
  muted: "#6b7568",
};

export default function LeftoversApp() {
  const [db, setDb] = useState(initDB());
  const [tab, setTab] = useState(0);
  const [activeUser, setActiveUser] = useState("u001");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const activeUserObj = db.User.find(u => u.user_id === activeUser);
  const householdId = activeUserObj?.household_id;

  return (
    <div style={{ fontFamily: "'DM Mono', monospace", background: COLORS.bg, minHeight: "100vh", color: COLORS.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Fraunces:ital,wght@0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }
        input, select, textarea { font-family: 'DM Mono', monospace; }
        button { cursor: pointer; font-family: 'DM Mono', monospace; }
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .card { animation: slideIn 0.3s ease; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${COLORS.border}`, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: COLORS.accent, fontStyle: "italic" }}>Leftovers</span>
          <span style={{ fontSize: 11, color: COLORS.muted, marginLeft: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>Intelligence Engine</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: COLORS.muted }}>User:</span>
          <select
            value={activeUser}
            onChange={e => setActiveUser(e.target.value)}
            style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "4px 8px", borderRadius: 6, fontSize: 13 }}
          >
            {db.User.map(u => <option key={u.user_id} value={u.user_id}>{u.user_name} ({db.Household.find(h => h.household_id === u.household_id)?.household_name})</option>)}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, padding: "0 24px" }}>
        {TABS.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              background: "none", border: "none", padding: "12px 18px", fontSize: 13,
              color: tab === i ? COLORS.accent : COLORS.muted,
              borderBottom: tab === i ? `2px solid ${COLORS.accent}` : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >{t}</button>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 999,
          background: toast.type === "success" ? COLORS.accentDim : COLORS.danger,
          color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13,
          animation: "fadeIn 0.2s ease", boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
        }}>{toast.msg}</div>
      )}

      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        {tab === 0 && <FridgeTab db={db} setDb={setDb} householdId={householdId} showToast={showToast} />}
        {tab === 1 && <RecipesTab db={db} activeUser={activeUser} showToast={showToast} setDb={setDb} />}
        {tab === 2 && <HistoryTab db={db} activeUser={activeUser} />}
        {tab === 3 && <AskTab db={db} activeUser={activeUser} householdId={householdId} />}
      </div>
    </div>
  );
}

// fridge
function FridgeTab({ db, setDb, householdId, showToast }) {
  const fridgeItems = db.FoodItem.filter(f => f.household_id === householdId);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ ingredient_id: "", expiration_date: "", item_quantity: "", item_unit: "cups" });
  const [editing, setEditing] = useState(null);
  const [editQty, setEditQty] = useState("");

  const handleAdd = () => {
    if (!form.ingredient_id || !form.expiration_date || !form.item_quantity) {
      showToast("Fill in all fields", "error"); return;
    }
    const newId = "f" + String(Date.now()).slice(-6);
    setDb(prev => ({ ...prev, FoodItem: [...prev.FoodItem, { fooditem_id: newId, household_id: householdId, ...form, item_quantity: parseInt(form.item_quantity) }] }));
    setForm({ ingredient_id: "", expiration_date: "", item_quantity: "", item_unit: "cups" });
    setAdding(false);
    showToast("Food item added!");
  };

  const handleDelete = (id) => {
    setDb(prev => ({ ...prev, FoodItem: prev.FoodItem.filter(f => f.fooditem_id !== id) }));
    showToast("Item removed from fridge");
  };

  const handleUpdateQty = (id) => {
    const qty = parseInt(editQty);
    if (isNaN(qty) || qty < 0) { showToast("Invalid quantity", "error"); return; }
    setDb(prev => ({ ...prev, FoodItem: prev.FoodItem.map(f => f.fooditem_id === id ? { ...f, item_quantity: qty } : f) }));
    setEditing(null);
    showToast("Quantity updated");
  };

  const urgencyColor = (days) => days <= 2 ? COLORS.danger : days <= 5 ? COLORS.warn : COLORS.accent;
  const hhName = db.Household.find(h => h.household_id === householdId)?.household_name;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22 }}>{hhName} Fridge</h2>
          <p style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{fridgeItems.length} items stored</p>
        </div>
        <button onClick={() => setAdding(!adding)} style={{ background: COLORS.accent, color: "#ffffff", border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
          {adding ? "✕ Cancel" : "+ Add Item"}
        </button>
      </div>

      {adding && (
        <div className="card" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, marginBottom: 16, color: COLORS.accent }}>Add Food Item</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: COLORS.muted, display: "block", marginBottom: 4 }}>INGREDIENT</label>
              <select value={form.ingredient_id} onChange={e => setForm(p => ({ ...p, ingredient_id: e.target.value }))}
                style={{ width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "8px 10px", borderRadius: 6, fontSize: 13 }}>
                <option value="">Select...</option>
                {db.Ingredient.map(i => <option key={i.ingredient_id} value={i.ingredient_id}>{i.ingredient_name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: COLORS.muted, display: "block", marginBottom: 4 }}>EXPIRATION DATE</label>
              <input type="date" value={form.expiration_date} onChange={e => setForm(p => ({ ...p, expiration_date: e.target.value }))}
                style={{ width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "8px 10px", borderRadius: 6, fontSize: 13 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: COLORS.muted, display: "block", marginBottom: 4 }}>QUANTITY</label>
              <input type="number" placeholder="e.g. 3" value={form.item_quantity} onChange={e => setForm(p => ({ ...p, item_quantity: e.target.value }))}
                style={{ width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "8px 10px", borderRadius: 6, fontSize: 13 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: COLORS.muted, display: "block", marginBottom: 4 }}>UNIT</label>
              <select value={form.item_unit} onChange={e => setForm(p => ({ ...p, item_unit: e.target.value }))}
                style={{ width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "8px 10px", borderRadius: 6, fontSize: 13 }}>
                {["cups", "lbs", "oz", "count", "cloves", "jar", "box", "tbsp", "tsp"].map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleAdd} style={{ marginTop: 14, background: COLORS.accent, color: "#ffffff", border: "none", padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
            Add to Fridge
          </button>
        </div>
      )}

      <div style={{ display: "grid", gap: 10 }}>
        {fridgeItems.length === 0 && <p style={{ color: COLORS.muted, textAlign: "center", padding: 40 }}>Fridge is empty. Add some items!</p>}
        {fridgeItems.map(item => {
          const ingredient = db.Ingredient.find(i => i.ingredient_id === item.ingredient_id);
          const tags = db.ingredient_tag.filter(t => t.ingredient_id === item.ingredient_id).map(t => t.tag);
          const days = daysDiff(item.expiration_date);
          return (
            <div key={item.fooditem_id} className="card" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: urgencyColor(days), flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 15 }}>{ingredient?.ingredient_name}</div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 3 }}>
                  {tags.map(t => <span key={t} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "1px 6px", marginRight: 4 }}>{t}</span>)}
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: 12 }}>
                {editing === item.fooditem_id ? (
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="number" value={editQty} onChange={e => setEditQty(e.target.value)}
                      style={{ width: 60, background: COLORS.surface, border: `1px solid ${COLORS.accent}`, color: COLORS.text, padding: "4px 8px", borderRadius: 5, fontSize: 13 }} />
                    <button onClick={() => handleUpdateQty(item.fooditem_id)} style={{ background: COLORS.accentDim, color: "#fff", border: "none", padding: "4px 10px", borderRadius: 5, fontSize: 12 }}>✓</button>
                    <button onClick={() => setEditing(null)} style={{ background: COLORS.surface, color: COLORS.muted, border: `1px solid ${COLORS.border}`, padding: "4px 8px", borderRadius: 5, fontSize: 12 }}>✕</button>
                  </div>
                ) : (
                  <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 500, cursor: "pointer" }} onClick={() => { setEditing(item.fooditem_id); setEditQty(item.item_quantity); }}>
                    {item.item_quantity} {item.item_unit} ✎
                  </span>
                )}
                <div style={{ color: urgencyColor(days), marginTop: 4 }}>
                  {days <= 0 ? "EXPIRED" : days === 1 ? "Expires tomorrow" : `${days}d left`}
                </div>
              </div>
              <button onClick={() => handleDelete(item.fooditem_id)}
                style={{ background: "none", border: `1px solid ${COLORS.border}`, color: COLORS.muted, padding: "6px 10px", borderRadius: 6, fontSize: 13, transition: "all 0.2s" }}
                onMouseOver={e => e.target.style.borderColor = COLORS.danger}
                onMouseOut={e => e.target.style.borderColor = COLORS.border}>
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// recipes
function RecipesTab({ db, activeUser, showToast, setDb }) {
  const user = db.User.find(u => u.user_id === activeUser);
  const fridgeItems = db.FoodItem.filter(f => f.household_id === user?.household_id && f.item_quantity > 0);
  const fridgeIngredients = new Set(fridgeItems.map(f => f.ingredient_id));
  const [logModal, setLogModal] = useState(null);
  const [rating, setRating] = useState(5);
  const [expanded, setExpanded] = useState(null);

  const getMatchInfo = (recipeId) => {
    const needed = db.MadeOf.filter(m => m.recipe_id === recipeId);
    const have = needed.filter(m => fridgeIngredients.has(m.ingredient_id));
    const missing = needed.filter(m => !fridgeIngredients.has(m.ingredient_id));
    const substitutable = missing.filter(m => {
      const subs = db.SubstitutesFor.filter(s => s.original_ingredient_id === m.ingredient_id);
      return subs.some(s => fridgeIngredients.has(s.replacement_ingredient_id));
    });
    return { total: needed.length, have: have.length, missing: missing.length, substitutable: substitutable.length };
  };

  const recipes = db.Recipe.map(r => {
    const match = getMatchInfo(r.recipe_id);
    const pct = match.total > 0 ? Math.round((match.have / match.total) * 100) : 0;
    const urgent = db.MadeOf.filter(m => m.recipe_id === r.recipe_id)
      .filter(m => fridgeIngredients.has(m.ingredient_id))
      .map(m => fridgeItems.find(f => f.ingredient_id === m.ingredient_id))
      .filter(Boolean)
      .reduce((min, f) => Math.min(min, daysDiff(f.expiration_date)), 99);
    return { ...r, match, pct, urgent };
  }).sort((a, b) => b.pct - a.pct || a.urgent - b.urgent);

  const handleLog = () => {
    const logId = "l" + String(Date.now()).slice(-6);
    setDb(prev => ({
      ...prev,
      RecipeLog: [...prev.RecipeLog, { log_id: logId, user_id: activeUser, rating, date_completed: new Date().toISOString().split("T")[0] }],
      IsIn: [...prev.IsIn, { recipe_id: logModal, log_id: logId }],
    }));
    setLogModal(null);
    showToast(`Recipe logged with ${rating}★ rating!`);
  };

  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, marginBottom: 6 }}>Recipe Recommendations</h2>
      <p style={{ color: COLORS.muted, fontSize: 12, marginBottom: 20 }}>Ranked by fridge match % and expiration urgency</p>

      {logModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 28, width: 340 }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", marginBottom: 16 }}>Mark as Completed</h3>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>Rate this recipe:</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setRating(n)}
                  style={{ fontSize: 24, background: "none", border: "none", color: n <= rating ? COLORS.warn : COLORS.border }}>★</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleLog} style={{ flex: 1, background: COLORS.accent, color: "#ffffff", border: "none", padding: "10px", borderRadius: 8, fontWeight: 500 }}>Log It</button>
              <button onClick={() => setLogModal(null)} style={{ flex: 1, background: COLORS.surface, color: COLORS.muted, border: `1px solid ${COLORS.border}`, padding: "10px", borderRadius: 8 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {recipes.map(r => (
          <div key={r.recipe_id} className="card" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div
                  style={{ fontFamily: "'Fraunces', serif", fontSize: 18, cursor: "pointer", textDecoration: "underline dotted", textUnderlineOffset: 3 }}
                  onClick={() => setExpanded(expanded === r.recipe_id ? null : r.recipe_id)}
                >
                  {r.recipe_name} {expanded === r.recipe_id ? "▲" : "▼"}
                </div>
                <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>
                  {r.recipe_cuisine} · {r.recipe_diet} · Spice: {"🌶".repeat(r.recipe_spice_level)}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 22, fontWeight: 500, color: r.pct === 100 ? COLORS.accent : r.pct >= 60 ? COLORS.warn : COLORS.muted }}>
                  {r.pct}%
                </div>
                <div style={{ fontSize: 10, color: COLORS.muted }}>match</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14, alignItems: "center" }}>
              <div style={{ flex: 1, background: COLORS.surface, borderRadius: 4, height: 4 }}>
                <div style={{ width: `${r.pct}%`, height: "100%", borderRadius: 4, background: r.pct === 100 ? COLORS.accent : r.pct >= 60 ? COLORS.warn : COLORS.muted, transition: "width 0.5s ease" }} />
              </div>
              <span style={{ fontSize: 11, color: COLORS.muted }}>{r.match.have}/{r.match.total} ingredients</span>
              {r.match.substitutable > 0 && <span style={{ fontSize: 11, color: COLORS.warn }}>+{r.match.substitutable} sub</span>}
              {r.urgent < 3 && r.match.have > 0 && <span style={{ fontSize: 11, color: COLORS.danger }}>⚡ urgent</span>}
            </div>

            {expanded === r.recipe_id && (
              <div style={{ marginTop: 14, borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, display: "grid", gap: 6 }}>
                <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Ingredients</div>
                {db.MadeOf.filter(m => m.recipe_id === r.recipe_id).map(m => {
                  const ing = db.Ingredient.find(i => i.ingredient_id === m.ingredient_id);
                  const inFridge = fridgeIngredients.has(m.ingredient_id);
                  const sub = !inFridge && db.SubstitutesFor.filter(s => s.original_ingredient_id === m.ingredient_id).find(s => fridgeIngredients.has(s.replacement_ingredient_id));
                  const subIng = sub && db.Ingredient.find(i => i.ingredient_id === sub.replacement_ingredient_id);
                  return (
                    <div key={m.ingredient_id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                      <span style={{ color: inFridge ? COLORS.accent : sub ? COLORS.warn : COLORS.danger }}>
                        {inFridge ? "✓" : sub ? "~" : "✗"}
                      </span>
                      <span style={{ color: inFridge ? COLORS.text : sub ? COLORS.warn : COLORS.muted }}>
                        {ing?.ingredient_name}
                      </span>
                      <span style={{ color: COLORS.muted, fontSize: 12 }}>
                        {m.ingredient_quantity} {m.ingredient_unit}
                      </span>
                      {sub && <span style={{ fontSize: 11, color: COLORS.warn }}>→ sub: {subIng?.ingredient_name}</span>}
                    </div>
                  );
                })}
                {r.instructions?.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Instructions</div>
                    {r.instructions.map((step, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 10, marginBottom: 6, fontSize: 13, lineHeight: 1.5 }}>
                        <span style={{ color: COLORS.accent, fontWeight: 500, flexShrink: 0 }}>{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button onClick={() => setLogModal(r.recipe_id)}
              style={{ marginTop: 12, background: "none", border: `1px solid ${COLORS.accentDim}`, color: COLORS.accent, padding: "6px 14px", borderRadius: 7, fontSize: 12 }}>
              ✓ Mark Cooked
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// history
function HistoryTab({ db, activeUser }) {
  const logs = db.RecipeLog.filter(l => l.user_id === activeUser)
    .map(l => {
      const isIn = db.IsIn.find(i => i.log_id === l.log_id);
      const recipe = isIn ? db.Recipe.find(r => r.recipe_id === isIn.recipe_id) : null;
      return { ...l, recipe };
    })
    .sort((a, b) => new Date(b.date_completed) - new Date(a.date_completed));

  const avgRating = logs.length ? (logs.reduce((s, l) => s + l.rating, 0) / logs.length).toFixed(1) : "—";

  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[{ label: "Meals Cooked", val: logs.length }, { label: "Avg Rating", val: avgRating + "★" }].map(stat => (
          <div key={stat.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 24px", flex: 1 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: COLORS.accent }}>{stat.val}</div>
            <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, marginBottom: 16 }}>Cooking History</h2>
      {logs.length === 0 && <p style={{ color: COLORS.muted, textAlign: "center", padding: 40 }}>No cooking history yet. Mark some recipes as cooked!</p>}
      <div style={{ display: "grid", gap: 10 }}>
        {logs.map(l => (
          <div key={l.log_id} className="card" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16 }}>{l.recipe?.recipe_name ?? "Unknown Recipe"}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 3 }}>{l.date_completed}</div>
            </div>
            <div style={{ fontSize: 18, color: COLORS.warn }}>{"★".repeat(l.rating)}{"☆".repeat(5 - l.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ask
function AskTab({ db, activeUser, householdId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const buildContext = () => {
    const user = db.User.find(u => u.user_id === activeUser);
    const cuisines = db.preferred_cuisines.filter(c => c.user_id === activeUser).map(c => c.cuisine);
    const fridge = db.FoodItem.filter(f => f.household_id === householdId && f.item_quantity > 0).map(f => {
      const ing = db.Ingredient.find(i => i.ingredient_id === f.ingredient_id);
      return `${ing?.ingredient_name}: ${f.item_quantity} ${f.item_unit}, expires ${f.expiration_date} (${daysDiff(f.expiration_date)}d)`;
    });
    const history = db.RecipeLog.filter(l => l.user_id === activeUser).map(l => {
      const isIn = db.IsIn.find(i => i.log_id === l.log_id);
      const r = isIn ? db.Recipe.find(rr => rr.recipe_id === isIn.recipe_id) : null;
      return `${r?.recipe_name ?? "Unknown"}: ${l.rating}★`;
    });
    return `You are the Leftovers AI assistant for the recipe recommendation app. Here is the current user's data:
User: ${user?.user_name}, spice tolerance: ${user?.spice_tolerance}/5, preferred cuisines: ${cuisines.join(", ")}
Fridge contents: ${fridge.join("; ")}
Cooking history & ratings: ${history.join("; ") || "none yet"}
Recipes in system: ${db.Recipe.map(r => r.recipe_name).join(", ")}
Answer questions about their fridge, suggest recipes, give cooking tips, explain substitutions, or analyze their history. Be concise and practical.`;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildContext(),
          messages: newMessages,
        }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text ?? "Sorry, I couldn't get a response.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const suggestions = ["What should I cook tonight?", "What's expiring soon?", "Suggest a vegetarian meal", "How is my cooking history?"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 160px)" }}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, marginBottom: 6 }}>Chef's Assistant</h2>
      <p style={{ color: COLORS.muted, fontSize: 12, marginBottom: 16 }}>Ask about your fridge, recipes, or cooking history</p>

      {messages.length === 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)}
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.muted, padding: "7px 14px", borderRadius: 20, fontSize: 12, transition: "all 0.2s" }}
              onMouseOver={e => { e.target.style.borderColor = COLORS.accentDim; e.target.style.color = COLORS.accent; }}
              onMouseOut={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.muted; }}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "75%", padding: "12px 16px", borderRadius: 12, fontSize: 14, lineHeight: 1.6,
              background: m.role === "user" ? COLORS.accentDim : COLORS.card,
              color: m.role === "user" ? "#fff" : COLORS.text,
              border: m.role === "assistant" ? `1px solid ${COLORS.border}` : "none",
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex" }}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "12px 16px" }}>
              <span style={{ color: COLORS.muted, fontSize: 14 }}>Thinking<span style={{ animation: "fadeIn 1s infinite alternate" }}>...</span></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: 10, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about your fridge or recipes..."
          style={{ flex: 1, background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "12px 16px", borderRadius: 10, fontSize: 14, outline: "none" }}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}
          style={{ background: COLORS.accent, color: "#ffffff", border: "none", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500, opacity: loading || !input.trim() ? 0.5 : 1 }}>
          Send
        </button>
      </div>
    </div>
  );
}
