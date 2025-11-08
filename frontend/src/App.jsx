import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
          🛒 Vibe <span className="text-yellow-300">Store</span>
        </Link>
        <nav className="space-x-6 text-lg">
          <Link to="/" className="hover:text-yellow-300 transition">Products</Link>
          <Link to="/cart" className="hover:text-yellow-300 transition">Cart</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-8 min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 shadow-inner">
        © {new Date().getFullYear()} <span className="font-semibold">Vibe Commerce</span> — Built by Sakshi 💙
      </footer>
    </Router>
  );
}

export default App;
