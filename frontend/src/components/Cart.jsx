import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCart = async () => {
    const res = await axios.get("/api/cart");
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    await axios.delete(`/api/cart/${id}`);
    fetchCart();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>

      {cart.items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty 🛍️</p>
      ) : (
        <>
          <div className="divide-y">
            {cart.items.map((item) => (
              <div
                key={item.cartId}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-blue-600">
                    ₹{item.price * item.qty}
                  </span>
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">
              Total: ₹{cart.total}
            </h3>
            <Link to="/checkout">
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
