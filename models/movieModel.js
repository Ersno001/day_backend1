const db = require('../db');

async function getAllMovies() {
  const res = await db.query('SELECT * FROM movies');
  return res.rows;
}

async function getMovieById(id) {
  const res = await db.query('SELECT * FROM movies WHERE id = $1', [id]);
  return res.rows[0];
}

module.exports = { getAllMovies, getMovieById };
