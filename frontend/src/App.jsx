import React, { useState } from 'react'
import Products from './components/Products'
import Cart from './components/Cart'
import './index.css'

export default function App() {
  const [cartUpdatedAt, setCartUpdatedAt] = useState(0)
  const triggerCartRefresh = () => setCartUpdatedAt(Date.now())

  return (
    <div className="container">
      <header>
        <h1>Vibe Mock E-Com Cart</h1>
      </header>

      <main className="layout">
        <section className="products">
          <Products onAddSuccess={triggerCartRefresh} />
        </section>

        <aside className="cart">
          <Cart refreshSignal={cartUpdatedAt} onCheckoutSuccess={triggerCartRefresh} />
        </aside>
      </main>

      <footer style={{textAlign:'center', marginTop:20, color:'#666'}}>
        Built with React + Vite • Backend: Express + SQLite
      </footer>
    </div>
  )
}
