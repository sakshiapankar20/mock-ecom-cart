// src/routes/products.js
const express = require('express');

function createProductsRouter(db) {
  const router = express.Router();

  // GET /api/products
  router.get('/', async (req, res) => {
    try {
      const products = await db.all('SELECT * FROM products ORDER BY id');
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // (optional) GET /api/products/:id
  router.get('/:id', async (req, res) => {
    try {
      const product = await db.get('SELECT * FROM products WHERE id = ?', req.params.id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  return router;
}

module.exports = createProductsRouter;
