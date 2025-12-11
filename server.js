// backend/server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const clientsRoutes = require('./routes/clients');
const claimsRoutes = require('./routes/claims');

const app = express();

// Middleware de sécurité de base
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Préfixe API
app.use('/api/health', healthRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/claims', claimsRoutes);

// Port d'écoute (Infomaniak passera PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Portail assurance API démarrée sur le port ${PORT}`);
});
