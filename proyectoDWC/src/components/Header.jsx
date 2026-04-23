import { Link, useNavigate } from 'react-router-dom'

function Header({ cart, clearCart }) {
  const navigate = useNavigate()

  function handleLogout() {
    sessionStorage.removeItem('fakeAuth')
    clearCart()
    navigate('/login', { replace: true })
  }

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Falcar</h1>
        <span className="subtitle">Piezas mecánicas profesionales</span>
      </div>

      <nav className="header-nav">
        <Link to="/">Inicio</Link>
        <Link to="/about">Sobre nosotros</Link>

        <Link to="/cart">
          🛒 ({totalItems})
        </Link>

        <button onClick={handleLogout} className="logout-btn">
          Cerrar sesión
        </button>
      </nav>
    </header>
  )
}

export default Header
