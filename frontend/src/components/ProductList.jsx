import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const addToCart = async (id) => {
    try {
      await axios.post(`${BACKEND_URL}/api/cart`, { productId: id, qty: 1 });
      alert("✅ Added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("❌ Failed to add to cart");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Explore Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-transform hover:-translate-y-1"
          >
         <div className="h-48 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
  <img
    src={p.image ? `${BACKEND_URL}${p.image}` : "https://via.placeholder.com/400x300?text=No+Image"}
    alt={p.name}
    className="max-h-full max-w-full object-contain"
    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image"; }}
  />
</div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{p.name}</h3>
              <p className="text-gray-600 mb-2">{p.description}</p>
              <p className="text-blue-600 font-bold text-xl mb-3">₹{p.price}</p>
              <button
                onClick={() => addToCart(p.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-medium transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
