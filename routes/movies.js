const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllMovies, getMovieById } = require('../models/movieModel');
const { getUserSubscription } = require('../models/subscriptionModel');

router.get('/', auth, async (req, res) => {
  const movies = await getAllMovies();
  res.json(movies);
});

router.get('/:id', auth, async (req, res) => {
  const sub = await getUserSubscription(req.userId);
  if (!sub || !sub.active) {
    return res.status(403).json({ msg: 'Нужна активная подписка' });
  }
  const movie = await getMovieById(req.params.id);
  if (!movie) return res.status(404).json({ msg: 'Фильм не найден' });
  res.json(movie);
});

module.exports = router;
