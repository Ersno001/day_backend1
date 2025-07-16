const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getUserSubscription, activateSubscription } = require('../models/subscriptionModel');
const db = require('../db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/profile', auth, async (req, res) => {
  const userRes = await db.query('SELECT id, email FROM users WHERE id = $1', [req.userId]);
  const user = userRes.rows[0];
  const subscription = await getUserSubscription(req.userId);
  res.json({ user, subscription });
});

router.post('/create-payment-intent', auth, async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 29900,
    currency: 'rub',
    metadata: { userId: req.userId },
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

router.post('/confirm-payment', auth, async (req, res) => {
  await activateSubscription(req.userId);
  res.json({ msg: 'Подписка активирована' });
});

module.exports = router;
