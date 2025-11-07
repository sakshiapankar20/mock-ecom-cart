import React, { useEffect, useState } from 'react'
import { getCart, deleteCartItem, postCheckout } from '../api'

export default function Cart({ refreshSignal, onCheckoutSuccess }) {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const data = await getCart()
      setCart(data)
    } catch (e) {
      console.error(e); alert('Failed to load cart')
    } finally { setLoading(false) }
  }

  useEffect(()=> { load() }, [refreshSignal])

  const handleRemove = async (id) => {
    try {
      await deleteCartItem(id)
      load()
    } catch (e) { console.error(e); alert('Remove failed') }
  }

  const handleCheckout = async () => {
    if (!name || !email) return alert('Enter name & email')
    if (cart.items.length === 0) return alert('Cart empty')
    try {
      const payload = cart.items.map(i => ({ id: i.id }))
      const res = await postCheckout(payload, name, email)
     alert(`Order success! Total Rs. ${res.receipt.total}`)

      setName(''); setEmail('')
      onCheckoutSuccess && onCheckoutSuccess()
      load()
    } catch (e) {
      console.error(e); alert('Checkout failed')
    }
  }

  return (
    <div>
      <h2>Cart</h2>
      {loading ? <p>Loading...</p> : (
        <>
          {cart.items.length === 0 ? <p>Cart is empty</p> : (
            <div>
              {cart.items.map(it=>(
                <div key={it.id} className="cart-row">
                  <div>
                    <div className="cart-name">{it.name}</div>
                    <div className="cart-meta">₹{it.price} × {it.qty}</div>
                  </div>
                  <div>
                    <button className="btn small" onClick={()=>handleRemove(it.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div style={{marginTop:10}}><strong>Total: ₹{cart.total}</strong></div>
            </div>
          )}

          <div style={{marginTop:12}}>
            <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
            <input placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} />
            <button className="btn" onClick={handleCheckout}>Checkout (Mock)</button>
          </div>
        </>
      )}
    </div>
  )
}
