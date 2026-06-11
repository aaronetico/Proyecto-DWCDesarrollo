import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheckout } from '../../context/CheckoutContext'
import CheckoutSteps from './CheckoutSteps'

function CheckoutShipping() {
  const navigate = useNavigate()
  const { shipping, setShipping } = useCheckout()
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setShipping((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

  if (!/^\d{5}$/.test(shipping.postalCode)) {
    setError('El código postal debe tener 5 dígitos')
    return
  }

  if (!/^\d{8,15}$/.test(shipping.phone)) {
    setError('El teléfono debe tener entre 8 y 15 dígitos')
    return
  }

  if (!shipping.billingSameAsShipping) {
    if (
      !shipping.billingName.trim() ||
      !shipping.billingAddress.trim() ||
      !/^\d{5}$/.test(shipping.billingPostalCode)
    ) {
      setError('Completa los datos de facturación')
      return
    }
  }

  navigate('/checkout/payment-method')
}

  return (
    <section className="checkout-page">
      <CheckoutSteps currentStep={2} />
      <h2>Datos de envío y facturación</h2>
      <p className="checkout-subtitle">Introduce la dirección donde recibirás tus piezas de motor.</p>

      <form className="checkout-form checkout-form-wide" onSubmit={handleSubmit}>
        <div className="checkout-grid">
          <input className="form-input" name="name" placeholder="Nombre completo" value={shipping.name} onChange={handleChange} required />
          <input className="form-input" name="email" type="email" placeholder="Email" value={shipping.email} onChange={handleChange} required />
          <input className="form-input" name="phone" placeholder="Teléfono" value={shipping.phone} onChange={handleChange} required />
          <input className="form-input checkout-span-2" name="address" placeholder="Dirección" value={shipping.address} onChange={handleChange} required />
          <input className="form-input" name="block" placeholder="Bloque" value={shipping.block} onChange={handleChange} />
          <input className="form-input" name="floor" placeholder="Piso" value={shipping.floor} onChange={handleChange} />
          <input className="form-input" name="door" placeholder="Puerta" value={shipping.door} onChange={handleChange} />
          <input className="form-input" name="postalCode" placeholder="Código postal" value={shipping.postalCode} onChange={handleChange} inputMode="numeric" maxLength={5} required />
          <input className="form-input" name="city" placeholder="Ciudad" value={shipping.city} onChange={handleChange} required />
          <input className="form-input" name="country" placeholder="País" value={shipping.country} onChange={handleChange} required />
        </div>

        <label className="checkout-checkbox">
          <input type="checkbox" name="billingSameAsShipping" checked={shipping.billingSameAsShipping} onChange={handleChange} />
          Usar la misma dirección para facturación
        </label>

        {!shipping.billingSameAsShipping && (
          <div className="checkout-grid checkout-billing-block">
            <h3>Datos de facturación</h3>
            <input className="form-input checkout-span-2" name="billingName" placeholder="Nombre o razón social" value={shipping.billingName} onChange={handleChange} />
            <input className="form-input checkout-span-2" name="billingAddress" placeholder="Dirección de facturación" value={shipping.billingAddress} onChange={handleChange} />
            <input className="form-input" name="billingPostalCode" placeholder="CP facturación" value={shipping.billingPostalCode} onChange={handleChange} maxLength={5} />
            <input className="form-input" name="billingCity" placeholder="Ciudad facturación" value={shipping.billingCity} onChange={handleChange} />
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <div className="checkout-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate('/cart')}>← Volver al carrito</button>
          <button type="submit">Continuar al método de pago</button>
        </div>
      </form>
    </section>
  )
}

export default CheckoutShipping
