// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// On récupère router et authGuard depuis auth.js
const authModule = require('./routes/auth');
const authRoutes = authModule.router;
const { authGuard } = authModule;

const clientsRoutes = require('./routes/clients');
const policiesRoutes = require('./routes/policies');
const claimsRoutes = require('./routes/claims');

const app = express();

app.use(cors());
app.use(express.json());

// Routes publiques / de base
app.get('/', (req, res) => {
  res.send('API Portail assurance – en ligne ✅');
});

// Routes d’authentification
app.use('/api/auth', authRoutes);

// Routes protégées par JWT (dans les fichiers, on réutilise authGuard)
app.use('/api/clients', clientsRoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/claims', claimsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API Portail assurance démarrée sur le port ${PORT}`);
});
