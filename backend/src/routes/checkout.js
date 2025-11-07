// src/routes/checkout.js
const express = require('express');

function createCheckoutRouter(db) {
  const router = express.Router();

  // POST /api/checkout  { cartItems, name, email }  -> returns receipt and clears cart
  router.post('/', async (req, res) => {
    try {
      const { cartItems = [], name, email } = req.body;

      // If client didn't send cartItems, compute from server cart for mock-user
      let items = cartItems;
      if (!items || items.length === 0) {
        items = await db.all(`
          SELECT c.qty, p.price
          FROM cart c JOIN products p ON c.productId = p.id
          WHERE c.userId = 'mock-user'
        `);
      }

      const total = items.reduce((s, it) => s + Number(it.price) * Number(it.qty), 0);

      // Clear server-side cart for mock-user
      await db.run("DELETE FROM cart WHERE userId = 'mock-user'");

      const receipt = {
        id: Date.now().toString(36),
        total,
        name: name || null,
        email: email || null,
        timestamp: new Date().toISOString()
      };

      res.json({ receipt });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Checkout failed' });
    }
  });

  return router;
}

module.exports = createCheckoutRouter;
