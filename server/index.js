const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5173;

app.use(cors());
app.use(bodyParser.json());

const users = [];

app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ error: 'User already exists' });
  users.push({ email, password });
  res.json({ message: 'Registered successfully' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/api/analytics", async (req, res) => {
  const { event, data, timestamp } = req.body;

  try {
    await pool.query(
      "INSERT INTO analytics (event, data, timestamp) VALUES ($1, $2, to_timestamp($3 / 1000.0))",
      [event, data, timestamp]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error("Error logging analytics:", err);
    res.sendStatus(500);
  }
});


app.get("/metrics", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        event,
        COUNT(*) as count,
        MAX(timestamp) as last_occurrence
      FROM analytics
      GROUP BY event
      ORDER BY count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch analytics stats", err);
    res.sendStatus(500);
  }
});
