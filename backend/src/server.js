// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./db');

const createProductsRouter = require('./routes/products');
const createCartRouter = require('./routes/cart');
const createCheckoutRouter = require('./routes/checkout');

const PORT = process.env.PORT || 5000;
const DB_FILE = process.env.DB_FILE || './ecom.db';

(async () => {
  try {
    const db = await initDB(DB_FILE);

    const app = express();
    app.use(cors());
    app.use(express.json());

    // Health
    app.get('/api/health', (req, res) => res.json({ ok: true }));

    // Mount routes (pass db)
    app.use('/api/products', createProductsRouter(db));
    app.use('/api/cart', createCartRouter(db));
    app.use('/api/checkout', createCheckoutRouter(db));

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`DB file: ${DB_FILE}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
