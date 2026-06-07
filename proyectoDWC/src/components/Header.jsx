import { Link, useNavigate } from 'react-router-dom'

function Header({ cart, isAuthenticated, canOpenAdmin, onLogout }) {
  const navigate = useNavigate()

  function handleAuthClick() {
    if (isAuthenticated) {
      onLogout()
      return
    }
    navigate('/login')
  }

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src="/assets/logobueno.png" alt="Logo Falcar" className="logo-image" />
          <div className="logo-text-group">
            <h1 className="logo">Falcar</h1>
            <span className="subtitle">Piezas de recambio motor combustión interna</span>
          </div>
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/">Inicio</Link>
        <Link to="/about">Sobre nosotros</Link>

        <Link to="/cart">
          🛒 ({totalItems})
        </Link>

        {isAuthenticated && <Link to="/profile">Mi perfil</Link>}
        {canOpenAdmin && <Link to="/admin">Gestión</Link>}

        <button onClick={handleAuthClick} className="logout-btn">
          {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
        </button>
      </nav>
    </header>
  )
}

export default Header
