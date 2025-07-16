const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ msg: 'Email уже используется' });

  const hash = await bcrypt.hash(password, 10);
  const user = await createUser(email, hash);
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ msg: 'Неверный email или пароль' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Неверный email или пароль' });

  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email } });
});

module.exports = router;
