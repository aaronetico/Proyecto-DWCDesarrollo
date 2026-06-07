import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCheckout } from '../../context/CheckoutContext'
import CheckoutSteps from './CheckoutSteps'

function CheckoutPaymentDetails() {
  const navigate = useNavigate()
  const { paymentMethod, paymentDetails, setPaymentDetails } = useCheckout()
  const [error, setError] = useState('')

  if (!paymentMethod) return <Navigate to="/checkout/payment-method" replace />

  function handleChange(event) {
    setPaymentDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    setError('')
  }

  function isValidCard(cardNumber) {
    return /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardNumber)
  }

  function isValidExpiry(expiry) {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)
  }

  function isValidIban(iban) {
    return /^ES\d{22}$/.test(iban.replace(/\s/g, '').toUpperCase())
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (paymentMethod === 'card') {
      if (!isValidCard(paymentDetails.cardNumber)) {
        setError('Número de tarjeta no válido. Formato: 1234 1234 1234 1234')
        return
      }
      if (!paymentDetails.cardName.trim()) {
        setError('Introduce el titular de la tarjeta')
        return
      }
      if (!isValidExpiry(paymentDetails.cardExpiry)) {
        setError('Caducidad no válida. Formato MM/AA')
        return
      }
      if (!/^\d{3,4}$/.test(paymentDetails.cardCvv)) {
        setError('CVV no válido')
        return
      }
    }

    if (paymentMethod === 'paypal' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentDetails.paypalEmail)) {
      setError('Introduce un email de PayPal válido')
      return
    }

    if (paymentMethod === 'transfer') {
      if (!paymentDetails.bankHolder.trim()) {
        setError('Introduce el titular de la cuenta')
        return
      }
      if (!isValidIban(paymentDetails.bankIban)) {
        setError('IBAN no válido. Debe empezar por ES y tener 24 caracteres')
        return
      }
    }

    navigate('/checkout/review')
  }

  return (
    <section className="checkout-page">
      <CheckoutSteps currentStep={4} />
      <h2>Datos de pago</h2>
      <p className="checkout-subtitle">
        {paymentMethod === 'card' && 'Introduce los datos de tu tarjeta.'}
        {paymentMethod === 'paypal' && 'Confirma la cuenta PayPal asociada al pago.'}
        {paymentMethod === 'transfer' && 'Indica la cuenta desde la que realizarás la transferencia.'}
      </p>

      <form className="checkout-form checkout-form-wide" onSubmit={handleSubmit}>
        {paymentMethod === 'card' && (
          <div className="checkout-grid">
            <input className="form-input checkout-span-2" name="cardNumber" placeholder="Número de tarjeta (1234 1234 1234 1234)" value={paymentDetails.cardNumber} onChange={handleChange} required />
            <input className="form-input checkout-span-2" name="cardName" placeholder="Titular de la tarjeta" value={paymentDetails.cardName} onChange={handleChange} required />
            <input className="form-input" name="cardExpiry" placeholder="Caducidad MM/AA" value={paymentDetails.cardExpiry} onChange={handleChange} required />
            <input className="form-input" name="cardCvv" placeholder="CVV" value={paymentDetails.cardCvv} onChange={handleChange} maxLength={4} required />
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div className="checkout-grid">
            <input className="form-input checkout-span-2" name="paypalEmail" type="email" placeholder="Email de PayPal" value={paymentDetails.paypalEmail} onChange={handleChange} required />
          </div>
        )}

        {paymentMethod === 'transfer' && (
          <div className="checkout-grid">
            <input className="form-input checkout-span-2" name="bankHolder" placeholder="Titular de la cuenta" value={paymentDetails.bankHolder} onChange={handleChange} required />
            <input className="form-input checkout-span-2" name="bankIban" placeholder="IBAN (ES...)" value={paymentDetails.bankIban} onChange={handleChange} required />
            <input className="form-input checkout-span-2" name="bankConcept" placeholder="Concepto de transferencia (opcional)" value={paymentDetails.bankConcept} onChange={handleChange} />
            <p className="checkout-note checkout-span-2">Recibirás nuestro IBAN en el paso de confirmación para completar el pago.</p>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <div className="checkout-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate('/checkout/payment-method')}>← Volver</button>
          <button type="submit">Revisar pedido</button>
        </div>
      </form>
    </section>
  )
}

export default CheckoutPaymentDetails
