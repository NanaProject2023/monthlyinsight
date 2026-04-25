
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());



const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres:monthlyinsightproject@db.hrpktcbwruetdtuodwkq.supabase.co:5432/postgres",
});

const SECRET = process.env.JWT_SECRET;


// 🔐 1. MIDDLEWARE FIRST
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  console.log("TOKEN RECEIVED:", token);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;

    console.log("USER DECODED:", req.user); // ✅ FIXED POSITION

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// 🔑 2. AUTH ROUTES
app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashed]
    );

    const user = result.rows[0]; // 🔥 REQUIRED

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET
    );

    return res.json({ token });
  } catch (err) {
    console.log("🔥 SIGNUP ERROR:", err);

    return res.status(500).json({
      error: err.message,
      code: err.code,
    });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET
    );

    return res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Login failed" });
  }
});

// GET
app.get("/entries", authMiddleware, async (req, res) => {
  try {
    const email = req.user.email;

    // get user_id from users table
    const userResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    const user_id = userResult.rows[0].id;

    const result = await pool.query(
      "SELECT * FROM entries WHERE user_id = $1 ORDER BY id DESC",
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET /entries error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST
app.post("/entries", authMiddleware, async (req, res) => {
  try {
    const { type, amount, day, title } = req.body;

    const email = req.user.email;

    const userResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    const user_id = userResult.rows[0].id;

    const result = await pool.query(
      "INSERT INTO entries (user_id, type, amount, day, title) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, type, amount, day, title]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("POST /entries error:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});





// DELETE
app.delete("/entries/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);

  const email = req.user.email;

  const userResult = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  const user_id = userResult.rows[0].id;

  await pool.query(
    "DELETE FROM entries WHERE id = $1 AND user_id = $2",
    [id, user_id]
  );

  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));