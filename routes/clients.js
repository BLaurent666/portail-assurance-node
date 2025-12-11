// routes/clients.js
const express = require('express');
const { authGuard } = require('./auth');

const router = express.Router();

// Pour l’instant : “base de données” en mémoire
let clients = [
  {
    id: 1,
    type: 'company',
    name: 'Client Démo SARL',
    email: 'contact@client-demo.fr'
  }
];

// Liste des clients (protégé)
router.get('/', authGuard, (req, res) => {
  res.json(clients);
});

// Détail client
router.get('/:id', authGuard, (req, res) => {
  const id = Number(req.params.id);
  const client = clients.find(c => c.id === id);
  if (!client) {
    return res.status(404).json({ message: 'Client introuvable.' });
  }
  res.json(client);
});

// Création client
router.post('/', authGuard, (req, res) => {
  const { type, name, email } = req.body || {};
  if (!type || !name || !email) {
    return res.status(400).json({ message: 'type, name, email requis.' });
  }
  const id = clients.length ? clients[clients.length - 1].id + 1 : 1;
  const client = { id, type, name, email };
  clients.push(client);
  res.status(201).json(client);
});

module.exports = router;
