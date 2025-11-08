import { useState } from "react";
import axios from "axios";

export default function Checkout() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/checkout", form);
    setReceipt(res.data.receipt);
  };

  if (receipt) {
    return (
      <div className="max-w-md mx-auto bg-green-50 shadow-md p-6 rounded-lg mt-10 text-center border border-green-300">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          ✅ Checkout Successful
        </h2>
        <p><b>Name:</b> {receipt.name}</p>
        <p><b>Email:</b> {receipt.email}</p>
        <p><b>Total:</b> ₹{receipt.total}</p>
        <p><b>Date:</b> {new Date(receipt.timestamp).toLocaleString()}</p>
        <div className="mt-6">
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
          Confirm Checkout
        </button>
      </form>
    </div>
  );
}
