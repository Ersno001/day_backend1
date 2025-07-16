const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ msg: 'Нет токена' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Неверный токен' });
  }
}

module.exports = authMiddleware;
