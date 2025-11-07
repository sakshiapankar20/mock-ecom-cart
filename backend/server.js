const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 4000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// mock database
let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Headphones", price: 2000 },
  { id: 3, name: "Keyboard", price: 1500 },
  { id: 4, name: "Mouse", price: 800 },
  { id: 5, name: "Smartphone", price: 25000 },
];

let cart = [];

// routes
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ cart, total });
});

app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    const item = { id: uuidv4(), ...product, qty };
    cart.push(item);
    res.json(item);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  cart = cart.filter(item => item.id !== id);
  res.json({ message: "Item removed" });
});

app.post("/api/checkout", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const receipt = {
    total,
    timestamp: new Date().toISOString(),
  };
  cart = [];
  res.json(receipt);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
