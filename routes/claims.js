// backend/routes/claims.js
const express = require('express');
const router = express.Router();

/**
 * Liste de sinistres (mock)
 */
router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      clientId: 1,
      policyNumber: 'POL-2025-0001',
      status: 'reported',
      type: 'rc_pro',
      lossDate: '2025-01-01',
      reportDate: '2025-01-02'
    }
  ]);
});

/**
 * Création d’un sinistre (mock pour l’instant)
 */
router.post('/', (req, res) => {
  const payload = req.body || {};
  // Ici on validera + insèrera en base plus tard
  res.status(201).json({
    id: 2,
    ...payload,
    status: 'reported',
    createdAt: new Date().toISOString()
  });
});

module.exports = router;
