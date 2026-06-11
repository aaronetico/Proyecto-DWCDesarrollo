import { useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCheckout } from '../../context/CheckoutContext'
import CheckoutSteps from './CheckoutSteps'

const paymentLabels = {
  card: 'Tarjeta de crédito / débito',
  paypal: 'PayPal',
  transfer: 'Transferencia bancaria',
}

function CheckoutReview({ cart, clearCart }) {
  const navigate = useNavigate()
  const { shipping, paymentMethod, paymentDetails, resetCheckout } = useCheckout()

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  if (cart.length === 0) return <Navigate to="/cart" replace />
  if (!shipping.name || !paymentMethod) return <Navigate to="/checkout/shipping" replace />

  const billingName = shipping.billingSameAsShipping ? shipping.name : shipping.billingName
  const billingAddress = shipping.billingSameAsShipping ? shipping.address : shipping.billingAddress
  const billingPostalCode = shipping.billingSameAsShipping ? shipping.postalCode : shipping.billingPostalCode
  const billingCity = shipping.billingSameAsShipping ? shipping.city : shipping.billingCity

  function handleConfirm() {
    clearCart()
    resetCheckout()
    navigate('/', { replace: true })
  }

  return (
    <section className="checkout-page">
      <CheckoutSteps currentStep={5} />
      <h2>Revisión del pedido</h2>
      <p className="checkout-subtitle">Comprueba que todo es correcto antes de confirmar.</p>

      <div className="checkout-review-grid">
        <div className="checkout-review-card">
          <h3>Envío</h3>
          <p><strong>{shipping.name}</strong></p>
          <p>{shipping.address}{shipping.block ? `, Bloque ${shipping.block}` : ''}{shipping.floor ? `, Piso ${shipping.floor}` : ''}{shipping.door ? `, Puerta ${shipping.door}` : ''}</p>
          <p>{shipping.postalCode} {shipping.city}, {shipping.country}</p>
          <p>{shipping.email} · {shipping.phone}</p>
        </div>

        <div className="checkout-review-card">
          <h3>Facturación</h3>
          <p><strong>{billingName}</strong></p>
          <p>{billingAddress}</p>
          <p>{billingPostalCode} {billingCity}</p>
        </div>

        <div className="checkout-review-card">
          <h3>Pago</h3>
          <p><strong>{paymentLabels[paymentMethod]}</strong></p>
          {paymentMethod === 'card' && (
            <>
              <p>Tarjeta terminada en {paymentDetails.cardNumber.replace(/\s/g, '').slice(-4)}</p>
              <p>{paymentDetails.cardName}</p>
            </>
          )}
          {paymentMethod === 'paypal' && <p>{paymentDetails.paypalEmail}</p>}
          {paymentMethod === 'transfer' && (
            <>
              <p>Titular: {paymentDetails.bankHolder}</p>
              <p>IBAN origen: {paymentDetails.bankIban}</p>
              <p className="checkout-note">IBAN Falcar para el ingreso: ES12 2100 0813 6101 2345 6789</p>
            </>
          )}
        </div>
      </div>

      <h3>Productos</h3>
      <div className="checkout-summary-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item checkout-cart-item">
            <div>
              <h4>{"Inyector X-56 (solenoide) adaptable"}</h4>
              <p>Cantidad: {item.quantity}</p>
            </div>
            <strong>{(item.quantity * item.price).toFixed(2)} €</strong>
          </div>
        ))}
      </div>

      <div className="checkout-total-box">
        <span>Total a pagar</span>
        <strong>{total.toFixed(2)} €</strong>
      </div>

      <div className="checkout-actions">
        <button type="button" className="secondary-btn" onClick={() => navigate('/checkout/payment-details')}>← Volver</button>
        <button type="button" onClick={handleConfirm}>Confirmar pedido</button>
      </div>
    </section>
  )
}

export default CheckoutReview
