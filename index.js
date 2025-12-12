// index.js
require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// ✅ Debug route (pour vérifier immédiatement que c’est le bon code)
app.get('/api/_debug', (req, res) => {
  res.json({ ok: true, version: '2025-12-12', routes: ['auth', 'clients', 'policies', 'claims'] });
});

// ✅ Import des routes
const { router: authRoutes } = require('./routes/auth');
const clientsRoutes = require('./routes/clients');
const policiesRoutes = require('./routes/policies');
const claimsRoutes = require('./routes/claims');

// ✅ Montage des routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/claims', claimsRoutes);

// Page d’accueil
app.get('/', (req, res) => {
  res.send('API Portail assurance – en ligne ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API Portail assurance démarrée sur le port ${PORT}`);
});
