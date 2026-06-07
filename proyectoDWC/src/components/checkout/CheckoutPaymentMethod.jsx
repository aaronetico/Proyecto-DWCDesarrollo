import { useNavigate } from 'react-router-dom'
import { useCheckout } from '../../context/CheckoutContext'
import CheckoutSteps from './CheckoutSteps'

const paymentOptions = [
  {
    id: 'card',
    title: 'Tarjeta de crédito / débito',
    description: 'Visa, Mastercard, American Express',
    icon: '💳',
  },
  {
    id: 'paypal',
    title: 'PayPal',
    description: 'Pago seguro con tu cuenta PayPal',
    icon: '🅿️',
  },
  {
    id: 'transfer',
    title: 'Transferencia bancaria',
    description: 'SEPA / transferencia nacional',
    icon: '🏦',
  },
]

function CheckoutPaymentMethod() {
  const navigate = useNavigate()
  const { paymentMethod, setPaymentMethod } = useCheckout()

  function handleContinue() {
    if (!paymentMethod) return
    navigate('/checkout/payment-details')
  }

  return (
    <section className="checkout-page">
      <CheckoutSteps currentStep={3} />
      <h2>Elige tu método de pago</h2>
      <p className="checkout-subtitle">Selecciona cómo quieres completar tu pedido.</p>

      <div className="payment-method-grid">
        {paymentOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`payment-method-card ${paymentMethod === option.id ? 'selected' : ''}`}
            onClick={() => setPaymentMethod(option.id)}
          >
            <span className="payment-method-icon">{option.icon}</span>
            <strong>{option.title}</strong>
            <span>{option.description}</span>
          </button>
        ))}
      </div>

      <div className="checkout-actions">
        <button type="button" className="secondary-btn" onClick={() => navigate('/checkout/shipping')}>← Volver</button>
        <button type="button" disabled={!paymentMethod} onClick={handleContinue}>Continuar</button>
      </div>
    </section>
  )
}

export default CheckoutPaymentMethod
