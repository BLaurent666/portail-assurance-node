// routes/claims.js
const express = require('express');
const { authGuard } = require('./auth');

const router = express.Router();

let claims = [
  {
    id: 1,
    clientId: 1,
    policyId: 1,
    status: 'reported',
    type: 'rc_pro',
    lossDate: '2025-01-01',
    reportDate: '2025-01-02',
    description: 'Exemple de sinistre RC Pro'
  }
];

// Liste
router.get('/', authGuard, (req, res) => {
  res.json(claims);
});

// Détail
router.get('/:id', authGuard, (req, res) => {
  const id = Number(req.params.id);
  const claim = claims.find(c => c.id === id);
  if (!claim) {
    return res.status(404).json({ message: 'Sinistre introuvable.' });
  }
  res.json(claim);
});

// Déclaration de sinistre
router.post('/', authGuard, (req, res) => {
  const { clientId, policyId, type, lossDate, description } = req.body || {};
  if (!clientId || !policyId || !type || !lossDate) {
    return res.status(400).json({ message: 'clientId, policyId, type, lossDate requis.' });
  }

  const id = claims.length ? claims[claims.length - 1].id + 1 : 1;
  const claim = {
    id,
    clientId,
    policyId,
    type,
    lossDate,
    reportDate: new Date().toISOString().slice(0, 10),
    description: description || '',
    status: 'reported'
  };
  claims.push(claim);
  res.status(201).json(claim);
});

// Changement de statut (ex : traitement, clôture)
router.patch('/:id/status', authGuard, (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body || {};
  const claim = claims.find(c => c.id === id);
  if (!claim) {
    return res.status(404).json({ message: 'Sinistre introuvable.' });
  }
  claim.status = status || claim.status;
  res.json(claim);
});

module.exports = router;
