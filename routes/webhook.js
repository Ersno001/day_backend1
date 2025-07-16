const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const { activateSubscription } = require('../models/subscriptionModel');

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }

  if (event.type === 'payment_intent.succeeded') {
    const userId = event.data.object.metadata.userId;
    console.log(`Activating subscription for user: ${userId}`);
    await activateSubscription(userId);
  }

  res.json({ received: true });
});

module.exports = router;
