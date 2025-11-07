// src/routes/cart.js
const express = require('express');

function createCartRouter(db) {
  const router = express.Router();

  // GET /api/cart  -> return items with product details + total
  router.get('/', async (req, res) => {
    try {
      const items = await db.all(`
        SELECT c.id as cartId, c.qty, c.userId, p.id as productId, p.name, p.price, p.description, p.image
        FROM cart c
        JOIN products p ON c.productId = p.id
        WHERE c.userId = 'mock-user'
      `);
      const total = items.reduce((s, it) => s + Number(it.price) * Number(it.qty), 0);
      res.json({ items, total });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch cart' });
    }
  });

  // POST /api/cart  { productId, qty }
  router.post('/', async (req, res) => {
    try {
      const { productId, qty = 1 } = req.body;
      if (!productId) return res.status(400).json({ error: 'productId required' });

      // if existing, increment qty
      const existing = await db.get(
        'SELECT * FROM cart WHERE productId = ? AND userId = ?',
        productId,
        'mock-user'
      );
      if (existing) {
        const newQty = Number(existing.qty) + Number(qty);
        await db.run('UPDATE cart SET qty = ? WHERE id = ?', newQty, existing.id);
        const updated = await db.get('SELECT id as cartId, qty, productId FROM cart WHERE id = ?', existing.id);
        return res.status(200).json(updated);
      }

      const result = await db.run(
        'INSERT INTO cart (productId, qty, userId) VALUES (?, ?, ?)',
        productId,
        qty,
        'mock-user'
      );
      const cartId = result.lastID || result.insertId;
      const newItem = await db.get(
        `SELECT c.id as cartId, c.qty, p.id as productId, p.name, p.price, p.description, p.image
         FROM cart c JOIN products p ON c.productId = p.id WHERE c.id = ?`,
        cartId
      );
      res.status(201).json(newItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add to cart' });
    }
  });

  // DELETE /api/cart/:id
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await db.run('DELETE FROM cart WHERE id = ?', id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to remove item' });
    }
  });

  // PATCH /api/cart/:id { qty }
  router.patch('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { qty } = req.body;
      if (qty == null) return res.status(400).json({ error: 'qty required' });
      await db.run('UPDATE cart SET qty = ? WHERE id = ?', qty, id);
      const item = await db.get(
        `SELECT c.id as cartId, c.qty, p.id as productId, p.name, p.price
         FROM cart c JOIN products p ON c.productId = p.id WHERE c.id = ?`,
        id
      );
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update qty' });
    }
  });

  return router;
}

module.exports = createCartRouter;
