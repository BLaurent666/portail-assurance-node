// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// ⚠️ User “en dur” pour l’instant (à remplacer par la DB plus tard)
const fakeUser = {
  id: 1,
  email: 'agent@courtier.fr',
  passwordHash: bcrypt.hashSync('motdepasse123', 10),
  role: 'agent'
};

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  if (email !== fakeUser.email) {
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }

  const ok = bcrypt.compareSync(password, fakeUser.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }

  const token = signToken(fakeUser);

  res.json({
    token,
    user: { id: fakeUser.id, email: fakeUser.email, role: fakeUser.role }
  });
});

// Middleware de protection JWT
function authGuard(req, res, next) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' '); // "Bearer xxx"

  if (!token) {
    return res.status(401).json({ message: 'Token requis.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
}

// 🔴 IMPORTANT : on exporte les deux
module.exports = {
  router,
  authGuard
};
