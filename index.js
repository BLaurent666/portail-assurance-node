// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const clientsRoutes = require('./routes/clients');
const policiesRoutes = require('./routes/policies');
const claimsRoutes = require('./routes/claims');

const app = express();

app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/claims', claimsRoutes);

// Healthcheck simple
app.get('/', (req, res) => {
  res.send('API Portail assurance – en ligne ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API Portail assurance démarrée sur le port ${PORT}`);
});
