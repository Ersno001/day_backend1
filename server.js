const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/user');
const webhookRoutes = require('./routes/webhook');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/user', userRoutes);
app.use('/webhook', webhookRoutes);

app.get('/', (req, res) => {
  res.send('https://day-backend1.onrender.com/api');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
