// src/db.js
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function initDB(dbFile) {
  const db = await open({
    filename: path.resolve(dbFile),
    driver: sqlite3.Database
  });

  // Create tables if not exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      qty INTEGER NOT NULL DEFAULT 1,
      userId TEXT DEFAULT 'mock-user',
      FOREIGN KEY(productId) REFERENCES products(id)
    );
  `);

  return db;
}

module.exports = { initDB };
