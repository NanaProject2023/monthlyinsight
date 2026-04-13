const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "monthly_insight",
});

// GET
app.get("/entries", async (req, res) => {
  const result = await pool.query("SELECT * FROM entries ORDER BY id DESC");
  res.json(result.rows);
});

// POST
app.post("/entries", async (req, res) => {
  const { day, title, amount, type } = req.body;

  await pool.query(
    "INSERT INTO entries(day, title, amount, type) VALUES($1,$2,$3,$4)",
    [day, title, amount, type]
  );

  res.send("Inserted");
});

// DELETE
app.delete("/entries/:id", async (req, res) => {
  await pool.query("DELETE FROM entries WHERE id=$1", [req.params.id]);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Server running on 5000"));