import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import BrandGrid from './components/BrandGrid'
import ModelList from './components/ModelList'
import YearList from './components/YearList'
import VersionList from './components/VersionList'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import About from './components/About'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Register from './components/Register'
import Cart from './components/Cart'
import CheckoutShipping from './components/checkout/CheckoutShipping'
import CheckoutPaymentMethod from './components/checkout/CheckoutPaymentMethod'
import CheckoutPaymentDetails from './components/checkout/CheckoutPaymentDetails'
import CheckoutReview from './components/checkout/CheckoutReview'
import Profile from './components/Profile'
import AdminPanel from './components/AdminPanel'
import { CheckoutProvider } from './context/CheckoutContext'
import { fetchMe, logoutUser } from './api/backendApi'

// Componente raíz: gestiona rutas, sesión y carrito
function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [cart, setCart] = useState([])
  const isAuthenticated = Boolean(authUser)
  const roles = useMemo(() => authUser?.roles ?? [], [authUser])
  const isAdmin = roles.includes('admin')
  const isEmployee = roles.includes('empleado')

  // Añade una pieza al carrito o suma una unidad si ya existe
  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  async function refreshAuthUser() {
    const token = localStorage.getItem('authToken')
    if (!token) {
      setAuthUser(null)
      return
    }

    try {
      const me = await fetchMe()
      setAuthUser(me)
    } catch {
      localStorage.removeItem('authToken')
      setAuthUser(null)
    }
  }

  // Cierra sesión en la API y limpia el estado local
  async function handleLogout() {
    try {
      await logoutUser()
    } catch {
      // ignore: force local logout
    } finally {
      localStorage.removeItem('authToken')
      setAuthUser(null)
      clearCart()
      navigate('/', { replace: true })
    }
  }

  useEffect(() => {
    refreshAuthUser().finally(() => setAuthChecked(true))
  }, [])

  if (!authChecked) return <p>Cargando sesión...</p>
  if (location.pathname === '/login') {
    return <Login isAuthenticated={isAuthenticated} onLoginSuccess={setAuthUser} />
  }

  if (location.pathname === '/register') {
    return <Register isAuthenticated={isAuthenticated} onRegisterSuccess={setAuthUser} />
  }

  return (
    <CheckoutProvider>
      <div className="app-root">
        <Header
          cart={cart}
          isAuthenticated={isAuthenticated}
          canOpenAdmin={isAdmin || isEmployee}
          onLogout={handleLogout}
        />

        <div className="container">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<BrandGrid />} />
              <Route path="/brand/:brandId" element={<ModelList />} />
              <Route path="/brand/:brandId/model/:modelId/years" element={<YearList />} />
              <Route
                path="/brand/:brandId/model/:modelId/year/:yearId/versions"
                element={<VersionList />}
              />
              <Route
                path="/brand/:brandId/model/:modelId/year/:yearId/version/:versionId/products"
                element={<ProductList />}
              />
              <Route
                path="/product/:productId"
                element={<ProductDetail addToCart={addToCart} />}
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                  />
                }
              />
              <Route path="/checkout/shipping" element={<CheckoutShipping />} />
              <Route path="/checkout/payment-method" element={<CheckoutPaymentMethod />} />
              <Route path="/checkout/payment-details" element={<CheckoutPaymentDetails />} />
              <Route
                path="/checkout/review"
                element={<CheckoutReview cart={cart} clearCart={clearCart} />}
              />
              <Route path="/checkout" element={<CheckoutShipping />} />
              <Route path="/checkout/summary" element={<CheckoutReview cart={cart} clearCart={clearCart} />} />
              <Route path="/login" element={<NotFound />} />
              <Route path="/register" element={<NotFound />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    isAuthenticated={isAuthenticated}
                    user={authUser}
                    onProfileUpdated={setAuthUser}
                  />
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminPanel
                    isAuthenticated={isAuthenticated}
                    canManageStructure={isAdmin}
                    canManageParts={isAdmin || isEmployee}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </CheckoutProvider>
  )
}

export default App
