// routes/policies.js
const express = require('express');
const { authGuard } = require('./auth');

const router = express.Router();

let policies = [
  {
    id: 1,
    policyNumber: 'POL-2025-0001',
    clientId: 1,
    product: 'RC Pro',
    status: 'active',
    startDate: '2025-01-01',
    endDate: '2026-01-01'
  }
];

// Liste
router.get('/', authGuard, (req, res) => {
  res.json(policies);
});

// Détail
router.get('/:id', authGuard, (req, res) => {
  const id = Number(req.params.id);
  const policy = policies.find(p => p.id === id);
  if (!policy) {
    return res.status(404).json({ message: 'Contrat introuvable.' });
  }
  res.json(policy);
});

// Création
router.post('/', authGuard, (req, res) => {
  const { policyNumber, clientId, product, startDate, endDate } = req.body || {};
  if (!policyNumber || !clientId || !product) {
    return res.status(400).json({ message: 'policyNumber, clientId, product requis.' });
  }
  const id = policies.length ? policies[policies.length - 1].id + 1 : 1;
  const policy = {
    id,
    policyNumber,
    clientId,
    product,
    status: 'active',
    startDate: startDate || null,
    endDate: endDate || null
  };
  policies.push(policy);
  res.status(201).json(policy);
});

module.exports = router;
