// src/seed.js
require('dotenv').config();
const { initDB } = require('./db');

const products = [
  { name: 'Blue T-shirt', price: 399, description: 'Comfort cotton tee', image: '' },
  { name: 'Sneakers', price: 2499, description: 'Running shoes', image: '' },
  { name: 'Headphones', price: 1999, description: 'Over-ear headphones', image: '' },
  { name: 'Coffee Mug', price: 199, description: 'Ceramic mug', image: '' },
  { name: 'Backpack', price: 1499, description: 'Daypack', image: '' },
  { name: 'Sunglasses', price: 899, description: 'UV protection', image: '' },
  { name: 'Notebook', price: 99, description: 'A5 ruled', image: '' }
];

(async () => {
  try {
    const db = await initDB(process.env.DB_FILE || './ecom.db');
    await db.run('DELETE FROM products;'); // clear old
    const stmt = await db.prepare('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)');
    for (const p of products) {
      await stmt.run(p.name, p.price, p.description, p.image);
    }
    await stmt.finalize?.(); // finalize if supported
    console.log('✅ Products seeded!');
    await db.close();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
})();
