// index.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// --------------------
// Configuration
// --------------------
const PORT = Number(process.env.PORT || 3000);
const NODE_ENV = process.env.NODE_ENV || 'production';

// CORS : en prod, idéalement restreindre à ton futur front
// Exemple : CORS_ORIGINS="https://club.dataentreprise.com,https://app.dataentreprise.com"
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.set('trust proxy', 1); // utile derrière proxy Infomaniak

// --------------------
// Middlewares
// --------------------
app.use(helmet());
app.use(
  cors({
    origin: corsOrigins.length ? corsOrigins : true, // true = reflète l’origine (dev)
    credentials: true
  })
);

app.use(express.json({ limit: '2mb' })); // limite prudente (on fera l’upload séparément)
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// --------------------
// Routes de diagnostic (pratiques en phase de déploiement)
// --------------------
app.get('/', (req, res) => {
  res.send('API Portail assurance – v2025-12-12 ✅');
});

app.get('/api/_debug', (req, res) => {
  res.json({
    ok: true,
    version: 'v2025-12-12',
    env: NODE_ENV,
    time: new Date().toISOString()
  });
});

app.get('/api/_where', (req, res) => {
  res.json({
    cwd: process.cwd(),
    node: process.version
  });
});

// --------------------
// Montage des routes métier
// --------------------
// auth.js exporte: module.exports = { router, authGuard }
const { router: authRoutes } = require('./routes/auth');
const clientsRoutes = require('./routes/clients');
const policiesRoutes = require('./routes/policies');
const claimsRoutes = require('./routes/claims');

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/claims', claimsRoutes);

// --------------------
// 404 JSON (pour routes /api/* inconnues)
// --------------------
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Route API introuvable.' });
});

// --------------------
// Handler d’erreurs (JSON)
// --------------------
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    message: 'Erreur interne du serveur.',
    // En prod on évite de divulguer des détails
    ...(NODE_ENV !== 'production' ? { details: String(err) } : {})
  });
});

// --------------------
// Start
// --------------------
app.listen(PORT, () => {
  console.log(`✅ API Portail assurance démarrée sur le port ${PORT} (${NODE_ENV})`);
});
