const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const sendVerificationEmail = require('../utils/mailer');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length) return res.status(400).json({ error: 'Email уже зарегистрирован' });

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashed]
    );

    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: 'Проверьте email для подтверждения' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!user.rows.length) return res.status(400).json({ error: 'Неверный email' });

    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) return res.status(400).json({ error: 'Неверный пароль' });

    if (!user.rows[0].verified) return res.status(403).json({ error: 'Подтвердите email' });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.get('/verify', async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await db.query('UPDATE users SET verified = true WHERE id = $1', [decoded.id]);
    res.redirect(`${process.env.BASE_URL}/login`);
  } catch {
    res.status(400).send('Неверный или просроченный токен');
  }
});

module.exports = router;
