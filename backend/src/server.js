// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
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

    // Serve static images
    app.use('/images', express.static(path.join(__dirname, 'images')));

    // Health check
    app.get('/api/health', (req, res) => res.json({ ok: true }));

    // Mount routes
    app.use('/api/products', createProductsRouter(db));
    app.use('/api/cart', createCartRouter(db));
    app.use('/api/checkout', createCheckoutRouter(db));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT} (listening on 0.0.0.0)`);
  console.log(`DB file: ${DB_FILE}`);
  console.log(`Static images served at /images`);
});

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
