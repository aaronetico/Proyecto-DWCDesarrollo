import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/backendApi'

// Formulario de acceso que guarda el token en localStorage
function Login({ isAuthenticated, onLoginSuccess }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await loginUser({ email, password })
      localStorage.setItem('authToken', token)
      onLoginSuccess(user)
      navigate('/', { replace: true })
    } catch (err) {
      setError('No se pudo iniciar sesión. Revisa credenciales.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <Link to="/register" className="secondary-btn link-button">
          ¿Aún no tienes cuenta? Crea tu cuenta
        </Link>
      </form>
    </div>
  )
}

export default Login
