import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/backendApi'

function Register({ isAuthenticated, onRegisterSuccess }) {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    last_name: '',
    birth_date: '',
    email: '',
    country: '',
    city: '',
    password: '',
    password_confirmation: '',
  })

  if (isAuthenticated) return <Navigate to="/" replace />

  function onChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function isAtLeastNineYearsOld(dateValue) {
    const birthDate = new Date(dateValue)
    const minDate = new Date()
    minDate.setFullYear(minDate.getFullYear() - 9)
    return birthDate <= minDate
  }

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    if (!isValidEmail(form.email)) {
      setError('El email debe tener formato nombre@dominio.extension')
      return
    }
    if (!isAtLeastNineYearsOld(form.birth_date)) {
      setError('Debes tener al menos 9 años para registrarte')
      return
    }
    setLoading(true)
    try {
      const { token, user } = await registerUser(form)
      localStorage.setItem('authToken', token)
      onRegisterSuccess(user)
      navigate('/', { replace: true })
    } catch {
      setError('No se pudo crear la cuenta. Revisa los datos del formulario.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <form className="login-card register-card" onSubmit={onSubmit}>
        <h2>Crear cuenta</h2>
        <input name="name" placeholder="Nombre" value={form.name} onChange={onChange} required />
        <input name="last_name" placeholder="Apellidos" value={form.last_name} onChange={onChange} required />
        <input type="date" name="birth_date" value={form.birth_date} onChange={onChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={onChange} required />
        <input name="country" placeholder="País" value={form.country} onChange={onChange} required />
        <input name="city" placeholder="Ciudad" value={form.city} onChange={onChange} required />
        <input type="password" name="password" placeholder="Contraseña (mín. 8)" value={form.password} onChange={onChange} required />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirmar contraseña"
          value={form.password_confirmation}
          onChange={onChange}
          required
        />
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear cuenta'}
        </button>
        <Link to="/login" className="secondary-btn link-button">Ya tengo cuenta</Link>
      </form>
    </div>
  )
}

export default Register
