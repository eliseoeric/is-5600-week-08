// api.js
const express = require('express');
const router = express.Router();

// --- stub routes for smoke tests ---
router.get('/products', (req, res) => {
  res.status(200).json({ ok: true, items: [] });
});

router.get('/orders', (req, res) => {
  res.status(200).json({ ok: true, items: [] });
});

// export the router itself (NOT { router: ... })
module.exports = router;
