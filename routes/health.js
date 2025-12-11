// backend/routes/health.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'portail-assurance-api',
    timestamp: new Date().toISOString()
  });
});

router.get('/version', (req, res) => {
  res.json({
    version: '0.1.0',
    env: process.env.NODE_ENV || 'development'
  });
});

module.exports = router;
