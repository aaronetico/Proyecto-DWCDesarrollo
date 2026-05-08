import { useMemo } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

function CheckoutSummary({ cart, clearCart }) {
  const navigate = useNavigate()
  const location = useLocation()
  const shippingData = location.state?.shippingData

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  if (!shippingData) return <Navigate to="/checkout" replace />
  if (cart.length === 0) return <Navigate to="/cart" replace />

  function handlePay() {
    clearCart()
    navigate('/', { replace: true })
  }

  return (
    <section>
      <h2>Resumen de compra</h2>
      <p><strong>Cliente:</strong> {shippingData.name}</p>
      <p><strong>Dirección:</strong> {shippingData.address}</p>
      <p><strong>Código postal:</strong> {shippingData.postalCode}</p>

      <h3>Productos</h3>
      <div className="checkout-summary-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h4>{item.name}</h4>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio unitario: {item.price.toFixed(2)} €</p>
            <p>Subtotal: {(item.quantity * item.price).toFixed(2)} €</p>
          </div>
        ))}
      </div>

      <h3>Total a pagar: {total.toFixed(2)} €</h3>

      <div className="checkout-summary-actions">
        <Link to="/checkout" className="back-button">← Volver a datos</Link>
        <button onClick={handlePay}>Pagar</button>
      </div>
    </section>
  )
}

export default CheckoutSummary
