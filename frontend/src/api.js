const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

async function jsonOrThrow(res) {
  const text = await res.text();
  if (!text) return null;
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) throw new Error((data && data.error) || res.statusText);
  return data;
}

export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  return jsonOrThrow(res);
}

export async function getCart() {
  const res = await fetch(`${API_BASE}/api/cart`);
  return jsonOrThrow(res);
}

export async function postCart(productId, qty = 1) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ productId, qty })
  });
  return jsonOrThrow(res);
}

export async function deleteCartItem(id) {
  const res = await fetch(`${API_BASE}/api/cart/${id}`, { method: 'DELETE' });
  return jsonOrThrow(res);
}

export async function postCheckout(cartItems, name = '', email = '') {
  const res = await fetch(`${API_BASE}/api/checkout`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ cartItems, name, email })
  });
  return jsonOrThrow(res);
}
