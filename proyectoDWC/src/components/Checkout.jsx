import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    address: '',
    block: '',
    floor: '',
    door: '',
    postalCode: '',
    card: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  function isValidSpanishCard(cardNumber) {
    const regex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/
    return regex.test(cardNumber)
  }

  function isValidPostalCode(postalCode) {
    return /^\d{5}$/.test(postalCode)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!isValidSpanishCard(form.card)) {
      setError('Número de tarjeta no válido. Usa el formato 1234 1234 1234 1234')
      return
    }

    if (!isValidPostalCode(form.postalCode)) {
      setError('El código postal debe tener exactamente 5 números')
      return
    }

    navigate('/checkout/summary', {
      state: {
        shippingData: form
      }
    })
  }

  return (
    <section>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver atrás
      </button>

      <h2>Pago</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          className="form-input"
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-input"
          name="address"
          placeholder="Dirección"
          value={form.address}
          onChange={handleChange}
          required
        />

        <div className="form-row">
          <input
            className="form-input"
            name="block"
            placeholder="Bloque"
            value={form.block}
            onChange={handleChange}
          />

          <input
            className="form-input"
            name="floor"
            placeholder="Piso"
            value={form.floor}
            onChange={handleChange}
          />

          <input
            className="form-input"
            name="door"
            placeholder="Puerta"
            value={form.door}
            onChange={handleChange}
          />
        </div>

        <input
          className="form-input"
          name="postalCode"
          placeholder="Código postal"
          value={form.postalCode}
          onChange={handleChange}
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          required
        />

        <input
          className="form-input"
          name="card"
          placeholder="Tarjeta de crédito (1234 1234 1234 1234)"
          value={form.card}
          onChange={handleChange}
          required
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Confirmar pago</button>
      </form>
    </section>
  )
}

export default Checkout
