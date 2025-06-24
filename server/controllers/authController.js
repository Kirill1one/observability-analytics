const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (existing.rows.length > 0) return res.status(400).json({ message: 'Email already exists' });

//     await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashed]);
//     res.status(201).json({ message: 'Registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userRes.rows[0];
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
