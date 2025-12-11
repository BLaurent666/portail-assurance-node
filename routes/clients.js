// backend/routes/clients.js
const express = require('express');
const router = express.Router();

/**
 * Liste de clients (faux pour l'instant, en attendant la DB)
 */
router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      type: 'company',
      name: 'Client Démo SARL',
      email: 'contact@client-demo.fr'
    }
  ]);
});

/**
 * Détails d’un client (mock)
 */
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  res.json({
    id,
    type: 'company',
    name: `Client #${id}`,
    email: `client${id}@exemple.com`
  });
});

module.exports = router;
