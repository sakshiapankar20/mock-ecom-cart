import React, { useEffect, useState } from 'react'
import { getProducts, postCart } from '../api'

export default function Products({ onAddSuccess }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getProducts()
      .then(data => { if (mounted) setProducts(data) })
      .catch(e=> { console.error(e); alert('Failed to load products') })
      .finally(()=> mounted && setLoading(false))
    return () => mounted = false
  }, [])

  const handleAdd = async (p) => {
    try {
      await postCart(p.id, 1)
      onAddSuccess && onAddSuccess()
      alert(`${p.name} added to cart`)
    } catch (e) {
      console.error(e); alert('Failed to add to cart')
    }
  }

  if (loading) return <p>Loading products...</p>
  return (
    <div>
      <h2>Products</h2>
      <div className="grid">
        {products.map(p=>(
          <div className="card" key={p.id}>
            <div className="card-title">{p.name}</div>
            <div className="card-price">₹ {p.price}</div>
            <button className="btn" onClick={()=>handleAdd(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}
