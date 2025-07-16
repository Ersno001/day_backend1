const db = require('../db');

async function createUser(email, passwordHash) {
  const res = await db.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, passwordHash]
  );
  return res.rows[0];
}

async function findUserByEmail(email) {
  const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
}

module.exports = { createUser, findUserByEmail };
