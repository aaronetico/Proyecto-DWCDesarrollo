import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './checkout/CheckoutSteps'

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <section className="checkout-page">
      <CheckoutSteps currentStep={1} />
      <h2>Carrito</h2>

      {cart.length === 0 ? (
        <>
          <p>Tu carrito está vacío</p>
          <button className="secondary-btn" onClick={() => navigate('/')}>
            Volver a la tienda
          </button>
        </>
      ) : (
        <>
          <div className="checkout-summary-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item checkout-cart-item">
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.price.toFixed(2)} € · Cantidad: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <strong>{(item.price * item.quantity).toFixed(2)} €</strong>
                  <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-total-box">
            <span>Total</span>
            <strong>{total.toFixed(2)} €</strong>
          </div>

          <div className="checkout-actions">
            <button className="secondary-btn" onClick={() => navigate('/')}>Seguir comprando</button>
            <button onClick={() => navigate('/checkout/shipping')}>Continuar con el pedido</button>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart
