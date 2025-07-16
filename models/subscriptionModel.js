const db = require('../db');

async function getUserSubscription(userId) {
  const res = await db.query('SELECT * FROM subscriptions WHERE user_id = $1', [userId]);
  return res.rows[0];
}

async function activateSubscription(userId) {
  const existing = await getUserSubscription(userId);
  if (existing) {
    await db.query('UPDATE subscriptions SET active = TRUE WHERE user_id = $1', [userId]);
  } else {
    await db.query('INSERT INTO subscriptions (user_id, active) VALUES ($1, TRUE)', [userId]);
  }
}

module.exports = { getUserSubscription, activateSubscription };
